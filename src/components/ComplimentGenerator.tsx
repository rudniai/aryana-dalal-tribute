"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Heart, RefreshCw } from "lucide-react";

const compliments = [
  {
    text: "You're giving main character energy today",
    emoji: "✨",
    color: "from-peach-400 to-blush-400",
  },
  {
    text: "Your vibe? Immaculate. No notes.",
    emoji: "💅",
    color: "from-blush-400 to-peach-500",
  },
  {
    text: "You're the friend everyone wants in their group chat",
    emoji: "💌",
    color: "from-terracotta-400 to-peach-400",
  },
  {
    text: "Hot girl energy: activated",
    emoji: "🔥",
    color: "from-peach-500 to-terracotta-400",
  },
  {
    text: "You make overthinking look like a personality trait (in the best way)",
    emoji: "💭",
    color: "from-blush-300 to-peach-400",
  },
  {
    text: "Your food takes are controversial but you're valid",
    emoji: "🍕",
    color: "from-peach-400 to-blush-300",
  },
  {
    text: "You're the perfect mix of chaos and comfort",
    emoji: "🌸",
    color: "from-terracotta-300 to-blush-400",
  },
  {
    text: "Literally living your best life and we're here for it",
    emoji: "🎀",
    color: "from-peach-500 to-blush-500",
  },
  {
    text: "Your aesthetic? Chef's kiss",
    emoji: "👩‍🍳",
    color: "from-blush-400 to-terracotta-400",
  },
  {
    text: "You deserve all the good things coming your way",
    emoji: "💖",
    color: "from-peach-400 to-peach-600",
  },
  {
    text: "Bombay is lucky to have you",
    emoji: "🌆",
    color: "from-terracotta-400 to-peach-500",
  },
  {
    text: "Your energy is contagious (in the best way)",
    emoji: "⚡",
    color: "from-blush-500 to-peach-400",
  },
];

export default function ComplimentGenerator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentCompliment, setCurrentCompliment] = useState(compliments[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateCompliment = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomCompliment =
        compliments[Math.floor(Math.random() * compliments.length)];
      setCurrentCompliment(randomCompliment);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section
      id="compliment-generator"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-cream-50 to-white"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-peach-100 rounded-full blur-3xl opacity-40 animate-float-gentle" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blush-100 rounded-full blur-3xl opacity-30 animate-float-gentle" style={{ animationDelay: "1s" }} />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.p
            className="text-script text-2xl text-terracotta-400 mb-4 flex items-center justify-center gap-2"
            animate={inView ? { opacity: 1 } : {}}
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <Sparkles size={20} />
            </motion.span>
            Interactive Fun
          </motion.p>
          <h2 className="text-headline text-5xl sm:text-6xl text-soft-brown-500 mb-6">
            Need a{" "}
            <span className="bg-gradient-to-r from-peach-500 via-blush-500 to-terracotta-400 bg-clip-text text-transparent">
              Compliment?
            </span>
          </h2>
          <p className="text-editorial text-lg text-soft-brown-400 max-w-2xl mx-auto">
            Click the button for some Aryana-approved good vibes
          </p>
        </motion.div>

        {/* Interactive Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative"
        >
          {/* Main compliment card - glassmorphism */}
          <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-12 border-2 border-cream-200 shadow-2xl shadow-peach-200/30 overflow-hidden">
            {/* Decorative background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${currentCompliment.color}`}
              animate={{ opacity: 0.05 }}
              transition={{ duration: 0.5 }}
              key={currentCompliment.text}
            />

            {/* Sparkle decorations */}
            <motion.div
              className="absolute top-6 right-6 text-4xl opacity-20"
              animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute bottom-6 left-6 text-3xl opacity-20"
              animate={{ y: [0, 6, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              💖
            </motion.div>

            {/* Compliment content */}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCompliment.text}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    className="text-7xl mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {currentCompliment.emoji}
                  </motion.div>
                  <p className="font-serif text-3xl sm:text-4xl font-semibold text-soft-brown-500 leading-relaxed">
                    &ldquo;{currentCompliment.text}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Generate button with bounce */}
              <div className="flex justify-center mt-10">
                <motion.button
                  onClick={generateCompliment}
                  disabled={isAnimating}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-soft text-white font-semibold text-lg shadow-lg shadow-peach-300/40 hover:shadow-xl hover:shadow-peach-300/50 transition-all duration-300 ${
                    isAnimating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <motion.span
                    animate={isAnimating ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    <RefreshCw size={20} />
                  </motion.span>
                  Get Another Compliment
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart size={20} />
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Fun note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-soft-brown-400 italic">
              Screenshot and share your favorite! Tag @aryanadalal 💌
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
