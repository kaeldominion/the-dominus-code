"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CrownProps {
  className?: string;
  animate?: boolean;
  size?: number;
}

export function Crown({ className = "", animate = false, size = 80 }: CrownProps) {
  const imageElement = (
    <Image
      src="/images/tdc-icon-gold.png"
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {imageElement}
      </motion.div>
    );
  }

  return <div className={className}>{imageElement}</div>;
}
