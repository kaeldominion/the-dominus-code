"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield } from "lucide-react";

// Mock signatures - in production this would come from a database
const mockSignatures = [
  { name: "MARCUS_V", date: "2024-01-15", tier: "founder" },
  { name: "SOVEREIGN_ONE", date: "2024-01-14", tier: "founder" },
  { name: "DYNASTY_BUILDER", date: "2024-01-13", tier: "founder" },
  { name: "THE_ARCHITECT", date: "2024-01-12", tier: "founder" },
  { name: "IRON_WILL", date: "2024-01-11", tier: "founder" },
  { name: "LEGACY_MAKER", date: "2024-01-10", tier: "elite" },
  { name: "PROTOCOL_X", date: "2024-01-09", tier: "elite" },
  { name: "DOMINUS_PRIME", date: "2024-01-08", tier: "elite" },
  { name: "BLOOD_OATH", date: "2024-01-07", tier: "elite" },
  { name: "THE_COMMANDER", date: "2024-01-06", tier: "elite" },
  { name: "APEX_RULER", date: "2024-01-05", tier: "sworn" },
  { name: "STONE_HEART", date: "2024-01-04", tier: "sworn" },
  { name: "EMPIRE_KING", date: "2024-01-03", tier: "sworn" },
  { name: "SHADOW_LORD", date: "2024-01-02", tier: "sworn" },
  { name: "TITAN_FORGE", date: "2024-01-01", tier: "sworn" },
  { name: "CROWN_BEARER", date: "2023-12-31", tier: "sworn" },
  { name: "OATH_KEEPER", date: "2023-12-30", tier: "sworn" },
  { name: "DYNASTY_HEIR", date: "2023-12-29", tier: "sworn" },
  { name: "IRON_THRONE", date: "2023-12-28", tier: "sworn" },
  { name: "SOVEREIGN_MIND", date: "2023-12-27", tier: "sworn" },
  { name: "BLOOD_LINE", date: "2023-12-26", tier: "sworn" },
  { name: "THE_PATRIARCH", date: "2023-12-25", tier: "sworn" },
  { name: "SILENT_KING", date: "2023-12-24", tier: "sworn" },
  { name: "PROTOCOL_ALPHA", date: "2023-12-23", tier: "sworn" },
  { name: "DYNASTY_FORGE", date: "2023-12-22", tier: "sworn" },
  { name: "VANGUARD_ONE", date: "2023-12-21", tier: "sworn" },
  { name: "STEEL_RESOLVE", date: "2023-12-20", tier: "sworn" },
  { name: "THE_SENTINEL", date: "2023-12-19", tier: "sworn" },
  { name: "EMPIRE_BORN", date: "2023-12-18", tier: "sworn" },
  { name: "OATH_BOUND", date: "2023-12-17", tier: "sworn" },
  { name: "CROWN_FORGED", date: "2023-12-16", tier: "sworn" },
  { name: "DYNASTY_RISE", date: "2023-12-15", tier: "sworn" },
  { name: "BLOOD_SWORN", date: "2023-12-14", tier: "sworn" },
  { name: "THE_DOMINUS", date: "2023-12-13", tier: "sworn" },
  { name: "IRON_LEGACY", date: "2023-12-12", tier: "sworn" },
  { name: "SOVEREIGN_BORN", date: "2023-12-11", tier: "sworn" },
  { name: "PROTOCOL_PRIME", date: "2023-12-10", tier: "sworn" },
  { name: "EMPIRE_HEIR", date: "2023-12-09", tier: "sworn" },
  { name: "STONE_SOVEREIGN", date: "2023-12-08", tier: "sworn" },
  { name: "DYNASTY_BLOOD", date: "2023-12-07", tier: "sworn" },
];

const oathText = `I, the undersigned, do hereby swear:

To kill the boy within me—the one who seeks approval, who negotiates with his own word, who lives by another's script.

To build my house with intention—my body, my mind, my wealth, my bloodline.

To hold the frame when chaos comes—to be the rock upon which my dynasty is built.

To strengthen the bloodline. To protect the name.

This oath is binding. There is no going back.

THE BOY MUST DIE.`;

export default function OathPage() {
  const { mode } = useApp();
  const [phase, setPhase] = useState<"view" | "sign" | "complete">("view");
  const [bookCode, setBookCode] = useState("");
  const [handle, setHandle] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [visibleNames, setVisibleNames] = useState(0);

  // Staggered reveal of names
  useEffect(() => {
    if (phase === "view") {
      const timer = setInterval(() => {
        setVisibleNames((prev) => {
          if (prev >= mockSignatures.length) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 60);
      return () => clearInterval(timer);
    }
  }, [phase]);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase("complete");
  };

  // Stone texture SVG - creates a realistic concrete/granite look
  const stoneTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

  return (
    <main className="min-h-screen bg-void">
      <Header />

      {/* Hero - Monolith Introduction */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-sovereign/40" />
              <Crown
                size={56}
                variant={mode === "dominus" ? "blood" : "gold"}
                animate
              />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-sovereign/40" />
            </div>
            
            <p className="font-system text-[10px] tracking-[0.5em] text-concrete/40 uppercase mb-6">
              The Monument
            </p>
            
            <h1 className="font-law text-4xl md:text-6xl lg:text-7xl tracking-[0.15em] text-empire mb-8">
              THE OATH WALL
            </h1>
            
            <p className="font-scripture text-xl md:text-2xl text-empire/50 max-w-2xl mx-auto italic leading-relaxed">
              A monolith of names. Each one etched in stone. 
              <br />
              <span className="text-sovereign/70">Strengthen the bloodline. Protect the name.</span>
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {phase === "view" && (
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* The Monolith */}
            <section className="py-8 relative">
              <div className="max-w-6xl mx-auto px-4 md:px-6">
                
                {/* Monolith Container */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1.4, ease: "easeOut" }}
                >
                  {/* Dramatic shadow beneath */}
                  <div className="absolute -inset-4 bg-black/50 blur-2xl -z-10" />
                  
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
                    
                    {/* Secondary grain for depth */}
                    <div 
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
                      }}
                    />
                    
                    {/* Top bevel/edge highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/15 to-transparent" />
                    <div className="absolute top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    {/* Side shadows for 3D depth */}
                    <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
                    
                    {/* Header inscription - carved into stone */}
                    <div className="relative py-8 px-6 border-b border-black/30">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
                      <p 
                        className="font-law text-sm md:text-base tracking-[0.4em] text-center relative z-10"
                        style={{
                          color: '#1a1a1a',
                          textShadow: '1px 1px 0 rgba(255,255,255,0.1), -1px -1px 0 rgba(0,0,0,0.3)',
                        }}
                      >
                        THOSE WHO HAVE SWORN
                      </p>
                      <p 
                        className="font-scripture text-sm text-center mt-2 italic relative z-10"
                        style={{
                          color: '#2a2a2a',
                          textShadow: '1px 1px 0 rgba(255,255,255,0.08)',
                        }}
                      >
                        &ldquo;The boy must die, so the man may live&rdquo;
                      </p>
                    </div>
                    
                    {/* Names Grid - The Etched Wall */}
                    <div className="relative p-6 md:p-10 lg:p-12">
                      
                      {/* Founder Section */}
                      <div className="mb-10 relative">
                        <p 
                          className="font-system text-[10px] tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
                          style={{ color: '#8a0303' }}
                        >
                          <span className="h-px flex-1 bg-[#8a0303]/40" />
                          <span style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.1)' }}>FOUNDERS</span>
                          <span className="h-px flex-1 bg-[#8a0303]/40" />
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {mockSignatures
                            .filter((s) => s.tier === "founder")
                            .map((sig, index) => (
                              <motion.div
                                key={sig.name}
                                className="group relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index < visibleNames ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <div 
                                  className="text-center py-3 px-2 relative cursor-default transition-all duration-300"
                                  style={{
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)',
                                  }}
                                >
                                  <span 
                                    className="font-system text-xs md:text-sm tracking-[0.15em] font-medium transition-all duration-300 group-hover:tracking-[0.2em]"
                                    style={{
                                      color: '#6a0202',
                                      textShadow: '1px 1px 0 rgba(255,255,255,0.15), -1px -1px 0 rgba(0,0,0,0.4)',
                                    }}
                                  >
                                    {sig.name}
                                  </span>
                                </div>
                                
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-void border border-blood/40 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 shadow-2xl">
                                  <p className="font-law text-[10px] tracking-[0.2em] text-blood mb-1">FOUNDER</p>
                                  <p className="font-system text-[11px] tracking-wider text-concrete/70">
                                    Sworn: {new Date(sig.date).toLocaleDateString()}
                                  </p>
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blood/40" />
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                      
                      {/* Elite Section */}
                      <div className="mb-10 relative">
                        <p 
                          className="font-system text-[10px] tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
                          style={{ color: '#b8962e' }}
                        >
                          <span className="h-px flex-1 bg-[#b8962e]/40" />
                          <span style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.1)' }}>ELITE GUARD</span>
                          <span className="h-px flex-1 bg-[#b8962e]/40" />
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                          {mockSignatures
                            .filter((s) => s.tier === "elite")
                            .map((sig, index) => (
                              <motion.div
                                key={sig.name}
                                className="group relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index + 5 < visibleNames ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <div 
                                  className="text-center py-3 px-2 relative cursor-default transition-all duration-300"
                                  style={{
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 100%)',
                                  }}
                                >
                                  <span 
                                    className="font-system text-xs md:text-sm tracking-[0.15em] font-medium transition-all duration-300 group-hover:tracking-[0.2em]"
                                    style={{
                                      color: '#8a7020',
                                      textShadow: '1px 1px 0 rgba(255,255,255,0.15), -1px -1px 0 rgba(0,0,0,0.4)',
                                    }}
                                  >
                                    {sig.name}
                                  </span>
                                </div>
                                
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-void border border-sovereign/40 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 shadow-2xl">
                                  <p className="font-law text-[10px] tracking-[0.2em] text-sovereign mb-1">ELITE GUARD</p>
                                  <p className="font-system text-[11px] tracking-wider text-concrete/70">
                                    Sworn: {new Date(sig.date).toLocaleDateString()}
                                  </p>
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-sovereign/40" />
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                      
                      {/* Sworn Section - Main body of names */}
                      <div className="relative">
                        <p 
                          className="font-system text-[10px] tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
                          style={{ color: '#666' }}
                        >
                          <span className="h-px flex-1 bg-black/25" />
                          <span style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.15)' }}>THE SWORN</span>
                          <span className="h-px flex-1 bg-black/25" />
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                          {mockSignatures
                            .filter((s) => s.tier === "sworn")
                            .map((sig, index) => (
                              <motion.div
                                key={sig.name}
                                className="group relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index + 10 < visibleNames ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <div 
                                  className="text-center py-2.5 px-1 relative cursor-default transition-all duration-300"
                                  style={{
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.03) 100%)',
                                  }}
                                >
                                  <span 
                                    className="font-system text-[10px] md:text-xs tracking-[0.12em] font-medium transition-all duration-300 group-hover:tracking-[0.15em]"
                                    style={{
                                      color: '#151515',
                                      textShadow: '1px 1px 0 rgba(255,255,255,0.2), 0 0 1px rgba(255,255,255,0.1)',
                                    }}
                                  >
                                    {sig.name}
                                  </span>
                                </div>
                                
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-void border border-concrete/30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 shadow-xl">
                                  <p className="font-system text-[11px] tracking-wider text-concrete/70">
                                    Sworn: {new Date(sig.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                            
                          {/* Empty slots - waiting to be filled */}
                          {Array.from({ length: 18 }).map((_, index) => (
                            <div
                              key={`empty-${index}`}
                              className="py-2.5 px-1 text-center"
                              style={{
                                background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 100%)',
                              }}
                            >
                              <span 
                                className="font-system text-[10px]"
                                style={{ color: 'rgba(0,0,0,0.2)' }}
                              >
                                ———
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom inscription */}
                    <div className="relative py-6 px-6 border-t border-black/20 text-center">
                      <p 
                        className="font-scripture text-sm italic"
                        style={{
                          color: '#2a2a2a',
                          textShadow: '1px 1px 0 rgba(255,255,255,0.08)',
                        }}
                      >
                        &ldquo;Strengthen the bloodline. Protect the name.&rdquo;
                      </p>
                    </div>
                    
                    {/* Bottom edge shadow */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  
                  {/* Base/pedestal effect */}
                  <div 
                    className="h-3 mx-4"
                    style={{
                      background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                    }}
                  />
                  <div 
                    className="h-2 mx-8"
                    style={{
                      background: 'linear-gradient(180deg, #0f0f0f 0%, #050505 100%)',
                    }}
                  />
                </motion.div>

                {/* Counter - Massive Display */}
                <motion.div
                  className="text-center mt-20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  <div className="relative inline-block">
                    <p className="font-system text-8xl md:text-9xl lg:text-[11rem] font-extralight tracking-wider text-concrete/10 leading-none">
                      {mockSignatures.length}
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-system text-7xl md:text-8xl lg:text-[9rem] font-extralight tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-concrete/20 to-concrete/8 leading-none">
                        {mockSignatures.length}
                      </p>
                    </div>
                  </div>
                  <p className="font-system text-[10px] tracking-[0.5em] text-concrete/40 uppercase mt-4">
                    Sovereigns Sworn
                  </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                  className="text-center mt-16 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <Button
                    variant={mode === "dominus" ? "blood" : "primary"}
                    size="lg"
                    onClick={() => setPhase("sign")}
                  >
                    Take The Oath
                  </Button>
                  <p className="font-body text-sm text-concrete/40 mt-6">
                    Requires a valid book code from The Dominus Code
                  </p>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {phase === "sign" && (
          <motion.div
            key="sign"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            <section className="py-12">
              <div className="max-w-2xl mx-auto px-6">
                {/* The Oath */}
                <div 
                  className="relative overflow-hidden p-8 md:p-12 mb-12"
                  style={{
                    background: 'linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 50%, #252525 100%)',
                  }}
                >
                  {/* Stone texture */}
                  <div 
                    className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: stoneTexture }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <Shield
                        className={`w-6 h-6 ${
                          mode === "dominus" ? "text-[#8a0303]" : "text-[#b8962e]"
                        }`}
                        style={{ filter: 'drop-shadow(1px 1px 0 rgba(255,255,255,0.1))' }}
                      />
                      <h2 
                        className="font-law text-lg md:text-xl tracking-[0.2em]"
                        style={{
                          color: '#1a1a1a',
                          textShadow: '1px 1px 0 rgba(255,255,255,0.1)',
                        }}
                      >
                        THE OATH OF THE DOMINUS
                      </h2>
                    </div>
                    <div 
                      className="font-scripture whitespace-pre-line leading-relaxed text-center text-lg"
                      style={{
                        color: '#1f1f1f',
                        textShadow: '1px 1px 0 rgba(255,255,255,0.08)',
                      }}
                    >
                      {oathText}
                    </div>
                  </div>
                </div>

                {/* Sign Form */}
                <form onSubmit={handleSign} className="space-y-6">
                  <div>
                    <label className="block font-law text-xs tracking-[0.2em] text-sovereign mb-3">
                      BOOK CODE
                    </label>
                    <input
                      type="text"
                      value={bookCode}
                      onChange={(e) => setBookCode(e.target.value.toUpperCase())}
                      placeholder="Enter code from your book"
                      required
                      className="input-brutal"
                    />
                    <p className="font-body text-xs text-concrete/40 mt-2">
                      Found on the last page of The Dominus Code
                    </p>
                  </div>

                  <div>
                    <label className="block font-law text-xs tracking-[0.2em] text-sovereign mb-3">
                      YOUR HANDLE
                    </label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) =>
                        setHandle(e.target.value.toUpperCase().replace(/\s/g, "_"))
                      }
                      placeholder="SOVEREIGN_NAME"
                      required
                      maxLength={20}
                      className="input-brutal"
                    />
                    <p className="font-body text-xs text-concrete/40 mt-2">
                      This will be etched on the wall forever
                    </p>
                  </div>

                  <div className="flex items-start gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className={`w-6 h-6 flex-shrink-0 border ${
                        agreed
                          ? mode === "dominus"
                            ? "bg-blood border-blood"
                            : "bg-sovereign border-sovereign"
                          : "border-concrete/30"
                      } flex items-center justify-center transition-colors duration-300`}
                    >
                      {agreed && <Check className="w-4 h-4 text-void" />}
                    </button>
                    <p className="font-body text-sm text-empire/60">
                      I understand this oath is binding. I am ready to kill the
                      boy and build my dynasty.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setPhase("view")}
                    >
                      Go Back
                    </Button>
                    <Button
                      type="submit"
                      variant={mode === "dominus" ? "blood" : "primary"}
                      disabled={!agreed || !bookCode || !handle}
                      className="flex-1"
                    >
                      Swear The Oath
                    </Button>
                  </div>
                </form>
              </div>
            </section>
          </motion.div>
        )}

        {phase === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <section className="py-20">
              <div className="max-w-2xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                  <Crown
                    size={100}
                    variant={mode === "dominus" ? "blood" : "gold"}
                    className="mx-auto mb-10"
                    animate
                  />
                </motion.div>

                <motion.h2 
                  className="font-law text-3xl md:text-5xl tracking-[0.15em] text-empire mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  THE OATH IS SWORN
                </motion.h2>

                <motion.div 
                  className="relative overflow-hidden p-8 mb-10"
                  style={{
                    background: 'linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 50%, #252525 100%)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <div 
                    className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: stoneTexture }}
                  />
                  <p 
                    className="font-law text-2xl md:text-3xl tracking-[0.25em] relative z-10 mb-2"
                    style={{
                      color: mode === "dominus" ? '#6a0202' : '#8a7020',
                      textShadow: '1px 1px 0 rgba(255,255,255,0.15), -1px -1px 0 rgba(0,0,0,0.4)',
                    }}
                  >
                    {handle}
                  </p>
                  <p 
                    className="font-scripture relative z-10 italic"
                    style={{
                      color: '#2a2a2a',
                      textShadow: '1px 1px 0 rgba(255,255,255,0.08)',
                    }}
                  >
                    Your name is now etched on the wall
                  </p>
                </motion.div>

                <motion.p 
                  className="font-scripture text-xl text-empire/60 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  The boy is dead. The Dominus rises.
                </motion.p>

                <motion.blockquote 
                  className="font-scripture text-xl italic text-sovereign/50 mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  &ldquo;Strengthen the bloodline. Protect the name.&rdquo;
                </motion.blockquote>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <Button
                    variant={mode === "dominus" ? "blood" : "primary"}
                    onClick={() => setPhase("view")}
                  >
                    View The Wall
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => (window.location.href = "/council")}
                  >
                    Join The Council
                  </Button>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
