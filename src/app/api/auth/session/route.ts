// Explicit session route for NextAuth
// This ensures /api/auth/session works correctly
// Actually, let's delegate to the catch-all handler to avoid conflicts
import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authOptions } from "../[...nextauth]/route";

// Use the same handler as the catch-all
const handler = NextAuth(authOptions);

// Delegate to catch-all handler - this ensures consistency
export async function GET(request: NextRequest) {
  return handler(request);
}

