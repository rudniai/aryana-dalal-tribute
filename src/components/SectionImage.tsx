"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionImageProps {
  src: string;
  alt: string;
  position?: "left" | "right";
  offset?: number;
  size?: string;
  className?: string;
}

export default function SectionImage({ 
  src, 
  alt, 
  position = "right", 
  offset = 0,
  size = "w-64 h-80",
  className = ""
}: SectionImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 + offset, -100 + offset]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  const positionClasses = position === "left" 
    ? "left-0 -translate-x-20" 
    : "right-0 translate-x-20";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: position === "left" ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`absolute ${positionClasses} top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    >
      <motion.div
        style={{ y, rotate, scale }}
        className={`${size} rounded-3xl overflow-hidden shadow-2xl border-4 border-white`}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
