"use client";

import { Crown } from "@/components/ui/Crown";
import Link from "next/link";
import { useApp } from "@/components/Providers";

const footerLinks = {
  navigation: [
    { href: "/", label: "The Gate" },
    { href: "/armory", label: "The Armory" },
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
    <footer className="relative py-20 border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Crown
                size={48}
                className={mode === "dominus" ? "text-blood" : "text-gold"}
              />
            </Link>
            <p className="font-body text-ivory/50 text-sm leading-relaxed">
              The Dominus Code is a manifesto for men who refuse to negotiate
              with mediocrity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-xs tracking-[0.3em] text-gold mb-6 uppercase">
              Navigate
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-ivory/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-xs tracking-[0.3em] text-gold mb-6 uppercase">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-ivory/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-xs tracking-[0.3em] text-gold mb-6 uppercase">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-ivory/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-ivory/30">
            © {currentYear} Spencer Tarring. All rights reserved.
          </p>
          <p className="font-display text-xs tracking-[0.2em] text-ivory/30 uppercase">
            Strengthen the bloodline. Protect the name.
          </p>
        </div>
      </div>
    </footer>
  );
}

