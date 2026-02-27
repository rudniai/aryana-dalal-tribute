"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Heart, Coffee, Sparkles } from "lucide-react";
import SectionImage from "./SectionImage";

const traits = [
  { icon: MapPin, label: "Mumbai, always", color: "text-pink-hot" },
  { icon: Coffee, label: "Food > Everything", color: "text-purple-mid" },
  { icon: Heart, label: "Feelings, boys & F1", color: "text-pink-hot" },
  { icon: Sparkles, label: "Tarot reader", color: "text-purple-mid" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-soft/10 rounded-full blur-[100px]" />
      
      {/* Parallax Image */}
      <SectionImage 
        src="/images/cropped-aryana-2.jpg" 
        alt="Aryana" 
        position="right"
        size="w-72 h-96"
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Profile visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-hot to-purple-mid animate-spin-slow opacity-20" />
              <div className="absolute inset-2 rounded-full bg-cream" />
              {/* Inner content */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-pink-hot/10 to-purple-mid/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">👑</div>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold gradient-text">
                    Ary
                  </p>
                  <p className="text-sm text-gray-400 mt-1">22K on Insta</p>
                  <p className="text-sm text-gray-400">8.9K on YouTube</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-2 right-8 sm:right-16 px-4 py-2 rounded-2xl bg-white shadow-lg shadow-pink-hot/10 border border-pink-light/50"
            >
              <span className="text-sm font-semibold text-pink-hot">Jai Hind College 🎓</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, type: "spring" }}
              className="absolute -bottom-2 left-4 sm:left-12 px-4 py-2 rounded-2xl bg-white shadow-lg shadow-purple-mid/10 border border-purple-light/50"
            >
              <span className="text-sm font-semibold text-purple-deep">Community @ Kult App 💼</span>
            </motion.div>
          </motion.div>

          {/* Right side - Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-semibold text-purple-mid uppercase tracking-widest">
              Who is she?
            </span>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mt-3 mb-6">
              The girl who keeps it{" "}
              <span className="gradient-text">unapologetically real</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Mumbai-born, SoBo-raised, and chronically online — Aryana (or &ldquo;Ary&rdquo; to her
                crew) is the kind of person who will tell you Delhi food is better than Mumbai&rsquo;s{" "}
                <em>and mean it.</em> She tweets about her feelings, boys, and Formula 1,
                and she&rsquo;s not sorry about any of it.
              </p>
              <p>
                When she&rsquo;s not filming food reviews or dropping vlogs on YouTube, she&rsquo;s
                on set with the Having Said That Show crew — bringing the chaotic, unfiltered energy
                that makes HST what it is. She also runs tarot sessions because yes, she contains multitudes.
              </p>
            </div>

            {/* Trait chips */}
            <div className="flex flex-wrap gap-3 mt-8">
              {traits.map((trait, i) => (
                <motion.div
                  key={trait.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-pink-light transition-all duration-300"
                >
                  <trait.icon size={16} className={trait.color} />
                  <span className="text-sm font-medium text-gray-700">{trait.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
