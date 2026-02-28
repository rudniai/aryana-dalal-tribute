'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Heart, Send, Sparkles, RefreshCw, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { 
  moderateMessage, 
  checkRateLimit, 
  updateSubmitTimestamp, 
  isDuplicate, 
  saveToRecent 
} from '@/lib/moderation'

interface KindnessMessage {
  id: string
  message: string
  created_at: string
}

const noteColors = [
  'from-peach-100 to-blush-100',
  'from-blush-100 to-peach-100',
  'from-cream-100 to-peach-100',
  'from-peach-100 to-terracotta-100',
]

export default function PublicNotes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  
  const [messages, setMessages] = useState<KindnessMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Load messages on mount
  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('kindness_messages')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(12) // Show latest 12 messages

      if (error) throw error

      if (data) {
        setMessages(data)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSubmitting) return

    // Clear any previous errors
    setErrorMessage(null)

    // Check rate limit
    const rateLimitCheck = checkRateLimit()
    if (!rateLimitCheck.allowed) {
      setErrorMessage(`Please wait ${rateLimitCheck.waitTime} seconds before submitting again.`)
      return
    }

    // Check for duplicate
    if (isDuplicate(newMessage)) {
      setErrorMessage('This message was already submitted recently. Try writing something new!')
      return
    }

    // Moderate content
    const moderationResult = moderateMessage(newMessage)
    if (!moderationResult.isAllowed) {
      setErrorMessage(moderationResult.reason || 'This message cannot be posted.')
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('kindness_messages')
        .insert([
          {
            message: newMessage.trim(),
            approved: true
          }
        ])

      if (error) throw error

      // Save to recent messages for duplicate checking
      saveToRecent(newMessage)
      
      // Update rate limit timestamp
      updateSubmitTimestamp()

      setNewMessage('')
      setShowSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)
      
      // Reload messages to show the new one
      await loadMessages()
    } catch (error) {
      console.error('Error submitting message:', error)
      setErrorMessage('Oops! Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="public-notes"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-white to-cream-50"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-peach-100 rounded-full blur-3xl opacity-40 animate-float-gentle" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blush-100 rounded-full blur-3xl opacity-30 animate-float-gentle" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-peach-400 mx-auto" />
          </motion.div>
          <p className="text-script text-2xl text-terracotta-400 mb-4">Spread the love</p>
          <h2 className="text-headline text-5xl sm:text-6xl text-soft-brown-500 mb-6">
            Wall of <span className="gradient-text-soft">Kindness</span>
          </h2>
          <p className="text-editorial text-lg text-soft-brown-400 max-w-2xl mx-auto">
            A little corner of the internet for uplifting messages. Read, write, smile, repeat 💕
          </p>
        </motion.div>

        {/* Messages Grid */}
        <div className="mb-16">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-peach-300 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : messages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${noteColors[index % noteColors.length]} rounded-2xl p-6 shadow-md border-2 border-white/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-blush-400 flex-shrink-0 mt-1" fill="currentColor" />
                      <p className="text-soft-brown-700 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center">
                <motion.button
                  onClick={loadMessages}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-peach-500 hover:text-peach-600 transition-colors underline underline-offset-4"
                >
                  <RefreshCw className="w-4 h-4" />
                  Load More Kindness
                </motion.button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-soft-brown-400 text-lg">
                Be the first to spread some kindness! ✨
              </p>
            </div>
          )}
        </div>

        {/* Submit Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border-2 border-peach-100 shadow-xl shadow-peach-200/20">
            <h3 className="text-3xl font-serif text-peach-600 mb-6 text-center">
              Add Your Note
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <textarea
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value)
                    // Clear error when user starts typing
                    if (errorMessage) setErrorMessage(null)
                  }}
                  placeholder="Write something uplifting... ✨"
                  maxLength={280}
                  rows={4}
                  className="w-full px-6 py-4 bg-cream-50/50 border-2 border-peach-100 rounded-2xl 
                           focus:outline-none focus:border-peach-300 focus:ring-4 focus:ring-peach-50
                           text-soft-brown-700 placeholder:text-soft-brown-400
                           resize-none transition-all"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-soft-brown-500">
                    {newMessage.length}/280 characters
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={!newMessage.trim() || isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-peach-400 to-blush-400 
                         text-white rounded-full font-semibold text-lg
                         hover:from-peach-500 hover:to-blush-500
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all shadow-lg hover:shadow-xl
                         flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Love...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Love to the World
                  </>
                )}
              </motion.button>
            </form>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-peach-50 border-2 border-peach-200 rounded-2xl"
                >
                  <p className="text-peach-600 font-medium text-center flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" fill="currentColor" />
                    Your kindness has been shared! Thank you for spreading joy
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl"
                >
                  <p className="text-red-600 font-medium text-center flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {errorMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-sm text-soft-brown-500 text-center italic">
              All messages are public. Keep it kind, keep it positive, keep it real ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
