"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Sparkles, Heart } from "lucide-react";

const loveOptions = [
  {
    id: "herself",
    label: "herself",
    emoji: "💁‍♀️",
    color: "from-hot-pink-400 to-bubblegum-400",
    link: "#about"
  },
  {
    id: "bombay",
    label: "Bombay",
    emoji: "🌆",
    color: "from-lavender-400 to-hot-pink-400",
    link: "#bombay-content"
  },
  {
    id: "eating",
    label: "eating",
    emoji: "🍕",
    color: "from-bubblegum-400 to-lavender-400",
    link: "#food-content"
  },
  {
    id: "yapping",
    label: "yapping",
    emoji: "💬",
    color: "from-lavender-400 to-sky-400",
    link: "#podcast-content"
  },
];

export default function Hero() {
  const [activeOption, setActiveOption] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-bubblegum-50 via-lavender-50 to-sky-50">
      {/* FUN BACKGROUND BLOBS */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-hot-pink-200 rounded-full blur-3xl opacity-40 animate-bounce-fun" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-lavender-200 rounded-full blur-3xl opacity-40 animate-float-gentle" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-30 animate-float-gentle" style={{ animationDelay: "2s" }} />

      {/* SPARKLES */}
      <div className="absolute top-20 left-20 text-6xl animate-wiggle opacity-70">✨</div>
      <div className="absolute top-40 right-40 text-5xl animate-bounce-fun opacity-70" style={{ animationDelay: "0.5s" }}>💖</div>
      <div className="absolute bottom-32 right-20 text-6xl animate-wiggle opacity-70" style={{ animationDelay: "1s" }}>🌟</div>
      <div className="absolute bottom-20 left-1/4 text-5xl animate-float-gentle opacity-70">💕</div>

      <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Fun image collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main featured image with sticker effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: -5 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="absolute top-0 left-0 w-56 h-64 rounded-[40px] overflow-hidden shadow-2xl shadow-hot-pink-300/50 border-4 border-white z-20"
              >
                <Image src="/images/aryana-1.jpg" alt="Aryana" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 6 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="absolute top-16 right-0 w-48 h-56 rounded-[40px] overflow-hidden shadow-2xl shadow-lavender-300/50 border-4 border-white z-30"
              >
                <Image src="/images/aryana-2.jpg" alt="Aryana" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="absolute bottom-20 left-8 w-52 h-60 rounded-[40px] overflow-hidden shadow-2xl shadow-bubblegum-300/50 border-4 border-white z-25"
              >
                <Image src="/images/aryana-3.jpg" alt="Aryana" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 8 }}
                animate={{ opacity: 1, scale: 1, rotate: 4 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute bottom-0 right-12 w-56 h-64 rounded-[40px] overflow-hidden shadow-2xl shadow-sky-300/50 border-4 border-white z-35"
              >
                <Image src="/images/aryana-4.jpg" alt="Aryana" fill className="object-cover" />
              </motion.div>

              {/* Center highlight photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-48 rounded-[40px] overflow-hidden shadow-2xl shadow-hot-pink-400/60 border-[5px] border-white z-40"
              >
                <Image src="/images/aryana-5.jpg" alt="Aryana" fill className="object-cover" />
                <div className="absolute top-2 right-2 text-3xl animate-bounce-fun">⭐</div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Fun interactive text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="space-y-8"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-bubbly text-7xl sm:text-8xl lg:text-9xl font-black mb-4 leading-none"
              >
                <span className="gradient-fun neon-glow">Aryana</span>
                <br />
                <span className="gradient-girly">Dalal</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 flex-wrap"
              >
                <span className="text-handwritten text-4xl text-hot-pink-500">Content Creator</span>
                <span className="text-5xl">•</span>
                <span className="text-handwritten text-4xl text-lavender-500">Bombay</span>
              </motion.div>
            </div>

            {/* FUN "She loves..." BUBBLES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <p className="text-bubbly text-3xl text-gray-700">
                She loves...
              </p>
              <div className="flex flex-wrap gap-3">
                {loveOptions.map((option, i) => (
                  <motion.a
                    key={option.id}
                    href={option.link}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
                    onMouseEnter={() => setActiveOption(option.id)}
                    onMouseLeave={() => setActiveOption(null)}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 border-4 ${
                      activeOption === option.id
                        ? `bg-gradient-to-r ${option.color} text-white border-white shadow-2xl shadow-hot-pink-300/50`
                        : 'bg-white border-hot-pink-300 text-gray-700 shadow-lg'
                    }`}
                  >
                    <span className="mr-2 text-2xl">{option.emoji}</span>
                    {option.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* STATS - FUN VERSION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {[
                { value: "8.9K+", label: "YouTube", emoji: "📺" },
                { value: "11+", label: "Brands", emoji: "💼" },
                { value: "2", label: "Shows", emoji: "🎬" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  className="bg-white rounded-3xl px-6 py-4 border-4 border-hot-pink-200 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="text-3xl font-black gradient-fun">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-semibold flex items-center gap-1">
                    <span>{stat.emoji}</span> {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
