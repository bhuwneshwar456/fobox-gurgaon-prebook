interface EyebrowTagProps {
  children: React.ReactNode;
  color?: "default" | "mint" | "saffron" | "turmeric" | "tomato" | "clay";
  className?: string;
}

const colorMap = {
  default:  "text-clay",
  clay:     "text-clay",
  mint:     "text-sabzi",
  saffron:  "text-saffron",
  turmeric: "text-turmeric",
  tomato:   "text-clay",
};

export function EyebrowTag({ children, color = "default", className = "" }: EyebrowTagProps) {
  return (
    <p
      className={[
        "inline-flex items-center gap-3 text-[13px] tracking-[0.08em] uppercase font-[600]",
        colorMap[color],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        aria-hidden
        style={{ display: "inline-block", width: 28, height: 1, backgroundColor: "currentColor", opacity: 0.5 }}
      />
      {children}
      <span
        aria-hidden
        style={{ display: "inline-block", width: 28, height: 1, backgroundColor: "currentColor", opacity: 0.5 }}
      />
    </p>
  );
}
