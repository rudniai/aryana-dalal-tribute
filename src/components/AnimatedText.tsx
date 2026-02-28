"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  children: string;
  className?: string;
  gradient?: boolean;
  wave?: boolean;
}

export function AnimatedText({ children, className = "", gradient = false, wave = false }: AnimatedTextProps) {
  const words = children.split(" ");

  if (wave) {
    return (
      <span className={className}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-2">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (wordIndex * word.length + charIndex) * 0.1,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`inline-block mr-2 ${gradient ? "gradient-text-soft" : ""}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function ColorChangingText({ children, className = "" }: AnimatedTextProps) {
  const colors = [
    "text-peach-500",
    "text-blush-500",
    "text-terracotta-500",
    "text-soft-brown-500",
  ];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      animate={{ color: `var(--color-${colors[colorIndex].replace("text-", "")})` }}
      transition={{ duration: 1 }}
      className={`${className} ${colors[colorIndex]}`}
    >
      {children}
    </motion.span>
  );
}

export function GradientShiftText({ children, className = "" }: AnimatedTextProps) {
  return (
    <motion.span
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`${className} bg-gradient-to-r from-peach-500 via-blush-500 to-terracotta-500 bg-[length:200%_auto] bg-clip-text text-transparent`}
    >
      {children}
    </motion.span>
  );
}
