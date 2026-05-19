"use client";

interface AnnouncementBarProps {
  spotsTaken?: number;
  totalSpots?: number;
}

export function AnnouncementBar({ spotsTaken = 347, totalSpots = 500 }: AnnouncementBarProps) {
  const text = `50% off · founding members · free to register · price locked 12 months · ${spotsTaken}/${totalSpots} spots taken · Gurgaon · launches 01.09.2026`;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "var(--clay)",
        color: "var(--bg)",
        height: 36,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
      role="banner"
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "bar-scroll 22s linear infinite",
          fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
          fontSize: 12,
          letterSpacing: "0.04em",
          gap: 0,
        }}
      >
        {/* duplicate for seamless loop */}
        {[0, 1].map((i) => (
          <span key={i} style={{ paddingRight: 80 }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
