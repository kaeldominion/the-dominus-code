"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";
import { useApp } from "@/components/Providers";

interface ForewordAudioPlayerProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export function ForewordAudioPlayer({ onPlayStateChange }: ForewordAudioPlayerProps) {
  const { mode, setForewordAudioRef } = useApp();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Register audio ref with context so header can control it
  useEffect(() => {
    setForewordAudioRef(audioRef);
    return () => setForewordAudioRef(null);
  }, [setForewordAudioRef]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState<Uint8Array>(new Uint8Array(128));

  // Initialize audio element listeners (but NOT audio context - that will be set up on first play)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Update duration
    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", updateDuration);

    // Update current time
    const updateTime = () => setCurrentTime(audio.currentTime);
    const timeInterval = setInterval(updateTime, 100);

    return () => {
      clearInterval(timeInterval);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  // Waveform animation
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
      return;
    }

    const drawWaveform = () => {
      const analyser = analyserRef.current;
      if (!canvasRef.current || !analyser) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);
      setWaveformData(dataArray);

      const width = canvas.width;
      const height = canvas.height;
      const barCount = 64;
      const barWidth = width / barCount;

      ctx.clearRect(0, 0, width, height);

      // Draw waveform bars
      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * dataArray.length);
        const barHeight = (dataArray[dataIndex] / 255) * height * 0.8;
        
        const x = i * barWidth;
        const y = height - barHeight;

        // Gradient based on mode
        const gradient = ctx.createLinearGradient(0, height, 0, y);
        if (mode === "dominus") {
          gradient.addColorStop(0, "#8a0303");
          gradient.addColorStop(1, "#ff0000");
        } else {
          gradient.addColorStop(0, "#e5c372");
          gradient.addColorStop(1, "#ffd700");
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
      }

      animationFrameRef.current = requestAnimationFrame(drawWaveform);
    };

    drawWaveform();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };
  }, [isPlaying, mode]);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.error("Audio ref is null");
      return;
    }

    console.log("togglePlay - isPlaying:", isPlaying);
    console.log("Audio element:", {
      src: audio.src,
      readyState: audio.readyState,
      networkState: audio.networkState,
      paused: audio.paused,
      volume: audio.volume,
      muted: audio.muted,
      currentTime: audio.currentTime,
      duration: audio.duration
    });

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
      return;
    }

    try {
      // Ensure volume is set
      audio.volume = 1;
      audio.muted = false;
      
      // Set up audio context BEFORE playing (but only once)
      if (!audioContextRef.current) {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          audioContextRef.current = audioContext;
          
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          analyserRef.current = analyser;

          if (!sourceRef.current) {
            try {
              const source = audioContext.createMediaElementSource(audio);
              sourceRef.current = source;
              // Connect source -> analyser -> destination
              source.connect(analyser);
              analyser.connect(audioContext.destination);
              console.log("Audio context connected for waveform");
            } catch (error) {
              console.warn("Audio element already connected:", error);
            }
          }
        } catch (error) {
          console.warn("Failed to set up audio context for waveform:", error);
          // Continue without waveform visualization - audio will still play directly
        }
      }

      // Resume audio context if suspended
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }
      
      // Now play the audio
      console.log("Attempting to play audio...");
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        console.log("Play promise resolved");
        // State will be updated by onPlay event handler, but set it here too
        setIsPlaying(true);
        onPlayStateChange?.(true);
      } else {
        // If playPromise is undefined, check current state
        console.log("Play promise is undefined, checking state");
        setIsPlaying(!audio.paused);
        onPlayStateChange?.(!audio.paused);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      console.error("Error details:", {
        name: (error as Error).name,
        message: (error as Error).message
      });
      
      // If play fails, try to set up audio context and retry
      if (!audioContextRef.current) {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          audioContextRef.current = audioContext;
          
          if (audioContext.state === "suspended") {
            await audioContext.resume();
          }
          
          audio.volume = 1;
          audio.muted = false;
          await audio.play();
          setIsPlaying(true);
          onPlayStateChange?.(true);
        } catch (retryError) {
          console.error("Retry failed:", retryError);
          alert("Unable to play audio. Please check your browser settings or try clicking again.");
        }
      } else {
        alert("Unable to play audio. Please check your browser settings or try clicking again.");
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        src="/audio/The_Dominus_Code_Foreword_Read_This_First.mp3"
        preload="auto"
        onPlay={() => {
          console.log("Audio onPlay event fired");
          console.log("Audio currentTime:", audioRef.current?.currentTime);
          console.log("Audio volume:", audioRef.current?.volume);
          console.log("Audio muted:", audioRef.current?.muted);
          setIsPlaying(true);
          onPlayStateChange?.(true);
        }}
        onPause={() => {
          console.log("Audio onPause event fired");
          setIsPlaying(false);
          onPlayStateChange?.(false);
        }}
        onEnded={() => {
          console.log("Audio onEnded event fired");
          setIsPlaying(false);
          onPlayStateChange?.(false);
        }}
        onLoadedMetadata={() => {
          console.log("Audio metadata loaded, duration:", audioRef.current?.duration);
        }}
        onCanPlay={() => {
          console.log("Audio can play");
        }}
        onError={(e) => {
          console.error("Audio error:", e);
          console.error("Audio error details:", {
            error: audioRef.current?.error,
            errorCode: audioRef.current?.error?.code,
            errorMessage: audioRef.current?.error?.message,
            networkState: audioRef.current?.networkState,
            readyState: audioRef.current?.readyState,
            src: audioRef.current?.src
          });
          alert("Error loading audio file. Please check the file path.");
        }}
        onLoadStart={() => {
          console.log("Audio load started");
        }}
        onStalled={() => {
          console.warn("Audio stalled");
        }}
        onSuspend={() => {
          console.warn("Audio suspended");
        }}
      />

      {/* Waveform Canvas */}
      <div className="relative mb-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={80}
          className="w-full h-20 bg-void/50 border border-concrete/10"
        />
        
        {/* Progress Overlay */}
        <div
          className="absolute top-0 left-0 h-full bg-empire/5 pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className={`p-3 border transition-all duration-300 ${
            mode === "dominus"
              ? "border-blood hover:bg-blood/10 text-blood"
              : "border-sovereign hover:bg-sovereign/10 text-sovereign"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1">
          {/* Progress Bar */}
          <div className="h-1 bg-concrete/10 mb-2">
            <div
              className={`h-full transition-all duration-100 ${
                mode === "dominus" ? "bg-blood" : "bg-sovereign"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between items-center">
            <span className="font-system text-xs text-concrete/50">
              {formatTime(currentTime)}
            </span>
            <span className="font-system text-xs text-concrete/50">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <Volume2 className={`w-5 h-5 ${
          mode === "dominus" ? "text-blood/50" : "text-sovereign/50"
        }`} />
      </div>

      {/* Label */}
      <p className="font-system text-[10px] tracking-[0.2em] text-concrete/40 uppercase mt-3 text-center">
        Listen to the Foreword
      </p>
    </div>
  );
}

