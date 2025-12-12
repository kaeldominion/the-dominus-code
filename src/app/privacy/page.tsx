"use client";

import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPage() {
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
              PRIVACY PROTOCOL
            </h1>
            <p className="font-scripture text-xl text-empire/60 italic">
              Sovereignty over your data. Transparency in our operations.
            </p>
            <p className="font-system text-sm text-concrete/50 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                The Foundation
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  The Dominus Code operates on principles of sovereignty and transparency. 
                  We do not sell your data. We do not trade your information. We protect what 
                  you entrust to us.
                </p>
                <p>
                  This Privacy Protocol outlines how we collect, use, and protect your 
                  information when you interact with The Dominus Code website, purchase 
                  products, or join The Council.
                </p>
              </div>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Information We Collect
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  <strong className="text-empire">Account Information:</strong> When you 
                  register, we collect your email address, name, and any profile information 
                  you choose to provide.
                </p>
                <p>
                  <strong className="text-empire">Purchase Information:</strong> When you 
                  purchase products, we collect payment information through secure third-party 
                  processors (Stripe). We do not store your full payment details.
                </p>
                <p>
                  <strong className="text-empire">Usage Data:</strong> We collect information 
                  about how you interact with our website, including pages visited, time spent, 
                  and actions taken. This helps us improve the experience.
                </p>
                <p>
                  <strong className="text-empire">Communication:</strong> When you contact us, 
                  apply to The Council, or submit forms, we collect the information you provide.
                </p>
              </div>
            </motion.div>

            {/* How We Use Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                How We Use Your Information
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Provide access to digital products and The Council</li>
                  <li>Communicate with you about your account, orders, and services</li>
                  <li>Send you updates about The Dominus Code (you can unsubscribe at any time)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Data Protection
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  We implement industry-standard security measures to protect your information. 
                  This includes encryption, secure servers, and restricted access to personal data.
                </p>
                <p>
                  However, no method of transmission over the internet is 100% secure. While we 
                  strive to protect your data, we cannot guarantee absolute security.
                </p>
              </div>
            </motion.div>

            {/* Third-Party Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Third-Party Services
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  We use trusted third-party services to operate our business:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-empire">Stripe:</strong> Payment processing</li>
                  <li><strong className="text-empire">Vercel:</strong> Website hosting</li>
                  <li><strong className="text-empire">Email Services:</strong> For communications</li>
                </ul>
                <p>
                  These services have their own privacy policies. We do not control how they use 
                  your data, but we only work with services that meet our standards for data protection.
                </p>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Your Rights
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
                <p>
                  To exercise these rights, contact us at the email address provided below.
                </p>
              </div>
            </motion.div>

            {/* Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Cookies
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  We use cookies to enhance your experience, analyze site usage, and assist 
                  with marketing efforts. You can control cookies through your browser settings.
                </p>
              </div>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Children's Privacy
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  The Dominus Code is intended for adults. We do not knowingly collect 
                  information from individuals under 18 years of age.
                </p>
              </div>
            </motion.div>

            {/* Changes to This Protocol */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Changes to This Protocol
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  We may update this Privacy Protocol from time to time. We will notify you 
                  of significant changes by posting the new protocol on this page and updating 
                  the "Last updated" date.
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="border-t border-concrete/10 pt-8"
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Contact
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  For questions about this Privacy Protocol or to exercise your rights, 
                  contact us at:
                </p>
                <p className="font-system text-empire">
                  <Link href="mailto:contact@thedominuscode.com" className="hover:text-sovereign transition-colors">
                    contact@thedominuscode.com
                  </Link>
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

