// Explicit session route for NextAuth
// This ensures /api/auth/session works even if catch-all doesn't
// Actually, let's just redirect to the catch-all route handler
import { NextRequest } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import NextAuth from "next-auth";

// Re-export the handler from the catch-all route
const handler = NextAuth(authOptions);

export async function GET(request: NextRequest) {
  // Delegate to the catch-all route handler
  return handler(request);
}

