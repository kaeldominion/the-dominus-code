// Explicit CSRF route for NextAuth
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Generate or retrieve CSRF token
  const cookieStore = await cookies();
  let csrfToken = cookieStore.get("next-auth.csrf-token")?.value;
  
  if (!csrfToken) {
    // Generate new token
    csrfToken = crypto.randomBytes(32).toString("hex");
  }
  
  // Extract just the token part (before the hash if present)
  const token = csrfToken.split("|")[0];
  
  return new NextResponse(JSON.stringify({ csrfToken: token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

