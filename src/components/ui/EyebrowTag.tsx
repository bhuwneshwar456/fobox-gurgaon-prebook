interface EyebrowTagProps {
  children: React.ReactNode;
  color?: "default" | "mint" | "saffron" | "turmeric" | "tomato";
  className?: string;
}

const colorMap = {
  default: "text-ink-3",
  mint: "text-mint",
  saffron: "text-saffron",
  turmeric: "text-turmeric",
  tomato: "text-tomato",
};

export function EyebrowTag({ children, color = "default", className = "" }: EyebrowTagProps) {
  return (
    <p
      className={[
        "font-mono text-xs tracking-[0.14em] uppercase font-medium",
        colorMap[color],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
