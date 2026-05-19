"use client";
import { useState, useEffect } from "react";

interface AnnouncementBarProps {
  spotsTaken?: number;
  totalSpots?: number;
}

export function AnnouncementBar({ spotsTaken = 347, totalSpots = 500 }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % 2), 3500);
    return () => clearInterval(id);
  }, []);

  const messages = [
    `🔥 50% off · founding members · free to register · price locked for 12 months`,
    `⏳ ${spotsTaken} / ${totalSpots} spots taken · Gurgaon · launches 01.09.2026`,
  ];

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "var(--clay)",
        color: "var(--bg)",
        height: 36,
        overflow: "hidden",
        position: "relative",
      }}
      role="banner"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
            fontSize: 12,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            padding: "0 16px",
            transform: i === index ? "translateY(0)" : i < index ? "translateY(-100%)" : "translateY(100%)",
            opacity: i === index ? 1 : 0,
            transition: "transform 0.4s ease, opacity 0.4s ease",
          }}
        >
          {msg}
        </div>
      ))}
    </div>
  );
}
