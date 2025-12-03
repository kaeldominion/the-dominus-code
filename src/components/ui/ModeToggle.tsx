"use client";

import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { mode, toggleMode } = useApp();
  const isDominus = mode === "dominus";

  return (
    <div className="flex items-center gap-3">
      <span
        className={`font-display text-xs tracking-widest uppercase transition-colors ${
          !isDominus ? "text-gold" : "text-ivory/40"
        }`}
      >
        Realist
      </span>
      <button
        onClick={toggleMode}
        className="mode-toggle"
        data-active={isDominus}
        aria-label={`Switch to ${isDominus ? "Realist" : "Dominus"} mode`}
      />
      <span
        className={`font-display text-xs tracking-widest uppercase transition-colors ${
          isDominus ? "text-blood" : "text-ivory/40"
        }`}
      >
        Dominus
      </span>
    </div>
  );
}

export function ModeToggleCompact() {
  const { mode, toggleMode } = useApp();
  const isDominus = mode === "dominus";

  return (
    <motion.button
      onClick={toggleMode}
      className="relative w-12 h-6 rounded-none border border-gold/50 bg-obsidian/80 overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-y-0.5 w-5 h-5 bg-gold"
        animate={{
          left: isDominus ? "calc(100% - 22px)" : "2px",
          backgroundColor: isDominus ? "#8a0303" : "#e5c372",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}

