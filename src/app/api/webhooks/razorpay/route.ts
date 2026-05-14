import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail, updateSpotsCounter } from "@/lib/post-payment";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  switch (event.event) {
    case "payment.captured":
      await handlePaymentCaptured(event.payload.payment.entity);
      break;
    case "payment.failed":
      await handlePaymentFailed(event.payload.payment.entity);
      break;
  }

  return NextResponse.json({ ok: true });
}

async function handlePaymentCaptured(payment: {
  order_id: string;
  id: string;
}) {
  const existing = await prisma.preBooking.findUnique({
    where: { razorpayOrderId: payment.order_id },
  });

  if (!existing || existing.status === "paid") return;

  const booking = await prisma.preBooking.update({
    where: { razorpayOrderId: payment.order_id },
    data: {
      status: "paid",
      razorpayPaymentId: payment.id,
      paidAt: new Date(),
    },
  });

  await Promise.all([sendWelcomeEmail(booking), updateSpotsCounter()]);
}

async function handlePaymentFailed(payment: { order_id: string }) {
  await prisma.preBooking.updateMany({
    where: { razorpayOrderId: payment.order_id, status: "pending" },
    data: { status: "failed" },
  });
}
