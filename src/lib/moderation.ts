// Content moderation utilities for Wall of Kindness
// Top-quality insult filtering with multi-layer detection

// ═══════════════════════════════════════════════════
// LAYER 1: Character substitution normalizer
// ═══════════════════════════════════════════════════

const CHAR_MAP: Record<string, string> = {
  '@': 'a', '4': 'a', '^': 'a',
  '8': 'b',
  '(': 'c', '<': 'c',
  '3': 'e',
  '6': 'g', '9': 'g',
  '#': 'h',
  '!': 'i', '1': 'i', '|': 'i',
  '0': 'o',
  '5': 's', '$': 's',
  '7': 't', '+': 't',
  '2': 'z',
}

/** Normalize text: strip special chars, handle leet speak, remove separators */
function normalize(text: string): string {
  let result = text.toLowerCase()
  // Replace leet speak characters
  for (const [char, replacement] of Object.entries(CHAR_MAP)) {
    result = result.split(char).join(replacement)
  }
  // Remove common separator tricks: f.u.c.k, f_u_c_k, f-u-c-k, f u c k
  result = result.replace(/[\s._\-*~`']+/g, '')
  return result
}

// ═══════════════════════════════════════════════════
// LAYER 2: Comprehensive word lists
// ═══════════════════════════════════════════════════

// Severe profanity (hard block, no exceptions)
const SEVERE_PROFANITY = [
  'fuck', 'fucker', 'fucked', 'fucking', 'motherfucker', 'motherfucking',
  'shit', 'shitty', 'shitting', 'bullshit',
  'bitch', 'bitches', 'bitchy',
  'cunt', 'cunts',
  'cock', 'cocksucker',
  'dick', 'dickhead',
  'pussy', 'pussies',
  'ass', 'asshole', 'asswipe', 'arsehole', 'arse',
  'bastard', 'bastards',
  'whore', 'slut', 'slutty', 'hoe',
  'nigger', 'nigga', 'negro',
  'faggot', 'fag', 'faggy',
  'retard', 'retarded',
  'chutiya', 'bhenchod', 'bhosdike', 'madarchod', 'gaand', 'gandu',
  'randi', 'randi ka', 'lund', 'lauda', 'lavde', 'chut',
  'saala', 'saali', 'harami', 'haramkhor', 'kutta', 'kutti',
  'kamina', 'kameena', 'kameeni',
]

// Insults and name-calling
const INSULTS = [
  'ugly', 'fugly', 'hideous', 'disgusting', 'repulsive', 'grotesque',
  'fat', 'fatass', 'fatso', 'obese', 'whale', 'pig', 'cow',
  'loser', 'pathetic', 'worthless', 'useless', 'waste',
  'garbage', 'trash', 'filth', 'scum', 'vermin',
  'stupid', 'dumb', 'idiot', 'moron', 'imbecile', 'dimwit', 'brainless',
  'freak', 'weirdo', 'creep', 'creepy', 'psycho', 'nutjob', 'nutcase',
  'clown', 'joke', 'fraud', 'fake', 'phony',
  'coward', 'wimp', 'weakling', 'spineless',
  'narcissist', 'sociopath', 'toxic',
  'failure', 'nobody', 'nothing', 'irrelevant',
  'cringe', 'cringey', 'embarrassing', 'embarrassment',
  'desperate', 'needy', 'clingy', 'annoying', 'obnoxious',
  'talentless', 'untalented', 'mediocre',
  'overrated', 'overhyped', 'basic',
  'attention seeker', 'attentionwhore', 'clout chaser',
  'gold digger', 'golddigger',
  'simp', 'incel', 'neckbeard',
  'karen', 'boomer',
  'stfu', 'gtfo', 'kys',
]

// Threatening/violent language
const THREATS = [
  'kill', 'murder', 'stab', 'shoot', 'strangle', 'choke',
  'die', 'death', 'dead',
  'suicide', 'kys', 'end yourself', 'harm yourself', 'hurt yourself',
  'rape', 'molest', 'assault',
  'beat', 'punch', 'slap', 'smack', 'hit',
  'burn', 'destroy', 'ruin',
  'threat', 'threaten',
]

// Negative sentiment words (context-dependent, need compound check)
const NEGATIVE_SENTIMENT = [
  'hate', 'hating', 'hater', 'hated',
  'suck', 'sucks', 'sucked', 'suckish',
  'terrible', 'awful', 'horrible', 'horrendous', 'atrocious',
  'worst', 'worse',
  'boring', 'lame', 'dull',
  'annoying', 'irritating',
  'disappointing', 'disappointed',
  'overrated',
  'crappy', 'rubbish', 'crap',
  'piss', 'pissed',
  'damn', 'damned',
  'hell',
  'gross',
  'eww', 'ew', 'ewww', 'yuck',
]

// ═══════════════════════════════════════════════════
// LAYER 3: Phrase-based detection
// ═══════════════════════════════════════════════════

const NEGATIVE_PHRASES = [
  'i hate', 'we hate', 'everyone hates', 'nobody likes',
  'go away', 'get lost', 'leave us alone',
  'you suck', 'she sucks', 'he sucks', 'this sucks',
  'shut up', 'shut your', 'stfu',
  'go to hell', 'go die', 'drop dead',
  'not pretty', 'not beautiful', 'not talented', 'not good',
  'no one cares', 'nobody cares', 'who cares',
  'waste of', 'piece of',
  'you deserve', // often followed by negative
  'should quit', 'should stop',
  'not funny', 'not interesting',
  'attention seeking', 'attention seeker',
  'trying too hard', 'try hard',
  'pick me', 'pickme',
  'so bad', 'so ugly', 'so fake', 'so annoying',
  'look like', // "you look like a..."
  'smell like', 'smells like',
]

// ═══════════════════════════════════════════════════
// LAYER 4: Spam patterns
// ═══════════════════════════════════════════════════

const SPAM_PATTERNS = [
  /click here/i,
  /buy now/i,
  /limited offer/i,
  /act now/i,
  /make money/i,
  /work from home/i,
  /https?:\/\//i,
  /www\./i,
  /\.com\b/i,
  /\.in\b/i,
  /\.org\b/i,
  /@[a-z]+\.[a-z]/i, // emails
  /\d{10,}/i, // phone numbers
  /follow me/i,
  /check out my/i,
  /subscribe/i,
  /free gift/i,
  /congratulations/i,
  /you have won/i,
  /dm me/i,
  /whatsapp/i,
  /telegram/i,
]

// ═══════════════════════════════════════════════════
// LAYER 5: Regex evasion detection
// ═══════════════════════════════════════════════════

/** Detect words with intentional character insertion: f.u.c.k, f_u_c_k, etc */
function detectEvasion(text: string): string[] {
  const normalized = normalize(text)
  const flagged: string[] = []

  const allBadWords = [...SEVERE_PROFANITY, ...INSULTS.slice(0, 30), ...THREATS]

  for (const word of allBadWords) {
    if (normalized.includes(word.replace(/\s/g, ''))) {
      flagged.push(word)
    }
  }

  return flagged
}

// ═══════════════════════════════════════════════════
// LAYER 6: Repetition & gibberish detection
// ═══════════════════════════════════════════════════

function hasExcessiveRepetition(message: string): boolean {
  return /(.)\1{4,}/.test(message) // 5+ same char
}

function isGibberish(message: string): boolean {
  const letters = message.replace(/[^a-zA-Z\s]/g, '')
  if (letters.length < 5) return false
  // Check consonant clusters (no real word has 5+ consonants in a row)
  return /[^aeiou\s]{6,}/i.test(letters)
}

function isAllCaps(message: string): boolean {
  const letters = message.replace(/[^a-zA-Z]/g, '')
  if (letters.length < 8) return false
  return letters === letters.toUpperCase()
}

// ═══════════════════════════════════════════════════
// LAYER 7: Contextual sentiment scoring
// ═══════════════════════════════════════════════════

/** Score message sentiment: negative score = bad, positive = good */
function sentimentScore(message: string): number {
  const lower = message.toLowerCase()
  let score = 0

  // Positive indicators
  const positives = [
    'love', 'beautiful', 'amazing', 'wonderful', 'awesome', 'great',
    'kind', 'sweet', 'cute', 'lovely', 'incredible', 'fantastic',
    'best', 'happy', 'joy', 'smile', 'inspire', 'inspiring',
    'proud', 'talented', 'brilliant', 'stunning', 'gorgeous',
    'thank', 'thanks', 'grateful', 'appreciate', 'blessed',
    'queen', 'legend', 'icon', 'goals', 'superstar',
    'keep going', 'keep it up', 'keep shining', 'keep smiling',
    'you rock', 'you are', "you're amazing", "you're beautiful",
    'well done', 'good job', 'bravo',
    '❤', '💕', '💖', '✨', '🌟', '💪', '🥰', '😍', '💗', '🫶',
  ]

  for (const word of positives) {
    if (lower.includes(word)) score += 2
  }

  // Negative indicators
  for (const word of NEGATIVE_SENTIMENT) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(lower)) score -= 3
  }

  for (const phrase of NEGATIVE_PHRASES) {
    if (lower.includes(phrase)) score -= 5
  }

  return score
}

// ═══════════════════════════════════════════════════
// MAIN MODERATION API
// ═══════════════════════════════════════════════════

export interface ModerationResult {
  isAllowed: boolean
  reason?: string
  flaggedWords?: string[]
  severity?: 'low' | 'medium' | 'high'
}

export function moderateMessage(message: string): ModerationResult {
  const trimmed = message.trim()
  const lower = trimmed.toLowerCase()
  const normalized = normalize(trimmed)

  // --- Length checks ---
  if (trimmed.length < 10) {
    return {
      isAllowed: false,
      reason: 'Message is too short. Please write something meaningful (at least 10 characters).',
      severity: 'low',
    }
  }

  if (trimmed.length > 280) {
    return {
      isAllowed: false,
      reason: 'Message is too long. Please keep it under 280 characters.',
      severity: 'low',
    }
  }

  // --- Severe profanity (normalized) ---
  for (const word of SEVERE_PROFANITY) {
    const clean = word.replace(/\s/g, '')
    if (normalized.includes(clean)) {
      return {
        isAllowed: false,
        reason: 'Please keep it clean! This is a kindness wall 💕',
        flaggedWords: [word],
        severity: 'high',
      }
    }
  }

  // --- Threats ---
  for (const word of THREATS) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(lower)) {
      return {
        isAllowed: false,
        reason: 'This message contains threatening language. Let\'s keep this space safe.',
        flaggedWords: [word],
        severity: 'high',
      }
    }
  }

  // --- Insults (normalized check for evasion) ---
  for (const word of INSULTS) {
    const clean = word.replace(/\s/g, '')
    if (normalized.includes(clean)) {
      return {
        isAllowed: false,
        reason: 'Let\'s keep this space positive! Try writing something uplifting instead. ✨',
        flaggedWords: [word],
        severity: 'medium',
      }
    }
  }

  // --- Evasion detection (catches creative spellings) ---
  const evaded = detectEvasion(trimmed)
  if (evaded.length > 0) {
    return {
      isAllowed: false,
      reason: 'Nice try! But let\'s keep it kind 😊',
      flaggedWords: evaded,
      severity: 'medium',
    }
  }

  // --- Negative phrases ---
  for (const phrase of NEGATIVE_PHRASES) {
    if (lower.includes(phrase)) {
      return {
        isAllowed: false,
        reason: 'This doesn\'t sound very kind. Try spreading positivity instead! 💖',
        flaggedWords: [phrase],
        severity: 'medium',
      }
    }
  }

  // --- Spam ---
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        isAllowed: false,
        reason: 'This looks like spam. Please share genuine kindness instead!',
        severity: 'low',
      }
    }
  }

  // --- Repetition / gibberish ---
  if (hasExcessiveRepetition(trimmed)) {
    return {
      isAllowed: false,
      reason: 'Please write a thoughtful message without excessive repetition.',
      severity: 'low',
    }
  }

  if (isGibberish(trimmed)) {
    return {
      isAllowed: false,
      reason: 'That doesn\'t look like a real message. Try writing something meaningful!',
      severity: 'low',
    }
  }

  if (isAllCaps(trimmed)) {
    return {
      isAllowed: false,
      reason: 'No need to yell! Please use normal capitalization.',
      severity: 'low',
    }
  }

  // --- Sentiment check (catch subtle negativity) ---
  const sentiment = sentimentScore(trimmed)
  if (sentiment <= -6) {
    return {
      isAllowed: false,
      reason: 'This message seems negative. The kindness wall is for uplifting messages only! 🌸',
      severity: 'medium',
    }
  }

  // All checks passed!
  return { isAllowed: true }
}

// ═══════════════════════════════════════════════════
// RATE LIMITING & DUPLICATE DETECTION
// ═══════════════════════════════════════════════════

export function checkRateLimit(): { allowed: boolean; waitTime?: number } {
  const COOLDOWN_MS = 60000
  const lastSubmitKey = 'kindness-wall-last-submit'
  const lastSubmit = localStorage.getItem(lastSubmitKey)

  if (lastSubmit) {
    const elapsed = Date.now() - parseInt(lastSubmit, 10)
    if (elapsed < COOLDOWN_MS) {
      return { allowed: false, waitTime: Math.ceil((COOLDOWN_MS - elapsed) / 1000) }
    }
  }
  return { allowed: true }
}

export function updateSubmitTimestamp(): void {
  localStorage.setItem('kindness-wall-last-submit', Date.now().toString())
}

export function isDuplicate(message: string): boolean {
  const stored = localStorage.getItem('kindness-wall-recent')
  if (!stored) return false
  try {
    const recent: string[] = JSON.parse(stored)
    return recent.some(m => m.toLowerCase() === message.trim().toLowerCase())
  } catch {
    return false
  }
}

export function saveToRecent(message: string): void {
  const key = 'kindness-wall-recent'
  let recent: string[] = []
  try {
    recent = JSON.parse(localStorage.getItem(key) || '[]')
  } catch { /* ignore */ }
  recent.unshift(message.trim())
  recent = recent.slice(0, 10)
  localStorage.setItem(key, JSON.stringify(recent))
}

// ═══════════════════════════════════════════════════
// DISPLAY FILTERING (for messages already in DB)
// ═══════════════════════════════════════════════════

export function shouldHideMessage(message: string): boolean {
  const normalized = normalize(message)

  for (const word of SEVERE_PROFANITY) {
    if (normalized.includes(word.replace(/\s/g, ''))) return true
  }

  for (const word of THREATS) {
    if (normalized.includes(word.replace(/\s/g, ''))) return true
  }

  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(message)) return true
  }

  return false
}

export function filterMessages<T extends { message: string }>(messages: T[]): T[] {
  return messages.filter(msg => !shouldHideMessage(msg.message))
}
