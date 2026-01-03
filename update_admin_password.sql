-- Update Admin Password
-- Run this in Neon SQL Editor

UPDATE users 
SET 
  "passwordHash" = '$2b$10$ODUmTKkqvxR/6M/k1Nr1SO5B.3tps2wCmboC53qZjNXg4iqSorV4S',
  role = 'ADMIN',
  "updatedAt" = NOW()
WHERE email = 'admin@thedominuscode.com';

-- Verify the update
SELECT email, role, "passwordHash" IS NOT NULL as has_password, "updatedAt"
FROM users 
WHERE email = 'admin@thedominuscode.com';

