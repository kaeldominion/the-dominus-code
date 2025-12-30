import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Logo } from './Logo';

const DOMINUS_CHAT_SYSTEM = `
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
- Quote to reference: "Submission isn’t granted to the man who seeks it. It’s offered to the man who no longer needs it."

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

const LANGUAGES = [
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

type SetupStep = 'LANGUAGE' | 'GENDER' | 'CHAT';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'model', text: string}>>([
    { role: 'model', text: "I am the Oracle of the Axis. Select your frequency (Language) to begin." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [setupStep, setSetupStep] = useState<SetupStep>('LANGUAGE');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, setupStep]);

  const initChat = () => {
    if (!chatSessionRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const languageInstruction = selectedLanguage !== 'English' 
        ? `\n\nCRITICAL: You MUST reply in ${selectedLanguage} language only. Adapt all concepts (Dominus, Phalanx, etc) appropriately but keep the core terminology if it adds weight.` 
        : '';

      chatSessionRef.current = ai.chats.create({
        model: 'gemini-3-pro-preview', 
        config: {
          systemInstruction: DOMINUS_CHAT_SYSTEM + languageInstruction,
        }
      });
    }
    return chatSessionRef.current;
  };

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    setSetupStep('GENDER');
    // Update the prompt text without sending an API call
    setMessages(prev => [
      { role: 'model', text: `Frequency tuned to: ${lang}.\n\nBefore we begin, declare yourself. Are you Man or Woman?` }
    ]);
  };

  const handleGenderSelect = (gender: string) => {
    setSetupStep('CHAT');
    handleSend(gender);
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsTyping(true);

    try {
      const chat = initChat();
      const response = await chat.sendMessageStream({ message: textToSend });
      
      let fullResponse = "";
      
      // Add a placeholder for the model response
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of response) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullResponse += c.text;
          // Update the last message with the accumulating text
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = { role: 'model', text: fullResponse };
            return newArr;
          });
        }
      }
    } catch (error) {
      console.error("Dominus connection failed", error);
      setMessages(prev => [...prev, { role: 'model', text: "The signal is weak. Check your conviction (or your connection)." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-4xl mx-auto border border-zinc-800 bg-black/80 backdrop-blur-sm relative fade-in">
      {/* Chat Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
        <div className="flex items-center gap-3">
            <Logo className="w-8 h-8 text-gold" />
            <div>
                <h3 className="font-heading text-gold text-lg tracking-widest">THE ORACLE</h3>
                <p className="text-[10px] text-zinc-500 uppercase font-mono">Gemini 3.0 Pro // Linked to Dominus Core</p>
            </div>
        </div>
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-4 text-sm md:text-base leading-relaxed font-sans border ${
                msg.role === 'user' 
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-300 rounded-tl-lg rounded-bl-lg rounded-tr-lg' 
                  : 'bg-gold/10 border-gold/30 text-gold-light rounded-tr-lg rounded-br-lg rounded-tl-lg shadow-[0_0_15px_rgba(229,195,114,0.1)]'
              }`}
            >
               {msg.role === 'model' && <span className="block text-[9px] uppercase tracking-widest mb-2 opacity-50">Dominus</span>}
               <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg flex gap-1">
               <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
               <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
             </div>
           </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-zinc-800 bg-black">
        
        {/* Step 1: Language Selection */}
        {setupStep === 'LANGUAGE' && (
             <div className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.value}
                            onClick={() => handleLanguageSelect(lang.value)}
                            className="px-2 py-3 bg-zinc-900 border border-zinc-700 hover:border-gold hover:text-gold text-zinc-400 font-heading uppercase tracking-widest text-[10px] transition-all truncate"
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Step 2: Gender Selection */}
        {setupStep === 'GENDER' && !isTyping && (
            <div className="flex gap-4 mb-4 justify-center animate-pulse">
                <button 
                    onClick={() => handleGenderSelect("Man")}
                    className="px-8 py-3 bg-zinc-900 border border-zinc-700 hover:border-gold hover:text-gold text-zinc-400 font-heading uppercase tracking-widest text-xs transition-all"
                >
                    I am a Man
                </button>
                <button 
                    onClick={() => handleGenderSelect("Woman")}
                    className="px-8 py-3 bg-zinc-900 border border-zinc-700 hover:border-gold hover:text-gold text-zinc-400 font-heading uppercase tracking-widest text-xs transition-all"
                >
                    I am a Woman
                </button>
            </div>
        )}

        {/* Step 3: Chat Input */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={setupStep !== 'CHAT' || isTyping}
            placeholder={
                setupStep === 'LANGUAGE' ? "Select frequency above..." : 
                setupStep === 'GENDER' ? "Declare yourself above..." : 
                "Ask the Dominus..."
            }
            className="w-full bg-zinc-900 border border-zinc-700 p-4 pr-32 text-white focus:outline-none focus:border-gold transition-colors font-serif-text placeholder-zinc-600 resize-none h-24 no-scrollbar disabled:opacity-50"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input || isTyping || setupStep !== 'CHAT'}
            className="absolute right-3 bottom-3 px-6 py-2 bg-gold hover:bg-white text-black font-heading font-bold uppercase tracking-wider text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <div className="text-center mt-2">
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">Truth over Comfort</p>
        </div>
      </div>
    </div>
  );
};