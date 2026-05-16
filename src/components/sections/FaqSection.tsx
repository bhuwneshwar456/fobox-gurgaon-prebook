"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";

const faqs = [
  {
    q: "What exactly is the 50% launch offer?",
    a: "First 500 members lock 50% off every meal for 12 months from your first delivery. No payment today — you reserve free, you pay only when meals start arriving on 01 September 2026. Price stays locked even if retail goes up.",
  },
  {
    q: "What if you don't launch by 01 September 2026?",
    a: "If we miss the launch date, your founding price extends by the delay. Three months late? You get a 15-month lock instead of 12. We over-communicate this. You decide when to walk.",
  },
  {
    q: "How does the meal hold facility work?",
    a: "Going to Goa for a week? Pause those meals from the app — no penalty, no need to justify. Held meals roll over into the next month, up to a 30-day cap.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. 7-day notice. No exit fee, no \"are you sure\" guilt-trip. You'd be surprised how rarely we see it.",
  },
  {
    q: "Which sectors of Gurgaon do you deliver to?",
    a: "At launch: Sectors 14, 15, 28, 29, 40–46, 50–57, and Cyber Hub / Golf Course Road / DLF Phase 1–5. We'll expand based on founding-member density.",
  },
  {
    q: "How many meals do I get per month?",
    a: "50 meals — roughly two a day, five days a week, plus a few weekend wildcards. Any unused meals can be held and rolled over.",
  },
  {
    q: "What is your FSSAI status?",
    a: "Application in process — central licence filed Q1 2026. We won't ship a single meal without it. We'll publish the licence number on this page the day it lands.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: open ? "var(--bg-2)" : "var(--bg)",
        border: `1px solid ${open ? "var(--clay)" : "var(--line)"}`,
        borderRadius: 16,
        padding: "24px 28px",
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 32px",
          gap: 24,
          alignItems: "start",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          padding: 0,
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
          }}
        >
          {q}
        </span>

        {/* Circular + toggle */}
        <span
          aria-hidden="true"
          style={{
            width: 32, height: 32, borderRadius: "50%",
            border: `1px solid ${open ? "transparent" : "var(--line)"}`,
            background: open ? "var(--clay)" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.25s, border-color 0.25s, transform 0.25s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            color: open ? "var(--bg)" : "var(--ink-mute)",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize: 15,
              color: "var(--ink-soft)",
              lineHeight: 1.6,
              marginTop: 16,
              paddingRight: 56,
              maxWidth: 720,
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="faq"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "clamp(32px,5vw,56px)", textAlign: "center" }}
        >
          <EyebrowTag>QUESTIONS</EyebrowTag>
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
            The <em style={{ fontStyle: "italic", color: "var(--clay)" }}>honest</em> answers.
          </h2>
        </motion.div>

        {/* Accordion list — single column, max 880px centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            maxWidth: 880,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
