# Neon + Vercel Integration Checklist

## ✅ What to Verify on the Neon Setup Page

### 1. **Connection String Format**
Your `DATABASE_URL` should look like:
```
postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Important:** Must include `?sslmode=require` at the end!

### 2. **Environment Variable**
- ✅ Variable name: `DATABASE_URL`
- ✅ Should be added to **ALL environments** (Production, Preview, Development)
- ✅ Value should be the full connection string from Neon

### 3. **Database Settings**
- ✅ **Region:** Choose closest to your Vercel region (e.g., `us-east-1` or `us-east-2`)
- ✅ **Compute Size:** Start with smallest (free tier)
- ✅ **Auto-suspend:** Can be enabled (saves resources, wakes on first query)

### 4. **Prisma Configuration**
Your setup should match:
- ✅ `provider = "postgresql"` in `schema.prisma` ✓ (Already set)
- ✅ Connection pooling enabled (Neon handles this automatically)

### 5. **Vercel Build Settings**
Your `vercel.json` should have:
```json
{
  "buildCommand": "prisma generate && next build"
}
```
✓ Already configured!

---

## 🔧 Common Issues to Watch For

### Issue 1: Missing SSL Mode
❌ Wrong: `postgresql://user:pass@host/db`
✅ Correct: `postgresql://user:pass@host/db?sslmode=require`

### Issue 2: Wrong Environment
- Make sure `DATABASE_URL` is set for **Production** environment
- Not just Preview or Development

### Issue 3: Prisma Client Not Generated
- Vercel should auto-run `prisma generate` during build
- Check build logs if you see "PrismaClient not found" errors

### Issue 4: Connection Pooling
- Neon uses connection pooling automatically
- No need for PgBouncer or extra config
- Your Prisma setup is already correct

---

## 🧪 Test After Setup

1. **Deploy to Vercel**
2. **Check Function Logs** for database connection errors
3. **Submit a test application** via your site
4. **Verify in Neon Dashboard** that data appears

---

## 📝 Quick Verification Commands

After deployment, you can test the connection:

```bash
# In Vercel CLI or local with production env
npx prisma db pull  # Should connect successfully
npx prisma studio   # Should open with your tables
```

---

## ✅ Your Current Setup Status

- ✅ Prisma schema: PostgreSQL configured
- ✅ Prisma client: Properly set up
- ✅ Vercel build: Includes Prisma generate
- ⏳ Environment variable: Need to add `DATABASE_URL` in Vercel dashboard
- ⏳ Database migration: Run after first deploy

---

## 🚀 Next Steps

1. **Copy the connection string** from Neon dashboard
2. **Add to Vercel:** Project Settings → Environment Variables
3. **Deploy** your project
4. **Run migration:** `npx prisma migrate deploy` (or use Neon SQL editor)


