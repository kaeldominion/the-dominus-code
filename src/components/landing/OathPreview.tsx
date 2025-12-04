"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import Link from "next/link";

// Mock data for oath signatures - memorial wall style
const mockSignatures = [
  "MARCUS_V", "SOVEREIGN_ONE", "DYNASTY_BUILDER", "THE_ARCHITECT", "IRON_WILL",
  "LEGACY_MAKER", "PROTOCOL_X", "DOMINUS_PRIME", "BLOOD_OATH", "THE_COMMANDER",
  "APEX_RULER", "STONE_HEART", "EMPIRE_KING", "SHADOW_LORD", "TITAN_FORGE",
  "CROWN_BEARER", "OATH_KEEPER", "DYNASTY_HEIR", "IRON_THRONE", "SOVEREIGN_MIND",
];

// Slow, heavy animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
  }
};

export function OathPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mode } = useApp();

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e6e6e6' fill-opacity='1'%3E%3Cpath d='M20 20h20v20H20V20zm0-20h20v20H20V0zM0 20h20v20H0V20zM0 0h20v20H0V0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-system text-xs tracking-[0.4em] text-concrete/50 uppercase mb-4">
            The Monument
          </p>
          <h2 className="font-law text-3xl md:text-5xl tracking-[0.12em] text-empire mb-8">
            THE OATH WALL
          </h2>
          <p className="font-scripture text-lg text-empire/50 max-w-2xl mx-auto italic">
            Those who have sworn the oath. Those who strengthen the bloodline.
            Those who protect the name.
          </p>
        </motion.div>

        {/* Oath Wall Grid - Memorial Style */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1.2 }}
        >
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void/60 pointer-events-none z-10" />

          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 p-6 md:p-10 bg-void/90 border-arch"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {mockSignatures.map((name) => (
              <motion.div
                key={name}
                className="oath-signature text-center"
                variants={itemVariants}
              >
                {name}
              </motion.div>
            ))}

            {/* Empty slots - waiting to be filled */}
            {Array.from({ length: 10 }).map((_, index) => (
              <motion.div
                key={`empty-${index}`}
                className="border border-dashed border-concrete/10 p-4 flex items-center justify-center"
                variants={itemVariants}
              >
                <span className="text-concrete/10 text-xs">—</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Counter */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-system text-7xl md:text-8xl font-light tracking-wider text-concrete/10 mb-3">
            {mockSignatures.length}
          </p>
          <p className="font-system text-[10px] tracking-[0.4em] text-concrete/40 uppercase">
            Sovereigns Sworn
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link href="/oath">
            <Button variant={mode === "dominus" ? "blood" : "primary"} size="lg">
              Take The Oath
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
