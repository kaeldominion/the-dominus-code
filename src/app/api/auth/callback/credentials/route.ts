// Explicit callback route for credentials provider
// This handles the actual login POST request
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose";

export const dynamic = "force-dynamic";

async function createSessionToken(user: { id: string; email: string; name: string | null; role: string }) {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
  
  const token = await new jose.SignJWT({
    sub: user.id,
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
  })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
  
  return token;
}

export async function POST(request: NextRequest) {
  try {
    // NextAuth signIn() sends application/x-www-form-urlencoded
    let email: string | null = null;
    let password: string | null = null;
    let callbackUrl = "/admin/dashboard";
    let json = false;

    const contentType = request.headers.get("content-type") || "";
    console.log("Callback content-type:", contentType);
    
    if (contentType.includes("application/json")) {
      json = true;
      const body = await request.json();
      email = body.email;
      password = body.password;
      callbackUrl = body.callbackUrl || body.redirect || "/admin/dashboard";
      console.log("JSON body:", { email, hasPassword: !!password });
    } else {
      // Parse as form data (x-www-form-urlencoded or multipart)
      const formData = await request.formData();
      email = formData.get("email") as string;
      password = formData.get("password") as string;
      callbackUrl = (formData.get("callbackUrl") as string) || "/admin/dashboard";
      json = formData.get("json") === "true";
      console.log("Form data:", { email, hasPassword: !!password, json });
    }

    // Validate input
    if (!email || !password) {
      console.error("Missing email or password");
      return NextResponse.json(
        { error: "CredentialsSignin", ok: false, status: 401, url: null },
        { status: 200 } // NextAuth expects 200 even for auth failures
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`User not found: ${email}`);
      return NextResponse.json(
        { error: "CredentialsSignin", ok: false, status: 401, url: null },
        { status: 200 }
      );
    }

    if (!user.passwordHash) {
      console.error(`No password hash for: ${email}`);
      return NextResponse.json(
        { error: "CredentialsSignin", ok: false, status: 401, url: null },
        { status: 200 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      console.error(`Invalid password for: ${email}`);
      return NextResponse.json(
        { error: "CredentialsSignin", ok: false, status: 401, url: null },
        { status: 200 }
      );
    }

    console.log(`Login successful for: ${email}, role: ${user.role}`);

    // Create JWT token using jose (more reliable than next-auth/jwt)
    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Return success response with cookie
    const response = NextResponse.json({
      error: null,
      ok: true,
      status: 200,
      url: callbackUrl,
    });
    
    // Set session cookie
    response.cookies.set("next-auth.session-token", token, {
      httpOnly: true,
      secure: true, // Always secure in production
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
    
    // Also set for __Secure- prefix (production)
    response.cookies.set("__Secure-next-auth.session-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Callback error:", error?.message || error);
    return NextResponse.json(
      { error: "Default", message: error?.message, ok: false, status: 500, url: null },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/auth/login", request.url));
}

