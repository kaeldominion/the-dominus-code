import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";

/**
 * Migration API endpoint
 * 
 * This runs Prisma migrations on Neon database.
 * 
 * SECURITY: Add authentication before using in production!
 * For now, this is a simple endpoint to trigger migrations.
 * 
 * Usage: POST /api/migrate
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication/authorization here
    // For now, we'll allow it but you should protect this endpoint
    
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.MIGRATION_TOKEN;
    
    // Simple token auth (set MIGRATION_TOKEN in Vercel env vars)
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("🔄 Starting database migration...");

    // Generate Prisma Client
    execSync("npx prisma generate", { stdio: "inherit" });

    // Deploy migrations
    execSync("npx prisma migrate deploy", { 
      stdio: "inherit",
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL,
      }
    });

    console.log("✅ Migration complete!");

    return NextResponse.json({
      success: true,
      message: "Database migration completed successfully",
    });
  } catch (error: any) {
    console.error("❌ Migration failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Migration failed",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check migration status
export async function GET() {
  try {
    // Check if tables exist
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    
    // Try to query applications table
    const count = await prisma.application.count();
    
    await prisma.$disconnect();

    return NextResponse.json({
      status: "connected",
      tablesExist: true,
      applicationCount: count,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
      tablesExist: false,
    });
  }
}


