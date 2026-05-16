interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "paper" | "paper-deep" | "ink" | "canvas" | "calm" | "fit" | "daily" | "bg" | "bg-2";
}

const bgMap = {
  paper:       "bg-paper",
  "paper-deep":"bg-bg-2",
  "bg":        "bg-bg",
  "bg-2":      "bg-bg-2",
  ink:         "bg-ink",
  canvas:      "bg-canvas",
  calm:        "bg-calm-bg",
  fit:         "bg-fit-bg",
  daily:       "bg-daily-bg",
};

export function Section({ children, className = "", id, bg = "bg" }: SectionProps) {
  return (
    <section
      id={id}
      className={[
        "py-[clamp(5rem,10vw,9rem)]",
        bgMap[bg],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}
