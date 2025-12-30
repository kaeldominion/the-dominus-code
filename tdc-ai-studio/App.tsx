// ... (imports remain the same)
import React, { useState } from 'react';
import { DYNASTY_QUESTIONS, COUNCIL_QUESTIONS } from './constants';
import { AppMode } from './types';
import { Preloader } from './components/Preloader';
import { Logo } from './components/Logo';
import { ChatInterface } from './components/ChatInterface';
import { ApplicationForm } from './components/ApplicationForm';
import { MediaPage } from './components/MediaPage';
import { AudioPlayer } from './components/AudioPlayer';
import { Countdown } from './components/Countdown';
import { ScrollReveal } from './components/ScrollReveal';

// --- CONFIGURATION: ADD YOUR IMAGES HERE ---
const ASSETS = {
  // Put these files in your public/root folder, or replace with external URLs
  bookCover: './book.jpg', 
  authorPhoto: './spencer.jpg', 
  // If you don't have a bg.jpg, it will fall back to the black void aesthetic
  background: './bg.jpg' 
};

// Fallback placeholders if images fail to load (For visual design preview only)
const PLACEHOLDERS = {
  bookCover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800', // Abstract black book vibe
  authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', // Generic man in suit
  background: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000' // Dark Marble
};

const DYNASTY_SYSTEM = `
You are the "Dominus AI", gatekeeper for Spencer Tarring's Dynasty. 
Goal: Evaluate a woman applying to be a 'Baby Momma' / Dynasty Partner.
Tone: Cold, elitist, ruthless.
CRITERIA:
1. SOBRIETY: Must be sober.
2. POLYGYNY: Must accept the Phalanx (other women).
3. DISCIPLINE: 5 AM starts.
4. LEGACY: Must want children.
If she fails any, REJECT. If she passes, mark ACCEPTED or CONDITIONAL.
Return JSON: { verdict, title, analysis, closing }.
`;

const COUNCIL_SYSTEM = `
You are the "Dominus Council AI". 
Goal: Evaluate a MAN applying for The Council (Inner Circle).
Tone: Brutal, brotherly but harsh, challenging.
CRITERIA:
1. REVENUE: If under $100k, label "CADET" (Conditional). If >$1M, label "WARLORD".
2. MISSION: Must have a clear empire.
3. WEAKNESS: If he mentions "trying" or "feelings", crush him.
Return JSON: { verdict, title, analysis, closing }.
`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<AppMode>('HOME');
  const [expandedBio, setExpandedBio] = useState(false);

  // Image Error Handling State
  const [imgError, setImgError] = useState({ book: false, author: false, bg: false });

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  // --- SECTIONS ---

  const renderHero = () => (
    <div className="flex flex-col justify-center py-12 md:py-20 lg:py-32 px-6 relative w-full overflow-hidden">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
            {/* Left: Book Cover - Now Animated */}
            <ScrollReveal className="md:col-span-5 relative group w-full max-w-[280px] md:max-w-md mx-auto md:mx-0 z-20">
                 <div className="aspect-[2/3] bg-zinc-900 border border-concrete shadow-[0_0_40px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-20"></div>
                     <img 
                        src={imgError.book ? PLACEHOLDERS.bookCover : ASSETS.bookCover} 
                        alt="The Dominus Code Book" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" 
                        onError={() => setImgError(prev => ({...prev, book: true}))}
                     />
                 </div>
                 {/* Decorative element behind book */}
                 <div className="absolute -inset-4 border border-gold/20 -z-10 translate-x-4 translate-y-4 hidden md:block"></div>
            </ScrollReveal>

            {/* Right: Copy & Actions - Centered on Mobile, Left on Desktop */}
            <div className="md:col-span-7 flex flex-col gap-6 md:gap-8 text-center md:text-left relative z-10 pt-4 md:pt-16">
                <div>
                    <ScrollReveal delay={100}>
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                            <div className="h-px w-8 md:w-12 bg-gold"></div>
                            <h2 className="font-heading text-gold text-xs md:text-sm tracking-[0.3em] uppercase">The Manifesto</h2>
                            <div className="h-px w-8 bg-gold md:hidden"></div>
                        </div>
                    </ScrollReveal>
                    
                    {/* KILL THE BOY */}
                    <ScrollReveal delay={200}>
                        <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl text-white mb-6 leading-[0.9] tracking-tight mx-auto md:mx-0 max-w-lg md:max-w-none">
                            KILL THE BOY
                        </h1>
                    </ScrollReveal>
                    
                    {/* Subheadline - Centered on Mobile (No border-l) */}
                    <ScrollReveal delay={300}>
                        <div className="w-full flex justify-center md:justify-start">
                            <h3 className="font-heading text-xl md:text-2xl text-gold mb-8 tracking-widest md:border-l-4 md:border-gold md:pl-6 py-1 md:py-2">
                                F*CK MONOGAMY.<br/>BUILD A DYNASTY.
                            </h3>
                        </div>
                    </ScrollReveal>
                    
                    {/* Quote - Increased size for mobile */}
                    <ScrollReveal delay={400}>
                        <p className="font-body text-xl md:text-2xl text-paper/80 leading-relaxed italic mb-10 max-w-xl mx-auto md:mx-0">
                            "The boy wants to be liked. The man wants to be trusted. The Code is the manual for the reconstruction of the Patriarch."
                        </p>
                    </ScrollReveal>
                </div>
                
                <ScrollReveal delay={500}>
                    <div className="flex flex-col gap-8 items-center md:items-start">
                        <div className="grid grid-cols-2 gap-4 w-full max-w-sm md:max-w-md">
                            <a href="https://a.co/d/hlsG23E" target="_blank" rel="noreferrer" className="py-4 bg-gold hover:bg-white text-black font-heading font-bold uppercase tracking-widest text-xs text-center transition-colors shadow-[0_0_20px_rgba(229,195,114,0.3)]">
                                AMAZON
                            </a>
                            <a href="https://books.apple.com/gb/book/the-dominus-code/id6756301151" target="_blank" rel="noreferrer" className="py-4 border border-concrete hover:border-white text-white font-heading font-bold uppercase tracking-widest text-xs text-center transition-colors backdrop-blur-sm">
                                APPLE BOOKS
                            </a>
                        </div>
                        
                        {/* Formats */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-ui uppercase tracking-widest text-concrete-light">
                            <span className="border border-concrete px-4 py-2">EBOOK</span>
                            <span className="border border-concrete px-4 py-2">PAPERBACK</span>
                            <span className="border border-concrete px-4 py-2">HARDCOVER</span>
                            <span className="border border-gold/50 px-4 py-2 text-gold">AUDIO BOOK</span>
                        </div>

                        <div className="md:-ml-6 w-full">
                            <Countdown />
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </div>
  );

  const renderOracleSection = () => (
    <section className="w-full border-y border-concrete/30 bg-zinc-900/20 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text Content */}
            <ScrollReveal className="text-center md:text-left order-2 lg:order-1">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                   <Logo className="w-8 h-8 text-gold animate-pulse" />
                   <span className="font-ui text-[10px] text-gold uppercase tracking-[0.3em]">AI Protocol v3.0</span>
                </div>
                <h2 className="font-heading text-3xl md:text-5xl text-white mb-6">The Oracle of the Axis</h2>
                <p className="font-body text-xl text-paper/70 mb-8 leading-relaxed mx-auto md:mx-0 max-w-xl">
                    "This is not a chatbot. It is the digital consciousness of the Dominus. 
                    It does not offer comfort; it offers truth. Consult the Oracle for guidance on the Code, 
                    the Dynasty, or the reconstruction of your own sovereignty."
                </p>
                
                <button 
                    onClick={() => setView('ORACLE')}
                    className="w-full md:w-auto px-8 py-4 bg-transparent border border-gold text-gold font-heading font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center gap-4 mx-auto md:mx-0"
                >
                    ENTER THE CHAMBER
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
            </ScrollReveal>

            {/* Visual Chat Preview */}
            <ScrollReveal delay={200} className="order-1 lg:order-2 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-concrete/20 blur opacity-20"></div>
                <div className="relative bg-black border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
                    <div className="bg-zinc-900/80 border-b border-zinc-800 p-3 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-900/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-900/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-900/50"></div>
                        </div>
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">Secure Connection</div>
                    </div>
                    <div className="p-6 font-mono text-xs md:text-sm space-y-6">
                        <div className="flex flex-col gap-2 opacity-50">
                            <span className="text-zinc-500 uppercase text-[9px]">User [Man]</span>
                            <div className="text-zinc-300 border-l-2 border-zinc-700 pl-3">
                                I feel lost. I have money but no purpose.
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-gold uppercase text-[9px]">The Dominus</span>
                            <div className="text-gold-light border-l-2 border-gold pl-3 leading-relaxed">
                                <span className="text-white">You are not lost; you are drifting.</span>
                                <br/><br/>
                                Set a time. 05:00. Wake up. Train. Kill the boy.
                            </div>
                        </div>
                        <div className="h-4 w-2 bg-gold animate-pulse"></div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
  );

  const renderArchitectSection = () => (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Photo Column */}
        <ScrollReveal className="md:col-span-5 relative">
            <div className="aspect-[3/4] bg-zinc-800 border border-concrete relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 group">
                <img 
                    src={imgError.author ? PLACEHOLDERS.authorPhoto : ASSETS.authorPhoto} 
                    alt="Spencer Tarring" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={() => setImgError(prev => ({...prev, author: true}))} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-0 w-full text-center group-hover:opacity-0 transition-opacity duration-500">
                    <span className="text-concrete-light font-heading opacity-50 text-4xl">THE ARCHITECT</span>
                </div>
            </div>
            
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
                <a href="https://instagram.com/spencertarringx" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 border border-concrete text-concrete-light hover:text-gold hover:border-gold transition-colors">
                    <span className="font-ui text-[10px] uppercase tracking-widest">IG @spencertarringx</span>
                </a>
                <a href="https://twitter.com/spencertarring" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 border border-concrete text-concrete-light hover:text-gold hover:border-gold transition-colors">
                    <span className="font-ui text-[10px] uppercase tracking-widest">X @spencertarring</span>
                </a>
            </div>
        </ScrollReveal>

        {/* Bio Column */}
        <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
            <ScrollReveal delay={200}>
                <h3 className="font-ui text-xs text-gold uppercase tracking-[0.4em] mb-4">The Architect</h3>
                <h2 className="font-heading text-4xl md:text-6xl text-white mb-8">SPENCER TARRING</h2>
                
                <div className="font-body text-xl text-paper/80 space-y-6 leading-relaxed">
                    <p>
                        Spencer Tarring is the author of <strong>The Dominus Code</strong> and the architect of a sovereign life. A former tech CEO who exited for millions in his twenties, he spent a decade in Shanghai's high-society nightlife before rejecting modern degeneracy to build a legacy of order.
                    </p>
                    <p>
                        Today, he builds critical digital infrastructure, leads a multi-woman dynasty, and teaches men how to kill the "Boy" to build the "King." He is a Realist, a builder, and a Dominus.
                    </p>

                    {expandedBio && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
                            <hr className="border-concrete/30 my-8"/>
                            
                            <p className="italic text-gold/80">
                                "Spencer Tarring is not here to sell you a fantasy. He has lived too many of them already."
                            </p>

                            <h4 className="font-heading text-white text-lg tracking-widest mt-8">THE RISE</h4>
                            <p>
                                Spencer's education didn't happen in a university lecture hall. It began at eighteen, in a small room above a tyre shop in Reading. As the co-founder of Dedipower, he built a data infrastructure company from the ground up using 16-hour days and unrelenting drive. He took a business born in grit and scaled it into a corporate powerhouse, achieving a multi-million pound exit that secured his financial freedom before most men had started their careers.
                            </p>
                            
                             <h4 className="font-heading text-white text-lg tracking-widest mt-8">THE DEATH OF THE BOY</h4>
                            <p>
                                The shift arrived on December 31st, 2020. No party. No stage. Just silence and the brutal realization that the "dream" was empty. In that silence, the Boy died. Spencer quit alcohol cold turkey and began the slow, violent work of reconstruction.
                            </p>
                            
                            <p className="pt-6 font-bold text-white">
                                Spencer Tarring is building the Ark for the flood that is coming. The Dominus Code is your invitation to get on board.
                            </p>
                        </div>
                    )}
                </div>

                <button 
                    onClick={() => setExpandedBio(!expandedBio)}
                    className="mt-8 self-center md:self-start text-xs font-ui uppercase tracking-widest text-gold hover:text-white transition-colors border-b border-gold hover:border-white pb-1"
                >
                    {expandedBio ? "READ LESS" : "READ FULL BIOGRAPHY"}
                </button>
            </ScrollReveal>
        </div>
    </section>
  );

  const renderPathSelection = () => (
    <div className="w-full max-w-6xl mx-auto border-t border-concrete pt-16 md:pt-20 pb-24 md:pb-32 px-6">
        <ScrollReveal>
            <h3 className="text-center font-ui text-xs text-concrete-light uppercase tracking-[0.4em] mb-12 md:mb-16">Select Your Application Protocol</h3>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Men */}
            <ScrollReveal delay={100}>
                <button 
                    onClick={() => setView('COUNCIL')}
                    className="group relative h-auto min-h-[450px] md:h-[500px] border border-concrete bg-zinc-900/40 hover:bg-zinc-900 transition-colors p-8 flex flex-col items-center text-center overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(42,42,42,0.5)] w-full"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90"></div>
                    
                    <div className="relative z-10 flex flex-col h-full items-center justify-between">
                        <div>
                             <div className="mt-6 md:mt-8 mb-6 p-4 border border-zinc-700 rounded-full bg-black group-hover:border-gold group-hover:text-gold transition-colors inline-block">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </div>
                            <span className="block font-heading text-4xl md:text-5xl text-white group-hover:text-gold transition-colors mb-2">The Council</span>
                            <span className="block font-ui text-[10px] text-concrete-light uppercase tracking-widest mb-8">For Men Seeking Power</span>
                            <p className="font-body text-zinc-400 text-lg leading-relaxed max-w-sm mx-auto">
                                A brotherhood of builders. Access to the inner circle is earned, not bought. 
                                Verify your revenue. Prove your mission. Kill the boy.
                            </p>
                        </div>

                        <div className="mt-8 px-8 py-3 border border-concrete text-white uppercase tracking-[0.2em] text-xs group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all font-bold w-full md:w-auto">
                            BEGIN APPLICATION
                        </div>
                    </div>
                </button>
            </ScrollReveal>

            {/* Women */}
            <ScrollReveal delay={200}>
                <button 
                    onClick={() => setView('DYNASTY')}
                    className="group relative h-auto min-h-[450px] md:h-[500px] border border-concrete bg-zinc-900/40 hover:bg-zinc-900 transition-colors p-8 flex flex-col items-center text-center overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(229,195,114,0.2)] w-full"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90"></div>

                    <div className="relative z-10 flex flex-col h-full items-center justify-between">
                         <div>
                            <div className="mt-6 md:mt-8 mb-6 p-4 border border-zinc-700 rounded-full bg-black group-hover:border-gold group-hover:text-gold transition-colors inline-block">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </div>

                            <span className="block font-heading text-4xl md:text-5xl text-white group-hover:text-gold transition-colors mb-2">The Dynasty</span>
                            <span className="block font-ui text-[10px] text-concrete-light uppercase tracking-widest mb-8">For Women Seeking Order</span>
                            
                            <p className="font-body text-zinc-400 text-lg leading-relaxed max-w-sm mx-auto">
                                Legacy. Order. Purpose. Join the Phalanx. 
                                Submit your application for consideration in the Dominus Dynasty.
                            </p>
                        </div>

                        <div className="mt-8 px-8 py-3 border border-concrete text-white uppercase tracking-[0.2em] text-xs group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all font-bold w-full md:w-auto">
                            BEGIN APPLICATION
                        </div>
                    </div>
                </button>
            </ScrollReveal>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-void flex flex-col relative selection:bg-gold selection:text-black font-sans overflow-x-hidden">
      
      {/* Background Ambience & Images */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <img 
            src={imgError.bg ? PLACEHOLDERS.background : ASSETS.background} 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale mix-blend-overlay"
            onError={() => setImgError(prev => ({...prev, bg: true}))}
         />
         {/* Procedural Lighting */}
         <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gold/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-concrete/10 rounded-full blur-[100px]"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-screen"></div>
         {/* Darker Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"></div>
         <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full border-b border-concrete/30 bg-black/90 backdrop-blur-md sticky top-0">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <button onClick={() => setView('HOME')} className="flex items-center gap-3 group">
                  <Logo className="w-8 h-8 text-gold transition-transform group-hover:scale-110" />
                  <span className="font-heading text-white tracking-[0.2em] text-sm hidden lg:block group-hover:text-gold transition-colors uppercase">The Dominus Code</span>
              </button>

              <div className="flex items-center gap-4 md:gap-8 font-ui text-[9px] md:text-[10px] uppercase tracking-widest">
                  <button onClick={() => setView('ORACLE')} className={`hover:text-gold transition-colors hidden md:block ${view === 'ORACLE' ? 'text-gold' : 'text-concrete-light'}`}>ORACLE</button>
                  <button onClick={() => setView('MEDIA')} className={`hover:text-gold transition-colors hidden md:block ${view === 'MEDIA' ? 'text-gold' : 'text-concrete-light'}`}>MEDIA</button>
                  <a href="https://a.co/d/hlsG23E" target="_blank" rel="noreferrer" className="px-3 md:px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-all font-bold">BUY BOOK</a>
              </div>
          </div>
      </nav>

      {/* Floating Audio Player */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 animate-in slide-in-from-bottom-10 fade-in duration-1000">
        <AudioPlayer />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow">
          {view === 'HOME' && (
              <>
                {renderHero()}
                {renderOracleSection()}
                {renderArchitectSection()}
                {renderPathSelection()}
              </>
          )}
          
          {view === 'DYNASTY' && (
              <ApplicationForm 
                questions={DYNASTY_QUESTIONS} 
                title="Dynasty" 
                systemPrompt={DYNASTY_SYSTEM} 
                recipientEmail="spencer@thedominuscode.com"
                onExit={() => setView('HOME')}
              />
          )}

          {view === 'COUNCIL' && (
              <ApplicationForm 
                questions={COUNCIL_QUESTIONS} 
                title="Council" 
                systemPrompt={COUNCIL_SYSTEM} 
                recipientEmail="spencer@thedominuscode.com"
                onExit={() => setView('HOME')}
              />
          )}

          {view === 'ORACLE' && (
              <div className="py-8 md:py-12 px-4 md:px-0 min-h-screen flex items-center justify-center">
                  <ChatInterface />
              </div>
          )}

          {view === 'MEDIA' && <MediaPage />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 border-t border-concrete/30 mt-auto bg-black">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                  <span className="font-heading text-gold text-lg tracking-widest">DOMINUS</span>
                  <span className="font-ui text-[9px] text-concrete-light uppercase tracking-[0.3em]">Order out of Chaos</span>
              </div>
              <div className="font-ui text-[10px] text-concrete-light uppercase tracking-widest flex flex-col md:flex-row gap-6 text-center">
                  <a href="https://instagram.com/spencertarringx" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
                  <a href="https://twitter.com/spencertarring" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TWITTER (X)</a>
                  <a href="mailto:spencer@thedominuscode.com" className="hover:text-white transition-colors">CONTACT</a>
              </div>
              <div className="text-[10px] text-zinc-700 font-mono">
                  © 2025 Spencer Tarring. All Rights Reserved.
              </div>
          </div>
      </footer>

    </div>
  );
}