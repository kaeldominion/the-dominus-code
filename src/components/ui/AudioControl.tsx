"use client";

import { useApp } from "@/components/Providers";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AudioControl() {
  const { audioEnabled, setAudioEnabled } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/The_Dominus_Code_Foreword_Read_This_First.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (audioEnabled) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked - user needs to interact first
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioEnabled]);

  // Audio visualizer bars
  const bars = [1, 2, 3, 4];

  return (
    <motion.div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <motion.button
        onClick={() => setAudioEnabled(!audioEnabled)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-3 border border-concrete/30 bg-void/80 backdrop-blur-md p-3 shadow-2xl hover:border-sovereign/30 transition-all duration-500 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
      >
        {/* Play/Pause Button */}
        <div className="w-8 h-8 flex items-center justify-center bg-sovereign group-hover:bg-empire transition-colors text-void">
          {audioEnabled ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </div>

        {/* Text Labels */}
        <div className="flex flex-col">
          <span className="font-system text-[8px] uppercase tracking-[0.2em] text-sovereign">
            Audio Experience
          </span>
          <span className="font-law text-xs text-empire group-hover:text-sovereign transition-colors tracking-wider">
            The Foreword
          </span>
        </div>

        {/* Audio Visualizer Bars */}
        <div className="flex gap-0.5 items-end h-6 ml-2">
          {bars.map((_, i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-sovereign/50"
              animate={{
                height: audioEnabled
                  ? [`${20 + Math.random() * 30}%`, `${50 + Math.random() * 50}%`, `${20 + Math.random() * 30}%`]
                  : "20%",
              }}
              transition={{
                duration: 0.5,
                repeat: audioEnabled ? Infinity : 0,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Volume Icon (shown on hover) */}
        <motion.div
          className="ml-1"
          initial={{ opacity: 0, width: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            width: isHovered ? "auto" : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          {audioEnabled ? (
            <Volume2 className="w-4 h-4 text-sovereign" />
          ) : (
            <VolumeX className="w-4 h-4 text-concrete/50" />
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

