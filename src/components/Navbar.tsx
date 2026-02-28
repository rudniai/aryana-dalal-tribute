"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Menu, X, Heart, Sparkles } from "lucide-react";

const navItems = [
  { label: "About", href: "#about", emoji: "✨" },
  { label: "YouTube", href: "#youtube", emoji: "🎬" },
  { label: "Clay Date", href: "#claydate", emoji: "🎨" },
  { label: "Instagram", href: "#instagram", emoji: "📸" },
  { label: "Brands", href: "#brands", emoji: "💼" },
  { label: "Kindness Wall", href: "#public-notes", emoji: "💕" },
  { label: "Favourites", href: "#favourites", emoji: "⭐" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 100, damping: 30 });

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY;
    if (diff > 5 && latest > 150) {
      setHidden(true);
    } else if (diff < -5) {
      setHidden(false);
    }
    setScrolled(latest > 50);
    setLastScrollY(latest);
  });

  // Active section detection
  const updateActiveSection = useCallback(() => {
    const sections = navItems.map(item => item.href.replace("#", ""));
    for (const id of sections.reverse()) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(id);
          return;
        }
      }
    }
    setActiveSection("");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [updateActiveSection]);

  // Close mobile menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-white/70 shadow-lg shadow-pink-500/5 py-2 border-b border-pink-100/50"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with sparkle animation */}
          <motion.a
            href="#"
            className="relative group flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute -left-4 -top-1 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={14} className="text-pink-400" />
            </motion.span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
              ary&apos;s world
            </span>
            <motion.span
              className="absolute -right-3 -bottom-1 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={10} className="text-pink-400 fill-pink-400" />
            </motion.span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-pink-600"
                      : "text-gray-600 hover:text-pink-500"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full border border-pink-200/50"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.a>
              );
            })}

            {/* CTA Button */}
            <motion.a
              href="https://www.instagram.com/aryanadalal/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 text-white text-sm font-semibold shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/40 transition-all duration-300 bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]"
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-1.5">
                Follow
                <Heart size={13} className="fill-white" />
              </span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-2xl hover:bg-pink-50 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} className="text-pink-500" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400"
          style={{ scaleX, transformOrigin: "0%" }}
        />
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-white via-pink-50/95 to-purple-50/95 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Content */}
            <div className="relative pt-24 px-8 h-full flex flex-col">
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                      transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 25 }}
                      className={`text-2xl font-semibold font-[family-name:var(--font-space-grotesk)] py-4 px-5 rounded-2xl transition-all flex items-center gap-3 ${
                        isActive
                          ? "bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600"
                          : "hover:bg-pink-50/50 hover:text-pink-500"
                      }`}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      {item.label}
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-sm bg-pink-500 text-white px-2 py-0.5 rounded-full"
                        >
                          here
                        </motion.span>
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <motion.div
                className="mt-8 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="https://www.instagram.com/aryanadalal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 text-white font-semibold text-lg shadow-lg shadow-pink-500/25"
                >
                  Follow on Instagram
                  <Heart size={18} className="fill-white" />
                </a>
                <a
                  href="https://www.youtube.com/@AryanaDalal"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border-2 border-pink-200 text-pink-600 font-semibold text-lg hover:bg-pink-50 transition-colors"
                >
                  Subscribe on YouTube
                  🎬
                </a>
              </motion.div>

              {/* Decorative */}
              <motion.p
                className="mt-auto pb-10 text-center text-sm text-pink-400/60 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                made with 💕 for ary
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
