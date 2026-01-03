import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Removed PrismaAdapter - we're using JWT sessions, not database sessions
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // No adapter needed for JWT strategy - sessions stored in JWT, not database
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials");
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.error(`User not found: ${credentials.email}`);
            return null;
          }

          if (!user.passwordHash) {
            console.error(`No password hash for user: ${credentials.email}`);
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!isValid) {
            console.error(`Invalid password for user: ${credentials.email}`);
            return null;
          }

          console.log(`Successful login for user: ${credentials.email}, role: ${user.role}`);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // Redirect errors to login page
    // Don't define forgot password page - will use default NextAuth behavior (no page)
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false, // Disable debug to prevent _log endpoint calls
  logger: {
    error(code, metadata) {
      console.error("NextAuth error:", code, metadata);
    },
    warn(code) {
      console.warn("NextAuth warning:", code);
    },
    debug(code, metadata) {
      // Only log in development
      if (process.env.NODE_ENV === "development") {
        console.debug("NextAuth debug:", code, metadata);
      }
    },
  },
};

const handler = NextAuth(authOptions);

// Export GET and POST - NextAuth handles all routes via catch-all
// NextAuth handler works directly with Next.js App Router
export { handler as GET, handler as POST };

