import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "The Dominus Code | F*ck Monogamy. Build A Dynasty.",
  description: "The Boy Must Die. Enter the code. Build your dynasty. A manifesto for men who refuse to negotiate with mediocrity.",
  keywords: ["dominus code", "spencer tarring", "dynasty", "sovereignty", "masculine leadership", "protocol"],
  authors: [{ name: "Spencer Tarring" }],
  icons: {
    icon: "/images/tdc-icon-gold.png",
    shortcut: "/images/tdc-icon-gold.png",
    apple: "/images/tdc-icon-gold.png",
  },
  openGraph: {
    title: "The Dominus Code | F*ck Monogamy. Build A Dynasty.",
    description: "The Boy Must Die. Enter the code. Build your dynasty.",
    type: "website",
    locale: "en_US",
    siteName: "The Dominus Code",
    images: ["/images/book-cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dominus Code",
    description: "The Boy Must Die. Enter the code. Build your dynasty.",
    images: ["/images/book-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {/* Noise Overlay */}
          <div className="noise-overlay" aria-hidden="true" />
          
          {/* Background Texture */}
          <div className="bg-texture" aria-hidden="true" />
          
          {children}
        </Providers>
      </body>
    </html>
  );
}
