"use client";

import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, MessageSquare, FileText, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const { mode } = useApp();

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
              CONTACT
            </h1>
            <p className="font-scripture text-xl text-empire/60 italic">
              Direct lines. Clear communication. No gatekeepers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            {/* General Inquiries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border border-concrete/10 p-8 md:p-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <Mail className={`w-6 h-6 ${mode === "dominus" ? "text-blood" : "text-sovereign"}`} />
                <h2 className="font-law text-2xl tracking-[0.1em] text-empire uppercase">
                  General Inquiries
                </h2>
              </div>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  For questions about The Dominus Code, products, orders, or general 
                  information, reach out to:
                </p>
                <p className="font-system text-empire text-lg">
                  <a 
                    href="mailto:contact@thedominuscode.com" 
                    className="hover:text-sovereign transition-colors"
                  >
                    contact@thedominuscode.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Media Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="border border-concrete/10 p-8 md:p-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <FileText className={`w-6 h-6 ${mode === "dominus" ? "text-blood" : "text-sovereign"}`} />
                <h2 className="font-law text-2xl tracking-[0.1em] text-empire uppercase">
                  Media & Press
                </h2>
              </div>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4 mb-6">
                <p>
                  For media inquiries, interview requests, press kits, and speaking 
                  engagements, visit our Media page for comprehensive resources:
                </p>
              </div>
              <Link href="/media">
                <Button
                  variant={mode === "dominus" ? "blood" : "primary"}
                  size="lg"
                  icon
                  className="group"
                >
                  View Media Resources
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="font-system text-sm text-concrete/50 mt-4">
                Or contact directly: <a 
                  href="mailto:media@thedominuscode.com" 
                  className="text-empire hover:text-sovereign transition-colors"
                >
                  media@thedominuscode.com
                </a>
              </p>
            </motion.div>

            {/* The Council */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-concrete/10 p-8 md:p-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <MessageSquare className={`w-6 h-6 ${mode === "dominus" ? "text-blood" : "text-sovereign"}`} />
                <h2 className="font-law text-2xl tracking-[0.1em] text-empire uppercase">
                  The Council
                </h2>
              </div>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  Interested in joining The Council? Applications are now open. 
                  Learn more and apply:
                </p>
                <Link href="/council">
                  <Button
                    variant="secondary"
                    size="lg"
                  >
                    View The Council
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border-t border-concrete/10 pt-8"
            >
              <h2 className="font-law text-xl tracking-[0.1em] text-empire mb-4 uppercase">
                Response Time
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-2">
                <p>
                  We aim to respond to all inquiries within 48 hours. For urgent 
                  matters related to existing orders or Council membership, please 
                  indicate "URGENT" in your subject line.
                </p>
                <p className="text-concrete/60 text-sm">
                  Media inquiries may take 3-5 business days during high-volume periods.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

