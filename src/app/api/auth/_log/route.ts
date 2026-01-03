// Stub route for NextAuth _log endpoint
// NextAuth tries to POST here even with debug disabled
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const jsonResponse = () => new NextResponse(JSON.stringify({ ok: true }), {
  status: 200,
  headers: { "Content-Type": "application/json" },
});

export async function GET(request: NextRequest) {
  return jsonResponse();
}

export async function POST(request: NextRequest) {
  return jsonResponse();
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
