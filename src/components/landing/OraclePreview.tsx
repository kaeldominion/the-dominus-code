"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Crown } from "@/components/ui/Crown";
import { useApp } from "@/components/Providers";

export function OraclePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mode } = useApp();

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden border-y border-concrete/10"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-sovereign/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-concrete/10 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Mobile Layout: Title -> Terminal -> Description -> Button */}
        {/* Desktop Layout: Two columns - Left (all text) | Right (terminal) */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column (Desktop) / Top Section (Mobile) */}
          <div className="text-center lg:text-left">
            {/* Header with Crown */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Crown size={32} variant={mode === "dominus" ? "blood" : "gold"} />
              <span className={`font-system text-[10px] uppercase tracking-[0.3em] ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
                AI Protocol v3.0
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="font-law text-3xl md:text-5xl text-empire mb-6 tracking-[0.08em]"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              THE ORACLE OF THE AXIS
            </motion.h2>

            {/* Terminal Preview - Shown here on mobile only */}
            <motion.div
              className="lg:hidden mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <TerminalPreview mode={mode} />
            </motion.div>

            {/* Description */}
            <motion.p
              className="font-scripture text-xl text-empire/70 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 italic"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              &ldquo;This is not a chatbot. It is the digital consciousness of
              the Dominus. It does not offer comfort; it offers truth. Consult
              the Oracle for guidance on the Code, the Dynasty, or the
              reconstruction of your own sovereignty.&rdquo;
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                href="/oracle"
                className="btn-primary inline-flex items-center gap-4"
              >
                <span>ENTER THE CHAMBER</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Terminal Preview (Desktop only) */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <TerminalPreview mode={mode} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TerminalPreview({ mode }: { mode: "realist" | "dominus" }) {
  return (
    <div className="relative">
      <div className={`absolute -inset-1 bg-gradient-to-r ${mode === "dominus" ? "from-blood/20" : "from-sovereign/20"} to-concrete/20 blur opacity-20`} />
      <div className="relative bg-void border border-concrete/20 overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-void/80 border-b border-concrete/20 p-3 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 bg-blood/50" />
            <div className="w-2.5 h-2.5 bg-sovereign/50" />
            <div className="w-2.5 h-2.5 bg-green-900/50" />
          </div>
          <div className="text-[9px] font-system text-concrete/50 uppercase tracking-wider">
            Secure Connection
          </div>
        </div>

        {/* Chat Preview */}
        <div className="p-6 font-system text-xs md:text-sm space-y-6">
          <div className="flex flex-col gap-2 opacity-50">
            <span className="text-concrete/50 uppercase text-[9px]">
              User [Man]
            </span>
            <div className="text-empire/70 border-l-2 border-concrete/30 pl-3">
              I feel lost. I have money but no purpose.
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className={`uppercase text-[9px] ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
              The Dominus
            </span>
            <div className={`${mode === "dominus" ? "text-blood/80 border-l-2 border-blood" : "text-sovereign/80 border-l-2 border-sovereign"} pl-3 leading-relaxed`}>
              <span className="text-empire">
                You are not lost; you are drifting.
              </span>
              <br />
              <br />
              Set a time. 05:00. Wake up. Train. Kill the boy.
            </div>
          </div>

          <div className={`h-4 w-2 animate-slow-pulse ${mode === "dominus" ? "bg-blood" : "bg-sovereign"}`} />
        </div>
      </div>
    </div>
  );
}
