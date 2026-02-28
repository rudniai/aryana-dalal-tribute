"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram as InstagramIcon, Heart, MessageCircle, ExternalLink } from "lucide-react";
import SectionImage from "./SectionImage";

const reelHighlights = [
  {
    caption: "\"Wait for the end for some life altering advice\"",
    type: "Life Advice Reel",
    vibe: "main character energy",
    gradient: "from-pink-hot to-purple-mid",
    emoji: "💫",
  },
  {
    caption: "\"Our friend is engaged!\"",
    type: "Friends & Celebrations",
    vibe: "wholesome chaos",
    gradient: "from-purple-mid to-violet-500",
    emoji: "💍",
  },
  {
    caption: "\"Feels like I was only there for the free wine\"",
    type: "Night Out Reel",
    vibe: "relatable queen",
    gradient: "from-violet-500 to-pink-hot",
    emoji: "🍷",
  },
  {
    caption: "\"Bombay woman says Delhi food is infinitely better\"",
    type: "The Take That Broke The Internet",
    vibe: "controversial icon",
    gradient: "from-orange-400 to-pink-hot",
    emoji: "🔥",
  },
  {
    caption: "Brand collabs done the Ary way",
    type: "Sponsored but make it real",
    vibe: "casual recommendation",
    gradient: "from-pink-soft to-purple-soft",
    emoji: "✨",
  },
  {
    caption: "\"Living my reel life\" — literally",
    type: "Aesthetic Lifestyle",
    vibe: "curated but authentic",
    gradient: "from-purple-deep to-pink-hot",
    emoji: "🎀",
  },
];

const stats = [
  { number: "22K+", label: "Followers" },
  { number: "300+", label: "Posts" },
  { number: "∞", label: "Vibes" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export default function Instagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="instagram"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-transparent via-purple-mid/[0.03] to-transparent"
    >
      {/* Parallax Image */}
      <SectionImage
        src="/images/aryana-4.jpg"
        alt="Aryana with flowers"
        position="left"
        size="w-72 h-96"
        offset={20}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-hot/10 to-purple-mid/10 border border-pink-hot/20 mb-6">
            <InstagramIcon size={14} className="text-pink-hot" />
            <span className="text-sm font-semibold text-pink-hot">@aryanadalal</span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl font-bold">
            The{" "}
            <span className="bg-gradient-to-r from-pink-hot via-purple-mid to-orange-400 bg-clip-text text-transparent">Instagram</span>
            {" "}Feed
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            Where the reels hit different and the captions are always a mood.
          </p>
        </motion.div>

        {/* Stats bar with spring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-12 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 150, damping: 12 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="text-center"
            >
              <div className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-hot to-purple-mid bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reel cards grid - masonry-style stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reelHighlights.map((reel, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group relative rounded-3xl overflow-hidden ${i % 3 === 1 ? "sm:mt-4" : ""}`}
            >
              {/* Card background with gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${reel.gradient} opacity-[0.08] group-hover:opacity-[0.18] transition-opacity duration-500`}
              />
              <div className="relative p-7 border border-gray-100 rounded-3xl bg-white/60 backdrop-blur-md group-hover:border-pink-light/50 group-hover:shadow-xl group-hover:shadow-pink-hot/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <motion.span
                    className="text-4xl"
                    whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {reel.emoji}
                  </motion.span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <Heart size={16} className="text-pink-hot" />
                    <MessageCircle size={16} className="text-purple-mid" />
                  </div>
                </div>
                <p className="font-semibold text-gray-900 mb-2 text-[15px] leading-snug">
                  {reel.caption}
                </p>
                <p className="text-xs text-gray-400 mb-4">{reel.type}</p>
                <span className="inline-block text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-hot/10 to-purple-mid/10 text-pink-hot font-medium group-hover:from-pink-hot/20 group-hover:to-purple-mid/20 transition-colors duration-300">
                  {reel.vibe}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block p-8 rounded-3xl bg-gradient-to-br from-pink-hot/5 to-purple-mid/5 backdrop-blur-sm border border-pink-light/30 hover:shadow-lg hover:shadow-pink-hot/10 transition-shadow duration-300"
          >
            <p className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-gray-800">
              &ldquo;Living my reel life&rdquo;
            </p>
            <p className="text-sm text-gray-400 mt-2">— her actual Instagram bio. Iconic.</p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, type: "spring" }}
          className="text-center mt-10"
        >
          <motion.a
            href="https://www.instagram.com/aryanadalal/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-hot via-purple-mid to-orange-400 text-white font-semibold hover:shadow-lg hover:shadow-pink-hot/25 transition-all duration-300"
          >
            <InstagramIcon size={18} />
            Follow on Instagram
            <ExternalLink size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
