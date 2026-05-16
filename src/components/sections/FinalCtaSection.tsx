"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
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
    <section
      ref={ref}
      style={{
        background: "var(--clay)",
        color: "var(--bg)",
        padding: "130px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial blob — saffron top-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -200, left: -200,
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--saffron), transparent 70%)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />
      {/* Radial blob — turmeric bottom-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -180, right: -180,
          width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--turmeric), transparent 70%)",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />

      <Container>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 880,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 32,
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: 13,
                padding: "8px 18px",
                borderRadius: 999,
                background: "oklch(1 0 0 / 0.15)",
                border: "1px solid oklch(1 0 0 / 0.2)",
                letterSpacing: "0.04em",
                color: "var(--bg)",
              }}
            >
              LAUNCH OFFER · FOUNDING MEMBERS ONLY
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(56px, 8vw, 120px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--bg)",
              margin: 0,
            }}
          >
            Lock{" "}
            <em style={{ fontStyle: "italic", color: "var(--turmeric)" }}>half off</em>
            <br />for a full year.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            style={{
              fontSize: "clamp(16px,2vw,19px)",
              lineHeight: 1.5,
              color: "oklch(1 0 0 / 0.85)",
              maxWidth: 580,
              margin: 0,
            }}
          >
            Only <strong style={{ color: "var(--bg)", fontWeight: 600 }}>{remaining} founding member spots</strong> left.
            Free to register &mdash; price locked for 12 months from first delivery.
            After 500, offer closes.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22 }}
          >
            <Link href="/checkout/daily" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "var(--bg)",
                  color: "var(--clay)",
                  border: "none",
                  borderRadius: 999,
                  padding: "20px 40px",
                  fontSize: 18,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--ink)";
                  e.currentTarget.style.color = "var(--bg)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--bg)";
                  e.currentTarget.style.color = "var(--clay)";
                }}
              >
                Lock my plan &mdash; free
              </button>
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px 24px",
              fontSize: 13,
              color: "oklch(1 0 0 / 0.75)",
            }}
          >
            {["Free to register", "Hold any meal", "Cancel anytime", "Launches 1 Sep 2026"].map((t, i) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <span style={{ width: 4, height: 4, borderRadius: "50%", background: "oklch(1 0 0 / 0.25)", display: "inline-block" }} />}
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
