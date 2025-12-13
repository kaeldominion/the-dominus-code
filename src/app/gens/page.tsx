"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ExternalLink, Image, FileText, Zap, FileDown, Target, CheckCircle, XCircle } from "lucide-react";
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
  {
    id: "media-kit-pdf",
    name: "Media Kit PDF Generator",
    file: "/gens/tdc-mediakitpdfgen.html",
    icon: FileDown,
    description: "Generate professional media kit PDFs for The Dominus Code. Create press kits, media packages, and branded documents with consistent formatting and branding.",
    usage: "Enter your content, select layout options, customize branding elements, and generate a downloadable PDF. Perfect for media outreach and press materials.",
  },
];

export default function GensPage() {
  const { mode } = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();
  const stanceSelectorRef = useRef<HTMLDivElement>(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("gens_authenticated") === "true";
    }
    return false;
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Tweet Strike feature state
  const [tweetUrl, setTweetUrl] = useState("");
  const [stance, setStance] = useState<"REINFORCE" | "CORRECT">("REINFORCE");
  const [isExecuting, setIsExecuting] = useState(false);
  const [strikeResult, setStrikeResult] = useState<{ success: boolean; message: string } | null>(null);

  // Capture tweet URL from query string (for iOS Shortcut integration)
  useEffect(() => {
    if (!isAuthenticated) return; // Only run after authentication
    
    const urlParam = searchParams.get("url");
    if (urlParam) {
      // Decode the URL in case it's encoded
      const decodedUrl = decodeURIComponent(urlParam);
      setTweetUrl(decodedUrl);
      
      // Clear the query parameter from URL
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("url");
      const newQueryString = newSearchParams.toString();
      const newUrl = newQueryString 
        ? `${window.location.pathname}?${newQueryString}`
        : window.location.pathname;
      
      // Replace URL without reload
      router.replace(newUrl);
      
      // Scroll to stance selector after a short delay to ensure DOM is ready
      setTimeout(() => {
        if (stanceSelectorRef.current) {
          stanceSelectorRef.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
          });
        }
      }, 300);
    }
  }, [searchParams, router, isAuthenticated]);

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

  const handleExecuteStrike = async (e: React.FormEvent) => {
    e.preventDefault();
    setStrikeResult(null);
    setIsExecuting(true);

    // Validate tweet URL
    const trimmedUrl = tweetUrl.trim();
    if (!trimmedUrl) {
      setStrikeResult({ success: false, message: "Please enter a Tweet URL" });
      setIsExecuting(false);
      return;
    }

    // Basic URL validation
    if (!trimmedUrl.includes("x.com/") && !trimmedUrl.includes("twitter.com/")) {
      setStrikeResult({ success: false, message: "Please enter a valid X/Twitter URL" });
      setIsExecuting(false);
      return;
    }

    try {
      // Call our internal API route (proxy to N8N)
      const response = await fetch("/api/strike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweet_url: trimmedUrl,
          stance: stance,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setStrikeResult({ 
        success: true, 
        message: "Strike Sent" 
      });
      setTweetUrl(""); // Clear the input on success
    } catch (error) {
      console.error("Error executing strike:", error);
      setStrikeResult({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to execute strike. Please try again." 
      });
    } finally {
      setIsExecuting(false);
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

      {/* Tweet Strike Feature */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Target 
                className={`w-8 h-8 ${
                  mode === "dominus" ? "text-blood" : "text-sovereign"
                }`}
              />
              <h2 className="font-law text-3xl md:text-4xl tracking-[0.1em] text-empire uppercase">
                TWEET STRIKE
              </h2>
            </div>
            <p className="font-scripture text-lg text-empire/60 italic">
              Execute strategic responses to tweets. Reinforce or correct.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleExecuteStrike}
            className="space-y-6"
          >
            {/* Tweet URL Input */}
            <div>
              <label className="block font-system text-xs tracking-[0.2em] text-concrete/60 uppercase mb-2">
                Tweet URL
              </label>
              <input
                type="url"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                placeholder="https://x.com/username/status/123456789"
                className="w-full px-4 py-3 bg-void border border-concrete/20 text-empire font-system focus:outline-none focus:border-sovereign transition-colors"
                required
                disabled={isExecuting}
              />
            </div>

            {/* Stance Selector */}
            <div ref={stanceSelectorRef}>
              <label className="block font-system text-xs tracking-[0.2em] text-concrete/60 uppercase mb-3">
                Stance
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setStance("REINFORCE")}
                  disabled={isExecuting}
                  className={`p-4 border-2 transition-all duration-300 ${
                    stance === "REINFORCE"
                      ? mode === "dominus"
                        ? "border-blood bg-blood/10 text-blood"
                        : "border-sovereign bg-sovereign/10 text-sovereign"
                      : "border-concrete/20 text-empire/60 hover:border-concrete/40"
                  }`}
                >
                  <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-law text-sm tracking-[0.1em] uppercase">REINFORCE</p>
                  <p className="font-system text-xs text-empire/50 mt-1">Agree/Amplify</p>
                </button>
                <button
                  type="button"
                  onClick={() => setStance("CORRECT")}
                  disabled={isExecuting}
                  className={`p-4 border-2 transition-all duration-300 ${
                    stance === "CORRECT"
                      ? mode === "dominus"
                        ? "border-blood bg-blood/10 text-blood"
                        : "border-sovereign bg-sovereign/10 text-sovereign"
                      : "border-concrete/20 text-empire/60 hover:border-concrete/40"
                  }`}
                >
                  <XCircle className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-law text-sm tracking-[0.1em] uppercase">CORRECT</p>
                  <p className="font-system text-xs text-empire/50 mt-1">Disagree/Crush</p>
                </button>
              </div>
            </div>

            {/* Result Message */}
            {strikeResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border ${
                  strikeResult.success
                    ? mode === "dominus"
                      ? "border-blood/50 bg-blood/5 text-blood"
                      : "border-sovereign/50 bg-sovereign/5 text-sovereign"
                    : "border-blood/50 bg-blood/5 text-blood"
                }`}
              >
                <div className="flex items-center gap-3">
                  {strikeResult.success ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  <p className="font-system text-sm">{strikeResult.message}</p>
                </div>
              </motion.div>
            )}

            {/* Execute Button */}
            <Button
              type="submit"
              variant={mode === "dominus" ? "blood" : "primary"}
              size="lg"
              className="w-full"
              icon
              loading={isExecuting}
              disabled={isExecuting}
            >
              {isExecuting ? "Executing..." : "EXECUTE STRIKE"}
            </Button>
          </motion.form>
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

