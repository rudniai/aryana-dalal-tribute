"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden bg-white">
      {/* Subtle background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-peach-50 rounded-full blur-3xl opacity-50" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-peach-200/30">
                <Image src="/images/aryana-2.jpg" alt="Aryana" fill className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-blush-200/30 mt-8">
                <Image src="/images/aryana-6.jpg" alt="Aryana" fill className="object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div>
              <p className="text-script text-2xl text-terracotta-400 mb-4">
                Who is she?
              </p>
              <h2 className="text-headline text-5xl sm:text-6xl text-soft-brown-500 mb-6">
                Hey, I'm <span className="gradient-text-soft">Aryana</span>
              </h2>
            </div>

            <div className="space-y-4 text-editorial text-lg text-soft-brown-400">
              <p>
                A Bombay-based content creator who loves eating, yapping, and being unapologetically herself.
              </p>

              <p>
                Whether it's reviewing the city's best food spots, creating <span className="font-semibold text-terracotta-500">Clay Date</span> over pottery, or being part of <span className="font-semibold text-terracotta-500">The Having Said That Show</span> — I keep it real, always.
              </p>

              <p>
                No filters. No fake vibes. Just me doing what I love and bringing you along for the ride.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
