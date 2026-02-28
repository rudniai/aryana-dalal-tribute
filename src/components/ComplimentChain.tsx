"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, ArrowRight, Sparkles } from "lucide-react";

interface ChainCompliment {
  text: string;
  from: string;
  timestamp: number;
}

const starterCompliments = [
  {
    text: "You're exactly where you need to be right now",
    from: "Someone who believes in you",
    timestamp: Date.now(),
  },
  {
    text: "Your smile could light up an entire room",
    from: "A stranger who cares",
    timestamp: Date.now(),
  },
  {
    text: "You deserve all the good things coming your way",
    from: "The universe",
    timestamp: Date.now(),
  },
  {
    text: "You're doing better than you think you are",
    from: "Someone who gets it",
    timestamp: Date.now(),
  },
];

export default function ComplimentChain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  
  const [receivedCompliment, setReceivedCompliment] = useState<ChainCompliment | null>(null);
  const [hasSeenCompliment, setHasSeenCompliment] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [newCompliment, setNewCompliment] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already received a compliment in this session
    const hasReceivedToday = sessionStorage.getItem("received-compliment-today");
    
    if (!hasReceivedToday) {
      // Get the compliment left for them
      const savedCompliment = localStorage.getItem("compliment-chain");
      if (savedCompliment) {
        setReceivedCompliment(JSON.parse(savedCompliment));
      } else {
        // If no compliment exists, show a starter one
        const randomStarter = starterCompliments[Math.floor(Math.random() * starterCompliments.length)];
        setReceivedCompliment(randomStarter);
      }
      sessionStorage.setItem("received-compliment-today", "true");
    } else {
      setHasSeenCompliment(true);
      setShowLeaveForm(true);
    }
  }, []);

  const handleAcknowledge = () => {
    setHasSeenCompliment(true);
    setTimeout(() => {
      setShowLeaveForm(true);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompliment.trim()) return;

    setIsSubmitting(true);

    const compliment: ChainCompliment = {
      text: newCompliment,
      from: senderName.trim() || "Someone kind",
      timestamp: Date.now(),
    };

    // Save for the next person
    localStorage.setItem("compliment-chain", JSON.stringify(compliment));

    // Show success
    setTimeout(() => {
      setIsSubmitting(false);
      setNewCompliment("");
      setSenderName("");
      alert("✨ Your compliment has been passed forward! The next visitor will receive it. Thank you for spreading joy!");
    }, 500);
  };

  return (
    <section
      id="compliment-chain"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-cream-50 to-white"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-peach-100 rounded-full blur-3xl opacity-40 animate-float-gentle" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blush-100 rounded-full blur-3xl opacity-30 animate-float-gentle" style={{ animationDelay: "1s" }} />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-script text-2xl text-terracotta-400 mb-4 flex items-center justify-center gap-2">
            <Heart size={20} className="animate-soft-pulse" />
            Chain of Kindness
          </p>
          <h2 className="text-headline text-5xl sm:text-6xl text-soft-brown-500 mb-6">
            A Compliment <span className="gradient-text-soft">For You</span>
          </h2>
          <p className="text-editorial text-lg text-soft-brown-400 max-w-2xl mx-auto">
            Someone left this for you. After you read it, pass one forward to the next visitor 💌
          </p>
        </motion.div>

        {/* Received Compliment */}
        <AnimatePresence mode="wait">
          {receivedCompliment && !hasSeenCompliment && (
            <motion.div
              key="received"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              <div className="relative bg-gradient-to-br from-peach-100 to-blush-100 rounded-3xl p-12 border-2 border-peach-200 shadow-2xl shadow-peach-200/40">
                {/* Decorative sparkles */}
                <div className="absolute top-6 right-6 text-4xl opacity-30 animate-float-gentle">
                  ✨
                </div>
                <div className="absolute bottom-6 left-6 text-3xl opacity-30 animate-float-gentle" style={{ animationDelay: "0.5s" }}>
                  💖
                </div>

                <div className="text-center space-y-6 relative z-10">
                  <div className="text-6xl mb-6 animate-soft-pulse">
                    💌
                  </div>
                  <p className="font-serif text-3xl sm:text-4xl font-semibold text-soft-brown-500 leading-relaxed">
                    "{receivedCompliment.text}"
                  </p>
                  <p className="text-lg text-terracotta-500 italic">
                    — {receivedCompliment.from}
                  </p>
                  
                  <motion.button
                    onClick={handleAcknowledge}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-soft text-white font-semibold text-lg shadow-lg shadow-peach-300/40 hover:shadow-xl hover:shadow-peach-300/50 transition-all duration-300"
                  >
                    Thank You
                    <Heart size={20} className="animate-soft-pulse" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Leave Compliment Form */}
        <AnimatePresence>
          {showLeaveForm && (
            <motion.div
              key="leave"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-cream-200 shadow-lg shadow-blush-200/20">
                <div className="text-center mb-8">
                  <h3 className="font-serif text-3xl font-bold text-soft-brown-500 mb-4 flex items-center justify-center gap-3">
                    <Sparkles size={24} className="text-peach-500" />
                    Now It's Your Turn
                    <ArrowRight size={24} className="text-peach-500" />
                  </h3>
                  <p className="text-editorial text-soft-brown-400">
                    Leave a compliment for the next person who visits. Make their day ✨
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-soft-brown-500 mb-2">
                      Your compliment for the next visitor
                    </label>
                    <textarea
                      value={newCompliment}
                      onChange={(e) => setNewCompliment(e.target.value)}
                      placeholder="You're amazing and deserve good things..."
                      rows={4}
                      maxLength={150}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-cream-200 focus:border-peach-300 focus:outline-none text-soft-brown-500 resize-none"
                    />
                    <p className="text-xs text-soft-brown-400 mt-1 text-right">
                      {newCompliment.length}/150
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soft-brown-500 mb-2">
                      Sign as (optional)
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Someone kind"
                      maxLength={30}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-cream-200 focus:border-peach-300 focus:outline-none text-soft-brown-500"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={!newCompliment.trim() || isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-full bg-gradient-soft text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-peach-300/40 hover:shadow-xl hover:shadow-peach-300/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Passing It Forward...
                      </>
                    ) : (
                      <>
                        <Heart size={18} />
                        Pass It Forward
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-xs text-soft-brown-400 mt-6 text-center italic">
                  Your compliment will brighten someone's day 💕
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
