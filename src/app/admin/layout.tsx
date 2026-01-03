"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Crown } from "@/components/ui/Crown";
import { useApp } from "@/components/Providers";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  LogOut,
  Zap,
  Loader2
} from "lucide-react";

interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me", { credentials: "include" });
        const data = await response.json();
        
        if (data.user?.role === "ADMIN") {
          setUser(data.user);
        } else {
          router.push("/auth/login");
        }
      } catch {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    window.location.href = "/auth/login";
  };

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/applications", icon: FileText, label: "Applications" },
    { href: "/admin/oracle", icon: MessageSquare, label: "Oracle" },
    { href: "/gens", icon: Zap, label: "Generator Tools", external: true },
  ];

  return (
    <div className="min-h-screen flex bg-void">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gold/20 bg-obsidian/50 flex flex-col">
        <div className="p-6 border-b border-gold/20">
          <div className="flex items-center gap-3 mb-2">
            <Crown
              size={32}
              variant={mode === "dominus" ? "blood" : "gold"}
            />
            <h1 className="font-display text-lg tracking-[0.2em] text-ivory">
              ADMIN
            </h1>
          </div>
          <p className="font-body text-xs text-ivory/50">
            {user.email}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 rounded border transition-colors ${
                    isActive
                      ? mode === "dominus"
                        ? "border-blood bg-blood/10 text-blood"
                        : "border-gold bg-gold/10 text-gold"
                      : "border-gold/20 text-ivory/60 hover:border-gold/40 hover:text-ivory"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-display text-sm tracking-[0.1em]">
                    {item.label}
                  </span>
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded border transition-colors ${
                  isActive
                    ? mode === "dominus"
                      ? "border-blood bg-blood/10 text-blood"
                      : "border-gold bg-gold/10 text-gold"
                    : "border-gold/20 text-ivory/60 hover:border-gold/40 hover:text-ivory"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-display text-sm tracking-[0.1em]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gold/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded border border-gold/20 text-ivory/60 hover:border-blood/50 hover:text-blood transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-display text-sm tracking-[0.1em]">
              LOGOUT
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
