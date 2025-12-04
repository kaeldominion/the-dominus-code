"use client";

import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/landing/Footer";
import { Crown } from "@/components/ui/Crown";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/Providers";
import { motion } from "framer-motion";
import { Check, Package, Download, Users } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: "book-hardback",
    name: "The Dominus Code",
    subtitle: "First Edition Hardback",
    price: 49,
    originalPrice: 69,
    image: "/images/book-cover.png",
    features: [
      "Signed First Edition",
      "Premium Hardcover",
      "Gold Foil Embossing",
      "Exclusive Chapter: The Hidden Protocol",
    ],
    badge: "LIMITED",
    cta: "Claim Your Copy",
  },
  {
    id: "protocol-edition",
    name: "The Protocol Edition",
    subtitle: "Complete System Bundle",
    price: 149,
    originalPrice: 249,
    image: "/images/book-cover.png",
    features: [
      "Signed First Edition Hardback",
      "Digital Workbook (PDF)",
      "30-Day Audio Protocol",
      "The Dominus OS (Notion Template)",
      "Private Community Access (30 Days)",
    ],
    badge: "BEST VALUE",
    cta: "Get The Full System",
    featured: true,
  },
  {
    id: "dominus-os",
    name: "The Dominus OS",
    subtitle: "Life Operating System",
    price: 79,
    originalPrice: 129,
    image: null,
    features: [
      "Complete Notion Template Pack",
      "Finance Command Center",
      "Fitness Protocol Tracker",
      "Family Council Dashboard",
      "Focus Block System",
      "Quarterly Review Templates",
    ],
    badge: "DIGITAL",
    cta: "Download Now",
    icon: Download,
  },
];

const axisProducts = [
  {
    name: "Devotion Dress",
    price: 185,
    image: null,
    description: "Elegant silhouette. Feminine power. For the woman who leads beside him.",
  },
  {
    name: "Dynasty Loungewear",
    price: 120,
    image: null,
    description: "Silk-touch comfort. Refined leisure. The uniform of the Deae.",
  },
  {
    name: "Crown Athleisure",
    price: 95,
    image: null,
    description: "Move with purpose. Train with grace. Strength in softness.",
  },
];

export default function ArmoryPage() {
  const { mode } = useApp();

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="crown-divider mb-8">
              <Crown
                size={48}
                variant={mode === "dominus" ? "blood" : "gold"}
              />
            </div>
            <h1 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-ivory mb-6">
              THE ARMORY
            </h1>
            <p className="font-body text-xl text-ivory/60 max-w-2xl mx-auto">
              Tools for the sovereign. Weapons for the war on mediocrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid - HIDDEN FOR NOW
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className={`relative ${
                  product.featured
                    ? "lg:scale-105 lg:-my-4 z-10"
                    : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <div
                  className={`h-full flex flex-col bg-obsidian border ${
                    product.featured
                      ? mode === "dominus"
                        ? "border-blood"
                        : "border-gold"
                      : "border-gold/20"
                  }`}
                >
                  <div
                    className={`py-2 text-center font-display text-xs tracking-[0.3em] ${
                      product.featured
                        ? mode === "dominus"
                          ? "bg-blood text-ivory"
                          : "bg-gold text-obsidian"
                        : "bg-gold/10 text-gold"
                    }`}
                  >
                    {product.badge}
                  </div>

                  <div className="flex-1 p-8">
                    <div className="mb-6 flex justify-center">
                      {product.image ? (
                        <div className="relative w-32 h-48">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : product.icon ? (
                        <div
                          className={`w-20 h-20 flex items-center justify-center border ${
                            mode === "dominus"
                              ? "border-blood"
                              : "border-gold"
                          }`}
                        >
                          <product.icon
                            className={`w-10 h-10 ${
                              mode === "dominus" ? "text-blood" : "text-gold"
                            }`}
                          />
                        </div>
                      ) : null}
                    </div>

                    <h3 className="font-display text-xl tracking-[0.1em] text-ivory text-center mb-2">
                      {product.name}
                    </h3>
                    <p className="font-body text-sm text-ivory/50 text-center mb-6">
                      {product.subtitle}
                    </p>

                    <div className="flex items-center justify-center gap-3 mb-8">
                      <span className="font-impact text-4xl text-ivory">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-body text-lg text-ivory/30 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              mode === "dominus" ? "text-blood" : "text-gold"
                            }`}
                          />
                          <span className="font-body text-ivory/70">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 pt-0">
                    <Button
                      variant={
                        product.featured
                          ? mode === "dominus"
                            ? "blood"
                            : "primary"
                          : "secondary"
                      }
                      className="w-full"
                    >
                      {product.cta}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      END HIDDEN PRODUCTS GRID */}

      {/* AXIS Ethos Section */}
      <section className="py-20 border-t border-concrete/10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-system text-xs tracking-[0.4em] text-concrete/50 uppercase mb-4">
              A Separate Brand by Spencer Tarring
            </p>
            <h2 className="font-law text-3xl md:text-4xl tracking-[0.12em] text-empire mb-6">
              AXIS ETHOS
            </h2>
            <p className="font-scripture text-empire/50 max-w-2xl mx-auto italic leading-relaxed">
              A female clothing and lifestyle brand. Run by the Deae themselves. 
              Purpose creates harmony. Without it, even devotion becomes restless.
              AXIS gives the women of the dynasty their own empire to build.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {axisProducts.map((product, index) => (
              <motion.div
                key={product.name}
                className="card-brutal p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <div className="w-full aspect-square bg-void/50 border border-concrete/10 mb-6 flex items-center justify-center">
                  <Package className="w-16 h-16 text-concrete/10" strokeWidth={1} />
                </div>
                <h3 className="font-law text-base tracking-[0.15em] text-empire mb-2">
                  {product.name}
                </h3>
                <p className="font-scripture text-sm text-empire/40 mb-4 italic">
                  {product.description}
                </p>
                <p className="font-system text-xl tracking-wider text-sovereign">${product.price}</p>
              </motion.div>
            ))}
          </div>

          {/* AXIS Philosophy */}
          <motion.blockquote
            className="max-w-2xl mx-auto mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="font-scripture text-lg text-empire/50 italic leading-relaxed">
              &ldquo;Without purpose they get bored, fight, cause problems. 
              Give them something to build and watch them flourish.&rdquo;
            </p>
            <footer className="mt-4">
              <cite className="font-system text-[10px] tracking-[0.3em] text-sovereign not-italic uppercase">
                — The Dominus Code
              </cite>
            </footer>
          </motion.blockquote>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button variant="secondary" icon>
              Visit AXIS Ethos
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Guarantee - HIDDEN FOR NOW
      <section className="py-20 border-t border-gold/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center border-2 border-gold">
              <Users className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-display text-2xl tracking-[0.1em] text-ivory mb-6">
              THE SOVEREIGN GUARANTEE
            </h3>
            <p className="font-body text-lg text-ivory/70 leading-relaxed">
              If The Dominus Code doesn&apos;t fundamentally shift how you view your
              life, your relationships, and your legacy within 30 days, email us
              and we&apos;ll refund every cent. No questions. No games. A
              sovereign&apos;s word.
            </p>
          </motion.div>
        </div>
      </section>
      END HIDDEN GUARANTEE */}

      <Footer />
    </main>
  );
}

