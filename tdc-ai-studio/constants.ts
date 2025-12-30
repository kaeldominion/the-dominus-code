import { Question, QuestionType } from './types';

// --- DYNASTY (WOMEN) QUESTIONS ---
export const DYNASTY_QUESTIONS: Question[] = [
  {
    id: 'intro',
    type: QuestionType.INFO,
    title: "The Casting",
    description: "You are not applying for a relationship. You are applying for a position in a Dynasty. Read 'The Dominus Code' before proceeding.",
    quote: "I don't hunt. I cast. I am looking for the woman who can hold the gaze of a King without flinching."
  },
  {
    id: 'name',
    type: QuestionType.TEXT,
    title: "Who are you?",
    description: "State your name.",
    placeholder: "Full Name"
  },
  {
    id: 'age',
    type: QuestionType.TEXT,
    title: "Vital Statistics",
    description: "Age and Current Location.",
    placeholder: "e.g., 24, Dubai"
  },
  {
    id: 'instagram',
    type: QuestionType.TEXT,
    title: "The Visual Audit",
    description: "Your public profile is your resume. Provide your Instagram handle. It must be public.",
    placeholder: "@username",
    quote: "Your Instagram is a carefully curated shrine. I cast for character, but aesthetics matter."
  },
  {
    id: 'lifestyle',
    type: QuestionType.CHOICE,
    title: "The Law of Energy",
    description: "The Dominus Code demands absolute sobriety from addiction. Alcohol is poison. Chaos is rejected.",
    quote: "If your nervous system is cooked from stimulants and screens, you’re not a queen. You’re a junkie with status.",
    options: [
      "I live a clean, disciplined life.",
      "I am willing to submit to the Code (Zero alcohol/drugs).",
      "I cannot give up my vices."
    ]
  },
  {
    id: 'structure',
    type: QuestionType.CHOICE,
    title: "The Sisterhood",
    description: "This is a Dynasty. There are other women. They are not rivals; they are your Phalanx. Can you accept this structure?",
    quote: "One woman cannot carry a dynasty without breaking. The women are not rivals. They are a circle.",
    options: [
      "I desire the sisterhood and structure.",
      "I am open to learning if the King is worthy.",
      "I require monogamy (Leave now)."
    ]
  },
  {
    id: 'discipline',
    type: QuestionType.CHOICE,
    title: "The Rhythm",
    description: "5 AM starts. Training daily. Cold water. No drama. Do you seek comfort or growth?",
    quote: "Comfort is not happiness; comfort is merely anesthesia. Real happiness is Purpose.",
    options: [
      "I crave order and leadership.",
      "I can adapt to the standard.",
      "I prefer a soft, unstructured life."
    ]
  },
  {
    id: 'fertility',
    type: QuestionType.LONG_TEXT,
    title: "The Prime Directive",
    description: "The goal is legacy. Children raised by the Code. What is your view on motherhood and lineage?",
    quote: "The Prime Directive is this: To strengthen your bloodline. To honour those who came before you.",
    placeholder: "Speak freely about your desire for family..."
  },
  {
    id: 'pitch',
    type: QuestionType.LONG_TEXT,
    title: "The Final Plea",
    description: "Why should you be chosen to orbit the Axis? What value do you bring beyond beauty?",
    quote: "Submission isn’t granted to the man who seeks it. It’s offered to the man who no longer needs it.",
    placeholder: "Convince me."
  }
];

// --- COUNCIL (MEN) QUESTIONS ---
export const COUNCIL_QUESTIONS: Question[] = [
  {
    id: 'intro',
    type: QuestionType.INFO,
    title: "The Council",
    description: "Access to the inner circle is not bought; it is earned. You are applying for proximity to the Axis. Weakness is not tolerated.",
    quote: "The boy wants to be liked. The man wants to be trusted."
  },
  {
    id: 'name',
    type: QuestionType.TEXT,
    title: "Identity",
    description: "State your name.",
    placeholder: "Full Name"
  },
  {
    id: 'stats',
    type: QuestionType.TEXT,
    title: "Metrics",
    description: "Age, Location, Height, Weight.",
    placeholder: "e.g., 32, London, 6'2, 95kg"
  },
  {
    id: 'revenue',
    type: QuestionType.CHOICE,
    title: "Resource Control",
    description: "A man without resources cannot protect the tribe. What is your annual net revenue?",
    quote: "Money is not the goal. Money is the ammunition.",
    options: [
      "Under $100k (Cadet)",
      "$100k - $500k (Soldier)",
      "$500k - $1M (Captain)",
      "$1M+ (Warlord)"
    ]
  },
  {
    id: 'mission',
    type: QuestionType.LONG_TEXT,
    title: "The Mission",
    description: "What are you building? If you are merely working a job, leave now. Describe your Empire.",
    placeholder: "Describe your business or mission...",
    quote: "A man without a mission is a leaf in the wind."
  },
  {
    id: 'value_add',
    type: QuestionType.LONG_TEXT,
    title: "The Tribute",
    description: "The Council is an exchange of power. What specific skill or resource do you bring to the table?",
    placeholder: "I am an expert in...",
    quote: "Don't come to take. Come to give, and you will receive tenfold."
  },
  {
    id: 'commitment',
    type: QuestionType.CHOICE,
    title: "The Oath",
    description: "The Code requires silence, loyalty, and absolute brutality in business. Are you ready to kill the boy?",
    options: [
      "I am ready to kill the boy.",
      "I need more time.",
      "I prefer the easy path."
    ]
  }
];