// Explicit callback route for credentials provider
// This handles the actual login POST request
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { encode } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Try to parse as JSON first (from signIn()), then formData
    let email: string | null = null;
    let password: string | null = null;
    let callbackUrl = "/";
    let isJsonRequest = false;

    const contentType = request.headers.get("content-type") || "";
    
    if (contentType.includes("application/json")) {
      isJsonRequest = true;
      const body = await request.json();
      email = body.email;
      password = body.password;
      callbackUrl = body.callbackUrl || body.redirect || "/";
    } else {
      const formData = await request.formData();
      email = formData.get("email") as string;
      password = formData.get("password") as string;
      callbackUrl = (formData.get("callbackUrl") as string) || "/";
    }

    if (!email || !password) {
      if (isJsonRequest) {
        return NextResponse.json({ error: "CredentialsSignin", ok: false, status: 401, url: null }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/auth/login?error=CredentialsSignin", request.url));
    }

    // Authenticate user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      if (isJsonRequest) {
        return NextResponse.json({ error: "CredentialsSignin", ok: false, status: 401, url: null }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/auth/login?error=CredentialsSignin", request.url));
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      if (isJsonRequest) {
        return NextResponse.json({ error: "CredentialsSignin", ok: false, status: 401, url: null }, { status: 401 });
      }
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

    // For JSON requests (signIn()), return JSON response with cookie
    if (isJsonRequest) {
      const response = NextResponse.json({
        error: null,
        ok: true,
        status: 200,
        url: callbackUrl,
      });
      
      response.cookies.set("next-auth.session-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });
      
      return response;
    }

    // For form submissions, redirect
    const response = NextResponse.redirect(new URL(callbackUrl, request.url));
    
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
    return NextResponse.json({ error: "Default", ok: false, status: 500, url: null }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // GET requests to callback should redirect to login
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

