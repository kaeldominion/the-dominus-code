// Production rate limiter using Upstash Redis
// Falls back to in-memory for local development

import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

// Initialize Redis client (will be undefined if env vars not set)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Fallback in-memory store for local dev
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Simple in-memory cache for rate limit results (5 second TTL)
const rateLimitCache = new Map<string, { result: { allowed: boolean; remaining: number; resetAt: number }; expires: number }>();

// Clean up old entries every 5 minutes
if (!redis) {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

// Clean up rate limit cache every minute
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitCache.entries()) {
    if (entry.expires < now) {
      rateLimitCache.delete(key);
    }
  }
}, 60 * 1000);

export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 30,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  // Check cache first (only for Redis, skip for in-memory)
  if (redis) {
    const cacheKey = `cache:${key}`;
    const cached = rateLimitCache.get(cacheKey);
    if (cached && cached.expires > now) {
      return cached.result;
    }
  }

  // Use Redis in production
  if (redis) {
    try {
      const current = await redis.get<number>(key);
      
      if (current === null) {
        // First request - set with expiration
        await redis.setex(key, Math.floor(windowMs / 1000), 1);
        const result = {
          allowed: true,
          remaining: maxRequests - 1,
          resetAt: now + windowMs,
        };
        // Cache result for 5 seconds
        rateLimitCache.set(`cache:${key}`, { result, expires: now + 5000 });
        return result;
      }

      if (current >= maxRequests) {
        const ttl = await redis.ttl(key);
        // If TTL is negative or zero, the key should have expired - reset it
        if (ttl <= 0) {
          await redis.del(key);
          await redis.setex(key, Math.floor(windowMs / 1000), 1);
          const result = {
            allowed: true,
            remaining: maxRequests - 1,
            resetAt: now + windowMs,
          };
          rateLimitCache.set(`cache:${key}`, { result, expires: now + 5000 });
          return result;
        }
        const result = {
          allowed: false,
          remaining: 0,
          resetAt: now + (ttl * 1000),
        };
        // Cache result for 5 seconds
        rateLimitCache.set(`cache:${key}`, { result, expires: now + 5000 });
        return result;
      }

      // Increment counter
      const newCount = await redis.incr(key);
      const ttl = await redis.ttl(key);
      const result = {
        allowed: true,
        remaining: maxRequests - newCount,
        resetAt: now + (ttl * 1000),
      };
      // Cache result for 5 seconds
      rateLimitCache.set(`cache:${key}`, { result, expires: now + 5000 });
      return result;
    } catch (error) {
      console.error("Redis rate limit error:", error);
      // Fall through to in-memory fallback
    }
  }

  // Fallback to in-memory for local dev or if Redis fails
  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
    };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

export function getClientIP(request: Request | NextRequest): string {
  // Try to get real IP from headers (for proxies/Vercel)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIP = forwarded.split(",")[0].trim();
    if (firstIP && firstIP !== "unknown") {
      return firstIP;
    }
  }
  
  const realIP = request.headers.get("x-real-ip");
  if (realIP && realIP !== "unknown") {
    return realIP;
  }
  
  // Try Vercel-specific header
  const vercelIP = request.headers.get("x-vercel-forwarded-for");
  if (vercelIP) {
    const firstIP = vercelIP.split(",")[0].trim();
    if (firstIP && firstIP !== "unknown") {
      return firstIP;
    }
  }
  
  // Fallback - use a session-based identifier if IP is truly unknown
  // This prevents all users from sharing the same rate limit
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Last resort: return unknown but log it
  console.warn("Could not determine client IP, using 'unknown' - this may cause rate limit issues");
  return "unknown";
}


