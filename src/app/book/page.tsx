"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";

export default function BookPage() {
  const { mode } = useApp();
  const [bookContent, setBookContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add noindex meta tag
    const metaRobots = document.createElement("meta");
    metaRobots.name = "robots";
    metaRobots.content = "noindex, nofollow, noarchive, nosnippet";
    document.head.appendChild(metaRobots);

    const metaGooglebot = document.createElement("meta");
    metaGooglebot.name = "googlebot";
    metaGooglebot.content = "noindex, nofollow, noarchive, nosnippet";
    document.head.appendChild(metaGooglebot);

    // Fetch the book content from the API route with authorization
    fetch("/api/book", {
      headers: {
        Authorization: "Bearer SPENCER_IS_KING_2026",
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized");
          }
          throw new Error(`Failed to load: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        setBookContent(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading book:", error);
        setBookContent(error.message === "Unauthorized" 
          ? "Access denied. Authorization required." 
          : "Error loading book content.");
        setLoading(false);
      });

    return () => {
      // Cleanup meta tags on unmount
      document.head.removeChild(metaRobots);
      document.head.removeChild(metaGooglebot);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Crown
              size={48}
              variant={mode === "dominus" ? "blood" : "gold"}
              className="mx-auto mb-8"
            />
            <h1 className="font-law text-4xl md:text-6xl tracking-[0.1em] text-empire mb-6">
              THE DOMINUS CODE
            </h1>
            <p className="font-scripture text-xl text-empire/50 max-w-2xl mx-auto">
              The full text. Access granted.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <p className="font-system text-sm tracking-wider text-concrete/50 uppercase">
                Loading...
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="border border-concrete/20 p-8 md:p-12 bg-void/50"
            >
              <pre className="font-scripture text-sm md:text-base text-empire/80 leading-relaxed whitespace-pre-wrap font-normal">
                {bookContent}
              </pre>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
