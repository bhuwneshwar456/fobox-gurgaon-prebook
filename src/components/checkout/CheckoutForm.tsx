"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Plan, gurgaonSectors } from "@/data/plans";
import { SUPPORT_WHATSAPP_URL, DEPOSIT_AMOUNT_INR } from "@/lib/constants";
import { OtpModal } from "./OtpModal";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  sector: z.string().min(1, "Please select your sector"),
  allergies: z.string().max(500).optional(),
  consent: z.boolean().refine((v) => v === true, "Please confirm you understand the booking terms"),
});

type FormValues = z.infer<typeof schema>;

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export function CheckoutForm({ plan }: { plan: Plan }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const [pendingData, setPendingData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    setError("");
    setPendingData(data);
    setOtpOpen(true);
  };

  const handleOtpCancel = () => {
    setOtpOpen(false);
    setPendingData(null);
    setLoading(false);
  };

  const handleOtpVerified = async (otpToken: string) => {
    setOtpOpen(false);
    if (!pendingData) return;
    const data = pendingData;
    setLoading(true);
    setError("");

    try {
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: plan.slug,
          name: data.name,
          phone: data.phone,
          sector: data.sector,
          allergies: data.allergies,
          otpToken,
          utmSource: new URLSearchParams(window.location.search).get("utm_source") ?? undefined,
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium") ?? undefined,
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") ?? undefined,
          referrer: document.referrer || undefined,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error ?? "Failed to create order");

      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "fobox",
        description: `${plan.name} pre-booking`,
        order_id: orderData.orderId,
        handler: async (response: RazorpayResponse) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            const memberParam = verifyData.memberNumber
              ? `&member=${verifyData.memberNumber}`
              : "";
            router.push(
              `/success?plan=${plan.slug}&sector=${encodeURIComponent(data.sector)}&name=${encodeURIComponent(data.name)}${memberParam}`
            );
          } else {
            setError(
              "Payment verification failed. Please message us on WhatsApp and we'll sort it."
            );
          }
        },
        prefill: { name: data.name, email: "", contact: data.phone },
        theme: { color: "#14110F" },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  const accentMap: Record<string, string> = { calm: "var(--mint)", fit: "var(--saffron)", daily: "var(--turmeric)" };
  const accent = accentMap[plan.slug] ?? "var(--tomato)";

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Form */}
          <div>
            <h1
              className="text-ink mb-2"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4vw, 2.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Lock your {plan.name}
            </h1>
            <p className="text-ink-2 mb-10" style={{ fontSize: "1.05rem" }}>
              One step. ₹99 today. Refunded in full if we don&apos;t launch by 1 September 2026.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-ink font-medium text-sm mb-1.5">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="w-full bg-canvas border border-border rounded-[6px] px-4 text-ink placeholder:text-ink-3 focus:outline-none focus:border-border-strong transition-colors"
                  style={{ height: "48px", fontSize: "16px" }}
                  placeholder="Your full name"
                  {...register("name")}
                />
                {errors.name && <p className="text-error text-sm mt-1.5" role="alert">{errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-ink font-medium text-sm mb-1.5">
                  WhatsApp Number *
                </label>
                <div className="flex">
                  <span
                    className="flex items-center px-4 bg-paper-deep border border-r-0 border-border rounded-l-[6px] text-ink-2 text-sm flex-shrink-0"
                    style={{ height: "48px" }}
                  >
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className="flex-1 bg-canvas border border-border rounded-r-[6px] px-4 text-ink placeholder:text-ink-3 focus:outline-none focus:border-border-strong transition-colors"
                    style={{ height: "48px", fontSize: "16px" }}
                    placeholder="9876543210"
                    maxLength={10}
                    {...register("phone")}
                  />
                </div>
                {errors.phone && <p className="text-error text-sm mt-1.5" role="alert">{errors.phone.message}</p>}
              </div>

              {/* Sector */}
              <div>
                <label htmlFor="sector" className="block text-ink font-medium text-sm mb-1.5">
                  Sector in Gurgaon *
                </label>
                <select
                  id="sector"
                  className="w-full bg-canvas border border-border rounded-[6px] px-4 text-ink focus:outline-none focus:border-border-strong transition-colors"
                  style={{ height: "48px", fontSize: "16px" }}
                  {...register("sector")}
                >
                  <option value="">Select your sector</option>
                  {gurgaonSectors.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.sector && <p className="text-error text-sm mt-1.5" role="alert">{errors.sector.message}</p>}
              </div>


              {/* Allergies */}
              <div>
                <label htmlFor="allergies" className="block text-ink font-medium text-sm mb-1.5">
                  Allergies or notes{" "}
                  <span className="text-ink-3 font-normal">(optional)</span>
                </label>
                <textarea
                  id="allergies"
                  rows={3}
                  className="w-full bg-canvas border border-border rounded-[6px] px-4 py-3 text-ink placeholder:text-ink-3 focus:outline-none focus:border-border-strong transition-colors resize-none"
                  style={{ fontSize: "16px" }}
                  placeholder="e.g. nut allergy, no onion-garlic, diabetic..."
                  {...register("allergies")}
                />
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-1 w-4 h-4 flex-shrink-0 cursor-pointer"
                  {...register("consent")}
                />
                <label htmlFor="consent" className="text-ink-2 text-sm leading-relaxed cursor-pointer">
                  I understand this is a refundable pre-booking deposit, not a final purchase. I&apos;ll receive a full ₹99 refund if fobox doesn&apos;t launch by 1 September 2026.
                </label>
              </div>
              {errors.consent && <p className="text-error text-sm -mt-3" role="alert">{errors.consent.message}</p>}

              {error && (
                <div className="bg-error/10 border border-error/30 rounded-[6px] px-4 py-3 text-error text-sm" role="alert">
                  {error}{" "}
                  <a
                    href={SUPPORT_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    Open WhatsApp
                  </a>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                className="mt-2"
              >
                {loading ? "Opening payment..." : `Continue — verify & pay ₹${DEPOSIT_AMOUNT_INR}`}
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-ink-3 text-xs">
                <span>🔒 Razorpay secured</span>
                <span>·</span>
                <span>↩ Refundable if no launch</span>
                <span>·</span>
                <span>Cancel anytime</span>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24">
            <div
              className="bg-canvas rounded-[8px] p-8"
              style={{ border: "1px solid var(--border)" }}
            >
              <p className="text-ink-3 text-xs tracking-widest uppercase font-medium mb-5"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                YOUR ORDER
              </p>

              <div className="mb-5 p-4 rounded-[8px]" style={{ backgroundColor: plan.bgHex }}>
                <p className="text-ink-3 text-xs mb-1">{plan.eyebrow}</p>
                <p style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  color: "var(--ink)",
                }}>
                  {plan.name}
                </p>
                <p className="text-ink-2 text-sm italic mt-0.5"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                  {plan.tagline}
                </p>
              </div>

              {/* 50% off badge */}
              <div className="mb-5 rounded-[6px] px-4 py-3 text-center" style={{ backgroundColor: "var(--paper-deep)", border: "1.5px solid var(--border-strong)" }}>
                <p className="font-bold text-lg" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)" }}>
                  50% off — launch offer
                </p>
                <p className="text-ink-3 text-xs mt-0.5">for 12 months from first delivery · founding members only</p>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-ink-2 text-sm block">Paying today</span>
                    <span className="text-ink-3 text-xs">adjusts against your first bill</span>
                  </div>
                  <span
                    className="text-ink font-medium flex-shrink-0"
                    style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "1.5rem" }}
                  >
                    ₹99
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ink-2 text-sm">Your price per meal (12 months)</span>
                  <span
                    className="font-bold"
                    style={{ fontFamily: "var(--font-geist-mono), monospace", color: plan.accentHex }}
                  >
                    ₹{plan.earlyBirdPerMeal}/meal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ink-2 text-sm">Full price</span>
                  <span
                    className="text-ink-3 line-through text-sm"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    ₹{plan.perMealPrice}/meal
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-4">
                  <span className="text-ink-2 text-sm">Monthly (50 meals)</span>
                  <div className="text-right">
                    <span
                      className="font-bold text-ink block"
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    >
                      ₹{plan.monthlyEarlyBird.toLocaleString("en-IN")}
                    </span>
                    <span
                      className="text-ink-3 text-xs line-through"
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    >
                      ₹{plan.monthlyFull.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ink-2 text-sm">You save / month</span>
                  <span
                    className="font-semibold"
                    style={{ fontFamily: "var(--font-geist-mono), monospace", color: "var(--mint)" }}
                  >
                    ₹{(plan.monthlyFull - plan.monthlyEarlyBird).toLocaleString("en-IN")}
                  </span>
                </div>
                <div
                  className="flex justify-between items-center rounded-[6px] px-3 py-2.5"
                  style={{ backgroundColor: "var(--paper-deep)", border: "1.5px solid var(--border-strong)" }}
                >
                  <span className="text-ink font-medium text-sm">Total saved over 12 months</span>
                  <span
                    className="font-bold"
                    style={{ fontFamily: "var(--font-geist-mono), monospace", color: "var(--mint)", fontSize: "1.05rem" }}
                  >
                    ₹{((plan.monthlyFull - plan.monthlyEarlyBird) * 12).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ink-2 text-sm">First delivery</span>
                  <span className="text-ink text-sm font-medium">1 Sep 2026</span>
                </div>
              </div>

              <div
                className="text-ink-3 text-xs leading-relaxed pt-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                If we don&apos;t launch by 1 September 2026, full ₹99 refund within 7 days. Hold meals anytime. Cancel anytime.
              </div>
            </div>
          </div>
        </div>
      </Container>

      <OtpModal
        open={otpOpen}
        phone={pendingData?.phone ?? ""}
        onVerified={handleOtpVerified}
        onCancel={handleOtpCancel}
      />
    </>
  );
}
