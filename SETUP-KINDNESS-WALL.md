# Wall of Kindness - Setup Guide

The Wall of Kindness feature has been implemented! Here's how to get it running:

## ✅ What's Been Done

- ✅ Created `PublicNotes` component with grid wall display
- ✅ Installed Supabase client library (`@supabase/supabase-js`)
- ✅ Created SQL migration script for the database table
- ✅ Integrated into the main page (already in the layout)
- ✅ Committed to Git (commit: 4844fbe)

## 🔧 Setup Steps

### 1. Create the Database Table in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/kmrzhzjjczudbwmgyegq)
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the entire contents of `supabase-migration.sql` from the project
5. Paste it into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. You should see: ✅ Success messages

This creates:
- `kindness_messages` table with proper schema
- Row Level Security policies (read/insert access for everyone)
- 8 starter messages to bootstrap the wall

### 2. Get Your Supabase API Credentials

1. In the Supabase Dashboard, go to **Settings** → **API** (left sidebar)
2. Find these two values:
   - **Project URL** (looks like: `https://kmrzhzjjczudbwmgyegq.supabase.co`)
   - **anon/public key** (long string under "Project API keys")

### 3. Set Up Environment Variables Locally

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://kmrzhzjjczudbwmgyegq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

Replace `your-actual-anon-key-here` with the real anon key from step 2.

### 4. Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and scroll to the "Wall of Kindness" section.

**Test checklist:**
- [ ] Page loads without errors
- [ ] You see 8 starter messages in a grid
- [ ] You can submit a new message
- [ ] After submitting, the wall refreshes showing your message
- [ ] "Load More Kindness" button works

### 5. Deploy to Vercel

#### Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/rudniais-projects)
2. Select the `aryana-dalal-tribute` project
3. Go to **Settings** → **Environment Variables**
4. Add two new variables:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://kmrzhzjjczudbwmgyegq.supabase.co`
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste the anon key)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

5. Click **Save**

#### Push and Deploy

```bash
git push origin main
```

Vercel will auto-deploy. Once deployed:
- Visit https://aryana-dalal-tribute.vercel.app
- Scroll to Wall of Kindness
- Test submitting a message!

## 🎨 Feature Details

**What it does:**
- Displays a grid of uplifting messages from visitors
- Anyone can read all messages
- Anyone can submit new messages (max 280 chars)
- Messages are stored globally in Supabase
- Real-time persistence across all visitors
- Soft editorial aesthetic matching the site design

**User experience:**
1. Visitor scrolls to "Wall of Kindness"
2. Sees a beautiful grid of kind messages
3. Can click "Load More Kindness" to refresh
4. Can submit their own uplifting message
5. After submitting, sees success confirmation
6. Their message appears on the wall for everyone

**Moderation:**
- Currently auto-approved (set `approved: true` in code)
- Can enable manual moderation later by:
  - Setting `approved: false` by default
  - Creating admin interface to approve messages
  - Adding more Row Level Security policies

## 🔍 Troubleshooting

**"Error loading messages" in console:**
- Check `.env.local` exists with correct values
- Verify Supabase credentials are correct
- Make sure SQL migration ran successfully

**Messages not persisting:**
- Check Supabase dashboard → Table Editor → `kindness_messages`
- Verify Row Level Security policies are enabled
- Check browser console for errors

**Vercel deployment errors:**
- Ensure environment variables are set in Vercel dashboard
- Check deployment logs for missing env var warnings

## 🚀 Optional Enhancements

Future improvements you could add:
- [ ] Moderation system (manual approval)
- [ ] Report button for inappropriate messages
- [ ] Character name/username field
- [ ] Like/heart counter per message
- [ ] Filter/sort options (newest, most liked)
- [ ] Pagination for loading more messages
- [ ] Real-time updates (Supabase Realtime subscriptions)

---

**Questions?** Just ask! The feature is fully coded and ready to go once you complete the setup steps above.
