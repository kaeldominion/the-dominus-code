import { Header } from "@/components/navigation/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ManifestoSection } from "@/components/landing/ManifestoSection";
import { BookSection } from "@/components/landing/BookSection";
import { AuthorSection } from "@/components/landing/AuthorSection";
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
      <BookSection />
      <AuthorSection />
      <StatusDashboard />
      <OathPreview />
      <Footer />
      <AudioControl />
    </main>
  );
}
