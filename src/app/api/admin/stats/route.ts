import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();

    // Get stats
    const [
      totalApplications,
      pendingApplications,
      councilApplications,
      dynastyApplications,
      oracleConversations,
      oracleMessages,
      recentApplications,
    ] = await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { status: "PENDING" } }),
      prisma.application.count({ where: { type: "COUNCIL" } }),
      prisma.application.count({ where: { type: "DYNASTY" } }),
      prisma.oracleConversation.count(),
      prisma.oracleMessage.count(),
      prisma.application.findMany({
        take: 5,
        orderBy: { submittedAt: "desc" },
        select: {
          id: true,
          type: true,
          name: true,
          email: true,
          status: true,
          submittedAt: true,
        },
      }),
    ]);

    return NextResponse.json(
      {
        totalApplications,
        pendingApplications,
        councilApplications,
        dynastyApplications,
        oracleConversations,
        oracleMessages,
        recentApplications,
      },
      {
        headers: {
          "Cache-Control": "private, max-age=30",
        },
      }
    );
  } catch (error) {
    console.error("Stats API error:", error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
