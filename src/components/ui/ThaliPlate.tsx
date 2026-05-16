export function ThaliPlate() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: "1 / 1",
        width: "100%",
        maxWidth: 560,
        margin: "0 auto",
      }}
    >
      {/* Steam SVG — above the plate */}
      <svg
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        fill="none"
        stroke="oklch(0.5 0.03 60)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 80,
          opacity: 0.55,
          pointerEvents: "none",
          zIndex: 2,
        }}
        aria-hidden
      >
        <path d="M50,75 C55,55 45,40 55,20 C60,10 55,5 60,0">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M100,75 C95,55 105,40 95,20 C90,10 95,5 100,0">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3.5s" repeatCount="indefinite" />
        </path>
        <path d="M150,75 C155,55 145,40 155,20 C160,10 155,5 150,0">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.8s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Plate */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: "var(--raita)",
          borderRadius: "50%",
          position: "relative",
          boxShadow:
            "0 0 0 12px var(--bg), 0 0 0 13px var(--line), 0 40px 80px -20px oklch(0.30 0.05 50 / 0.35)",
          display: "grid",
          placeItems: "center",
        }}
      >
        {/* Shimmer highlight */}
        <div
          style={{
            position: "absolute",
            inset: "8%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at 30% 25%, oklch(1 0 0 / 0.6), transparent 50%)",
            pointerEvents: "none",
          }}
        />

        {/* Rice — center */}
        <div
          style={{
            position: "absolute",
            width: "32%",
            aspectRatio: "1",
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, oklch(0.96 0.02 90), oklch(0.90 0.03 85))",
            border: "1px solid oklch(0.80 0.04 80)",
            boxShadow: "inset 0 6px 14px -4px oklch(0 0 0 / 0.2), inset 0 -3px 8px -2px oklch(1 0 0 / 0.2)",
          }}
        />

        {/* Dal — top-left (turmeric) */}
        <div
          style={{
            position: "absolute",
            width: "26%",
            aspectRatio: "1",
            borderRadius: "50%",
            top: "8%",
            left: "22%",
            background: "radial-gradient(circle at 40% 35%, var(--turmeric), oklch(0.62 0.18 78))",
            boxShadow: "inset 0 6px 14px -4px oklch(0 0 0 / 0.2), inset 0 -3px 8px -2px oklch(1 0 0 / 0.2)",
          }}
        />

        {/* Sabzi — top-right (green) */}
        <div
          style={{
            position: "absolute",
            width: "26%",
            aspectRatio: "1",
            borderRadius: "50%",
            top: "8%",
            right: "22%",
            background: "radial-gradient(circle at 40% 35%, oklch(0.68 0.13 135), var(--sabzi))",
            boxShadow: "inset 0 6px 14px -4px oklch(0 0 0 / 0.2), inset 0 -3px 8px -2px oklch(1 0 0 / 0.2)",
          }}
        />

        {/* Roti — bottom-left (tan/wheat) */}
        <div
          style={{
            position: "absolute",
            width: "24%",
            aspectRatio: "1",
            borderRadius: "50%",
            bottom: "12%",
            left: "14%",
            background: "radial-gradient(circle at 40% 35%, oklch(0.85 0.05 75), oklch(0.72 0.07 65))",
            boxShadow: "inset 0 6px 14px -4px oklch(0 0 0 / 0.2), inset 0 -3px 8px -2px oklch(1 0 0 / 0.2)",
          }}
        />

        {/* Curry — bottom-right (clay/tomato) */}
        <div
          style={{
            position: "absolute",
            width: "24%",
            aspectRatio: "1",
            borderRadius: "50%",
            bottom: "12%",
            right: "14%",
            background: "radial-gradient(circle at 40% 35%, oklch(0.62 0.19 35), var(--clay))",
            boxShadow: "inset 0 6px 14px -4px oklch(0 0 0 / 0.2), inset 0 -3px 8px -2px oklch(1 0 0 / 0.2)",
          }}
        />

        {/* Achar — bottom-center (tiny deep red) */}
        <div
          style={{
            position: "absolute",
            width: "11%",
            aspectRatio: "1",
            borderRadius: "50%",
            bottom: "4%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle at 40% 35%, oklch(0.65 0.20 50), oklch(0.50 0.20 40))",
            boxShadow: "inset 0 6px 14px -4px oklch(0 0 0 / 0.2), inset 0 -3px 8px -2px oklch(1 0 0 / 0.2)",
          }}
        />
      </div>

      {/* Floating plate labels — positioned on wrapper */}
      {/* dal · 18g protein — top-left */}
      <PlateLabel position={{ top: "14%", left: "6%" }} dotSide="right">
        dal · 18g protein
      </PlateLabel>

      {/* sabzi · 2 portions — bottom-right */}
      <PlateLabel position={{ top: "76%", left: "90%" }} dotSide="left">
        sabzi · 2 portions
      </PlateLabel>

      {/* cooked at 4pm today — bottom-left */}
      <PlateLabel position={{ top: "85%", left: "18%" }}>
        cooked at 4pm today
      </PlateLabel>
    </div>
  );
}

function PlateLabel({
  children,
  position,
  dotSide,
}: {
  children: React.ReactNode;
  position: React.CSSProperties;
  dotSide?: "left" | "right";
}) {
  return (
    <span
      style={{
        position: "absolute",
        background: "var(--ink)",
        color: "var(--bg)",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        fontSize: 11,
        padding: "5px 10px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 4px 10px -3px oklch(0.30 0.05 50 / 0.4)",
        zIndex: 10,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        ...position,
      }}
    >
      {dotSide === "left" && (
        <span style={{
          position: "absolute", left: -10, top: "50%", transform: "translateY(-50%)",
          width: 7, height: 7, borderRadius: "50%", background: "var(--ink)",
        }} />
      )}
      {children}
      {dotSide === "right" && (
        <span style={{
          position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)",
          width: 7, height: 7, borderRadius: "50%", background: "var(--ink)",
        }} />
      )}
    </span>
  );
}
