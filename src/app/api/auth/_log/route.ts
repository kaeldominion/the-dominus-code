// Stub route for NextAuth _log endpoint (debug logging)
// Even though debug is disabled, NextAuth might still try to call this
import { NextRequest, NextResponse } from "next/server";

// Handle all methods to prevent 405 errors
export async function POST(request: NextRequest) {
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

// Also handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

