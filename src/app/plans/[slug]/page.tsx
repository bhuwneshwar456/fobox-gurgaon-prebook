import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Container } from "@/components/ui/Container";
import { FoodPhoto } from "@/components/ui/FoodPhoto";
import { plans, PlanSlug } from "@/data/plans";

interface PlanPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: "calm" }, { slug: "fit" }, { slug: "daily" }];
}

export default async function PlanPage({ params }: PlanPageProps) {
  const { slug } = await params;
  const plan = plans[slug as PlanSlug];
  if (!plan) notFound();

  const btnVariantMap: Record<PlanSlug, "mint" | "saffron" | "turmeric"> = {
    calm: "mint",
    fit: "saffron",
    daily: "turmeric",
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: plan.bgHex }}>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <EyebrowTag color={plan.accentColor.replace("text-", "") as "mint" | "saffron" | "turmeric"}>
                  {plan.eyebrow}
                </EyebrowTag>
                <h1
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 500,
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.0,
                    color: "var(--ink)",
                  }}
                >
                  {plan.name}
                </h1>
                <p
                  className="text-ink-2"
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.25rem",
                  }}
                >
                  {plan.tagline}
                </p>

                {/* Price block — bold discount first */}
                <div className="flex flex-col gap-2">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 self-start"
                    style={{ borderBottom: "1.5px solid var(--border-strong)" }}
                  >
                    <span className="text-xs uppercase tracking-widest font-medium" style={{ fontFamily: "var(--font-geist-mono), monospace", color: "var(--turmeric)" }}>
                      ◆ launch offer · 50% off · 12 months
                    </span>
                  </div>
                  <div className="flex items-end gap-4 flex-wrap">
                    <div>
                      <p className="text-ink-3 text-xs uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                        Your price (12 months)
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontWeight: 700,
                          fontSize: "2.25rem",
                          color: plan.accentHex,
                          lineHeight: 1,
                        }}
                      >
                        ₹{plan.earlyBirdPerMeal}
                        <span className="text-base font-normal text-ink-3 ml-1">/meal</span>
                      </p>
                    </div>
                    <div className="mb-1">
                      <p className="text-ink-3 text-xs uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                        Full price
                      </p>
                      <p
                        className="text-ink-3 line-through"
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontWeight: 500,
                          fontSize: "1.35rem",
                          lineHeight: 1,
                        }}
                      >
                        ₹{plan.perMealPrice}/meal
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-ink-2 text-sm">
                      <span style={{ fontFamily: "var(--font-geist-mono), monospace" }}>₹{plan.monthlyEarlyBird.toLocaleString("en-IN")}/month</span>
                      {" "}· 50 meals
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "var(--mint)" }}>
                      Save ₹{((plan.monthlyFull - plan.monthlyEarlyBird) * 12).toLocaleString("en-IN")} over 12 months
                    </p>
                  </div>
                </div>

                <Link href={`/checkout/${plan.slug}`} className="no-underline">
                  <Button variant={btnVariantMap[slug as PlanSlug]} size="lg">
                    Lock {plan.name} — ₹99
                  </Button>
                </Link>
                <p className="text-ink-3 text-sm">₹99 adjusts against first bill · Hold any meal · Cancel anytime · Launches 1 Sep 2026</p>
              </div>
              <FoodPhoto
                alt={plan.imageAlt}
                placeholderDesc={plan.imagePlaceholderDesc}
                rotation={-2}
                className="w-full max-w-[420px] mx-auto"
              />
            </div>
          </Container>
        </section>

        {/* Sample dishes */}
        <section className="bg-paper py-[clamp(4rem,8vw,7rem)]">
          <Container>
            <EyebrowTag className="mb-4">WHAT'S ON THE MENU</EyebrowTag>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <h2
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                }}
              >
                A glimpse of what&apos;s coming.
              </h2>
              <p className="text-ink-3 text-sm max-w-[360px] leading-relaxed" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                Every delivery is a complete, wholesome meal — multiple dishes together. No planning, no gaps.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {plan.sampleDishes.map((dish) => (
                <div
                  key={dish}
                  className="px-4 py-2.5 rounded-[8px]"
                  style={{ border: `1.5px solid ${plan.accentHex}30`, backgroundColor: plan.bgHex }}
                >
                  <p
                    className="text-ink-2 text-sm font-medium"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    {dish}
                  </p>
                </div>
              ))}
              <div
                className="px-4 py-2.5 rounded-[8px] flex items-center"
                style={{ border: `1.5px dashed ${plan.accentHex}40` }}
              >
                <p
                  className="text-ink-3 text-sm italic"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  & many more awaiting…
                </p>
              </div>
            </div>
            <p className="text-ink-3 text-xs mt-8" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
              Dishes rotate regularly · Menu finalised closer to launch
            </p>
          </Container>
        </section>

        {/* For who / not for who */}
        <section className="py-[clamp(4rem,8vw,7rem)]" style={{ backgroundColor: plan.bgHex }}>
          <Container>
            <h2
              className="mb-10"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              Honest about who this is for.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-ink font-medium mb-4">This is for you if...</p>
                <ul className="flex flex-col gap-3">
                  {plan.forWho.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ink-2 text-base">
                      <span className="text-success flex-shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-ink font-medium mb-4">This is NOT for you if...</p>
                <ul className="flex flex-col gap-3">
                  {plan.notForWho.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ink-2 text-base">
                      <span className="text-ink-3 flex-shrink-0 mt-0.5">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* How hold meals work */}
        <section className="bg-paper-deep py-[clamp(4rem,8vw,7rem)]">
          <Container narrow>
            <div className="bg-canvas p-10" style={{ border: "2px solid var(--ink)" }}>
              <p
                className="text-ink-3 text-xs tracking-widest uppercase font-medium mb-4"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                HOLD MEAL FACILITY
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "1.75rem",
                  color: "var(--ink)",
                  marginBottom: "0.75rem",
                }}
              >
                Travelling? Not hungry? Just hold it.
              </h3>
              <p className="text-ink-2 leading-relaxed" style={{ fontSize: "1.05rem" }}>
                Every plan includes a hold facility for up to <strong>30 meals per month</strong>. Simply let us know and we skip that meal — no charge, no credit note, no questions. Your subscription continues as normal, you just don&apos;t receive that box.
              </p>
              <p className="text-ink-3 text-sm mt-4">
                Cancel the whole subscription anytime with 7 days notice. No lock-in.
              </p>
            </div>
          </Container>
        </section>

        {/* Plan FAQ */}
        <section className="bg-paper py-[clamp(4rem,8vw,7rem)]">
          <Container>
            <h2
              className="mb-8"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              Questions about this plan.
            </h2>
            <div className="max-w-[720px] flex flex-col">
              {plan.faqs.map(({ q, a }) => (
                <div key={q} className="border-t border-border py-6 last:border-b">
                  <p
                    className="text-ink mb-3"
                    style={{
                      fontFamily: "var(--font-fraunces), Georgia, serif",
                      fontWeight: 500,
                      fontSize: "1.15rem",
                    }}
                  >
                    {q}
                  </p>
                  <p className="text-ink-2 text-base leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Lock CTA */}
        <section className="bg-ink py-20">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p
                  className="font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: "var(--turmeric)",
                  }}
                >
                  50% off — launch offer only.
                </p>
                <p className="text-paper/70 mt-1">
                  ₹{plan.earlyBirdPerMeal}/meal · ₹{plan.monthlyEarlyBird.toLocaleString("en-IN")}/month · Launches 1 Sep 2026
                </p>
                <p className="font-semibold mt-1" style={{ color: "var(--turmeric)" }}>
                  Save ₹{((plan.monthlyFull - plan.monthlyEarlyBird) * 12).toLocaleString("en-IN")} over 12 months
                </p>
                <p className="text-paper/50 text-sm mt-1">₹99 adjusts against first bill · Hold meals · Cancel anytime · Full refund if no launch</p>
              </div>
              <Link href={`/checkout/${plan.slug}`} className="no-underline flex-shrink-0">
                <Button variant={btnVariantMap[slug as PlanSlug]} size="lg" className="text-lg">
                  Lock {plan.name} — ₹99
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Sticky mobile CTA */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink border-t border-ink p-4">
          <Link href={`/checkout/${plan.slug}`} className="no-underline">
            <Button variant={btnVariantMap[slug as PlanSlug]} size="lg" fullWidth>
              Lock {plan.name} — ₹99 · 50% OFF
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
