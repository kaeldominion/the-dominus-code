'use client';

import { useEngineStore } from '@/store/engineStore';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

export function SocialAssets() {
  const {
    logoUrl,
    textureUrl,
    textureOpacity,
    colorScheme,
    titlePre,
    titleMain,
    subtitle,
    author,
    website,
    cta,
    backHeadline,
    bio,
  } = useEngineStore();

  const printWrapRef = useRef<HTMLDivElement>(null);
  const digitalCoverRef = useRef<HTMLDivElement>(null);
  const ytBannerRef = useRef<HTMLDivElement>(null);
  const twHeaderRef = useRef<HTMLDivElement>(null);
  const igStoryRef = useRef<HTMLDivElement>(null);
  const sqPostRef = useRef<HTMLDivElement>(null);

  const accentColor = colorScheme === 'gold' ? '#E5C372' : '#8a0303';

  // Format text helpers
  const formatTitle = (text: string) => text.trim().toUpperCase().replace(/\s/g, '<br>');
  const formatSubtitle = (text: string) =>
    text.trim().toUpperCase().replace(/\. /g, '.<br>').replace(/\.$/, '.<br>');
  const formatBackHeadline = (text: string) => {
    const parts = text.split('.');
    if (parts.length > 1 && parts[1].trim() !== '') {
      const p1 = parts[0] + '.';
      const p2 = parts.slice(1).join('.').trim();
      return `${p1}<br><span style="color: ${accentColor}">${p2}</span>`;
    }
    return text.replace(/\n/g, '<br>');
  };

  const downloadAsset = async (elementRef: React.RefObject<HTMLDivElement | null>, fileName: string) => {
    if (!elementRef.current) return;

    const btn = document.querySelector(`button[data-download="${fileName}"]`);
    const originalText = btn?.textContent || 'Download';
    if (btn) btn.textContent = 'GENERATING...';

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(elementRef.current!, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
        });
        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        if (btn) btn.textContent = originalText;
      } catch (err) {
        alert('Error generating image. If using a custom logo, try a smaller file.');
        console.error(err);
        if (btn) btn.textContent = originalText;
      }
    }, 100);
  };

  return (
    <div className="mb-20">
      <h2 className="font-law text-2xl text-empire border-b-2 border-sovereign pb-4 mb-10 uppercase tracking-wider">
        Social Assets
      </h2>

      {/* Book Assets */}
      <div className="mb-16">
        <h3 className="font-law text-xl text-empire mb-6 uppercase tracking-wider">Book Assets</h3>
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => downloadAsset(printWrapRef, 'Dominus_Print_Wrap')}
            data-download="Dominus_Print_Wrap"
            className="px-8 py-3 bg-sovereign text-void font-law font-bold text-sm uppercase tracking-wider transition-all hover:bg-empire hover:transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(229,195,114,0.6)]"
          >
            Download Print Wrap
          </button>
          <button
            onClick={() => downloadAsset(digitalCoverRef, 'Dominus_Digital_Cover')}
            data-download="Dominus_Digital_Cover"
            className="px-8 py-3 bg-transparent border border-sovereign text-sovereign font-law font-bold text-sm uppercase tracking-wider transition-all hover:bg-sovereign hover:text-void"
          >
            Download Digital Cover
          </button>
        </div>

        {/* Print Wrap */}
        <div className="mb-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#222] w-fit mx-auto">
          <div className="absolute -top-6 left-0 text-[#666] text-xs uppercase tracking-wider font-bold">
            PRINT WRAP (Front, Spine, Back)
          </div>
          <div
            ref={printWrapRef}
            className="w-[1052px] h-[825px] bg-void relative overflow-hidden flex"
            style={{
              backgroundColor: '#050505',
            }}
          >
            {/* Texture Layer */}
            {textureUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none z-[1]"
                style={{
                  backgroundImage: `url(${textureUrl})`,
                  opacity: textureOpacity,
                }}
              />
            )}
            {/* Sheen Layer */}
            <div
              className="absolute inset-0 pointer-events-none z-[2]"
              style={{
                background:
                  'radial-gradient(circle at top right, rgba(197, 160, 89, 0.08), transparent 60%)',
              }}
            />

            {/* Back Panel */}
            <div className="w-[500px] h-full p-[50px_40px] flex flex-col relative border-r border-[rgba(255,255,255,0.08)] z-[10]">
              <div
                className="font-law font-bold text-[34px] leading-[1.1] uppercase mb-6 text-empire"
                dangerouslySetInnerHTML={{ __html: formatBackHeadline(backHeadline) }}
              />
              <div className="border-l-[3px] pl-5 mb-6" style={{ borderColor: '#8A0303' }}>
                <div className="font-scripture italic text-lg leading-[1.5] text-[#ccc]">
                  "I'm not here to sell a fantasy. I've lived too many of them already. This isn't a
                  self-help book. I'm not interested in helping you feel better. I'm interested in
                  helping you remember who you are."
                </div>
              </div>
              <ul className="list-none p-0 m-0 mb-6">
                <li className="text-[15px] uppercase tracking-wide mb-3 flex items-center text-empire font-system">
                  <span className="text-sovereign mr-4 text-[10px]">◆</span>Master Your Energy
                </li>
                <li className="text-[15px] uppercase tracking-wide mb-3 flex items-center text-empire font-system">
                  <span className="text-sovereign mr-4 text-[10px]">◆</span>Command The Feminine
                </li>
                <li className="text-[15px] uppercase tracking-wide mb-3 flex items-center text-empire font-system">
                  <span className="text-sovereign mr-4 text-[10px]">◆</span>Secure Your Bloodline
                </li>
              </ul>
              <div className="border-t border-[rgba(197,160,89,0.3)] pt-4 mb-auto">
                <div className="text-sm text-sovereign mb-1 uppercase font-bold tracking-wider font-system">
                  {author}
                </div>
                <div className="text-[11px] text-[#999] leading-[1.4] text-justify font-system">{bio}</div>
              </div>
              <div className="text-center text-[10px] tracking-[0.3em] text-empire mb-[70px] font-semibold opacity-80 font-system">
                {website}
              </div>
              <div className="absolute bottom-10 right-10 w-[120px] h-[70px] bg-empire flex items-center justify-center text-[10px] text-void font-system z-[10]">
                ISBN 978-X-XX
              </div>
            </div>

            {/* Spine Panel */}
            <div className="w-[52px] h-full flex flex-col items-center relative p-[40px_0] bg-[rgba(255,255,255,0.03)] border-l border-r border-[rgba(0,0,0,0.5)] z-[10]">
              <img
                src={logoUrl}
                alt=""
                className="w-6 mt-[30px]"
                style={{
                  filter: `drop-shadow(0 0 10px rgba(229, 195, 114, 0.4)) drop-shadow(0 4px 6px rgba(0,0,0,0.8))`,
                }}
              />
              <div
                className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-base font-normal tracking-[0.5em] uppercase whitespace-nowrap w-[600px] text-center text-empire font-law"
                style={{ transform: 'translate(-50%, -50%) rotate(90deg)' }}
              >
                {titlePre} {titleMain}
              </div>
              <div
                className="absolute bottom-[120px] left-1/2 -translate-x-1/2 rotate-90 text-sm tracking-[0.3em] uppercase whitespace-nowrap text-sovereign font-system"
                style={{ transform: 'translate(-50%, 0) rotate(90deg)' }}
              >
                {author}
              </div>
            </div>

            {/* Front Panel */}
            <div className="w-[500px] h-full p-[80px_60px_50px] flex flex-col items-center text-center justify-start relative z-[10]">
              <img
                src={logoUrl}
                alt=""
                className="w-[90px] mb-6"
                style={{
                  filter: `drop-shadow(0 0 10px rgba(229, 195, 114, 0.4)) drop-shadow(0 4px 6px rgba(0,0,0,0.8))`,
                }}
              />
              <div className="font-law font-bold text-[22px] tracking-[0.75em] text-empire mb-2.5 uppercase">
                {titlePre}
              </div>
              <div
                className="font-law font-black text-[84px] leading-[0.85] tracking-[-2px] uppercase m-0 text-sovereign"
                style={{
                  textShadow: `0 0 25px rgba(229, 195, 114, 0.35), 0 10px 30px rgba(0,0,0,0.9)`,
                }}
                dangerouslySetInnerHTML={{ __html: formatTitle(titleMain) }}
              />
              <div
                className="w-1 h-20 my-10 mx-auto"
                style={{
                  background: 'linear-gradient(to bottom, #8A0303, transparent)',
                }}
              />
              <div
                className="font-law font-bold text-[26px] tracking-wide leading-[1.1] uppercase mb-auto text-empire"
                dangerouslySetInnerHTML={{ __html: formatSubtitle(subtitle) }}
              />
              <div className="font-system text-lg tracking-[0.5em] uppercase text-sovereign mt-auto font-semibold">
                {author}
              </div>
            </div>
          </div>
        </div>

        {/* Digital Cover (Hidden) */}
        <div className="fixed top-0 -left-[9999px]">
          <div
            ref={digitalCoverRef}
            className="w-[640px] h-[1000px] p-[80px_60px] flex flex-col items-center text-center relative z-[2] bg-void"
            style={{
              backgroundColor: '#050505',
            }}
          >
            {textureUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none z-[1]"
                style={{
                  backgroundImage: `url(${textureUrl})`,
                  opacity: textureOpacity,
                }}
              />
            )}
            <div
              className="absolute inset-0 pointer-events-none z-[2]"
              style={{
                background:
                  'radial-gradient(circle at top right, rgba(197, 160, 89, 0.08), transparent 60%)',
              }}
            />
            <img
              src={logoUrl}
              alt=""
              className="w-[120px] mb-8 relative z-[10]"
              style={{
                filter: `drop-shadow(0 0 10px rgba(229, 195, 114, 0.4)) drop-shadow(0 4px 6px rgba(0,0,0,0.8))`,
              }}
            />
            <div className="font-law font-bold text-[30px] tracking-[0.75em] text-empire mb-2.5 uppercase relative z-[10]">
              {titlePre}
            </div>
            <div
              className="font-law font-black text-[110px] mb-2.5 text-sovereign relative z-[10]"
              style={{
                textShadow: `0 0 25px rgba(229, 195, 114, 0.35), 0 10px 30px rgba(0,0,0,0.9)`,
              }}
              dangerouslySetInnerHTML={{ __html: formatTitle(titleMain) }}
            />
            <div
              className="w-1 h-20 my-10 mx-auto relative z-[10]"
              style={{
                background: '#8A0303',
              }}
            />
            <div
              className="font-law font-bold text-[32px] text-empire mt-5 relative z-[10]"
              dangerouslySetInnerHTML={{ __html: formatSubtitle(subtitle) }}
            />
            <div className="font-system text-2xl tracking-[0.5em] uppercase text-sovereign mt-auto relative z-[10]">
              {author}
            </div>
          </div>
        </div>
      </div>

      {/* Social Assets */}
      <div>
        <h3 className="font-law text-xl text-empire mb-6 uppercase tracking-wider">Social Assets</h3>
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => downloadAsset(ytBannerRef, 'Dominus_YouTube_Banner')}
            data-download="Dominus_YouTube_Banner"
            className="px-8 py-3 bg-sovereign text-void font-law font-bold text-sm uppercase tracking-wider transition-all hover:bg-empire"
          >
            YouTube Banner
          </button>
          <button
            onClick={() => downloadAsset(twHeaderRef, 'Dominus_X_Header')}
            data-download="Dominus_X_Header"
            className="px-8 py-3 bg-sovereign text-void font-law font-bold text-sm uppercase tracking-wider transition-all hover:bg-empire"
          >
            X Header
          </button>
          <button
            onClick={() => downloadAsset(igStoryRef, 'Dominus_IG_Story')}
            data-download="Dominus_IG_Story"
            className="px-8 py-3 bg-sovereign text-void font-law font-bold text-sm uppercase tracking-wider transition-all hover:bg-empire"
          >
            IG Story
          </button>
          <button
            onClick={() => downloadAsset(sqPostRef, 'Dominus_Square_Post')}
            data-download="Dominus_Square_Post"
            className="px-8 py-3 bg-sovereign text-void font-law font-bold text-sm uppercase tracking-wider transition-all hover:bg-empire"
          >
            Square Post
          </button>
        </div>

        {/* YouTube Banner */}
        <div className="mb-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#222] w-fit mx-auto">
          <div className="absolute -top-6 left-0 text-[#666] text-xs uppercase tracking-wider font-bold">
            YOUTUBE BANNER (Safe Zone Optimized)
          </div>
          <div
            ref={ytBannerRef}
            className="w-[853px] h-[480px] flex items-center justify-center relative z-[2] bg-void"
            style={{
              backgroundColor: '#050505',
            }}
          >
            {textureUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none z-[1]"
                style={{
                  backgroundImage: `url(${textureUrl})`,
                  opacity: textureOpacity,
                }}
              />
            )}
            <div
              className="absolute inset-0 pointer-events-none z-[2]"
              style={{
                background:
                  'radial-gradient(circle at top right, rgba(197, 160, 89, 0.08), transparent 60%)',
              }}
            />
            <div className="w-[515px] h-[141px] flex items-center justify-between relative z-[10]">
              <div className="flex items-center gap-5 text-left">
                <img
                  src={logoUrl}
                  alt="Crown"
                  className="w-10"
                  style={{
                    filter: `drop-shadow(0 0 10px rgba(229, 195, 114, 0.4)) drop-shadow(0 4px 6px rgba(0,0,0,0.8))`,
                  }}
                />
                <div>
                  <div className="font-law font-bold text-[10px] tracking-[0.3em] text-empire mb-0.5 uppercase">
                    {titlePre}
                  </div>
                  <div
                    className="font-law font-black text-[32px] leading-[0.9] text-sovereign"
                    dangerouslySetInnerHTML={{ __html: formatTitle(titleMain) }}
                  />
                </div>
              </div>
              <div
                className="text-right pl-5 flex flex-col justify-center h-[80%]"
                style={{ borderLeft: '2px solid #8A0303' }}
              >
                <div
                  className="font-law font-bold text-xs leading-[1.2] mb-2 text-empire"
                  dangerouslySetInnerHTML={{ __html: formatSubtitle(subtitle) }}
                />
                <span
                  className="font-system font-bold tracking-wide text-[10px] px-4 py-2.5 inline-block border"
                  style={{ color: accentColor, borderColor: accentColor }}
                >
                  {cta}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* X/Twitter Header */}
        <div className="mb-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#222] w-fit mx-auto">
          <div className="absolute -top-6 left-0 text-[#666] text-xs uppercase tracking-wider font-bold">
            X / TWITTER HEADER (1500x500 Scaled)
          </div>
          <div
            ref={twHeaderRef}
            className="w-[500px] h-[167px] flex flex-row items-center justify-center px-5 gap-8 z-[2] bg-void"
            style={{
              backgroundColor: '#050505',
            }}
          >
            {textureUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none z-[1]"
                style={{
                  backgroundImage: `url(${textureUrl})`,
                  opacity: textureOpacity,
                }}
              />
            )}
            <div
              className="absolute inset-0 pointer-events-none z-[2]"
              style={{
                background:
                  'radial-gradient(circle at top right, rgba(197, 160, 89, 0.08), transparent 60%)',
              }}
            />
            <div
              className="flex flex-col items-end pr-8 relative z-[10]"
              style={{ borderRight: '2px solid #8A0303' }}
            >
              <div className="font-law font-bold text-[10px] tracking-[0.3em] text-right text-empire mb-0 uppercase">
                {titlePre}
              </div>
              <div
                className="font-law font-black text-[32px] leading-[0.9] text-right text-sovereign"
                dangerouslySetInnerHTML={{ __html: titleMain }}
              />
              <div className="font-system text-[9px] mt-1.5 text-right tracking-wide text-empire">
                {website}
              </div>
            </div>
            <img
              src={logoUrl}
              alt="Logo"
              className="w-[45px] relative z-[10]"
              style={{
                filter: `drop-shadow(0 0 10px rgba(229, 195, 114, 0.4)) drop-shadow(0 4px 6px rgba(0,0,0,0.8))`,
              }}
            />
          </div>
        </div>

        {/* IG Story & Square Post */}
        <div className="flex gap-10 flex-wrap justify-center">
          {/* IG Story */}
          <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#222] w-fit">
            <div className="absolute -top-6 left-0 text-[#666] text-xs uppercase tracking-wider font-bold">
              IG / TIKTOK STORY
            </div>
            <div
              ref={igStoryRef}
              className="w-[360px] h-[640px] flex flex-col items-center justify-center text-center p-10 border border-[#333] z-[2] bg-void"
              style={{
                backgroundColor: '#050505',
              }}
            >
              {textureUrl && (
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none z-[1]"
                  style={{
                    backgroundImage: `url(${textureUrl})`,
                    opacity: textureOpacity,
                  }}
                />
              )}
              <div
                className="absolute inset-0 pointer-events-none z-[2]"
                style={{
                  background:
                    'radial-gradient(circle at top right, rgba(197, 160, 89, 0.08), transparent 60%)',
                }}
              />
              <img
                src={logoUrl}
                alt=""
                className="w-20 mb-10 relative z-[10]"
                style={{
                  filter: `drop-shadow(0 0 10px rgba(229, 195, 114, 0.4)) drop-shadow(0 4px 6px rgba(0,0,0,0.8))`,
                }}
              />
              <div className="font-law font-bold text-base tracking-[0.75em] text-empire mb-2.5 mt-2.5 uppercase relative z-[10]">
                {titlePre}
              </div>
              <div
                className="font-law font-black text-[58px] leading-[0.9] mb-8 text-sovereign relative z-[10]"
                dangerouslySetInnerHTML={{ __html: formatTitle(titleMain) }}
              />
              <div
                className="font-law font-bold text-xl leading-[1.4] mb-16 text-empire relative z-[10]"
                dangerouslySetInnerHTML={{ __html: formatSubtitle(subtitle) }}
              />
              <span
                className="font-system font-bold tracking-wide text-sovereign text-sm border border-sovereign px-5 py-2.5 inline-block relative z-[10]"
                style={{ color: accentColor, borderColor: accentColor }}
              >
                {cta}
              </span>
            </div>
          </div>

          {/* Square Post */}
          <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#222] w-fit">
            <div className="absolute -top-6 left-0 text-[#666] text-xs uppercase tracking-wider font-bold">
              SQUARE POST
            </div>
            <div
              ref={sqPostRef}
              className="w-[500px] h-[500px] flex flex-col items-center justify-center text-center p-10 border border-[#333] z-[2] bg-void"
              style={{
                backgroundColor: '#050505',
              }}
            >
              {textureUrl && (
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none z-[1]"
                  style={{
                    backgroundImage: `url(${textureUrl})`,
                    opacity: textureOpacity,
                  }}
                />
              )}
              <div
                className="absolute inset-0 pointer-events-none z-[2]"
                style={{
                  background:
                    'radial-gradient(circle at top right, rgba(197, 160, 89, 0.08), transparent 60%)',
                }}
              />
              <div className="font-law font-bold text-sm tracking-[0.75em] text-empire mb-2.5 uppercase relative z-[10]">
                {titlePre}
              </div>
              <div
                className="font-law font-black text-[54px] leading-[0.9] text-sovereign relative z-[10]"
                dangerouslySetInnerHTML={{ __html: formatTitle(titleMain) }}
              />
              <div
                className="w-1 h-[50px] my-8 mx-auto relative z-[10]"
                style={{
                  background: 'linear-gradient(to bottom, #8A0303, transparent)',
                }}
              />
              <img
                src={logoUrl}
                alt=""
                className="w-[60px] relative z-[10]"
                style={{
                  filter: `drop-shadow(0 0 10px rgba(229, 195, 114, 0.4)) drop-shadow(0 4px 6px rgba(0,0,0,0.8))`,
                }}
              />
              <div className="font-system text-xs mt-5 tracking-[0.3em] text-empire relative z-[10]">
                {author}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

