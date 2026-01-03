// Explicit providers route for NextAuth
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Return the providers configuration
  const providers = authOptions.providers.map((provider: any) => ({
    id: provider.id || provider.name?.toLowerCase(),
    name: provider.name,
    type: provider.type,
    signinUrl: `/api/auth/signin/${provider.id || provider.name?.toLowerCase()}`,
    callbackUrl: `/api/auth/callback/${provider.id || provider.name?.toLowerCase()}`,
  }));

  // Convert to object keyed by provider id
  const providersObj: Record<string, any> = {};
  providers.forEach((p: any) => {
    providersObj[p.id] = p;
  });

  return new NextResponse(JSON.stringify(providersObj), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

