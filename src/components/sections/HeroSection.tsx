"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const t = (delay: number) => ({ duration: 0.55, ease: "easeOut" as const, delay });

export function HeroSection() {
  return (
    <section
      style={{
        padding: "70px 0 clamp(48px, 8vw, 96px)",
        position: "relative",
      }}
    >
      <Container>
        <div className="hero-grid">

          {/* ── Left: text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0)}
            className="order-2 md:order-1"
          >
            {/* Kicker */}
            <div style={{ marginBottom: 32 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--bg-2)",
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  padding: "8px 16px 8px 12px",
                  fontSize: 13,
                  color: "var(--ink-soft)",
                }}
              >
                <span
                  style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: "var(--clay)", color: "var(--bg)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, flexShrink: 0,
                  }}
                >
                  ●
                </span>
                Made for <strong style={{ fontWeight: 600, color: "var(--ink)", marginLeft: 4 }}>Gurgaon</strong>
                &nbsp;·&nbsp;launching&nbsp;
                <strong style={{ fontWeight: 600, color: "var(--ink)" }}>01.09.2026</strong>
              </span>
            </div>

            {/* H1 */}
            <h1
              style={{
                fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(56px, 8.6vw, 132px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                color: "var(--ink)",
                margin: "0 0 32px",
              }}
            >
              Food that
              <br />
              <span className="wave">doesn&apos;t fight</span>
              <br />
              back.
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 20,
                color: "var(--ink-soft)",
                maxWidth: 500,
                lineHeight: 1.5,
                margin: "0 0 40px",
              }}
            >
              50 dietitian-designed meals a month, cooked the way home actually
              cooks. Hold any meal. Cancel anytime. No detox nonsense.
            </p>

            {/* Stamp + badge copy */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 36,
                flexWrap: "wrap",
              }}
            >
              <div
                className="stamp"
                style={{
                  width: 110, height: 110,
                  background: "var(--clay)", color: "var(--bg)",
                  borderRadius: "50%",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  transform: "rotate(-12deg)",
                  boxShadow: "0 10px 30px -10px oklch(0.45 0.18 35 / 0.5)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
                    fontStyle: "italic", fontWeight: 500,
                    fontSize: 38, lineHeight: 1,
                  }}
                >
                  50%
                </span>
                <span
                  style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: "0.16em",
                    textTransform: "uppercase", marginTop: 4,
                  }}
                >
                  12 months
                </span>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                  color: "var(--ink)",
                  maxWidth: 320,
                }}
              >
                Half off every meal &mdash;{" "}
                <em style={{ fontStyle: "italic", color: "var(--clay)" }}>for a full year.</em>
                <small
                  style={{
                    display: "block",
                    fontFamily: "var(--font-geist-sans), ui-sans-serif, sans-serif",
                    fontSize: 13, color: "var(--ink-mute)",
                    marginTop: 8, letterSpacing: 0,
                    fontStyle: "normal", fontWeight: 400,
                  }}
                >
                  Founding members only &middot; price locked for 12 months
                </small>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <Link href="/checkout/daily" style={{ textDecoration: "none" }}>
                <button
                  className="hero-cta-primary"
                  style={{
                    background: "var(--clay)", color: "var(--bg)",
                    border: "none", borderRadius: 999,
                    padding: "18px 30px", fontSize: 15, fontWeight: 500,
                    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10,
                    transition: "background 0.15s, transform 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--clay-deep)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "var(--clay)";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  Lock my plan — free <span className="cta-arrow">→</span>
                </button>
              </Link>
              <Link href="#how-it-works" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "var(--bg)", color: "var(--ink)",
                    border: "1px solid var(--line)", borderRadius: 999,
                    padding: "18px 24px", fontSize: 15, fontWeight: 400,
                    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--ink)";
                    e.currentTarget.style.color = "var(--bg)";
                    e.currentTarget.style.borderColor = "var(--ink)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "var(--bg)";
                    e.currentTarget.style.color = "var(--ink)";
                    e.currentTarget.style.borderColor = "var(--line)";
                  }}
                >
                  See how it works
                </button>
              </Link>
            </div>

            {/* Trust ticks */}
            <div
              style={{
                fontSize: 13, color: "var(--ink-mute)", marginTop: 26,
                display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center",
              }}
            >
              {["Free to register", "Cancel anytime", "Hold any meal"].map((label) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center" }}>
                  <span
                    style={{
                      width: 14, height: 14, borderRadius: "50%",
                      background: "var(--sabzi)", display: "inline-flex",
                      alignItems: "center", justifyContent: "center",
                      color: "var(--bg)", fontSize: 9, marginRight: 6, flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: thali photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="order-1 md:order-2"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Image
              src="/thali.png"
              alt="Fobox thali — dal, sabzi, rice, roti, curry and raita in a brass plate"
              width={1064}
              height={1055}
              priority
              className="thali-img"
              style={{
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 32px 64px oklch(0.24 0.045 50 / 0.22))",
              }}
            />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
