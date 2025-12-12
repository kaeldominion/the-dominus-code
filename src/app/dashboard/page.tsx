"use client";

import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";
import {
  BookOpen,
  Download,
  Users,
  Award,
  Calendar,
  ArrowRight,
  Play,
} from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    icon: BookOpen,
    title: "The Dominus Code",
    description: "Access your digital copy",
    href: "/dashboard/library",
  },
  {
    icon: Download,
    title: "The Dominus OS",
    description: "Download Notion templates",
    href: "/dashboard/downloads",
  },
  {
    icon: Users,
    title: "The Council",
    description: "Coming Soon",
    href: "/council",
  },
  {
    icon: Award,
    title: "Your Oath",
    description: "View your sworn oath",
    href: "/oath",
  },
];

const upcomingEvents = [
  {
    title: "Monthly Council Call",
    date: "Coming Soon",
    time: "TBA",
    type: "Coming Soon",
  },
  {
    title: "Q4 Review Session",
    date: "Dec 28, 2024",
    time: "6:00 PM EST",
    type: "Workshop",
  },
];

const recentContent = [
  {
    title: "The Protocol: Week 1 Audio",
    type: "Audio",
    duration: "24 min",
  },
  {
    title: "Frame Control Masterclass",
    type: "Video",
    duration: "47 min",
  },
  {
    title: "Dynasty Planning Template",
    type: "Download",
    duration: null,
  },
];

export default function DashboardPage() {
  const { mode } = useApp();

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Welcome */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Crown
                size={32}
                variant={mode === "dominus" ? "blood" : "gold"}
              />
              <h1 className="font-display text-3xl tracking-[0.1em] text-ivory">
                WELCOME, SOVEREIGN
              </h1>
            </div>
            <p className="font-body text-ivory/60">
              Your command center awaits. Continue building the dynasty.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {quickActions.map((action, index) => (
              <Link key={action.title} href={action.href}>
                <motion.div
                  className="card-brutal p-6 h-full group cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <action.icon
                    className={`w-8 h-8 mb-4 ${
                      mode === "dominus" ? "text-blood" : "text-gold"
                    }`}
                  />
                  <h3 className="font-display text-sm tracking-[0.1em] text-ivory mb-2">
                    {action.title}
                  </h3>
                  <p className="font-body text-xs text-ivory/50">
                    {action.description}
                  </p>
                  <ArrowRight className="w-4 h-4 text-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sovereignty Score */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="glass p-8 text-center h-full">
                <h2 className="font-display text-sm tracking-[0.2em] text-gold mb-6">
                  YOUR SOVEREIGNTY SCORE
                </h2>
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="rgba(229, 195, 114, 0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke={mode === "dominus" ? "#8a0303" : "#e5c372"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(42 / 50) * 440} 440`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-impact text-5xl text-ivory">42</span>
                  </div>
                </div>
                <p className="font-display text-lg tracking-[0.2em] text-gold-light mb-2">
                  AWAKENING
                </p>
                <p className="font-body text-sm text-ivory/50">
                  +8 points since last assessment
                </p>
                <Button variant="secondary" className="mt-6 w-full" size="sm">
                  Retake Assessment
                </Button>
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="glass p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar
                    className={`w-5 h-5 ${
                      mode === "dominus" ? "text-blood" : "text-gold"
                    }`}
                  />
                  <h2 className="font-display text-sm tracking-[0.2em] text-gold">
                    UPCOMING
                  </h2>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.title}
                      className="p-4 border border-gold/10 bg-obsidian/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display text-sm text-ivory">
                          {event.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-display tracking-wider ${
                            event.type === "Live"
                              ? "bg-blood/20 text-blood"
                              : "bg-gold/20 text-gold"
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>
                      <p className="font-body text-xs text-ivory/50">
                        {event.date} • {event.time}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="mt-6 w-full" size="sm">
                  View Calendar
                </Button>
              </div>
            </motion.div>

            {/* Recent Content */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="glass p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Play
                    className={`w-5 h-5 ${
                      mode === "dominus" ? "text-blood" : "text-gold"
                    }`}
                  />
                  <h2 className="font-display text-sm tracking-[0.2em] text-gold">
                    CONTINUE
                  </h2>
                </div>
                <div className="space-y-4">
                  {recentContent.map((content) => (
                    <div
                      key={content.title}
                      className="p-4 border border-gold/10 bg-obsidian/50 cursor-pointer hover:border-gold/30 transition-colors"
                    >
                      <h3 className="font-display text-sm text-ivory mb-2">
                        {content.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-display tracking-wider bg-gold/10 text-gold">
                          {content.type}
                        </span>
                        {content.duration && (
                          <span className="font-body text-xs text-ivory/40">
                            {content.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="mt-6 w-full" size="sm">
                  View Library
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Progress Banner */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div
              className={`p-8 border ${
                mode === "dominus" ? "border-blood/30" : "border-gold/30"
              } bg-gradient-to-r from-obsidian via-obsidian/95 to-obsidian`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-xl tracking-[0.1em] text-ivory mb-2">
                    30-DAY PROTOCOL
                  </h3>
                  <p className="font-body text-ivory/60">
                    Day 12 of 30 • You&apos;re 40% through the transformation
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-48 h-2 bg-obsidian border border-gold/20">
                    <div
                      className={`h-full ${
                        mode === "dominus" ? "bg-blood" : "bg-gold"
                      }`}
                      style={{ width: "40%" }}
                    />
                  </div>
                  <Button
                    variant={mode === "dominus" ? "blood" : "primary"}
                    size="sm"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

