"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FoodPhoto } from "@/components/ui/FoodPhoto";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const transition = (delay: number) => ({
  duration: 0.55,
  ease: "easeOut" as const,
  delay,
});

export function HeroSection() {
  return (
    <section className="bg-paper pt-16 pb-0 md:pt-20 md:pb-0 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center min-h-[80vh] md:min-h-[75vh]">
          {/* Left: text */}
          <div className="md:col-span-6 flex flex-col gap-6 md:gap-7 order-2 md:order-1 pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0)}
            >
              <EyebrowTag>GURGAON &middot; LAUNCHING 1 SEPTEMBER 2026</EyebrowTag>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.1)}
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(3rem, 7vw, 6rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              Food that doesn&apos;t fight back.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.2)}
              className="text-ink-2 max-w-[480px]"
              style={{ fontSize: "1.15rem", lineHeight: 1.55 }}
            >
              50 meals a month. Hold any meal you don&apos;t need. Cancel anytime.
              Three plans for the way Gurgaon actually eats.
            </motion.p>

            {/* Discount callout */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.25)}
              className="rounded-[8px] px-5 py-4"
              style={{ backgroundColor: "var(--paper-deep)", border: "1.5px solid var(--border-strong)" }}
            >
              <p
                className="font-medium uppercase tracking-widest text-xs mb-2"
                style={{ fontFamily: "var(--font-geist-mono), monospace", color: "var(--turmeric)" }}
              >
                launch offer &middot; founding members only
              </p>
              <p
                className="text-ink"
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)",
                  lineHeight: 1.2,
                }}
              >
                50% off every meal &mdash; for 12 months.
              </p>
              <p className="text-ink-3 text-sm mt-1.5">
                Reserve your spot for free &mdash; no payment today. Price locked for 12 months from first delivery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.35)}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link href="/checkout/daily" className="no-underline w-full sm:w-auto">
                <Button variant="primary" size="lg" fullWidth className="sm:w-auto">
                  Lock my plan &mdash; free
                </Button>
              </Link>
              <Link
                href="#how-it-works"
                className="text-ink-2 hover:text-ink font-medium flex items-center gap-1.5 transition-colors no-underline text-base"
              >
                See how it works &rarr;
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.45)}
              className="flex items-center gap-2 flex-wrap"
            >
              <span className="text-ink-3 text-sm">Free to register</span>
              <span className="text-border-strong">&middot;</span>
              <span className="text-ink-3 text-sm">Cancel anytime</span>
              <span className="text-border-strong">&middot;</span>
              <span className="text-ink-3 text-sm">Hold any meal</span>
            </motion.div>
          </div>

          {/* Right: food photo */}
          <motion.div
            className="md:col-span-6 order-1 md:order-2 flex justify-center md:justify-end relative"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div className="relative w-full max-w-[500px] md:max-w-none">
              <FoodPhoto
                alt="Dal, rice, sabzi and roti &mdash; a proper home meal"
                placeholderDesc="dal &middot; rice &middot; sabzi &middot; roti"
                rotation={-2}
                className="w-full"
              />
              {/* Floating discount sticker */}
              <div
                className="absolute -top-4 -right-2 md:-top-6 md:-right-6 z-20 w-28 h-28 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center text-center p-2 rotate-6"
                style={{ backgroundColor: "var(--ink)", border: "2px solid var(--border-strong)" }}
              >
                <span
                  className="font-bold leading-none"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "1.6rem", color: "var(--turmeric)" }}
                >
                  50%
                </span>
                <span className="text-xs font-bold uppercase tracking-wide leading-tight mt-0.5" style={{ color: "var(--paper)" }}>
                  OFF
                </span>
                <span className="text-[10px] leading-tight mt-1" style={{ color: "var(--ink-3)" }}>
                  12 months
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
