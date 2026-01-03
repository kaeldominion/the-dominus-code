import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const { ip } = await request.json();

    if (!ip) {
      return NextResponse.json(
        { error: "IP address is required" },
        { status: 400 }
      );
    }

    const key = `ratelimit:oracle:${ip}`;
    
    if (redis) {
      await redis.del(key);
      return NextResponse.json({
        success: true,
        message: `Rate limit cleared for IP: ${ip}`,
        key,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Redis not configured. Rate limit is in-memory only.",
    });
  } catch (error) {
    console.error("Clear rate limit error:", error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to clear rate limit" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await requireAdmin();

    if (redis) {
      const keys = await redis.keys("ratelimit:oracle:*");
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      return NextResponse.json({
        success: true,
        message: `Cleared ${keys.length} rate limit entries`,
        cleared: keys.length,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Redis not configured",
    });
  } catch (error) {
    console.error("Clear all rate limits error:", error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to clear rate limits" },
      { status: 500 }
    );
  }
}
