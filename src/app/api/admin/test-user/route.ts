import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
  try {
    const email = "admin@thedominuscode.com";
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        exists: false,
        message: "User not found",
      });
    }

    // Test password
    const testPassword = "ChangeMe123!";
    const passwordMatch =
      user.passwordHash &&
      (await bcrypt.compare(testPassword, user.passwordHash));

    return NextResponse.json({
      exists: true,
      email: user.email,
      role: user.role,
      hasPassword: !!user.passwordHash,
      passwordMatch,
      passwordHashLength: user.passwordHash?.length || 0,
      env: {
        nextAuthUrl: process.env.NEXTAUTH_URL || "NOT SET",
        nextAuthSecret: process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET",
        databaseUrl: process.env.DATABASE_URL ? "SET" : "NOT SET",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

