"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, Send, Sparkles } from "lucide-react";

interface Note {
  id: string;
  text: string;
  name: string;
  timestamp: number;
  color: string;
}

const noteColors = [
  "from-peach-100 to-blush-100",
  "from-blush-100 to-peach-100",
  "from-cream-100 to-peach-100",
  "from-peach-100 to-terracotta-100",
];

export default function PublicNotes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("aryana-public-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Some starter notes to make it feel lived-in
      const starterNotes: Note[] = [
        {
          id: "1",
          text: "Your content makes my day better! Thank you for being so real 💕",
          name: "Priya",
          timestamp: Date.now() - 86400000,
          color: noteColors[0],
        },
        {
          id: "2",
          text: "Found your channel last week and I'm OBSESSED. You're hilarious!",
          name: "Neha",
          timestamp: Date.now() - 172800000,
          color: noteColors[1],
        },
        {
          id: "3",
          text: "Clay Date is my comfort show now 🫶",
          name: "Anonymous",
          timestamp: Date.now() - 259200000,
          color: noteColors[2],
        },
      ];
      setNotes(starterNotes);
      localStorage.setItem("aryana-public-notes", JSON.stringify(starterNotes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmitting(true);

    const note: Note = {
      id: Date.now().toString(),
      text: newNote,
      name: userName.trim() || "Anonymous",
      timestamp: Date.now(),
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
    };

    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("aryana-public-notes", JSON.stringify(updatedNotes));

    // Reset form
    setNewNote("");
    setUserName("");
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section
      id="public-notes"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-white to-cream-50"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-peach-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blush-100 rounded-full blur-3xl opacity-30" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-script text-2xl text-terracotta-400 mb-4 flex items-center justify-center gap-2">
            <Heart size={20} className="animate-soft-pulse" />
            Spread Good Vibes
          </p>
          <h2 className="text-headline text-5xl sm:text-6xl text-soft-brown-500 mb-6">
            Leave a <span className="gradient-text-soft">Public Note</span>
          </h2>
          <p className="text-editorial text-lg text-soft-brown-400 max-w-2xl mx-auto">
            Share something kind, funny, or just say hi. This is a happy place 💌
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Write a note form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl p-8 border-2 border-cream-200 shadow-lg shadow-peach-200/20">
                <h3 className="font-serif text-2xl font-bold text-soft-brown-500 mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-peach-500" />
                  Write a Note
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-soft-brown-500 mb-2">
                      Your message
                    </label>
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Share something positive, funny, or kind..."
                      rows={4}
                      maxLength={200}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-cream-200 focus:border-peach-300 focus:outline-none text-soft-brown-500 resize-none"
                    />
                    <p className="text-xs text-soft-brown-400 mt-1 text-right">
                      {newNote.length}/200
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soft-brown-500 mb-2">
                      Your name (optional)
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Anonymous"
                      maxLength={30}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-cream-200 focus:border-peach-300 focus:outline-none text-soft-brown-500"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={!newNote.trim() || isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-full bg-gradient-soft text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-peach-300/40 hover:shadow-xl hover:shadow-peach-300/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Leave Your Note
                      </>
                    )}
                  </motion.button>
                </form>
                <p className="text-xs text-soft-brown-400 mt-4 text-center italic">
                  All notes are public and visible to everyone 💕
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Notes wall */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-serif text-2xl font-bold text-soft-brown-500 mb-6">
              Recent Notes ({notes.length})
            </h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-peach-300 scrollbar-track-cream-100">
              <AnimatePresence>
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${note.color} border border-peach-200 shadow-sm hover:shadow-md transition-shadow duration-300`}
                  >
                    <p className="text-soft-brown-500 mb-3 leading-relaxed">
                      "{note.text}"
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-terracotta-500">
                        — {note.name}
                      </span>
                      <span className="text-soft-brown-400 text-xs">
                        {new Date(note.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
