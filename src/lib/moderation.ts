// Content moderation utilities for Wall of Kindness

// Profanity filter - common bad words (keeping it simple but effective)
const PROFANITY_LIST = [
  'fuck', 'shit', 'damn', 'ass', 'bitch', 'bastard', 'hell',
  'crap', 'piss', 'dick', 'cock', 'pussy', 'sex', 'porn',
  'slut', 'whore', 'fag', 'retard', 'stupid', 'idiot', 'hate',
  // Add variations
  'f*ck', 'sh*t', 'b*tch', 'a$$', 'fuk', 'fck', 'sht',
]

// Negative/mean words to block
const NEGATIVE_WORDS = [
  'ugly', 'fat', 'loser', 'pathetic', 'worthless', 'garbage',
  'trash', 'suck', 'terrible', 'awful', 'horrible', 'disgusting',
  'kill', 'die', 'death', 'suicide', 'hurt', 'pain',
  'hate', 'stupid', 'dumb', 'idiot', 'moron', 'failure',
]

// Spam patterns
const SPAM_PATTERNS = [
  /click here/i,
  /buy now/i,
  /limited offer/i,
  /act now/i,
  /make money/i,
  /work from home/i,
  /http[s]?:\/\//i, // Block URLs
  /www\./i,
  /@/i, // Block email addresses
  /\d{10,}/i, // Block long numbers (phone numbers, etc.)
]

export interface ModerationResult {
  isAllowed: boolean
  reason?: string
  flaggedWords?: string[]
}

/**
 * Check if message contains profanity
 */
function containsProfanity(message: string): { found: boolean; words: string[] } {
  const lowerMessage = message.toLowerCase()
  const foundWords: string[] = []
  
  for (const word of PROFANITY_LIST) {
    // Check for whole word matches (with word boundaries)
    const regex = new RegExp(`\\b${word}\\b`, 'i')
    if (regex.test(lowerMessage)) {
      foundWords.push(word)
    }
  }
  
  return { found: foundWords.length > 0, words: foundWords }
}

/**
 * Check if message contains negative/mean words
 */
function containsNegativeWords(message: string): { found: boolean; words: string[] } {
  const lowerMessage = message.toLowerCase()
  const foundWords: string[] = []
  
  for (const word of NEGATIVE_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'i')
    if (regex.test(lowerMessage)) {
      foundWords.push(word)
    }
  }
  
  return { found: foundWords.length > 0, words: foundWords }
}

/**
 * Check if message contains spam patterns
 */
function containsSpam(message: string): boolean {
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(message)) {
      return true
    }
  }
  return false
}

/**
 * Check for repetitive characters (e.g., "aaaaaaa", "!!!!!!")
 */
function hasExcessiveRepetition(message: string): boolean {
  // More than 5 of the same character in a row
  return /(.)\1{5,}/.test(message)
}

/**
 * Check if message is too short to be meaningful
 */
function isTooShort(message: string): boolean {
  const trimmed = message.trim()
  return trimmed.length < 10
}

/**
 * Check if message is all caps (yelling)
 */
function isAllCaps(message: string): boolean {
  const letters = message.replace(/[^a-zA-Z]/g, '')
  if (letters.length < 5) return false // Don't flag short messages
  return letters === letters.toUpperCase()
}

/**
 * Main moderation function
 */
export function moderateMessage(message: string): ModerationResult {
  const trimmed = message.trim()
  
  // Check length
  if (isTooShort(trimmed)) {
    return {
      isAllowed: false,
      reason: 'Message is too short. Please write something meaningful (at least 10 characters).'
    }
  }
  
  // Check profanity
  const profanityCheck = containsProfanity(trimmed)
  if (profanityCheck.found) {
    return {
      isAllowed: false,
      reason: 'Please keep it clean! This is a kindness wall 💕',
      flaggedWords: profanityCheck.words
    }
  }
  
  // Check negative words
  const negativeCheck = containsNegativeWords(trimmed)
  if (negativeCheck.found) {
    return {
      isAllowed: false,
      reason: 'Let\'s keep this space positive! Try writing something uplifting instead.',
      flaggedWords: negativeCheck.words
    }
  }
  
  // Check spam
  if (containsSpam(trimmed)) {
    return {
      isAllowed: false,
      reason: 'This looks like spam. Please share genuine kindness instead!'
    }
  }
  
  // Check excessive repetition
  if (hasExcessiveRepetition(trimmed)) {
    return {
      isAllowed: false,
      reason: 'Please write a thoughtful message without excessive repetition.'
    }
  }
  
  // Check all caps
  if (isAllCaps(trimmed)) {
    return {
      isAllowed: false,
      reason: 'No need to yell! Please use normal capitalization.'
    }
  }
  
  // All checks passed!
  return {
    isAllowed: true
  }
}

/**
 * Rate limiting helper (client-side)
 * Check if user has submitted recently
 */
export function checkRateLimit(): { allowed: boolean; waitTime?: number } {
  const COOLDOWN_MS = 60000 // 1 minute between submissions
  const lastSubmitKey = 'kindness-wall-last-submit'
  
  const lastSubmit = localStorage.getItem(lastSubmitKey)
  
  if (lastSubmit) {
    const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit, 10)
    
    if (timeSinceLastSubmit < COOLDOWN_MS) {
      const waitTime = Math.ceil((COOLDOWN_MS - timeSinceLastSubmit) / 1000)
      return {
        allowed: false,
        waitTime
      }
    }
  }
  
  return { allowed: true }
}

/**
 * Update last submit timestamp
 */
export function updateSubmitTimestamp(): void {
  localStorage.setItem('kindness-wall-last-submit', Date.now().toString())
}

/**
 * Check for duplicate message
 */
export function isDuplicate(message: string): boolean {
  const recentMessagesKey = 'kindness-wall-recent'
  const stored = localStorage.getItem(recentMessagesKey)
  
  if (!stored) return false
  
  try {
    const recentMessages: string[] = JSON.parse(stored)
    const normalized = message.trim().toLowerCase()
    
    return recentMessages.some(msg => msg.toLowerCase() === normalized)
  } catch {
    return false
  }
}

/**
 * Save message to recent list (for duplicate checking)
 */
export function saveToRecent(message: string): void {
  const recentMessagesKey = 'kindness-wall-recent'
  const MAX_RECENT = 10
  
  const stored = localStorage.getItem(recentMessagesKey)
  let recent: string[] = []
  
  if (stored) {
    try {
      recent = JSON.parse(stored)
    } catch {
      recent = []
    }
  }
  
  recent.unshift(message.trim())
  recent = recent.slice(0, MAX_RECENT) // Keep only last 10
  
  localStorage.setItem(recentMessagesKey, JSON.stringify(recent))
}

/**
 * Check if a message should be hidden (for display filtering)
 * More lenient than moderateMessage - just checks for obvious bad content
 */
export function shouldHideMessage(message: string): boolean {
  const lowerMessage = message.toLowerCase()
  
  // Check profanity
  const profanityCheck = containsProfanity(message)
  if (profanityCheck.found) return true
  
  // Check for severe negativity (death threats, self-harm, extreme hate)
  const severeNegative = [
    'kill', 'die', 'death', 'suicide', 'hurt yourself',
    'kys', 'end your life', 'harm yourself'
  ]
  
  for (const phrase of severeNegative) {
    if (lowerMessage.includes(phrase)) return true
  }
  
  // Check spam
  if (containsSpam(message)) return true
  
  return false
}

/**
 * Filter out inappropriate messages from an array
 */
export function filterMessages<T extends { message: string }>(
  messages: T[]
): T[] {
  return messages.filter(msg => !shouldHideMessage(msg.message))
}
