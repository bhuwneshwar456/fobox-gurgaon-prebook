"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";

const faqs = [
  {
    q: "What exactly is the 50% launch offer?",
    a: "Founding members who pay ₹99 upfront get every meal at 50% off for 12 months from their first delivery. fobox calm at ₹199/meal instead of ₹398. fobox fit at ₹199/meal instead of ₹398. fobox daily at ₹119/meal instead of ₹238. Your ₹99 deposit is credited against your first bill — you don't pay it again. This offer is only for the first 500 people. After that, it's gone.",
  },
  {
    q: "What if you don't launch by September 1, 2026?",
    a: "Full ₹99 refund within 7 days. No questions, no email chains. That's the deal.",
  },
  {
    q: "How does the meal hold facility work?",
    a: "You can hold up to 30 meals per month. Just let us know in advance and we skip that meal — no charge, no credit note, no questions.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. Cancel anytime with 7 days notice before your next billing cycle. No lock-in, no cancellation fees, no questions about why.",
  },
  {
    q: "Which sectors of Gurgaon do you deliver to?",
    a: "DLF Phases 1–5, Golf Course Road and Extension, Sohna Road (up to Sector 58), Cyber City, Udyog Vihar, and sectors 14 to 58. Your sector in the form? We deliver there.",
  },
  {
    q: "What if I don't subscribe after launch?",
    a: "If you decide not to continue after launch, your ₹99 deposit will be fully used toward a trial tiffin — you get a complete fobox meal to try, on us. Either way, you don't lose your money.",
  },
  {
    q: "How many meals do I get per month?",
    a: "50 wholesome meals per month. Each delivery is a complete multi-dish meal. You can hold up to 30 on any day you don't want delivery — no charge.",
  },
  {
    q: "What is your FSSAI status?",
    a: "Our kitchen partner is already FSSAI-registered and operational. Our own FSSAI registration is applied and in process. We'll have it well before the September 2026 launch.",
  },
];

function FaqItem({ q, a }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--ink)",
            lineHeight: 1.3,
          }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-ink-3 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-ink-2 text-base leading-relaxed pb-5 pr-10">
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
  const half = Math.ceil(faqs.length / 2);

  return (
    <section id="faq" className="bg-paper py-[clamp(5rem,10vw,9rem)]" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <EyebrowTag className="mb-4">QUESTIONS</EyebrowTag>
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
            The honest answers.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0"
        >
          <div>
            {faqs.slice(0, half).map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
          <div>
            {faqs.slice(half).map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i + half} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
