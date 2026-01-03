#!/bin/bash
# Create a new migration (for when you change the schema)
# Usage: ./scripts/create-migration.sh [migration_name]

set -e

MIGRATION_NAME=${1:-"update_$(date +%Y%m%d_%H%M%S)"}

echo "📝 Creating new migration: $MIGRATION_NAME"
echo ""

# Auto-load from .env.production if it exists
if [ -f ".env.production" ]; then
  set -a
  source .env.production
  set +a
fi

# Use local SQLite for creating migrations (faster, safer)
export DATABASE_URL="file:./dev.db"

echo "📦 Generating Prisma Client..."
npx prisma generate

echo ""
echo "📝 Creating migration against local schema..."
npx prisma migrate dev --name "$MIGRATION_NAME"

echo ""
echo "✅ Migration created!"
echo ""
echo "🚀 Next step: Deploy to production"
echo "   npm run db:migrate:prod"


