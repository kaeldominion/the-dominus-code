"use client";

import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";
import {
  Users,
  Video,
  MessageSquare,
  Calendar,
  Lock,
  Check,
  Star,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Video,
    title: "Monthly Councils",
    description:
      "Live video sessions with Spencer. Strategy. Accountability. Real talk.",
  },
  {
    icon: MessageSquare,
    title: "Private Channel",
    description:
      "Direct access to the inner circle. Questions answered within 24 hours.",
  },
  {
    icon: Users,
    title: "The Brotherhood",
    description:
      "Connect with other sovereigns. Network with men who get it.",
  },
  {
    icon: Calendar,
    title: "Quarterly Reviews",
    description:
      "Structured check-ins to assess progress and recalibrate strategy.",
  },
];

const testimonials = [
  {
    quote:
      "The Council changed everything. Having direct access to Spencer and men operating at this level—there's nothing else like it.",
    name: "MARCUS V.",
    role: "Founder, 3 companies",
  },
  {
    quote:
      "I came in with questions about my relationships. I left with a complete operating system for my life.",
    name: "JAMES K.",
    role: "Entrepreneur",
  },
  {
    quote:
      "Worth 100x the investment. The connections alone have generated more value than I can measure.",
    name: "DAVID R.",
    role: "Tech Executive",
  },
];

export default function CouncilPage() {
  const { mode } = useApp();

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 mb-4">
              <Lock className="w-4 h-4 text-gold" />
              <span className="font-display text-xs tracking-[0.3em] text-gold">
                APPLICATION REQUIRED
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-sovereign/50 mb-8">
              <span className="font-display text-xs tracking-[0.3em] text-sovereign">
                COMING SOON
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-ivory mb-6">
              THE COUNCIL
            </h1>
            <p className="font-body text-xl text-ivory/60 max-w-2xl mx-auto mb-4">
              You have read the map. Now walk the path.
            </p>
            <p className="font-body text-lg text-ivory/40 max-w-xl mx-auto mb-10">
              The inner circle for men ready to implement The Dominus Code at
              the highest level. Direct access. Real accountability. No
              bullshit.
            </p>
            <p className="font-body text-lg text-sovereign/80 max-w-xl mx-auto mb-10 italic">
              The Council is launching soon. Submit your application to join the waitlist.
            </p>
            
            <Link href="/council/apply">
              <Button
                variant={mode === "dominus" ? "blood" : "primary"}
                size="lg"
                icon
              >
                Apply Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card-brutal p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <feature.icon
                  className={`w-10 h-10 mb-6 ${
                    mode === "dominus" ? "text-blood" : "text-gold"
                  }`}
                />
                <h3 className="font-display text-lg tracking-[0.1em] text-ivory mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-ivory/60">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 border-t border-gold/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl tracking-[0.1em] text-ivory mb-4">
              WHAT&apos;S INSIDE
            </h2>
          </motion.div>

          <motion.div
            className="glass p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ul className="space-y-6">
              {[
                "Monthly live council sessions with Spencer (recorded)",
                "Private community access—vetted members only",
                "Direct messaging access to Spencer",
                "Quarterly 1-on-1 strategy calls",
                "Guest sessions with 'older pirates'—men who've walked the path",
                "The complete Dominus OS (Notion system)",
                "Early access to all new content and products",
                "Lifetime access to The Dominus Code digital library",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <Check
                    className={`w-5 h-5 mt-1 flex-shrink-0 ${
                      mode === "dominus" ? "text-blood" : "text-gold"
                    }`}
                  />
                  <span className="font-body text-lg text-ivory/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl tracking-[0.1em] text-ivory mb-4">
              FROM THE COUNCIL
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="card-brutal p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-gold fill-gold"
                    />
                  ))}
                </div>
                <blockquote className="font-body text-ivory/80 italic mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer>
                  <p className="font-display text-sm tracking-widest text-gold">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-xs text-ivory/40 mt-1">
                    {testimonial.role}
                  </p>
                </footer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-gold/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Crown
              size={48}
              variant={mode === "dominus" ? "blood" : "gold"}
              className="mx-auto mb-8"
            />
            <h2 className="font-display text-3xl tracking-[0.1em] text-ivory mb-8">
              THE INVESTMENT
            </h2>

            <div className="glass p-8 md:p-12 mb-8">
              <div className="mb-6">
                <span className="font-impact text-6xl md:text-7xl text-gold">
                  $497
                </span>
                <span className="font-body text-xl text-ivory/50">/month</span>
              </div>
              <p className="font-body text-ivory/60 mb-8">
                or $4,997/year (save 2 months)
              </p>
              <Link href="/council/apply" className="block">
                <Button
                  variant={mode === "dominus" ? "blood" : "primary"}
                  size="lg"
                  className="w-full"
                >
                  Apply for The Council
                </Button>
              </Link>
              <p className="font-body text-xs text-sovereign/60 mt-4">
                The Council is launching soon. Submit your application to join the waitlist.
              </p>
            </div>

            <p className="font-body text-ivory/50 text-sm">
              This is not for everyone. If you&apos;re looking for motivation or
              hand-holding, look elsewhere. The Council is for men ready to
              execute.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-gold/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.blockquote
            className="font-body text-2xl md:text-3xl italic text-ivory/80 leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            &ldquo;The men who change the world are the ones who refuse to wait
            for permission.&rdquo;
          </motion.blockquote>
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <cite className="font-display text-sm tracking-[0.3em] text-gold not-italic">
              — THE DOMINUS CODE
            </cite>
          </motion.footer>
        </div>
      </section>

      <Footer />
    </main>
  );
}

