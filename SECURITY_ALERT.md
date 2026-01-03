# ⚠️ SECURITY ALERT

## Your database credentials were exposed!

You shared your Neon database connection string publicly. **You need to rotate your password immediately.**

### Steps to Rotate:

1. **Go to Neon Dashboard:**
   - https://console.neon.tech
   - Navigate to your project

2. **Reset Database Password:**
   - Go to Settings → Database
   - Click "Reset Password"
   - Generate a new password

3. **Update Vercel Environment Variable:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Update `DATABASE_URL` with the new connection string
   - Make sure to use the **pooled** connection (ends with `-pooler`)

4. **Update Local `.env.local`:**
   - Update your local environment file with new credentials

### Going Forward:

- ✅ **NEVER** share connection strings in chat/email
- ✅ Use environment variables only
- ✅ Add `.env.local` to `.gitignore` (should already be there)
- ✅ Use Vercel's environment variable UI for production

---

## ✅ Correct Setup

**In Vercel Environment Variables:**
- Variable: `DATABASE_URL`
- Value: `postgresql://user:NEW_PASSWORD@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require`
- Environment: Production (and Preview if needed)

**Never commit credentials to git!**


