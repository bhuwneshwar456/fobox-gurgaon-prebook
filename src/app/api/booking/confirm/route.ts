import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail, updateSpotsCounter, getMemberNumber } from "@/lib/post-payment";

const schema = z.object({
  plan: z.enum(["calm", "fit", "daily"]),
  name: z.string().min(2).max(80),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  sector: z.string().min(2).max(80),
  allergies: z.string().max(500).optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    const booking = await prisma.preBooking.create({
      data: {
        razorpayOrderId: `free_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        plan: parsed.plan,
        email: null,
        name: parsed.name,
        phone: parsed.phone,
        sector: parsed.sector,
        allergies: parsed.allergies,
        amount: 0,
        status: "paid",
        paidAt: new Date(),
        utmSource: parsed.utmSource,
        utmMedium: parsed.utmMedium,
        utmCampaign: parsed.utmCampaign,
        referrer: parsed.referrer,
      },
    });

    await updateSpotsCounter();
    const memberNumber = await getMemberNumber(booking.id);

    sendWelcomeEmail(booking).catch(console.error);

    return NextResponse.json({ success: true, bookingId: booking.id, memberNumber });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Booking confirm failed:", error);
    return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 });
  }
}
