import { Resend } from "resend";
import { prisma } from "./prisma";
import { COUNTER_SEED, LAUNCH_DATE_DISPLAY, SUPPORT_WHATSAPP_URL, TOTAL_SPOTS } from "./constants";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const PLAN_PRICES: Record<string, { perMeal: string; monthly: string; savings: string }> = {
  calm:  { perMeal: "₹199/meal", monthly: "₹9,950/month", savings: "₹9,950/month" },
  fit:   { perMeal: "₹199/meal", monthly: "₹9,950/month", savings: "₹9,950/month" },
  daily: { perMeal: "₹119/meal", monthly: "₹5,950/month", savings: "₹5,950/month" },
};

export async function sendWelcomeEmail(booking: {
  id: string;
  name: string;
  email: string | null;
  plan: string;
  sector: string;
}) {
  if (!booking.email || !resend) return;

  const memberNumber = await getMemberNumber(booking.id);
  const planInfo = PLAN_PRICES[booking.plan] ?? PLAN_PRICES.daily;

  const whatsappGroup = process.env.NEXT_PUBLIC_WHATSAPP_GROUP || SUPPORT_WHATSAPP_URL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://fobox.in";

  const text = `Hey ${booking.name},

You did it — you're founding member #${memberNumber} of fobox.

You've locked in the 50% launch offer for 12 months from your first delivery.

What you locked:
→ Plan: fobox ${booking.plan}
→ Your price: ${planInfo.perMeal} (50% off, for 12 months)
→ Monthly: ${planInfo.monthly} for 50 meals
→ You save: ${planInfo.savings} every month
→ First delivery: ${LAUNCH_DATE_DISPLAY} to ${booking.sector}

Your ₹99 deposit will be credited against your first bill — you won't
pay it again at launch.

You can hold any meal on any day (up to 30/month) — just let us know
in advance. Cancel anytime with 7 days notice.

If we don't launch by ${LAUNCH_DATE_DISPLAY}, full ₹99 refund within 7 days.
No questions. That's the deal.

Here's what happens next:

1) Join our WhatsApp group (most updates happen here):
   ${whatsappGroup}

2) Every Friday: a "from the kitchen" update — menu testing, behind-the-scenes.

3) ${LAUNCH_DATE_DISPLAY}: your first fobox arrives.

We'll send all future updates via WhatsApp.

— Founder
fobox

PS: Know one person in Gurgaon who'd love this? Forward them:
${appUrl}?ref=${booking.id.slice(-8)}`;

  await resend.emails.send({
    from: `fobox <${process.env.RESEND_FROM_EMAIL ?? "hello@fobox.in"}>`,
    to: booking.email,
    subject: `You're in. Welcome to fobox, founding member #${memberNumber}.`,
    text,
  });
}

export async function getMemberNumber(bookingId: string): Promise<number> {
  const counter = await prisma.counter.findUnique({ where: { id: "global" } });
  const seed = counter?.seed ?? COUNTER_SEED;

  const bookings = await prisma.preBooking.findMany({
    where: { status: "paid" },
    orderBy: { paidAt: "asc" },
    select: { id: true },
  });
  const idx = bookings.findIndex((b) => b.id === bookingId);
  const ordinal = idx === -1 ? bookings.length : idx + 1;
  return seed + ordinal;
}

export async function updateSpotsCounter() {
  const paidCount = await prisma.preBooking.count({ where: { status: "paid" } });
  const counter = await prisma.counter.findUnique({ where: { id: "global" } });
  const seed = counter?.seed ?? COUNTER_SEED;

  await prisma.counter.upsert({
    where: { id: "global" },
    update: { spotsTaken: seed + paidCount, lastUpdated: new Date() },
    create: {
      id: "global",
      totalSpots: TOTAL_SPOTS,
      seed,
      spotsTaken: seed + paidCount,
    },
  });
}
