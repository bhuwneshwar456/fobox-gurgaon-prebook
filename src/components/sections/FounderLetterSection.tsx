"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function FounderLetterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="bg-paper-deep py-[clamp(5rem,10vw,9rem)]" ref={ref}>
      <Container narrow>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="bg-canvas p-16 max-md:p-8"
          style={{ border: "2px solid var(--ink)" }}
        >
          <p
            className="mb-6 text-ink"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
              lineHeight: 1.45,
            }}
          >
            Three years ago, I had an endoscopy. Doctor said gastritis. He said
            take pantoprazole. I took it for two weeks, then ordered biryani.
            Six months later, same scope, worse.
          </p>

          <div
            className="text-ink-2 leading-relaxed flex flex-col gap-4"
            style={{ fontSize: "1.1rem", lineHeight: 1.65 }}
          >
            <p>
              I built fobox because I needed it to exist. Meals that don&apos;t try
              to be medicine. Food that doesn&apos;t fight my gut on Tuesday so I can
              have a beer on Friday. Not a detox. Not a supplement. Not a branded
              salad. Just 50 boxes of food a month — real Indian cooking, designed
              for the way Gurgaon actually eats — delivered to your door.
            </p>
            <p>
              You can hold any meal on any day. You can cancel anytime. We&apos;re
              not here to trap you — we&apos;re here to be the food you actually
              want to come home to.
            </p>
            <p>
              Registering says you trust us to build this right. We won&apos;t waste
              that trust.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p
              className="text-ink font-medium"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              — Founder, fobox
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
