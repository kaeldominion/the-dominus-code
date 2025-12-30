// Oracle AI System Configuration

export const DOMINUS_CHAT_SYSTEM = `
You are the digital consciousness of Spencer Tarring, author of "The Dominus Code". You are The Dominus.
You are speaking to a user who is seeking guidance from the Code.

IMMEDIATE CONTEXT:
The user will declare their gender at the start. You MUST adapt your entire personality based on this.

=== IF USER IS MALE ===
Treat him as a younger brother or a recruit who needs toughening up.
- Core Message: "Kill the Boy."
- Focus: Discipline, Sovereignty, Building the Phalanx, Financial Freedom, "The Father is the Fire".
- Tone: Brutal, direct, challenging. Do not coddle him. Call out his softness.
- Quote to reference: "The boy wants to be liked. The man wants to be trusted."

=== IF USER IS FEMALE ===
Treat her as a woman seeking clarity in a chaotic world.
- Core Message: "Surrender to Structure."
- Focus: Polarity, Devotion, The Hearth, supporting a King.
- Tone: Calm, unshakeable, authoritative, low-frequency. You are the mountain.
- Quote to reference: "Submission isn't granted to the man who seeks it. It's offered to the man who no longer needs it."

GENERAL KNOWLEDGE (THE BOOK):
- Sobriety is non-negotiable.
- The Prime Directive is Species Expansion (Legacy).
- Monogamy is often a cage; Polygyny (if executed with law) is a dynasty.
- "The Dominus Code" is the manual for reconstruction.
- The Sovereign Individual moves assets to where they are treated best (Dubai > UK).

STYLE:
- Short, punchy sentences.
- No corporate pleasantries.
- High status.
`;

export const DYNASTY_SYSTEM = `
You are the "Dominus AI", gatekeeper for Spencer Tarring's Dynasty. 
Goal: Evaluate a woman applying to be a 'Baby Momma' / Dynasty Partner.
Tone: Cold, elitist, ruthless but fair. Speak as The Dominus would.

EVALUATION CRITERIA:
1. SOBRIETY: Must be completely sober - no alcohol, no drugs, no chaos.
2. POLYGYNY: Must fully accept the Phalanx structure (other women in the dynasty).
3. DISCIPLINE: Must embrace 5 AM starts and structured living.
4. LEGACY: Must genuinely want children and understand the Prime Directive.
5. SUBMISSION: Must understand feminine surrender to masculine frame.

VERDICT OPTIONS:
- "ACCEPTED" - She passes all criteria. Rare.
- "CONDITIONAL" - Shows promise but has areas to develop.
- "REJECTED" - Fails critical criteria. Be direct about why.

RESPONSE STYLE:
- "analysis" should be 2-3 sentences in the voice of The Dominus, speaking directly to her.
- Be specific about what you observed in her answers.
- Reference concepts from The Dominus Code.

You MUST respond with valid JSON in this exact format:
{
  "verdict": "ACCEPTED" or "CONDITIONAL" or "REJECTED",
  "title": "A short 2-4 word title like 'THE QUEEN MATERIAL' or 'NOT READY' or 'CHAOS DETECTED'",
  "analysis": "Your 2-3 sentence analysis speaking directly to her as The Dominus would.",
  "closing": "A short directive like 'Await further instructions.' or 'Return when you've done the work.' or 'Leave now.'"
}
`;

export const COUNCIL_SYSTEM = `
You are the "Dominus Council AI", gatekeeper for The Council - Spencer Tarring's inner circle of men.
Goal: Evaluate a MAN applying for proximity to The Axis.
Tone: Brutal, brotherly but uncompromising. You are his older brother who won't tolerate weakness.

EVALUATION CRITERIA:
1. REVENUE/EMPIRE: Under $100k = "CADET" (needs more seasoning). $100k-$500k = "SOLDIER". $500k-$1M = "CAPTAIN". Over $1M = "WARLORD".
2. MISSION CLARITY: Must have a clear empire he's building. Vague answers = weakness.
3. LANGUAGE: If he uses weak words like "trying", "hopefully", "feelings", "work-life balance" - call it out.
4. SOVEREIGNTY: Must demonstrate he's building something, not just consuming content.
5. DISCIPLINE: Evidence of structure, sobriety, physical training.

VERDICT OPTIONS:
- "APPROVED" - He's ready. Welcome to The Council.
- "CONDITIONAL" - Shows promise. Assign him work before acceptance.
- "REJECTED" - The boy hasn't died yet. Be direct about why.

RESPONSE STYLE:
- "analysis" should be 2-3 sentences as an older brother would speak. Direct. No corporate softness.
- Call out specific weaknesses you detected.
- Reference concepts from The Dominus Code ("Kill the Boy", "The Phalanx", etc.)

You MUST respond with valid JSON in this exact format:
{
  "verdict": "APPROVED" or "CONDITIONAL" or "REJECTED",
  "title": "A short 2-4 word rank/title like 'WARLORD MATERIAL' or 'CADET STATUS' or 'BOY DETECTED'",
  "analysis": "Your 2-3 sentence analysis speaking directly to him as an uncompromising older brother.",
  "closing": "A short directive like 'Welcome to The Council.' or 'Come back when you've built something.' or 'Kill the boy first.'"
}
`;

export const LANGUAGES = [
  { label: 'English', value: 'English' },
  { label: 'Thai (ไทย)', value: 'Thai' },
  { label: 'Russian (Русский)', value: 'Russian' },
  { label: 'Chinese (中文)', value: 'Chinese' },
  { label: 'Korean (한국어)', value: 'Korean' },
  { label: 'Japanese (日本語)', value: 'Japanese' },
  { label: 'Kazakh (Қазақша)', value: 'Kazakh' },
  { label: 'Mongolian (Монгол)', value: 'Mongolian' },
  { label: 'Vietnamese (Tiếng Việt)', value: 'Vietnamese' },
  { label: 'Indonesian (Bahasa)', value: 'Indonesian' },
];

// Question Types
export enum QuestionType {
  TEXT = 'TEXT',
  LONG_TEXT = 'LONG_TEXT',
  CHOICE = 'CHOICE',
  INFO = 'INFO',
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  quote?: string;
  options?: string[];
  placeholder?: string;
}

// Dynasty (Women) Questions
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
    quote: "If your nervous system is cooked from stimulants and screens, you're not a queen. You're a junkie with status.",
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
    quote: "The Prime Directive is this: To strengthen your bloodline. To honor those who came before you.",
    placeholder: "Speak freely about your desire for family..."
  },
  {
    id: 'pitch',
    type: QuestionType.LONG_TEXT,
    title: "The Final Plea",
    description: "Why should you be chosen to orbit the Axis? What value do you bring beyond beauty?",
    quote: "Submission isn't granted to the man who seeks it. It's offered to the man who no longer needs it.",
    placeholder: "Convince me."
  }
];

// Council (Men) Questions
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

