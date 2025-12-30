# 🚀 Quick Migration Guide

## First Time Setup (One-time)

### Step 1: Link to Vercel Project
```bash
npm run db:setup:prod
```

This will:
- Install Vercel CLI (if needed)
- Login to Vercel (if needed)
- Link to your project
- Pull production environment variables to `.env.production`

---

## Running Migrations (Every Time)

### Quick Method:
```bash
npm run db:migrate:prod
```

This will:
1. Load `DATABASE_URL` from `.env.production`
2. Generate Prisma Client
3. Create migration (if schema changed)
4. Deploy to Neon production database
5. Ask for confirmation before running

---

## Manual Method (If Needed)

### Option 1: Using .env.production
```bash
# Load production env vars
source .env.production

# Run migration
npx prisma migrate deploy
```

### Option 2: Direct Connection String
```bash
# Set DATABASE_URL
export DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db?sslmode=require"

# Run migration
npx prisma migrate deploy
```

---

## Workflow

### When You Change Prisma Schema:

1. **Update schema** (`prisma/schema.prisma`)

2. **Test locally** (SQLite):
   ```bash
   npm run db:push
   ```

3. **Create migration for production**:
   ```bash
   npm run db:migrate:prod
   ```
   - This creates the migration file
   - Deploys it to Neon

4. **Verify**:
   ```bash
   npx prisma studio
   ```
   - Opens Prisma Studio
   - Check your production data

---

## Troubleshooting

### "DATABASE_URL not found"
- Run: `npm run db:setup:prod` to pull from Vercel
- Or manually add to `.env.production`

### "Points to SQLite"
- Make sure you're using Neon connection string
- Check `.env.production` has the correct `DATABASE_URL`

### "Migration failed"
- Check Neon dashboard - database might be paused
- Verify connection string is correct
- Check SSL mode: `?sslmode=require`

---

## Quick Commands Reference

```bash
# Setup (first time)
npm run db:setup:prod

# Run migrations
npm run db:migrate:prod

# View data
npx prisma studio

# Check connection
npx prisma db pull
```

---

## ✅ That's It!

Now you can quickly run migrations against production from your local machine!

