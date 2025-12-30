#!/bin/bash
# Setup script to pull production env vars from Vercel
# Usage: ./scripts/setup-production-env.sh

echo "🔧 Setting up production environment variables..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "❌ Vercel CLI not found. Installing..."
  npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
  echo "🔐 Not logged in to Vercel. Please login:"
  vercel login
fi

# Check if project is linked
if [ ! -f ".vercel/project.json" ]; then
  echo "🔗 Linking to existing Vercel project..."
  echo "   Project: the-dominus-code"
  echo ""
  vercel link --yes --project=the-dominus-code --scope=sixa
fi

echo ""
echo "📥 Pulling PRODUCTION environment variables from Vercel..."
vercel env pull .env.production --environment=production

echo ""
echo "✅ Done! Environment variables saved to .env.production"
echo ""
echo "🚀 Now you can run migrations:"
echo "   source .env.production"
echo "   npm run db:migrate:prod"
echo ""
echo "Or use the migration script:"
echo "   ./scripts/migrate-production.sh"

