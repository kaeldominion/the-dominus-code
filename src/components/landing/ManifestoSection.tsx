"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Crown } from "@/components/ui/Crown";
import { useApp } from "@/components/Providers";
import { Play } from "lucide-react";

const manifestoPoints = [
  {
    number: "I",
    title: "Chaos",
    text: "The world is not what you were told. The maps are lies. The institutions are crumbling. The old rules don't apply.",
  },
  {
    number: "II",
    title: "Order",
    text: "In the absence of external structure, you must become the structure. Your rhythm. Your protocol. Your code.",
  },
  {
    number: "III",
    title: "Dynasty",
    text: "This is not about you. It's about what you build. The bloodline you strengthen. The name you protect.",
  },
];

// Slow, heavy animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
  }
};

export function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mode } = useApp();

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Architectural Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-concrete/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-concrete/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="crown-divider mb-10">
            <Crown
              size={36}
              className={mode === "dominus" ? "text-blood" : "text-sovereign"}
            />
          </div>
          <h2 className="font-law text-3xl md:text-5xl tracking-[0.12em] text-empire mb-8">
            THE MANIFESTO
          </h2>
          <p className="font-scripture text-lg text-empire/50 italic">
            The world is broken. Fix your house.
          </p>
        </motion.div>

        {/* Video Embed Placeholder */}
        <motion.div
          className="relative aspect-video max-w-4xl mx-auto mb-28 group cursor-pointer"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="absolute inset-0 bg-void border-arch overflow-hidden">
            {/* Background with slow zoom */}
            <div 
              className="absolute inset-0 animate-slow-zoom opacity-30"
              style={{
                backgroundImage: "url('/textures/tdc-background-upscaled.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
            <div className="absolute inset-0 bg-void/60" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-20 h-20 flex items-center justify-center border transition-all duration-700 group-hover:scale-105 ${
                  mode === "dominus" 
                    ? "border-blood/50 group-hover:border-blood" 
                    : "border-sovereign/50 group-hover:border-sovereign"
                }`}
              >
                <Play 
                  className={`w-6 h-6 ml-1 transition-colors duration-700 ${
                    mode === "dominus" ? "text-blood" : "text-sovereign"
                  }`} 
                  strokeWidth={1} 
                />
              </div>
            </div>
            
            {/* Caption */}
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-system text-[11px] tracking-[0.3em] text-sovereign uppercase">
                Watch The Manifesto
              </p>
              <p className="font-scripture text-empire/40 mt-2 italic">
                3:47 • The truth they don&apos;t want you to hear
              </p>
            </div>
          </div>
        </motion.div>

        {/* Three Pillars */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {manifestoPoints.map((point) => (
            <motion.div
              key={point.title}
              className="card-brutal p-10 text-center"
              variants={itemVariants}
            >
              <div className="mb-8">
                <span
                  className={`font-law text-5xl ${
                    mode === "dominus" ? "text-blood/20" : "text-sovereign/20"
                  }`}
                >
                  {point.number}
                </span>
              </div>
              <h3
                className={`font-law text-lg tracking-[0.2em] mb-6 ${
                  mode === "dominus" ? "text-blood" : "text-sovereign"
                }`}
              >
                {point.title}
              </h3>
              <p className="font-scripture text-empire/60 leading-relaxed italic">
                {point.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="max-w-3xl mx-auto mt-28 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1.5 }}
        >
          <p className="font-scripture text-2xl md:text-3xl italic text-empire/70 leading-relaxed">
            &ldquo;The map on your wall is a lie... We are moving toward a world
            of Elysiums... Gated communities. Private cities. Network
            states.&rdquo;
          </p>
          <footer className="mt-8">
            <cite className="font-system text-[11px] tracking-[0.3em] text-sovereign not-italic uppercase">
              — The Dominus Code
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
