"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { plans, PlanSlug } from "@/data/plans";

function PlanPlate({ slug }: { slug: PlanSlug }) {
  const compartments: Record<PlanSlug, { a: string; b: string; c: string }> = {
    calm: {
      a: "var(--kadhi)",
      b: "oklch(0.92 0.025 110)",
      c: "oklch(0.75 0.05 145)",
    },
    fit: {
      a: "var(--sabzi)",
      b: "oklch(0.85 0.05 75)",
      c: "oklch(0.72 0.10 95)",
    },
    daily: {
      a: "var(--turmeric)",
      b: "var(--clay)",
      c: "oklch(0.85 0.05 75)",
    },
  };
  const { a, b, c } = compartments[slug];

  return (
    <div
      style={{
        width: 130, height: 130, borderRadius: "50%",
        background: "var(--raita)",
        margin: "0 auto 4px",
        position: "relative",
        boxShadow: "inset 0 4px 10px -2px oklch(0 0 0 / 0.08)",
        flexShrink: 0,
      }}
    >
      {/* Shimmer */}
      <div style={{
        position: "absolute", inset: "8%", borderRadius: "50%",
        background: "radial-gradient(circle at 35% 30%, oklch(1 0 0 / 0.5), transparent 60%)",
        pointerEvents: "none",
      }} />
      {/* pp-a */}
      <div style={{
        position: "absolute", width: "38%", aspectRatio: "1", borderRadius: "50%",
        top: slug === "calm" ? "18%" : slug === "fit" ? "16%" : "18%",
        left: slug === "calm" ? "20%" : slug === "fit" ? "18%" : "16%",
        background: a,
      }} />
      {/* pp-b */}
      <div style={{
        position: "absolute", width: slug === "fit" ? "30%" : slug === "daily" ? "30%" : "32%",
        aspectRatio: "1", borderRadius: "50%",
        top: slug === "calm" ? "22%" : "22%",
        right: slug === "calm" ? "14%" : slug === "fit" ? "14%" : "16%",
        background: b,
        border: slug === "calm" ? "1px solid oklch(0.80 0.04 100)" : slug === "fit" ? "1px solid oklch(0.72 0.06 65)" : "none",
      }} />
      {/* pp-c */}
      <div style={{
        position: "absolute", width: "28%", aspectRatio: "1", borderRadius: "50%",
        bottom: slug === "fit" ? "12%" : "14%",
        left: slug === "calm" ? "36%" : slug === "fit" ? "36%" : "38%",
        background: c,
      }} />
    </div>
  );
}

function PlanCard({ slug, featured = false }: { slug: PlanSlug; featured?: boolean }) {
  const plan = plans[slug];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const textColor   = featured ? "var(--bg)"   : "var(--ink)";
  const subColor    = featured ? "oklch(0.85 0.02 60)" : "var(--ink-soft)";
  const mutedColor  = featured ? "oklch(0.7 0.02 60)"  : "var(--ink-mute)";
  const lineColor   = featured ? "oklch(0.4 0.04 55)"  : "var(--line)";
  const bgColor     = featured ? "var(--ink)"  : "var(--bg)";
  const borderColor = featured ? "var(--ink)"  : "var(--line)";
  const ctaPrimBg   = featured ? "var(--saffron)" : "var(--clay)";
  const ctaPrimTxt  = featured ? "var(--ink)"     : "var(--bg)";
  const nameEmColor = featured ? "var(--saffron)"  : "var(--clay)";
  const bulletColor = featured ? "var(--turmeric)" : "var(--sabzi)";
  const priceColor  = featured ? "var(--turmeric)" : "var(--clay)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay: featured ? 0.1 : 0 }}
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 24,
        padding: "32px 28px 30px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        position: "relative",
        transition: "transform .25s ease, box-shadow .25s ease",
      }}
      whileHover={{ y: -6, boxShadow: "0 30px 50px -20px oklch(0.30 0.05 50 / 0.25)" }}
    >
      {/* Pop-tab */}
      {featured && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: "var(--saffron)", color: "var(--ink)",
          fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
          textTransform: "uppercase", padding: "6px 14px", borderRadius: 999,
          whiteSpace: "nowrap",
        }}>
          ★ most popular
        </div>
      )}

      <PlanPlate slug={slug} />

      {/* Meta */}
      <p style={{
        fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em",
        color: mutedColor, margin: 0, textAlign: "center",
      }}>
        {plan.eyebrow}
      </p>

      {/* Name */}
      <h3 style={{
        fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
        fontWeight: 500, fontSize: 48, letterSpacing: "-0.03em", lineHeight: 1,
        color: textColor, margin: 0, textAlign: "center",
      }}>
        fobox <em style={{ fontStyle: "italic", color: nameEmColor }}>{plan.slug}</em>
      </h3>

      {/* Tagline */}
      <p style={{
        fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
        fontSize: 20, lineHeight: 1.3, color: subColor,
        margin: 0, textAlign: "center",
      }}>
        {plan.tagline}
      </p>

      {/* Features */}
      <ul style={{
        listStyle: "none", margin: 0, padding: 0,
        borderTop: `1px dashed ${lineColor}`, paddingTop: 22,
        display: "flex", flexDirection: "column", gap: 12,
        fontSize: 14, color: subColor,
      }}>
        {plan.features.map((f) => (
          <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", lineHeight: 1.4 }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: bulletColor,
              flexShrink: 0, marginTop: 7,
            }} />
            {f}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div style={{ borderTop: `1px dashed ${lineColor}`, paddingTop: 22, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: priceColor, fontWeight: 600, marginBottom: 6 }}>
            Founding price
          </p>
          <p style={{
            fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
            fontSize: 56, lineHeight: 0.9, letterSpacing: "-0.03em",
            color: textColor, margin: 0,
          }}>
            ₹<em style={{ fontStyle: "italic", fontWeight: 500 }}>{plan.earlyBirdPerMeal}</em>
          </p>
          <p style={{ fontSize: 12, color: mutedColor, marginTop: 8 }}>per meal · ₹{plan.monthlyEarlyBird.toLocaleString("en-IN")}/mo</p>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, color: mutedColor, lineHeight: 1.4 }}>
          after launch
          <span style={{
            textDecoration: "line-through", textDecorationColor: "var(--clay)",
            fontSize: 18, color: featured ? "oklch(0.55 0.02 60)" : "var(--ink-soft)",
            display: "block",
            fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
          }}>₹{plan.perMealPrice}</span>
          <span style={{ color: featured ? "var(--saffron)" : "var(--clay)", fontWeight: 600 }}>
            save ₹{((plan.monthlyFull - plan.monthlyEarlyBird) * 12).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 10 }}>
        <Link href={`/checkout/${plan.slug}`} style={{ textDecoration: "none", flex: 1 }}>
          <button
            style={{
              width: "100%", background: ctaPrimBg, color: ctaPrimTxt,
              border: "none", borderRadius: 999, padding: "14px",
              fontSize: 14, fontWeight: 500, cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = featured ? "var(--turmeric)" : "var(--clay-deep)")}
            onMouseLeave={e => (e.currentTarget.style.background = ctaPrimBg)}
          >
            Lock {plan.slug} — free →
          </button>
        </Link>
        <Link href={`/plans/${plan.slug}`} style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "transparent", border: `1px solid ${lineColor}`,
              borderRadius: 999, padding: "14px 20px",
              fontSize: 14, color: subColor, cursor: "pointer",
              transition: "all .15s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = textColor;
              e.currentTarget.style.borderColor = textColor === "var(--bg)" ? "var(--bg)" : "var(--ink)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = subColor;
              e.currentTarget.style.borderColor = lineColor;
            }}
          >
            Menu
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export function PlansSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="plans"
      style={{
        background: "var(--bg)",
        padding: "clamp(5rem,10vw,9rem) 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <EyebrowTag>Three plans</EyebrowTag>
          <h2 style={{
            fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
            fontWeight: 400, fontSize: "clamp(44px, 6vw, 84px)",
            letterSpacing: "-0.03em", lineHeight: 1.0,
            color: "var(--ink)", margin: "24px 0 0",
          }}>
            Find your <em style={{ fontStyle: "italic", color: "var(--clay)" }}>lane.</em>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 22, maxWidth: 580, margin: "22px auto 0" }}>
            All plans: 50 wholesome meals/month, hold any meal, cancel anytime.
            Reserve free — price locked for 12 months from first delivery.
          </p>
        </motion.div>

        <div className="plans-grid">
          <PlanCard slug="calm" />
          <PlanCard slug="daily" featured />
          <PlanCard slug="fit" />
        </div>
      </Container>
    </section>
  );
}
