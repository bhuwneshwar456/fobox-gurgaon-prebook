import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { DEPOSIT_AMOUNT_INR, DEPOSIT_AMOUNT_PAISE } from "@/lib/constants";
import { verifyOtpToken } from "@/lib/otp-token";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const orderSchema = z.object({
  plan: z.enum(["calm", "fit", "daily"]),
  name: z.string().min(2).max(80),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  sector: z.string().min(2).max(80),
  allergies: z.string().max(500).optional(),
  otpToken: z.string().min(10),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = orderSchema.parse(body);

    if (!verifyOtpToken(parsed.otpToken, parsed.phone)) {
      return NextResponse.json(
        { error: "Phone verification expired. Please verify your number again." },
        { status: 401 }
      );
    }

    const order = await razorpay.orders.create({
      amount: DEPOSIT_AMOUNT_PAISE,
      currency: "INR",
      receipt: `fobox_${Date.now()}`,
      notes: {
        plan: parsed.plan,
        name: parsed.name,
        phone: parsed.phone,
        sector: parsed.sector,
      },
    });

    await prisma.preBooking.create({
      data: {
        razorpayOrderId: order.id,
        plan: parsed.plan,
        email: null,
        name: parsed.name,
        phone: parsed.phone,
        sector: parsed.sector,
        allergies: parsed.allergies,
        amount: DEPOSIT_AMOUNT_INR,
        status: "pending",
        utmSource: parsed.utmSource,
        utmMedium: parsed.utmMedium,
        utmCampaign: parsed.utmCampaign,
        referrer: parsed.referrer,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
