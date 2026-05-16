"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#plans", label: "Plans" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#founders", label: "Founders" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 87,
        transition: "background 0.3s",
        background: scrolled
          ? "color-mix(in oklch, var(--bg) 90%, transparent)"
          : "var(--bg)",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 80px)",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ padding: 8, marginLeft: -8, background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span style={{ display: "block", width: 20, height: 2, background: "var(--ink)", marginBottom: 6, transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(4px, 8px)" : "" }} />
          <span style={{ display: "block", width: 20, height: 2, background: "var(--ink)", marginBottom: 6, transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 20, height: 2, background: "var(--ink)", transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(4px, -8px)" : "" }} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 34,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--ink)",
            textDecoration: "none",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          fobox
          <span
            style={{
              display: "inline-block",
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--clay)",
              marginBottom: 2,
              flexShrink: 0,
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: 36 }} aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: "var(--ink-soft)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--clay)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-soft)")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA — desktop */}
        <Link href="/checkout/daily" className="hidden md:inline-flex" style={{ textDecoration: "none", flexShrink: 0 }}>
          <button
            style={{
              background: "var(--ink)",
              color: "var(--bg)",
              border: "none",
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--clay)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--ink)")}
          >
            Reserve for free
          </button>
        </Link>

        {/* CTA — mobile */}
        <Link
          href="/checkout/daily"
          className="md:hidden"
          style={{
            flexShrink: 0,
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--bg)",
            background: "var(--ink)",
            padding: "8px 14px",
            borderRadius: 999,
          }}
        >
          Reserve free
        </Link>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--bg)",
            borderBottom: "1px solid var(--line)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
          className="md:hidden"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "var(--ink)",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {label}
            </Link>
          ))}
          <Link href="/checkout/daily" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", marginTop: 16 }}>
            <button
              style={{
                width: "100%",
                background: "var(--clay)",
                color: "var(--bg)",
                border: "none",
                borderRadius: 999,
                padding: "16px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reserve for free
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
