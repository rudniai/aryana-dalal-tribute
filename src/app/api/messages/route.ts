import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-side only, bypasses RLS
)

// ─── OpenAI Moderation Check (free endpoint) ────────────────
async function checkOpenAIModeration(message: string): Promise<{
  flagged: boolean
  categories: string[]
}> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.warn('OPENAI_API_KEY not set, skipping AI moderation')
    return { flagged: false, categories: [] }
  }

  try {
    const res = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: message }),
    })

    if (!res.ok) {
      console.error('OpenAI moderation API error:', res.status)
      return { flagged: false, categories: [] }
    }

    const data = await res.json()
    const result = data.results?.[0]

    if (!result) return { flagged: false, categories: [] }

    const flaggedCategories = Object.entries(result.categories)
      .filter(([, flagged]) => flagged)
      .map(([category]) => category)

    return {
      flagged: result.flagged,
      categories: flaggedCategories,
    }
  } catch (error) {
    console.error('OpenAI moderation error:', error)
    return { flagged: false, categories: [] }
  }
}

// ─── LLM Kindness Check (catches ALL languages including Devanagari) ──
async function checkWithLLM(message: string): Promise<{
  flagged: boolean
  reason: string
}> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return { flagged: false, reason: '' }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a content moderator for a "Wall of Kindness" — a public message board meant ONLY for uplifting, positive, kind messages.

Your job: Determine if a message is appropriate for this wall.

BLOCK messages that contain:
- Profanity, slurs, or insults in ANY language (English, Hindi, Hinglish, Devanagari, Urdu, etc.)
- Threats, violence, or harassment
- Sexual content or innuendo
- Negativity, sarcasm, or mean-spirited comments
- Spam, links, or self-promotion
- Gibberish or meaningless text

ALLOW messages that are:
- Genuinely kind, uplifting, or encouraging
- Compliments or positive affirmations
- Wholesome and appropriate for all ages

Respond with ONLY valid JSON: {"allowed": true} or {"allowed": false, "reason": "brief reason"}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0,
        max_tokens: 50,
      }),
    })

    if (!res.ok) {
      console.error('LLM moderation error:', res.status)
      return { flagged: false, reason: '' }
    }

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content?.trim() || ''
    
    try {
      const result = JSON.parse(content)
      if (result.allowed === false) {
        return { flagged: true, reason: result.reason || 'Not appropriate for kindness wall' }
      }
    } catch {
      // If JSON parsing fails, check if response contains "false"
      if (content.toLowerCase().includes('"allowed": false') || content.toLowerCase().includes('"allowed":false')) {
        return { flagged: true, reason: 'Not appropriate for kindness wall' }
      }
    }

    return { flagged: false, reason: '' }
  } catch (error) {
    console.error('LLM moderation error:', error)
    return { flagged: false, reason: '' }
  }
}

// ─── Server-side word filter (backup) ───────────────────────
const BAD_WORDS = [
  // English
  'fuck', 'shit', 'bitch', 'cunt', 'ass', 'asshole', 'dick', 'cock', 'pussy',
  'whore', 'slut', 'bastard', 'nigger', 'nigga', 'faggot', 'fag', 'retard',
  // Hindi (all spelling variations)
  'chutiya', 'chutiye', 'chutia', 'chod', 'chodu',
  'bhenchod', 'benchod', 'bc', 'bhosdike', 'bhosdiwale', 'bhosdi',
  'madarchod', 'mc', 'maderchod',
  'gaand', 'gand', 'gaand', 'gandu', 'ganду',
  'randi', 'rand', 'randwa', 'randwe',
  'lund', 'lodu', 'lode', 'laude', 'lauda', 'lavde', 'lavda', 'lawde', 'lawda',
  'chut', 'choot',
  'saala', 'saale', 'sala', 'sale',
  'harami', 'haramkhor', 'haram',
  'kamina', 'kameena', 'kameene', 'kamine',
  'kutti', 'kutta', 'kutiya', 'kuttiya',
  'jhatu', 'jhantu', 'ullu', 'gadha', 'bakchod', 'bakchodi',
  'tatti', 'tatte', 'jhant', 'bsdk', 'bkl',
  'marao', 'choos', 'chusamba',
  // Common evasions
  'stfu', 'gtfo', 'kys',
]

function serverWordFilter(message: string): boolean {
  const normalized = message.toLowerCase()
    .replace(/[@4^]/g, 'a')
    .replace(/[3]/g, 'e')
    .replace(/[!1|]/g, 'i')
    .replace(/[0]/g, 'o')
    .replace(/[5$]/g, 's')
    .replace(/[\s._\-*~`']+/g, '')

  return BAD_WORDS.some(word => normalized.includes(word))
}

// ─── POST /api/messages ─────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const trimmed = message.trim()

    // Length checks
    if (trimmed.length < 10) {
      return NextResponse.json(
        { error: 'Message is too short. Please write something meaningful (at least 10 characters).' },
        { status: 400 }
      )
    }
    if (trimmed.length > 280) {
      return NextResponse.json(
        { error: 'Message is too long. Please keep it under 280 characters.' },
        { status: 400 }
      )
    }

    // Layer 1: Server-side word filter (instant)
    if (serverWordFilter(trimmed)) {
      return NextResponse.json(
        { error: 'Please keep it clean! This is a kindness wall 💕' },
        { status: 400 }
      )
    }

    // Layer 2: OpenAI Moderation API (free, catches obvious stuff)
    const moderation = await checkOpenAIModeration(trimmed)
    if (moderation.flagged) {
      console.log(`Message blocked by moderation API: "${trimmed}" [${moderation.categories.join(', ')}]`)
      return NextResponse.json(
        { error: "Let's keep this space positive! Try writing something uplifting instead. ✨" },
        { status: 400 }
      )
    }

    // Layer 3: LLM Kindness Check (understands ALL languages, context, intent)
    const llmCheck = await checkWithLLM(trimmed)
    if (llmCheck.flagged) {
      console.log(`Message blocked by LLM: "${trimmed}" [${llmCheck.reason}]`)
      return NextResponse.json(
        { error: "This doesn't feel like a kind message. Try spreading some love instead! 💖" },
        { status: 400 }
      )
    }

    // All 3 layers passed — insert into DB
    const { data, error } = await supabase
      .from('kindness_messages')
      .insert({ message: trimmed, approved: true })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save message. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
