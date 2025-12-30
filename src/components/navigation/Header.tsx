"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Crown } from "@/components/ui/Crown";
import { ModeToggleCompact } from "@/components/ui/ModeToggle";
import { Menu, X, Instagram, Music2, Youtube, Pause } from "lucide-react";
import { useApp } from "@/components/Providers";

const navLinks = [
  { href: "/", label: "The Gate" },
  { href: "/oracle", label: "The Oracle" },
  { href: "/council", label: "The Council" },
  { href: "/media", label: "Media" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { mode, forewordAudioRef } = useApp();

  // Check if audio is playing
  useEffect(() => {
    if (!forewordAudioRef?.current) return;

    const audio = forewordAudioRef.current;
    const updatePlayingState = () => setIsAudioPlaying(!audio.paused);
    
    audio.addEventListener("play", updatePlayingState);
    audio.addEventListener("pause", updatePlayingState);
    audio.addEventListener("ended", () => setIsAudioPlaying(false));

    return () => {
      audio.removeEventListener("play", updatePlayingState);
      audio.removeEventListener("pause", updatePlayingState);
      audio.removeEventListener("ended", () => setIsAudioPlaying(false));
    };
  }, [forewordAudioRef]);

  const handlePauseAudio = () => {
    if (forewordAudioRef?.current) {
      forewordAudioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "glass py-4" : "py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Crown
              size={32}
              variant={mode === "dominus" ? "blood" : "gold"}
            />
            <span className="font-system text-xs tracking-[0.4em] uppercase text-empire/80 hidden sm:block">
              Dominus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-system text-[11px] font-light tracking-[0.25em] uppercase text-concrete/60 hover:text-empire transition-colors duration-500 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-concrete/30 transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Audio Pause Control */}
            {isAudioPlaying && (
              <button
                onClick={handlePauseAudio}
                className={`text-concrete/60 transition-colors duration-500 ${mode === "dominus" ? "hover:text-blood" : "hover:text-sovereign"}`}
                title="Pause audio"
                aria-label="Pause audio"
              >
                <Pause className="w-5 h-5" strokeWidth={1} />
              </button>
            )}
            {/* Social Links */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://instagram.com/thedominuscode"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-concrete/60 transition-colors duration-500 ${mode === "dominus" ? "hover:text-blood" : "hover:text-sovereign"}`}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1} />
              </a>
              <a
                href="https://tiktok.com/@thedominuscode"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-concrete/60 transition-colors duration-500 ${mode === "dominus" ? "hover:text-blood" : "hover:text-sovereign"}`}
                aria-label="TikTok"
              >
                <Music2 className="w-5 h-5" strokeWidth={1} />
              </a>
              <a
                href="https://youtube.com/@thedominuscode"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-concrete/60 transition-colors duration-500 ${mode === "dominus" ? "hover:text-blood" : "hover:text-sovereign"}`}
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" strokeWidth={1} />
              </a>
            </div>
            <ModeToggleCompact />
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-concrete/60 hover:text-empire transition-colors duration-500"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between">
                <Crown size={32} variant="gold" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-concrete/60 hover:text-empire transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" strokeWidth={1} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col items-center justify-center gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`font-law text-xl tracking-[0.2em] uppercase text-empire/80 transition-colors duration-500 ${mode === "dominus" ? "hover:text-blood" : "hover:text-sovereign"}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Social Links - Mobile */}
              <motion.div 
                className="flex justify-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <a
                  href="https://instagram.com/thedominuscode"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={`text-concrete/60 transition-colors duration-500 ${mode === "dominus" ? "hover:text-blood" : "hover:text-sovereign"}`}
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" strokeWidth={1} />
                </a>
                <a
                  href="https://tiktok.com/@thedominuscode"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={`text-concrete/60 transition-colors duration-500 ${mode === "dominus" ? "hover:text-blood" : "hover:text-sovereign"}`}
                  aria-label="TikTok"
                >
                  <Music2 className="w-6 h-6" strokeWidth={1} />
                </a>
                <a
                  href="https://youtube.com/@thedominuscode"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={`text-concrete/60 transition-colors duration-500 ${mode === "dominus" ? "hover:text-blood" : "hover:text-sovereign"}`}
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6" strokeWidth={1} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
