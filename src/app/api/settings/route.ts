import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SUPPORT_WHATSAPP_URL } from "@/lib/constants";

export async function GET() {
  const settings = await prisma.settings.findUnique({ where: { id: "global" } });
  const whatsappGroupUrl =
    settings?.whatsappGroupUrl ||
    process.env.NEXT_PUBLIC_WHATSAPP_GROUP ||
    SUPPORT_WHATSAPP_URL;

  return NextResponse.json({ whatsappGroupUrl });
}
