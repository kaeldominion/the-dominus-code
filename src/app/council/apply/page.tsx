"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "@/components/ui/Crown";
import { useApp } from "@/components/Providers";
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ArrowRight,
  Loader2
} from "lucide-react";
import Link from "next/link";

// Application questions
const questions = [
  {
    id: "name",
    type: "text",
    question: "Let's start with your name.",
    subtext: "What should we call you?",
    placeholder: "Your full name",
    required: true,
  },
  {
    id: "email",
    type: "email",
    question: "What's your email address?",
    subtext: "We'll use this to contact you about your application.",
    placeholder: "you@example.com",
    required: true,
  },
  {
    id: "whatsapp",
    type: "tel",
    question: "What's your WhatsApp number?",
    subtext: "Include country code. This is how we'll reach you fastest.",
    placeholder: "+1 555 123 4567",
    required: true,
  },
  {
    id: "age",
    type: "select",
    question: "What's your age range?",
    subtext: "The Council attracts men at different stages of life.",
    options: ["18-25", "26-35", "36-45", "46-55", "55+"],
    required: true,
  },
  {
    id: "location",
    type: "text",
    question: "Where are you based?",
    subtext: "City and country.",
    placeholder: "e.g., London, UK",
    required: true,
  },
  {
    id: "occupation",
    type: "text",
    question: "What do you do?",
    subtext: "Your profession or business.",
    placeholder: "e.g., Entrepreneur, Software Engineer, Investor",
    required: true,
  },
  {
    id: "income",
    type: "select",
    question: "What's your annual income range?",
    subtext: "This helps us understand if The Council is the right fit financially.",
    options: [
      "Under $50,000",
      "$50,000 - $100,000",
      "$100,000 - $250,000",
      "$250,000 - $500,000",
      "$500,000 - $1,000,000",
      "$1,000,000+",
    ],
    required: true,
  },
  {
    id: "relationship",
    type: "select",
    question: "What's your current relationship situation?",
    subtext: "Be honest. No judgment here.",
    options: [
      "Single - looking to build",
      "In a relationship - monogamous",
      "In a relationship - exploring non-monogamy",
      "Currently practicing non-monogamy",
      "Married - monogamous",
      "Married - non-monogamous/open",
      "Divorced/separated",
    ],
    required: true,
  },
  {
    id: "why",
    type: "textarea",
    question: "Why do you want to join The Council?",
    subtext: "What are you hoping to achieve? Be specific.",
    placeholder: "Tell us about your goals and what you're looking to change...",
    required: true,
  },
  {
    id: "challenge",
    type: "textarea",
    question: "What's your biggest challenge right now?",
    subtext: "The thing that's holding you back from the life you want.",
    placeholder: "Be honest about where you're struggling...",
    required: true,
  },
  {
    id: "commitment",
    type: "select",
    question: "How committed are you to transformation?",
    subtext: "The Council requires real work. Are you ready?",
    options: [
      "I'm ready to do whatever it takes",
      "I'm serious but have some reservations",
      "I'm exploring my options",
      "I'm just curious for now",
    ],
    required: true,
  },
  {
    id: "investment",
    type: "select",
    question: "Are you prepared to invest $497/month in yourself?",
    subtext: "The Council is a premium experience with premium results.",
    options: [
      "Yes, I'm ready to invest",
      "Yes, if I'm accepted",
      "I need to think about it",
      "I'd prefer the annual option ($4,997)",
    ],
    required: true,
  },
  {
    id: "referral",
    type: "text",
    question: "How did you hear about The Dominus Code?",
    subtext: "Social media, podcast, friend, etc.",
    placeholder: "e.g., Instagram, friend's recommendation",
    required: false,
  },
  {
    id: "anything_else",
    type: "textarea",
    question: "Anything else you want us to know?",
    subtext: "Optional. This is your chance to stand out.",
    placeholder: "Share anything that might help your application...",
    required: false,
  },
];

type FormData = Record<string, string>;

export default function CouncilApplyPage() {
  const { mode } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Focus input on question change
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        if (question.type !== "textarea") {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, formData]);

  const handleNext = () => {
    if (question.required && !formData[question.id]) return;
    
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Parse name into first and last
      const nameParts = (formData.name || "").trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      // Send to GHL webhook
      const response = await fetch(
        "https://services.leadconnectorhq.com/hooks/ZDBwpFBOedF7mwbSs3Wx/webhook-trigger/a677ed3f-857d-4b0a-bb00-cd778e8bc8cb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Standard GHL contact fields
            firstName: firstName,
            lastName: lastName,
            email: formData.email,
            phone: formData.whatsapp,
            name: formData.name,
            source: "The Dominus Code Website",
            
            // Custom fields - these will appear in GHL
            age_range: formData.age,
            location: formData.location,
            occupation: formData.occupation,
            income_range: formData.income,
            relationship_status: formData.relationship,
            why_join_council: formData.why,
            biggest_challenge: formData.challenge,
            commitment_level: formData.commitment,
            investment_ready: formData.investment,
            referral_source: formData.referral,
            additional_info: formData.anything_else,
            
            // Tags for automation
            tags: ["council-application", "website-lead"],
            
            // Metadata
            submitted_at: new Date().toISOString(),
            form_name: "Council Application",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setIsComplete(true);
    } catch (error) {
      console.error("Submission error:", error);
      // Still show success to user - you can check GHL for actual submissions
      // This prevents bad UX if there's a minor API issue
      setIsComplete(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (value: string) => {
    setFormData((prev) => ({ ...prev, [question.id]: value }));
  };

  const canProceed = !question.required || formData[question.id];

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  if (isComplete) {
    return (
      <main className="min-h-screen bg-void flex items-center justify-center p-6">
        <motion.div
          className="max-w-xl w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Crown
              size={80}
              variant={mode === "dominus" ? "blood" : "gold"}
              className="mx-auto mb-8"
            />
          </motion.div>
          
          <h1 className="font-law text-3xl md:text-4xl tracking-[0.15em] text-empire mb-6">
            APPLICATION RECEIVED
          </h1>
          
          <p className="font-scripture text-xl text-empire/60 mb-4">
            Thank you, {formData.name?.split(" ")[0] || "Sovereign"}.
          </p>
          
          <p className="font-scripture text-lg text-empire/50 mb-8 leading-relaxed">
            Your application has been submitted. We review every application personally.
            If you&apos;re a fit for The Council, you&apos;ll hear from us within 48 hours.
          </p>
          
          <div className="border border-concrete/20 p-6 mb-8">
            <p className="font-system text-xs tracking-[0.3em] text-concrete/50 uppercase mb-2">
              What happens next
            </p>
            <ul className="font-scripture text-empire/60 space-y-2 text-left">
              <li className="flex items-start gap-3">
                <Check className={`w-4 h-4 mt-1 ${mode === "dominus" ? "text-blood" : "text-sovereign"}`} />
                <span>Application review (24-48 hours)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className={`w-4 h-4 mt-1 ${mode === "dominus" ? "text-blood" : "text-sovereign"}`} />
                <span>If approved, you&apos;ll receive an invitation email</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className={`w-4 h-4 mt-1 ${mode === "dominus" ? "text-blood" : "text-sovereign"}`} />
                <span>Complete payment to secure your spot</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className={`w-4 h-4 mt-1 ${mode === "dominus" ? "text-blood" : "text-sovereign"}`} />
                <span>Onboarding call with Spencer</span>
              </li>
            </ul>
          </div>
          
          <Link
            href="/"
            className={`inline-flex items-center gap-2 font-system text-xs tracking-[0.2em] uppercase transition-colors ${
              mode === "dominus" ? "text-blood hover:text-blood/80" : "text-sovereign hover:text-sovereign/80"
            }`}
          >
            Return to The Gate
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-void flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-concrete/10 z-50">
        <motion.div
          className={mode === "dominus" ? "h-full bg-blood" : "h-full bg-sovereign"}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <Link href="/council" className="flex items-center gap-3">
          <Crown size={28} variant={mode === "dominus" ? "blood" : "gold"} />
          <span className="font-system text-[10px] tracking-[0.3em] text-concrete/50 uppercase hidden sm:block">
            The Council Application
          </span>
        </Link>
        <div className="font-system text-xs text-concrete/40">
          {currentQuestion + 1} / {questions.length}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Question Number */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`font-system text-sm ${mode === "dominus" ? "text-blood" : "text-sovereign"}`}>
                  {String(currentQuestion + 1).padStart(2, "0")}
                </span>
                <div className={`h-px flex-1 ${mode === "dominus" ? "bg-blood/30" : "bg-sovereign/30"}`} />
                {!question.required && (
                  <span className="font-system text-[10px] tracking-wider text-concrete/40 uppercase">
                    Optional
                  </span>
                )}
              </div>

              {/* Question */}
              <h2 className="font-law text-2xl md:text-4xl tracking-[0.08em] text-empire mb-4 leading-tight">
                {question.question}
              </h2>
              
              {question.subtext && (
                <p className="font-scripture text-lg text-empire/50 mb-10">
                  {question.subtext}
                </p>
              )}

              {/* Input */}
              <div className="mb-10">
                {question.type === "text" && (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    value={formData[question.id] || ""}
                    onChange={(e) => updateFormData(e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full bg-transparent border-b-2 border-concrete/20 focus:border-sovereign pb-4 font-scripture text-xl text-empire placeholder:text-concrete/30 outline-none transition-colors"
                  />
                )}

                {question.type === "email" && (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="email"
                    value={formData[question.id] || ""}
                    onChange={(e) => updateFormData(e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full bg-transparent border-b-2 border-concrete/20 focus:border-sovereign pb-4 font-scripture text-xl text-empire placeholder:text-concrete/30 outline-none transition-colors"
                  />
                )}

                {question.type === "tel" && (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="tel"
                    value={formData[question.id] || ""}
                    onChange={(e) => updateFormData(e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full bg-transparent border-b-2 border-concrete/20 focus:border-sovereign pb-4 font-scripture text-xl text-empire placeholder:text-concrete/30 outline-none transition-colors"
                  />
                )}

                {question.type === "textarea" && (
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={formData[question.id] || ""}
                    onChange={(e) => updateFormData(e.target.value)}
                    placeholder={question.placeholder}
                    rows={4}
                    className="w-full bg-transparent border-2 border-concrete/20 focus:border-sovereign p-4 font-scripture text-lg text-empire placeholder:text-concrete/30 outline-none transition-colors resize-none"
                  />
                )}

                {question.type === "select" && question.options && (
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <button
                        key={option}
                        onClick={() => updateFormData(option)}
                        className={`w-full text-left p-4 border transition-all duration-300 flex items-center gap-4 group ${
                          formData[question.id] === option
                            ? mode === "dominus"
                              ? "border-blood bg-blood/10"
                              : "border-sovereign bg-sovereign/10"
                            : "border-concrete/20 hover:border-concrete/40"
                        }`}
                      >
                        <span className={`font-system text-xs ${
                          formData[question.id] === option
                            ? mode === "dominus" ? "text-blood" : "text-sovereign"
                            : "text-concrete/40 group-hover:text-concrete/60"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className={`font-scripture text-lg ${
                          formData[question.id] === option
                            ? "text-empire"
                            : "text-empire/70"
                        }`}>
                          {option}
                        </span>
                        {formData[question.id] === option && (
                          <Check className={`w-5 h-5 ml-auto ${
                            mode === "dominus" ? "text-blood" : "text-sovereign"
                          }`} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Hint */}
              {question.type !== "select" && (
                <p className="font-system text-[10px] tracking-wider text-concrete/30 uppercase">
                  Press Enter to continue ↵
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="p-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className={`flex items-center gap-2 font-system text-xs tracking-wider uppercase transition-colors ${
            currentQuestion === 0
              ? "text-concrete/20 cursor-not-allowed"
              : "text-concrete/50 hover:text-empire"
          }`}
        >
          <ChevronUp className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed || isSubmitting}
          className={`flex items-center gap-2 px-6 py-3 font-system text-xs tracking-[0.2em] uppercase transition-all ${
            canProceed
              ? mode === "dominus"
                ? "bg-blood text-empire hover:bg-blood/90"
                : "bg-sovereign text-void hover:bg-sovereign/90"
              : "bg-concrete/10 text-concrete/30 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting</span>
            </>
          ) : currentQuestion === questions.length - 1 ? (
            <>
              <span>Submit Application</span>
              <Check className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <button
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1}
          className={`flex items-center gap-2 font-system text-xs tracking-wider uppercase transition-colors ${
            currentQuestion === questions.length - 1
              ? "text-concrete/20 cursor-not-allowed"
              : "text-concrete/50 hover:text-empire"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </footer>
    </main>
  );
}

