"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useApp } from "@/components/Providers";

type Status = "DEEP_WORK" | "TRAINING" | "FAMILY" | "BUILDING" | "REST";

interface StatusConfig {
  label: string;
  color: string;
  dotClass: string;
  description: string;
}

const statusConfigs: Record<Status, StatusConfig> = {
  DEEP_WORK: {
    label: "DEEP WORK",
    color: "text-gold",
    dotClass: "deep-work",
    description: "Currently in focused creation mode",
  },
  TRAINING: {
    label: "TRAINING",
    color: "text-blood",
    dotClass: "training",
    description: "Physical protocol in session",
  },
  FAMILY: {
    label: "FAMILY TIME",
    color: "text-green-500",
    dotClass: "active",
    description: "With the dynasty",
  },
  BUILDING: {
    label: "BUILDING",
    color: "text-gold",
    dotClass: "deep-work",
    description: "Constructing the empire",
  },
  REST: {
    label: "REST PROTOCOL",
    color: "text-slate",
    dotClass: "",
    description: "Recovery and restoration",
  },
};

const weekProtocol = [
  { day: "MON", blocks: ["DEEP_WORK", "TRAINING", "FAMILY"] },
  { day: "TUE", blocks: ["BUILDING", "DEEP_WORK", "FAMILY"] },
  { day: "WED", blocks: ["TRAINING", "DEEP_WORK", "BUILDING"] },
  { day: "THU", blocks: ["DEEP_WORK", "TRAINING", "FAMILY"] },
  { day: "FRI", blocks: ["BUILDING", "DEEP_WORK", "REST"] },
  { day: "SAT", blocks: ["FAMILY", "TRAINING", "REST"] },
  { day: "SUN", blocks: ["REST", "FAMILY", "BUILDING"] },
];

export function StatusDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mode } = useApp();
  const [currentStatus, setCurrentStatus] = useState<Status>("DEEP_WORK");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })
      );

      // Simulate status based on time of day
      const hour = now.getHours();
      if (hour >= 5 && hour < 8) setCurrentStatus("TRAINING");
      else if (hour >= 8 && hour < 12) setCurrentStatus("DEEP_WORK");
      else if (hour >= 12 && hour < 14) setCurrentStatus("FAMILY");
      else if (hour >= 14 && hour < 18) setCurrentStatus("BUILDING");
      else if (hour >= 18 && hour < 21) setCurrentStatus("FAMILY");
      else setCurrentStatus("REST");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const config = statusConfigs[currentStatus];

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/95 to-obsidian" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl md:text-4xl tracking-[0.1em] text-ivory mb-4">
            LIVE PROTOCOL
          </h2>
          <p className="font-body text-ivory/60">
            Real-time status from The House
          </p>
        </motion.div>

        {/* Current Status */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="glass p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span
                className={`status-dot ${config.dotClass}`}
                style={{
                  background:
                    config.dotClass === ""
                      ? "var(--slate)"
                      : config.dotClass === "training"
                      ? "var(--blood)"
                      : config.dotClass === "active"
                      ? "#22c55e"
                      : "var(--gold)",
                }}
              />
              <span
                className={`font-display text-2xl md:text-3xl tracking-[0.2em] ${config.color}`}
              >
                {config.label}
              </span>
            </div>
            <p className="font-body text-ivory/60 mb-4">{config.description}</p>
            <p className="font-display text-sm tracking-[0.3em] text-ivory/40">
              {currentTime}
            </p>
          </div>
        </motion.div>

        {/* Week Protocol Grid */}
        <motion.div
          className="grid grid-cols-7 gap-2 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {weekProtocol.map((day, dayIndex) => (
            <div key={day.day} className="text-center">
              <p
                className={`font-display text-xs tracking-[0.2em] mb-3 ${
                  dayIndex === new Date().getDay() - 1
                    ? mode === "dominus"
                      ? "text-blood"
                      : "text-gold"
                    : "text-ivory/40"
                }`}
              >
                {day.day}
              </p>
              <div className="space-y-1">
                {day.blocks.map((block, blockIndex) => {
                  const blockConfig = statusConfigs[block as Status];
                  return (
                    <div
                      key={blockIndex}
                      className="h-8 md:h-12 flex items-center justify-center border border-gold/10 bg-obsidian/50 group relative"
                    >
                      <span
                        className="w-2 h-2 rounded-full opacity-50"
                        style={{
                          background:
                            block === "TRAINING"
                              ? "var(--blood)"
                              : block === "FAMILY"
                              ? "#22c55e"
                              : block === "REST"
                              ? "var(--slate)"
                              : "var(--gold)",
                        }}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-obsidian border border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        <span className="font-display text-[10px] tracking-wider text-ivory">
                          {blockConfig.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {Object.entries(statusConfigs).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    key === "TRAINING"
                      ? "var(--blood)"
                      : key === "FAMILY"
                      ? "#22c55e"
                      : key === "REST"
                      ? "var(--slate)"
                      : "var(--gold)",
                }}
              />
              <span className="font-display text-[10px] tracking-wider text-ivory/50">
                {value.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

