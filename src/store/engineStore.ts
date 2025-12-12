import { create } from 'zustand';

interface EngineStore {
  // Logo
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  
  // Texture
  textureUrl: string;
  textureOpacity: number;
  setTextureUrl: (url: string) => void;
  setTextureOpacity: (opacity: number) => void;
  
  // Color Scheme
  colorScheme: 'gold' | 'blood';
  setColorScheme: (scheme: 'gold' | 'blood') => void;
  
  // Brand Settings
  titlePre: string;
  titleMain: string;
  subtitle: string;
  author: string;
  website: string;
  cta: string;
  backHeadline: string;
  bio: string;
  
  setTitlePre: (text: string) => void;
  setTitleMain: (text: string) => void;
  setSubtitle: (text: string) => void;
  setAuthor: (text: string) => void;
  setWebsite: (text: string) => void;
  setCta: (text: string) => void;
  setBackHeadline: (text: string) => void;
  setBio: (text: string) => void;
}

const defaultLogo = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23E5C372' d='M132.8 221.7c8.6-9.6 23.3-10.3 32.9-1.7l64.8 58.3 47.9-166.7c3.4-11.8 19.8-11.8 23.2 0l47.9 166.7 64.8-58.3c9.6-8.6 24.3-7.9 32.9 1.7 8.6 9.6 7.9 24.3-1.7 32.9l-96 106.7c-5.7 6.3-13.9 10-22.4 10H175.8c-8.5 0-16.7-3.6-22.4-10l-96-106.7c-9.6-8.6-10.3-23.3-1.7-32.9zm67.5 174.6h111.4c17.7 0 32 14.3 32 32s-14.3 32-32 32H200.3c-17.7 0-32-14.3-32-32s14.3-32 32-32z'/%3E%3C/svg%3E";

export const useEngineStore = create<EngineStore>((set) => ({
  // Logo
  logoUrl: defaultLogo,
  setLogoUrl: (url) => set({ logoUrl: url }),
  
  // Texture
  textureUrl: '',
  textureOpacity: 0.5,
  setTextureUrl: (url) => set({ textureUrl: url }),
  setTextureOpacity: (opacity) => set({ textureOpacity: opacity }),
  
  // Color Scheme
  colorScheme: 'gold',
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
  
  // Brand Settings
  titlePre: 'THE',
  titleMain: 'DOMINUS CODE',
  subtitle: 'F*CK MONOGAMY. BUILD A DYNASTY.',
  author: 'SPENCER TARRING',
  website: 'THEDOMINUSCODE.COM',
  cta: 'JOIN THE ORDER',
  backHeadline: "THE WORLD DOESN'T NEED MORE HAPPY MEN. IT NEEDS STRONG ONES.",
  bio: 'From the high-voltage chaos of Shanghai nightlife to the disciplined sovereignty of Dubai, Spencer Tarring has walked the path from excess to order. He built and exited a multi-million-dollar infrastructure business and commanded international stages. In 2020, he killed the boy to build the man, forging The Dominus Code—a framework for men ready to master their nature and build a dynasty.',
  
  setTitlePre: (text) => set({ titlePre: text }),
  setTitleMain: (text) => set({ titleMain: text }),
  setSubtitle: (text) => set({ subtitle: text }),
  setAuthor: (text) => set({ author: text }),
  setWebsite: (text) => set({ website: text }),
  setCta: (text) => set({ cta: text }),
  setBackHeadline: (text) => set({ backHeadline: text }),
  setBio: (text) => set({ bio: text }),
}));



