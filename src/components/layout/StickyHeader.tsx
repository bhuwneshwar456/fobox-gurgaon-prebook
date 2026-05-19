"use client";
import { useEffect, useRef, useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";

interface StickyHeaderProps {
  spotsTaken?: number;
  totalSpots?: number;
}

export function StickyHeader({ spotsTaken, totalSpots }: StickyHeaderProps) {
  const [barVisible, setBarVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const BAR_HEIGHT = 36;

    const onScroll = () => {
      const y = window.scrollY;
      if (y <= BAR_HEIGHT) {
        // At the very top — always show bar fully
        setBarVisible(true);
      } else {
        // Past the bar height — hide it completely
        setBarVisible(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div
        style={{
          overflow: "hidden",
          maxHeight: barVisible ? 36 : 0,
          transition: "max-height 0.2s ease",
        }}
      >
        <AnnouncementBar spotsTaken={spotsTaken} totalSpots={totalSpots} />
      </div>
      <Header />
    </div>
  );
}
