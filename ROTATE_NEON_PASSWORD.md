# How to Rotate Your Neon Database Password

## Why Rotate?

You shared your database connection string in chat, which contains your password. Anyone with that string can access your database.

## Steps to Rotate

### Step 1: Go to Neon Dashboard
1. Visit: https://console.neon.tech
2. Log in to your account
3. Select your project (the one with database `neondb`)

### Step 2: Reset the Password
1. In the left sidebar, click **"Settings"**
2. Click on **"Database"** tab
3. Find the **"Reset Password"** button (usually near the connection strings)
4. Click **"Reset Password"**
5. Neon will generate a new password automatically

### Step 3: Copy the New Connection String
After resetting, Neon will show you new connection strings:
- Copy the **pooled** connection string (the one with `-pooler` in the URL)
- It should look like:
  ```
  postgresql://neondb_owner:NEW_PASSWORD@ep-wandering-queen-ah90qx7d-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
  ```

### Step 4: Update Vercel Environment Variable
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Find `DATABASE_URL` (or create it if it doesn't exist)
5. Click **Edit** (or **Add**)
6. Paste the NEW connection string
7. Make sure it's set for **Production** environment
8. Click **Save**

### Step 5: Update Local Development (Optional)
If you're developing locally:
1. Open `.env.local` file
2. Update the `DATABASE_URL` line with the new connection string
3. Save the file

### Step 6: Verify It Works
After updating:
1. Deploy your project (or wait for auto-deploy)
2. Test by submitting an application
3. Check Neon dashboard to see if data appears

---

## ⚠️ Important Notes

- **Old connection string no longer works** - The old password is invalid
- **Update everywhere** - Vercel, local `.env.local`, any other services
- **Keep it secret** - Never share connection strings in chat/email/git

---

## ✅ You're Done!

Once you've updated the password in Neon and added the new connection string to Vercel, you're secure again.


