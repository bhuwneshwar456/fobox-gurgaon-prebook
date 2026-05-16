"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";

const founders = [
  {
    portraitLabel: "portrait · 01",
    faceGrad: "radial-gradient(circle at 40% 35%, oklch(0.78 0.08 60), oklch(0.62 0.10 50))",
    role: "Founder · tech & brand",
    namePrefix: "The one who ",
    nameEm: "got the scope.",
    quote:
      "I had an endoscopy three years ago. Gastritis. Doctor said pantoprazole — I took it for two weeks, ordered biryani, ended up right back. I built fobox because the food I needed didn't exist at 7 PM in Sector 44 unless I cooked it myself.",
  },
  {
    portraitLabel: "portrait · 02",
    faceGrad: "radial-gradient(circle at 40% 35%, oklch(0.82 0.06 70), oklch(0.68 0.08 55))",
    role: "Co-founder · kitchen & ops",
    namePrefix: "The one who ",
    nameEm: "runs the line.",
    quote:
      "Ten years in food ops across Delhi NCR. I've seen what contract kitchens cut corners on. I joined fobox because we're not doing that — real food, real checks, no compromise on Tuesday just because Monday sold well.",
  },
];

export function FoundersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="founders"
      ref={ref}
      style={{
        background: "var(--bg)",
        padding: "clamp(5rem,10vw,9rem) 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 80, textAlign: "center" }}
        >
          <EyebrowTag>The people building this</EyebrowTag>
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
            We&apos;re from Gurgaon. We eat the{" "}
            <em style={{ fontStyle: "italic", color: "var(--clay)" }}>same food you do.</em>
          </h2>
        </motion.div>

        {/* Founder cards */}
        <div className="founders-grid">
          {founders.map((f, i) => (
            <motion.article
              key={f.role}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="founder-card"
            >
              {/* Portrait — kraft paper area */}
              <div
                style={{
                  background: "var(--paper)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 220,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 14, left: 14,
                    fontSize: 11, color: "var(--ink-mute)",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}
                >
                  {f.portraitLabel}
                </span>
                {/* Face silhouette */}
                <div
                  style={{
                    width: 110, height: 110, borderRadius: "50%",
                    background: f.faceGrad,
                    boxShadow: "inset 0 -10px 20px -5px oklch(0 0 0 / 0.15)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "90%", height: "35%",
                      bottom: "-15%", left: "5%",
                      background: "var(--ink)",
                      borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                      opacity: 0.85,
                    }}
                  />
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{
                  fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "var(--clay)", fontWeight: 600, margin: 0,
                }}>
                  {f.role}
                </p>

                <h3 style={{
                  fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
                  fontWeight: 500, fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1.1,
                  color: "var(--ink)", margin: 0,
                }}>
                  {f.namePrefix}
                  <em style={{ fontStyle: "italic", color: "var(--clay)" }}>{f.nameEm}</em>
                </h3>

                <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.55, margin: 0 }}>
                  <span style={{
                    fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
                    fontSize: 28, color: "var(--clay)", lineHeight: 0, verticalAlign: "-10px",
                    marginRight: 4,
                  }}>&ldquo;</span>
                  {f.quote}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
