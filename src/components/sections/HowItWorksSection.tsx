"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";

const steps = [
  {
    number: "01",
    title: "Reserve your spot",
    desc: "Lock in your plan and your price for 12 months. Free to register — no payment today.",
    when: "Today",
    discColor: "var(--clay)",
    discText: "var(--bg)",
  },
  {
    number: "02",
    title: "We build, you watch",
    desc: "Behind-the-scenes WhatsApp updates from kitchen prep. You're part of building this.",
    when: "Now → Aug 2026",
    discColor: "var(--saffron)",
    discText: "var(--ink)",
  },
  {
    number: "03",
    title: "We launch",
    desc: "First meal arrives at your office or home in Gurgaon. Exactly when we said.",
    when: "01.09.2026",
    discColor: "var(--sabzi)",
    discText: "var(--bg)",
  },
  {
    number: "04",
    title: "Eat. Hold. Cancel.",
    desc: "Hold any meal anytime. Swap plans each quarter. Cancel with 7 days notice.",
    when: "Ongoing · no lock-in",
    discColor: "var(--ink)",
    discText: "var(--bg)",
  },
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "clamp(5rem,10vw,9rem) 0",
      }}
    >
      <Container>
        {/* Header */}
        <div style={{ marginBottom: 80, textAlign: "center" }}>
          <EyebrowTag>How it works</EyebrowTag>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(44px, 6vw, 84px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.0,
              color: "var(--ink)",
              margin: "24px 0 0",
            }}
          >
            Simple as it <em style={{ fontStyle: "italic", color: "var(--clay)" }}>should</em> be.
          </h2>
        </div>

        {/* 4-column step tiles */}
        <div className="steps-grid">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.1 }}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 24,
                padding: "32px 26px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "relative",
              }}
              whileHover={{ y: -4 }}
            >
              {/* Step disc */}
              <div
                style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: step.discColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 26,
                    color: step.discText,
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
                  fontWeight: 500,
                  fontSize: 26,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0, flex: 1 }}>
                {step.desc}
              </p>

              {/* When — mono, dashed separator */}
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                  fontSize: 12,
                  color: "var(--ink-mute)",
                  margin: 0,
                  marginTop: "auto",
                  borderTop: "1px dashed var(--line)",
                  paddingTop: 14,
                  letterSpacing: "0.04em",
                }}
              >
                {step.when}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
