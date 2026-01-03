import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    return NextResponse.json({
      totalApplications,
      pendingApplications,
      councilApplications,
      dynastyApplications,
      oracleConversations,
      oracleMessages,
      recentApplications,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

