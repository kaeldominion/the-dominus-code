"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Loader2,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { useApp } from "@/components/Providers";

interface Application {
  id: string;
  type: string;
  name: string | null;
  email: string | null;
  formData: any;
  aiVerdict: string | null;
  aiAnalysis: string | null;
  status: string;
  submittedAt: string;
  reviewedAt: string | null;
  notes: string | null;
}

export default function AdminApplications() {
  const { mode } = useApp();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"COUNCIL" | "DYNASTY" | "ALL">("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [selectedTab, selectedStatus]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedTab !== "ALL") params.append("type", selectedTab);
      if (selectedStatus !== "ALL") params.append("status", selectedStatus);
      
      const response = await fetch(`/api/admin/applications?${params}`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true);
    try {
      const response = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        await fetchApplications();
        if (selectedApp?.id === id) {
          const updated = await response.json();
          setSelectedApp(updated.application);
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4 text-blood" />;
      default:
        return <Clock className="w-4 h-4 text-gold" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "REJECTED":
        return "bg-blood/20 text-blood border-blood/30";
      case "WAITLIST":
        return "bg-gold/20 text-gold border-gold/30";
      default:
        return "bg-gold/20 text-gold border-gold/30";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl tracking-[0.1em] text-ivory mb-2">
          APPLICATIONS
        </h1>
        <p className="font-body text-ivory/60">
          Manage Council and Dynasty applications
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <div className="flex gap-2 border border-gold/20 p-1">
          {(["ALL", "COUNCIL", "DYNASTY"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 font-display text-sm tracking-[0.1em] transition-colors ${
                selectedTab === tab
                  ? mode === "dominus"
                    ? "bg-blood text-obsidian"
                    : "bg-gold text-obsidian"
                  : "text-ivory/60 hover:text-ivory"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-2 border border-gold/20 p-1">
          {(["ALL", "PENDING", "APPROVED", "REJECTED", "WAITLIST"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 font-display text-sm tracking-[0.1em] transition-colors ${
                selectedStatus === status
                  ? mode === "dominus"
                    ? "bg-blood text-obsidian"
                    : "bg-gold text-obsidian"
                  : "text-ivory/60 hover:text-ivory"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="border border-gold/20 bg-obsidian/30">
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
                AI VERDICT
              </th>
              <th className="p-4 text-left font-display text-xs tracking-[0.2em] text-ivory/60">
                DATE
              </th>
              <th className="p-4 text-left font-display text-xs tracking-[0.2em] text-ivory/60">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-ivory/60">
                  No applications found
                </td>
              </tr>
            ) : (
              applications.map((app) => (
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
                      className={`px-2 py-1 text-xs font-display tracking-[0.1em] border ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 font-body text-sm text-ivory/60">
                    {app.aiVerdict || "N/A"}
                  </td>
                  <td className="p-4 font-body text-sm text-ivory/60">
                    {new Date(app.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className={`p-2 border ${
                        mode === "dominus"
                          ? "border-blood/30 hover:border-blood/50"
                          : "border-gold/30 hover:border-gold/50"
                      } transition-colors`}
                    >
                      <Eye className="w-4 h-4 text-ivory" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-obsidian/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`max-w-4xl w-full border ${
              mode === "dominus" ? "border-blood/30" : "border-gold/30"
            } bg-void p-8 max-h-[90vh] overflow-auto`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl tracking-[0.1em] text-ivory">
                APPLICATION DETAILS
              </h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-ivory/60 hover:text-ivory"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-display text-sm tracking-[0.2em] text-gold mb-2">
                  BASIC INFO
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-ivory/60 text-sm mb-1">Type</p>
                    <p className="text-ivory">{selectedApp.type}</p>
                  </div>
                  <div>
                    <p className="text-ivory/60 text-sm mb-1">Name</p>
                    <p className="text-ivory">{selectedApp.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-ivory/60 text-sm mb-1">Email</p>
                    <p className="text-ivory">{selectedApp.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-ivory/60 text-sm mb-1">Status</p>
                    <span
                      className={`px-2 py-1 text-xs font-display tracking-[0.1em] border ${getStatusColor(
                        selectedApp.status
                      )}`}
                    >
                      {selectedApp.status}
                    </span>
                  </div>
                </div>
              </div>

              {selectedApp.aiVerdict && (
                <div>
                  <h3 className="font-display text-sm tracking-[0.2em] text-gold mb-2">
                    AI VERDICT
                  </h3>
                  <p className="text-ivory">{selectedApp.aiVerdict}</p>
                </div>
              )}

              {selectedApp.aiAnalysis && (
                <div>
                  <h3 className="font-display text-sm tracking-[0.2em] text-gold mb-2">
                    AI ANALYSIS
                  </h3>
                  <p className="text-ivory whitespace-pre-wrap">
                    {selectedApp.aiAnalysis}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-display text-sm tracking-[0.2em] text-gold mb-2">
                  FORM DATA
                </h3>
                <div className="border border-gold/20 p-4 bg-obsidian/30">
                  <pre className="text-ivory/80 text-sm whitespace-pre-wrap">
                    {JSON.stringify(selectedApp.formData, null, 2)}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-display text-sm tracking-[0.2em] text-gold mb-2">
                  UPDATE STATUS
                </h3>
                <div className="flex gap-2">
                  {(["PENDING", "APPROVED", "REJECTED", "WAITLIST"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedApp.id, status)}
                      disabled={updating || selectedApp.status === status}
                      className={`px-4 py-2 font-display text-sm tracking-[0.1em] border transition-colors ${
                        selectedApp.status === status
                          ? mode === "dominus"
                            ? "border-blood bg-blood/20 text-blood"
                            : "border-gold bg-gold/20 text-gold"
                          : "border-gold/30 text-ivory/60 hover:border-gold/50 hover:text-ivory"
                      } disabled:opacity-50`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

