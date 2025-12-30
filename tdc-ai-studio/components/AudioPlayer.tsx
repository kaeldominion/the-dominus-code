import React, { useState, useRef } from 'react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center gap-3 border border-concrete/30 bg-black/80 backdrop-blur-md p-3 shadow-2xl rounded-sm hover:border-gold/30 transition-colors group">
      <button 
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center bg-gold group-hover:bg-white transition-colors text-black rounded-sm"
      >
        {isPlaying ? (
           <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        ) : (
           <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        )}
      </button>
      
      <div className="flex flex-col">
        <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-gold">Audio Experience</span>
        <span className="font-heading text-xs text-white group-hover:text-gold transition-colors">The Great Softening</span>
      </div>

      <div className="flex gap-0.5 items-end h-6 ml-2">
          {[...Array(4)].map((_, i) => (
              <div 
                  key={i} 
                  className={`w-0.5 bg-gold/50 ${isPlaying ? 'animate-pulse' : ''}`} 
                  style={{ 
                      height: isPlaying ? `${Math.random() * 100}%` : '20%', 
                      transition: 'height 0.2s',
                      animationDelay: `${i * 0.1}s`
                  }}
              ></div>
          ))}
      </div>
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};