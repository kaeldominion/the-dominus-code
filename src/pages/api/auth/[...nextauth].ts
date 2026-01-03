// NextAuth API route using Pages Router (more reliable than App Router)
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export default NextAuth(authOptions);

