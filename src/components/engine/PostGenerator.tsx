'use client';

import { useEngineStore } from '@/store/engineStore';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

interface SlideData {
  f1: string;
  f2: string;
  f3: string;
  f4: string;
}

export function PostGenerator() {
  const { colorScheme, logoUrl } = useEngineStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMode, setCurrentMode] = useState(1);
  const [currentFormat, setCurrentFormat] = useState(1);
  const [slidesData, setSlidesData] = useState<SlideData[]>([
    { f1: 'LAW IV', f2: 'POLARITY IS<br>NATURE\'S DESIGN', f3: 'She doesn\'t want equality.<br>She wants <span class="highlight">electricity</span>.', f4: 'THE PRINCIPLE' },
    { f1: 'HEADER', f2: 'TITLE', f3: 'Body content goes here.', f4: 'FOOTER' },
    { f1: 'HEADER', f2: 'TITLE', f3: 'Body content goes here.', f4: 'FOOTER' },
    { f1: 'HEADER', f2: 'TITLE', f3: 'Body content goes here.', f4: 'FOOTER' },
    { f1: 'HEADER', f2: 'TITLE', f3: 'CTA TEXT', f4: 'FOOTER' },
  ]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const formats = [
    { class: 'h-[1920px]', label: '9:16' },
    { class: 'h-[1350px]', label: '4:5' },
    { class: 'h-[1080px]', label: '1:1' },
  ];

  const accentColor = colorScheme === 'gold' ? '#C5A059' : '#8a0303';

  const nav = (dir: number) => {
    const newSlide = currentSlide + dir;
    if (newSlide < 0) setCurrentSlide(4);
    else if (newSlide > 4) setCurrentSlide(0);
    else setCurrentSlide(newSlide);
  };

  const changeMode = (id: number) => {
    setCurrentMode(id);
  };

  const toggleFormat = () => {
    setCurrentFormat((prev) => (prev + 1) % 3);
  };

  const getSafeTitle = () => {
    const raw = slidesData[0].f2 || '';
    const div = document.createElement('div');
    div.innerHTML = raw.replace(/<br\s*\/?>/gi, ' ');
    const text = div.textContent || div.innerText || '';
    return text
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 40) || 'UNTITLED';
  };

  const getFormattedDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const downloadCurrent = async () => {
    if (!canvasRef.current) return;

    const btn = document.querySelector('button[data-download-current]');
    if (btn) btn.textContent = '...';

    const date = getFormattedDate();
    const title = getSafeTitle();
    const filename = `${date}_${title}_SLIDE_${currentSlide + 1}.png`;

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(canvasRef.current!, {
          scale: 2,
          backgroundColor: null,
        });
        const a = document.createElement('a');
        a.download = filename;
        a.href = canvas.toDataURL('image/png');
        a.click();
        if (btn) btn.textContent = 'PNG';
      } catch (error) {
        console.error(error);
        if (btn) btn.textContent = 'PNG';
      }
    }, 100);
  };

  const downloadAll = async () => {
    if (!canvasRef.current) return;

    const btn = document.querySelector('button[data-download-all]');
    const oldText = btn?.textContent || 'BATCH ZIP';
    if (btn) btn.textContent = 'ZIPPING...';

    const zip = new JSZip();
    const originalSlide = currentSlide;
    const date = getFormattedDate();
    const title = getSafeTitle();

    try {
      for (let i = 0; i < 5; i++) {
        setCurrentSlide(i);
        await new Promise((r) => setTimeout(r, 150));

        const canvas = await html2canvas(canvasRef.current!, {
          scale: 2,
          backgroundColor: null,
        });
        const data = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');

        zip.file(`${date}_${title}_SLIDE_0${i + 1}.png`, data, { base64: true });
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = `DOMINUS_CAROUSEL_${date}_${title}.zip`;
      a.click();
    } catch (error) {
      console.error(error);
      alert('Batch export failed.');
    } finally {
      setCurrentSlide(originalSlide);
      if (btn) btn.textContent = oldText;
    }
  };

  const updateField = (field: keyof SlideData, value: string) => {
    const newData = [...slidesData];
    newData[currentSlide][field] = value;
    setSlidesData(newData);
  };

  const currentData = slidesData[currentSlide];

  return (
    <div className="mb-20">
      <h2 className="font-law text-2xl text-empire border-b-2 border-sovereign pb-4 mb-10 uppercase tracking-wider">
        Post Generator
      </h2>

      {/* UI Panel */}
      <div className="fixed bottom-8 bg-[#0a0a0a] border border-[#333] p-2 flex gap-2 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex-wrap justify-center max-w-[90vw]">
        <div className="flex gap-1 border-r border-[#333] pr-2 items-center">
          <button
            onClick={() => changeMode(1)}
            className={`px-3 py-2 text-[10px] uppercase tracking-wider font-system font-semibold transition-all ${
              currentMode === 1
                ? 'bg-[#222] text-sovereign border border-sovereign'
                : 'bg-[#111] text-[#888] border border-[#333] hover:border-sovereign hover:text-empire'
            }`}
          >
            LAW
          </button>
          <button
            onClick={() => changeMode(2)}
            className={`px-3 py-2 text-[10px] uppercase tracking-wider font-system font-semibold transition-all ${
              currentMode === 2
                ? 'bg-[#222] text-sovereign border border-sovereign'
                : 'bg-[#111] text-[#888] border border-[#333] hover:border-sovereign hover:text-empire'
            }`}
          >
            PASSAGE
          </button>
          <button
            onClick={() => changeMode(3)}
            className={`px-3 py-2 text-[10px] uppercase tracking-wider font-system font-semibold transition-all ${
              currentMode === 3
                ? 'bg-[#222] text-sovereign border border-sovereign'
                : 'bg-[#111] text-[#888] border border-[#333] hover:border-sovereign hover:text-empire'
            }`}
          >
            MAXIM
          </button>
          <button
            onClick={() => changeMode(4)}
            className={`px-3 py-2 text-[10px] uppercase tracking-wider font-system font-semibold transition-all ${
              currentMode === 4
                ? 'bg-[#222] text-sovereign border border-sovereign'
                : 'bg-[#111] text-[#888] border border-[#333] hover:border-sovereign hover:text-empire'
            }`}
          >
            DEF
          </button>
        </div>

        <div className="flex gap-1 border-r border-[#333] pr-2 items-center">
          <button
            onClick={() => nav(-1)}
            className="px-3 py-2 text-[10px] uppercase tracking-wider font-system font-semibold bg-[#111] text-[#888] border border-[#333] hover:border-sovereign hover:text-empire transition-all"
          >
            PREV
          </button>
          <span className="text-[10px] text-[#666] font-mono w-5 text-center">
            {currentSlide + 1}/5
          </span>
          <button
            onClick={() => nav(1)}
            className="px-3 py-2 text-[10px] uppercase tracking-wider font-system font-semibold bg-[#111] text-[#888] border border-[#333] hover:border-sovereign hover:text-empire transition-all"
          >
            NEXT
          </button>
        </div>

        <div className="flex gap-1 border-r border-[#333] pr-2 items-center">
          <button
            onClick={toggleFormat}
            className="px-3 py-2 text-[10px] uppercase tracking-wider font-system font-semibold bg-[#111] text-[#888] border border-[#333] hover:border-sovereign hover:text-empire transition-all"
          >
            {formats[currentFormat].label}
          </button>
        </div>

        <div className="flex gap-1">
          <button
            onClick={downloadCurrent}
            data-download-current
            className="px-3 py-2 text-[10px] uppercase tracking-wider font-system font-semibold bg-[#111] text-[#888] border border-[#333] hover:border-sovereign hover:text-empire transition-all"
          >
            PNG
          </button>
          <button
            onClick={downloadAll}
            data-download-all
            className="px-3 py-2 text-[10px] uppercase tracking-wider font-system font-bold bg-sovereign text-void border border-sovereign transition-all"
          >
            BATCH ZIP
          </button>
        </div>
      </div>

      {/* Canvas Preview */}
      <div className="flex justify-center mb-10">
        <div
          ref={canvasRef}
          className={`w-[1080px] ${formats[currentFormat].class} bg-void relative overflow-hidden border border-[#111]`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        >
          {/* Texture Border */}
          <div className="absolute top-[30px] left-[30px] right-[30px] bottom-[30px] border border-[rgba(255,255,255,0.1)] pointer-events-none z-[2]" />

          {/* Header */}
          <div className="p-[60px] z-[10] flex justify-between items-center border-b border-[rgba(255,255,255,0.05)] relative">
            <div className="font-law font-bold text-2xl tracking-[0.2em] text-empire uppercase">
              THE DOMINUS CODE
            </div>
            <img
              src={logoUrl}
              alt="Icon"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[45px] opacity-80"
            />
            <div className="font-system text-lg tracking-[0.15em] text-[rgba(255,255,255,0.4)] uppercase">
              VOL. I
            </div>
          </div>

          {/* Pips */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[20]">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentSlide
                    ? 'bg-sovereign scale-150 shadow-[0_0_10px_rgba(229,195,114,1)]'
                    : 'bg-[rgba(255,255,255,0.2)]'
                }`}
                style={{
                  backgroundColor: i === currentSlide ? accentColor : undefined,
                }}
              />
            ))}
          </div>

          {/* Content Area */}
          <div
            className={`flex-grow p-[60px] flex flex-col justify-center items-center z-[10] relative text-center ${
              currentMode === 1 && currentSlide === 0
                ? 'items-center text-center'
                : currentMode === 1 && currentSlide === 1
                ? 'items-start text-left pl-[100px]'
                : currentMode === 1 && currentSlide === 2
                ? 'items-end text-right pr-[100px]'
                : currentMode === 1 && currentSlide === 3
                ? 'items-center text-center'
                : currentMode === 2 && currentSlide === 0
                ? 'items-center text-center'
                : currentMode === 2 && currentSlide > 0
                ? 'items-start text-left px-20'
                : currentMode === 3 && currentSlide === 0
                ? 'items-center text-center'
                : currentMode === 3 && currentSlide < 3
                ? 'items-center text-center'
                : currentMode === 3 && currentSlide === 3
                ? 'items-center text-center'
                : currentMode === 4 && currentSlide === 0
                ? 'items-start text-left pl-20'
                : currentMode === 4 && currentSlide === 1
                ? 'items-start text-left pl-[100px]'
                : currentMode === 4 && currentSlide === 2
                ? 'items-start text-left pl-[100px]'
                : currentMode === 4 && currentSlide === 3
                ? 'items-center text-center'
                : 'items-center text-center'
            }`}
          >
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateField('f1', e.currentTarget.innerHTML)}
              className={`field-1 ${
                currentMode === 1 && currentSlide === 0
                  ? 'text-[28px] tracking-[0.5em] border-none opacity-80 mb-[60px]'
                  : currentMode === 1 && currentSlide > 0
                  ? 'text-2xl border-none font-system opacity-60'
                  : currentMode === 2 && currentSlide === 0
                  ? 'text-2xl tracking-[0.3em] border-b border-[rgba(255,255,255,0.2)] pb-5 mb-10'
                  : currentMode === 2 && currentSlide > 0
                  ? 'text-xl border-none font-system opacity-50 mb-5'
                  : currentMode === 3 && currentSlide === 0
                  ? 'text-xl font-system tracking-[0.3em] border-none opacity-60'
                  : currentMode === 3 && currentSlide < 3
                  ? 'text-lg border-b border-sovereign pb-2.5 mb-8'
                  : currentMode === 4 && currentSlide === 0
                  ? 'text-xl border-none font-system opacity-50 mb-2.5'
                  : currentMode === 4 && currentSlide === 1
                  ? 'text-2xl border-none opacity-60 font-system'
                  : currentMode === 4 && currentSlide === 2
                  ? 'text-2xl border-none text-sovereign font-system'
                  : currentSlide === 4
                  ? 'text-2xl tracking-[0.5em] border-none mb-2.5 opacity-60'
                  : ''
              } font-law text-sovereign mb-5`}
              style={{
                color: accentColor,
                borderColor: accentColor,
              }}
              dangerouslySetInnerHTML={{ __html: currentData.f1 }}
            />
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateField('f2', e.currentTarget.innerHTML)}
              className={`field-2 font-law text-empire uppercase leading-none mb-8 ${
                currentMode === 1 && currentSlide === 0
                  ? 'text-[120px] font-black leading-[0.85] mb-[50px]'
                  : currentMode === 1 && currentSlide > 0
                  ? 'text-[60px] mb-5'
                  : currentMode === 2 && currentSlide === 0
                  ? 'text-[100px] italic font-scripture font-semibold leading-none'
                  : currentMode === 2 && currentSlide > 0
                  ? 'hidden'
                  : currentMode === 3 && currentSlide === 0
                  ? 'text-[110px] font-black leading-[0.9] my-10'
                  : currentMode === 3 && currentSlide < 3
                  ? 'text-[90px] font-black leading-[0.95]'
                  : currentMode === 3 && currentSlide === 3
                  ? 'text-[100px] text-sovereign font-bold mb-5'
                  : currentMode === 4 && currentSlide === 0
                  ? 'text-[120px] mb-2.5 leading-none'
                  : currentMode === 4 && currentSlide === 1
                  ? 'text-[80px] text-[#666] line-through'
                  : currentMode === 4 && currentSlide === 2
                  ? 'text-[90px] text-empire'
                  : currentMode === 4 && currentSlide === 3
                  ? 'text-[60px] italic font-scripture leading-[1.4] text-sovereign'
                  : currentSlide === 4
                  ? 'text-[100px] !mb-10 leading-[0.9]'
                  : ''
              }`}
              style={{
                textDecorationColor: currentMode === 4 && currentSlide === 1 ? accentColor : undefined,
                color:
                  currentMode === 3 && currentSlide === 3
                    ? accentColor
                    : currentMode === 4 && currentSlide === 3
                    ? accentColor
                    : undefined,
              }}
              dangerouslySetInnerHTML={{ __html: currentData.f2 }}
            />
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateField('f3', e.currentTarget.innerHTML)}
              className={`field-3 font-scripture text-empire leading-[1.4] ${
                currentMode === 1 && currentSlide === 0
                  ? 'font-system text-[32px] tracking-[0.2em] uppercase text-sovereign font-semibold'
                  : currentMode === 1 && currentSlide === 1
                  ? 'text-[48px] border-l-[3px] pl-10'
                  : currentMode === 1 && currentSlide === 2
                  ? 'text-[48px] border-r-[3px] pr-10 border-l-0'
                  : currentMode === 1 && currentSlide === 3
                  ? 'text-[55px] italic text-sovereign'
                  : currentMode === 2 && currentSlide === 0
                  ? 'font-system text-xl tracking-[0.2em] opacity-70 mt-10'
                  : currentMode === 2 && currentSlide > 0
                  ? 'text-[50px] leading-[1.5] indent-10'
                  : currentMode === 3 && currentSlide === 0
                  ? 'text-2xl font-law text-sovereign'
                  : currentMode === 3 && currentSlide < 3
                  ? 'font-system text-[30px] opacity-80 mt-5'
                  : currentMode === 3 && currentSlide === 3
                  ? 'text-[40px] italic'
                  : currentMode === 4 && currentSlide === 0
                  ? 'font-scripture text-[40px] italic opacity-70 text-empire mb-10'
                  : currentMode === 4 && currentSlide === 1
                  ? 'text-[48px] border-l-[3px] border-[#333] pl-10 text-[#aaa]'
                  : currentMode === 4 && currentSlide === 2
                  ? 'text-[48px] border-l-[3px] pl-10'
                  : currentSlide === 4
                  ? '!font-system !text-[28px] !font-semibold border border-sovereign px-[50px] py-6 inline-block uppercase tracking-[0.15em] bg-[rgba(255,255,255,0.05)] hover:bg-sovereign hover:text-void transition-all'
                  : ''
              }`}
              style={{
                borderColor: accentColor,
                color:
                  currentMode === 1 && currentSlide === 0
                    ? accentColor
                    : currentMode === 1 && currentSlide === 3
                    ? accentColor
                    : currentMode === 3 && currentSlide === 0
                    ? accentColor
                    : undefined,
              }}
              dangerouslySetInnerHTML={{ __html: currentData.f3 }}
            />
            {currentSlide !== 4 && (
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField('f4', e.currentTarget.innerHTML)}
                className={`field-4 font-system text-[rgba(255,255,255,0.5)] uppercase tracking-[0.15em] mt-10 ${
                  currentMode === 4 && currentSlide === 0 ? 'text-sovereign text-2xl' : ''
                }`}
                style={{
                  color: currentMode === 4 && currentSlide === 0 ? accentColor : undefined,
                }}
                dangerouslySetInnerHTML={{ __html: currentData.f4 }}
              />
            )}
          </div>

          {/* Footer */}
          <div className="p-[60px] z-[10] flex justify-between items-end border-t border-[rgba(255,255,255,0.05)]">
            <div className="font-system text-lg tracking-[0.15em] text-[rgba(255,255,255,0.4)] uppercase">
              LEGACY ARCHITECT
            </div>
            <div className="font-system font-semibold text-sovereign tracking-[0.1em] text-xl">
              @THEDOMINUSCODE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

