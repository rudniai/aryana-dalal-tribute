"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const favourites = {
  restaurants: [
    {
      name: "Cafe Madras",
      type: "South Indian",
      vibe: "Classic Bombay",
    },
    {
      name: "Theobroma",
      type: "Bakery & Desserts",
      vibe: "Sweet tooth heaven",
    },
    {
      name: "Candies",
      type: "Café",
      vibe: "Bandra vibes",
    },
  ],
  movies: [
    {
      title: "Queen",
      why: "Independent woman energy",
    },
    {
      title: "Dil Chahta Hai",
      why: "Ultimate friendship goals",
    },
  ],
  bombaySpots: [
    {
      name: "Marine Drive",
      for: "Late night drives",
    },
    {
      name: "Bandra Bandstand",
      for: "Sunset views",
    },
    {
      name: "Carter Road",
      for: "Walking & eating",
    },
  ],
};

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
            Aryana's <span className="gradient-text-soft">Favourites</span>
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
            className="space-y-4"
          >
            <h3 className="font-serif text-2xl font-bold text-soft-brown-500 mb-6">
              Where I Eat
            </h3>
            {favourites.restaurants.map((place, i) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-5 rounded-2xl bg-white border border-cream-200 hover:border-peach-300 hover:shadow-lg hover:shadow-peach-200/20 transition-all duration-300"
              >
                <h4 className="font-semibold text-soft-brown-500 mb-1">{place.name}</h4>
                <p className="text-sm text-terracotta-500 mb-2">{place.type}</p>
                <p className="text-xs text-soft-brown-400 italic">{place.vibe}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Movies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-serif text-2xl font-bold text-soft-brown-500 mb-6">
              What I Watch
            </h3>
            {favourites.movies.map((movie, i) => (
              <motion.div
                key={movie.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-5 rounded-2xl bg-white border border-cream-200 hover:border-blush-300 hover:shadow-lg hover:shadow-blush-200/20 transition-all duration-300"
              >
                <h4 className="font-semibold text-soft-brown-500 mb-2">{movie.title}</h4>
                <p className="text-sm text-soft-brown-400 italic">"{movie.why}"</p>
              </motion.div>
            ))}
            <div className="pt-2 text-center">
              <p className="text-sm text-soft-brown-400">+ many more Bollywood classics</p>
            </div>
          </motion.div>

          {/* Bombay Spots */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="font-serif text-2xl font-bold text-soft-brown-500 mb-6">
              Bombay Spots
            </h3>
            {favourites.bombaySpots.map((spot, i) => (
              <motion.div
                key={spot.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-5 rounded-2xl bg-white border border-cream-200 hover:border-terracotta-300 hover:shadow-lg hover:shadow-terracotta-200/20 transition-all duration-300"
              >
                <h4 className="font-semibold text-soft-brown-500 mb-1">{spot.name}</h4>
                <p className="text-sm text-soft-brown-400">{spot.for}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
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
