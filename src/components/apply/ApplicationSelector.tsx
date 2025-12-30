"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useApp } from "@/components/Providers";

export function ApplicationSelector() {
  const { mode } = useApp();
  return (
    <div className="w-full max-w-6xl mx-auto py-16 md:py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-center font-system text-xs text-concrete/40 uppercase tracking-[0.4em] mb-12 md:mb-16">
          Select Your Application Protocol
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Men - Council */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          <Link
            href="/apply/council"
            className="group relative h-auto min-h-[450px] md:h-[500px] border border-concrete/20 bg-void/40 hover:bg-void transition-colors p-8 flex flex-col items-center text-center overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(42,42,42,0.5)] w-full block"
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--concrete)_1px,_transparent_1px)] bg-[length:20px_20px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void/90" />

            <div className="relative z-10 flex flex-col h-full items-center justify-between">
              <div>
                <div className={`mt-6 md:mt-8 mb-6 p-4 border border-concrete/30 bg-void transition-colors inline-block ${mode === "dominus" ? "group-hover:border-blood group-hover:text-blood" : "group-hover:border-sovereign group-hover:text-sovereign"}`}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
                <span className={`block font-law text-4xl md:text-5xl text-empire transition-colors mb-2 tracking-wide ${mode === "dominus" ? "group-hover:text-blood" : "group-hover:text-sovereign"}`}>
                  The Council
                </span>
                <span className="block font-system text-[10px] text-concrete/60 uppercase tracking-widest mb-8">
                  For Men Seeking Power
                </span>
                <p className="font-scripture text-concrete/70 text-lg leading-relaxed max-w-sm mx-auto italic">
                  A brotherhood of builders. Access to the inner circle is
                  earned, not bought. Verify your revenue. Prove your mission.
                  Kill the boy.
                </p>
              </div>

              <div className={`mt-8 px-8 py-3 border border-concrete/30 text-empire uppercase tracking-[0.2em] text-xs transition-all font-bold w-full md:w-auto ${mode === "dominus" ? "group-hover:bg-blood group-hover:text-void group-hover:border-blood" : "group-hover:bg-sovereign group-hover:text-void group-hover:border-sovereign"}`}>
                BEGIN APPLICATION
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Women - Dynasty */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Link
            href="/apply/dynasty"
            className="group relative h-auto min-h-[450px] md:h-[500px] border border-concrete/20 bg-void/40 hover:bg-void transition-colors p-8 flex flex-col items-center text-center overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(229,195,114,0.2)] w-full block"
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--sovereign)_1px,_transparent_1px)] bg-[length:20px_20px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void/90" />

            <div className="relative z-10 flex flex-col h-full items-center justify-between">
              <div>
                <div className={`mt-6 md:mt-8 mb-6 p-4 border border-concrete/30 bg-void transition-colors inline-block ${mode === "dominus" ? "group-hover:border-blood group-hover:text-blood" : "group-hover:border-sovereign group-hover:text-sovereign"}`}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                <span className={`block font-law text-4xl md:text-5xl text-empire transition-colors mb-2 tracking-wide ${mode === "dominus" ? "group-hover:text-blood" : "group-hover:text-sovereign"}`}>
                  The Dynasty
                </span>
                <span className="block font-system text-[10px] text-concrete/60 uppercase tracking-widest mb-8">
                  For Women Seeking Order
                </span>

                <p className="font-scripture text-concrete/70 text-lg leading-relaxed max-w-sm mx-auto italic">
                  Legacy. Order. Purpose. Join the Phalanx. Submit your
                  application for consideration in the Dominus Dynasty.
                </p>
              </div>

              <div className={`mt-8 px-8 py-3 border border-concrete/30 text-empire uppercase tracking-[0.2em] text-xs transition-all font-bold w-full md:w-auto ${mode === "dominus" ? "group-hover:bg-blood group-hover:text-void group-hover:border-blood" : "group-hover:bg-sovereign group-hover:text-void group-hover:border-sovereign"}`}>
                BEGIN APPLICATION
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

