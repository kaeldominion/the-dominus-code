import { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ManifestoSection } from "@/components/landing/ManifestoSection";
import { BookSection } from "@/components/landing/BookSection";
import { AuthorSection } from "@/components/landing/AuthorSection";
import { StatusDashboard } from "@/components/landing/StatusDashboard";
import { CouncilPreview } from "@/components/landing/CouncilPreview";
import { Footer } from "@/components/landing/Footer";
import { AudioControl } from "@/components/ui/AudioControl";

// Default OG image
const DEFAULT_OG_IMAGE = "/images/book-cover.png";

// OG image mapping based on type parameter
const OG_IMAGE_MAP: Record<string, string> = {
  law: "/images/OG_Law_Card.png",
  story: "/images/OG_Story_Card.png",
  concept: "/images/OG_Concept_Card.png",
};

// Force dynamic rendering to access searchParams
export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { type?: string } | Promise<{ type?: string }>;
}): Promise<Metadata> {
  // Handle both sync and async searchParams
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const type = params?.type;
  const ogImage = type && OG_IMAGE_MAP[type] ? OG_IMAGE_MAP[type] : DEFAULT_OG_IMAGE;

  // Get base URL for absolute image URLs (required for OG images)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thedominuscode.com";
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  return {
    openGraph: {
      title: "The Dominus Code | F*ck Monogamy. Build A Dynasty.",
      description: "The Boy Must Die. Enter the code. Build your dynasty.",
      type: "website",
      locale: "en_US",
      siteName: "The Dominus Code",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "The Dominus Code",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "The Dominus Code",
      description: "The Boy Must Die. Enter the code. Build your dynasty.",
      images: [ogImageUrl],
    },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }> | { type?: string };
}) {
  // Handle both sync and async searchParams for Next.js compatibility
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ManifestoSection />
      <BookSection />
      <AuthorSection />
      <StatusDashboard />
      <CouncilPreview />
      <Footer />
      <AudioControl />
    </main>
  );
}
