"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="bg-paper-deep py-[clamp(5rem,10vw,9rem)]" ref={ref}>
      <Container narrow>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-7"
        >
          <EyebrowTag>THE GURGAON FOOD PROBLEM</EyebrowTag>

          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
            }}
          >
            We&apos;re not pretending this is rocket science.
          </h2>

          <div className="flex flex-col gap-5 text-ink-2" style={{ fontSize: "1.125rem", lineHeight: 1.65 }}>
            <p>
              You work 11-hour days. You order Zomato at lunch. You order
              Swiggy at 10 PM. Two days a week you &ldquo;cook&rdquo; — meaning you make
              Maggi. By Thursday your stomach hurts. By Saturday you tell
              yourself &ldquo;Monday I&apos;ll fix this.&rdquo;
            </p>
            <p>Monday comes. Zomato wins again.</p>
            <p>
              fobox is dietitian-designed meals delivered to your office or home
              in Gurgaon. Three lanes that actually matter — calm for sensitive
              stomachs, fit for macro-tracked nutrition, daily for solid
              home-style food. No supplements. No detox nonsense. Just food,
              done right.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
