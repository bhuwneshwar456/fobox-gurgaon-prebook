"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Reserve your spot",
    desc: "Lock in your plan and your price for 12 months. Free to register — no payment today.",
  },
  {
    number: "02",
    title: "We build, you watch",
    desc: "Behind-the-scenes WhatsApp updates from kitchen prep. You're part of building this.",
  },
  {
    number: "03",
    title: "We launch 1 Sep 2026",
    desc: "First meal arrives at your office or home in Gurgaon. Exactly when we said.",
  },
  {
    number: "04",
    title: "You eat. Hold. Cancel.",
    desc: "Hold any meal anytime. Swap plans each quarter. Cancel with 7 days notice. No lock-in.",
  },
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="how-it-works" className="bg-paper py-[clamp(5rem,10vw,9rem)]" ref={ref}>
      <Container>
        <div className="mb-14">
          <p
            className="text-ink-3 text-xs tracking-[0.14em] uppercase font-medium mb-4"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            HOW IT WORKS
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
            Simple as it should be.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.1 }}
              className="flex flex-col gap-4"
            >
              <p
                className="text-ink-3"
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {step.number}
              </p>
              <div className="w-12 h-0.5 bg-border-strong" />
              <h3
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  fontSize: "1.375rem",
                  lineHeight: 1.2,
                  color: "var(--ink)",
                }}
              >
                {step.title}
              </h3>
              <p className="text-ink-2 text-base leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
