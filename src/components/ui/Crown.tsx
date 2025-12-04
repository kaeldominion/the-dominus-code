"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type CrownVariant = "gold" | "black" | "blood" | "white";

interface CrownProps {
  className?: string;
  animate?: boolean;
  size?: number;
  variant?: CrownVariant;
}

const iconPaths: Record<CrownVariant, string> = {
  gold: "/images/tdc-icon-gold.png",
  black: "/images/tdc-icon-black.png",
  blood: "/images/tdc-icon-blood.png",
  white: "/images/tdc-icon-white.png",
};

export function Crown({ className = "", animate = false, size = 80, variant = "gold" }: CrownProps) {
  const imageElement = (
    <Image
      src={iconPaths[variant]}
      alt="The Dominus Code"
      width={size}
      height={size}
      className="crown-icon"
      style={{ width: size, height: size }}
    />
  );

  if (animate) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {imageElement}
      </motion.div>
    );
  }

  return <div className={className}>{imageElement}</div>;
}
