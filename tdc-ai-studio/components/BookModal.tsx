import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-zinc-900 border border-gold/30 p-8 max-w-md w-full shadow-2xl shadow-gold/10 transform transition-all animate-fadeIn flex flex-col items-center text-center">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <h3 className="font-heading text-2xl text-gold mb-2">The Dominus Code</h3>
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-6">Essential Reading for the Dynasty</p>

        {/* Book Cover Placeholder */}
        <div className="w-32 h-48 bg-zinc-800 mb-8 shadow-lg border border-zinc-700 relative overflow-hidden group">
            <img 
                src="./book.jpg" 
                alt="The Dominus Code" 
                className="w-full h-full object-cover"
                onError={(e) => {
                    // Fallback if image missing
                    (e.target as HTMLImageElement).style.display = 'none';
                }}
            />
            {/* Fallback Text if Image Fails */}
            <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-[10px] -z-10">
                BOOK COVER
            </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <a 
            href="https://a.co/d/hlsG23E" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#FF9900] text-black font-bold uppercase tracking-wider text-sm hover:bg-[#ffad33] transition-colors"
          >
            Buy on Amazon
          </a>
          <a 
            href="https://books.apple.com/gb/book/the-dominus-code/id6756301151" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-zinc-200 transition-colors"
          >
            Apple Books
          </a>
        </div>
      </div>
    </div>
  );
};