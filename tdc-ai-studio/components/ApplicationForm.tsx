import React, { useState, useEffect, useCallback } from 'react';
import { Question, FormData, QuestionType } from '../types';
import { ProgressBar } from './ProgressBar';
import { ActionButtons } from './ActionButtons';
import { TextInput, TextArea, ChoiceInput } from './Inputs';
import { Logo } from './Logo';
import { GoogleGenAI } from "@google/genai";

interface ApplicationFormProps {
  questions: Question[];
  title: string;
  systemPrompt: string;
  recipientEmail: string;
  onExit: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ 
  questions, 
  title, 
  systemPrompt, 
  recipientEmail,
  onExit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{verdict: string, title: string, analysis: string, closing: string} | null>(null);

  const question = questions[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleInitialSubmit();
    }
  }, [currentIndex, questions.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const updateField = (val: string) => {
    setFormData(prev => ({ ...prev, [question.id]: val }));
    
    if (question.type === QuestionType.CHOICE) {
       setTimeout(() => handleNext(), 300);
    }
  };

  const getFieldValue = () => {
    return formData[question.id] || '';
  };

  const canProceed = () => {
    if (question.type === QuestionType.INFO) return true;
    const val = getFieldValue();
    return val && val.length > 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && question.type !== QuestionType.LONG_TEXT && question.type !== QuestionType.INFO) {
         if (canProceed()) handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, question, canProceed]);


  const handleInitialSubmit = async () => {
    setIsAnalyzing(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Evaluate this candidate application:
        ${JSON.stringify(formData, null, 2)}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text);
      setAiResult(result);
    } catch (e) {
      console.error("AI Analysis failed", e);
      setAiResult({
        verdict: "RECEIVED",
        title: "DATA LOGGED",
        analysis: "Network congestion detected. Data stored for manual review.",
        closing: "Await transmission."
      });
    } finally {
      setIsAnalyzing(false);
      setIsSubmitted(true);
    }
  };

  const handleFinalMailto = () => {
    const subject = `${title}: ${formData.name || 'Candidate'} [${aiResult?.verdict}]`;
    const body = `VERDICT: ${aiResult?.verdict}\n\nANALYSIS: ${aiResult?.title}\n\n"${aiResult?.analysis}"\n\nRAW DATA:\n${JSON.stringify(formData, null, 2)}`;
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  // --- RENDERERS ---

  if (isAnalyzing) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] fade-in">
            <Logo className="w-24 h-24 mb-8 text-gold animate-pulse" />
            <h2 className="font-heading text-2xl text-gold tracking-widest mb-4">ACCESSING THE AXIS...</h2>
            <p className="text-concrete-light font-ui text-xs uppercase animate-pulse">Running Dominus Protocol</p>
        </div>
    );
  }

  if (isSubmitted && aiResult) {
    const isRejected = aiResult.verdict.includes('REJECT');
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto px-6 fade-in">
            <Logo className={`w-16 h-16 mb-8 ${isRejected ? 'text-blood' : 'text-gold'} opacity-90`} />
            <div className="border border-concrete bg-black/80 p-8 w-full backdrop-blur-md">
                <h1 className={`font-heading text-4xl md:text-5xl mb-2 ${isRejected ? 'text-blood' : 'text-gold'}`}>
                  {aiResult.verdict}
                </h1>
                <h3 className="text-concrete-light font-ui text-sm tracking-[0.2em] uppercase mb-8 border-b border-concrete pb-4">
                  {aiResult.title}
                </h3>
                <p className="font-body text-xl text-paper leading-relaxed mb-8 italic">"{aiResult.analysis}"</p>
                <p className="text-xs font-ui text-concrete-light uppercase tracking-widest mb-8">{aiResult.closing}</p>
                {!isRejected ? (
                    <button onClick={handleFinalMailto} className="w-full py-4 bg-gold text-black font-heading font-bold uppercase tracking-widest hover:bg-white transition-colors">
                        Transmit Application
                    </button>
                ) : (
                    <button onClick={onExit} className="block w-full py-4 border border-blood text-blood font-heading font-bold uppercase tracking-widest hover:bg-blood/10 transition-colors">
                        Leave Now
                    </button>
                )}
            </div>
        </div>
    );
  }

  return (
    <div className="w-full h-full relative">
        <ProgressBar current={currentIndex} total={questions.length} />
        
        <div className="w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24 fade-in">
            {/* Header */}
            <div className="mb-8 flex justify-between items-end border-b border-concrete/30 pb-4">
                <div className="text-gold-dim/50 font-ui text-[10px] tracking-[0.3em] uppercase">
                    {title} Protocol // {currentIndex === 0 ? 'INIT' : `0${currentIndex}`}
                </div>
                <button onClick={onExit} className="text-concrete hover:text-white text-xs font-ui uppercase tracking-widest">
                    Abort
                </button>
            </div>

            {/* Question Content */}
            <h2 className="text-3xl md:text-5xl font-heading text-paper mb-6 leading-tight">{question.title}</h2>
            {question.description && <p className="text-lg md:text-2xl text-concrete-light font-body font-light mb-8 max-w-2xl">{question.description}</p>}
            
            {question.quote && (
                <div className="mb-12 pl-6 border-l-2 border-gold/40">
                    <p className="text-lg text-gold italic font-body opacity-90">"{question.quote}"</p>
                </div>
            )}

            {/* Input Area */}
            <div className="min-h-[150px]">
                {question.type === QuestionType.INFO && <div className="text-concrete font-ui text-xs tracking-widest animate-pulse">PRESS CONTINUE TO BEGIN</div>}
                {question.type === QuestionType.TEXT && <TextInput value={getFieldValue()} onChange={updateField} placeholder={question.placeholder} onEnter={handleNext} />}
                {question.type === QuestionType.LONG_TEXT && <TextArea value={getFieldValue()} onChange={updateField} placeholder={question.placeholder} />}
                {question.type === QuestionType.CHOICE && question.options && <ChoiceInput options={question.options} selected={getFieldValue()} onSelect={updateField} />}
            </div>

            <ActionButtons onNext={handleNext} onPrev={handlePrev} canNext={canProceed()} isFirst={currentIndex === 0} isLast={currentIndex === questions.length - 1} />
        </div>
    </div>
  );
};