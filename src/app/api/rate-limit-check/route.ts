import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit-production";

// Simple endpoint to check rate limit status
export async function GET(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = await checkRateLimit(`oracle:${clientIP}`, 30);
    
    const resetInMinutes = Math.ceil((rateLimit.resetAt - Date.now()) / 1000 / 60);
    
    return NextResponse.json({
      ip: clientIP,
      allowed: rateLimit.allowed,
      remaining: rateLimit.remaining,
      limit: 30,
      resetAt: new Date(rateLimit.resetAt).toISOString(),
      resetInMinutes: resetInMinutes > 0 ? resetInMinutes : 0,
      usingRedis: !!process.env.UPSTASH_REDIS_REST_URL,
    });
  } catch (error) {
    console.error("Rate limit check error:", error);
    return NextResponse.json(
      { error: "Failed to check rate limit" },
      { status: 500 }
    );
  }
}


