import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Simple endpoint to reset admin password
// For security, you should add a token check in production
export async function POST(request: NextRequest) {
  try {
    const { email = "admin@thedominuscode.com", password = "ChangeMe123!" } =
      await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update or create admin user
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash: hashedPassword,
        role: "ADMIN",
      },
      create: {
        email,
        name: "Admin",
        passwordHash: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin password reset successfully",
      email: user.email,
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}

