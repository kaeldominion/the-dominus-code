import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { DOMINUS_CHAT_SYSTEM } from "@/lib/oracle-constants";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit-production";

// Rate limit: 30 messages per hour per IP
const MAX_MESSAGES_PER_HOUR = 30;
// Max messages per conversation
const MAX_MESSAGES_PER_CONVERSATION = 25;

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

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents,
      config: {
        systemInstruction: DOMINUS_CHAT_SYSTEM + languageInstruction,
      },
    });

    return NextResponse.json(
      {
        text: response.text,
        remaining: rateLimit.remaining,
      },
      {
        headers: {
          "X-RateLimit-Limit": MAX_MESSAGES_PER_HOUR.toString(),
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": rateLimit.resetAt.toString(),
        }
      }
    );
  } catch (error) {
    console.error("Oracle API error:", error);
    return NextResponse.json(
      { error: "The signal is weak. Try again." },
      { status: 500 }
    );
  }
}

