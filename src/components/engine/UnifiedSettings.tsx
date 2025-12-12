'use client';

import { useEngineStore } from '@/store/engineStore';
import { useRef } from 'react';

export function UnifiedSettings() {
  const {
    logoUrl,
    setLogoUrl,
    textureUrl,
    textureOpacity,
    setTextureUrl,
    setTextureOpacity,
    colorScheme,
    setColorScheme,
    titlePre,
    titleMain,
    subtitle,
    author,
    website,
    cta,
    backHeadline,
    bio,
    setTitlePre,
    setTitleMain,
    setSubtitle,
    setAuthor,
    setWebsite,
    setCta,
    setBackHeadline,
    setBio,
  } = useEngineStore();

  const logoInputRef = useRef<HTMLInputElement>(null);
  const textureInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setLogoUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setTextureUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[rgba(20,20,20,0.9)] border border-[rgba(229,195,114,0.3)] p-8 mb-10 max-w-[1100px] w-full">
      <h2 className="font-law text-2xl text-sovereign mb-6 uppercase tracking-wider">
        Unified Settings
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Logo Upload */}
        <div className="col-span-2">
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            1. Upload Logo (Transparent PNG/SVG)
          </label>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system"
          />
        </div>

        {/* Texture Upload */}
        <div>
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            2. Upload Texture (Optional)
          </label>
          <input
            ref={textureInputRef}
            type="file"
            accept="image/*"
            onChange={handleTextureUpload}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system mb-2"
          />
          <div className="text-xs text-empire font-system">
            {textureUrl ? 'TEXTURE LOADED & ACTIVE' : 'NO TEXTURE LOADED'}
          </div>
        </div>

        {/* Texture Opacity */}
        <div>
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Texture Opacity <span>{Math.round(textureOpacity * 100)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={textureOpacity}
            onChange={(e) => setTextureOpacity(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Color Scheme */}
        <div className="col-span-2">
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Color Scheme
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setColorScheme('gold')}
              className={`px-6 py-3 font-law font-bold text-sm uppercase tracking-wider transition-all ${
                colorScheme === 'gold'
                  ? 'bg-sovereign text-void'
                  : 'bg-transparent border border-sovereign text-sovereign'
              }`}
            >
              Gold
            </button>
            <button
              onClick={() => setColorScheme('blood')}
              className={`px-6 py-3 font-law font-bold text-sm uppercase tracking-wider transition-all ${
                colorScheme === 'blood'
                  ? 'bg-blood text-empire'
                  : 'bg-transparent border border-blood text-blood'
              }`}
            >
              Blood
            </button>
          </div>
        </div>

        {/* Title Pre */}
        <div>
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Title Line 1 (Pre)
          </label>
          <input
            type="text"
            value={titlePre}
            onChange={(e) => setTitlePre(e.target.value)}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system focus:border-sovereign focus:outline-none"
          />
        </div>

        {/* Title Main */}
        <div>
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Title Main
          </label>
          <input
            type="text"
            value={titleMain}
            onChange={(e) => setTitleMain(e.target.value)}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system focus:border-sovereign focus:outline-none"
          />
        </div>

        {/* Subtitle */}
        <div className="col-span-2">
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Subtitle / Hook (Use period for line break)
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system focus:border-sovereign focus:outline-none"
          />
        </div>

        {/* Author */}
        <div className="col-span-2">
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Author Name
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system focus:border-sovereign focus:outline-none"
          />
        </div>

        {/* Back Headline */}
        <div className="col-span-2">
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Back Headline (Book)
          </label>
          <textarea
            value={backHeadline}
            onChange={(e) => setBackHeadline(e.target.value)}
            rows={3}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system focus:border-sovereign focus:outline-none resize-y min-h-[80px]"
          />
        </div>

        {/* Bio */}
        <div className="col-span-2">
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Short Bio (Book)
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system focus:border-sovereign focus:outline-none resize-y"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Website URL
          </label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system focus:border-sovereign focus:outline-none"
          />
        </div>

        {/* CTA */}
        <div>
          <label className="block text-xs text-sovereign mb-2 uppercase tracking-wider font-system font-semibold">
            Action / CTA
          </label>
          <input
            type="text"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            className="w-full text-sm text-empire bg-[#0a0a0a] border border-[#333] p-3 font-system focus:border-sovereign focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}




