"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { useApp } from "@/components/Providers";
import JSZip from "jszip";
import {
  Download,
  Copy,
  Check,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Video,
  Package,
  Zap,
  Shield,
  Lock,
  Unlock,
  ExternalLink,
  Palette,
  Type,
  Ban,
  CheckCircle,
} from "lucide-react";

// ============================================
// DATA
// ============================================

const bios = {
  short: {
    label: "SHORT",
    sublabel: "For Intro",
    text: `Spencer Tarring is the author of The Dominus Code and the architect of a sovereign life. A former tech CEO who exited for millions in his twenties, he spent a decade in Shanghai's high-society nightlife before rejecting modern degeneracy to build a legacy of order. Today, he builds critical digital infrastructure, leads a multi-woman dynasty, and teaches men how to kill the "Boy" to build the "King." He is a Realist, a builder, and a Dominus.`,
  },
  long: {
    label: "LONG",
    sublabel: "For Website",
    text: `Spencer Tarring is not here to sell you a fantasy. He has lived too many of them already.

He is the founder of The Dominus Code, a builder of critical digital infrastructure, and a man who rejected the modern script to construct a life of absolute sovereignty. But before he built the Code, he had to survive the chaos.

THE RISE: Spencer's education didn't happen in a university lecture hall. It began at eighteen, in a small room above a tyre shop in Reading. As the co-founder of Dedipower, he built a data infrastructure company from the ground up using 16-hour days and unrelenting drive. He scaled it into a corporate powerhouse, achieving a multi-million pound exit that secured his financial freedom before most men start their careers.

THE DECADENCE: With capital but no internal order, Spencer drifted into the high-voltage glamour of Shanghai. As the Music Director of M1NT, he became the face of the city's excess—driving a Rolls Royce Ghost, commanding crowds of thousands as a DJ, and living the life every young man thinks he wants. On paper, he was a King. In reality, he was hollowing out—a man running on dopamine, performing success while his internal foundation eroded.

THE AWAKENING: The shift arrived on December 31st, 2020. No party. No stage. Just silence. In that silence, the "Boy" died. Spencer quit alcohol cold turkey and began the slow, violent work of reconstruction. He stripped away the persona and looked at the physics of what makes a man valuable: Strength, Order, Polarity, Legacy.

THE ARCHITECT: Today, Spencer operates as a Realist. He builds critical digital infrastructure across emerging markets. He lives openly as a Dominus, leading a non-monogamous household defined by strict hierarchy and devotion. His mission: to help men kill the "Boy" and build the "King."`,
  },
  controversial: {
    label: "CONTROVERSIAL",
    sublabel: "For Viral Clips",
    text: `Spencer Tarring made millions before 30, spent a decade drowning in Shanghai's excess, and woke up empty. Now he leads a non-monogamous household—multiple women, strict hierarchy, absolute devotion—and he's not sorry about it.

He calls monogamy "a tool for state control." He says happiness is "a lie sold to weak men." He believes the West is dying and every smart man should leave.

His book, The Dominus Code, is a manual for men who want to stop apologizing for being men. It's been called "dangerous," "misogynistic," and "the most honest thing written about masculinity in a decade."

Spencer doesn't care what you think. He's too busy building a dynasty.`,
  },
};

const quotes = [
  "Fuck Monogamy. Build a Dynasty.",
  "The Boy Must Die.",
  "The boy wants recognition. The man wants mastery.",
  "A man who cannot protect will not be desired. A man who cannot lead will not be followed.",
  "Comfort is not happiness; comfort is anesthesia.",
  "You cannot lead what you haven't mastered.",
  "The map on your wall is a lie. You are a mobile asset.",
  "Happiness is not the goal. Legacy is.",
];

const assets = [
  {
    id: "headshot-bw",
    name: "Headshot B&W",
    type: "image",
    icon: ImageIcon,
    file: "/images/st-avatar-2021-v4.jpg",
    description: "High-res black & white portrait",
  },
  {
    id: "headshot-color",
    name: "Headshot Color",
    type: "image",
    icon: ImageIcon,
    file: "/images/st-avatar-2021-v4.jpg",
    description: "High-res color portrait",
  },
  {
    id: "book-cover",
    name: "Book Cover",
    type: "image",
    icon: ImageIcon,
    file: "/images/book-cover.png",
    description: "Official book cover artwork",
  },
  {
    id: "crown-icon",
    name: "Crown Icon",
    type: "image",
    icon: ImageIcon,
    file: "/images/tdc-icon-gold.png",
    description: "The Dominus Code emblem",
  },
  {
    id: "media-pack",
    name: "Media Pack PDF",
    type: "document",
    icon: FileText,
    file: "/docs/Dominus_Media_Kit.pdf",
    description: "Full press kit document",
  },
  {
    id: "manifesto-video",
    name: "Manifesto Video",
    type: "video",
    icon: Video,
    file: "#",
    description: "Official trailer (Coming Soon)",
  },
];

const interviewQuestions = [
  '"You say in the book that \'Happiness is not the goal.\' If not happiness, what should a man be waking up for?"',
  '"You openly lead a non-monogamous household with a strict hierarchy. What do you say to critics who call this oppressive or misogynistic?"',
  '"You made millions in your 20s and lost millions later. What is the difference between \'Boy Money\' and \'King Money\'?"',
  '"Why do you believe the \'Sovereign Individual\' must leave the West to survive the next decade?"',
  '"What is the \'Craig Moment\' you describe in the book, and why does every man need one?"',
  '"You quit alcohol cold turkey in 2020. Why do you believe sobriety is a prerequisite for power?"',
];

const protocolChecklist = [
  {
    id: "video",
    text: "I confirm this interview will be video, minimum 1080p.",
  },
  {
    id: "prepared",
    text: 'I confirm I have read the "Hook" and will not ask basic questions.',
  },
  {
    id: "unapologetic",
    text: "I understand Spencer does not apologize for his views.",
  },
];

// ============================================
// COMPONENT
// ============================================

export default function MediaPage() {
  const { mode } = useApp();
  const [activeBio, setActiveBio] = useState<"short" | "long" | "controversial">("short");
  const [copiedBio, setCopiedBio] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(quotes[0]);
  const [customQuote, setCustomQuote] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [contactUnlocked, setContactUnlocked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const accentColor = mode === "dominus" ? "blood" : "sovereign";

  // Copy bio to clipboard
  const copyBio = useCallback(async () => {
    await navigator.clipboard.writeText(bios[activeBio].text);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  }, [activeBio]);

  // Generate quote image
  const generateQuoteImage = useCallback(async () => {
    const quoteText = customQuote || selectedQuote;
    if (!quoteText) return;

    setIsGenerating(true);

    // Create canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size (1080x1080 for social)
    canvas.width = 1080;
    canvas.height = 1080;

    // ========================================
    // BACKGROUND - Deep void with subtle gradient
    // ========================================
    const bgGradient = ctx.createRadialGradient(540, 540, 0, 540, 540, 800);
    bgGradient.addColorStop(0, "#0d0d0d");
    bgGradient.addColorStop(0.5, "#080808");
    bgGradient.addColorStop(1, "#030303");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // ========================================
    // NOISE TEXTURE - Subtle film grain
    // ========================================
    const imageData = ctx.getImageData(0, 0, 1080, 1080);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 12 - 6;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    // ========================================
    // CORNER ACCENTS - Brutalist frame
    // ========================================
    const gold = "#e5c372";
    const goldDark = "#b8973d";
    const cornerLength = 80;
    const cornerThickness = 2;
    const margin = 60;

    ctx.strokeStyle = gold;
    ctx.lineWidth = cornerThickness;

    // Top-left corner
    ctx.beginPath();
    ctx.moveTo(margin, margin + cornerLength);
    ctx.lineTo(margin, margin);
    ctx.lineTo(margin + cornerLength, margin);
    ctx.stroke();

    // Top-right corner
    ctx.beginPath();
    ctx.moveTo(1080 - margin - cornerLength, margin);
    ctx.lineTo(1080 - margin, margin);
    ctx.lineTo(1080 - margin, margin + cornerLength);
    ctx.stroke();

    // Bottom-left corner
    ctx.beginPath();
    ctx.moveTo(margin, 1080 - margin - cornerLength);
    ctx.lineTo(margin, 1080 - margin);
    ctx.lineTo(margin + cornerLength, 1080 - margin);
    ctx.stroke();

    // Bottom-right corner
    ctx.beginPath();
    ctx.moveTo(1080 - margin - cornerLength, 1080 - margin);
    ctx.lineTo(1080 - margin, 1080 - margin);
    ctx.lineTo(1080 - margin, 1080 - margin - cornerLength);
    ctx.stroke();

    // ========================================
    // DECORATIVE LINES - Top and bottom
    // ========================================
    ctx.strokeStyle = goldDark;
    ctx.lineWidth = 1;
    
    // Top decorative line
    ctx.beginPath();
    ctx.moveTo(200, 180);
    ctx.lineTo(880, 180);
    ctx.stroke();

    // Bottom decorative line
    ctx.beginPath();
    ctx.moveTo(200, 900);
    ctx.lineTo(880, 900);
    ctx.stroke();

    // ========================================
    // CROWN ICON - Load and draw actual icon
    // ========================================
    const crownImg = new Image();
    crownImg.crossOrigin = "anonymous";
    
    await new Promise<void>((resolve) => {
      crownImg.onload = () => {
        // Draw crown centered at top
        const crownSize = 70;
        ctx.drawImage(crownImg, 540 - crownSize / 2, 100, crownSize, crownSize);
        resolve();
      };
      crownImg.onerror = () => {
        // Fallback: draw a simple crown shape
        ctx.fillStyle = gold;
        ctx.font = "60px serif";
        ctx.textAlign = "center";
        ctx.fillText("♔", 540, 145);
        resolve();
      };
      crownImg.src = "/images/tdc-icon-gold.png";
    });

    // ========================================
    // QUOTE MARKS - Large decorative
    // ========================================
    ctx.fillStyle = "rgba(229, 195, 114, 0.15)";
    ctx.font = "bold 200px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("\u201C", 180, 380);
    ctx.fillText("\u201D", 900, 750);

    // ========================================
    // QUOTE TEXT - Main content with glow
    // ========================================
    
    // Dynamic font size based on quote length
    let fontSize = 58;
    if (quoteText.length > 80) fontSize = 48;
    if (quoteText.length > 120) fontSize = 42;
    if (quoteText.length > 160) fontSize = 36;

    ctx.font = `bold ${fontSize}px "Times New Roman", Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Word wrap
    const words = quoteText.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    const maxWidth = 820;

    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    // Calculate line height and starting position
    const lineHeight = fontSize * 1.4;
    const totalTextHeight = lines.length * lineHeight;
    const startY = 540 - totalTextHeight / 2 + lineHeight / 2;

    // Draw text glow (subtle)
    ctx.shadowColor = "rgba(229, 195, 114, 0.3)";
    ctx.shadowBlur = 30;
    ctx.fillStyle = gold;

    lines.forEach((line, i) => {
      ctx.fillText(line, 540, startY + i * lineHeight);
    });

    // Reset shadow
    ctx.shadowBlur = 0;

    // ========================================
    // ATTRIBUTION - Book title
    // ========================================
    ctx.font = "300 18px sans-serif";
    ctx.fillStyle = "rgba(229, 195, 114, 0.6)";
    ctx.letterSpacing = "4px";
    ctx.fillText("— T H E   D O M I N U S   C O D E —", 540, 960);

    // ========================================
    // WEBSITE - Small footer
    // ========================================
    ctx.font = "300 12px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fillText("THEDOMINUSCODE.COM", 540, 1000);

    // ========================================
    // SUBTLE VIGNETTE
    // ========================================
    const vignetteGradient = ctx.createRadialGradient(540, 540, 300, 540, 540, 760);
    vignetteGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignetteGradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Convert to image
    const dataUrl = canvas.toDataURL("image/png", 1.0);
    setGeneratedImage(dataUrl);
    setIsGenerating(false);
  }, [selectedQuote, customQuote]);

  // Download generated image
  const downloadQuoteImage = useCallback(() => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.download = "dominus-code-quote.png";
    link.href = generatedImage;
    link.click();
  }, [generatedImage]);

  // Handle checklist
  const toggleChecklistItem = (id: string) => {
    setCheckedItems((prev) => {
      const newItems = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // Check if all items are checked
      if (newItems.length === protocolChecklist.length) {
        setContactUnlocked(true);
      } else {
        setContactUnlocked(false);
      }

      return newItems;
    });
  };

  // Download individual asset
  const downloadAsset = (asset: (typeof assets)[0]) => {
    if (asset.file === "#") {
      alert("Coming soon!");
      return;
    }
    const link = document.createElement("a");
    link.href = asset.file;
    // For PDFs, use the original filename
    if (asset.file.endsWith('.pdf')) {
      link.download = asset.file.split('/').pop() || asset.name;
    } else {
      link.download = asset.name;
    }
    link.click();
  };

  // Download all assets as zip (excluding manifesto video)
  const downloadAllAssets = useCallback(async () => {
    try {
      const zip = new JSZip();
      
      // Assets to include (excluding manifesto video)
      const assetsToDownload = [
        { name: "Headshot_BW.jpg", path: "/images/st-avatar-2021-v4.jpg" },
        { name: "Headshot_Color.jpg", path: "/images/st-avatar-2021-v4.jpg" },
        { name: "Book_Cover.png", path: "/images/book-cover.png" },
        { name: "tdc-icon-gold.png", path: "/images/tdc-icon-gold.png" },
        { name: "tdc-icon-black.png", path: "/images/tdc-icon-black.png" },
        { name: "tdc-icon-blood.png", path: "/images/tdc-icon-blood.png" },
        { name: "tdc-icon-white.png", path: "/images/tdc-icon-white.png" },
        { name: "Dominus_Media_Kit.pdf", path: "/docs/Dominus_Media_Kit.pdf" },
      ];

      // Fetch all assets in parallel and add to zip
      const fetchPromises = assetsToDownload.map(async (asset) => {
        try {
          const response = await fetch(asset.path);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${asset.name}: ${response.status}`);
          }
          const blob = await response.blob();
          zip.file(asset.name, blob);
          return { success: true, name: asset.name };
        } catch (error) {
          console.error(`Failed to fetch ${asset.name}:`, error);
          return { success: false, name: asset.name, error };
        }
      });

      // Wait for all fetches to complete
      const results = await Promise.all(fetchPromises);
      const failed = results.filter(r => !r.success);
      
      if (failed.length > 0) {
        console.warn(`Failed to fetch ${failed.length} asset(s):`, failed.map(f => f.name));
      }

      // Check if we have at least one file
      if (zip.files && Object.keys(zip.files).length === 0) {
        alert("Failed to fetch any assets. Please check your connection and try again.");
        return;
      }

      // Generate zip file
      const zipBlob = await zip.generateAsync({ 
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
      });
      
      // Download zip
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = "thedominuscode-media-assets.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(link.href), 100);
    } catch (error) {
      console.error("Failed to create zip:", error);
      alert("Failed to download assets. Please try again.");
    }
  }, []);

  // Download all icons as zip
  const downloadAllIcons = useCallback(async () => {
    try {
      console.log("Starting icon zip download...");
      const zip = new JSZip();
      const iconFiles = [
        { name: "tdc-icon-gold.png", path: "/images/tdc-icon-gold.png" },
        { name: "tdc-icon-black.png", path: "/images/tdc-icon-black.png" },
        { name: "tdc-icon-blood.png", path: "/images/tdc-icon-blood.png" },
        { name: "tdc-icon-white.png", path: "/images/tdc-icon-white.png" },
      ];

      console.log("Fetching icons...", iconFiles.map(i => i.name));
      
      // Fetch all icons in parallel and add to zip
      const fetchPromises = iconFiles.map(async (icon) => {
        try {
          const response = await fetch(icon.path);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${icon.name}: ${response.status}`);
          }
          const blob = await response.blob();
          zip.file(icon.name, blob);
          console.log(`Added ${icon.name} to zip`);
          return { success: true, name: icon.name };
        } catch (error) {
          console.error(`Failed to fetch ${icon.name}:`, error);
          return { success: false, name: icon.name, error };
        }
      });

      // Wait for all fetches to complete
      const results = await Promise.all(fetchPromises);
      const failed = results.filter(r => !r.success);
      
      if (failed.length > 0) {
        console.warn(`Failed to fetch ${failed.length} icon(s):`, failed.map(f => f.name));
      }

      // Check if we have at least one file
      const fileCount = zip.files ? Object.keys(zip.files).length : 0;
      console.log(`Total files in zip: ${fileCount}`);
      
      if (fileCount === 0) {
        alert("Failed to fetch any icons. Please check your connection and try again.");
        return;
      }

      // Generate zip file
      console.log("Generating zip file...");
      const zipBlob = await zip.generateAsync({ 
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
      });
      
      console.log("Zip generated, size:", zipBlob.size, "bytes");
      
      // Download zip
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = "tdc-icons.zip";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      
      // Clean up after a delay
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        console.log("Download complete and cleaned up");
      }, 100);
    } catch (error) {
      console.error("Failed to create zip:", error);
      alert("Failed to download icons. Please try again.");
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className={`w-2 h-2 bg-${accentColor} animate-pulse`} />
              <span className="font-system text-xs tracking-[0.4em] text-concrete/50 uppercase">
                Classified Access
              </span>
              <div className={`w-2 h-2 bg-${accentColor} animate-pulse`} />
            </div>

            <h1 className="font-law text-5xl md:text-7xl tracking-[0.15em] text-empire mb-6">
              MEDIA PROTOCOLS
            </h1>

            <p className="font-scripture text-xl text-empire/50 max-w-2xl mx-auto mb-4">
              Resources for journalists, podcasters, and media professionals.
            </p>

            <p className="font-system text-xs tracking-[0.2em] text-concrete/40 uppercase mb-10">
              Deploy assets. Extract intelligence. Maintain standards.
            </p>

            <button
              onClick={() => {
                document.getElementById("protocol-rider")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`inline-flex items-center gap-3 px-8 py-4 border-2 font-system text-xs tracking-[0.2em] uppercase transition-all duration-500 group ${
                mode === "dominus"
                  ? "border-blood text-blood hover:bg-blood hover:text-empire"
                  : "border-sovereign text-sovereign hover:bg-sovereign hover:text-void"
              }`}
            >
              <span>Book Spencer for a Podcast</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bio Switcher Section */}
      <section className="py-20 border-t border-concrete/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  downloadAllIcons();
                }}
                className="group relative cursor-pointer"
                title="Download all icons as ZIP"
                aria-label="Download all icons"
                type="button"
              >
                <Crown 
                  size={32} 
                  variant={mode === "dominus" ? "blood" : "gold"}
                  className="transition-transform duration-300 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute -top-1 -right-1 pointer-events-none">
                  <Download className="w-3 h-3 text-sovereign opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire">
                MEDIA RESOURCES
              </h2>
            </div>

            {/* Bio Toggle */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(Object.keys(bios) as Array<keyof typeof bios>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveBio(key)}
                  className={`px-6 py-3 border font-system text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                    activeBio === key
                      ? mode === "dominus"
                        ? "border-blood bg-blood/10 text-empire"
                        : "border-sovereign bg-sovereign/10 text-empire"
                      : "border-concrete/20 text-concrete/50 hover:border-concrete/40"
                  }`}
                >
                  <span className="block">{bios[key].label}</span>
                  <span className="block text-[10px] mt-1 opacity-50">
                    {bios[key].sublabel}
                  </span>
                </button>
              ))}
            </div>

            {/* Bio Content */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBio}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="border border-concrete/20 p-8 bg-void/50"
                >
                  <p className="font-scripture text-lg text-empire/70 leading-relaxed whitespace-pre-line">
                    {bios[activeBio].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Copy Button */}
              <button
                onClick={copyBio}
                className={`absolute top-4 right-4 p-3 border transition-all duration-300 ${
                  copiedBio
                    ? "border-green-500 bg-green-500/10"
                    : "border-concrete/20 hover:border-concrete/40"
                }`}
              >
                {copiedBio ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-concrete/50" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Asset Armory Section */}
      <section className="py-20 border-t border-concrete/10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <Package
                  className={`w-8 h-8 ${
                    mode === "dominus" ? "text-blood" : "text-sovereign"
                  }`}
                />
                <h2 className="font-law text-2xl tracking-[0.1em] text-empire">
                  ASSET ARMORY
                </h2>
              </div>

              {/* Deploy All Button */}
              <button
                onClick={downloadAllAssets}
                className={`group flex items-center gap-3 px-6 py-3 border transition-all duration-300 ${
                  mode === "dominus"
                    ? "border-blood hover:bg-blood/10"
                    : "border-sovereign hover:bg-sovereign/10"
                }`}
              >
                <Zap
                  className={`w-4 h-4 ${
                    mode === "dominus" ? "text-blood" : "text-sovereign"
                  }`}
                />
                <span className="font-system text-xs tracking-[0.2em] uppercase text-empire">
                  Deploy All Assets
                </span>
              </button>
            </div>

            {/* Asset Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {assets.map((asset, index) => (
                <motion.button
                  key={asset.id}
                  onClick={() => downloadAsset(asset)}
                  className="group relative border border-concrete/20 p-6 text-left transition-all duration-300 hover:border-concrete/40 hover:bg-void/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <asset.icon
                    className={`w-10 h-10 mb-4 ${
                      mode === "dominus" ? "text-blood/50" : "text-sovereign/50"
                    } group-hover:${
                      mode === "dominus" ? "text-blood" : "text-sovereign"
                    } transition-colors`}
                  />
                  <h3 className="font-system text-sm tracking-[0.1em] text-empire mb-1">
                    {asset.name}
                  </h3>
                  <p className="font-scripture text-xs text-concrete/50">
                    {asset.description}
                  </p>

                  {/* Download indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download className="w-4 h-4 text-concrete/50" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Identity Section */}
      <section className="py-20 border-t border-concrete/10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Palette
                className={`w-8 h-8 ${
                  mode === "dominus" ? "text-blood" : "text-sovereign"
                }`}
              />
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire">
                VISUAL IDENTITY
              </h2>
            </div>

            <p className="font-scripture text-lg text-empire/50 mb-12">
              The Dominus Code is not just a book; it is an aesthetic. All media coverage should align with this visual language.
            </p>

            {/* The Vibe */}
            <div className="mb-16">
              <h3 className="font-system text-xs tracking-[0.3em] text-concrete/50 uppercase mb-6">
                The Vibe
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-concrete/20 p-8">
                  <p className="font-law text-xl tracking-[0.1em] text-empire mb-4">
                    BRUTALIST LUXURY
                  </p>
                  <p className="font-scripture text-empire/60 leading-relaxed">
                    Raw concrete meets Italian marble. High contrast. Shadow and light. Cinematic stillness.
                  </p>
                </div>
                <div className="border border-concrete/20 p-8">
                  <p className="font-system text-xs tracking-[0.2em] text-concrete/50 uppercase mb-4">
                    Keywords
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Weight", "Architecture", "Silence", "Power", "Order", "Legacy"].map((word) => (
                      <span
                        key={word}
                        className={`px-4 py-2 border font-system text-xs tracking-wider uppercase ${
                          mode === "dominus"
                            ? "border-blood/30 text-blood"
                            : "border-sovereign/30 text-sovereign"
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="mb-16">
              <h3 className="font-system text-xs tracking-[0.3em] text-concrete/50 uppercase mb-6">
                Color Palette
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "Dominus Gold", hex: "#E5C372", usage: "THE MAIN. Headers, accents, CTAs", isPrimary: true },
                  { name: "Void Black", hex: "#000000", usage: "Backgrounds, negative space", isPrimary: false },
                  { name: "Concrete Grey", hex: "#2A2A2A", usage: "Text, secondary elements", isPrimary: false },
                  { name: "Paper White", hex: "#F0F0F0", usage: "Body text for readability", isPrimary: false },
                  { name: "Blood Red", hex: "#8A0000", usage: "Warnings, emphasis (use sparingly)", isPrimary: false },
                ].map((color) => (
                  <div key={color.name} className="group">
                    <div
                      className={`aspect-square border-2 mb-3 relative overflow-hidden ${
                        color.isPrimary ? "border-sovereign" : "border-concrete/20"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {color.isPrimary && (
                        <div className="absolute top-2 right-2">
                          <span className="font-system text-[8px] tracking-wider uppercase bg-void/80 px-2 py-1 text-sovereign">
                            Primary
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-void/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(color.hex);
                          }}
                          className="font-system text-[10px] text-empire/80 hover:text-sovereign transition-colors flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          {color.hex}
                        </button>
                      </div>
                    </div>
                    <p className="font-system text-xs tracking-wider text-empire mb-1">
                      {color.name}
                    </p>
                    <p className="font-scripture text-[11px] text-concrete/50 leading-tight">
                      {color.usage}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Type className={`w-5 h-5 ${mode === "dominus" ? "text-blood" : "text-sovereign"}`} />
                <h3 className="font-system text-xs tracking-[0.3em] text-concrete/50 uppercase">
                  Typography
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Font: Cinzel */}
                <div className="border border-concrete/20 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <p className="font-law text-2xl tracking-[0.15em] text-empire">
                        CINZEL
                      </p>
                      <p className="font-system text-[10px] tracking-wider text-concrete/50 uppercase mt-1">
                        The Law — Display & Headlines
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-sovereign/10 border border-sovereign/30 font-system text-[10px] tracking-wider text-sovereign uppercase">
                        Headers
                      </span>
                      <span className="px-3 py-1 bg-sovereign/10 border border-sovereign/30 font-system text-[10px] tracking-wider text-sovereign uppercase">
                        Titles
                      </span>
                    </div>
                  </div>
                  <p className="font-law text-4xl tracking-[0.1em] text-empire/80 mb-2">
                    THE DOMINUS CODE
                  </p>
                  <p className="font-scripture text-sm text-concrete/50">
                    Used for all headlines, section titles, and impactful statements. Always uppercase. Wide letter-spacing (0.1em - 0.2em).
                  </p>
                </div>

                {/* Font: Cormorant Garamond */}
                <div className="border border-concrete/20 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <p className="font-scripture text-2xl text-empire">
                        Cormorant Garamond
                      </p>
                      <p className="font-system text-[10px] tracking-wider text-concrete/50 uppercase mt-1">
                        The Scripture — Body & Quotes
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-sovereign/10 border border-sovereign/30 font-system text-[10px] tracking-wider text-sovereign uppercase">
                        Body
                      </span>
                      <span className="px-3 py-1 bg-sovereign/10 border border-sovereign/30 font-system text-[10px] tracking-wider text-sovereign uppercase">
                        Quotes
                      </span>
                    </div>
                  </div>
                  <p className="font-scripture text-xl text-empire/80 italic mb-2">
                    &ldquo;The boy wants recognition. The man wants mastery.&rdquo;
                  </p>
                  <p className="font-scripture text-sm text-concrete/50">
                    Used for body text, quotes, and descriptive content. Elegant and readable. Often italicized for quotes.
                  </p>
                </div>

                {/* Font: Montserrat */}
                <div className="border border-concrete/20 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <p className="font-system text-lg tracking-[0.1em] text-empire">
                        MONTSERRAT LIGHT
                      </p>
                      <p className="font-system text-[10px] tracking-wider text-concrete/50 uppercase mt-1">
                        The System — UI & Labels
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-sovereign/10 border border-sovereign/30 font-system text-[10px] tracking-wider text-sovereign uppercase">
                        Labels
                      </span>
                      <span className="px-3 py-1 bg-sovereign/10 border border-sovereign/30 font-system text-[10px] tracking-wider text-sovereign uppercase">
                        UI
                      </span>
                      <span className="px-3 py-1 bg-sovereign/10 border border-sovereign/30 font-system text-[10px] tracking-wider text-sovereign uppercase">
                        Buttons
                      </span>
                    </div>
                  </div>
                  <p className="font-system text-sm tracking-[0.2em] uppercase text-empire/80 mb-2">
                    APPLICATION REQUIRED • ENTER THE CODE
                  </p>
                  <p className="font-scripture text-sm text-concrete/50">
                    Used for UI elements, buttons, labels, and system text. Always uppercase with wide letter-spacing (0.2em - 0.4em). Light weight (300).
                  </p>
                </div>
              </div>
            </div>

            {/* Imagery Rules */}
            <div className="mb-16">
              <h3 className="font-system text-xs tracking-[0.3em] text-concrete/50 uppercase mb-6">
                Imagery Rules
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* DO */}
                <div className="border border-green-500/30 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="font-system text-xs tracking-[0.2em] text-green-500 uppercase">
                      Do Use
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Black and white portraits",
                      "Silhouettes against light",
                      "Images of physical strength (gym, nature)",
                      "Architectural lines and structures",
                      "Sharp, fitted clothing (black t-shirts, tailored suits)",
                      "Training gear and athletic imagery",
                      "High contrast, cinematic lighting",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="font-scripture text-sm text-empire/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DON'T */}
                <div className="border border-blood/30 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Ban className="w-5 h-5 text-blood" />
                    <p className="font-system text-xs tracking-[0.2em] text-blood uppercase">
                      Never Use
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Bright, commercial smiles",
                      "Generic stock photos of 'businessmen'",
                      "Cluttered or busy backgrounds",
                      "Rounded corners or soft edges",
                      "Pastel or muted color palettes",
                      "Casual or sloppy appearance",
                      "Low-quality or pixelated images",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Ban className="w-4 h-4 text-blood mt-0.5 shrink-0" />
                        <span className="font-scripture text-sm text-empire/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Design Principles */}
            <div>
              <h3 className="font-system text-xs tracking-[0.3em] text-concrete/50 uppercase mb-6">
                Design Principles
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "No Rounded Corners",
                    description: "Everything is sharp. Buttons, cards, images—all use 0px border-radius. Brutalism demands edges.",
                  },
                  {
                    title: "1px Borders",
                    description: "Thin, precise borders define structure. Never thick or heavy. Subtle separation, not division.",
                  },
                  {
                    title: "Slow Animations",
                    description: "Transitions are deliberate and weighty. 0.8s - 1.5s duration. Ease-out timing. Nothing bouncy or playful.",
                  },
                  {
                    title: "High Contrast",
                    description: "Gold on black. White on void. No muddy mid-tones. Text must be immediately legible.",
                  },
                  {
                    title: "Generous Spacing",
                    description: "Let elements breathe. Large padding. Negative space is a feature, not waste. Luxury needs room.",
                  },
                  {
                    title: "Texture & Grain",
                    description: "Subtle noise overlay on backgrounds. Film grain aesthetic. Never flat or sterile.",
                  },
                ].map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    className="border border-concrete/20 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <p className={`font-system text-sm tracking-wider uppercase mb-3 ${
                      mode === "dominus" ? "text-blood" : "text-sovereign"
                    }`}>
                      {principle.title}
                    </p>
                    <p className="font-scripture text-sm text-empire/60 leading-relaxed">
                      {principle.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Forger Section */}
      <section className="py-20 border-t border-concrete/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Zap
                className={`w-8 h-8 ${
                  mode === "dominus" ? "text-blood" : "text-sovereign"
                }`}
              />
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire">
                QUOTE FORGER
              </h2>
            </div>

            <p className="font-scripture text-lg text-empire/50 mb-8">
              Generate branded social tiles instantly. Control the aesthetic.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="space-y-6">
                {/* Quote Selector */}
                <div>
                  <label className="font-system text-xs tracking-[0.2em] text-concrete/50 uppercase block mb-3">
                    Select Quote
                  </label>
                  <select
                    value={selectedQuote}
                    onChange={(e) => {
                      setSelectedQuote(e.target.value);
                      setCustomQuote("");
                    }}
                    className="w-full bg-void border border-concrete/20 p-4 font-scripture text-empire focus:border-sovereign outline-none"
                  >
                    {quotes.map((quote) => (
                      <option key={quote} value={quote}>
                        {quote}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Quote */}
                <div>
                  <label className="font-system text-xs tracking-[0.2em] text-concrete/50 uppercase block mb-3">
                    Or Enter Custom Quote
                  </label>
                  <textarea
                    value={customQuote}
                    onChange={(e) => setCustomQuote(e.target.value)}
                    placeholder="Type your own pull-quote..."
                    rows={3}
                    className="w-full bg-void border border-concrete/20 p-4 font-scripture text-empire placeholder:text-concrete/30 focus:border-sovereign outline-none resize-none"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateQuoteImage}
                  disabled={isGenerating}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 font-system text-xs tracking-[0.2em] uppercase transition-all ${
                    mode === "dominus"
                      ? "bg-blood text-empire hover:bg-blood/90"
                      : "bg-sovereign text-void hover:bg-sovereign/90"
                  } ${isGenerating ? "opacity-50" : ""}`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin" />
                      <span>Forging...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Generate Transmission</span>
                    </>
                  )}
                </button>
              </div>

              {/* Preview */}
              <div className="relative">
                <div className="aspect-square border border-concrete/20 bg-void/50 flex items-center justify-center overflow-hidden">
                  {generatedImage ? (
                    <img
                      src={generatedImage}
                      alt="Generated quote"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <ImageIcon className="w-12 h-12 text-concrete/20 mx-auto mb-4" />
                      <p className="font-system text-xs text-concrete/30 uppercase tracking-wider">
                        Preview will appear here
                      </p>
                    </div>
                  )}
                </div>

                {generatedImage && (
                  <button
                    onClick={downloadQuoteImage}
                    className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-void/90 border border-concrete/30 font-system text-xs tracking-wider uppercase text-empire hover:border-sovereign transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interview Questions Section */}
      <section className="py-20 border-t border-concrete/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <FileText
                className={`w-8 h-8 ${
                  mode === "dominus" ? "text-blood" : "text-sovereign"
                }`}
              />
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire">
                HIGH-VOLTAGE QUESTIONS
              </h2>
            </div>

            <p className="font-scripture text-lg text-empire/50 mb-8">
              Skip the small talk. These questions spark the best conversations.
            </p>

            <div className="space-y-4">
              {interviewQuestions.map((question, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-6 border border-concrete/20 hover:border-concrete/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <span
                    className={`font-system text-sm ${
                      mode === "dominus" ? "text-blood" : "text-sovereign"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-scripture text-empire/70 italic">
                    {question}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Protocol Rider Section */}
      <section id="protocol-rider" className="py-20 border-t border-concrete/10">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Shield
                className={`w-8 h-8 ${
                  mode === "dominus" ? "text-blood" : "text-sovereign"
                }`}
              />
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire">
                PROTOCOL RIDER
              </h2>
            </div>

            <p className="font-scripture text-lg text-empire/50 mb-12">
              Before requesting an interview, confirm you meet the standard.
            </p>

            {/* Checklist */}
            <div className="space-y-4 mb-12 text-left max-w-xl mx-auto">
              {protocolChecklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`w-full flex items-start gap-4 p-5 border transition-all duration-300 ${
                    checkedItems.includes(item.id)
                      ? mode === "dominus"
                        ? "border-blood bg-blood/5"
                        : "border-sovereign bg-sovereign/5"
                      : "border-concrete/20 hover:border-concrete/40"
                  }`}
                >
                  <div
                    className={`w-6 h-6 border flex items-center justify-center flex-shrink-0 transition-all ${
                      checkedItems.includes(item.id)
                        ? mode === "dominus"
                          ? "border-blood bg-blood"
                          : "border-sovereign bg-sovereign"
                        : "border-concrete/30"
                    }`}
                  >
                    {checkedItems.includes(item.id) && (
                      <Check className="w-4 h-4 text-void" />
                    )}
                  </div>
                  <span
                    className={`font-scripture text-left ${
                      checkedItems.includes(item.id)
                        ? "text-empire"
                        : "text-empire/60"
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Contact Button */}
            <AnimatePresence mode="wait">
              {contactUnlocked ? (
                <motion.a
                  key="unlocked"
                  href="mailto:media@thedominuscode.com"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`inline-flex items-center gap-3 px-8 py-4 font-system text-xs tracking-[0.2em] uppercase transition-all ${
                    mode === "dominus"
                      ? "bg-blood text-empire hover:bg-blood/90"
                      : "bg-sovereign text-void hover:bg-sovereign/90"
                  }`}
                >
                  <Unlock className="w-4 h-4" />
                  <span>Contact: media@thedominuscode.com</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              ) : (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-concrete/10 font-system text-xs tracking-[0.2em] uppercase text-concrete/30 cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  <span>Complete Protocol to Unlock</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Book Info */}
      <section className="py-20 border-t border-concrete/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border border-concrete/20 p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="font-system text-xs tracking-[0.3em] text-concrete/50 uppercase mb-4">
                  The Book
                </p>
                <h3 className="font-law text-3xl tracking-[0.1em] text-empire mb-2">
                  THE DOMINUS CODE
                </h3>
                <p className="font-scripture text-lg text-empire/50 italic mb-6">
                  Fuck Monogamy. Build a Dynasty.
                </p>
                <div className="space-y-2 font-system text-sm text-empire/60">
                  <p>
                    <span className="text-concrete/50">Author:</span> Spencer
                    Tarring
                  </p>
                  <p>
                    <span className="text-concrete/50">Genre:</span> Masculinity
                    / Philosophy / Strategy
                  </p>
                  <p>
                    <span className="text-concrete/50">Release:</span> January
                    2026
                  </p>
                </div>
              </div>
              <div>
                <p className="font-system text-xs tracking-[0.3em] text-concrete/50 uppercase mb-4">
                  The Hook
                </p>
                <p className="font-scripture text-empire/70 leading-relaxed">
                  Modern masculinity is broken because it apologizes for its own
                  nature. <em>The Dominus Code</em> is not a self-help book; it
                  is a demolition of the &ldquo;soft life&rdquo; and a blueprint for the{" "}
                  <strong>Sovereign Individual</strong>. It argues that the
                  &ldquo;Prime Directive&rdquo; of a man is not happiness, but{" "}
                  <strong>Species Expansion</strong>—building a multi-woman,
                  multi-generational dynasty rooted in strict hierarchy,
                  discipline, and capital.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

