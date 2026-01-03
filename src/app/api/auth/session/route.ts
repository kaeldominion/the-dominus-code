// Explicit session route for NextAuth
// This ensures /api/auth/session works even if catch-all doesn't
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    return NextResponse.json(session || {});
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json(
      { error: "Failed to get session" },
      { status: 500 }
    );
  }
}

