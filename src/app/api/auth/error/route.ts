import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");

  // Redirect to login page with error message
  const loginUrl = new URL("/auth/login", request.url);
  if (error) {
    loginUrl.searchParams.set("error", error);
  }

  return NextResponse.redirect(loginUrl);
}

// Handle other methods
export async function POST(request: NextRequest) {
  return GET(request);
}

