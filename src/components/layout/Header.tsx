"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b border-border transition-all duration-300",
        scrolled ? "bg-paper/90 backdrop-blur-[12px]" : "bg-paper",
      ].join(" ")}
      style={{ height: "72px" }}
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 lg:px-20 h-full flex items-center justify-between gap-4">
        {/* Mobile: hamburger */}
        <button
          className="md:hidden p-2 -ml-2 text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-5 h-0.5 bg-ink mb-1.5 transition-all" style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 6px)" : "" }} />
          <span className="block w-5 h-0.5 bg-ink mb-1.5 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-ink transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -6px)" : "" }} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="text-ink no-underline flex-shrink-0"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 600,
            fontSize: "1.5rem",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          fobox
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {[
            { href: "#plans", label: "Plans" },
            { href: "#how-it-works", label: "How it works" },
            { href: "#founders", label: "Founders" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-ink-2 hover:text-ink text-sm font-medium transition-colors no-underline"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA — desktop only */}
        <Link href="/checkout/daily" className="hidden md:inline-flex flex-shrink-0 no-underline">
          <Button variant="primary" size="sm">
            Reserve for free
          </Button>
        </Link>

        {/* CTA — mobile pill */}
        <Link
          href="/checkout/daily"
          className="md:hidden flex-shrink-0 no-underline text-xs font-medium text-paper px-3 py-2 rounded-[8px]"
          style={{ backgroundColor: "var(--ink)" }}
        >
          Reserve free
        </Link>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-paper border-b border-border py-4 px-6 flex flex-col gap-4">
          {[
            { href: "#plans", label: "Plans" },
            { href: "#how-it-works", label: "How it works" },
            { href: "#founders", label: "Founders" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-ink text-base font-medium no-underline py-2 border-b border-border last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/checkout/daily" onClick={() => setMenuOpen(false)}>
            <Button variant="primary" size="md" fullWidth>
              Reserve for free
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

