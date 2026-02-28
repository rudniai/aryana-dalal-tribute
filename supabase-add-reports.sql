-- Add reporting functionality for inappropriate messages
-- Run this in Supabase SQL Editor after the main migration

-- Create reports table
CREATE TABLE IF NOT EXISTS message_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES kindness_messages(id) ON DELETE CASCADE,
  report_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(message_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_message_reports_message_id 
ON message_reports(message_id);

-- Enable RLS
ALTER TABLE message_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read reports (for displaying report counts)
CREATE POLICY "Public read access for reports"
ON message_reports FOR SELECT USING (true);

-- Function to increment report count or create new report
CREATE OR REPLACE FUNCTION report_message(msg_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO message_reports (message_id, report_count)
  VALUES (msg_id, 1)
  ON CONFLICT (message_id) 
  DO UPDATE SET 
    report_count = message_reports.report_count + 1,
    updated_at = TIMEZONE('utc', NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-hide messages with 3+ reports
-- Add a trigger to update the approved status
CREATE OR REPLACE FUNCTION auto_hide_reported_messages()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.report_count >= 3 THEN
    UPDATE kindness_messages
    SET approved = false
    WHERE id = NEW.message_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_hide_reported
AFTER INSERT OR UPDATE ON message_reports
FOR EACH ROW
EXECUTE FUNCTION auto_hide_reported_messages();
