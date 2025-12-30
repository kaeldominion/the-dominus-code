import React from 'react';

interface TextProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onEnter?: () => void;
}

export const TextInput: React.FC<TextProps> = ({ value, onChange, placeholder, onEnter }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && value.length > 0 && onEnter?.()}
    placeholder={placeholder}
    className="w-full max-w-2xl bg-transparent border-b-2 border-zinc-700 text-2xl md:text-4xl py-2 md:py-4 text-white focus:outline-none focus:border-gold transition-colors placeholder-zinc-700 font-serif-text"
    autoFocus
  />
);

export const TextArea: React.FC<TextProps> = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={4}
    className="w-full max-w-2xl bg-zinc-900/50 border-l-2 border-zinc-700 p-3 md:p-4 text-base md:text-xl text-zinc-200 focus:outline-none focus:border-gold transition-colors placeholder-zinc-700 resize-none"
    autoFocus
  />
);

interface ChoiceProps {
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
}

export const ChoiceInput: React.FC<ChoiceProps> = ({ options, selected, onSelect }) => (
  <div className="flex flex-col gap-3 md:gap-4 w-full max-w-xl">
    {options.map((option, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(option)}
        className={`text-left px-4 md:px-6 py-3 md:py-4 border transition-all duration-300 group ${
          selected === option
            ? 'border-gold bg-gold/10 text-white'
            : 'border-zinc-800 text-zinc-400 hover:border-gold/50 hover:text-zinc-200'
        }`}
      >
        <span className={`inline-block w-6 h-6 border mr-3 md:mr-4 text-center leading-5 text-xs ${
          selected === option ? 'border-gold text-gold' : 'border-zinc-700 text-zinc-700 group-hover:border-zinc-500'
        }`}>
          {String.fromCharCode(65 + idx)}
        </span>
        <span className="font-light tracking-wide text-sm md:text-base">{option}</span>
      </button>
    ))}
  </div>
);