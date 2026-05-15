import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/app/admin/middleware-check";

const schema = z.object({
  whatsappGroupUrl: z.string().url().optional(),
  counterSeed: z.number().int().min(0).optional(),
  totalSpots: z.number().int().min(1).optional(),
});

export async function POST(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.parse(body);

  const settings = await prisma.settings.upsert({
    where: { id: "global" },
    update: parsed,
    create: { id: "global", ...parsed },
  });

  // Keep counter in sync if seed or totalSpots changed
  if (parsed.counterSeed !== undefined || parsed.totalSpots !== undefined) {
    const paidCount = await prisma.preBooking.count({ where: { status: "paid" } });
    const seed = parsed.counterSeed ?? settings.counterSeed;
    const total = parsed.totalSpots ?? settings.totalSpots;
    await prisma.counter.upsert({
      where: { id: "global" },
      update: { seed, totalSpots: total, spotsTaken: seed + paidCount, lastUpdated: new Date() },
      create: { id: "global", seed, totalSpots: total, spotsTaken: seed + paidCount },
    });
  }

  return NextResponse.json({ success: true, settings });
}
