"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";

const guests = [
  {
    name: "Sakshi Shivdasani",
    episode: "Hot Girls Give Life Advice",
    thumbnail: "https://i.ytimg.com/vi/VZt3Q4HA2QQ/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=VZt3Q4HA2QQ",
  },
  {
    name: "Kareema Berry",
    episode: "Clay Date with Kareema Berry",
    thumbnail: "https://i.ytimg.com/vi/sFmp3M4KaXQ/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=sFmp3M4KaXQ",
  },
  {
    name: "Sheena Blends",
    episode: "Quitting Smoking & Toxic Boys",
    thumbnail: "https://i.ytimg.com/vi/50_mqe0-m4U/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=50_mqe0-m4U",
  },
  {
    name: "Aaliyah Kashyap",
    episode: "Exposing Our Relationships",
    thumbnail: "https://i.ytimg.com/vi/QmOPiUZoGB0/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=QmOPiUZoGB0",
  },
  {
    name: "Sherry Shroff",
    episode: "How To Be A YouTuber",
    thumbnail: "https://i.ytimg.com/vi/Ja8Zev-4Nuw/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=Ja8Zev-4Nuw",
  },
];

export default function ClayDate() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="claydate"
      className="relative py-32 px-6 overflow-hidden bg-white"
    >
      {/* Background decoration */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-peach-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-blush-100 rounded-full blur-3xl opacity-30" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-script text-2xl text-terracotta-400 mb-4">
            Original Series
          </p>
          
          {/* Clay Date Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-96 h-32 rounded-2xl overflow-hidden">
              <Image
                src="/images/claydate-logo.jpg"
                alt="Clay Date"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
          
          <p className="text-editorial text-lg text-soft-brown-400 max-w-2xl mx-auto">
            Heart-to-heart conversations while making pottery. Every Friday at 7 PM IST.
          </p>
        </motion.div>

        {/* Show info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-peach-50 to-blush-50 border border-peach-200 rounded-3xl p-8 mb-16 text-center max-w-2xl mx-auto"
        >
          <div className="space-y-3">
            <p className="text-sm text-soft-brown-400">Release Schedule</p>
            <p className="font-serif text-2xl font-semibold text-terracotta-500">Every Friday at 7 PM IST</p>
            <p className="text-sm text-soft-brown-400">Conversations + Pottery</p>
          </div>
        </motion.div>

        {/* Guest grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="font-serif text-3xl font-semibold text-soft-brown-500 mb-8 text-center">
            Featured Guests
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guests.map((guest, i) => (
              <motion.a
                key={guest.name}
                href={guest.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.05, type: "spring" }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-cream-200 hover:border-peach-300 hover:shadow-xl hover:shadow-peach-200/20 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-cream-100">
                  <img
                    src={guest.thumbnail}
                    alt={guest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center">
                      <Play size={24} className="text-terracotta-500 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h4 className="font-serif font-bold text-lg text-soft-brown-500 mb-1 group-hover:text-terracotta-500 transition-colors">
                    {guest.name}
                  </h4>
                  <p className="text-sm text-soft-brown-400 line-clamp-1">{guest.episode}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Behind the scenes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-cream-100 to-peach-50 border border-cream-200 rounded-3xl p-10 text-center"
        >
          <h3 className="font-serif text-2xl font-semibold text-soft-brown-500 mb-4">
            Behind the Scenes
          </h3>
          <p className="text-editorial text-soft-brown-400 mb-6 max-w-2xl mx-auto">
            Want to know how Clay Date came to life? Watch me reveal everything about the show, 
            the drama, and what goes on behind the camera.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.youtube.com/@AryanaDalal/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-soft text-white font-semibold hover:shadow-lg hover:shadow-peach-300/30 transition-all duration-300 hover:scale-105"
            >
              Watch All Episodes
              <ExternalLink size={14} />
            </a>
            <a
              href="https://www.instagram.com/aryanadalal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-terracotta-300 text-terracotta-500 font-semibold hover:bg-terracotta-50 transition-all duration-300 hover:scale-105"
            >
              Follow for Updates
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
