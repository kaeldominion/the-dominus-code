import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for "loading"
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const removeTimer = setTimeout(() => {
        setShouldRender(false);
        onComplete();
    }, 3300);

    return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div 
        className={`fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
        <div className="relative">
            <Logo className="w-20 h-20 text-gold opacity-0 animate-fadeIn" />
            <div className="absolute inset-0 bg-gold blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="mt-8 text-center space-y-2 opacity-0 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <h1 className="font-heading text-2xl text-white tracking-[0.2em]">THE DOMINUS CODE</h1>
            <p className="font-ui text-[10px] text-concrete-light uppercase tracking-widest">Establishing Secure Connection</p>
        </div>

        <div className="absolute bottom-12 w-48 h-0.5 bg-concrete/30 overflow-hidden">
            <div className="h-full bg-gold w-full animate-slideUp origin-left" style={{ animation: 'grow 2s ease-out forwards' }}></div>
        </div>
        
        <style>{`
            @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        `}</style>
    </div>
  );
};