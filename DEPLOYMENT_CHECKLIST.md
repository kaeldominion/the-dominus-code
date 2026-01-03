# 🚀 Production Deployment Checklist

## ✅ Quick Answer: **No Separate Backend Needed!**

Your Next.js API routes (`/api/oracle`, `/api/application`) **ARE** your backend. They run as serverless functions on Vercel.

---

## 📋 Pre-Deployment Setup

### 1. **Database Setup** (Required)

**Option A: Vercel Postgres** (Easiest - Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. Copy the connection string (starts with `postgresql://`)
5. Add to Vercel Environment Variables as `DATABASE_URL`

**Option B: Supabase** (Free tier: 500MB)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Copy connection string
4. Add to Vercel as `DATABASE_URL`

### 2. **Rate Limiting Setup** (Required)

**Upstash Redis** (Free tier: 10K commands/day)
1. Create account at [upstash.com](https://console.upstash.com/)
2. Create Redis database
3. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
4. Add both to Vercel Environment Variables

### 3. **Environment Variables in Vercel**

Go to: **Project Settings → Environment Variables**

Add these:
```
DATABASE_URL=postgresql://... (from Vercel Postgres)
GEMINI_API_KEY=your_key_here
UPSTASH_REDIS_REST_URL=https://... (from Upstash)
UPSTASH_REDIS_REST_TOKEN=... (from Upstash)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate_random_secret_here
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 🚢 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Production ready"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects Next.js

### Step 3: Set Environment Variables
- Add all variables from step 3 above
- Make sure to add them for **Production** environment

### Step 4: Deploy
- Vercel will auto-deploy
- First deploy will fail (no database yet)

### Step 5: Run Database Migrations
After first deploy, run:
```bash
# In Vercel dashboard → Deployments → Click on deployment → View Function Logs
# Or use Vercel CLI:
vercel env pull .env.production
npx prisma migrate deploy
```

**Or use Vercel's Postgres:**
- Vercel Postgres has a built-in SQL editor
- You can run migrations there

---

## 🔧 Post-Deployment

### 1. **Verify Database Connection**
- Check Vercel function logs
- Should see: `✅ Application logged: ...`

### 2. **Test Rate Limiting**
- Try sending 30+ messages to Oracle
- Should get rate limit error

### 3. **View Applications**
```bash
# Local (if you have DATABASE_URL set)
npx prisma studio
```

Or use Vercel Postgres dashboard to view data.

---

## 💰 Cost Estimate

**Free Tier:**
- ✅ Vercel: Free (hobby plan)
- ✅ Vercel Postgres: Free (256MB)
- ✅ Upstash Redis: Free (10K commands/day)
- ✅ Gemini API: Pay-as-you-go (you have paid account)

**Total: $0/month** (until you scale)

---

## 🆘 Troubleshooting

### Database Connection Issues
- Check `DATABASE_URL` format
- Ensure SSL mode: `?sslmode=require`
- Verify database is accessible from Vercel

### Rate Limiting Not Working
- Check Upstash Redis credentials
- Verify environment variables are set
- Check function logs for errors

### Prisma Issues
- Run `npx prisma generate` before build
- Ensure `DATABASE_URL` is set correctly
- Check Prisma version matches

---

## 📊 Monitoring

**Vercel Dashboard:**
- Function logs
- Analytics
- Error tracking

**Upstash Dashboard:**
- Redis usage
- Rate limit stats

**Database:**
- Use Prisma Studio or Vercel Postgres dashboard
- Query applications: `SELECT * FROM applications;`

---

## ✅ You're Ready!

Your app is now production-ready. No separate backend server needed - everything runs on Vercel's serverless infrastructure.


