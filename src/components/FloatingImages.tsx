"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Actual Aryana photos floating with parallax effects!
const images = [
  {
    src: "/images/aryana-1.png",
    alt: "Aryana",
    position: { top: "10%", left: "5%", rotate: -5 },
    size: "w-48 h-64",
    parallaxSpeed: 0.3,
  },
  {
    src: "/images/aryana-3.png",
    alt: "Aryana outdoors",
    position: { top: "25%", right: "8%", rotate: 8 },
    size: "w-56 h-72",
    parallaxSpeed: 0.5,
  },
  {
    src: "/images/aryana-5.png",
    alt: "Aryana elegant dress",
    position: { top: "45%", left: "3%", rotate: -3 },
    size: "w-40 h-56",
    parallaxSpeed: 0.4,
  },
  {
    src: "/images/aryana-7.png",
    alt: "Aryana traditional",
    position: { top: "60%", right: "5%", rotate: 5 },
    size: "w-52 h-68",
    parallaxSpeed: 0.6,
  },
  {
    src: "/images/aryana-8.png",
    alt: "Aryana floral dress",
    position: { top: "75%", left: "7%", rotate: -7 },
    size: "w-44 h-60",
    parallaxSpeed: 0.35,
  },
  {
    src: "/images/aryana-10.png",
    alt: "Aryana blue outfit",
    position: { top: "85%", right: "10%", rotate: 4 },
    size: "w-48 h-64",
    parallaxSpeed: 0.45,
  },
];

function ParallaxImage({ 
  src, 
  alt, 
  position, 
  size, 
  parallaxSpeed, 
  index 
}: { 
  src: string;
  alt: string;
  position: any;
  size: string;
  parallaxSpeed: number;
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * parallaxSpeed, 100 * parallaxSpeed]);
  const rotate = useTransform(scrollYProgress, [0, 1], [position.rotate, position.rotate + 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="absolute hidden lg:block pointer-events-none z-0"
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
      }}
    >
      <motion.div
        style={{ y, rotate, scale }}
        whileHover={{ scale: 1.1, zIndex: 10 }}
        className={`${size} rounded-2xl overflow-hidden shadow-2xl border-4 border-white hover:shadow-pink-hot/50 transition-shadow duration-300 pointer-events-auto cursor-pointer`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

export default function FloatingImages() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {images.map((img, index) => (
        <ParallaxImage key={index} {...img} index={index} />
      ))}
    </div>
  );
}
