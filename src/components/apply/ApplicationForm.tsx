"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { Crown } from "@/components/ui/Crown";
import { Question, QuestionType } from "@/lib/oracle-constants";

interface ApplicationFormProps {
  questions: Question[];
  title: string;
  systemPrompt: string;
  applicationType: "dynasty" | "council";
}

interface FormData {
  [key: string]: string;
}

export function ApplicationForm({
  questions,
  title,
  applicationType,
}: ApplicationFormProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{
    verdict: string;
    title: string;
    analysis: string;
    closing: string;
  } | null>(null);

  const question = questions[currentIndex];

  // Track application start
  useEffect(() => {
    track("application_started", {
      type: applicationType,
    });
  }, [applicationType]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleInitialSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const updateField = (val: string) => {
    setFormData((prev) => ({ ...prev, [question.id]: val }));

    if (question.type === QuestionType.CHOICE) {
      setTimeout(() => handleNext(), 300);
    }
  };

  const getFieldValue = () => {
    return formData[question.id] || "";
  };

  const canProceed = useCallback(() => {
    if (question.type === QuestionType.INFO) return true;
    const val = formData[question.id] || "";
    return val && val.length > 0;
  }, [question, formData]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        question.type !== QuestionType.LONG_TEXT &&
        question.type !== QuestionType.INFO
      ) {
        if (canProceed()) handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, question, canProceed]);

  const handleInitialSubmit = async () => {
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          applicationType,
        }),
      });

      const result = await response.json();
      
      // Track application completion (saved to database)
      track("application_completed", {
        type: applicationType,
        verdict: result.verdict || "RECEIVED",
      });
      
      // Handle error responses or malformed data
      if (result.error || !result.verdict) {
        setAiResult({
          verdict: "RECEIVED",
          title: "DATA LOGGED",
          analysis: result.error || "Application received. Awaiting manual review.",
          closing: "Await transmission.",
        });
      } else {
        setAiResult(result);
      }
    } catch {
      setAiResult({
        verdict: "RECEIVED",
        title: "DATA LOGGED",
        analysis: "Network congestion detected. Data stored for manual review.",
        closing: "Await transmission.",
      });
    } finally {
      setIsAnalyzing(false);
      setIsSubmitted(true);
    }
  };

  const handleExit = () => {
    router.push("/");
  };

  // Loading State
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-void flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Crown size={96} variant="gold" className="mx-auto mb-8 animate-slow-pulse" />
          <h2 className="font-law text-2xl text-sovereign tracking-widest mb-4">
            ACCESSING THE AXIS...
          </h2>
          <p className="text-concrete/60 font-system text-xs uppercase animate-pulse">
            Running Dominus Protocol
          </p>
        </motion.div>
      </div>
    );
  }

  // Result State
  if (isSubmitted && aiResult) {
    const isRejected = aiResult.verdict?.includes("REJECT") ?? false;
    const isApproved = aiResult.verdict?.includes("APPROVED") || aiResult.verdict?.includes("ACCEPTED");
    return (
      <div className="min-h-screen bg-void w-full flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <Crown
            size={64}
            variant={isRejected ? "blood" : "gold"}
            className="mx-auto mb-8"
          />
          <div className="border border-concrete/20 bg-void/80 p-8 w-full backdrop-blur-md">
            <h1
              className={`font-law text-4xl md:text-5xl mb-2 ${
                isRejected ? "text-blood" : "text-sovereign"
              }`}
            >
              {aiResult.verdict || "RECEIVED"}
            </h1>
            <h3 className="text-concrete/60 font-system text-sm tracking-[0.2em] uppercase mb-8 border-b border-concrete/20 pb-4">
              {aiResult.title || "APPLICATION PROCESSED"}
            </h3>
            <p className="font-scripture text-xl text-empire leading-relaxed mb-8 italic">
              &ldquo;{aiResult.analysis || "Your application has been received."}&rdquo;
            </p>
            <p className="text-xs font-system text-concrete/60 uppercase tracking-widest mb-8">
              {aiResult.closing || "Await transmission."}
            </p>
            
            {/* Auto-logged confirmation */}
            <p className="text-xs font-system text-sovereign/50 uppercase tracking-widest mb-6 text-center">
              ✓ Application logged to The Axis
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push("/oracle")}
                className="w-full py-4 bg-sovereign text-void font-law font-bold uppercase tracking-widest hover:bg-empire transition-colors"
              >
                Consult The Oracle
              </button>
              
              <button
                onClick={handleExit}
                className={`w-full py-3 font-system text-sm uppercase tracking-widest transition-colors ${
                  isRejected 
                    ? "border border-blood/50 text-blood/70 hover:bg-blood/10"
                    : "border border-concrete/30 text-concrete/50 hover:text-empire hover:border-concrete/50"
                }`}
              >
                {isApproved ? "Return to The Gate" : isRejected ? "Leave" : "Return Home"}
              </button>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    );
  }

  // Form State
  return (
    <div className="min-h-screen bg-void w-full relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-void z-50">
        <motion.div
          className="h-full bg-sovereign shadow-[0_0_10px_rgba(229,195,114,0.5)]"
          initial={{ width: 0 }}
          animate={{
            width: `${Math.min(((currentIndex + 1) / questions.length) * 100, 100)}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24">
        {/* Header */}
        <div className="mb-8 flex justify-between items-end border-b border-concrete/20 pb-4">
          <div className="text-sovereign/50 font-system text-[10px] tracking-[0.3em] uppercase">
            {title} Protocol // {currentIndex === 0 ? "INIT" : `0${currentIndex}`}
          </div>
          <button
            onClick={handleExit}
            className="text-concrete/50 hover:text-empire text-xs font-system uppercase tracking-widest transition-colors"
          >
            Abort
          </button>
        </div>

        {/* Question Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-5xl font-law text-empire mb-6 leading-tight tracking-wide">
              {question.title}
            </h2>
            {question.description && (
              <p className="text-lg md:text-2xl text-concrete/70 font-scripture font-light mb-8 max-w-2xl italic">
                {question.description}
              </p>
            )}

            {question.quote && (
              <div className="mb-12 pl-6 border-l-2 border-sovereign/40">
                <p className="text-lg text-sovereign font-scripture opacity-90 italic">
                  &ldquo;{question.quote}&rdquo;
                </p>
              </div>
            )}

            {/* Input Area */}
            <div className="min-h-[150px]">
              {question.type === QuestionType.INFO && (
                <div className="text-concrete/50 font-system text-xs tracking-widest animate-pulse">
                  PRESS CONTINUE TO BEGIN
                </div>
              )}

              {question.type === QuestionType.TEXT && (
                <input
                  type="text"
                  value={getFieldValue()}
                  onChange={(e) => updateField(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    getFieldValue().length > 0 &&
                    handleNext()
                  }
                  placeholder={question.placeholder}
                  className="w-full max-w-2xl bg-transparent border-b-2 border-concrete/30 text-2xl md:text-4xl py-2 md:py-4 text-empire focus:outline-none focus:border-sovereign transition-colors placeholder-concrete/30 font-scripture"
                  autoFocus
                />
              )}

              {question.type === QuestionType.LONG_TEXT && (
                <textarea
                  value={getFieldValue()}
                  onChange={(e) => updateField(e.target.value)}
                  placeholder={question.placeholder}
                  rows={4}
                  className="w-full max-w-2xl bg-void/50 border-l-2 border-concrete/30 p-3 md:p-4 text-base md:text-xl text-empire focus:outline-none focus:border-sovereign transition-colors placeholder-concrete/30 resize-none font-scripture"
                  autoFocus
                />
              )}

              {question.type === QuestionType.CHOICE && question.options && (
                <div className="flex flex-col gap-3 md:gap-4 w-full max-w-xl">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateField(option)}
                      className={`text-left px-4 md:px-6 py-3 md:py-4 border transition-all duration-300 group ${
                        getFieldValue() === option
                          ? "border-sovereign bg-sovereign/10 text-empire"
                          : "border-concrete/20 text-concrete/60 hover:border-sovereign/50 hover:text-empire"
                      }`}
                    >
                      <span
                        className={`inline-block w-6 h-6 border mr-3 md:mr-4 text-center leading-5 text-xs ${
                          getFieldValue() === option
                            ? "border-sovereign text-sovereign"
                            : "border-concrete/30 text-concrete/30 group-hover:border-concrete/50"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-light tracking-wide text-sm md:text-base font-scripture">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-12">
              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-6 py-3 border border-concrete/30 text-concrete/50 hover:text-sovereign hover:border-sovereign transition-colors duration-300 uppercase tracking-widest text-xs font-semibold font-system"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-8 py-3 bg-sovereign text-void uppercase tracking-widest text-xs font-bold hover:bg-empire transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-system ${
                  currentIndex === questions.length - 1
                    ? "bg-empire text-void hover:bg-concrete"
                    : ""
                }`}
              >
                {currentIndex === questions.length - 1
                  ? "Submit Application"
                  : "Continue"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

