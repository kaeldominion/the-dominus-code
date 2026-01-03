import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const conversationId = searchParams.get("conversationId");

    if (conversationId) {
      const conversation = await prisma.oracleConversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ conversation });
    }

    const where: Record<string, unknown> = {};
    if (startDate || endDate) {
      where.startedAt = {};
      if (startDate) (where.startedAt as Record<string, Date>).gte = new Date(startDate);
      if (endDate) (where.startedAt as Record<string, Date>).lte = new Date(endDate);
    }

    const [conversations, total] = await Promise.all([
      prisma.oracleConversation.findMany({
        where,
        orderBy: { startedAt: "desc" },
        skip,
        take: limit,
        include: {
          _count: {
            select: { messages: true },
          },
        },
      }),
      prisma.oracleConversation.count({ where }),
    ]);

    return NextResponse.json({
      conversations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Oracle API error:", error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to fetch oracle data" },
      { status: 500 }
    );
  }
}
