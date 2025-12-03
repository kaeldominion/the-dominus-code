"use client";

import { useState } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield } from "lucide-react";

// Mock signatures - in production this would come from a database
const mockSignatures = [
  { name: "MARCUS_V", date: "2024-01-15" },
  { name: "SOVEREIGN_ONE", date: "2024-01-14" },
  { name: "DYNASTY_BUILDER", date: "2024-01-13" },
  { name: "THE_ARCHITECT", date: "2024-01-12" },
  { name: "IRON_WILL", date: "2024-01-11" },
  { name: "LEGACY_MAKER", date: "2024-01-10" },
  { name: "PROTOCOL_X", date: "2024-01-09" },
  { name: "DOMINUS_PRIME", date: "2024-01-08" },
  { name: "BLOOD_OATH", date: "2024-01-07" },
  { name: "THE_COMMANDER", date: "2024-01-06" },
  { name: "APEX_RULER", date: "2024-01-05" },
  { name: "STONE_HEART", date: "2024-01-04" },
  { name: "EMPIRE_KING", date: "2024-01-03" },
  { name: "SHADOW_LORD", date: "2024-01-02" },
  { name: "TITAN_FORGE", date: "2024-01-01" },
  { name: "CROWN_BEARER", date: "2023-12-31" },
  { name: "OATH_KEEPER", date: "2023-12-30" },
  { name: "DYNASTY_HEIR", date: "2023-12-29" },
  { name: "IRON_THRONE", date: "2023-12-28" },
  { name: "SOVEREIGN_MIND", date: "2023-12-27" },
  { name: "BLOOD_LINE", date: "2023-12-26" },
  { name: "THE_PATRIARCH", date: "2023-12-25" },
  { name: "SILENT_KING", date: "2023-12-24" },
  { name: "PROTOCOL_ALPHA", date: "2023-12-23" },
  { name: "DYNASTY_FORGE", date: "2023-12-22" },
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

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would verify the book code and add to database
    setPhase("complete");
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="crown-divider mb-8">
              <Crown
                size={48}
                className={mode === "dominus" ? "text-blood" : "text-gold"}
              />
            </div>
            <h1 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-ivory mb-6">
              THE OATH WALL
            </h1>
            <p className="font-body text-xl text-ivory/60 max-w-2xl mx-auto">
              Strengthen the bloodline. Protect the name.
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
          >
            {/* The Wall */}
            <section className="py-12">
              <div className="max-w-6xl mx-auto px-6">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {/* Concrete texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-transparent to-obsidian/50 pointer-events-none z-10" />

                  <div className="p-8 bg-obsidian/80 border border-gold/20">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {mockSignatures.map((sig, index) => (
                        <motion.div
                          key={sig.name}
                          className="oath-signature text-center group relative"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.02 * index, duration: 0.3 }}
                        >
                          {sig.name}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-obsidian border border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                            <p className="font-display text-[10px] tracking-wider text-ivory">
                              Sworn: {new Date(sig.date).toLocaleDateString()}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Counter */}
                <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <p className="font-impact text-6xl md:text-8xl text-gold/20 mb-2">
                    {mockSignatures.length}
                  </p>
                  <p className="font-display text-sm tracking-[0.3em] text-ivory/40 uppercase">
                    Sovereigns Sworn
                  </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <Button
                    variant={mode === "dominus" ? "blood" : "primary"}
                    size="lg"
                    onClick={() => setPhase("sign")}
                  >
                    Take The Oath
                  </Button>
                  <p className="font-body text-sm text-ivory/40 mt-4">
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
                <div className="glass p-8 md:p-12 mb-12">
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <Shield
                      className={`w-6 h-6 ${
                        mode === "dominus" ? "text-blood" : "text-gold"
                      }`}
                    />
                    <h2 className="font-display text-xl tracking-[0.2em] text-ivory">
                      THE OATH OF THE DOMINUS
                    </h2>
                  </div>
                  <div className="font-body text-ivory/80 whitespace-pre-line leading-relaxed text-center">
                    {oathText}
                  </div>
                </div>

                {/* Sign Form */}
                <form onSubmit={handleSign} className="space-y-6">
                  <div>
                    <label className="block font-display text-xs tracking-[0.2em] text-gold mb-2">
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
                    <p className="font-body text-xs text-ivory/40 mt-2">
                      Found on the last page of The Dominus Code
                    </p>
                  </div>

                  <div>
                    <label className="block font-display text-xs tracking-[0.2em] text-gold mb-2">
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
                    <p className="font-body text-xs text-ivory/40 mt-2">
                      This will be etched on the wall forever
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className={`w-6 h-6 flex-shrink-0 border ${
                        agreed
                          ? mode === "dominus"
                            ? "bg-blood border-blood"
                            : "bg-gold border-gold"
                          : "border-gold/50"
                      } flex items-center justify-center transition-colors`}
                    >
                      {agreed && <Check className="w-4 h-4 text-obsidian" />}
                    </button>
                    <p className="font-body text-sm text-ivory/60">
                      I understand this oath is binding. I am ready to kill the
                      boy and build my dynasty.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <section className="py-20">
              <div className="max-w-2xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Crown
                    size={80}
                    className={`mx-auto mb-8 ${
                      mode === "dominus" ? "text-blood" : "text-gold"
                    } animate-pulse-glow`}
                  />
                </motion.div>

                <h2 className="font-display text-3xl md:text-4xl tracking-[0.1em] text-ivory mb-6">
                  THE OATH IS SWORN
                </h2>

                <div className="glass p-8 mb-8">
                  <p className="font-display text-2xl tracking-[0.2em] text-gold mb-2">
                    {handle}
                  </p>
                  <p className="font-body text-ivory/50">
                    Your name is now etched on the wall.
                  </p>
                </div>

                <p className="font-body text-lg text-ivory/70 mb-8">
                  The boy is dead. The Dominus rises.
                </p>

                <blockquote className="font-body text-xl italic text-ivory/60 mb-8">
                  &ldquo;Strengthen the bloodline. Protect the name.&rdquo;
                </blockquote>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

