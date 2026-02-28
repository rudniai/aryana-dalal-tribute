"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
    detail: "Bombay's best trainer with the city's nicest gym",
    emoji: "💪",
  },
  {
    name: "Ary",
    fullName: "Aryana Dalal",
    role: "The Newest Member",
    detail: "The reason you watch the show",
    emoji: "💖",
    highlight: true,
  },
  {
    name: "Aman",
    fullName: "Aman",
    role: "Crew",
    detail: "Worked on massive productions & talented creative production studio owner",
    emoji: "🎬",
  },
  {
    name: "Sid",
    fullName: "Sid",
    role: "Crew",
    detail: "The typewriter guy & the quiet force behind the scenes",
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

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const revealUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" as const, stiffness: 100 } },
};

export default function HSTShow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      id="hst"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background decoration with parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-deep/[0.02] via-transparent to-pink-hot/[0.02]" />
      <motion.div style={{ y: bgY }} className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-mid/5 rounded-full blur-[150px]" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }} className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-pink-hot/5 rounded-full blur-[150px]" />

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
            <span className="bg-gradient-to-r from-purple-deep via-pink-hot to-purple-mid bg-clip-text text-transparent">HST</span>
            {" "}Show
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Bombay&rsquo;s most unfiltered pod-show. New episodes every Thursday since July 2022.
            188+ episodes of pure chaos, honesty, and good vibes.
          </p>
        </motion.div>

        {/* Crew section - staggered */}
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {crewMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={revealUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative p-5 rounded-2xl text-center transition-all duration-300 backdrop-blur-sm ${
                  member.highlight
                    ? "bg-gradient-to-br from-pink-hot/10 to-purple-mid/10 border-2 border-pink-hot/30 shadow-lg shadow-pink-hot/10"
                    : "bg-white/80 border border-gray-100 hover:border-purple-light hover:shadow-lg hover:shadow-purple-mid/10"
                }`}
              >
                <motion.div
                  className="text-3xl mb-2"
                  whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {member.emoji}
                </motion.div>
                <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">
                  {member.name}
                </h4>
                <p className="text-xs text-purple-mid font-medium mt-1">{member.role}</p>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{member.detail}</p>
                {member.highlight && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-hot flex items-center justify-center"
                  >
                    <span className="text-white text-xs">★</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Show segments - glassmorphism cards */}
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {segments.map((seg) => (
              <motion.div
                key={seg.name}
                variants={revealUp}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-purple-light/20 hover:border-purple-mid/30 hover:shadow-xl hover:shadow-purple-mid/10 transition-shadow duration-300"
              >
                <motion.span
                  className="text-3xl inline-block"
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                >
                  {seg.icon}
                </motion.span>
                <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold mt-3 mb-1">
                  {seg.name}
                </h4>
                <p className="text-sm text-gray-500">{seg.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Recent episodes - slide in */}
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-3"
          >
            {episodes.map((ep, i) => (
              <motion.div
                key={ep.title}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: "spring" as const, stiffness: 120 } },
                }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-purple-light hover:shadow-lg hover:shadow-purple-mid/10 transition-all duration-300 cursor-pointer"
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
          </motion.div>
        </motion.div>

        {/* Listen CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, type: "spring" }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <motion.a
            href="https://open.spotify.com/show/2YLMxWuVY6wkSgr2CYxGGM"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1DB954] text-white font-semibold hover:shadow-lg hover:shadow-[#1DB954]/25 transition-all duration-300"
          >
            <Headphones size={18} />
            Listen on Spotify
            <ExternalLink size={14} />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/thehavingsaidthatshow/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-purple-mid/30 text-purple-deep font-semibold hover:bg-purple-mid/5 hover:border-purple-mid/50 transition-all duration-300"
          >
            Follow HST (111K)
            <ExternalLink size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
