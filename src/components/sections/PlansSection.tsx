"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FoodPhoto } from "@/components/ui/FoodPhoto";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Container } from "@/components/ui/Container";
import { plans, PlanSlug } from "@/data/plans";

type CheckmarkColor = "mint" | "saffron" | "turmeric";

function PlanCheckmark({ color }: { color: CheckmarkColor }) {
  const colorMap: Record<CheckmarkColor, string> = {
    mint: "#2D6A4F",
    saffron: "#D17A22",
    turmeric: "#E8A317",
  };
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
      <circle cx="9" cy="9" r="9" fill={colorMap[color]} fillOpacity="0.15" />
      <path d="M5 9l3 3 5-5" stroke={colorMap[color]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface PlanRowProps {
  slug: PlanSlug;
  reversed?: boolean;
}

function PriceBlock({ slug }: { slug: PlanSlug }) {
  const plan = plans[slug];
  const accentHex = plan.accentHex;

  return (
    <div className="flex flex-col gap-3">
      {/* Launch offer badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 self-start"
        style={{ borderBottom: "1.5px solid var(--border-strong)" }}
      >
        <span
          className="text-xs uppercase tracking-widest font-medium"
          style={{ fontFamily: "var(--font-geist-mono), monospace", color: "var(--turmeric)" }}
        >
          ◆ launch offer · 50% off · 12 months
        </span>
      </div>

      {/* Per-meal prices */}
      <div className="flex items-end gap-4 flex-wrap">
        <div>
          <p className="text-ink-3 text-xs uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
            Your price (12 months)
          </p>
          <p
            className="leading-none"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              color: accentHex,
            }}
          >
            ₹{plan.earlyBirdPerMeal}
            <span className="text-base font-normal text-ink-3 ml-1">/meal</span>
          </p>
        </div>
        <div className="mb-1">
          <p className="text-ink-3 text-xs uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
            After launch
          </p>
          <p
            className="text-ink-3 line-through leading-none"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontWeight: 500,
              fontSize: "1.4rem",
            }}
          >
            ₹{plan.perMealPrice}/meal
          </p>
        </div>
      </div>

      {/* Monthly + 12-month savings */}
      <div className="flex flex-col gap-1.5">
        <p className="text-ink-2 text-sm">
          <span style={{ fontFamily: "var(--font-geist-mono), monospace" }}>₹{plan.monthlyEarlyBird.toLocaleString("en-IN")}/month</span>
          {" "}for 50 meals ·{" "}
          <span className="text-ink-3 line-through" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
            ₹{plan.monthlyFull.toLocaleString("en-IN")}
          </span>
        </p>
        <p className="text-sm font-semibold" style={{ color: "var(--mint)" }}>
          Save ₹{((plan.monthlyFull - plan.monthlyEarlyBird) * 12).toLocaleString("en-IN")} over 12 months
        </p>
      </div>
    </div>
  );
}

function PlanRow({ slug, reversed = false }: PlanRowProps) {
  const plan = plans[slug];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const accentMap: Record<PlanSlug, CheckmarkColor> = { calm: "mint", fit: "saffron", daily: "turmeric" };
  const btnVariantMap: Record<PlanSlug, "mint" | "saffron" | "turmeric"> = { calm: "mint", fit: "saffron", daily: "turmeric" };
  const bgMap: Record<PlanSlug, string> = { calm: "var(--calm-bg)", fit: "var(--fit-bg)", daily: "var(--daily-bg)" };

  return (
    <div
      ref={ref}
      style={{ backgroundColor: bgMap[slug] }}
      className="w-full"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className={[
            "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center",
            "py-[clamp(4rem,8vw,7rem)]",
          ].join(" ")}
        >
          {/* Text content */}
          <div className={`flex flex-col gap-6 ${reversed ? "md:order-2" : "md:order-1"}`}>
            <EyebrowTag color={accentMap[slug] as "mint" | "saffron" | "turmeric"}>
              {plan.eyebrow}
            </EyebrowTag>

            <div>
              <h2
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                }}
              >
                {plan.name}
              </h2>
              <p
                className="mt-2 text-ink-2"
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.2rem",
                }}
              >
                {plan.tagline}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-ink-2 text-base">
                  <PlanCheckmark color={accentMap[slug]} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <PriceBlock slug={slug} />

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href={`/checkout/${plan.slug}`} className="no-underline w-full sm:w-auto">
                <Button variant={btnVariantMap[slug]} size="lg" fullWidth className="sm:w-auto">
                  Lock {plan.name} — ₹99
                </Button>
              </Link>
              <Link
                href={`/plans/${plan.slug}`}
                className="text-ink-2 hover:text-ink font-medium flex items-center gap-1 transition-colors no-underline text-sm self-center"
              >
                See full menu →
              </Link>
            </div>
          </div>

          {/* Food photo */}
          <div className={`flex justify-center ${reversed ? "md:order-1" : "md:order-2"}`}>
            <FoodPhoto
              alt={plan.imageAlt}
              placeholderDesc={plan.imagePlaceholderDesc}
              rotation={reversed ? 3 : -3}
              accentColor="var(--ink)"
              className="w-full max-w-[420px]"
            />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

export function PlansSection() {
  return (
    <div id="plans">
      <div className="bg-paper py-12 text-center">
        <Container>
          <p
            className="text-ink-3 text-xs tracking-[0.14em] uppercase font-mono font-medium mb-4"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            THREE PLANS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
            }}
          >
            Find your lane.
          </h2>
          <p className="text-ink-2 text-lg mt-3 max-w-[580px] mx-auto">
            Pick the one that matches how your body and goals actually work.
            All plans: 50 wholesome meals/month, hold any meal, cancel anytime.
            ₹99 deposit adjusts against your first bill.
          </p>
          {/* Discount reminder */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5" style={{ border: "1.5px solid var(--border-strong)", borderRadius: "8px" }}>
            <span
              className="font-bold text-lg"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)" }}
            >
              50% off
            </span>
            <span className="text-ink-3 text-sm">· launch offer · founding members · closes at 500</span>
          </div>
        </Container>
      </div>

      <PlanRow slug="calm" reversed={false} />
      <PlanRow slug="fit" reversed={true} />
      <PlanRow slug="daily" reversed={false} />
    </div>
  );
}
