import Link from "next/link";
import { Container } from "@/components/ui/Container";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-paper border-t border-border pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-border">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p
              className="text-ink text-2xl mb-3"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 600,
                letterSpacing: "-0.04em",
              }}
            >
              fobox
            </p>
            <p className="text-ink-3 text-sm leading-relaxed mb-5">
              Dietitian-designed meals for<br />Gurgaon working professionals.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/foboxin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-3 hover:text-ink transition-colors"
                aria-label="fobox on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://linkedin.com/company/fobox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-3 hover:text-ink transition-colors"
                aria-label="fobox on LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Plans */}
          <div>
            <p className="text-ink font-medium text-sm mb-4">Plans</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/plans/calm", label: "fobox calm" },
                { href: "/plans/fit", label: "fobox fit" },
                { href: "/plans/daily", label: "fobox daily" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-ink-3 hover:text-ink text-sm transition-colors no-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-ink font-medium text-sm mb-4">Company</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/about", label: "About" },
                { href: "/faq", label: "FAQ" },
                { href: "mailto:hello@fobox.in", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-ink-3 hover:text-ink text-sm transition-colors no-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-ink font-medium text-sm mb-4">Legal</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/legal/terms", label: "Terms of Service" },
                { href: "/legal/privacy", label: "Privacy Policy" },
                { href: "/legal/refund-policy", label: "Refund Policy" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-ink-3 hover:text-ink text-sm transition-colors no-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-ink-3 text-sm">
            &copy; 2026 fobox &middot; Built in Gurgaon, India
          </p>
          <a href="mailto:hello@fobox.in" className="text-ink-3 hover:text-ink text-sm transition-colors no-underline">
            hello@fobox.in
          </a>
        </div>
      </Container>
    </footer>
  );
}

