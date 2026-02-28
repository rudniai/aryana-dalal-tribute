"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const loveOptions = [
  {
    id: "herself",
    label: "herself",
    color: "from-peach-400 to-blush-400",
    link: "#about"
  },
  {
    id: "bombay",
    label: "Bombay",
    color: "from-terracotta-400 to-peach-400",
    link: "#bombay-content"
  },
  {
    id: "eating",
    label: "eating",
    color: "from-blush-400 to-peach-500",
    link: "#food-content"
  },
  {
    id: "yapping",
    label: "yapping",
    color: "from-peach-500 to-terracotta-400",
    link: "#podcast-content"
  },
];

// Collage images - using various Aryana photos
const collageImages = [
  { src: "/images/aryana-1.jpg", size: "large", position: "top-left" },
  { src: "/images/aryana-2.jpg", size: "medium", position: "top-right" },
  { src: "/images/aryana-3.jpg", size: "small", position: "middle-left" },
  { src: "/images/aryana-4.jpg", size: "medium", position: "middle-right" },
  { src: "/images/aryana-5.jpg", size: "large", position: "bottom-left" },
  { src: "/images/aryana-6.jpg", size: "small", position: "bottom-right" },
];

export default function Hero() {
  const [activeOption, setActiveOption] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-cream-50 via-white to-cream-50">
      {/* Subtle background accents */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-peach-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blush-100 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main collage container */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Scattered photo layout */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                transition={{ delay: 0.2 }}
                className="absolute top-0 left-0 w-48 h-56 rounded-2xl overflow-hidden shadow-xl shadow-peach-200/40 z-10"
              >
                <Image src="/images/aryana-1.jpg" alt="Aryana" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 4 }}
                transition={{ delay: 0.3 }}
                className="absolute top-12 right-0 w-40 h-48 rounded-2xl overflow-hidden shadow-xl shadow-blush-200/40 z-20"
              >
                <Image src="/images/aryana-2.jpg" alt="Aryana" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-24 left-8 w-44 h-52 rounded-2xl overflow-hidden shadow-xl shadow-peach-200/40 z-15"
              >
                <Image src="/images/aryana-3.jpg" alt="Aryana" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                animate={{ opacity: 1, scale: 1, rotate: 5 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 right-8 w-48 h-60 rounded-2xl overflow-hidden shadow-xl shadow-terracotta-200/40 z-25"
              >
                <Image src="/images/aryana-4.jpg" alt="Aryana" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-44 rounded-2xl overflow-hidden shadow-xl shadow-blush-200/40 z-30 border-4 border-white"
              >
                <Image src="/images/aryana-5.jpg" alt="Aryana" fill className="object-cover" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Interactive text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-headline text-6xl sm:text-7xl lg:text-8xl font-bold text-soft-brown-500 mb-4"
              >
                Aryana Dalal
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-script text-3xl text-terracotta-400"
              >
                Content Creator • Bombay
              </motion.p>
            </div>

            {/* Interactive "She loves..." section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <p className="font-serif text-2xl text-soft-brown-500">
                She loves...
              </p>
              <div className="flex flex-wrap gap-3">
                {loveOptions.map((option, i) => (
                  <motion.a
                    key={option.id}
                    href={option.link}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    onMouseEnter={() => setActiveOption(option.id)}
                    onMouseLeave={() => setActiveOption(null)}
                    className={`group relative px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                      activeOption === option.id
                        ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                        : 'bg-white border-2 border-cream-200 text-soft-brown-500 hover:border-peach-300'
                    }`}
                  >
                    {option.label}
                    {activeOption === option.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={`absolute inset-0 bg-gradient-to-r ${option.color} rounded-full -z-10`}
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div>
                <div className="text-3xl font-serif font-semibold gradient-text-soft">8.9K+</div>
                <div className="text-sm text-soft-brown-400">YouTube</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-semibold gradient-text-soft">11+</div>
                <div className="text-sm text-soft-brown-400">Brands</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-semibold gradient-text-soft">2</div>
                <div className="text-sm text-soft-brown-400">Shows</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
