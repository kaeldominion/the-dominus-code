// Explicit signin route for NextAuth
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Redirect to our custom login page
  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") || "/";
  return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url));
}

export async function POST(request: NextRequest) {
  // POST to signin should redirect to callback
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

