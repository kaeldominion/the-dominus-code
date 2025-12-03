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
      "inline-flex items-center justify-center gap-3 font-display font-semibold tracking-widest uppercase cursor-pointer transition-all relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      blood: "btn-blood",
      ghost:
        "bg-transparent border-none text-gold hover:text-gold-light underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-3">
          {loading ? (
            <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {children}
              {icon && <ArrowRight className="w-4 h-4" />}
            </>
          )}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

