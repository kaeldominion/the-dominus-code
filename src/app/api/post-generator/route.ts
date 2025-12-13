import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://n8n.srv923142.hstgr.cloud/webhook/post-generator";
const AUTH_TOKEN = "SPENCER_IS_KING_2026";

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    const { topic } = body;

    // Validate required fields
    if (!topic) {
      return NextResponse.json(
        { error: "Missing required field: topic is required" },
        { status: 400 }
      );
    }

    // Forward the request to N8N webhook (server-side, secure)
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer SPENCER_IS_KING_2026',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      return NextResponse.json(
        { error: `N8N webhook error: ${response.status} ${errorText}` },
        { status: response.status }
      );
    }

    // Try to parse JSON response, fallback to text
    const data = await response.json().catch(async () => {
      const text = await response.text();
      return { message: text || "Request processed successfully" };
    });

    // Return the N8N response to the client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in post-generator API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

