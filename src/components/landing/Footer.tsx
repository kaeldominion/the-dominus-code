"use client";

import { Crown } from "@/components/ui/Crown";
import Link from "next/link";
import { useApp } from "@/components/Providers";

const footerLinks = {
  navigation: [
    { href: "/", label: "The Gate" },
    { href: "/calibration", label: "Calibration" },
    { href: "/council", label: "The Council" },
    { href: "/oath", label: "The Oath" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/contact", label: "Contact" },
  ],
  social: [
    { href: "https://twitter.com/spencertarring", label: "X / Twitter" },
    { href: "https://instagram.com/spencertarring", label: "Instagram" },
    { href: "https://tiktok.com/@spencertarring", label: "TikTok" },
  ],
};

export function Footer() {
  const { mode } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-24 border-t border-concrete/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-8">
              <Crown
                size={40}
                variant={mode === "dominus" ? "blood" : "gold"}
              />
            </Link>
            <p className="font-scripture text-empire/40 text-sm leading-relaxed italic">
              The Dominus Code is a manifesto for men who refuse to negotiate
              with mediocrity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-system text-[10px] tracking-[0.4em] text-concrete/40 mb-8 uppercase">
              Navigate
            </h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-system text-xs font-light text-empire/40 hover:text-sovereign transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-system text-[10px] tracking-[0.4em] text-concrete/40 mb-8 uppercase">
              Legal
            </h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-system text-xs font-light text-empire/40 hover:text-sovereign transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-system text-[10px] tracking-[0.4em] text-concrete/40 mb-8 uppercase">
              Connect
            </h4>
            <ul className="space-y-4">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-system text-xs font-light text-empire/40 hover:text-sovereign transition-colors duration-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mb-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-system text-[10px] font-light text-concrete/30 tracking-wider">
            © {currentYear} Spencer Tarring. All rights reserved.
          </p>
          <p className="font-law text-[10px] tracking-[0.3em] text-concrete/20 uppercase">
            Strengthen the bloodline. Protect the name.
          </p>
        </div>
      </div>
    </footer>
  );
}
