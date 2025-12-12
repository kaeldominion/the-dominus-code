'use client';

import { useEngineStore } from '@/store/engineStore';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export function LogoGenerator() {
  const { colorScheme } = useEngineStore();
  const [isSafeMode, setIsSafeMode] = useState(false);
  const [isSolidBg, setIsSolidBg] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = [
    { name: 'gold', color: '#E5C372', label: 'Imperial Gold' },
    { name: 'blood', color: '#8a0303', label: 'Oxblood' },
    { name: 'white', color: '#FFFFFF', label: 'Pure White' },
    { name: 'black', color: '#000000', label: 'Void Black' },
  ];

  const downloadIcon = async (name: string, strokeColor: string, bgColor: string) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1024;
    canvas.height = 1024;

    // Clear or Fill Background
    ctx.clearRect(0, 0, 1024, 1024);
    
    if (isSolidBg) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 1024, 1024);
    }

    // SVG Data
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
      </svg>`;

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      if (isSafeMode) {
        // Safe Mode: Draw at 70% scale
        const scale = 0.7;
        const size = Math.floor(1024 * scale);
        const offset = Math.floor((1024 - size) / 2);
        ctx.drawImage(img, offset, offset, size, size);
      } else {
        // Full Mode: Draw 100%
        ctx.drawImage(img, 0, 0, 1024, 1024);
      }

      URL.revokeObjectURL(url);

      const a = document.createElement('a');
      let suffix = '';
      if (isSolidBg) suffix += '_SOLID';
      if (isSafeMode) suffix += '_SAFE';

      a.download = `DOMINUS_ICON_${name.toUpperCase()}${suffix}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };

    img.src = url;
  };

  return (
    <div className="mb-20">
      <h2 className="font-law text-2xl text-empire border-b-2 border-sovereign pb-4 mb-10 uppercase tracking-wider">
        Logo Generator
      </h2>

      {/* Controls */}
      <div className="flex gap-5 mb-10">
        <div className="flex items-center gap-4 bg-[#111] px-8 py-4 border border-[#333]">
          <span className="text-xs text-[#aaa] uppercase tracking-wider font-system font-semibold">
            Safe Zone (Circle Crop)
          </span>
          <label className="relative inline-block w-[50px] h-6">
            <input
              type="checkbox"
              checked={isSafeMode}
              onChange={(e) => setIsSafeMode(e.target.checked)}
              className="opacity-0 w-0 h-0"
            />
            <span
              className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-[34px] transition-all ${
                isSafeMode ? 'bg-sovereign' : 'bg-[#333]'
              }`}
            >
              <span
                className={`absolute h-4 w-4 bg-empire rounded-full bottom-1 transition-all ${
                  isSafeMode ? 'left-[26px]' : 'left-1'
                }`}
              />
            </span>
          </label>
        </div>

        <div className="flex items-center gap-4 bg-[#111] px-8 py-4 border border-[#333]">
          <span className="text-xs text-[#aaa] uppercase tracking-wider font-system font-semibold">
            Solid Background
          </span>
          <label className="relative inline-block w-[50px] h-6">
            <input
              type="checkbox"
              checked={isSolidBg}
              onChange={(e) => setIsSolidBg(e.target.checked)}
              className="opacity-0 w-0 h-0"
            />
            <span
              className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-[34px] transition-all ${
                isSolidBg ? 'bg-sovereign' : 'bg-[#333]'
              }`}
            >
              <span
                className={`absolute h-4 w-4 bg-empire rounded-full bottom-1 transition-all ${
                  isSolidBg ? 'left-[26px]' : 'left-1'
                }`}
              />
            </span>
          </label>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-10 max-w-[1200px]">
        {colors.map((color) => (
          <div
            key={color.name}
            className={`bg-[#111] border border-[#222] p-10 flex flex-col items-center ${
              color.name === 'black' ? 'bg-[#E6E6E6]' : ''
            }`}
          >
            <div
              className={`w-[150px] h-[150px] mb-8 flex items-center justify-center border border-[#333] relative ${
                isSolidBg
                  ? color.name === 'black'
                    ? 'bg-empire'
                    : 'bg-void'
                  : 'bg-[transparent]'
              }`}
              style={{
                backgroundImage: isSolidBg
                  ? 'none'
                  : `linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)`,
                backgroundSize: '20px 20px',
              }}
            >
              {isSafeMode && (
                <div
                  className="absolute w-[140px] h-[140px] border border-dashed border-[rgba(255,0,0,0.3)] rounded-full"
                  style={{ borderColor: color.name === 'black' ? 'rgba(0,0,0,0.2)' : 'rgba(255,0,0,0.3)' }}
                />
              )}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={color.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[100px] h-[100px] transition-transform"
                style={{
                  transform: isSafeMode ? 'scale(0.7)' : 'scale(1)',
                }}
              >
                <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
              </svg>
            </div>
            <div className="text-xs text-[#666] mb-5 uppercase tracking-wider">
              {color.label}
            </div>
            <button
              onClick={() =>
                downloadIcon(
                  color.name,
                  color.color,
                  color.name === 'black' ? '#FFFFFF' : '#000000'
                )
              }
              className="w-full bg-void text-empire border border-[#333] px-6 py-3 font-system text-[11px] uppercase tracking-wider transition-all hover:bg-sovereign hover:text-void hover:border-sovereign"
            >
              {isSolidBg ? 'DOWNLOAD (SOLID)' : isSafeMode ? 'DOWNLOAD (SAFE)' : 'DOWNLOAD (FULL)'}
            </button>
          </div>
        ))}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}



