"use client";

import { useState } from "react";
import { Header } from "@/components/navigation/Header";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";

export default function RegisterPage() {
  const { mode } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(formData.password), text: "One uppercase letter" },
    { met: /[0-9]/.test(formData.password), text: "One number" },
    {
      met: formData.password === formData.confirmPassword && formData.password.length > 0,
      text: "Passwords match",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    // Simulate registration - replace with actual auth
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 flex items-center justify-center py-20">
        <div className="w-full max-w-md px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="text-center mb-12">
              <Crown
                size={48}
                variant={mode === "dominus" ? "blood" : "gold"}
                className="mx-auto mb-6"
              />
              <h1 className="font-display text-2xl tracking-[0.2em] text-ivory">
                JOIN THE ORDER
              </h1>
              <p className="font-body text-ivory/50 mt-2">
                Begin your sovereign journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-display text-xs tracking-[0.2em] text-gold mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  required
                  className="input-brutal"
                />
              </div>

              <div>
                <label className="block font-display text-xs tracking-[0.2em] text-gold mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="sovereign@domain.com"
                  required
                  className="input-brutal"
                />
              </div>

              <div>
                <label className="block font-display text-xs tracking-[0.2em] text-gold mb-2">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    required
                    className="input-brutal pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-gold transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-display text-xs tracking-[0.2em] text-gold mb-2">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  className="input-brutal"
                />
              </div>

              {/* Password Requirements */}
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 text-sm ${
                      req.met ? "text-green-500" : "text-ivory/30"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span className="font-body">{req.text}</span>
                  </div>
                ))}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className={`w-6 h-6 flex-shrink-0 border ${
                    agreed
                      ? mode === "dominus"
                        ? "bg-blood border-blood"
                        : "bg-gold border-gold"
                      : "border-gold/50"
                  } flex items-center justify-center transition-colors`}
                >
                  {agreed && <Check className="w-4 h-4 text-obsidian" />}
                </button>
                <p className="font-body text-sm text-ivory/60">
                  I agree to the{" "}
                  <Link href="/terms" className="text-gold hover:text-gold-light">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-gold hover:text-gold-light">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              <Button
                type="submit"
                variant={mode === "dominus" ? "blood" : "primary"}
                className="w-full"
                loading={loading}
                disabled={!agreed || !passwordRequirements.every((r) => r.met)}
              >
                Create Account
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-8 font-body text-sm text-ivory/50">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-gold hover:text-gold-light transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

