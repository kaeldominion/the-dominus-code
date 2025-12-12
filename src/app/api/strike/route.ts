import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://n8n.srv923142.hstgr.cloud/webhook/war-room";
const AUTH_TOKEN = "SPENCER_IS_KING_2026";

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body correctly
    const body = await request.json();
    const { tweet_url, stance } = body;

    // Validate required fields
    if (!tweet_url || !stance) {
      return NextResponse.json(
        { error: "Missing required fields: tweet_url and stance are required" },
        { status: 400 }
      );
    }

    // Validate stance value
    if (stance !== "REINFORCE" && stance !== "CORRECT") {
      return NextResponse.json(
        { error: "Invalid stance. Must be 'REINFORCE' or 'CORRECT'" },
        { status: 400 }
      );
    }

    // Validate tweet URL format
    if (!tweet_url.includes("x.com/") && !tweet_url.includes("twitter.com/")) {
      return NextResponse.json(
        { error: "Invalid tweet URL. Must be a valid X/Twitter URL" },
        { status: 400 }
      );
    }

    // Prepare the body to forward to N8N
    const forwardBody = {
      tweet_url: tweet_url.trim(),
      stance: stance,
    };

    // Forward the request to N8N webhook (server-side, secure)
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer SPENCER_IS_KING_2026',
        'Content-Type': 'application/json', // Explicitly set Content-Type
      },
      body: JSON.stringify(forwardBody), // Ensure body is stringified
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
      return { message: text || "Strike sent successfully" };
    });

    // Return the N8N response to the client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in strike API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

