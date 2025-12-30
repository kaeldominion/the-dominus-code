import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { DYNASTY_SYSTEM, COUNCIL_SYSTEM } from "@/lib/oracle-constants";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { formData, applicationType } = await request.json();

    if (!formData || !applicationType) {
      return NextResponse.json(
        { error: "Form data and application type are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    let aiResult = {
      verdict: "RECEIVED",
      title: "APPLICATION LOGGED",
      analysis: "Your application has been received and logged for review.",
      closing: "Await transmission.",
    };

    // If AI is configured, get AI analysis
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        
        const systemPrompt = applicationType === "dynasty" ? DYNASTY_SYSTEM : COUNCIL_SYSTEM;
        
        // Format the application data nicely for the AI
        const formattedData = Object.entries(formData)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        
        const prompt = `Evaluate this candidate application and respond with your JSON verdict:\n\n${formattedData}`;

        console.log("🔄 Sending to Gemini 3 Pro...");
        console.log("📝 Form data:", formattedData);

        const response = await ai.models.generateContent({
          model: "gemini-3-pro-preview",
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
          },
        });

        const responseText = response.text || "";
        console.log("🤖 Raw AI response:", responseText);

        // Try to parse the response
        if (responseText) {
          try {
            // Clean the response - sometimes Gemini wraps in markdown
            let cleanedText = responseText.trim();
            if (cleanedText.startsWith("```json")) {
              cleanedText = cleanedText.slice(7);
            }
            if (cleanedText.startsWith("```")) {
              cleanedText = cleanedText.slice(3);
            }
            if (cleanedText.endsWith("```")) {
              cleanedText = cleanedText.slice(0, -3);
            }
            cleanedText = cleanedText.trim();

            const parsed = JSON.parse(cleanedText);
            if (parsed.verdict) {
              aiResult = parsed;
              console.log("✅ AI verdict:", parsed.verdict);
            }
          } catch (parseError) {
            console.error("Failed to parse AI response:", parseError);
            console.error("Raw text was:", responseText);
          }
        }
      } catch (aiError) {
        console.error("AI analysis failed:", aiError);
        // Continue with default result if AI fails
      }
    } else {
      console.log("⚠️ No GEMINI_API_KEY configured");
    }

    // Log to database
    try {
      await prisma.application.create({
        data: {
          type: applicationType.toUpperCase() as "COUNCIL" | "DYNASTY",
          name: formData.name || formData.fullName || null,
          email: formData.email || null,
          formData: formData,
          aiVerdict: aiResult.verdict,
          aiAnalysis: aiResult.analysis,
          status: aiResult.verdict?.includes("REJECT") ? "REJECTED" : "PENDING",
        },
      });
      console.log(`✅ Application logged: ${applicationType} - ${formData.name || "Anonymous"}`);
    } catch (dbError) {
      console.error("Database logging failed:", dbError);
      // Continue even if DB fails - still return result to user
    }

    return NextResponse.json(aiResult);
  } catch (error) {
    console.error("Application API error:", error);
    return NextResponse.json(
      {
        verdict: "RECEIVED",
        title: "DATA LOGGED",
        analysis: "Application received. Awaiting manual review.",
        closing: "Await transmission.",
      },
      { status: 200 }
    );
  }
}

// GET endpoint to retrieve applications (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: Record<string, string> = {};
    if (type) where.type = type.toUpperCase();
    if (status) where.status = status.toUpperCase();

    const applications = await prisma.application.findMany({
      where,
      orderBy: { submittedAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
