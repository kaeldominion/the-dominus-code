"use client";

import { useState } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ExternalLink, Image, FileText, Zap } from "lucide-react";
import Link from "next/link";

const CORRECT_USERNAME = "dominus";
const CORRECT_PASSWORD = "spenceriscool!23";

const tools = [
  {
    id: "logo-generator",
    name: "TDC Logo Generator",
    file: "/gens/TDC Logo Generator.html",
    icon: Image,
    description: "Generate custom logos for The Dominus Code brand. Create variations with different colors, sizes, and styles. Perfect for creating branded assets quickly.",
    usage: "Upload your logo or use the built-in crown icon. Adjust colors, size, and positioning. Download as PNG when ready.",
  },
  {
    id: "post-generator",
    name: "TDC Post Generator v4.0",
    file: "/gens/TDC Post Generator v4.0.html",
    icon: FileText,
    description: "The Legacy Architect - Create stunning social media posts and graphics. Generate quote cards, announcements, and promotional content with The Dominus Code aesthetic.",
    usage: "Enter your text, customize colors and fonts, adjust layout. Export as high-resolution images for social media platforms.",
  },
  {
    id: "social-engine",
    name: "Social Asset Factory",
    file: "/gens/tdc-socialengine3.html",
    icon: Zap,
    description: "Comprehensive social media asset generator. Create banners, stories, posts, and covers for all major platforms. Batch generate multiple assets with consistent branding.",
    usage: "Select asset type (Instagram, Twitter, YouTube, etc.), customize content and styling, generate and download. Supports bulk generation for multiple platforms at once.",
  },
];

export default function GensPage() {
  const { mode } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("gens_authenticated") === "true";
    }
    return false;
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Trim whitespace and compare
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === CORRECT_USERNAME && trimmedPassword === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      // Store authentication in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("gens_authenticated", "true");
      }
    } else {
      setError("Invalid credentials. Access denied.");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <Crown
              size={48}
              variant={mode === "dominus" ? "blood" : "gold"}
              className="mx-auto mb-6"
            />
            <h1 className="font-law text-3xl tracking-[0.1em] text-empire mb-2 uppercase">
              ACCESS REQUIRED
            </h1>
            <p className="font-system text-sm text-concrete/50 uppercase tracking-wider">
              Generator Tools
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleLogin}
            className="space-y-6"
          >
            <div>
              <label className="block font-system text-xs tracking-[0.2em] text-concrete/60 uppercase mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-void border border-concrete/20 text-empire font-system focus:outline-none focus:border-sovereign transition-colors"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block font-system text-xs tracking-[0.2em] text-concrete/60 uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-void border border-concrete/20 text-empire font-system focus:outline-none focus:border-sovereign transition-colors"
                required
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-system text-sm text-blood text-center"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              variant={mode === "dominus" ? "blood" : "primary"}
              size="lg"
              className="w-full"
              icon
            >
              <Lock className="w-4 h-4" />
              Enter
            </Button>
          </motion.form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Crown
              size={48}
              variant={mode === "dominus" ? "blood" : "gold"}
              className="mx-auto mb-8"
            />
            <h1 className="font-law text-4xl md:text-6xl tracking-[0.1em] text-empire mb-6">
              GENERATOR TOOLS
            </h1>
            <p className="font-scripture text-xl text-empire/60 italic">
              Standalone HTML generators for creating branded assets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="border border-concrete/20 p-8 hover:border-concrete/40 transition-colors group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 border ${
                      mode === "dominus" 
                        ? "border-blood/30 bg-blood/5" 
                        : "border-sovereign/30 bg-sovereign/5"
                    }`}>
                      <IconComponent 
                        className={`w-6 h-6 ${
                          mode === "dominus" ? "text-blood" : "text-sovereign"
                        }`}
                      />
                    </div>
                    <h2 className="font-law text-xl tracking-[0.1em] text-empire uppercase">
                      {tool.name}
                    </h2>
                  </div>

                  <p className="font-scripture text-empire/70 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  <div className="mb-6">
                    <p className="font-system text-xs tracking-[0.1em] text-concrete/50 uppercase mb-2">
                      How to Use
                    </p>
                    <p className="font-scripture text-sm text-empire/60 leading-relaxed">
                      {tool.usage}
                    </p>
                  </div>

                  <a
                    href={tool.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant={mode === "dominus" ? "blood" : "primary"}
                      size="lg"
                      className="w-full group/btn"
                    >
                      Open Tool
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

