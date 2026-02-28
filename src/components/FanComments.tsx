"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

const fanComments = [
  {
    name: "Priya M.",
    username: "@priyam_22",
    comment: "Aryana is literally the coolest person ever! Her energy is unmatched 💜",
    likes: "234",
    verified: true,
  },
  {
    name: "Rahul K.",
    username: "@rahul.k",
    comment: "The way she talks about food makes me hungry every single time 🍕😂",
    likes: "189",
    verified: false,
  },
  {
    name: "Sneha D.",
    username: "@sneha_delhi",
    comment: "HST wouldn't be the same without Aryana! She brings such good vibes to every episode ✨",
    likes: "312",
    verified: true,
  },
  {
    name: "Aditya S.",
    username: "@aditya.s",
    comment: "Her taste tests are THE BEST content on YouTube. No cap. 🔥",
    likes: "156",
    verified: false,
  },
  {
    name: "Kavya P.",
    username: "@kavyap_",
    comment: "Aryana is so real and authentic! We need more creators like her 🫶",
    likes: "267",
    verified: true,
  },
  {
    name: "Rohan M.",
    username: "@rohan_mumbai",
    comment: "The Bombay vs Delhi debates with her are ICONIC 😂🔥",
    likes: "198",
    verified: false,
  },
  {
    name: "Ananya R.",
    username: "@ananya.r",
    comment: "Obsessed with her vlogs! She makes even boring stuff entertaining 💯",
    likes: "221",
    verified: true,
  },
  {
    name: "Karan J.",
    username: "@karan_j",
    comment: "Her F1 content is underrated! Fellow motorsport fan here 🏎️",
    likes: "143",
    verified: false,
  },
  {
    name: "Diya T.",
    username: "@diya.t",
    comment: "Aryana's fashion sense is literally goals! Everything she wears looks amazing 👗✨",
    likes: "289",
    verified: true,
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const slideIn = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -40 : 40,
    y: 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export default function FanComments() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-gradient-to-b from-purple-soft/10 to-white noise-bg overflow-hidden">
      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Fan{" "}
            <span className="bg-gradient-to-r from-pink-hot via-purple-mid to-violet-500 bg-clip-text text-transparent">
              Love
            </span>{" "}
            💜
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            What Aryana&apos;s amazing community has to say
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {fanComments.map((comment, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={slideIn}
              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-gray-100 hover:border-pink-light/50 hover:shadow-xl hover:shadow-pink-hot/10 transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-hot to-purple-mid flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md shadow-pink-hot/20"
                >
                  {comment.name[0]}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 truncate">{comment.name}</h4>
                    {comment.verified && (
                      <span className="text-blue-500 flex-shrink-0">✓</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate">{comment.username}</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">{comment.comment}</p>

              <div className="flex items-center gap-2 text-gray-400">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="w-4 h-4 fill-pink-hot text-pink-hot" />
                </motion.div>
                <span className="text-sm font-medium">{comment.likes} likes</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-pink-light/20 to-purple-soft/20 backdrop-blur-sm max-w-3xl mx-auto border border-pink-light/20"
        >
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-hot to-purple-mid bg-clip-text text-transparent">
            Leave Your Love! 💌
          </h3>
          <p className="text-gray-600 mb-6">
            Want to share what you love about Aryana? Head to her social media and let her know!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://www.instagram.com/aryanadalal/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-hot to-purple-mid text-white font-semibold hover:shadow-lg hover:shadow-pink-hot/25 transition-all duration-300"
            >
              Instagram
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@AryanaDalal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-hot to-purple-mid text-white font-semibold hover:shadow-lg hover:shadow-pink-hot/25 transition-all duration-300"
            >
              YouTube
            </motion.a>
            <motion.a
              href="https://x.com/aryanadalal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-hot to-purple-mid text-white font-semibold hover:shadow-lg hover:shadow-pink-hot/25 transition-all duration-300"
            >
              X / Twitter
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
