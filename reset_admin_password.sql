-- Reset Admin Password
-- Run this in Neon SQL Editor
-- This will create/update the admin user with a new password hash

-- First, let's check if the user exists and what their current role is
SELECT email, role, CASE WHEN passwordHash IS NOT NULL THEN 'Has password' ELSE 'No password' END as password_status
FROM users 
WHERE email = 'admin@thedominuscode.com';

-- If you need to manually set a password hash, you can generate one using Node.js:
-- node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('ChangeMe123!', 10).then(h => console.log(h))"
-- Then update with:
-- UPDATE users SET "passwordHash" = '$2a$10$...' WHERE email = 'admin@thedominuscode.com';

-- Or, to ensure the user exists with ADMIN role:
INSERT INTO users (id, email, name, "passwordHash", role, "createdAt", "updatedAt")
VALUES (
  'admin-' || gen_random_uuid()::text,
  'admin@thedominuscode.com',
  'Admin',
  NULL, -- Will be set by seed script
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (email) 
DO UPDATE SET 
  role = 'ADMIN',
  "updatedAt" = NOW();

-- Verify the user
SELECT email, role, "passwordHash" IS NOT NULL as has_password
FROM users 
WHERE email = 'admin@thedominuscode.com';

