"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Flame, ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react";
import SectionImage from "./SectionImage";

interface Take {
  take: string;
  context: string;
  spicyLevel: number;
  source: string;
  reactions: string[];
}

const controversialTakes: Take[] = [
  {
    take: "Delhi food is infinitely better and cheaper than Mumbai's.",
    context:
      "Said this on Instagram, got picked up by CurlyTales, and the entire internet had opinions. As a Mumbaikar, she committed the ultimate betrayal.",
    spicyLevel: 5,
    source: "Instagram / CurlyTales",
    reactions: ["Mumbai people unfollowing", "Delhi people adopting her", "Comment section: war zone"],
  },
  {
    take: "Tweets about her feelings, boys, and Formula 1 — and that's her whole personality.",
    context:
      "Her literal X/Twitter bio. She said it herself. Self-awareness is her superpower.",
    spicyLevel: 3,
    source: "Twitter Bio",
    reactions: ["F1 fans: one of us", "The boys: nervous", "Therapists: she's doing great"],
  },
  {
    take: "She runs a tarot community. Yes, the food girl does tarot.",
    context:
      "Aryana hosts a community called 'Tarot House' — a sacred space for tarot, clarity, and connection. Plot twist of the century.",
    spicyLevel: 4,
    source: "Coto Platform",
    reactions: ["Astrology girlies: welcome home", "Skeptics: confused", "Her audience: intrigued"],
  },
  {
    take: "\"Feels like I was only there for the free wine\"",
    context:
      "Posted this as an Instagram reel caption. Relatable? Absolutely. Appropriate? That's not the point.",
    spicyLevel: 2,
    source: "Instagram Reel",
    reactions: ["Event organizers: noted", "Everyone else: same honestly", "Brand collabs: unfazed"],
  },
  {
    take: "Mumbai vs Delhi is not even a debate — and she's FROM Mumbai.",
    context:
      "She didn't just pick a side, she picked the wrong side (if you're from Mumbai). A true CurlyTales-featured hot take that sparked genuine online discourse.",
    spicyLevel: 5,
    source: "Viral Reel",
    reactions: ["\"A true Mumbaikar would never\"", "Comment section chaos", "Peak engagement content"],
  },
  {
    take: "What baking cookies taught me about life.",
    context:
      "A LinkedIn post where she drew life lessons from baking. Corporate LinkedIn was not ready.",
    spicyLevel: 2,
    source: "LinkedIn",
    reactions: ["LinkedIn bros: inspired", "Recruiters: confused", "Her followers: that's our girl"],
  },
];

function SpicyMeter({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`text-lg ${i <= level ? "" : "opacity-20 grayscale"}`}
        >
          🌶️
        </div>
      ))}
    </div>
  );
}

export default function HotTakes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedTake, setExpandedTake] = useState<number | null>(null);

  return (
    <section
      id="hot-takes"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/30 to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-pink-hot/5 via-orange-300/5 to-purple-mid/5 rounded-full blur-[100px]" />
      
      {/* Parallax Image */}
      <SectionImage 
        src="/images/cropped-aryana-3.jpg" 
        alt="Aryana controversial moment" 
        position="right"
        size="w-64 h-80"
        offset={-30}
      />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 mb-6">
            <Flame size={14} className="text-orange-500" />
            <span className="text-sm font-semibold text-orange-600">Caution: Spicy Content</span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl font-bold">
            The{" "}
            <span className="gradient-text">Hot Takes</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            She said what she said. No take-backs. Ranked by spice level.
          </p>
        </motion.div>

        {/* Warning banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-orange-50 border border-orange-200 mb-10"
        >
          <AlertTriangle size={20} className="text-orange-500 shrink-0" />
          <p className="text-sm text-orange-700">
            <strong>Disclaimer:</strong> These takes are Aryana&rsquo;s personal opinions.
            If you disagree, take it up with her comment section.
          </p>
        </motion.div>

        {/* Takes list */}
        <div className="space-y-4">
          {controversialTakes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => setExpandedTake(expandedTake === i ? null : i)}
              className="group cursor-pointer"
            >
              <div
                className={`p-6 rounded-2xl border transition-all duration-500 ${
                  expandedTake === i
                    ? "bg-gradient-to-br from-pink-hot/5 to-orange-50 border-pink-hot/20 shadow-lg shadow-pink-hot/5"
                    : "bg-white border-gray-100 hover:border-orange-200 hover:shadow-md"
                }`}
              >
                {/* Take header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg text-gray-900 leading-snug">
                      &ldquo;{item.take}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <SpicyMeter level={item.spicyLevel} />
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
                        {item.source}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedTake === i ? 180 : 0 }}
                    className="shrink-0 w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-sm"
                  >
                    ↓
                  </motion.div>
                </div>

                {/* Expanded content */}
                {expandedTake === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 pt-5 border-t border-gray-100"
                  >
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.context}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        The Internet Reacted:
                      </p>
                      {item.reactions.map((reaction, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 text-sm text-gray-500"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-hot shrink-0" />
                          {reaction}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-pink-hot/5 border border-orange-200/50">
            <p className="text-lg font-medium text-gray-700 mb-2">
              Think you can handle more hot takes?
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Follow Aryana. She&rsquo;s not done stirring the pot.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://x.com/aryanadalal"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all hover:scale-105"
              >
                Follow on X/Twitter
              </a>
              <a
                href="https://www.threads.net/@aryanadalal"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all hover:scale-105"
              >
                Follow on Threads
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
