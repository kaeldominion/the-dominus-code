// NextAuth API route using Pages Router (more reliable than App Router)
import NextAuth from "next-auth";
import { authOptions } from "../../../src/lib/auth";

export default NextAuth(authOptions);

