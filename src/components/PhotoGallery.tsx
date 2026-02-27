"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Placeholder images - these would be replaced with actual Aryana's photos
const photos = [
  {
    url: "https://picsum.photos/600/800?random=1",
    caption: "Slaying in Mumbai 💜",
    likes: "12.5K",
  },
  {
    url: "https://picsum.photos/800/600?random=2",
    caption: "HST Show BTS 🎙️",
    likes: "8.2K",
  },
  {
    url: "https://picsum.photos/600/800?random=3",
    caption: "Taste test queen 🍕",
    likes: "15.3K",
  },
  {
    url: "https://picsum.photos/800/600?random=4",
    caption: "GRWM vibes ✨",
    likes: "11.7K",
  },
  {
    url: "https://picsum.photos/600/800?random=5",
    caption: "Formula 1 weekend 🏎️",
    likes: "9.8K",
  },
  {
    url: "https://picsum.photos/800/600?random=6",
    caption: "Living my best life 🌟",
    likes: "13.1K",
  },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-white via-pink-light/5 to-purple-soft/10 noise-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Stunning</span> Moments
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            A collection of Aryana's most beautiful and iconic looks 📸
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedPhoto(index)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl glass card-hover"
            >
              <div className="aspect-[4/5] md:aspect-square bg-gradient-to-br from-pink-light/20 to-purple-soft/20">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-semibold text-lg mb-2">{photo.caption}</p>
                <div className="flex items-center gap-2 text-pink-light">
                  <span className="text-2xl">❤️</span>
                  <span className="font-medium">{photo.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl max-h-[90vh]"
            >
              <img
                src={photos[selectedPhoto].url}
                alt={photos[selectedPhoto].caption}
                className="rounded-2xl max-h-[85vh] w-auto object-contain"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4">
                <p className="text-white font-semibold text-lg">{photos[selectedPhoto].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Follow for more stunning content 💜</p>
          <a
            href="https://www.instagram.com/aryanadalal/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-hot to-purple-mid text-white font-semibold hover:shadow-xl hover:shadow-pink-hot/25 transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl">📸</span>
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
