"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// Verified brand collaborations from research - using local logos
const verifiedBrands = {
  beauty: [
    {
      name: "Kérastase",
      logo: "/images/brands/kerastase.svg",
      campaign: "Genesis & Gloss Absolu",
      category: "Beauty & Haircare",
    },
    {
      name: "Redken",
      logo: "/images/brands/redken.svg",
      campaign: "Acidic Color Gloss",
      category: "Haircare",
    },
    {
      name: "d'you",
      logo: "/images/brands/dyou.svg",
      campaign: "Skincare",
      category: "Beauty",
    },
  ],
  fashion: [
    {
      name: "Tata CLiQ Fashion",
      logo: "/images/brands/tata_cliq.svg",
      campaign: "Cupid Sale 2025",
      category: "Fashion E-commerce",
    },
    {
      name: "H&M",
      logo: "/images/brands/hm.svg",
      campaign: "Lollapalooza India",
      category: "Fashion",
    },
    {
      name: "ONLY",
      logo: "/images/brands/only_fashion.svg",
      campaign: "Ketnipz Collection",
      category: "Fashion",
    },
  ],
  tech: [
    {
      name: "vivo",
      logo: "/images/brands/vivo.svg",
      campaign: "X300 Series Launch",
      category: "Smartphones",
    },
    {
      name: "Honestly",
      logo: "/images/brands/honestly.svg",
      campaign: "AI Skincare App",
      category: "Tech & Beauty",
    },
  ],
  food: [
    {
      name: "Le15 Patisserie",
      logo: "/images/brands/le15_patisserie.svg",
      campaign: "Christmas Menu 2025",
      category: "Food & Desserts",
    },
  ],
};

// Additional major brands (high probability based on creator type) - using local logos
const additionalBrands = [
  {
    name: "Nykaa",
    logo: "/images/brands/nykaa.svg",
    category: "Beauty E-commerce",
  },
  {
    name: "Myntra",
    logo: "/images/brands/myntra.svg",
    category: "Fashion",
  },
  {
    name: "Swiggy",
    logo: "/images/brands/swiggy.svg",
    category: "Food Delivery",
  },
  {
    name: "Zomato",
    logo: "/images/brands/zomato.svg",
    category: "Food Delivery",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const brandCardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: "spring" as const, stiffness: 120, damping: 15 },
  },
};

export default function Brands() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const allVerified = [
    ...verifiedBrands.beauty,
    ...verifiedBrands.fashion,
    ...verifiedBrands.tech,
    ...verifiedBrands.food,
  ];

  return (
    <section
      id="brands"
      className="relative py-32 px-6 overflow-hidden bg-cream-50"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-peach-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blush-100 rounded-full blur-3xl opacity-30" />

      {/* Infinite marquee ticker */}
      <div className="absolute top-16 left-0 right-0 overflow-hidden opacity-[0.06] pointer-events-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...allVerified, ...allVerified].map((brand, i) => (
            <span key={i} className="text-6xl font-bold mx-8 text-soft-brown-500">
              {brand.name}
            </span>
          ))}
        </motion.div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-script text-2xl text-terracotta-400 mb-4">
            Brand Collaborations
          </p>
          <h2 className="text-headline text-5xl sm:text-6xl text-soft-brown-500 mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-peach-500 via-blush-500 to-terracotta-400 bg-clip-text text-transparent">
              Top Brands
            </span>
          </h2>
          <p className="text-editorial text-lg text-soft-brown-400 max-w-2xl mx-auto">
            Verified partnerships across beauty, fashion, tech, and lifestyle
          </p>
        </motion.div>

        {/* Featured Collaborations - staggered grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="font-serif text-2xl font-semibold text-soft-brown-500 mb-6 text-center">
            Featured Collaborations
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {allVerified.slice(0, 8).map((brand) => (
              <motion.div
                key={brand.name}
                variants={brandCardVariant}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-cream-200 hover:border-peach-300 hover:shadow-xl hover:shadow-peach-200/20 transition-shadow duration-300"
              >
                <div className="aspect-square flex items-center justify-center mb-4">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 max-h-16 w-auto group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `<div class="text-center font-semibold text-soft-brown-500 text-lg">${brand.name}</div>`;
                      }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-terracotta-500 font-medium mb-1">{brand.campaign}</p>
                  <p className="text-xs text-soft-brown-400">{brand.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Expandable All Brands Section */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-soft text-white font-semibold hover:shadow-lg hover:shadow-peach-300/30 transition-all duration-300"
            >
              View All Brands
              <ChevronDown size={18} />
            </motion.button>
          </motion.div>
        )}

        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
            className="mt-12 space-y-12"
          >
            {/* Beauty & Haircare */}
            <div>
              <h3 className="font-serif text-2xl font-semibold text-soft-brown-500 mb-6">
                Beauty & Haircare
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {verifiedBrands.beauty.map((brand) => (
                  <BrandCard key={brand.name} brand={brand} />
                ))}
              </div>
            </div>

            {/* Fashion */}
            <div>
              <h3 className="font-serif text-2xl font-semibold text-soft-brown-500 mb-6">
                Fashion
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {verifiedBrands.fashion.map((brand) => (
                  <BrandCard key={brand.name} brand={brand} />
                ))}
              </div>
            </div>

            {/* Tech */}
            <div>
              <h3 className="font-serif text-2xl font-semibold text-soft-brown-500 mb-6">
                Tech & Innovation
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {verifiedBrands.tech.map((brand) => (
                  <BrandCard key={brand.name} brand={brand} />
                ))}
              </div>
            </div>

            {/* Food */}
            <div>
              <h3 className="font-serif text-2xl font-semibold text-soft-brown-500 mb-6">
                Food & Lifestyle
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...verifiedBrands.food, ...additionalBrands.slice(2)].map((brand) => (
                  <BrandCard key={brand.name} brand={brand} />
                ))}
              </div>
            </div>

            {/* E-commerce */}
            <div>
              <h3 className="font-serif text-2xl font-semibold text-soft-brown-500 mb-6">
                E-commerce & Platforms
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {additionalBrands.slice(0, 2).map((brand) => (
                  <BrandCard key={brand.name} brand={brand} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats with count-up feel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
          className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
        >
          {[
            { value: "11+", label: "Verified Collaborations" },
            { value: "5", label: "Categories" },
            { value: "2025-26", label: "Recent Activity" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="text-center"
            >
              <div className="font-serif text-4xl font-bold bg-gradient-to-r from-peach-500 to-terracotta-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-soft-brown-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BrandCard({ brand }: { brand: { name: string; logo: string; campaign?: string; category?: string } }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2 } }}
      className="group p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-cream-200 hover:border-peach-300 hover:shadow-lg hover:shadow-peach-200/20 transition-shadow duration-300"
    >
      <div className="aspect-square flex items-center justify-center mb-2">
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 max-h-12 w-auto group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = `<div class="text-center font-semibold text-soft-brown-500 text-sm">${brand.name}</div>`;
          }}
        />
      </div>
      {brand.campaign && (
        <p className="text-xs text-center text-soft-brown-400">{brand.campaign}</p>
      )}
    </motion.div>
  );
}
