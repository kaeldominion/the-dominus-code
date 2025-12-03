"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown } from "@/components/ui/Crown";
import { useApp } from "@/components/Providers";
import { Play } from "lucide-react";

const manifestoPoints = [
  {
    title: "Chaos",
    text: "The world is not what you were told. The maps are lies. The institutions are crumbling. The old rules don't apply.",
  },
  {
    title: "Order",
    text: "In the absence of external structure, you must become the structure. Your rhythm. Your protocol. Your code.",
  },
  {
    title: "Dynasty",
    text: "This is not about you. It's about what you build. The bloodline you strengthen. The name you protect.",
  },
];

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
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="crown-divider mb-8">
            <Crown
              size={40}
              className={mode === "dominus" ? "text-blood" : "text-gold"}
            />
          </div>
          <h2 className="font-display text-3xl md:text-5xl tracking-[0.1em] text-ivory mb-6">
            THE MANIFESTO
          </h2>
          <p className="font-body text-lg text-ivory/60 max-w-2xl mx-auto">
            The world is broken. Fix your house.
          </p>
        </motion.div>

        {/* Video Embed Placeholder */}
        <motion.div
          className="relative aspect-video max-w-4xl mx-auto mb-24 group cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-obsidian border border-gold/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-20 h-20 rounded-full ${
                  mode === "dominus" ? "bg-blood" : "bg-gold"
                } flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <Play className="w-8 h-8 text-obsidian ml-1" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-sm tracking-[0.3em] text-gold uppercase">
                Watch The Manifesto
              </p>
              <p className="font-body text-ivory/50 mt-1">
                3:47 • The truth they don&apos;t want you to hear
              </p>
            </div>
          </div>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {manifestoPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="card-brutal p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
            >
              <div className="mb-6">
                <span
                  className={`font-impact text-6xl ${
                    mode === "dominus" ? "text-blood/30" : "text-gold/30"
                  }`}
                >
                  0{index + 1}
                </span>
              </div>
              <h3
                className={`font-display text-xl tracking-[0.2em] ${
                  mode === "dominus" ? "text-blood" : "text-gold"
                } mb-4`}
              >
                {point.title}
              </h3>
              <p className="font-body text-ivory/70 leading-relaxed">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          className="max-w-3xl mx-auto mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="font-body text-2xl md:text-3xl italic text-ivory/80 leading-relaxed">
            &ldquo;The map on your wall is a lie... We are moving toward a world
            of Elysiums... Gated communities. Private cities. Network
            states.&rdquo;
          </p>
          <footer className="mt-6">
            <cite className="font-display text-sm tracking-[0.3em] text-gold not-italic">
              — THE DOMINUS CODE
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}

