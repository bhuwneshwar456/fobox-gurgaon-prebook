"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface FinalCtaProps {
  spotsTaken?: number;
  totalSpots?: number;
}

export function FinalCtaSection({ spotsTaken = 347, totalSpots = 500 }: FinalCtaProps) {
  const remaining = totalSpots - spotsTaken;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="bg-ink py-[clamp(5rem,10vw,9rem)]" ref={ref}>
      <Container>
        <div className="flex flex-col items-center text-center gap-8">
          {/* Discount — biggest element on screen */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex flex-col items-center gap-3"
          >
            <p
              className="text-paper/50 text-xs tracking-widest uppercase"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              LAUNCH OFFER · FOUNDING MEMBERS ONLY
            </p>
            <p
              className="text-tomato leading-none"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(4rem, 12vw, 8rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
              }}
            >
              50% OFF
            </p>
            <p
              className="text-paper"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              every meal, for 12 months.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-paper/70 max-w-[520px]"
            style={{ fontSize: "1.15rem", lineHeight: 1.6 }}
          >
            Only {remaining} founding member spots left. ₹99 adjusts against your first bill.
            Full refund if we don&apos;t launch by 1 Sep 2026. After 500, offer closes — next batch pays full price.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <Link href="/checkout/daily" className="no-underline">
              <Button
                variant="primary"
                size="lg"
                className="text-lg px-10"
                style={{ minHeight: "64px" } as React.CSSProperties}
              >
                Lock my plan — ₹99
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-paper/50 text-sm"
          >
            <span>₹99 refundable deposit</span>
            <span className="text-paper/20">·</span>
            <span>Hold any meal anytime</span>
            <span className="text-paper/20">·</span>
            <span>Cancel anytime</span>
            <span className="text-paper/20">·</span>
            <span>Launches 1 Sep 2026</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
