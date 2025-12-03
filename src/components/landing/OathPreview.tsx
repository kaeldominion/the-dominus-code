"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import Link from "next/link";

// Mock data for oath signatures
const mockSignatures = [
  "MARCUS_V",
  "SOVEREIGN_ONE",
  "DYNASTY_BUILDER",
  "THE_ARCHITECT",
  "IRON_WILL",
  "LEGACY_MAKER",
  "PROTOCOL_X",
  "DOMINUS_PRIME",
  "BLOOD_OATH",
  "THE_COMMANDER",
  "APEX_RULER",
  "STONE_HEART",
  "EMPIRE_KING",
  "SHADOW_LORD",
  "TITAN_FORGE",
  "CROWN_BEARER",
  "OATH_KEEPER",
  "DYNASTY_HEIR",
  "IRON_THRONE",
  "SOVEREIGN_MIND",
];

export function OathPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mode } = useApp();

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background texture effect */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5c372' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl md:text-5xl tracking-[0.1em] text-ivory mb-6">
            THE OATH WALL
          </h2>
          <p className="font-body text-lg text-ivory/60 max-w-2xl mx-auto">
            Those who have sworn the oath. Those who strengthen the bloodline.
            Those who protect the name.
          </p>
        </motion.div>

        {/* Oath Wall Grid */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Concrete texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/50 pointer-events-none z-10" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-8 bg-obsidian/80 border border-gold/20">
            {mockSignatures.map((name, index) => (
              <motion.div
                key={name}
                className="oath-signature text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                {name}
              </motion.div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 10 }).map((_, index) => (
              <motion.div
                key={`empty-${index}`}
                className="border border-dashed border-gold/10 p-4 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + 0.05 * index, duration: 0.5 }}
              >
                <span className="text-gold/20 text-xs">—</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Counter */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="font-impact text-6xl md:text-8xl text-gold/20 mb-2">
            {mockSignatures.length}
          </p>
          <p className="font-display text-sm tracking-[0.3em] text-ivory/40 uppercase">
            Sovereigns Sworn
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link href="/oath">
            <Button variant={mode === "dominus" ? "blood" : "primary"} size="lg">
              Etch Your Name
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

