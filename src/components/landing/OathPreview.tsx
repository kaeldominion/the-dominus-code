"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import Link from "next/link";

// Mock data for oath signatures - tiered for visual hierarchy
const founderNames = ["MARCUS_V", "SOVEREIGN_ONE", "DYNASTY_BUILDER"];
const eliteNames = ["THE_ARCHITECT", "IRON_WILL", "LEGACY_MAKER", "PROTOCOL_X", "DOMINUS_PRIME"];
const swornNames = [
  "BLOOD_OATH", "THE_COMMANDER", "APEX_RULER", "STONE_HEART", "EMPIRE_KING",
  "SHADOW_LORD", "TITAN_FORGE", "CROWN_BEARER", "OATH_KEEPER", "DYNASTY_HEIR",
  "IRON_THRONE", "SOVEREIGN_MIND", "BLOOD_LINE", "THE_PATRIARCH", "SILENT_KING",
];

const totalCount = founderNames.length + eliteNames.length + swornNames.length;

// Slow, heavy animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.5 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Stone texture SVG
const stoneTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export function OathPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mode } = useApp();
  const [displayCount, setDisplayCount] = useState(0);

  // Animated counter
  useEffect(() => {
    if (isInView && displayCount < totalCount) {
      const timer = setTimeout(() => {
        setDisplayCount((prev) => Math.min(prev + 1, totalCount));
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isInView, displayCount]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="font-system text-[10px] tracking-[0.5em] text-concrete/40 uppercase mb-6">
            The Monument
          </p>
          <h2 className="font-law text-3xl md:text-5xl lg:text-6xl tracking-[0.15em] text-empire mb-8">
            THE OATH WALL
          </h2>
          <p className="font-scripture text-lg md:text-xl text-empire/40 max-w-2xl mx-auto italic leading-relaxed">
            A monolith of names etched in stone. Those who have sworn. Those who strengthen the bloodline.
          </p>
        </motion.div>

        {/* The Monolith Preview */}
        <motion.div
          className="relative max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1.4, ease: "easeOut" }}
        >
          {/* Shadow beneath */}
          <div className="absolute -inset-4 bg-black/40 blur-2xl -z-10" />
          
          {/* Main monolith body - GREY STONE */}
          <div 
            className="relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 50%, #252525 100%)',
            }}
          >
            {/* Stone texture overlay */}
            <div 
              className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: stoneTexture }}
            />
            
            {/* Top bevel */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/15 to-transparent" />
            
            {/* Side shadows */}
            <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/25 to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-6 bg-gradient-to-l from-black/25 to-transparent pointer-events-none" />
            
            {/* Header inscription */}
            <div className="relative py-5 px-6 border-b border-black/25 text-center">
              <p 
                className="font-law text-[10px] md:text-xs tracking-[0.4em] relative z-10"
                style={{
                  color: '#1a1a1a',
                  textShadow: '1px 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                THOSE WHO HAVE SWORN
              </p>
            </div>
            
            {/* Names - Condensed Preview */}
            <div className="relative p-5 md:p-6">
              
              {/* Founders Row */}
              <motion.div 
                className="flex justify-center gap-4 md:gap-6 mb-4"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {founderNames.map((name) => (
                  <motion.span
                    key={name}
                    className="font-system text-[10px] md:text-xs tracking-[0.15em] font-medium"
                    style={{
                      color: '#6a0202',
                      textShadow: '1px 1px 0 rgba(255,255,255,0.12), -1px -1px 0 rgba(0,0,0,0.35)',
                    }}
                    variants={itemVariants}
                  >
                    {name}
                  </motion.span>
                ))}
              </motion.div>
              
              {/* Elite Row */}
              <motion.div 
                className="flex flex-wrap justify-center gap-3 md:gap-4 mb-4"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {eliteNames.map((name) => (
                  <motion.span
                    key={name}
                    className="font-system text-[9px] md:text-[10px] tracking-[0.12em] font-medium"
                    style={{
                      color: '#8a7020',
                      textShadow: '1px 1px 0 rgba(255,255,255,0.1), -1px -1px 0 rgba(0,0,0,0.3)',
                    }}
                    variants={itemVariants}
                  >
                    {name}
                  </motion.span>
                ))}
              </motion.div>
              
              {/* Sworn Grid */}
              <motion.div 
                className="grid grid-cols-3 sm:grid-cols-5 gap-1"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {swornNames.map((name) => (
                  <motion.div
                    key={name}
                    className="py-1.5 px-1 text-center"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, transparent 100%)',
                    }}
                    variants={itemVariants}
                  >
                    <span 
                      className="font-system text-[8px] md:text-[9px] tracking-[0.1em]"
                      style={{
                        color: '#1f1f1f',
                        textShadow: '1px 1px 0 rgba(255,255,255,0.1)',
                      }}
                    >
                      {name}
                    </span>
                  </motion.div>
                ))}
                
                {/* Empty slots hint */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="py-1.5 px-1 text-center"
                  >
                    <span 
                      className="font-system text-[8px]"
                      style={{ color: 'rgba(0,0,0,0.12)' }}
                    >
                      ———
                    </span>
                  </div>
                ))}
              </motion.div>
              
              {/* Fade to more names hint */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#2d2d2d] to-transparent pointer-events-none" />
            </div>
            
            {/* Bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
          
          {/* Base/pedestal */}
          <div 
            className="h-2 mx-3"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
            }}
          />
        </motion.div>

        {/* Counter */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <p className="font-system text-7xl md:text-8xl lg:text-9xl font-extralight tracking-wider text-concrete/10 leading-none">
              {displayCount}
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-system text-6xl md:text-7xl lg:text-8xl font-extralight tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-concrete/15 to-concrete/5 leading-none">
                {displayCount}
              </p>
            </div>
          </div>
          <p className="font-system text-[9px] tracking-[0.5em] text-concrete/35 uppercase mt-4">
            Sovereigns Sworn
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 1, ease: "easeOut" }}
        >
          <Link href="/oath">
            <Button variant={mode === "dominus" ? "blood" : "primary"} size="lg">
              View The Wall
            </Button>
          </Link>
          <p className="font-scripture text-sm text-concrete/30 mt-4 italic">
            Add your name to the monument
          </p>
        </motion.div>
      </div>
    </section>
  );
}
