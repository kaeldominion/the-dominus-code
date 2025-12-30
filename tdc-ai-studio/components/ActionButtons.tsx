import React from 'react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export const ActionButtons: React.FC<Props> = ({ onNext, onPrev, canNext, isFirst, isLast }) => {
  return (
    <div className="flex gap-4 mt-12 fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
      {!isFirst && (
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-zinc-700 text-zinc-500 hover:text-gold hover:border-gold transition-colors duration-300 uppercase tracking-widest text-xs font-semibold"
        >
          Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={!canNext}
        className={`px-8 py-3 bg-gold text-black uppercase tracking-widest text-xs font-bold hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isLast ? 'bg-white text-black hover:bg-zinc-200' : ''}`}
      >
        {isLast ? 'Submit Application' : 'Continue'}
      </button>
    </div>
  );
};