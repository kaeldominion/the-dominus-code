"use client";

import { useState } from "react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Lock } from "lucide-react";

interface Question {
  id: number;
  law: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    law: "Law I: The Oath",
    question: "Do you negotiate with your own word?",
    options: [
      { text: "I often break promises to myself", score: 1 },
      { text: "Sometimes I let things slide", score: 2 },
      { text: "I try to keep my word but struggle", score: 3 },
      { text: "My word is my bond—no exceptions", score: 5 },
    ],
  },
  {
    id: 2,
    law: "Law II: The Protocol",
    question: "Do you have a non-negotiable daily rhythm?",
    options: [
      { text: "My days are chaotic and reactive", score: 1 },
      { text: "I have loose routines that often break", score: 2 },
      { text: "I have a structure but allow flexibility", score: 3 },
      { text: "My protocol is sacred and unbreakable", score: 5 },
    ],
  },
  {
    id: 3,
    law: "Law III: The Body",
    question: "How do you treat your physical vessel?",
    options: [
      { text: "I neglect it—too busy for fitness", score: 1 },
      { text: "I work out when I feel like it", score: 2 },
      { text: "I maintain a regular fitness routine", score: 3 },
      { text: "My body is a temple—training is religion", score: 5 },
    ],
  },
  {
    id: 4,
    law: "Law IV: The Mind",
    question: "How do you feed your mind daily?",
    options: [
      { text: "Social media and entertainment mostly", score: 1 },
      { text: "Occasional reading or podcasts", score: 2 },
      { text: "Regular learning and development", score: 3 },
      { text: "Deliberate daily study and deep thinking", score: 5 },
    ],
  },
  {
    id: 5,
    law: "Law V: The Vision",
    question: "Do you have a clear 10-year vision?",
    options: [
      { text: "I live day to day", score: 1 },
      { text: "I have vague ideas about the future", score: 2 },
      { text: "I have goals but no master plan", score: 3 },
      { text: "My vision is crystal clear and written", score: 5 },
    ],
  },
  {
    id: 6,
    law: "Law VI: The Frame",
    question: "In relationships, who sets the tone?",
    options: [
      { text: "I adapt to others constantly", score: 1 },
      { text: "It depends on the situation", score: 2 },
      { text: "I hold my ground most of the time", score: 3 },
      { text: "I am the rock—others orbit me", score: 5 },
    ],
  },
  {
    id: 7,
    law: "Law VII: The Selection",
    question: "How do you choose who enters your life?",
    options: [
      { text: "I let anyone in—no standards", score: 1 },
      { text: "I'm somewhat selective", score: 2 },
      { text: "I have criteria but make exceptions", score: 3 },
      { text: "Ruthless selection—only high-value people", score: 5 },
    ],
  },
  {
    id: 8,
    law: "Law VIII: The Abundance",
    question: "How do you view opportunities and resources?",
    options: [
      { text: "Scarcity mindset—never enough", score: 1 },
      { text: "I worry about running out", score: 2 },
      { text: "I believe more is possible", score: 3 },
      { text: "Infinite abundance—I create my reality", score: 5 },
    ],
  },
  {
    id: 9,
    law: "Law IX: The Silence",
    question: "How much of your plans do you share?",
    options: [
      { text: "I tell everyone everything", score: 1 },
      { text: "I share with close friends", score: 2 },
      { text: "I'm selective about what I reveal", score: 3 },
      { text: "Move in silence—let results speak", score: 5 },
    ],
  },
  {
    id: 10,
    law: "Law X: The Legacy",
    question: "Are you building something that outlives you?",
    options: [
      { text: "I haven't thought about legacy", score: 1 },
      { text: "I think about it sometimes", score: 2 },
      { text: "I'm working toward something lasting", score: 3 },
      { text: "Everything I do serves the dynasty", score: 5 },
    ],
  },
];

function getScoreCategory(score: number): {
  title: string;
  description: string;
  color: string;
} {
  const percentage = (score / 50) * 100;

  if (percentage >= 80) {
    return {
      title: "SOVEREIGN",
      description:
        "You already embody the code. The Dominus Code will refine your edge and connect you with others at your level.",
      color: "text-gold",
    };
  } else if (percentage >= 60) {
    return {
      title: "AWAKENING",
      description:
        "You sense the truth but haven't fully committed. The Dominus Code will give you the framework to ascend.",
      color: "text-gold-light",
    };
  } else if (percentage >= 40) {
    return {
      title: "DORMANT",
      description:
        "The potential is there, buried under conditioning. The Dominus Code will strip away the lies and reveal your power.",
      color: "text-ivory",
    };
  } else {
    return {
      title: "ASLEEP",
      description:
        "You've been living someone else's script. The Dominus Code is your wake-up call. The boy must die.",
      color: "text-blood",
    };
  }
}

export default function CalibrationPage() {
  const { mode } = useApp();
  const [phase, setPhase] = useState<"intro" | "test" | "email" | "result">(
    "intro"
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState("");

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const scoreCategory = getScoreCategory(totalScore);

  const handleAnswer = (score: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: score }));
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300);
    } else {
      setPhase("email");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit to your email service
    setPhase("result");
  };

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait">
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="crown-divider mb-8">
                  <Crown
                    size={48}
                    variant={mode === "dominus" ? "blood" : "gold"}
                  />
                </div>
                <h1 className="font-display text-4xl md:text-5xl tracking-[0.1em] text-ivory mb-6">
                  THE SOVEREIGNTY TEST
                </h1>
                <p className="font-body text-xl text-ivory/60 mb-8 max-w-xl mx-auto">
                  A 10-question diagnostic based on the Laws of the Dominus.
                  Discover where you stand. Discover what must change.
                </p>
                <div className="space-y-4 text-left max-w-md mx-auto mb-12">
                  <div className="flex items-center gap-4 text-ivory/50">
                    <Check className="w-5 h-5 text-gold" />
                    <span className="font-body">10 questions • 3 minutes</span>
                  </div>
                  <div className="flex items-center gap-4 text-ivory/50">
                    <Check className="w-5 h-5 text-gold" />
                    <span className="font-body">
                      Get your Sovereignty Score
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-ivory/50">
                    <Check className="w-5 h-5 text-gold" />
                    <span className="font-body">
                      Receive the 7-Day Protocol (free)
                    </span>
                  </div>
                </div>
                <Button
                  variant={mode === "dominus" ? "blood" : "primary"}
                  size="lg"
                  icon
                  onClick={() => setPhase("test")}
                >
                  Begin Calibration
                </Button>
              </motion.div>
            )}

            {phase === "test" && (
              <motion.div
                key="test"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {/* Progress */}
                <div className="mb-12">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-display tracking-widest text-gold">
                      {questions[currentQuestion].law}
                    </span>
                    <span className="font-body text-ivory/50">
                      {currentQuestion + 1} / {questions.length}
                    </span>
                  </div>
                  <div className="h-1 bg-obsidian border border-gold/20">
                    <motion.div
                      className={`h-full ${
                        mode === "dominus" ? "bg-blood" : "bg-gold"
                      }`}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl md:text-3xl tracking-[0.05em] text-ivory mb-12 text-center">
                    {questions[currentQuestion].question}
                  </h2>

                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(option.score)}
                        className={`w-full p-6 text-left border transition-all ${
                          answers[currentQuestion] === option.score
                            ? mode === "dominus"
                              ? "border-blood bg-blood/10"
                              : "border-gold bg-gold/10"
                            : "border-gold/20 hover:border-gold/50 bg-obsidian/50"
                        }`}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-body text-lg text-ivory">
                          {option.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between mt-12">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className={`flex items-center gap-2 font-display text-sm tracking-widest ${
                      currentQuestion === 0
                        ? "text-ivory/20 cursor-not-allowed"
                        : "text-gold hover:text-gold-light"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <span className="font-impact text-4xl text-gold/20">
                    {currentQuestion + 1}
                  </span>
                </div>
              </motion.div>
            )}

            {phase === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center border-2 border-gold">
                  <Lock className="w-8 h-8 text-gold" />
                </div>
                <h2 className="font-display text-3xl tracking-[0.1em] text-ivory mb-4">
                  YOUR RESULTS ARE READY
                </h2>
                <p className="font-body text-lg text-ivory/60 mb-8">
                  Enter your email to unlock your Sovereignty Score and receive
                  the free 7-Day Protocol.
                </p>
                <form
                  onSubmit={handleEmailSubmit}
                  className="max-w-md mx-auto space-y-4"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="input-brutal"
                  />
                  <Button
                    type="submit"
                    variant={mode === "dominus" ? "blood" : "primary"}
                    className="w-full"
                    icon
                  >
                    Reveal My Score
                  </Button>
                </form>
                <p className="font-body text-xs text-ivory/30 mt-6">
                  No spam. Unsubscribe anytime. A sovereign&apos;s word.
                </p>
              </motion.div>
            )}

            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <Crown
                  size={64}
                  variant={mode === "dominus" ? "blood" : "gold"}
                />
                <div className="mt-8 mb-4">
                  <span className="font-impact text-8xl md:text-9xl text-gold">
                    {totalScore}
                  </span>
                  <span className="font-impact text-4xl text-ivory/30">/50</span>
                </div>
                <h2
                  className={`font-display text-3xl tracking-[0.2em] ${scoreCategory.color} mb-6`}
                >
                  {scoreCategory.title}
                </h2>
                <p className="font-body text-lg text-ivory/70 max-w-xl mx-auto mb-12">
                  {scoreCategory.description}
                </p>
                <div className="space-y-4">
                  <Button
                    variant={mode === "dominus" ? "blood" : "primary"}
                    size="lg"
                    onClick={() => (window.location.href = "/")}
                  >
                    Enter The Code
                  </Button>
                  <p className="font-body text-sm text-ivory/50">
                    Check your email for the 7-Day Protocol PDF
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}

