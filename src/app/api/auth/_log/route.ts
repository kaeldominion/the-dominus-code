// Stub route for NextAuth _log endpoint (debug logging)
// Even though debug is disabled, NextAuth might still try to call this
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Just return success - we're not logging in production anyway
  return NextResponse.json({ success: true }, { 
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ success: true }, { 
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

