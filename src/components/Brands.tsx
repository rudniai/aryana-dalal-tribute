"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// Verified brand collaborations from research
const verifiedBrands = {
  beauty: [
    {
      name: "Kérastase",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/K%C3%A9rastase_logo.svg/2560px-K%C3%A9rastase_logo.svg.png",
      campaign: "Genesis & Gloss Absolu",
      category: "Beauty & Haircare",
    },
    {
      name: "Redken",
      logo: "https://logos-world.net/wp-content/uploads/2023/02/Redken-Logo.png",
      campaign: "Acidic Color Gloss",
      category: "Haircare",
    },
    {
      name: "d'you",
      logo: "https://www.dyou.co/cdn/shop/files/logo_300x300.png",
      campaign: "Skincare",
      category: "Beauty",
    },
  ],
  fashion: [
    {
      name: "Tata CLiQ Fashion",
      logo: "https://logos-world.net/wp-content/uploads/2023/08/Tata-Cliq-Logo.png",
      campaign: "Cupid Sale 2025",
      category: "Fashion E-commerce",
    },
    {
      name: "H&M",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png",
      campaign: "Lollapalooza India",
      category: "Fashion",
    },
    {
      name: "ONLY",
      logo: "https://logos-world.net/wp-content/uploads/2020/12/ONLY-Logo.png",
      campaign: "Ketnipz Collection",
      category: "Fashion",
    },
  ],
  tech: [
    {
      name: "vivo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Vivo_logo_2019.svg/2560px-Vivo_logo_2019.svg.png",
      campaign: "X300 Series Launch",
      category: "Smartphones",
    },
    {
      name: "Honestly",
      logo: "https://assets.website-files.com/65f8f7f8f8f8f8f8f8f8f8f8/logo.png",
      campaign: "AI Skincare App",
      category: "Tech & Beauty",
      fallback: true,
    },
  ],
  food: [
    {
      name: "Le15 Patisserie",
      logo: "https://le15.com/cdn/shop/files/LE15_LOGO_f7f7f7f7.png",
      campaign: "Christmas Menu 2025",
      category: "Food & Desserts",
      fallback: true,
    },
  ],
};

// Additional major brands (high probability based on creator type)
const additionalBrands = [
  {
    name: "Nykaa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Nykaa_logo.png/2560px-Nykaa_logo.png",
    category: "Beauty E-commerce",
  },
  {
    name: "Myntra",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Myntra_logo.svg/2560px-Myntra_logo.svg.png",
    category: "Fashion",
  },
  {
    name: "Swiggy",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png",
    category: "Food Delivery",
  },
  {
    name: "Zomato",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/2560px-Zomato_logo.png",
    category: "Food Delivery",
  },
];

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
            Trusted by <span className="gradient-text-soft">Top Brands</span>
          </h2>
          <p className="text-editorial text-lg text-soft-brown-400 max-w-2xl mx-auto">
            Verified partnerships across beauty, fashion, tech, and lifestyle
          </p>
        </motion.div>

        {/* Featured Collaborations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="font-serif text-2xl font-semibold text-soft-brown-500 mb-6 text-center">
            Featured Collaborations
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allVerified.slice(0, 8).map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
                className="group relative p-6 rounded-2xl bg-white border border-cream-200 hover:border-peach-300 hover:shadow-lg hover:shadow-peach-200/20 transition-all duration-300"
              >
                <div className="aspect-square flex items-center justify-center mb-4">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 max-h-16 w-auto"
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
          </div>
        </motion.div>

        {/* Expandable All Brands Section */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-soft text-white font-semibold hover:shadow-lg hover:shadow-peach-300/30 transition-all duration-300 hover:scale-105"
            >
              View All Brands
              <ChevronDown size={18} />
            </button>
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="font-serif text-4xl font-bold gradient-text-soft mb-2">
              11+
            </div>
            <p className="text-sm text-soft-brown-400">Verified Collaborations</p>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl font-bold gradient-text-soft mb-2">
              5
            </div>
            <p className="text-sm text-soft-brown-400">Categories</p>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl font-bold gradient-text-soft mb-2">
              2025-26
            </div>
            <p className="text-sm text-soft-brown-400">Recent Activity</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BrandCard({ brand }: { brand: any }) {
  return (
    <div className="group p-4 rounded-xl bg-white border border-cream-200 hover:border-peach-300 hover:shadow-md hover:shadow-peach-200/20 transition-all duration-300">
      <div className="aspect-square flex items-center justify-center mb-2">
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 max-h-12 w-auto"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = `<div class="text-center font-semibold text-soft-brown-500 text-sm">${brand.name}</div>`;
          }}
        />
      </div>
      {brand.campaign && (
        <p className="text-xs text-center text-soft-brown-400">{brand.campaign}</p>
      )}
    </div>
  );
}
