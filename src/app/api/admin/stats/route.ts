import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/app/admin/middleware-check";

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [total, byPlan, recent, counter, settings] = await Promise.all([
      prisma.preBooking.count({ where: { status: "paid" } }),
      prisma.preBooking.groupBy({
        by: ["plan"],
        where: { status: "paid" },
        _count: true,
      }),
      prisma.preBooking.findMany({
        where: { status: "paid" },
        orderBy: { paidAt: "desc" },
        take: 100,
        select: {
          id: true,
          name: true,
          phone: true,
          plan: true,
          sector: true,
          paidAt: true,
          createdAt: true,
          utmSource: true,
          allergies: true,
        },
      }),
      prisma.counter.findUnique({ where: { id: "global" } }),
      prisma.settings.findUnique({ where: { id: "global" } }),
    ]);

    return NextResponse.json({ total, byPlan, recent, counter, settings });
  } catch (error) {
    console.error("Admin stats failed:", error);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
