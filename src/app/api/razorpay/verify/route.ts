import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail, updateSpotsCounter, getMemberNumber } from "@/lib/post-payment";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const booking = await prisma.preBooking.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
        paidAt: new Date(),
      },
    });

    await updateSpotsCounter();
    const memberNumber = await getMemberNumber(booking.id);

    sendWelcomeEmail(booking).catch(console.error);

    return NextResponse.json({ success: true, bookingId: booking.id, memberNumber });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
