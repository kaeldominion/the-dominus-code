// Explicit session route for NextAuth
// This ensures /api/auth/session works correctly
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    // getServerSession needs the request in App Router
    const session = await getServerSession(authOptions);
    
    // NextAuth expects the session object with user property, or null
    // Ensure we return a proper object structure
    if (!session) {
      return NextResponse.json(null, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      });
    }
    
    // Return session in NextAuth format
    return NextResponse.json(session, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Session API error:", error);
    // Return null on error (NextAuth expects null, not error)
    return NextResponse.json(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  }
}

