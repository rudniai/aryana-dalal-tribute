# Wall of Kindness - Mobile Setup (5 Minutes)

Do this from your phone browser. Each step has direct links.

---

## Step 1: Run SQL Migration (2 min)

**[→ CLICK HERE: Open Supabase SQL Editor](https://supabase.com/dashboard/project/kmrzhzjjczudbwmgyegq/sql/new)**

Once opened:

1. **Copy the SQL below** (tap to select all, then copy):

```sql
CREATE TABLE IF NOT EXISTS kindness_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL CHECK (char_length(message) <= 280),
  approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_kindness_messages_approved_created 
ON kindness_messages(approved, created_at DESC);

ALTER TABLE kindness_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for approved messages"
ON kindness_messages FOR SELECT USING (approved = true);

CREATE POLICY "Public insert access"
ON kindness_messages FOR INSERT WITH CHECK (true);

INSERT INTO kindness_messages (message, approved) VALUES
  ('You''re exactly where you need to be right now ✨', true),
  ('Your smile could light up Bombay!', true),
  ('You deserve all the good things coming your way 💕', true),
  ('You''re doing better than you think you are', true),
  ('The world is better with you in it', true),
  ('Your kindness is a superpower', true),
  ('You''re giving main character energy today!', true),
  ('Bombay is lucky to have you', true);
```

2. **Paste** into the SQL Editor
3. **Tap "Run"** (or RUN button)
4. You should see: ✅ Success

---

## Step 2: Get Supabase Credentials (1 min)

**[→ CLICK HERE: Open Supabase API Settings](https://supabase.com/dashboard/project/kmrzhzjjczudbwmgyegq/settings/api)**

You need TWO values:

### A) Project URL
- Look for: **Project URL**
- Should be: `https://kmrzhzjjczudbwmgyegq.supabase.co`
- **Copy this** (you'll paste it in Step 3)

### B) Anon Key
- Scroll down to: **Project API keys**
- Find: **anon** / **public**
- It's a long string starting with `eyJ...`
- **Copy this** (you'll paste it in Step 3)

---

## Step 3: Add to Vercel (2 min)

**[→ CLICK HERE: Open Vercel Project Settings](https://vercel.com/rudniais-projects/aryana-dalal-tribute/settings/environment-variables)**

Add **TWO** environment variables:

### Variable 1:
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://kmrzhzjjczudbwmgyegq.supabase.co`
- **Environments**: ✅ Production ✅ Preview ✅ Development
- **Tap "Save"**

### Variable 2:
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: (paste the long `eyJ...` key you copied)
- **Environments**: ✅ Production ✅ Preview ✅ Development
- **Tap "Save"**

---

## Step 4: Redeploy (30 sec)

**[→ CLICK HERE: Open Vercel Deployments](https://vercel.com/rudniais-projects/aryana-dalal-tribute)**

1. Find the latest deployment (top of list)
2. Tap the **⋯** menu (three dots)
3. Tap **"Redeploy"**
4. Confirm

Wait ~1 minute for deployment to complete.

---

## ✅ Test It!

**[→ OPEN LIVE SITE](https://aryana-dalal-tribute.vercel.app)**

1. Scroll to **"Wall of Kindness"** section
2. You should see 8 starter messages
3. Try submitting a test message
4. It should appear on the wall!

---

## 🆘 Troubleshooting

**If SQL gives an error:**
- Make sure you're logged into Supabase
- Try the link again: https://supabase.com/dashboard/project/kmrzhzjjczudbwmgyegq/sql/new

**If you can't find the anon key:**
- Go to: Settings → API
- Look under "Project API keys"
- Copy the one labeled "anon" or "public" (NOT "service_role")

**If Vercel deployment fails:**
- Check that both env vars were saved
- Try redeploying again

---

**Done!** The Wall of Kindness is now live 🎉
