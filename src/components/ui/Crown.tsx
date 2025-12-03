"use client";

import { motion } from "framer-motion";

interface CrownProps {
  className?: string;
  animate?: boolean;
  size?: number;
}

export function Crown({ className = "", animate = false, size = 80 }: CrownProps) {
  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
      }
    : {};

  return (
    <Wrapper {...wrapperProps} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="crown-icon"
      >
        <path
          d="M108 680L228 280L412 440L512 200L612 440L796 280L916 680"
          stroke="currentColor"
          strokeWidth="48"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="140"
          y1="780"
          x2="884"
          y2="780"
          stroke="currentColor"
          strokeWidth="48"
          strokeLinecap="round"
        />
      </svg>
    </Wrapper>
  );
}

