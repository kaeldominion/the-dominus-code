# Neon Password Options

## Option 1: Create a New Database User (Recommended)

Since Neon doesn't have a direct "reset password" option, create a new user:

### Steps:
1. Go to Neon Dashboard → Your Project
2. Click on **"SQL Editor"** (in left sidebar)
3. Run this SQL:

```sql
-- Create a new user
CREATE USER new_user WITH PASSWORD 'your_strong_password_here';

-- Grant all privileges on your database
GRANT ALL PRIVILEGES ON DATABASE neondb TO new_user;

-- Grant privileges on schema
GRANT ALL ON SCHEMA public TO new_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO new_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO new_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO new_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO new_user;
```

4. Create new connection string:
   ```
   postgresql://new_user:your_strong_password_here@ep-wandering-queen-ah90qx7d-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

5. Update `DATABASE_URL` in Vercel with the new connection string

---

## Option 2: Change Password via SQL (If you have admin access)

1. Go to Neon Dashboard → SQL Editor
2. Run:

```sql
ALTER USER neondb_owner WITH PASSWORD 'your_new_strong_password_here';
```

3. Update connection string with new password

---

## Option 3: Create a New Database Branch (Clean Slate)

1. In Neon Dashboard → Your Project
2. Click **"Branches"**
3. Create a new branch
4. Get the new connection string for the branch
5. Use that instead

---

## Option 4: Accept the Risk (Not Recommended)

If you:
- Haven't deployed yet
- Don't have sensitive data
- Will rotate later

You can proceed, but **definitely rotate before production**.

---

## ✅ Recommended: Option 1 (New User)

This is the cleanest approach:
- Keeps your existing setup
- Creates fresh credentials
- Easy to implement

