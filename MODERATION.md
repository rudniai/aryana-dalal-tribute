# Wall of Kindness - Content Moderation

The Wall of Kindness now has comprehensive content moderation to keep the space safe, positive, and spam-free.

## Features

### 1. Profanity Filter
Blocks common profanity and variations:
- Common swear words
- Variations with symbols (e.g., `f*ck`, `sh*t`, `a$$`)
- Phonetic spellings (e.g., `fuk`, `fck`)
- Uses word-boundary matching to avoid false positives

### 2. Negativity Detection
Blocks mean, hurtful, or negative content:
- Insults (ugly, loser, pathetic, etc.)
- Hate speech
- Self-harm references
- Generally negative words (stupid, hate, terrible, etc.)

### 3. Spam Filtering
Automatically rejects spam patterns:
- URLs (http://, https://, www.)
- Email addresses (anything with @)
- Phone numbers (10+ digit sequences)
- Common spam phrases ("click here", "buy now", "limited offer", etc.)

### 4. Rate Limiting
Client-side rate limiting to prevent spam:
- **1 minute cooldown** between submissions
- Shows countdown timer when user tries to submit too quickly
- Stored in localStorage (persists across page refreshes)

### 5. Duplicate Detection
Prevents the same message from being posted multiple times:
- Checks against last 10 submitted messages
- Case-insensitive comparison
- Stored locally in browser

### 6. Content Quality Checks
Ensures meaningful contributions:
- **Minimum length:** 10 characters
- **No excessive repetition:** Blocks messages with 5+ repeated characters
- **No all caps:** Blocks "yelling" messages (except very short ones)

## User Experience

### Error Messages
Users get clear, friendly feedback when content is rejected:
- ✅ "Please keep it clean! This is a kindness wall 💕" (profanity)
- ✅ "Let's keep this space positive! Try writing something uplifting instead." (negativity)
- ✅ "This looks like spam. Please share genuine kindness instead!" (spam)
- ✅ "Please wait X seconds before submitting again." (rate limit)
- ✅ "This message was already submitted recently. Try writing something new!" (duplicate)

### Visual Feedback
- Error messages appear in a red box with an alert icon
- Success messages appear in a peach box with a heart icon
- Errors auto-clear when user starts typing
- Submit button disabled while submitting

## Technical Implementation

### Client-Side Validation
All moderation happens **client-side** before submission:
- Fast feedback (no server roundtrip)
- Saves database writes for rejected content
- Uses localStorage for rate limiting and duplicate detection

### Moderation Library
`src/lib/moderation.ts` exports these functions:

```typescript
// Main validation function
moderateMessage(message: string): ModerationResult

// Rate limiting
checkRateLimit(): { allowed: boolean; waitTime?: number }
updateSubmitTimestamp(): void

// Duplicate detection
isDuplicate(message: string): boolean
saveToRecent(message: string): void
```

### Component Integration
`PublicNotes.tsx` integrates moderation in `handleSubmit`:
1. Check rate limit → show countdown if blocked
2. Check for duplicate → reject if found
3. Run content moderation → reject if inappropriate
4. If all checks pass → submit to Supabase

## Future Enhancements

Potential improvements you could add:

### Server-Side Validation
- Create a Supabase Edge Function for backend validation
- Double-check all submissions server-side
- More robust against client-side bypasses

### AI-Powered Moderation
- Integrate OpenAI Moderation API
- Sentiment analysis to detect subtle negativity
- Context-aware filtering

### Admin Dashboard
- Manual review queue for flagged messages
- Ability to delete inappropriate messages
- Ban list for repeat offenders

### Customizable Word Lists
- Allow adding custom blocked words
- Category-based filtering (profanity, spam, etc.)
- Whitelist for allowed variations

### Analytics
- Track moderation stats (rejection rate, common flags)
- Monitor false positives/negatives
- Improve filters based on patterns

## Configuration

### Adjust Rate Limit
Edit `COOLDOWN_MS` in `src/lib/moderation.ts`:
```typescript
const COOLDOWN_MS = 60000 // 1 minute (default)
const COOLDOWN_MS = 300000 // 5 minutes (stricter)
const COOLDOWN_MS = 30000 // 30 seconds (looser)
```

### Adjust Minimum Length
Edit `isTooShort` function:
```typescript
return trimmed.length < 10 // Current minimum
return trimmed.length < 20 // Require longer messages
```

### Add Custom Blocked Words
Edit `PROFANITY_LIST` or `NEGATIVE_WORDS` arrays:
```typescript
const PROFANITY_LIST = [
  'word1', 'word2', 'word3',
  // Add your own here
]
```

### Disable Specific Checks
Comment out checks in `moderateMessage()`:
```typescript
// Skip all-caps check
// if (isAllCaps(trimmed)) {
//   return { isAllowed: false, reason: '...' }
// }
```

## Testing

To test the moderation system:

1. **Try profanity:** Type a bad word → should be rejected
2. **Try negativity:** Write "you're ugly" → should be rejected
3. **Try spam:** Include a URL → should be rejected
4. **Try rate limit:** Submit a message, then try again immediately → should show countdown
5. **Try duplicate:** Submit the same message twice → second attempt blocked
6. **Try short message:** Type "hi" → should ask for longer message
7. **Try valid message:** "You're amazing!" → should post successfully

## Maintenance

### Regular Updates
- Monitor user reports for missed patterns
- Update word lists quarterly
- Review false positives and adjust filters
- Keep spam patterns current

### Balance
Finding the right balance between safety and usability:
- ✅ Block obvious bad content
- ✅ Provide helpful error messages
- ✅ Don't block harmless variations
- ⚠️ Avoid over-filtering (false positives)

---

**Result:** The Wall of Kindness stays kind, positive, and spam-free! 💕
