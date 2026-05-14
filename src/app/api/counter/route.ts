import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { COUNTER_SEED, TOTAL_SPOTS } from "@/lib/constants";

export async function GET() {
  try {
    const counter = await prisma.counter.findUnique({
      where: { id: "global" },
    });
    return NextResponse.json({
      spotsTaken: counter?.spotsTaken ?? COUNTER_SEED,
      totalSpots: counter?.totalSpots ?? TOTAL_SPOTS,
    });
  } catch {
    return NextResponse.json({ spotsTaken: COUNTER_SEED, totalSpots: TOTAL_SPOTS });
  }
}
