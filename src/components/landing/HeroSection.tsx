"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { ChevronDown } from "lucide-react";

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

// Release date: January 1st, 2026
const RELEASE_DATE = new Date("2026-01-01T00:00:00");

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// Retailer icons as simple SVG components
function AppleBooksIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13H9v8h2V7zm4 0h-2v8h2V7z"/>
    </svg>
  );
}

function AmazonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.058-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66C6.057 2.223 9.005.997 11.615.997c1.334 0 3.078.355 4.132 1.365 1.334 1.251 1.206 2.916 1.206 4.729v4.284c0 1.289.535 1.854 1.039 2.548.177.247.216.544-.003.726-.548.457-1.522 1.307-2.058 1.783l-.787-.637zM21.454 16.386c-1.188.924-2.9 1.414-4.374 1.414-2.07 0-3.932-.765-5.341-2.039-.111-.1-.012-.236.121-.158 1.521.887 3.405 1.421 5.347 1.421 1.312 0 2.754-.272 4.08-.835.2-.086.369.132.167.197z"/>
    </svg>
  );
}

function AudibleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}

function BarnesNobleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
    </svg>
  );
}

export function HeroSection() {
  const [phase, setPhase] = useState<"pulse" | "reveal" | "full">("pulse");
  const { mode } = useApp();
  const countdown = useCountdown(RELEASE_DATE);

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

  const retailers = [
    { name: "Apple Books", icon: AppleBooksIcon },
    { name: "Amazon", icon: AmazonIcon },
    { name: "Audible", icon: AudibleIcon },
    { name: "Barnes & Noble", icon: BarnesNobleIcon },
  ];

  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="video-bg">
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

      {/* Spacer for header */}
      <div className="h-24 flex-shrink-0" />

      {/* Content - Centered in remaining space */}
      <div className="relative z-20 flex-1 flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 text-center">
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
                className="flex flex-col items-center"
                initial="hidden"
                animate="visible"
              >
                {/* Crown - smaller, decorative */}
                <motion.div 
                  variants={slowScale}
                  transition={slowTransition}
                  className="mb-6"
                >
                  <Crown
                    size={60}
                    variant={mode === "dominus" ? "blood" : "gold"}
                  />
                </motion.div>

                {/* Title */}
                <motion.div
                  className="space-y-1"
                  variants={slowReveal}
                  transition={{ ...slowTransition, delay: 0.2 }}
                >
                  <p className="font-system text-xs tracking-[0.5em] text-sovereign uppercase mb-2">
                    The
                  </p>
                  <h1 className="font-law text-5xl md:text-7xl lg:text-8xl tracking-[0.08em] text-empire leading-none">
                    DOMINUS
                  </h1>
                  <h1 className="font-law text-5xl md:text-7xl lg:text-8xl tracking-[0.08em] text-empire leading-none">
                    CODE
                  </h1>
                </motion.div>

                {/* Tagline */}
                <motion.p
                  className="font-scripture text-xl md:text-2xl text-empire/70 max-w-2xl italic mt-8"
                  variants={slowFade}
                  transition={{ duration: 1.8, ease: "easeOut" as const, delay: 0.6 }}
                >
                  F*ck Monogamy. Build A Dynasty.
                </motion.p>

                {/* Divider */}
                <motion.div
                  className="w-40 divider mt-8"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeOut" as const }}
                />

                {/* CTA */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 mt-8"
                  variants={slowReveal}
                  transition={{ ...slowTransition, delay: 1.2 }}
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

                {/* Coming Soon Section */}
                <motion.div
                  className="mt-12"
                  variants={slowFade}
                  transition={{ ...slowTransition, delay: 1.6 }}
                >
                  {/* Release Date */}
                  <p className="font-system text-[10px] tracking-[0.4em] text-concrete/50 uppercase mb-4">
                    Releases January 1, 2026
                  </p>
                  
                  {/* Countdown */}
                  <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
                    <div className="text-center">
                      <p className={`font-system text-2xl md:text-3xl font-light ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
                        {countdown.days}
                      </p>
                      <p className="font-system text-[8px] tracking-[0.3em] text-concrete/40 uppercase">
                        Days
                      </p>
                    </div>
                    <span className="text-concrete/20 text-xl">:</span>
                    <div className="text-center">
                      <p className={`font-system text-2xl md:text-3xl font-light ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
                        {String(countdown.hours).padStart(2, '0')}
                      </p>
                      <p className="font-system text-[8px] tracking-[0.3em] text-concrete/40 uppercase">
                        Hours
                      </p>
                    </div>
                    <span className="text-concrete/20 text-xl">:</span>
                    <div className="text-center">
                      <p className={`font-system text-2xl md:text-3xl font-light ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
                        {String(countdown.minutes).padStart(2, '0')}
                      </p>
                      <p className="font-system text-[8px] tracking-[0.3em] text-concrete/40 uppercase">
                        Mins
                      </p>
                    </div>
                    <span className="text-concrete/20 text-xl">:</span>
                    <div className="text-center">
                      <p className={`font-system text-2xl md:text-3xl font-light ${mode === "dominus" ? "text-blood/60" : "text-sovereign/60"}`}>
                        {String(countdown.seconds).padStart(2, '0')}
                      </p>
                      <p className="font-system text-[8px] tracking-[0.3em] text-concrete/40 uppercase">
                        Secs
                      </p>
                    </div>
                  </div>

                  {/* Retailer Icons */}
                  <div className="flex items-center justify-center gap-6 md:gap-8">
                    <p className="font-system text-[9px] tracking-[0.2em] text-concrete/30 uppercase hidden sm:block">
                      Available on
                    </p>
                    {retailers.map((retailer) => (
                      <div 
                        key={retailer.name}
                        className="group relative"
                        title={retailer.name}
                      >
                        <retailer.icon className="w-5 h-5 md:w-6 md:h-6 text-concrete/30 group-hover:text-sovereign transition-colors duration-300" />
                        {/* Tooltip */}
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-system text-[8px] tracking-wider text-concrete/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {retailer.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Indicator - fixed at bottom */}
      {phase === "full" && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
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
