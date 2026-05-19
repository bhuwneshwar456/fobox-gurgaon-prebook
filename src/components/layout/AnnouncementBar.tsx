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

  const messages = [
    <>
      <strong style={{ fontWeight: 600 }}>50% off</strong>
      <span style={{ opacity: 0.55 }}> · </span>
      <span>founding members · free to register · price locked 12 months</span>
    </>,
    <>
      <strong style={{ fontWeight: 600 }}>{spotsTaken} / {totalSpots} spots</strong>
      <span style={{ opacity: 0.55 }}> · </span>
      <span>Gurgaon · launches 01.09.2026</span>
    </>,
  ];

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "var(--clay)",
        color: "var(--bg)",
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
      role="banner"
    >
      {messages.map((msg, i) => {
        const active = i === (showCounter ? 1 : 0);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
              fontSize: 12,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              padding: "0 16px",
              opacity: active ? 1 : 0,
              transition: "opacity 0.6s ease",
              pointerEvents: active ? "auto" : "none",
            }}
          >
            {msg}
          </div>
        );
      })}
    </div>
  );
}
