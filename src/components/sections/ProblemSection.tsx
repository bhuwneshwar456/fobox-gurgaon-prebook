"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";

const rejectionPills = [
  { text: "not a detox plan" },
  { text: "not a supplement subscription" },
  { text: "not a salad in a jar" },
  { text: "not a six-week \"reset\"" },
  { text: "not \"wellness\"" },
];

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="problem"
      ref={ref}
      style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "clamp(5rem,10vw,9rem) 0",
      }}
    >
      <Container>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <EyebrowTag>The Gurgaon food problem</EyebrowTag>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(44px, 6vw, 84px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              color: "var(--ink)",
              maxWidth: 880,
              margin: "24px auto 0",
            }}
          >
            We&apos;re not pretending this is{" "}
            <em style={{ fontStyle: "italic", color: "var(--clay)" }}>rocket science.</em>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Narrative body */}
          <div
            style={{
              maxWidth: 920,
              margin: "0 auto",
              fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
              fontSize: "clamp(22px, 3.3vw, 38px)",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0 }}>
              You work 11-hour days. You order Zomato at lunch. Swiggy at 10 PM.
            </p>
            <p style={{ margin: "22px 0 0" }}>
              Two days a week you{" "}
              <span style={{ color: "var(--clay)", fontStyle: "italic" }}>&ldquo;cook&rdquo;</span>
              {" "}— meaning you make Maggi.
            </p>
            <p style={{ margin: "22px 0 0" }}>
              By Thursday your stomach hurts. Saturday you say{" "}
              <span style={{ color: "var(--clay)", fontStyle: "italic" }}>&ldquo;Monday I&apos;ll fix this.&rdquo;</span>
            </p>
            <p style={{ margin: "22px 0 0" }}>
              Monday comes.{" "}
              <span style={{ color: "var(--saffron)", fontStyle: "italic" }}>Zomato wins again.</span>
            </p>
          </div>

          {/* Rejection pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 56,
            }}
          >
            {rejectionPills.map((pill) => (
              <span
                key={pill.text}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontSize: 14,
                  color: "var(--ink-soft)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: "var(--clay)", fontWeight: 600 }}>×</span>
                {pill.text}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
