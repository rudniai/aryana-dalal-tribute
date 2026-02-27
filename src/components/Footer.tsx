"use client";

import { motion } from "framer-motion";
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

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-hot/30 to-transparent" />

      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-pink-hot/5 to-transparent rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Big text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold mb-3">
            Follow <span className="gradient-text">Aryana</span> everywhere
          </h2>
          <p className="text-gray-400">She&rsquo;s on every platform because commitment issues don&rsquo;t apply to social media.</p>
        </motion.div>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-100 hover:border-pink-light hover:shadow-md hover:shadow-pink-hot/5 hover:scale-105 transition-all duration-300"
            >
              <span>{link.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1.5">
            Made with <Heart size={14} className="text-pink-hot fill-pink-hot" /> as a fan tribute
          </p>
          <p className="text-xs text-gray-300">
            Not affiliated with Aryana Dalal or The Having Said That Show. Just a fan page.
          </p>
          <p className="text-xs text-gray-300">
            &copy; 2026 &middot; A tribute to Ary&rsquo;s world
          </p>
        </div>
      </div>
    </footer>
  );
}
