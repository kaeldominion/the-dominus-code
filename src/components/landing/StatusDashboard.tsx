"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useApp } from "@/components/Providers";

type Status = "DEEP_WORK" | "TRAINING" | "FAMILY" | "BUILDING" | "REST";

interface StatusConfig {
  label: string;
  time: string;
  description: string;
}

const statusConfigs: Record<Status, StatusConfig> = {
  DEEP_WORK: {
    label: "DEEP WORK",
    time: "08:00",
    description: "Focused creation. No interruptions.",
  },
  TRAINING: {
    label: "TRAINING",
    time: "05:00",
    description: "Physical protocol. Iron therapy.",
  },
  FAMILY: {
    label: "FAMILY",
    time: "18:00",
    description: "Dynasty time. Present and accountable.",
  },
  BUILDING: {
    label: "BUILDING",
    time: "14:00",
    description: "Empire construction. Calls and strategy.",
  },
  REST: {
    label: "REST",
    time: "21:00",
    description: "Recovery protocol. Restoration.",
  },
};

// The One Week Protocol - visual representation
const protocolBlocks = [
  { time: "05:00", label: "WAKE", status: "TRAINING" as Status },
  { time: "05:15", label: "COLD WATER", status: "TRAINING" as Status },
  { time: "05:30", label: "TRAIN", status: "TRAINING" as Status },
  { time: "07:00", label: "FUEL", status: "REST" as Status },
  { time: "08:00", label: "DEEP WORK", status: "DEEP_WORK" as Status },
  { time: "12:00", label: "BREAK", status: "REST" as Status },
  { time: "13:00", label: "BUILD", status: "BUILDING" as Status },
  { time: "17:00", label: "FAMILY", status: "FAMILY" as Status },
  { time: "21:00", label: "REST", status: "REST" as Status },
];

export function StatusDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mode } = useApp();
  const [currentStatus, setCurrentStatus] = useState<Status>("DEEP_WORK");
  const [currentTime, setCurrentTime] = useState("");
  const [activeBlockIndex, setActiveBlockIndex] = useState(4);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );

      // Determine current status and active block based on time
      const hour = now.getHours();
      if (hour >= 5 && hour < 7) {
        setCurrentStatus("TRAINING");
        setActiveBlockIndex(hour === 5 ? (now.getMinutes() < 15 ? 0 : now.getMinutes() < 30 ? 1 : 2) : 2);
      } else if (hour >= 7 && hour < 8) {
        setCurrentStatus("REST");
        setActiveBlockIndex(3);
      } else if (hour >= 8 && hour < 12) {
        setCurrentStatus("DEEP_WORK");
        setActiveBlockIndex(4);
      } else if (hour >= 12 && hour < 13) {
        setCurrentStatus("REST");
        setActiveBlockIndex(5);
      } else if (hour >= 13 && hour < 17) {
        setCurrentStatus("BUILDING");
        setActiveBlockIndex(6);
      } else if (hour >= 17 && hour < 21) {
        setCurrentStatus("FAMILY");
        setActiveBlockIndex(7);
      } else {
        setCurrentStatus("REST");
        setActiveBlockIndex(8);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const config = statusConfigs[currentStatus];

  // Slow, heavy animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
    }
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/98 to-void" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-system text-xs tracking-[0.4em] text-concrete/50 uppercase mb-4">
            Real-Time Status
          </p>
          <h2 className="font-law text-3xl md:text-4xl tracking-[0.12em] text-empire mb-6">
            THE PROTOCOL
          </h2>
          <p className="font-scripture text-lg text-empire/50 italic">
            &ldquo;No chaos, just function. Rhythm is baked into the walls.&rdquo;
          </p>
        </motion.div>

        {/* Current Status Display */}
        <motion.div
          className="max-w-xl mx-auto mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="glass p-10 text-center border-arch">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span
                className="w-2 h-2 animate-slow-pulse"
                style={{
                  background:
                    currentStatus === "TRAINING"
                      ? "var(--blood)"
                      : currentStatus === "FAMILY"
                      ? "#22c55e"
                      : currentStatus === "REST"
                      ? "var(--concrete)"
                      : "var(--sovereign)",
                }}
              />
              <span className="font-system text-2xl md:text-3xl tracking-[0.2em] font-light text-empire">
                {config.label}
              </span>
            </div>
            <p className="font-scripture text-empire/50 mb-6 italic">
              {config.description}
            </p>
            <p className="font-system text-sm tracking-[0.3em] text-concrete/40">
              {currentTime}
            </p>
          </div>
        </motion.div>

        {/* The One Week Protocol Timeline */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="font-system text-xs tracking-[0.3em] text-concrete/40 uppercase text-center mb-8">
            Daily Protocol Structure
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
            {protocolBlocks.map((block, index) => (
              <motion.div
                key={block.time}
                variants={itemVariants}
                className={`protocol-block ${index === activeBlockIndex ? 'active' : ''}`}
              >
                <p className="protocol-time">{block.time}</p>
                <p className="protocol-label">{block.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
        >
          {Object.entries(statusConfigs).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <span
                className="w-2 h-2"
                style={{
                  background:
                    key === "TRAINING"
                      ? "var(--blood)"
                      : key === "FAMILY"
                      ? "#22c55e"
                      : key === "REST"
                      ? "var(--concrete)"
                      : "var(--sovereign)",
                }}
              />
              <span className="font-system text-[10px] tracking-[0.2em] text-concrete/40 uppercase">
                {value.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
