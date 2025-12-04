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
    // In production, this would verify the book code and add to database
    setPhase("complete");
  };

  return (
    <main className="min-h-screen bg-void">
      <Header />

      {/* Hero - Monolith Introduction */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        {/* Atmospheric gradient */}
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
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Monolith Container */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1.4, ease: "easeOut" }}
                >
                  {/* Stone texture effect */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='stone'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23stone)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  
                  {/* Vertical light beam effect */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-sovereign/30 via-sovereign/10 to-transparent pointer-events-none" />
                  
                  {/* Top edge lighting */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-concrete/30 to-transparent" />
                  
                  {/* Main monolith body */}
                  <div className="relative bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#050505] border border-concrete/10 shadow-2xl">
                    
                    {/* Header inscription */}
                    <div className="relative py-10 px-6 border-b border-concrete/10 text-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-sovereign/5 to-transparent pointer-events-none" />
                      <p className="font-law text-xs md:text-sm tracking-[0.4em] text-sovereign/60 relative z-10">
                        THOSE WHO HAVE SWORN
                      </p>
                      <p className="font-scripture text-sm text-concrete/30 mt-2 italic relative z-10">
                        &ldquo;The boy must die, so the man may live&rdquo;
                      </p>
                    </div>
                    
                    {/* Names Grid - The Etched Wall */}
                    <div className="relative p-6 md:p-10 lg:p-14 min-h-[500px]">
                      
                      {/* Subtle vignette */}
                      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none z-10" />
                      
                      {/* Founder Section */}
                      <div className="mb-12 relative">
                        <p className="font-system text-[9px] tracking-[0.4em] text-blood/50 uppercase mb-4 flex items-center gap-3">
                          <span className="h-px flex-1 bg-blood/20" />
                          <span>Founders</span>
                          <span className="h-px flex-1 bg-blood/20" />
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
                          {mockSignatures
                            .filter((s) => s.tier === "founder")
                            .map((sig, index) => (
                              <motion.div
                                key={sig.name}
                                className="group relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index < visibleNames ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="etched-name etched-name-founder text-center py-3 px-2 relative overflow-hidden">
                                  {/* Etched effect layers */}
                                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blood/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                  <span className="relative z-10 font-system text-[10px] md:text-xs tracking-[0.2em] text-blood/70 group-hover:text-blood transition-colors duration-500">
                                    {sig.name}
                                  </span>
                                </div>
                                
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-void/95 border border-blood/30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 shadow-xl">
                                  <p className="font-law text-[9px] tracking-[0.2em] text-blood mb-1">FOUNDER</p>
                                  <p className="font-system text-[10px] tracking-wider text-concrete/60">
                                    Sworn: {new Date(sig.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                      
                      {/* Elite Section */}
                      <div className="mb-12 relative">
                        <p className="font-system text-[9px] tracking-[0.4em] text-sovereign/50 uppercase mb-4 flex items-center gap-3">
                          <span className="h-px flex-1 bg-sovereign/20" />
                          <span>Elite Guard</span>
                          <span className="h-px flex-1 bg-sovereign/20" />
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
                          {mockSignatures
                            .filter((s) => s.tier === "elite")
                            .map((sig, index) => (
                              <motion.div
                                key={sig.name}
                                className="group relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index + 5 < visibleNames ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="etched-name etched-name-elite text-center py-3 px-2 relative overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sovereign/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                  <span className="relative z-10 font-system text-[10px] md:text-xs tracking-[0.2em] text-sovereign/60 group-hover:text-sovereign transition-colors duration-500">
                                    {sig.name}
                                  </span>
                                </div>
                                
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-void/95 border border-sovereign/30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 shadow-xl">
                                  <p className="font-law text-[9px] tracking-[0.2em] text-sovereign mb-1">ELITE GUARD</p>
                                  <p className="font-system text-[10px] tracking-wider text-concrete/60">
                                    Sworn: {new Date(sig.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                      
                      {/* Sworn Section - Main body of names */}
                      <div className="relative">
                        <p className="font-system text-[9px] tracking-[0.4em] text-concrete/40 uppercase mb-4 flex items-center gap-3">
                          <span className="h-px flex-1 bg-concrete/10" />
                          <span>The Sworn</span>
                          <span className="h-px flex-1 bg-concrete/10" />
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-px bg-concrete/5">
                          {mockSignatures
                            .filter((s) => s.tier === "sworn")
                            .map((sig, index) => (
                              <motion.div
                                key={sig.name}
                                className="group relative bg-void"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index + 10 < visibleNames ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="etched-name text-center py-2.5 px-1 relative">
                                  <span className="font-system text-[8px] md:text-[9px] tracking-[0.15em] text-concrete/30 group-hover:text-concrete/60 transition-colors duration-500">
                                    {sig.name}
                                  </span>
                                </div>
                                
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-void/95 border border-concrete/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30">
                                  <p className="font-system text-[10px] tracking-wider text-concrete/60">
                                    Sworn: {new Date(sig.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                            
                          {/* Empty slots - waiting to be filled */}
                          {Array.from({ length: 24 }).map((_, index) => (
                            <div
                              key={`empty-${index}`}
                              className="bg-void py-2.5 px-1 text-center"
                            >
                              <span className="font-system text-[8px] text-concrete/10">—</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom inscription */}
                    <div className="relative py-8 px-6 border-t border-concrete/10 text-center">
                      <p className="font-scripture text-sm text-concrete/20 italic">
                        &ldquo;Strengthen the bloodline. Protect the name.&rdquo;
                      </p>
                    </div>
                  </div>
                  
                  {/* Bottom shadow/base effect */}
                  <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-void/50 to-transparent blur-md" />
                </motion.div>

                {/* Counter - Massive Display */}
                <motion.div
                  className="text-center mt-20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  <div className="relative inline-block">
                    <p className="font-system text-8xl md:text-9xl lg:text-[12rem] font-extralight tracking-wider text-concrete/8 leading-none">
                      {mockSignatures.length}
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-system text-7xl md:text-8xl lg:text-[10rem] font-extralight tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-concrete/15 to-concrete/5 leading-none">
                        {mockSignatures.length}
                      </p>
                    </div>
                  </div>
                  <p className="font-system text-[10px] tracking-[0.5em] text-concrete/30 uppercase mt-4">
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
                <div className="relative bg-gradient-to-b from-[#0a0a0a] to-void border border-concrete/15 p-8 md:p-12 mb-12">
                  {/* Stone texture */}
                  <div 
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='stone'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23stone)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <Shield
                        className={`w-6 h-6 ${
                          mode === "dominus" ? "text-blood" : "text-sovereign"
                        }`}
                      />
                      <h2 className="font-law text-lg md:text-xl tracking-[0.2em] text-empire">
                        THE OATH OF THE DOMINUS
                      </h2>
                    </div>
                    <div className="font-scripture text-empire/80 whitespace-pre-line leading-relaxed text-center text-lg">
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
                  className="relative bg-gradient-to-b from-[#0a0a0a] to-void border border-sovereign/30 p-8 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <div 
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='stone'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23stone)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <p className="font-law text-2xl md:text-3xl tracking-[0.25em] text-sovereign relative z-10 mb-2">
                    {handle}
                  </p>
                  <p className="font-scripture text-empire/40 relative z-10 italic">
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
