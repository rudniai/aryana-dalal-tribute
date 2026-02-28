"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Start at 30% volume
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
      {/* Floating Music Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-soft shadow-lg shadow-peach-300/40 flex items-center justify-center text-white hover:shadow-xl hover:shadow-peach-300/50 transition-all duration-300"
        >
          <Music size={24} className={isPlaying ? "animate-pulse" : ""} />
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-soft"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ opacity: 0.3 }}
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
              className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-xl shadow-peach-200/40 p-4 border border-cream-200 min-w-[200px]"
            >
              <p className="text-sm font-semibold text-soft-brown-500 mb-3">
                Vibe Music
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full hover:bg-peach-100 transition-colors"
                >
                  {isPlaying ? (
                    <Pause size={20} className="text-terracotta-500" />
                  ) : (
                    <Play size={20} className="text-terracotta-500" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-peach-100 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX size={20} className="text-soft-brown-400" />
                  ) : (
                    <Volume2 size={20} className="text-terracotta-500" />
                  )}
                </button>
              </div>
              <p className="text-xs text-soft-brown-400 mt-2 italic">
                Chill vibes while you scroll
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hidden Audio Element - You'll need to add actual music file */}
      <audio
        ref={audioRef}
        loop
        src="/music/background-music.mp3" // Add your music file here
      />
    </>
  );
}
