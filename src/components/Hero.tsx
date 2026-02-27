"use client";

import { motion } from "framer-motion";

const floatingEmojis = [
  { emoji: "🎙️", top: "15%", left: "8%", delay: 0, size: "text-4xl" },
  { emoji: "🍕", top: "25%", right: "12%", delay: 1, size: "text-3xl" },
  { emoji: "💜", top: "60%", left: "5%", delay: 2, size: "text-2xl" },
  { emoji: "✨", top: "70%", right: "8%", delay: 0.5, size: "text-5xl" },
  { emoji: "🎬", top: "40%", left: "15%", delay: 1.5, size: "text-3xl" },
  { emoji: "🏎️", top: "80%", right: "15%", delay: 2.5, size: "text-2xl" },
  { emoji: "🔮", top: "10%", right: "25%", delay: 3, size: "text-3xl" },
  { emoji: "🫶", top: "85%", left: "20%", delay: 1.8, size: "text-4xl" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Background gradient blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-pink-hot/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-purple-mid/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-light/30 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating emojis */}
      {floatingEmojis.map((item, i) => (
        <motion.span
          key={i}
          className={`absolute ${item.size} pointer-events-none select-none`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: item.delay + 0.8, duration: 0.5 }}
        >
          <span className="inline-block animate-float" style={{ animationDelay: `${item.delay}s` }}>
            {item.emoji}
          </span>
        </motion.span>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-pink-hot/10 to-purple-mid/10 border border-pink-hot/20 text-sm font-medium text-pink-hot mb-8">
            a tribute to the one and only
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-[family-name:var(--font-space-grotesk)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
        >
          <span className="gradient-text">Aryana</span>
          <br />
          <span className="text-gray-900">Dalal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-500 font-medium mb-4 italic"
        >
          &ldquo;Living my reel life&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10"
        >
          Content creator &middot; Podcast fam &middot; Food obsessed &middot; F1 fan &middot; Mumbai girl
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#youtube"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-hot to-purple-mid text-white font-semibold text-lg hover:shadow-xl hover:shadow-pink-hot/25 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Watch her best moments
          </a>
          <a
            href="#hst"
            className="px-8 py-4 rounded-full border-2 border-purple-mid/30 text-purple-deep font-semibold text-lg hover:bg-purple-mid/5 hover:border-purple-mid/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            The HST Show
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-pink-hot/30 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-pink-hot/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
