import Link from "next/link";
import { Container } from "@/components/ui/Container";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const footerCols = [
  {
    heading: "Plans",
    links: [
      { href: "/plans/calm",  label: "fobox calm" },
      { href: "/plans/fit",   label: "fobox fit" },
      { href: "/plans/daily", label: "fobox daily" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about",                label: "About" },
      { href: "/faq",                  label: "FAQ" },
      { href: "mailto:hello@fobox.in", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/terms",         label: "Terms of Service" },
      { href: "/legal/privacy",       label: "Privacy Policy" },
      { href: "/legal/refund-policy", label: "Refund Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
        paddingTop: 90,
        paddingBottom: 40,
      }}
    >
      <Container>
        {/* Top grid: brand + 3 cols */}
        <div className="footer-top-grid">
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p
              style={{
                fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 56,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              fobox
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: "var(--clay)", marginLeft: 3, marginBottom: 6, verticalAlign: "bottom" }} />
            </p>
            <p style={{ fontSize: 15, color: "var(--ink-soft)", maxWidth: 320, lineHeight: 1.5, margin: 0 }}>
              Dietitian-designed meals for Gurgaon working professionals.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <a
                href="https://instagram.com/foboxin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="fobox on Instagram"
                className="footer-social"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "var(--bg-2)", color: "var(--ink-soft)",
                  padding: "8px 14px", borderRadius: 999, fontSize: 13,
                  textDecoration: "none", border: "1px solid var(--line)",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://linkedin.com/company/fobox"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="fobox on LinkedIn"
                className="footer-social"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "var(--bg-2)", color: "var(--ink-soft)",
                  padding: "8px 14px", borderRadius: 999, fontSize: 13,
                  textDecoration: "none", border: "1px solid var(--line)",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.heading}>
              <h5
                style={{
                  fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em",
                  color: "var(--clay)", fontWeight: 600, marginBottom: 16,
                }}
              >
                {col.heading}
              </h5>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="footer-link"
                      style={{
                        fontSize: 15, color: "var(--ink-soft)",
                        textDecoration: "none", transition: "color 0.15s",
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant decorative wordmark */}
        <div
          aria-hidden
          style={{
            fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(120px, 22vw, 320px)",
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            color: "var(--bg-2)",
            textAlign: "center",
            overflow: "hidden",
            margin: "0 -32px 24px",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          fobox.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 13,
            color: "var(--ink-mute)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span>&copy; 2026 fobox &middot; Built in Gurgaon, India</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sabzi)", display: "inline-block", flexShrink: 0 }} />
              FSSAI registration in process &middot; kitchen partner registered &amp; operational
            </span>
          </div>
          <a
            href="mailto:hello@fobox.in"
            className="footer-email"
            style={{ color: "var(--ink-mute)", textDecoration: "none", transition: "color 0.15s" }}
          >
            hello@fobox.in
          </a>
        </div>
      </Container>
    </footer>
  );
}
