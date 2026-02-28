"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden bg-white" ref={containerRef}>
      {/* Wave SVG divider top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[1px]">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 50C960 52 1056 44 1152 36C1248 28 1344 20 1392 16L1440 12V0H0V60Z" fill="white" />
        </svg>
      </div>

      {/* Animated background blobs */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-peach-50 to-blush-100 rounded-full blur-3xl opacity-50"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-br from-blush-50 to-peach-100 rounded-full blur-3xl opacity-30"
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images grid with staggered entry */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                custom={0}
                variants={fadeInUp}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-peach-200/30 group"
              >
                <Image src="/images/aryana-2.jpg" alt="Aryana" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-peach-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              <motion.div
                custom={1}
                variants={fadeInUp}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-blush-200/30 mt-8 group"
              >
                <Image src="/images/aryana-6.jpg" alt="Aryana" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-blush-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
            {/* Floating decorative element */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-peach-200 to-blush-200 opacity-60 blur-sm"
            />
          </motion.div>

          {/* Text with staggered entry */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6 order-1 lg:order-2"
          >
            <motion.div custom={0} variants={fadeInUp}>
              <p className="text-script text-2xl text-terracotta-400 mb-4">
                Who is she?
              </p>
              <h2 className="text-headline text-5xl sm:text-6xl text-soft-brown-500 mb-6">
                Hey, I'm{" "}
                <span className="bg-gradient-to-r from-peach-500 via-blush-500 to-terracotta-400 bg-clip-text text-transparent">
                  Aryana
                </span>
              </h2>
            </motion.div>

            <motion.div custom={1} variants={fadeInUp} className="space-y-4 text-editorial text-lg text-soft-brown-400">
              <p>
                A Bombay-based content creator who loves eating, yapping, and being unapologetically herself.
              </p>
            </motion.div>

            <motion.div custom={2} variants={fadeInUp} className="space-y-4 text-editorial text-lg text-soft-brown-400">
              <p>
                Whether it's reviewing the city's best food spots, creating <span className="font-semibold text-terracotta-500">Clay Date</span> over pottery, or being part of <span className="font-semibold text-terracotta-500">The Having Said That Show</span> — I keep it real, always.
              </p>
            </motion.div>

            <motion.div custom={3} variants={fadeInUp} className="space-y-4 text-editorial text-lg text-soft-brown-400">
              <p>
                No filters. No fake vibes. Just me doing what I love and bringing you along for the ride.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
