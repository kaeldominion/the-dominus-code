#!/bin/bash
# Migration script for Neon database
# Usage: ./scripts/migrate-neon.sh

echo "🚀 Running Prisma migrations on Neon..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL environment variable is not set"
  echo ""
  echo "Please set it first:"
  echo "  export DATABASE_URL='postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require'"
  echo ""
  echo "Or add it to .env.local and source it:"
  echo "  source .env.local"
  exit 1
fi

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Create migration (if needed)
echo "📝 Creating migration..."
npx prisma migrate dev --name init

# Deploy migration
echo "🚀 Deploying migration to Neon..."
npx prisma migrate deploy

echo "✅ Migration complete!"


