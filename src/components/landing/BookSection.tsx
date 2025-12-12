"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useApp } from "@/components/Providers";
import { ForewordAudioPlayer } from "@/components/ui/ForewordAudioPlayer";

// Foreword content split into pages
const forewordPages = [
  {
    title: "Foreword",
    content: `I'm not here to sell a fantasy. I've lived too many of them already. I've had the money, the women, the cars, the clubs, the applause. I've woken up in penthouses I don't remember walking into, with people I barely knew, pretending I was living the dream.

This book came from the silence after the noise, the mornings when I'd sit alone and realize how little of it meant anything.`
  },
  {
    title: null,
    content: `The success, the chaos, the constant motion, it all looked powerful from the outside, but I was running from something real: responsibility. Legacy. The idea that maybe a man isn't supposed to chase freedom his whole life, but build something worth being bound to.

I didn't plan to write this. It started as notes to myself, things I needed to remember.`
  },
  {
    title: null,
    content: `When I say Dominus, I don't mean overlord. I don't refer to myself as Dominus and demand my girlfriends call me that. What I mean is leader. Protector. The one who carries the weight. The one who bleeds first so others don't have to.

People forget that's what strength was meant for. Not control, but for direction. Without direction, even strength decays.`
  },
  {
    title: null,
    content: `At the core of everything you are about to read lies an ancient, unyielding truth we have forgotten.

Life's Prime Directive is not pleasure. It is not happiness. It is not the endless pursuit of the next experience.

The Prime Directive is this: To strengthen your bloodline. To honor those who came before you. To build for those who come after you.`
  },
  {
    title: null,
    content: `There's a line I keep coming back to: To move the world, you must first move yourself. That's it. That's the core.

Before you can build a family, a business, a legacy, you have to conquer your own chaos. You have to become a man your bloodline would be proud of.

I built this Code because I needed it. Maybe you do too.`
  }
];

export function BookSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mode } = useApp();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Book cover rotation (closed to open)
  const coverRotation = useTransform(scrollYProgress, [0.1, 0.3], [0, -160]);
  const coverOpacity = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
  
  // Page animations - staggered reveals
  const page1Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const page1Rotation = useTransform(scrollYProgress, [0.35, 0.45], [0, -160]);
  
  const page2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const page2Rotation = useTransform(scrollYProgress, [0.45, 0.55], [0, -160]);
  
  const page3Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const page3Rotation = useTransform(scrollYProgress, [0.55, 0.65], [0, -160]);
  
  const page4Opacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const page4Rotation = useTransform(scrollYProgress, [0.65, 0.75], [0, -160]);
  
  const page5Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  // Book scale for dramatic effect
  const bookScale = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0.8, 1, 1, 0.9]);
  const bookY = useTransform(scrollYProgress, [0, 0.1], [100, 0]);

  const pageVariants = [
    { opacity: page1Opacity, rotation: page1Rotation },
    { opacity: page2Opacity, rotation: page2Rotation },
    { opacity: page3Opacity, rotation: page3Rotation },
    { opacity: page4Opacity, rotation: page4Rotation },
    { opacity: page5Opacity, rotation: undefined },
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[400vh] py-32"
    >
      {/* Sticky container for the book */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 w-full">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
          >
            <p className="font-system text-xs tracking-[0.4em] text-concrete/50 uppercase mb-4">
              The Scripture
            </p>
            <h2 className="font-law text-3xl md:text-4xl tracking-[0.12em] text-empire">
              OPEN THE CODE
            </h2>
          </motion.div>

          {/* Audio Player */}
          <motion.div
            className="max-w-md mx-auto mb-12"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
          >
            <ForewordAudioPlayer />
          </motion.div>

          {/* Book Container */}
          <motion.div 
            className="relative mx-auto"
            style={{ 
              scale: bookScale,
              y: bookY,
              perspective: "2000px",
              width: "min(90vw, 600px)",
              height: "min(70vh, 450px)",
            }}
          >
            {/* Book Base/Back */}
            <div 
              className="absolute inset-0 bg-void border border-concrete/10"
              style={{ 
                transformStyle: "preserve-3d",
                boxShadow: "0 50px 100px -20px rgba(0,0,0,0.8)"
              }}
            />

            {/* Pages (rendered in reverse order so first page is on top) */}
            {forewordPages.map((page, index) => {
              const isLastPage = index === forewordPages.length - 1;
              const variant = pageVariants[index];
              
              return (
                <motion.div
                  key={index}
                  className={`absolute inset-0 border p-8 md:p-12 overflow-hidden ${
                    mode === "dominus" 
                      ? "bg-[#f5f5f5] border-concrete/20" 
                      : "bg-[#0a0a0a] border-concrete/5"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                    rotateY: isLastPage ? 0 : variant.rotation,
                    opacity: variant.opacity,
                    zIndex: forewordPages.length - index,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Page Content */}
                  <div className="h-full flex flex-col">
                    {page.title && (
                      <h3 className={`font-law text-xl md:text-2xl tracking-[0.15em] mb-6 md:mb-8 ${
                        mode === "dominus" ? "text-blood" : "text-sovereign"
                      }`}>
                        {page.title}
                      </h3>
                    )}
                    <div className="flex-1 overflow-hidden">
                      <p className={`font-scripture text-sm md:text-base leading-relaxed whitespace-pre-line italic ${
                        mode === "dominus" ? "text-[#1a1a1a]/80" : "text-empire/70"
                      }`}>
                        {page.content}
                      </p>
                    </div>
                    {/* Page Number */}
                    <div className={`mt-4 pt-4 border-t flex justify-between items-center ${
                      mode === "dominus" ? "border-concrete/20" : "border-concrete/10"
                    }`}>
                      <span className={`font-system text-[10px] tracking-[0.3em] ${
                        mode === "dominus" ? "text-[#1a1a1a]/30" : "text-concrete/30"
                      }`}>
                        THE DOMINUS CODE
                      </span>
                      <span className={`font-system text-[10px] tracking-[0.2em] ${
                        mode === "dominus" ? "text-[#1a1a1a]/30" : "text-concrete/30"
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Book Cover (Front) */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
                rotateY: coverRotation,
                opacity: coverOpacity,
                zIndex: 10,
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src="/images/book-cover.png"
                alt="The Dominus Code"
                fill
                className="object-cover"
                priority
              />
              {/* Cover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/30 to-transparent" />
            </motion.div>

            {/* Book Spine Glow */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{
                background: `linear-gradient(to bottom, transparent, ${mode === "dominus" ? "#8a0303" : "#e5c372"}40, transparent)`,
              }}
            />
          </motion.div>

          {/* Scroll Hint */}
          <motion.p 
            className="text-center mt-12 font-system text-[10px] tracking-[0.3em] text-concrete/30 uppercase"
            style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.8], [0, 1, 1, 0]) }}
          >
            Scroll to turn pages
          </motion.p>
        </div>
      </div>
    </section>
  );
}

