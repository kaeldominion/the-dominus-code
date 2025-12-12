'use client';

import { UnifiedSettings } from '@/components/engine/UnifiedSettings';
import { LogoGenerator } from '@/components/engine/LogoGenerator';
import { PostGenerator } from '@/components/engine/PostGenerator';
import { SocialAssets } from '@/components/engine/SocialAssets';

export default function EnginePage() {
  return (
    <main className="min-h-screen p-10 flex flex-col items-center" style={{ backgroundColor: '#050505', color: '#ffffff' }}>
      <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 'bold', color: '#E5C372', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' }}>
        The Dominus Social Factory
      </h1>

      <div className="w-full max-w-[1400px]">
        <UnifiedSettings />
        <LogoGenerator />
        <PostGenerator />
        <SocialAssets />
      </div>
    </main>
  );
}

