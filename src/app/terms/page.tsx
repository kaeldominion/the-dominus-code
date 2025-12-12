"use client";

import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
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
              TERMS OF SERVICE
            </h1>
            <p className="font-scripture text-xl text-empire/60 italic">
              The rules of engagement. The boundaries of sovereignty.
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
                Acceptance of Terms
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  By accessing and using The Dominus Code website, purchasing products, or 
                  joining The Council, you agree to be bound by these Terms of Service. 
                  If you do not agree, do not use our services.
                </p>
                <p>
                  These terms apply to all users, including visitors, customers, and members 
                  of The Council.
                </p>
              </div>
            </motion.div>

            {/* Use of Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Use of Service
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>You agree to use our services only for lawful purposes and in accordance 
                with these terms. You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit harmful code, viruses, or malware</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Use our content for commercial purposes without permission</li>
                  <li>Impersonate others or provide false information</li>
                </ul>
              </div>
            </motion.div>

            {/* Products and Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Products and Services
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  <strong className="text-empire">Digital Products:</strong> Upon purchase, 
                  you receive a license to access and use digital products for personal use. 
                  You may not redistribute, resell, or share access to digital products.
                </p>
                <p>
                  <strong className="text-empire">Physical Products:</strong> Physical products 
                  are subject to shipping terms and availability. We reserve the right to cancel 
                  orders if products are unavailable.
                </p>
                <p>
                  <strong className="text-empire">The Council:</strong> Membership in The Council 
                  is subject to application and acceptance. Membership terms, pricing, and benefits 
                  are outlined separately and may change with notice.
                </p>
              </div>
            </motion.div>

            {/* Payment Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Payment Terms
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  All prices are in USD unless otherwise stated. Payment is required at the 
                  time of purchase. We use secure third-party payment processors (Stripe) 
                  to handle transactions.
                </p>
                <p>
                  By making a purchase, you represent that you have the legal right to use 
                  the payment method provided.
                </p>
              </div>
            </motion.div>

            {/* Refund Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Refund Policy
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  <strong className="text-empire">Digital Products:</strong> Due to the 
                  immediate nature of digital delivery, all sales of digital products are 
                  final. No refunds will be issued for digital products once access has been 
                  granted.
                </p>
                <p>
                  <strong className="text-empire">Physical Products:</strong> Physical products 
                  may be returned within 30 days of delivery if defective or damaged. Returns 
                  must be in original condition. Contact us for return authorization.
                </p>
                <p>
                  <strong className="text-empire">The Council:</strong> Council membership 
                  fees are non-refundable. You may cancel your membership at any time, but 
                  you will not receive a refund for the current billing period.
                </p>
              </div>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Intellectual Property
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  All content on The Dominus Code website, including text, graphics, logos, 
                  images, and software, is the property of Spencer Tarring or its licensors 
                  and is protected by copyright and trademark laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works, publicly 
                  display, or use our content without express written permission.
                </p>
                <p>
                  When you purchase a product, you receive a license to use that product 
                  according to its terms. You do not own the intellectual property.
                </p>
              </div>
            </motion.div>

            {/* User Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                User Content
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  If you submit content to us (such as Oath Wall signatures, testimonials, 
                  or Council applications), you grant us a license to use, display, and 
                  distribute that content in connection with our services.
                </p>
                <p>
                  You represent that you own or have the right to submit the content and 
                  that it does not violate any third-party rights.
                </p>
              </div>
            </motion.div>

            {/* Disclaimers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Disclaimers
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  The Dominus Code is provided "as is" without warranties of any kind, 
                  express or implied. We do not guarantee that our services will be 
                  uninterrupted, secure, or error-free.
                </p>
                <p>
                  The content and advice provided are for informational and educational 
                  purposes. Results may vary. We are not responsible for decisions made 
                  based on our content.
                </p>
              </div>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Limitation of Liability
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  To the maximum extent permitted by law, Spencer Tarring and The Dominus 
                  Code shall not be liable for any indirect, incidental, special, or 
                  consequential damages arising from your use of our services.
                </p>
                <p>
                  Our total liability shall not exceed the amount you paid for the specific 
                  product or service giving rise to the claim.
                </p>
              </div>
            </motion.div>

            {/* Indemnification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Indemnification
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  You agree to indemnify and hold harmless Spencer Tarring and The Dominus 
                  Code from any claims, damages, losses, or expenses arising from your use 
                  of our services or violation of these terms.
                </p>
              </div>
            </motion.div>

            {/* Termination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Termination
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  We reserve the right to terminate or suspend your access to our services 
                  at any time, with or without cause, with or without notice.
                </p>
                <p>
                  Upon termination, your right to use our services immediately ceases. 
                  Provisions that by their nature should survive termination shall survive.
                </p>
              </div>
            </motion.div>

            {/* Changes to Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Changes to Terms
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  We may modify these terms at any time. We will notify you of significant 
                  changes by posting the updated terms on this page and updating the 
                  "Last updated" date.
                </p>
                <p>
                  Your continued use of our services after changes constitutes acceptance 
                  of the new terms.
                </p>
              </div>
            </motion.div>

            {/* Governing Law */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Governing Law
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  These terms shall be governed by and construed in accordance with the 
                  laws of the jurisdiction in which Spencer Tarring operates, without 
                  regard to conflict of law provisions.
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="border-t border-concrete/10 pt-8"
            >
              <h2 className="font-law text-2xl tracking-[0.1em] text-empire mb-4 uppercase">
                Contact
              </h2>
              <div className="font-scripture text-empire/80 leading-relaxed space-y-4">
                <p>
                  For questions about these Terms of Service, contact us at:
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

