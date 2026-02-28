import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-side only, bypasses RLS
)

// ─── OpenAI Moderation Check ────────────────────────────────
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

// ─── Server-side word filter (backup) ───────────────────────
const BAD_WORDS = [
  // English
  'fuck', 'shit', 'bitch', 'cunt', 'ass', 'asshole', 'dick', 'cock', 'pussy',
  'whore', 'slut', 'bastard', 'nigger', 'nigga', 'faggot', 'fag', 'retard',
  // Hindi
  'chutiya', 'bhenchod', 'bhosdike', 'madarchod', 'gaand', 'gandu',
  'randi', 'lund', 'lauda', 'lavde', 'chut', 'saala', 'harami',
  'kamina', 'kameena', 'kutti', 'kutta',
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

    // Layer 2: OpenAI Moderation API (multilingual, catches Hindi/Hinglish)
    const moderation = await checkOpenAIModeration(trimmed)
    if (moderation.flagged) {
      console.log(`Message blocked by AI: "${trimmed}" [${moderation.categories.join(', ')}]`)
      return NextResponse.json(
        { error: "Let's keep this space positive! Try writing something uplifting instead. ✨" },
        { status: 400 }
      )
    }

    // All checks passed — insert into DB
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
