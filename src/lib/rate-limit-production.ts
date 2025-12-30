// Production rate limiter using Upstash Redis
// Falls back to in-memory for local development

import { Redis } from "@upstash/redis";

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

export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 30,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  // Use Redis in production
  if (redis) {
    try {
      const current = await redis.get<number>(key);
      
      if (current === null) {
        // First request
        await redis.setex(key, Math.floor(windowMs / 1000), 1);
        return {
          allowed: true,
          remaining: maxRequests - 1,
          resetAt: now + windowMs,
        };
      }

      if (current >= maxRequests) {
        const ttl = await redis.ttl(key);
        return {
          allowed: false,
          remaining: 0,
          resetAt: now + (ttl * 1000),
        };
      }

      // Increment counter
      const newCount = await redis.incr(key);
      return {
        allowed: true,
        remaining: maxRequests - newCount,
        resetAt: now + (await redis.ttl(key)) * 1000,
      };
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

export function getClientIP(request: Request): string {
  // Try to get real IP from headers (for proxies/Vercel)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  
  // Fallback
  return "unknown";
}

