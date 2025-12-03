"use client";

import { useApp } from "@/components/Providers";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function AudioControl() {
  const { audioEnabled, setAudioEnabled } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/ambient.mp3");
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

  return (
    <motion.button
      onClick={() => setAudioEnabled(!audioEnabled)}
      className="audio-control"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
    >
      {audioEnabled ? (
        <Volume2 className="w-5 h-5 text-gold" />
      ) : (
        <VolumeX className="w-5 h-5 text-ivory/50" />
      )}
    </motion.button>
  );
}

