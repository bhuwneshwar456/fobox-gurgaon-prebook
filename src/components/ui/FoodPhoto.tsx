interface FoodPhotoProps {
  src?: string;
  alt: string;
  placeholderDesc: string;
  rotation?: number;
  className?: string;
  accentColor?: string;
}

const PLAN_TAGLINES: Record<string, string> = {
  "khichdi · dahi · sautéed vegetables": "Gentle on the gut.\nBig on flavour.",
  "paneer · quinoa · greens · PROTEIN: 32g": "Built for\nyour goals.",
  "dal · roti · sabzi · rice · achar": "Tastes like\nsomeone made it for you.",
  "dal · rice · sabzi · roti": "Real food,\nevery single day.",
};

export function FoodPhoto({
  src,
  alt,
  placeholderDesc,
  rotation = -2,
  className = "",
  accentColor = "#14110F",
}: FoodPhotoProps) {
  const rotateStyle = { transform: `rotate(${rotation}deg)` };
  const tags = placeholderDesc.split(" · ").filter((t) => !t.startsWith("PROTEIN"));
  const tagline = PLAN_TAGLINES[placeholderDesc] ?? "Fresh food,\nprepared daily.";

  if (src) {
    return (
      <div
        className={["relative inline-block", className].join(" ")}
        style={rotateStyle}
      >
        <div
          className="absolute inset-0 rounded-[16px]"
          style={{
            border: `2px solid ${accentColor}`,
            transform: "translate(8px, 8px)",
            backgroundColor: "#F5EDDD",
            zIndex: 0,
          }}
        />
        <img
          src={src}
          alt={alt}
          className="relative z-10 rounded-[16px] object-cover w-full h-full"
          style={{ border: `2px solid ${accentColor}` }}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={["relative inline-block w-full", className].join(" ")}
      style={rotateStyle}
    >
      {/* Drop shadow offset card */}
      <div
        className="absolute inset-0 rounded-[16px]"
        style={{
          border: `2px solid ${accentColor}`,
          transform: "translate(8px, 8px)",
          backgroundColor: "#F5EDDD",
          zIndex: 0,
        }}
      />

      {/* Main card */}
      <div
        className="relative z-10 rounded-[16px] overflow-hidden aspect-[4/3] flex flex-col"
        style={{ border: `2px solid ${accentColor}`, backgroundColor: "#FBF7F1" }}
      >
        {/* Top strip */}
        <div
          className="flex items-center justify-between px-6 py-3.5"
          style={{ borderBottom: `1px solid ${accentColor}12` }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            fobox kitchen
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            gurgaon · from sep 2026
          </span>
        </div>

        {/* Centre — large Fraunces tagline */}
        <div className="flex-1 flex flex-col justify-center px-7 py-5 gap-4">
          <p
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.4rem, 3.5vw, 1.9rem)",
              lineHeight: 1.15,
              color: "var(--ink)",
              whiteSpace: "pre-line",
            }}
          >
            {tagline}
          </p>
          <div
            style={{
              width: "2rem",
              height: "2px",
              backgroundColor: `${accentColor}`,
              opacity: 0.2,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--ink-3)",
              lineHeight: 1.5,
            }}
          >
            50 wholesome meals / month · hold any meal
          </p>
        </div>

        {/* Bottom — ingredient tags */}
        <div
          className="flex flex-wrap gap-1.5 px-6 py-3.5"
          style={{ borderTop: `1px solid ${accentColor}12` }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "9px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                padding: "2px 7px",
                border: `1px solid ${accentColor}20`,
                borderRadius: "3px",
                backgroundColor: `${accentColor}07`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
