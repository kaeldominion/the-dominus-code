#!/usr/bin/env node
/**
 * Neon Migration Script
 * 
 * Usage:
 *   DATABASE_URL="postgresql://..." node scripts/migrate-neon.js
 * 
 * Or set DATABASE_URL in .env.local first
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load .env.local if it exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  });
}

if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL is not set');
  console.error('');
  console.error('Please set it:');
  console.error('  export DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require"');
  console.error('');
  console.error('Or add it to .env.local');
  process.exit(1);
}

console.log('🚀 Running Prisma migrations on Neon...\n');

try {
  // Generate Prisma Client
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Check if migrations folder exists
  const migrationsPath = path.join(process.cwd(), 'prisma', 'migrations');
  const hasMigrations = fs.existsSync(migrationsPath) && 
                        fs.readdirSync(migrationsPath).length > 0;

  if (!hasMigrations) {
    // Create initial migration
    console.log('\n📝 Creating initial migration...');
    execSync('npx prisma migrate dev --create-only --name init', { stdio: 'inherit' });
  }

  // Deploy migration
  console.log('\n🚀 Deploying migration to Neon...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });

  console.log('\n✅ Migration complete!');
} catch (error) {
  console.error('\n❌ Migration failed:', error.message);
  process.exit(1);
}

