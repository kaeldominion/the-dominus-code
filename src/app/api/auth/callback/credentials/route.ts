// Explicit callback route for credentials provider
// This handles the actual login POST request
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { encode } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const csrfToken = formData.get("csrfToken") as string;
    const callbackUrl = formData.get("callbackUrl") as string || "/";

    if (!email || !password) {
      return NextResponse.redirect(new URL("/auth/login?error=CredentialsSignin", request.url));
    }

    // Authenticate user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.redirect(new URL("/auth/login?error=CredentialsSignin", request.url));
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.redirect(new URL("/auth/login?error=CredentialsSignin", request.url));
    }

    // Create JWT token
    const token = await encode({
      token: {
        sub: user.id,
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      secret: process.env.NEXTAUTH_SECRET!,
    });

    // Create response with redirect
    const response = NextResponse.redirect(new URL(callbackUrl, request.url));
    
    // Set the session cookie
    response.cookies.set("next-auth.session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(new URL("/auth/login?error=Default", request.url));
  }
}

export async function GET(request: NextRequest) {
  // GET requests to callback should redirect to login
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

