"use client";
import { useState, useEffect, useRef } from "react";

interface AnnouncementBarProps {
  spotsTaken?: number;
  totalSpots?: number;
}

function BarMessage({ text, active }: { text: string; active: boolean }) {
  const innerRef = useRef<HTMLSpanElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const check = () => {
      if (innerRef.current && outerRef.current) {
        setOverflow(innerRef.current.scrollWidth > outerRef.current.clientWidth);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [text]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: active ? "translateY(0)" : "translateY(100%)",
        opacity: active ? 1 : 0,
        transition: "transform 0.4s ease, opacity 0.4s ease",
        fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        fontSize: 12,
        letterSpacing: "0.04em",
        overflow: "hidden",
      }}
    >
      <div
        ref={outerRef}
        style={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: overflow ? "flex-start" : "center",
        }}
      >
        {overflow ? (
          /* Marquee: duplicate text for seamless loop */
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              animation: active ? "bar-scroll 18s linear infinite" : "none",
            }}
          >
            <span style={{ paddingRight: 64 }}>{text}</span>
            <span style={{ paddingRight: 64 }}>{text}</span>
          </div>
        ) : (
          <span ref={innerRef} style={{ whiteSpace: "nowrap" }}>
            {text}
          </span>
        )}
        {/* hidden measurement span when marquee is active */}
        {overflow && (
          <span
            ref={innerRef}
            style={{ position: "absolute", visibility: "hidden", whiteSpace: "nowrap", pointerEvents: "none" }}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
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
        <BarMessage key={i} text={msg} active={i === index} />
      ))}
    </div>
  );
}
