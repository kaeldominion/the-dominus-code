"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Clock, 
  MessageSquare, 
  Users,
  ArrowRight,
  Loader2,
  Zap
} from "lucide-react";
import { useApp } from "@/components/Providers";
import Link from "next/link";

interface Stats {
  totalApplications: number;
  pendingApplications: number;
  councilApplications: number;
  dynastyApplications: number;
  oracleConversations: number;
  oracleMessages: number;
  recentApplications: Array<{
    id: string;
    type: string;
    name: string | null;
    email: string | null;
    status: string;
    submittedAt: Date;
  }>;
}

export default function AdminDashboard() {
  const { mode } = useApp();
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Applications",
      value: stats?.totalApplications || 0,
      icon: FileText,
      color: mode === "dominus" ? "blood" : "gold",
    },
    {
      label: "Pending Review",
      value: stats?.pendingApplications || 0,
      icon: Clock,
      color: mode === "dominus" ? "blood" : "gold",
    },
    {
      label: "Oracle Conversations",
      value: stats?.oracleConversations || 0,
      icon: MessageSquare,
      color: mode === "dominus" ? "blood" : "gold",
    },
    {
      label: "Oracle Messages",
      value: stats?.oracleMessages || 0,
      icon: MessageSquare,
      color: mode === "dominus" ? "blood" : "gold",
    },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl tracking-[0.1em] text-ivory mb-2">
          ADMIN DASHBOARD
        </h1>
        <p className="font-body text-ivory/60">
          Welcome back, {session?.user?.email}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 border ${
                mode === "dominus"
                  ? "border-blood/30 bg-blood/5"
                  : "border-gold/30 bg-gold/5"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon
                  className={`w-6 h-6 ${
                    mode === "dominus" ? "text-blood" : "text-gold"
                  }`}
                />
              </div>
              <p className="font-display text-3xl tracking-[0.1em] text-ivory mb-1">
                {stat.value.toLocaleString()}
              </p>
              <p className="font-body text-sm text-ivory/60">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="font-display text-2xl tracking-[0.1em] text-ivory mb-4">
          QUICK LINKS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/applications"
            className={`p-6 border ${
              mode === "dominus"
                ? "border-blood/30 bg-blood/5 hover:border-blood/50"
                : "border-gold/30 bg-gold/5 hover:border-gold/50"
            } transition-colors group`}
          >
            <div className="flex items-center justify-between">
              <FileText
                className={`w-6 h-6 ${
                  mode === "dominus" ? "text-blood" : "text-gold"
                }`}
              />
              <ArrowRight
                className={`w-5 h-5 ${
                  mode === "dominus" ? "text-blood" : "text-gold"
                } group-hover:translate-x-1 transition-transform`}
              />
            </div>
            <p className="font-display text-lg tracking-[0.1em] text-ivory mt-4">
              Applications
            </p>
            <p className="font-body text-sm text-ivory/60 mt-1">
              View and manage all applications
            </p>
          </Link>

          <Link
            href="/admin/oracle"
            className={`p-6 border ${
              mode === "dominus"
                ? "border-blood/30 bg-blood/5 hover:border-blood/50"
                : "border-gold/30 bg-gold/5 hover:border-gold/50"
            } transition-colors group`}
          >
            <div className="flex items-center justify-between">
              <MessageSquare
                className={`w-6 h-6 ${
                  mode === "dominus" ? "text-blood" : "text-gold"
                }`}
              />
              <ArrowRight
                className={`w-5 h-5 ${
                  mode === "dominus" ? "text-blood" : "text-gold"
                } group-hover:translate-x-1 transition-transform`}
              />
            </div>
            <p className="font-display text-lg tracking-[0.1em] text-ivory mt-4">
              Oracle Analytics
            </p>
            <p className="font-body text-sm text-ivory/60 mt-1">
              View conversations and usage
            </p>
          </Link>

          <Link
            href="/gens"
            target="_blank"
            className={`p-6 border ${
              mode === "dominus"
                ? "border-blood/30 bg-blood/5 hover:border-blood/50"
                : "border-gold/30 bg-gold/5 hover:border-gold/50"
            } transition-colors group`}
          >
            <div className="flex items-center justify-between">
              <Zap
                className={`w-6 h-6 ${
                  mode === "dominus" ? "text-blood" : "text-gold"
                }`}
              />
              <ArrowRight
                className={`w-5 h-5 ${
                  mode === "dominus" ? "text-blood" : "text-gold"
                } group-hover:translate-x-1 transition-transform`}
              />
            </div>
            <p className="font-display text-lg tracking-[0.1em] text-ivory mt-4">
              Generator Tools
            </p>
            <p className="font-body text-sm text-ivory/60 mt-1">
              Access all generator tools
            </p>
          </Link>
        </div>
      </motion.div>

      {/* Recent Applications */}
      {stats && stats.recentApplications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl tracking-[0.1em] text-ivory">
              RECENT APPLICATIONS
            </h2>
            <Link
              href="/admin/applications"
              className={`font-body text-sm ${
                mode === "dominus" ? "text-blood" : "text-gold"
              } hover:underline`}
            >
              View All →
            </Link>
          </div>
          <div className="border border-gold/20">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="p-4 text-left font-display text-xs tracking-[0.2em] text-ivory/60">
                    TYPE
                  </th>
                  <th className="p-4 text-left font-display text-xs tracking-[0.2em] text-ivory/60">
                    NAME
                  </th>
                  <th className="p-4 text-left font-display text-xs tracking-[0.2em] text-ivory/60">
                    EMAIL
                  </th>
                  <th className="p-4 text-left font-display text-xs tracking-[0.2em] text-ivory/60">
                    STATUS
                  </th>
                  <th className="p-4 text-left font-display text-xs tracking-[0.2em] text-ivory/60">
                    DATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gold/10 hover:bg-obsidian/30 transition-colors"
                  >
                    <td className="p-4 font-body text-sm text-ivory">
                      {app.type}
                    </td>
                    <td className="p-4 font-body text-sm text-ivory">
                      {app.name || "N/A"}
                    </td>
                    <td className="p-4 font-body text-sm text-ivory/80">
                      {app.email || "N/A"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs font-display tracking-[0.1em] ${
                          app.status === "APPROVED"
                            ? "bg-green-500/20 text-green-400"
                            : app.status === "REJECTED"
                            ? "bg-blood/20 text-blood"
                            : "bg-gold/20 text-gold"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 font-body text-sm text-ivory/60">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

