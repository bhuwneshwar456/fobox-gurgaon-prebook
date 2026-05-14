"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";

interface CounterSectionProps {
  spotsTaken?: number;
  totalSpots?: number;
}

function useCountUp(target: number, duration = 1500, started: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, started]);

  return count;
}

export function CounterSection({ spotsTaken = 347, totalSpots = 500 }: CounterSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const count = useCountUp(spotsTaken, 1500, inView);
  const remaining = totalSpots - spotsTaken;

  return (
    <section ref={ref} className="bg-ink py-24">
      <Container>
        <div className="flex flex-col items-center text-center gap-6">
          {/* Big counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-2"
          >
            <p
              className="text-paper leading-none"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 500,
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
              }}
            >
              {count} / {totalSpots}
            </p>
            <p
              className="text-paper"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 500,
              }}
            >
              founding members locked in
            </p>
          </motion.div>

          {/* Discount badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-6 py-3 text-center"
            style={{ border: "1px solid var(--paper)/20", borderRadius: "8px", backgroundColor: "var(--paper)/5" }}
          >
            <p
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
                color: "var(--turmeric)",
                fontWeight: 500,
              }}
            >
              50% off — launch offer, {remaining} spots left
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--paper-deep)", opacity: 0.6 }}>
              When we hit 500, this price is gone. Next batch pays full price.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-paper/60 text-sm"
          >
            <span>Refundable deposit</span>
            <span className="hidden sm:inline text-paper/30">·</span>
            <span>Hold any meal anytime</span>
            <span className="hidden sm:inline text-paper/30">·</span>
            <span>Cancel anytime</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
