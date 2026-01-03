-- Migration: Add Admin Role and Oracle Tables
-- Run this in Neon SQL Editor

-- Step 1: Create UserRole enum
DO $$ BEGIN
    CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add role column to users table (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'role'
    ) THEN
        ALTER TABLE "users" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER';
    END IF;
END $$;

-- Step 3: Create index on role column
CREATE INDEX IF NOT EXISTS "users_role_idx" ON "users"("role");

-- Step 4: Create oracle_conversations table
CREATE TABLE IF NOT EXISTS "oracle_conversations" (
    "id" TEXT NOT NULL,
    "clientIP" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'English',
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "oracle_conversations_pkey" PRIMARY KEY ("id")
);

-- Step 5: Create oracle_messages table
CREATE TABLE IF NOT EXISTS "oracle_messages" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "oracle_messages_pkey" PRIMARY KEY ("id")
);

-- Step 6: Create foreign key relationship
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'oracle_messages_conversationId_fkey'
    ) THEN
        ALTER TABLE "oracle_messages" 
        ADD CONSTRAINT "oracle_messages_conversationId_fkey" 
        FOREIGN KEY ("conversationId") 
        REFERENCES "oracle_conversations"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE;
    END IF;
END $$;

-- Step 7: Create index on conversationId
CREATE INDEX IF NOT EXISTS "oracle_messages_conversationId_idx" ON "oracle_messages"("conversationId");

-- Step 8: Update existing users to have USER role (if any exist without role)
UPDATE "users" SET "role" = 'USER' WHERE "role" IS NULL;

-- Verification queries (optional - run these to verify):
-- SELECT column_name, data_type, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'users' AND column_name = 'role';

-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name IN ('oracle_conversations', 'oracle_messages');

