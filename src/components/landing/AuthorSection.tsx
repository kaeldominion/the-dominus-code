"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Instagram, X, ChevronDown, ChevronUp } from "lucide-react";
import { useApp } from "@/components/Providers";

const shortBio = `Spencer Tarring is the author of The Dominus Code and the architect of a sovereign life. A former tech CEO who exited for millions in his twenties, he spent a decade in Shanghai's high-society nightlife before rejecting modern degeneracy to build a legacy of order. Today, he builds critical digital infrastructure, leads a multi-woman dynasty, and teaches men how to kill the "Boy" to build the "King." He is a Realist, a builder, and a Dominus.`;

const longBioSections = [
  {
    title: "THE RISE",
    content: `Spencer's education didn't happen in a university lecture hall. It began at eighteen, in a small room above a tyre shop in Reading. As the co-founder of Dedipower, he didn't follow a syllabus; he built a data infrastructure company from the ground up using 16-hour days and unrelenting drive.

He took a business born in grit and scaled it into a corporate powerhouse, achieving a multi-million pound exit that secured his financial freedom before most men had started their careers. He had the money. He had the status. But he hadn't yet learned the cost of ego.`
  },
  {
    title: "THE DECADENCE",
    content: `With capital in hand but no internal order, Spencer drifted into the high-voltage glamour of Shanghai. As the Music Director of M1NT, he became the face of the city's excess—driving a Rolls Royce Ghost, commanding crowds of thousands as a DJ, and living the life every young man thinks he wants: women, adrenaline, and applause.

On paper, he was a King. In reality, he was hollowing out. He was a man running on dopamine, performing success while his internal foundation slowly eroded. He learned that ungoverned pleasure is poison, and that potential without discipline is just a delayed collapse.`
  },
  {
    title: "THE DEATH OF THE BOY",
    content: `The shift arrived on December 31st, 2020. No party. No stage. Just silence and the brutal realization that the "dream" was empty.

In that silence, the Boy died. Spencer quit alcohol cold turkey and began the slow, violent work of reconstruction. He stripped away the persona and looked at the physics of what makes a man valuable: Strength. Order. Polarity. Legacy.

He stopped chasing "happiness"—the Utopian lie of the modern age—and started chasing effectiveness.`
  },
  {
    title: "THE ARCHITECT",
    content: `Today, Spencer operates as a Realist in a world of soft delusions. He is no longer just an investor; he is an Architect of critical systems.

The Business: He builds high-stakes Bitcoin and AI infrastructure across emerging markets, backed by private equity and hard assets. He understands that in the digital age, you are either the server or the serf.

The Dynasty: He lives openly as a Dominus, leading a non-monogamous household defined not by hedonism, but by strict hierarchy, devotion, and purpose.

The Philosophy: He identifies as a Sovereign Individual—a man who moves his mind, capital, and loyalty to where they are treated best, rejecting the dying model of the nation-state.`
  }
];

const socialLinks = [
  { 
    name: "Instagram", 
    href: "https://instagram.com/spencertarringx", 
    icon: Instagram,
    handle: "@spencertarringx"
  },
  { 
    name: "X / Twitter", 
    href: "https://x.com/spencertarring", 
    icon: X,
    handle: "@spencertarring"
  },
];

export function AuthorSection() {
  const [showFullBio, setShowFullBio] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mode } = useApp();

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void pointer-events-none" />
      
      {/* Architectural lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-concrete/15 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-concrete/15 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="font-system text-[10px] tracking-[0.5em] text-concrete/40 uppercase mb-6">
            The Architect
          </p>
          <h2 className="font-law text-3xl md:text-5xl tracking-[0.12em] text-empire mb-4">
            SPENCER TARRING
          </h2>
          <p className="font-scripture text-lg text-empire/40 italic">
            Author of The Dominus Code
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-16 items-start">
          {/* Profile Image */}
          <motion.div
            className="relative mx-auto md:mx-0"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative group">
              {/* Image container */}
              <div className="relative w-64 md:w-72 aspect-square overflow-hidden">
                {/* Border frame */}
                <div className="absolute inset-0 border border-concrete/20 z-10 pointer-events-none" />
                
                {/* Top accent line */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 z-20 transition-all duration-700 ${
                    mode === "dominus" ? "bg-blood" : "bg-sovereign"
                  }`}
                />
                
                {/* Image with grayscale effect */}
                <Image
                  src="/images/st-avatar-2021-v4.jpg"
                  alt="Spencer Tarring - Author of The Dominus Code"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 256px, 288px"
                />
                
                {/* Overlay that fades on hover */}
                <div className="absolute inset-0 bg-void/30 group-hover:bg-transparent transition-all duration-700" />
              </div>
              
              {/* Corner accents */}
              <div className={`absolute -bottom-2 -right-2 w-16 h-16 border-r border-b transition-colors duration-500 ${
                mode === "dominus" ? "border-blood/30" : "border-sovereign/30"
              }`} />
              <div className={`absolute -top-2 -left-2 w-16 h-16 border-l border-t transition-colors duration-500 ${
                mode === "dominus" ? "border-blood/30" : "border-sovereign/30"
              }`} />
            </div>

            {/* Social Links */}
            <div className="mt-8 flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group/link"
                >
                  <social.icon className={`w-4 h-4 transition-colors duration-300 ${
                    mode === "dominus" 
                      ? "text-concrete/40 group-hover/link:text-blood" 
                      : "text-concrete/40 group-hover/link:text-sovereign"
                  }`} />
                  <span className="font-system text-xs tracking-wider text-concrete/50 group-hover/link:text-empire transition-colors duration-300">
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            {/* Short Bio */}
            <div className="mb-8">
              <p className="font-scripture text-lg md:text-xl text-empire/70 leading-relaxed">
                {shortBio}
              </p>
            </div>

            {/* Read More Toggle */}
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className={`flex items-center gap-2 font-system text-xs tracking-[0.2em] uppercase transition-colors duration-300 mb-8 ${
                mode === "dominus" 
                  ? "text-blood hover:text-blood/80" 
                  : "text-sovereign hover:text-sovereign/80"
              }`}
            >
              {showFullBio ? (
                <>
                  <span>Read Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Read Full Story</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Full Bio - Expandable */}
            <AnimatePresence>
              {showFullBio && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-concrete/10 pt-8 space-y-10">
                    {/* Intro */}
                    <p className="font-scripture text-empire/60 italic text-lg">
                      Spencer Tarring is not here to sell you a fantasy. He has lived too many of them already.
                    </p>
                    <p className="font-scripture text-empire/50 leading-relaxed">
                      He is the founder of The Dominus Code, a builder of critical digital infrastructure, and a man who rejected the modern script to construct a life of absolute sovereignty. But before he built the Code, he had to survive the chaos.
                    </p>

                    {/* Bio Sections */}
                    {longBioSections.map((section, index) => (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <h3 className={`font-law text-sm tracking-[0.3em] mb-4 ${
                          mode === "dominus" ? "text-blood/80" : "text-sovereign/80"
                        }`}>
                          {section.title}
                        </h3>
                        <p className="font-scripture text-empire/50 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </motion.div>
                    ))}

                    {/* Closing Statement */}
                    <div className="pt-6 border-t border-concrete/10">
                      <p className={`font-scripture text-lg italic ${
                        mode === "dominus" ? "text-blood/70" : "text-sovereign/70"
                      }`}>
                        Spencer Tarring is building the Ark for the flood that is coming. The Dominus Code is your invitation to get on board.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

