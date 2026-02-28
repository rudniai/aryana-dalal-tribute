"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
  {
    name: "Nykaa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Nykaa_logo.png/2560px-Nykaa_logo.png",
    category: "Beauty",
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
    category: "Food",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    category: "E-commerce",
  },
  {
    name: "Lakme",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Lakme_logo.svg/2560px-Lakme_logo.svg.png",
    category: "Cosmetics",
  },
  {
    name: "Boat",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/BoAt_logo.svg/2560px-BoAt_logo.svg.png",
    category: "Audio",
  },
  {
    name: "Ajio",
    logo: "https://logos-world.net/wp-content/uploads/2022/03/Ajio-Logo.png",
    category: "Fashion",
  },
  {
    name: "Mamaearth",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Mamaearth-Logo.png",
    category: "Skincare",
  },
  {
    name: "Plum",
    logo: "https://www.plumgoodness.com/cdn/shop/files/plum-logo_200x200.png",
    category: "Beauty",
  },
  {
    name: "Sugar Cosmetics",
    logo: "https://logos-world.net/wp-content/uploads/2023/08/Sugar-Cosmetics-Logo.png",
    category: "Makeup",
  },
  {
    name: "Minimalist",
    logo: "https://beminimalist.co/cdn/shop/files/Minimalist_Logo_d0bf607d-5c1e-4921-9942-c9c7cf31be92.png",
    category: "Skincare",
  },
];

export default function Brands() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
            Partnering with leading brands to create authentic content that resonates with audiences
          </p>
        </motion.div>

        {/* Brand grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
              className="group relative p-6 rounded-2xl bg-white border border-cream-200 hover:border-peach-300 hover:shadow-lg hover:shadow-peach-200/20 transition-all duration-300"
            >
              <div className="aspect-square flex items-center justify-center mb-3">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 max-h-16 w-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<div class="text-center font-semibold text-soft-brown-500">${brand.name}</div>`;
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-soft-brown-400 font-medium">{brand.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="font-serif text-4xl font-bold gradient-text-soft mb-2">
              50+
            </div>
            <p className="text-sm text-soft-brown-400">Brand Partnerships</p>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl font-bold gradient-text-soft mb-2">
              100+
            </div>
            <p className="text-sm text-soft-brown-400">Collaborations</p>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl font-bold gradient-text-soft mb-2">
              5M+
            </div>
            <p className="text-sm text-soft-brown-400">Total Reach</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
