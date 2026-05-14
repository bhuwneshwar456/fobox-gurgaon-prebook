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

  return (
    <div
      className="w-full px-3 sm:px-4 text-center overflow-hidden"
      style={{ backgroundColor: "var(--ink)", color: "var(--paper)" }}
      role="banner"
    >
      <div className="relative overflow-hidden" style={{ height: "36px" }}>
        {/* Message A — short on mobile, full on sm+ */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500"
          style={{
            transform: showCounter ? "translateY(-100%)" : "translateY(0)",
            opacity: showCounter ? 0 : 1,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "clamp(10px, 2.6vw, 11px)",
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "var(--turmeric)" }}>◆</span>
          <span style={{ color: "var(--paper-deep)" }}>50% off</span>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <span style={{ color: "var(--paper-deep)" }} className="hidden sm:inline">launch offer for founding members</span>
          <span style={{ color: "var(--paper-deep)" }} className="sm:hidden">founding members</span>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <span style={{ color: "var(--paper-deep)" }}>₹99 locks your price</span>
        </div>
        {/* Message B — counter */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 transition-all duration-500"
          style={{
            transform: showCounter ? "translateY(0)" : "translateY(100%)",
            opacity: showCounter ? 1 : 0,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "clamp(10px, 2.6vw, 11px)",
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "var(--turmeric)" }}>◆</span>
          <span style={{ color: "var(--paper-deep)" }}>{spotsTaken} / {totalSpots}</span>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <span style={{ color: "var(--border-strong)" }} className="hidden sm:inline">founding spots taken · closes at 500</span>
          <span style={{ color: "var(--border-strong)" }} className="sm:hidden">spots taken</span>
        </div>
      </div>
    </div>
  );
}
