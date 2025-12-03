"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "blood" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      icon = false,
      loading = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-3 font-system font-light tracking-[0.25em] uppercase cursor-pointer transition-all duration-[600ms] relative overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed";

    const variants = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      blood: "btn-blood",
      ghost:
        "bg-transparent border-none text-sovereign hover:text-empire",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-[10px]",
      md: "px-7 py-3.5 text-[11px]",
      lg: "px-9 py-4 text-xs",
    };

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-3">
          {loading ? (
            <span className="w-4 h-4 border border-current border-t-transparent animate-spin" />
          ) : (
            <>
              {children}
              {icon && <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />}
            </>
          )}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
