# Production Setup Guide

## ✅ What You Have (No Separate Backend Needed!)

Your Next.js app **IS** your backend! The API routes (`/api/oracle`, `/api/application`) run as serverless functions on Vercel.

## 🚀 Production Requirements

### 1. **Database** (Required)
Currently using SQLite (local only). For production, choose one:

**Option A: Vercel Postgres** (Recommended - Easiest)
- Built into Vercel dashboard
- Free tier: 256MB storage
- Automatic connection string
- Steps:
  1. Go to Vercel project → Storage → Create Database → Postgres
  2. Copy connection string to `.env.production`
  3. Update Prisma schema (see below)

**Option B: Supabase** (Free tier: 500MB)
- Great free tier
- Easy setup
- Connection: `postgresql://user:pass@host:5432/db`

**Option C: PlanetScale** (MySQL, free tier available)
- Serverless MySQL
- Good for scaling

### 2. **Rate Limiting** (Required)
Current in-memory rate limiting won't work on serverless. Use:

**Option A: Upstash Redis** (Recommended)
- Free tier: 10K commands/day
- Perfect for serverless
- Setup: https://upstash.com

**Option B: Vercel KV** (Vercel's Redis)
- Integrated with Vercel
- Paid service

### 3. **Environment Variables** (Required)
Set these in Vercel dashboard → Settings → Environment Variables:

```
DATABASE_URL=postgresql://... (from Vercel Postgres)
GEMINI_API_KEY=your_key_here
UPSTASH_REDIS_REST_URL=https://... (if using Upstash)
UPSTASH_REDIS_REST_TOKEN=... (if using Upstash)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate_random_secret
```

## 📝 Migration Steps

1. **Update Prisma Schema** (switch to PostgreSQL)
2. **Add Upstash Redis** for rate limiting
3. **Deploy to Vercel**
4. **Run migrations** in production

See the updated files below.


