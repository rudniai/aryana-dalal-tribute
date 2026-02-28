"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

const socialLinks = [
  { name: "YouTube", url: "https://www.youtube.com/@AryanaDalal", emoji: "📺" },
  { name: "Instagram", url: "https://www.instagram.com/aryanadalal/", emoji: "📸" },
  { name: "X / Twitter", url: "https://x.com/aryanadalal", emoji: "🐦" },
  { name: "Threads", url: "https://www.threads.net/@aryanadalal", emoji: "🧵" },
  { name: "TikTok", url: "https://www.tiktok.com/@aryanadalal", emoji: "🎵" },
  { name: "HST Show", url: "https://www.instagram.com/thehavingsaidthatshow/", emoji: "🎙️" },
  { name: "Spotify (HST)", url: "https://open.spotify.com/show/2YLMxWuVY6wkSgr2CYxGGM", emoji: "🎧" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const linkVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 150, damping: 15 },
  },
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="relative py-20 px-6 overflow-hidden">
      {/* Wave SVG divider top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[1px]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 36C840 48 960 64 1080 68C1200 72 1320 64 1380 60L1440 56V0H0V80Z" className="fill-cream-50" />
        </svg>
      </div>

      {/* Animated gradient background */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-full"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(255,182,193,0.03) 0%, rgba(221,160,221,0.03) 100%)",
            "linear-gradient(135deg, rgba(221,160,221,0.03) 0%, rgba(255,218,185,0.03) 100%)",
            "linear-gradient(135deg, rgba(255,218,185,0.03) 0%, rgba(255,182,193,0.03) 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-pink-hot/5 to-transparent rounded-full blur-[100px]" />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        {/* Big text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-3">
            Follow{" "}
            <span className="bg-gradient-to-r from-pink-hot via-purple-mid to-orange-400 bg-clip-text text-transparent">
              Aryana
            </span>{" "}
            everywhere
          </h2>
          <p className="text-gray-400">She&rsquo;s on every platform because commitment issues don&rsquo;t apply to social media.</p>
        </motion.div>

        {/* Social links - staggered */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={linkVariant}
              whileHover={{ scale: 1.08, y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-pink-light hover:shadow-lg hover:shadow-pink-hot/10 transition-all duration-300"
            >
              <span>{link.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center space-y-3"
        >
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1.5">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={14} className="text-pink-hot fill-pink-hot" />
            </motion.span>{" "}
            as a fan tribute
          </p>
          <p className="text-xs text-gray-300">
            Not affiliated with Aryana Dalal or The Having Said That Show. Just a fan page.
          </p>
          <p className="text-xs text-gray-300">
            &copy; 2026 &middot; A tribute to Ary&rsquo;s world
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
