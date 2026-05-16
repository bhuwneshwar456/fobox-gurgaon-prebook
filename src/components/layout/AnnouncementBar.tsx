"use client";
import { useState, useEffect } from "react";

interface AnnouncementBarProps {
  spotsTaken?: number;
  totalSpots?: number;
}

export function AnnouncementBar({ spotsTaken = 347, totalSpots = 500 }: AnnouncementBarProps) {
  const [showCounter, setShowCounter] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setShowCounter((v) => !v), 4000);
    return () => clearInterval(id);
  }, []);

  const rowStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    fontSize: "clamp(11px, 2.6vw, 13px)",
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
  };

  return (
    <div
      className="w-full text-center"
      style={{ backgroundColor: "var(--clay)", color: "var(--bg)", overflow: "hidden" }}
      role="banner"
    >
      <div className="relative overflow-hidden" style={{ height: "38px" }}>

        {/* Message A */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500"
          style={{
            transform: showCounter ? "translateY(-100%)" : "translateY(0)",
            opacity: showCounter ? 0 : 1,
            ...rowStyle,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden style={{ flexShrink: 0 }}>
            <path d="M7 1C4 4 2 6 2 9a5 5 0 0010 0c0-3-2-5-5-8z" fill="oklch(1 0 0 / 0.3)" />
          </svg>
          <strong style={{ fontWeight: 600, flexShrink: 0 }}>50% off</strong>
          <span style={{ opacity: 0.5, flexShrink: 0 }}>·</span>
          {/* This full phrase is too wide on mobile — scroll it horizontally */}
          <span className="bar-scroll-mobile" style={{ flexShrink: 0 }}>
            founding members · free to register — price locked for 12 months
          </span>
        </div>

        {/* Message B — counter */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500"
          style={{
            transform: showCounter ? "translateY(0)" : "translateY(100%)",
            opacity: showCounter ? 1 : 0,
            ...rowStyle,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden style={{ flexShrink: 0 }}>
            <path d="M7 1C4 4 2 6 2 9a5 5 0 0010 0c0-3-2-5-5-8z" fill="oklch(1 0 0 / 0.3)" />
          </svg>
          <strong style={{ fontWeight: 600, flexShrink: 0 }}>{spotsTaken} / {totalSpots}</strong>
          <span style={{ opacity: 0.5, flexShrink: 0 }}>·</span>
          {/* Also potentially wide on mobile */}
          <span className="bar-scroll-mobile" style={{ flexShrink: 0 }}>
            founding spots taken · Gurgaon · launches 01.09.2026
          </span>
        </div>

      </div>
    </div>
  );
}
