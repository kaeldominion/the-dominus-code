import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { DOMINUS_CHAT_SYSTEM } from "@/lib/oracle-constants";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit-production";
import prisma from "@/lib/prisma";

// Rate limit: 30 messages per hour per IP
const MAX_MESSAGES_PER_HOUR = 30;
// Max messages per conversation
const MAX_MESSAGES_PER_CONVERSATION = 25;

// Helper function to store conversation in background (optimized with batch operations)
async function storeConversationInBackground(
  clientIP: string,
  language: string,
  messages: Array<{ role: string; text: string }>,
  aiResponseText: string
) {
  try {
    // Find existing conversation from the last 30 minutes for this IP
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    let conversation = await prisma.oracleConversation.findFirst({
      where: {
        clientIP,
        language,
        startedAt: {
          gte: thirtyMinutesAgo,
        },
      },
      orderBy: {
        startedAt: "desc",
      },
      select: {
        id: true,
        messageCount: true,
      },
    });

    // Create new conversation if none exists
    const isNewConversation = !conversation;
    if (isNewConversation) {
      conversation = await prisma.oracleConversation.create({
        data: {
          clientIP,
          language,
          messageCount: 0,
        },
        select: {
          id: true,
          messageCount: true,
        },
      });
    }

    // Ensure conversation exists
    if (!conversation) {
      throw new Error("Failed to create or find conversation");
    }

    // Prepare all messages to insert in a single batch
    const messagesToCreate: Array<{ conversationId: string; role: string; text: string }> = [];
    
    if (isNewConversation) {
      // Add all existing messages
      messages.forEach((msg: { role: string; text: string }) => {
        messagesToCreate.push({
          conversationId: conversation!.id,
          role: msg.role,
          text: msg.text,
        });
      });
    } else {
      // Only add the last user message
      const lastUserMessage = messages[messages.length - 1];
      if (lastUserMessage && lastUserMessage.role === "user") {
        messagesToCreate.push({
          conversationId: conversation.id,
          role: "user",
          text: lastUserMessage.text,
        });
      }
    }

    // Add AI response
    messagesToCreate.push({
      conversationId: conversation.id,
      role: "model",
      text: aiResponseText,
    });

    // Batch insert all messages in a single transaction
    await prisma.$transaction([
      prisma.oracleMessage.createMany({
        data: messagesToCreate,
        skipDuplicates: true,
      }),
      prisma.oracleConversation.update({
        where: { id: conversation.id },
        data: {
          messageCount: conversation.messageCount + messagesToCreate.length,
          lastMessageAt: new Date(),
        },
      }),
    ]);
  } catch (dbError) {
    console.error("Failed to store Oracle conversation:", dbError);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, language = "English" } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Check conversation length
    const userMessages = messages.filter((msg: { role: string }) => msg.role === "user");
    if (userMessages.length > MAX_MESSAGES_PER_CONVERSATION) {
      return NextResponse.json(
        { 
          error: `The Oracle has spoken. You have reached the limit of ${MAX_MESSAGES_PER_CONVERSATION} questions. Return when you have integrated the wisdom.` 
        },
        { status: 429 }
      );
    }

    // Rate limiting by IP
    const clientIP = getClientIP(request);
    const rateLimit = await checkRateLimit(`oracle:${clientIP}`, MAX_MESSAGES_PER_HOUR);
    
    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000 / 60);
      return NextResponse.json(
        { 
          error: `The signal is weak. You have exceeded the limit. Return in ${resetIn} minutes.` 
        },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": MAX_MESSAGES_PER_HOUR.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.resetAt.toString(),
          }
        }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const languageInstruction =
      language !== "English"
        ? `\n\nCRITICAL: You MUST reply in ${language} language only. Adapt all concepts (Dominus, Phalanx, etc) appropriately but keep the core terminology if it adds weight.`
        : "";

    // Convert messages to Gemini format
    const contents = messages.map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Try fastest models in order - optimized with timeout
    const fastModels = [
      process.env.ORACLE_MODEL, // User override first
      "gemini-2.0-flash-exp", // Fastest experimental
      "gemini-1.5-flash-latest", // Latest flash
      "gemini-1.5-flash", // Flash model
      "gemini-1.5-pro-latest", // Latest pro (faster than preview)
      "gemini-3-pro-preview", // Known working fallback
    ].filter(Boolean) as string[];
    
    let response: any;
    let aiResponseText: string | undefined;
    let successfulModel: string | null = null;
    
    // Try each model with timeout (15 seconds per attempt)
    const MODEL_TIMEOUT = 15000; // 15 seconds
    
    for (const model of fastModels) {
      try {
        console.log(`🔄 Trying model: ${model}`);
        
        // Create a promise with timeout
        const modelPromise = ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: DOMINUS_CHAT_SYSTEM + languageInstruction,
          },
        });
        
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error(`Model ${model} timeout after ${MODEL_TIMEOUT}ms`)), MODEL_TIMEOUT);
        });
        
        response = await Promise.race([modelPromise, timeoutPromise]) as any;
        aiResponseText = response.text;
        successfulModel = model;
        console.log(`✅ Success with model: ${model}`);
        break; // Success, exit loop
      } catch (modelError: any) {
        const errorMsg = modelError.message?.substring(0, 100) || 'Unknown error';
        console.warn(`❌ Model ${model} failed:`, errorMsg);
        // Continue to next model
        if (model === fastModels[fastModels.length - 1]) {
          // Last model failed, throw error
          throw new Error(`All models failed. Last error: ${errorMsg}`);
        }
      }
    }
    
    if (!aiResponseText) {
      throw new Error("Failed to get response from any model");
    }

    // Return response immediately, store in database asynchronously (don't block response)
    storeConversationInBackground(clientIP, language, messages, aiResponseText).catch(
      (err) => console.error("Background storage error:", err)
    );

    return NextResponse.json(
      {
        text: aiResponseText,
        remaining: rateLimit.remaining,
      },
      {
        headers: {
          "X-RateLimit-Limit": MAX_MESSAGES_PER_HOUR.toString(),
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": rateLimit.resetAt.toString(),
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "X-Content-Type-Options": "nosniff",
        }
      }
    );
  } catch (error: any) {
    console.error("Oracle API error:", error);
    console.error("Error details:", {
      message: error?.message,
      stack: error?.stack?.split('\n').slice(0, 5).join('\n'),
      name: error?.name,
      code: error?.code,
    });
    
    // Return user-friendly error
    const errorMessage = error?.message || "Unknown error";
    return NextResponse.json(
      { 
        error: "The signal is weak. Try again.",
        ...(process.env.NODE_ENV === "development" && { 
          details: errorMessage,
          stack: error?.stack?.split('\n').slice(0, 3)
        })
      },
      { status: 500 }
    );
  }
}

