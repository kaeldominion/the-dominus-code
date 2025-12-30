#!/bin/bash
# Quick migration script for Neon production database
# Usage: ./scripts/migrate-production.sh

set -e

echo "🚀 Production Migration Tool"
echo ""

# Auto-load from .env.production if it exists
if [ -f ".env.production" ]; then
  echo "📂 Loading from .env.production..."
  set -a
  source .env.production
  set +a
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not found!"
  echo ""
  echo "Run this first to pull from Vercel:"
  echo "  npm run db:setup:prod"
  echo ""
  echo "Or set manually:"
  echo "  export DATABASE_URL='postgresql://...'"
  exit 1
fi

# Verify DATABASE_URL is for Neon (not SQLite)
if [[ "$DATABASE_URL" == file:* ]]; then
  echo "❌ Error: DATABASE_URL points to SQLite (local dev)"
  echo "   This script is for PRODUCTION (Neon PostgreSQL)"
  echo "   Make sure you're using the Neon connection string"
  exit 1
fi

echo "✅ DATABASE_URL found"
echo "🔍 Database: $(echo $DATABASE_URL | sed 's/.*@\([^/]*\).*/\1/')"
echo ""

# Confirm
read -p "⚠️  This will run migrations on PRODUCTION. Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Cancelled"
  exit 1
fi

echo ""
echo "📦 Step 1: Generating Prisma Client..."
npx prisma generate

echo ""
echo "🚀 Step 2: Deploying migrations to Neon..."
echo "   (This will apply all pending migrations)"
echo ""
npx prisma migrate deploy

echo ""
echo "✅ Migration complete!"
echo ""
echo "🧪 Verify:"
echo "   npx prisma studio --browser none"
echo "   (Opens Prisma Studio to view your data)"

