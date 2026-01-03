"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Loader2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Globe
} from "lucide-react";
import { useApp } from "@/components/Providers";

interface OracleMessage {
  id: string;
  role: string;
  text: string;
  createdAt: string;
}

interface OracleConversation {
  id: string;
  clientIP: string;
  language: string;
  messageCount: number;
  startedAt: string;
  lastMessageAt: string;
  _count: {
    messages: number;
  };
}

export default function AdminOracle() {
  const { mode } = useApp();
  const [conversations, setConversations] = useState<OracleConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [conversationDetails, setConversationDetails] = useState<{
    conversation: OracleConversation;
    messages: OracleMessage[];
  } | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchConversations();
  }, [startDate, endDate]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      
      const response = await fetch(`/api/admin/oracle?${params}`);
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversationDetails = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setConversationDetails(null);
      return;
    }

    try {
      const response = await fetch(`/api/admin/oracle?conversationId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setConversationDetails(data);
        setExpandedId(id);
      }
    } catch (error) {
      console.error("Failed to fetch conversation details:", error);
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
          ORACLE ANALYTICS
        </h1>
        <p className="font-body text-ivory/60">
          View all Oracle conversations and messages
        </p>
      </motion.div>

      {/* Date Filters */}
      <div className="mb-6 flex gap-4 items-end">
        <div>
          <label className="block font-display text-xs tracking-[0.2em] text-gold mb-2">
            START DATE
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 bg-obsidian border border-gold/20 text-ivory font-body focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block font-display text-xs tracking-[0.2em] text-gold mb-2">
            END DATE
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 bg-obsidian border border-gold/20 text-ivory font-body focus:outline-none focus:border-gold"
          />
        </div>
        {(startDate || endDate) && (
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className={`px-4 py-2 border ${
              mode === "dominus"
                ? "border-blood/30 hover:border-blood/50 text-blood"
                : "border-gold/30 hover:border-gold/50 text-gold"
            } font-display text-sm tracking-[0.1em] transition-colors`}
          >
            CLEAR
          </button>
        )}
      </div>

      {/* Conversations List */}
      <div className="space-y-4">
        {conversations.length === 0 ? (
          <div className="p-8 text-center text-ivory/60 border border-gold/20">
            No conversations found
          </div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`border ${
                mode === "dominus" ? "border-blood/30" : "border-gold/30"
              } bg-obsidian/30`}
            >
              <button
                onClick={() => fetchConversationDetails(conv.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-obsidian/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <MessageSquare
                    className={`w-6 h-6 ${
                      mode === "dominus" ? "text-blood" : "text-gold"
                    }`}
                  />
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-4 mb-2">
                      <p className="font-display text-lg tracking-[0.1em] text-ivory">
                        {conv._count.messages} Messages
                      </p>
                      <span className="text-ivory/40">•</span>
                      <p className="font-body text-sm text-ivory/60">
                        {conv.language}
                      </p>
                      <span className="text-ivory/40">•</span>
                      <p className="font-body text-sm text-ivory/60">
                        {conv.clientIP}
                      </p>
                    </div>
                    <p className="font-body text-xs text-ivory/50">
                      Started: {new Date(conv.startedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {expandedId === conv.id ? (
                  <ChevronUp className="w-5 h-5 text-ivory/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-ivory/60" />
                )}
              </button>

              {expandedId === conv.id && conversationDetails && (
                <div className="border-t border-gold/20 p-6 space-y-4">
                  {conversationDetails.messages.map((msg, idx) => (
                    <div
                      key={msg.id}
                      className={`p-4 border ${
                        msg.role === "user"
                          ? mode === "dominus"
                            ? "border-blood/30 bg-blood/5"
                            : "border-gold/30 bg-gold/5"
                          : "border-gold/20 bg-obsidian/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-display text-xs tracking-[0.2em] ${
                            msg.role === "user"
                              ? mode === "dominus"
                                ? "text-blood"
                                : "text-gold"
                              : "text-ivory/60"
                          }`}
                        >
                          {msg.role.toUpperCase()}
                        </span>
                        <span className="font-body text-xs text-ivory/40">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="font-body text-sm text-ivory whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

