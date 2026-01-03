# Admin Authentication & Dashboard Setup

## Overview
The admin authentication system has been implemented using NextAuth.js with Neon PostgreSQL. This includes:
- Admin login with email/password
- Admin dashboard with stats and analytics
- Applications management (Council & Dynasty)
- Oracle conversation analytics
- Access to generator tools

## Setup Steps

### 1. Environment Variables
Add to your `.env` file:
```bash
NEXTAUTH_SECRET=your-secret-key-here  # Generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3003   # Or your production URL
```

### 2. Database Migration
Run the migration to create the new tables and update the User model:
```bash
npm run db:migrate
```

Or if using Neon directly:
```bash
npm run db:migrate:neon
```

### 3. Create Admin User
Seed the initial admin user:
```bash
npm run db:seed:admin
```

By default, this creates:
- Email: `admin@thedominuscode.com`
- Password: `ChangeMe123!`

You can customize these by setting environment variables:
```bash
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=YourSecurePassword123!
```

**⚠️ IMPORTANT: Change the default password after first login!**

### 4. Generate Prisma Client
If you haven't already:
```bash
npm run db:generate
```

## Usage

### Admin Login
1. Navigate to `/auth/login`
2. Enter your admin email and password
3. You'll be redirected to `/admin/dashboard`

### Admin Dashboard Features

#### Dashboard (`/admin/dashboard`)
- Overview stats (total applications, pending, Oracle usage)
- Quick links to all admin sections
- Recent applications feed

#### Applications (`/admin/applications`)
- View all Council and Dynasty applications
- Filter by type (Council/Dynasty) and status (Pending/Approved/Rejected/Waitlist)
- View full application details
- Update application status
- See AI verdicts and analysis

#### Oracle Analytics (`/admin/oracle`)
- View all Oracle conversations
- Filter by date range
- Expand conversations to see full Q&A
- See IP addresses and language preferences

#### Generator Tools (`/gens`)
- Access to all generator tools
- Tweet Strike feature
- Now protected with admin authentication

## Security Notes

- Admin routes are protected by middleware
- Only users with `ADMIN` role can access `/admin/*` routes
- Passwords are hashed using bcryptjs
- Sessions are managed by NextAuth.js

## Troubleshooting

### Can't login?
- Verify the admin user exists: `npm run db:seed:admin`
- Check that `NEXTAUTH_SECRET` is set
- Check database connection

### Migration errors?
- Ensure your `DATABASE_URL` is correct
- Check that you have the latest schema: `npx prisma db pull`
- Try resetting: `npm run db:migrate:reset` (⚠️ deletes all data)

### Oracle conversations not showing?
- Check that the Oracle API is storing data (check console logs)
- Verify database connection
- Check that conversations are being created in the database

## Next Steps

1. Change the default admin password
2. Review and test all admin features
3. Set up proper environment variables for production
4. Consider adding more admin users if needed (modify seed script)

