"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mic, Users, Headphones, ExternalLink, Zap } from "lucide-react";
import SectionImage from "./SectionImage";

const crewMembers = [
  {
    name: "Adi",
    fullName: "Aditya Lodha",
    role: "Host & Creative Director",
    detail: "Musician lauded by Rolling Stone India & GQ",
    emoji: "🎵",
  },
  {
    name: "Jeh",
    fullName: "Jehangir Havaldar",
    role: "Co-Host",
    detail: "Certified fitness & nutrition expert",
    emoji: "💪",
  },
  {
    name: "Ary",
    fullName: "Aryana Dalal",
    role: "The Newest Member",
    detail: "Social media creator & the heart of HST",
    emoji: "💖",
    highlight: true,
  },
  {
    name: "Aman",
    fullName: "Aman",
    role: "Crew",
    detail: "Food-obsessed film grad",
    emoji: "🎬",
  },
  {
    name: "Sid",
    fullName: "Sid",
    role: "Crew",
    detail: "The typewriter guy",
    emoji: "⌨️",
  },
];

const episodes = [
  {
    title: "Addressing our problems with each other",
    date: "Feb 22, 2026",
    tag: "LATEST",
    tagColor: "bg-pink-hot",
  },
  {
    title: "We Got Into A Big Fight! (V day special)",
    date: "Feb 17, 2026",
    tag: "DRAMA",
    tagColor: "bg-purple-mid",
  },
  {
    title: "Strangers Tell Us Their Deepest Secrets!",
    date: "Feb 16, 2026",
    tag: "STREET",
    tagColor: "bg-violet-500",
  },
  {
    title: "He Got Controversial For The First Time!?",
    date: "Feb 1, 2026",
    tag: "SPICY",
    tagColor: "bg-orange-400",
  },
  {
    title: "We Asked Strangers for Their Most Controversial Opinions",
    date: "Jan 18, 2026",
    tag: "STREET",
    tagColor: "bg-violet-500",
  },
  {
    title: "Starting Our Own Cafe!?! Ft. The Croffle Guys",
    date: "Jan 7, 2026",
    tag: "FOOD",
    tagColor: "bg-green-500",
  },
];

const segments = [
  { name: "Show & Tell", icon: "🎁", desc: "Crew shares personal items with backstories" },
  { name: "HST After Dark", icon: "🌙", desc: "Unfiltered. Personal. No holds barred." },
  { name: "Street Interviews", icon: "🎤", desc: "Asking strangers the real questions" },
  { name: "Taste Tests", icon: "🍕", desc: "Rating food with zero chill" },
];

export default function HSTShow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="hst"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-deep/[0.02] via-transparent to-pink-hot/[0.02]" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-mid/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-pink-hot/5 rounded-full blur-[150px]" />
      
      {/* Parallax Image */}
      <SectionImage 
        src="/images/aryana-7.jpg" 
        alt="Aryana at HST Show" 
        position="left"
        size="w-64 h-80"
        offset={50}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-deep/10 border border-purple-deep/20 mb-6">
            <Mic size={14} className="text-purple-deep" />
            <span className="text-sm font-semibold text-purple-deep">The Having Said That Show</span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl font-bold">
            The{" "}
            <span className="gradient-text">HST</span>
            {" "}Show
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Mumbai&rsquo;s most unfiltered pod-show. New episodes every Thursday since July 2022.
            188+ episodes of pure chaos, honesty, and good vibes.
          </p>
        </motion.div>

        {/* Crew section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Users size={20} className="text-purple-mid" />
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
              The Crew
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {crewMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`relative p-5 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                  member.highlight
                    ? "bg-gradient-to-br from-pink-hot/10 to-purple-mid/10 border-2 border-pink-hot/30 animate-pulse-glow"
                    : "bg-white border border-gray-100 hover:border-purple-light hover:shadow-md"
                }`}
              >
                <div className="text-3xl mb-2">{member.emoji}</div>
                <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">
                  {member.name}
                </h4>
                <p className="text-xs text-purple-mid font-medium mt-1">{member.role}</p>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{member.detail}</p>
                {member.highlight && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-hot flex items-center justify-center">
                    <span className="text-white text-xs">★</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Show segments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Zap size={20} className="text-pink-hot" />
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
              Recurring Segments
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {segments.map((seg, i) => (
              <motion.div
                key={seg.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                className="p-5 rounded-2xl bg-gradient-to-br from-white to-purple-light/10 border border-purple-light/20 hover:border-purple-mid/30 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-3xl">{seg.icon}</span>
                <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold mt-3 mb-1">
                  {seg.name}
                </h4>
                <p className="text-sm text-gray-500">{seg.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent episodes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Headphones size={20} className="text-purple-deep" />
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
              Recent Episodes
            </h3>
          </div>
          <div className="space-y-3">
            {episodes.map((ep, i) => (
              <motion.div
                key={ep.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-purple-light hover:shadow-md hover:shadow-purple-mid/5 transition-all duration-300 cursor-pointer"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-deep to-pink-hot flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 group-hover:text-purple-deep transition-colors truncate">
                    {ep.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">{ep.date}</p>
                </div>
                <span
                  className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full ${ep.tagColor} text-white font-bold tracking-wider`}
                >
                  {ep.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Listen CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <a
            href="https://open.spotify.com/show/2YLMxWuVY6wkSgr2CYxGGM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1DB954] text-white font-semibold hover:shadow-lg hover:shadow-[#1DB954]/25 transition-all duration-300 hover:scale-105"
          >
            <Headphones size={18} />
            Listen on Spotify
            <ExternalLink size={14} />
          </a>
          <a
            href="https://www.instagram.com/thehavingsaidthatshow/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-purple-mid/30 text-purple-deep font-semibold hover:bg-purple-mid/5 hover:border-purple-mid/50 transition-all duration-300 hover:scale-105"
          >
            Follow HST (111K)
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
