"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import ReactMarkdown from "react-markdown";
import { Crown } from "@/components/ui/Crown";
import { LANGUAGES } from "@/lib/oracle-constants";
import { useApp } from "@/components/Providers";

type SetupStep = "LANGUAGE" | "GENDER" | "CHAT";

interface Message {
  role: "user" | "model";
  text: string;
}

const MAX_MESSAGES = 25; // Max messages per conversation

export function ChatInterface() {
  const { mode } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "I am the Oracle of the Axis. Select your frequency (Language) to begin.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [setupStep, setSetupStep] = useState<SetupStep>("LANGUAGE");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [remainingMessages, setRemainingMessages] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, setupStep]);

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    setSetupStep("GENDER");
    setMessages([
      {
        role: "model",
        text: `Frequency tuned to: ${lang}.\n\nBefore we begin, declare yourself. Are you Man or Woman?`,
      },
    ]);
  };

  const handleGenderSelect = (gender: string) => {
    setSetupStep("CHAT");
    handleSend(gender);
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    // Check message limit client-side
    const userMessageCount = messages.filter((msg) => msg.role === "user").length;
    if (userMessageCount >= MAX_MESSAGES) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `The Oracle has spoken. You have reached the limit of ${MAX_MESSAGES} questions. Return when you have integrated the wisdom.`,
        },
      ]);
      return;
    }

    setInput("");
    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          language: selectedLanguage,
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
        // Update remaining messages from response body
        if (data.remaining !== undefined) {
          setRemainingMessages(data.remaining);
        }
        
        // Track Oracle chat message
        track("oracle_chat", {
          language: selectedLanguage,
          messageCount: userMessageCount + 1,
        });
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text:
              data.error ||
              "The signal is weak. Check your conviction (or your connection).",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "The signal is weak. Check your conviction (or your connection).",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="flex flex-col h-[80vh] w-full max-w-4xl mx-auto border border-concrete/20 bg-void/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-concrete/20 flex items-center justify-between bg-void/50">
        <div className="flex items-center gap-3">
          <Crown size={32} variant={mode === "dominus" ? "blood" : "gold"} />
          <div>
            <h3 className={`font-law text-lg tracking-widest ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
              THE ORACLE
            </h3>
            <p className="text-[10px] text-concrete/50 uppercase font-system tracking-wider">
              Gemini 3 Pro // Linked to Dominus Core
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {remainingMessages !== null && (
            <span className="text-[10px] text-concrete/60 uppercase font-system tracking-wider">
              {remainingMessages} remaining
            </span>
          )}
          <div className="h-2 w-2 bg-green-500 animate-slow-pulse shadow-[0_0_10px_#22c55e]" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-4 text-sm md:text-base leading-relaxed font-scripture border ${
                  msg.role === "user"
                    ? "bg-void border-concrete/30 text-empire/80"
                    : mode === "dominus" 
                      ? "bg-blood/10 border-blood/30 text-blood/90 shadow-[0_0_15px_rgba(138,3,3,0.1)]"
                      : "bg-sovereign/10 border-sovereign/30 text-sovereign/90 shadow-[0_0_15px_rgba(229,195,114,0.1)]"
                }`}
              >
                {msg.role === "model" && (
                  <span className="block text-[9px] uppercase tracking-widest mb-2 opacity-50 font-system">
                    Dominus
                  </span>
                )}
                <div className="markdown-content">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className={`mb-4 last:mb-0 font-scripture leading-relaxed ${mode === "dominus" ? "text-blood/90" : "text-sovereign/90"}`}>
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className={`font-bold font-law ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className={`italic ${mode === "dominus" ? "text-blood/80" : "text-sovereign/80"}`}>
                          {children}
                        </em>
                      ),
                      h1: ({ children }) => (
                        <h1 className={`text-xl font-law mb-3 mt-4 first:mt-0 tracking-wide ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className={`text-lg font-law mb-2 mt-4 first:mt-0 tracking-wide ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className={`text-base font-law mb-2 mt-3 first:mt-0 tracking-wide ${mode === "dominus" ? "text-blood/90" : "text-sovereign/90"}`}>
                          {children}
                        </h3>
                      ),
                      ul: ({ children }) => (
                        <ul className={`list-disc list-outside ml-6 mb-4 space-y-2 ${mode === "dominus" ? "text-blood/90" : "text-sovereign/90"}`}>
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className={`list-decimal list-outside ml-6 mb-4 space-y-2 ${mode === "dominus" ? "text-blood/90" : "text-sovereign/90"}`}>
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="font-scripture leading-relaxed">
                          {children}
                        </li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className={`border-l-2 pl-4 my-4 italic font-scripture ${mode === "dominus" ? "border-blood/40 text-blood/80" : "border-sovereign/40 text-sovereign/80"}`}>
                          {children}
                        </blockquote>
                      ),
                      code: ({ children }) => (
                        <code className={`bg-void/50 px-1.5 py-0.5 rounded text-xs font-mono border border-concrete/20 ${mode === "dominus" ? "text-blood/70" : "text-sovereign/70"}`}>
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="bg-void/50 p-3 rounded my-4 overflow-x-auto border border-concrete/20">
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-void/50 border border-concrete/20 p-3 flex gap-1">
              <div className={`w-1.5 h-1.5 animate-bounce ${mode === "dominus" ? "bg-blood" : "bg-sovereign"}`} />
              <div
                className={`w-1.5 h-1.5 animate-bounce ${mode === "dominus" ? "bg-blood" : "bg-sovereign"}`}
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className={`w-1.5 h-1.5 animate-bounce ${mode === "dominus" ? "bg-blood" : "bg-sovereign"}`}
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-concrete/20 bg-void">
        {/* Step 1: Language Selection */}
        {setupStep === "LANGUAGE" && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => handleLanguageSelect(lang.value)}
                  className={`px-2 py-3 bg-void border border-concrete/30 text-concrete/60 font-law uppercase tracking-widest text-[10px] transition-all truncate ${mode === "dominus" ? "hover:border-blood hover:text-blood" : "hover:border-sovereign hover:text-sovereign"}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Gender Selection */}
        {setupStep === "GENDER" && !isTyping && (
          <motion.div
            className="flex gap-4 mb-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => handleGenderSelect("Man")}
              className={`px-8 py-3 bg-void border border-concrete/30 text-concrete/60 font-law uppercase tracking-widest text-xs transition-all ${mode === "dominus" ? "hover:border-blood hover:text-blood" : "hover:border-sovereign hover:text-sovereign"}`}
            >
              I am a Man
            </button>
            <button
              onClick={() => handleGenderSelect("Woman")}
              className={`px-8 py-3 bg-void border border-concrete/30 text-concrete/60 font-law uppercase tracking-widest text-xs transition-all ${mode === "dominus" ? "hover:border-blood hover:text-blood" : "hover:border-sovereign hover:text-sovereign"}`}
            >
              I am a Woman
            </button>
          </motion.div>
        )}

        {/* Step 3: Chat Input */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={setupStep !== "CHAT" || isTyping}
            placeholder={
              setupStep === "LANGUAGE"
                ? "Select frequency above..."
                : setupStep === "GENDER"
                ? "Declare yourself above..."
                : "Ask the Dominus..."
            }
            className={`w-full bg-void border border-concrete/30 p-4 pr-32 text-empire focus:outline-none transition-colors font-scripture placeholder-concrete/40 resize-none h-24 disabled:opacity-50 ${mode === "dominus" ? "focus:border-blood" : "focus:border-sovereign"}`}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input || isTyping || setupStep !== "CHAT"}
            className={`absolute right-3 bottom-3 px-6 py-2 hover:bg-empire text-void font-law font-bold uppercase tracking-wider text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${mode === "dominus" ? "bg-blood" : "bg-sovereign"}`}
          >
            Send
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-concrete/40 uppercase tracking-[0.2em] font-system">
            Truth over Comfort
          </p>
        </div>
      </div>
    </motion.div>
  );
}

