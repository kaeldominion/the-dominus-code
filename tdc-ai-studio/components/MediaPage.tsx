import React from 'react';
import { Logo } from './Logo';

export const MediaPage: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 fade-in">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-6xl text-gold mb-4">Visual Identity</h1>
        <p className="font-body text-xl text-concrete-light italic">"The aesthetic of order."</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        
        {/* Colors */}
        <div className="space-y-6">
            <h3 className="font-ui text-xs tracking-[0.3em] text-white uppercase border-b border-concrete pb-2 mb-6">Palette</h3>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#E5C372] border border-white/10"></div>
                    <div>
                        <p className="font-heading text-gold">Dominus Gold</p>
                        <p className="font-ui text-xs text-concrete-light">#E5C372</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#000000] border border-white/20"></div>
                    <div>
                        <p className="font-heading text-white">Void Black</p>
                        <p className="font-ui text-xs text-concrete-light">#000000</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#2A2A2A] border border-white/10"></div>
                    <div>
                        <p className="font-heading text-zinc-400">Concrete</p>
                        <p className="font-ui text-xs text-concrete-light">#2A2A2A</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#8A0000] border border-white/10"></div>
                    <div>
                        <p className="font-heading text-blood">Warning Red</p>
                        <p className="font-ui text-xs text-concrete-light">#8A0000</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Typography */}
        <div className="space-y-6">
            <h3 className="font-ui text-xs tracking-[0.3em] text-white uppercase border-b border-concrete pb-2 mb-6">Typography</h3>
            
            <div className="mb-8">
                <p className="font-heading text-3xl text-paper mb-2">Cinzel</p>
                <p className="font-ui text-xs text-concrete-light uppercase tracking-widest">Headers & Impact</p>
                <p className="font-heading text-xl text-gold mt-2">THE DOMINUS CODE</p>
            </div>

            <div className="mb-8">
                <p className="font-body text-3xl text-paper mb-2">Cormorant Garamond</p>
                <p className="font-ui text-xs text-concrete-light uppercase tracking-widest">Scripture & Body</p>
                <p className="font-body text-xl text-zinc-400 mt-2 italic">"Submission isn't granted to the man who seeks it."</p>
            </div>

            <div>
                <p className="font-ui text-3xl text-paper mb-2">Montserrat</p>
                <p className="font-ui text-xs text-concrete-light uppercase tracking-widest">System & Data</p>
                <p className="font-ui text-sm text-zinc-400 mt-2 uppercase tracking-[0.2em]">ACCESS GRANTED</p>
            </div>
        </div>
      </div>

      {/* Assets / Booking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-concrete pt-12">
          
          <div className="border border-concrete bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center">
             <Logo className="w-16 h-16 text-gold mb-6" />
             <h3 className="font-heading text-xl text-white mb-2">Brand Assets</h3>
             <p className="font-body text-concrete-light mb-6">High-resolution logos and book covers.</p>
             <button disabled className="px-6 py-2 border border-concrete text-concrete-light uppercase font-ui text-[10px] tracking-widest hover:border-gold hover:text-gold transition-colors cursor-not-allowed">
                 Download Pack (Coming Soon)
             </button>
          </div>

          <div className="border border-concrete bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 mb-6 flex items-center justify-center">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
             </div>
             <h3 className="font-heading text-xl text-white mb-2">Book Spencer</h3>
             <p className="font-body text-concrete-light mb-6">Podcasts, Speaking, and Private Consultation.</p>
             <a href="mailto:booking@thedominuscode.com" className="px-6 py-2 bg-gold text-black uppercase font-ui text-[10px] tracking-widest hover:bg-white transition-colors font-bold">
                 Contact Agent
             </a>
          </div>

      </div>
    </div>
  );
};