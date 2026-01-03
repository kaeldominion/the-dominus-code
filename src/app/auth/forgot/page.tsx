"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { mode } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // For now, just show a message - implement password reset later
    setTimeout(() => {
      setMessage("Password reset functionality coming soon. Please contact support.");
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-obsidian/90 border border-gold/20 p-8 backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              <Crown
                size={48}
                variant={mode === "dominus" ? "blood" : "gold"}
              />
            </div>

            <h1 className="font-display text-3xl text-center mb-2 tracking-[0.2em] text-ivory">
              RESET PASSWORD
            </h1>
            <p className="font-body text-sm text-center text-ivory/60 mb-8">
              Enter your email to receive reset instructions
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block font-display text-xs text-gold mb-2 tracking-[0.1em] uppercase"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-void border border-gold/20 px-4 py-3 text-ivory font-body focus:outline-none focus:border-gold transition-colors"
                  placeholder="admin@thedominuscode.com"
                />
              </div>

              {message && (
                <div className="p-4 bg-gold/10 border border-gold/30 text-gold text-sm font-body">
                  {message}
                </div>
              )}

              <Button
                type="submit"
                variant={mode === "dominus" ? "blood" : "primary"}
                disabled={loading}
                className="w-full"
              >
                {loading ? "SENDING..." : "SEND RESET LINK"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="font-body text-sm text-ivory/60 hover:text-gold transition-colors"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

