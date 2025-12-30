import React from 'react';

interface Props {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<Props> = ({ current, total }) => {
  const progress = Math.min(((current + 1) / total) * 100, 100);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
      <div 
        className="h-full bg-gold shadow-[0_0_10px_rgba(229,195,114,0.5)] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};