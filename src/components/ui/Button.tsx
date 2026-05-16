"use client";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "secondary" | "mint" | "saffron" | "turmeric" | "ghost" | "whatsapp";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:   "bg-clay text-bg hover:bg-clay-deep border-clay",
  secondary: "bg-ink text-bg hover:bg-ink-soft border-ink",
  mint:      "bg-sabzi text-bg hover:opacity-90 border-sabzi",
  saffron:   "bg-saffron text-ink hover:opacity-90 border-saffron",
  turmeric:  "bg-turmeric text-ink hover:opacity-90 border-turmeric",
  ghost:     "bg-transparent text-ink border-line hover:border-clay hover:text-clay",
  whatsapp:  "bg-[#25D366] text-white hover:bg-[#1eba57] border-[#25D366]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm min-h-[40px]",
  md: "px-6 py-3 text-base min-h-[48px]",
  lg: "px-[30px] py-[18px] text-base min-h-[56px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth = false, className = "", children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.15 }}
        className={[
          "inline-flex items-center justify-center gap-2 font-medium leading-none cursor-pointer",
          "border rounded-[999px] transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={disabled}
        {...(props as HTMLMotionProps<"button">)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
