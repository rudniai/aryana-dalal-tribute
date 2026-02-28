-- Kindness Messages Table for Wall of Kindness feature
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS kindness_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL CHECK (char_length(message) <= 280),
  approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_kindness_messages_approved_created 
ON kindness_messages(approved, created_at DESC);

-- Enable Row Level Security
ALTER TABLE kindness_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved messages
CREATE POLICY "Public read access for approved messages"
ON kindness_messages
FOR SELECT
USING (approved = true);

-- Policy: Anyone can insert messages (auto-approved)
CREATE POLICY "Public insert access"
ON kindness_messages
FOR INSERT
WITH CHECK (true);

-- Add some starter messages to bootstrap the wall
INSERT INTO kindness_messages (message, approved) VALUES
  ('You''re exactly where you need to be right now ✨', true),
  ('Your smile could light up Bombay!', true),
  ('You deserve all the good things coming your way 💕', true),
  ('You''re doing better than you think you are', true),
  ('The world is better with you in it', true),
  ('Your kindness is a superpower', true),
  ('You''re giving main character energy today!', true),
  ('Bombay is lucky to have you', true);
