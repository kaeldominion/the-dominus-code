import { Header } from "@/components/navigation/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ManifestoSection } from "@/components/landing/ManifestoSection";
import { StatusDashboard } from "@/components/landing/StatusDashboard";
import { OathPreview } from "@/components/landing/OathPreview";
import { Footer } from "@/components/landing/Footer";
import { AudioControl } from "@/components/ui/AudioControl";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ManifestoSection />
      <StatusDashboard />
      <OathPreview />
      <Footer />
      <AudioControl />
    </main>
  );
}
