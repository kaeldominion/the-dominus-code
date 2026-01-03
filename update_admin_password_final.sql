-- Update Admin Password
-- Run this in Neon SQL Editor

UPDATE users 
SET 
  "passwordHash" = '$2b$10$sZIcIH8z0PAejZAIzBVVg.QxjB4vTLE3B6jSPbvaHJayh7eVGdRoO',
  role = 'ADMIN',
  "updatedAt" = NOW()
WHERE email = 'admin@thedominuscode.com';

-- If user doesn't exist, create it
INSERT INTO users (id, email, name, "passwordHash", role, "createdAt", "updatedAt")
VALUES (
  'admin-' || gen_random_uuid()::text,
  'admin@thedominuscode.com',
  'Admin',
  '$2b$10$sZIcIH8z0PAejZAIzBVVg.QxjB4vTLE3B6jSPbvaHJayh7eVGdRoO',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (email) 
DO UPDATE SET 
  "passwordHash" = '$2b$10$sZIcIH8z0PAejZAIzBVVg.QxjB4vTLE3B6jSPbvaHJayh7eVGdRoO',
  role = 'ADMIN',
  "updatedAt" = NOW();

-- Verify
SELECT email, role, "passwordHash" IS NOT NULL as has_password, "updatedAt"
FROM users 
WHERE email = 'admin@thedominuscode.com';

