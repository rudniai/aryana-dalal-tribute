"use client";

import { motion } from "framer-motion";
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

export default function FanComments() {
  return (
    <section className="py-24 bg-gradient-to-b from-purple-soft/10 to-white noise-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Fan <span className="gradient-text">Love</span> 💜
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            What Aryana's amazing community has to say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {fanComments.map((comment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl card-hover"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-hot to-purple-mid flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {comment.name[0]}
                </div>
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
                <Heart className="w-4 h-4 fill-pink-hot text-pink-hot" />
                <span className="text-sm font-medium">{comment.likes} likes</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-pink-light/20 to-purple-soft/20 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-3 gradient-text">Leave Your Love! 💌</h3>
          <p className="text-gray-600 mb-6">
            Want to share what you love about Aryana? Head to her social media and let her know!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/aryanadalal/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-hot to-purple-mid text-white font-semibold hover:shadow-lg hover:shadow-pink-hot/25 transition-all duration-300 hover:scale-105"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@AryanaDalal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-hot to-purple-mid text-white font-semibold hover:shadow-lg hover:shadow-pink-hot/25 transition-all duration-300 hover:scale-105"
            >
              YouTube
            </a>
            <a
              href="https://x.com/aryanadalal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-hot to-purple-mid text-white font-semibold hover:shadow-lg hover:shadow-pink-hot/25 transition-all duration-300 hover:scale-105"
            >
              X / Twitter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
