"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, TrendingUp, Utensils, PartyPopper, ExternalLink } from "lucide-react";
import SectionImage from "./SectionImage";

const playlists = [
  {
    title: "Masti Vlogs",
    emoji: "🎉",
    icon: PartyPopper,
    color: "from-pink-hot to-rose-400",
    bgLight: "bg-pink-hot/5",
    borderColor: "border-pink-hot/20",
    description:
      "Pure chaos energy. Friend trips, spontaneous adventures, and the kind of unhinged content that makes you feel like you're right there with the gang.",
    vibes: ["chaotic energy", "friend group goals", "main character vibes"],
    link: "https://www.youtube.com/@AryanaDalal/playlists",
  },
  {
    title: "Taste Tests",
    emoji: "🍔",
    icon: Utensils,
    color: "from-purple-deep to-purple-mid",
    bgLight: "bg-purple-mid/5",
    borderColor: "border-purple-mid/20",
    description:
      "Aryana's true calling. She rates, roasts, and reviews food with the kind of honesty that Delhi vs Mumbai debates are made of. Controversial? Always.",
    vibes: ["brutally honest", "foodie approved", "no cap reviews"],
    link: "https://www.youtube.com/@AryanaDalal/videos",
  },
  {
    title: "HST BTS",
    emoji: "🎬",
    icon: TrendingUp,
    color: "from-violet-500 to-purple-soft",
    bgLight: "bg-violet-500/5",
    borderColor: "border-violet-500/20",
    description:
      "What actually goes on behind the scenes at The Having Said That Show. Spoiler: it's even more chaotic than the episodes themselves.",
    vibes: ["crew shenanigans", "podcast life", "unscripted moments"],
    link: "https://www.youtube.com/@AryanaDalal/playlists",
  },
];

const highlights = [
  {
    title: "The Delhi vs Mumbai Food Debate",
    desc: "The one where she said Delhi food is \"infinitely better\" and the internet lost it",
    views: "Went viral on CurlyTales",
    hot: true,
  },
  {
    title: "Food & Lifestyle Vlogs",
    desc: "Her main YouTube content — real, relatable, and always about the food",
    views: "Fan favorite series",
    hot: false,
  },
  {
    title: "Show & Tell with the HST Crew",
    desc: "Aryana's birthday cup reveal, her gifts for the crew, and all the feels",
    views: "Core HST moment",
    hot: false,
  },
  {
    title: "GRWM + Life Advice",
    desc: "\"Wait for the end for some life altering advice\" — she wasn't lying",
    views: "Crowd pleaser",
    hot: true,
  },
];

export default function YouTube() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="youtube"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-pink-hot/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-mid/5 rounded-full blur-[120px]" />
      
      {/* Parallax Image */}
      <SectionImage 
        src="/images/aryana-6.jpg" 
        alt="Aryana cozy" 
        position="right"
        size="w-64 h-80"
        offset={-20}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
            <Play size={14} className="text-red-500" fill="currentColor" />
            <span className="text-sm font-semibold text-red-500">YouTube @AryanaDalal</span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl font-bold">
            Best of{" "}
            <span className="gradient-text">YouTube</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            8.9K subscribers and counting. Food, vlogs, and vibes that hit different.
          </p>
        </motion.div>

        {/* Playlist cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {playlists.map((playlist, i) => (
            <motion.a
              key={playlist.title}
              href={playlist.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`block card-hover rounded-3xl p-8 ${playlist.bgLight} border ${playlist.borderColor} relative overflow-hidden group cursor-pointer`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{playlist.emoji}</div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-3 group-hover:text-pink-hot transition-colors">
                {playlist.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {playlist.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {playlist.vibes.map((vibe) => (
                  <span
                    key={vibe}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/80 text-gray-500 font-medium border border-gray-100"
                  >
                    {vibe}
                  </span>
                ))}
              </div>
              {/* Watch link indicator */}
              <div className="flex items-center gap-2 text-sm font-medium text-pink-hot opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Watch Playlist</span>
                <ExternalLink size={14} />
              </div>
              {/* Gradient accent */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${playlist.color} opacity-10 rounded-bl-[60px]`}
              />
            </motion.a>
          ))}
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-8 text-center">
            Standout Moments
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-pink-light hover:shadow-lg hover:shadow-pink-hot/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 group-hover:text-pink-hot transition-colors pr-4">
                    {h.title}
                  </h4>
                  {h.hot && (
                    <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-gradient-to-r from-pink-hot to-orange-400 text-white font-bold">
                      HOT
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-3">{h.desc}</p>
                <span className="text-xs font-medium text-purple-mid">{h.views}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.youtube.com/@AryanaDalal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
          >
            <Play size={18} fill="white" />
            Watch on YouTube
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
