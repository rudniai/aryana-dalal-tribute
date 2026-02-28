"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function EqualizerBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-white"
          animate={
            isPlaying
              ? {
                  height: ["4px", "14px", "6px", "12px", "4px"],
                }
              : { height: "4px" }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.8 + i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Floating Music Button with vinyl spin */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-soft shadow-lg shadow-peach-300/40 flex items-center justify-center text-white hover:shadow-xl hover:shadow-peach-300/50 transition-shadow duration-300"
        >
          {/* Vinyl spin ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/20"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { duration: 3, repeat: Infinity, ease: "linear" }
                : { duration: 0.5 }
            }
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />
          </motion.div>

          {isPlaying ? (
            <EqualizerBars isPlaying={isPlaying} />
          ) : (
            <Music size={24} />
          )}

          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-soft"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Expanded Controls */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-20 right-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-peach-200/40 p-4 border border-cream-200 min-w-[200px]"
            >
              <p className="text-sm font-semibold text-soft-brown-500 mb-3">
                Vibe Music
              </p>
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-peach-100 transition-colors"
                >
                  {isPlaying ? (
                    <Pause size={20} className="text-terracotta-500" />
                  ) : (
                    <Play size={20} className="text-terracotta-500" />
                  )}
                </motion.button>
                <motion.button
                  onClick={toggleMute}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-peach-100 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX size={20} className="text-soft-brown-400" />
                  ) : (
                    <Volume2 size={20} className="text-terracotta-500" />
                  )}
                </motion.button>
              </div>
              <p className="text-xs text-soft-brown-400 mt-2 italic">
                Chill vibes while you scroll
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="/music/background-music.mp3"
      />
    </>
  );
}
