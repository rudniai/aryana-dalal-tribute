"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const favourites = {
  restaurants: [
    {
      name: "Cafe Madras",
      type: "South Indian",
      vibe: "Classic Bombay",
      emoji: "🍛",
    },
    {
      name: "Theobroma",
      type: "Bakery & Desserts",
      vibe: "Sweet tooth heaven",
      emoji: "🍰",
    },
    {
      name: "Candies",
      type: "Café",
      vibe: "Bandra vibes",
      emoji: "☕",
    },
  ],
  movies: [
    {
      title: "Queen",
      why: "Independent woman energy",
      emoji: "👑",
    },
    {
      title: "Dil Chahta Hai",
      why: "Ultimate friendship goals",
      emoji: "🎬",
    },
  ],
  bombaySpots: [
    {
      name: "Marine Drive",
      for: "Late night drives",
      emoji: "🌊",
    },
    {
      name: "Bandra Bandstand",
      for: "Sunset views",
      emoji: "🌅",
    },
    {
      name: "Carter Road",
      for: "Walking & eating",
      emoji: "🚶‍♀️",
    },
  ],
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const flipCard = {
  hidden: { opacity: 0, rotateY: 30, y: 20 },
  visible: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: { duration: 0.6, type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

function FlipCard({ children, delay = 0, hoverColor }: { children: React.ReactNode; delay?: number; hoverColor: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={flipCard}
      whileHover={{ y: -6, rotateY: 5, scale: 1.03, transition: { duration: 0.3 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-cream-200 ${hoverColor} hover:shadow-xl transition-shadow duration-300 perspective-1000`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export default function Favourites() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="favourites"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-white to-cream-50"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-peach-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blush-100 rounded-full blur-3xl opacity-30" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-script text-2xl text-terracotta-400 mb-4">
            What I Love
          </p>
          <h2 className="text-headline text-5xl sm:text-6xl text-soft-brown-500 mb-6">
            Aryana&apos;s{" "}
            <span className="bg-gradient-to-r from-peach-500 via-blush-500 to-terracotta-400 bg-clip-text text-transparent">
              Favourites
            </span>
          </h2>
          <p className="text-editorial text-lg text-soft-brown-400 max-w-2xl mx-auto">
            My go-to spots, must-watch movies, and things that make Bombay feel like home
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Restaurants */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-serif text-2xl font-bold text-soft-brown-500 mb-6">
              Where I Eat
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {favourites.restaurants.map((place) => (
                <FlipCard key={place.name} hoverColor="hover:border-peach-300 hover:shadow-peach-200/20">
                  <div className="flex items-start gap-3">
                    <motion.span
                      className="text-2xl"
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {place.emoji}
                    </motion.span>
                    <div>
                      <h4 className="font-semibold text-soft-brown-500 mb-1">{place.name}</h4>
                      <p className="text-sm text-terracotta-500 mb-1">{place.type}</p>
                      <p className="text-xs text-soft-brown-400 italic">{place.vibe}</p>
                    </div>
                  </div>
                </FlipCard>
              ))}
            </motion.div>
          </motion.div>

          {/* Movies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-serif text-2xl font-bold text-soft-brown-500 mb-6">
              What I Watch
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {favourites.movies.map((movie) => (
                <FlipCard key={movie.title} hoverColor="hover:border-blush-300 hover:shadow-blush-200/20">
                  <div className="flex items-start gap-3">
                    <motion.span
                      className="text-2xl"
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {movie.emoji}
                    </motion.span>
                    <div>
                      <h4 className="font-semibold text-soft-brown-500 mb-2">{movie.title}</h4>
                      <p className="text-sm text-soft-brown-400 italic">&ldquo;{movie.why}&rdquo;</p>
                    </div>
                  </div>
                </FlipCard>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="pt-4 text-center"
            >
              <p className="text-sm text-soft-brown-400">+ many more Bollywood classics</p>
            </motion.div>
          </motion.div>

          {/* Bombay Spots */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-serif text-2xl font-bold text-soft-brown-500 mb-6">
              Bombay Spots
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {favourites.bombaySpots.map((spot) => (
                <FlipCard key={spot.name} hoverColor="hover:border-terracotta-300 hover:shadow-terracotta-200/20">
                  <div className="flex items-start gap-3">
                    <motion.span
                      className="text-2xl"
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {spot.emoji}
                    </motion.span>
                    <div>
                      <h4 className="font-semibold text-soft-brown-500 mb-1">{spot.name}</h4>
                      <p className="text-sm text-soft-brown-400">{spot.for}</p>
                    </div>
                  </div>
                </FlipCard>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
          className="text-center mt-12"
        >
          <p className="text-script text-xl text-terracotta-400 italic">
            More recommendations coming in my videos and Instagram stories!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
