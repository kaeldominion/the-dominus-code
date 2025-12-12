"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { Users, Video, MessageSquare, Shield } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Video,
    title: "Monthly Councils",
    description: "Live sessions with Spencer. Strategy. Accountability.",
  },
  {
    icon: MessageSquare,
    title: "Direct Access",
    description: "Questions answered within 24 hours. No gatekeepers.",
  },
  {
    icon: Users,
    title: "The Brotherhood",
    description: "Network with men operating at the highest level.",
  },
  {
    icon: Shield,
    title: "The System",
    description: "Complete Dominus OS. Templates. Protocols. Structure.",
  },
];

export function CouncilPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mode } = useApp();

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-concrete/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-concrete/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="crown-divider mb-8">
            <Crown size={40} variant={mode === "dominus" ? "blood" : "gold"} />
          </div>
          
          <p className="font-system text-xs tracking-[0.4em] text-concrete/50 uppercase mb-4">
            For Those Ready to Execute
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-sovereign/50 mb-4">
            <span className="font-system text-[10px] tracking-[0.3em] text-sovereign uppercase">
              COMING SOON
            </span>
          </div>
          <h2 className="font-law text-3xl md:text-5xl tracking-[0.12em] text-empire mb-6">
            THE COUNCIL
          </h2>
          
          <p className="font-scripture text-xl text-empire/50 max-w-2xl mx-auto italic">
            You have read the map. Now walk the path.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="border border-concrete/20 p-8 text-center hover:border-concrete/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
            >
              <feature.icon
                className={`w-8 h-8 mx-auto mb-5 ${
                  mode === "dominus" ? "text-blood/70" : "text-sovereign/70"
                }`}
                strokeWidth={1.5}
              />
              <h3 className="font-system text-sm tracking-[0.15em] uppercase text-empire mb-3">
                {feature.title}
              </h3>
              <p className="font-scripture text-sm text-empire/50">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1.2 }}
        >
          <p className="font-scripture text-lg md:text-xl text-empire/60 italic max-w-2xl mx-auto">
            &ldquo;The men who change the world are the ones who refuse to wait for permission.&rdquo;
          </p>
        </motion.blockquote>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link href="/council">
            <Button
              variant={mode === "dominus" ? "blood" : "primary"}
              size="lg"
              icon
            >
              Learn More
            </Button>
          </Link>
          
          <p className="font-system text-[10px] tracking-[0.2em] text-sovereign/60 uppercase mt-6">
            Coming Soon • Application Required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

