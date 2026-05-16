const phrases = [
  "not a detox",
  "not a supplement",
  "not a branded salad",
  "just real food",
  "cooked in Gurgaon",
];

const blobColors = [
  "var(--turmeric)",
  "var(--sabzi)",
  "var(--clay)",
  "var(--saffron)",
  "var(--kadhi)",
];

function MarqueeItem({ phrase, blobColor }: { phrase: string; blobColor: string }) {
  return (
    <>
      <span
        style={{
          fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(28px, 4vw, 44px)",
          letterSpacing: "-0.02em",
          color: "var(--bg)",
          whiteSpace: "nowrap",
          paddingRight: "clamp(28px, 4vw, 48px)",
        }}
      >
        {phrase}
      </span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: blobColor,
          flexShrink: 0,
          marginRight: "clamp(28px, 4vw, 48px)",
          verticalAlign: "middle",
        }}
      />
    </>
  );
}

export function MarqueeStrip() {
  const items = [...phrases, ...phrases]; // duplicate for seamless loop

  return (
    <div
      style={{
        background: "var(--ink)",
        overflow: "hidden",
        paddingTop: "clamp(18px, 3vw, 28px)",
        paddingBottom: "clamp(18px, 3vw, 28px)",
      }}
      aria-hidden
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animation: "marquee-scroll 38s linear infinite",
        }}
      >
        {items.map((phrase, i) => (
          <MarqueeItem
            key={i}
            phrase={phrase}
            blobColor={blobColors[i % blobColors.length]}
          />
        ))}
      </div>
    </div>
  );
}
