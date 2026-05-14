"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";

export function FoundersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="founders"
      className="bg-paper-deep py-[clamp(5rem,10vw,9rem)]"
      ref={ref}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <EyebrowTag className="mb-4">THE PEOPLE BUILDING THIS</EyebrowTag>
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
            We&apos;re from Gurgaon. We eat the same food you do.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              role: "FOUNDER · TECH & BRAND",
              bio: "I had an endoscopy three years ago. Gastritis. The doctor said pantoprazole. I took it for two weeks, ordered biryani, and ended up right back. I built fobox because the food I needed to eat didn't exist at 7 PM in Sector 44 — unless I cooked it myself.",
            },
            {
              role: "CO-FOUNDER · KITCHEN & OPS",
              bio: "Ten years working in food operations across Delhi NCR. I've seen what contract kitchens cut corners on. I joined fobox because we're not doing that. We're building the supply chain I always wanted to run — real food, real checks, no compromise on Tuesday just because Monday sold well.",
            },
          ].map((founder, i) => (
            <motion.div
              key={founder.role}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col gap-4"
            >
              <div
                className="bg-canvas p-8 flex-1"
                style={{ border: "2px solid var(--ink)" }}
              >
                <p
                  className="text-ink-3 text-xs tracking-[0.12em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {founder.role}
                </p>
                <p
                  className="text-ink leading-none mb-3"
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 500,
                    fontSize: "1.2rem",
                  }}
                >
                  Founder, fobox
                </p>
                <p className="text-ink-2 text-base leading-relaxed">
                  {founder.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
