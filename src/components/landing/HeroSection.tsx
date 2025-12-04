"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

// Slow, heavy, cinematic transitions - no spring, no bounce
const slowReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
  }
};

const slowFade: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
  }
};

const slowScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
  }
};

export function HeroSection() {
  const [phase, setPhase] = useState<"pulse" | "reveal" | "full">("pulse");
  const { mode } = useApp();

  useEffect(() => {
    // Slower, more dramatic timing
    const timer1 = setTimeout(() => setPhase("reveal"), 2500);
    const timer2 = setTimeout(() => setPhase("full"), 5500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Transition config for slow, cinematic feel
  const slowTransition = { duration: 1.5, ease: "easeOut" as const };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="video-bg">
        {/* 
          Replace this div with actual video when ready:
          <video autoPlay muted loop playsInline>
            <source src="/videos/hero-loop.mp4" type="video/mp4" />
          </video>
        */}
        <div className="w-full h-full bg-void animate-slow-zoom" 
          style={{
            backgroundImage: "url('/textures/tdc-background-upscaled.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/60 to-void z-10" />
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
              transition={{ duration: 1 }}
            >
              <motion.div
                className="w-3 h-3 bg-sovereign"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
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
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
              <motion.h1
                className="font-law text-4xl md:text-6xl lg:text-7xl tracking-[0.12em] text-empire"
                variants={slowReveal}
                transition={slowTransition}
              >
                The Boy Must Die.
              </motion.h1>
            </motion.div>
          )}

          {phase === "full" && (
            <motion.div
              key="full"
              className="flex flex-col items-center gap-10"
              initial="hidden"
              animate="visible"
            >
              {/* Crown */}
              <motion.div 
                variants={slowScale}
                transition={slowTransition}
                className="animate-slow-pulse"
              >
                <Crown
                  size={90}
                  variant={mode === "dominus" ? "blood" : "gold"}
                />
              </motion.div>

              {/* Title */}
              <motion.div
                className="space-y-2"
                variants={slowReveal}
                transition={{ ...slowTransition, delay: 0.3 }}
              >
                <p className="font-system text-xs tracking-[0.5em] text-sovereign uppercase">
                  The
                </p>
                <h1 className="font-law text-5xl md:text-7xl lg:text-8xl tracking-[0.08em] text-empire">
                  DOMINUS
                </h1>
                <h1 className="font-law text-5xl md:text-7xl lg:text-8xl tracking-[0.08em] text-empire">
                  CODE
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="font-scripture text-xl md:text-2xl text-empire/70 max-w-2xl italic"
                variants={slowFade}
                transition={{ duration: 1.8, ease: "easeOut" as const, delay: 0.8 }}
              >
                F*ck Monogamy. Build A Dynasty.
              </motion.p>

              {/* Divider */}
              <motion.div
                className="w-40 divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" as const }}
              />

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={slowReveal}
                transition={{ ...slowTransition, delay: 1.5 }}
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
                  Assess Sovereignty
                </Button>
              </motion.div>

              {/* Book Preview */}
              <motion.div
                className="mt-16 relative"
                variants={slowScale}
                transition={{ ...slowTransition, delay: 2 }}
              >
                <div className="relative w-44 md:w-56 mx-auto">
                  <div className="absolute -inset-8 bg-gradient-to-b from-sovereign/10 to-transparent blur-3xl" />
                  <Image
                    src="/images/book-cover.png"
                    alt="The Dominus Code - The Manual for the Reconstruction of the Masculine Soul"
                    width={224}
                    height={336}
                    className="relative"
                    style={{ boxShadow: "0 25px 80px -20px rgba(229, 195, 114, 0.15)" }}
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-concrete/30" strokeWidth={1} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
