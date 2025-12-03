"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const [phase, setPhase] = useState<"pulse" | "reveal" | "full">("pulse");
  const { mode } = useApp();

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("reveal"), 2000);
    const timer2 = setTimeout(() => setPhase("full"), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/90 to-obsidian z-10" />
        {/* Placeholder for cinematic video loop */}
        <div className="absolute inset-0 bg-obsidian" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {phase === "pulse" && (
            <motion.div
              key="pulse"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-gold"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}

          {phase === "reveal" && (
            <motion.div
              key="reveal"
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] text-ivory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                The Boy Must Die.
              </motion.h1>
            </motion.div>
          )}

          {phase === "full" && (
            <motion.div
              key="full"
              className="flex flex-col items-center gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Crown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Crown
                  size={100}
                  className={`${
                    mode === "dominus" ? "text-blood" : "text-gold"
                  } animate-pulse-glow`}
                />
              </motion.div>

              {/* Title */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <p className="font-display text-sm tracking-[0.5em] text-gold uppercase">
                  The
                </p>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-ivory">
                  DOMINUS
                </h1>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-ivory -mt-2">
                  CODE
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="font-body text-xl md:text-2xl text-ivory/80 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                F*ck Monogamy. Build A Dynasty.
              </motion.p>

              {/* Divider */}
              <motion.div
                className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Button
                  variant={mode === "dominus" ? "blood" : "primary"}
                  size="lg"
                  icon
                  onClick={() => {
                    document
                      .getElementById("manifesto")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Enter The Code
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    window.location.href = "/calibration";
                  }}
                >
                  Take The Test
                </Button>
              </motion.div>

              {/* Book Preview */}
              <motion.div
                className="mt-12 relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <div className="relative w-48 md:w-64 mx-auto">
                  <div className="absolute -inset-4 bg-gradient-to-b from-gold/20 to-transparent blur-2xl" />
                  <Image
                    src="/images/book-cover.png"
                    alt="The Dominus Code Book"
                    width={256}
                    height={384}
                    className="relative shadow-2xl shadow-gold/20"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      {phase === "full" && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-gold/50" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

