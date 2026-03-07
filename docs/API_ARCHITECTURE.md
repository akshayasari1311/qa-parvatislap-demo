# Google Reviews API Architecture

## Why We Use a Proxy Pattern

### ❌ WRONG (Insecure - Direct API Call from Browser)

```
Browser (Frontend)
    ↓ fetch('https://places.googleapis.com/v1/places/...')
    ↓ API KEY IS EXPOSED IN BROWSER! 🔓
Google Places API
```

**Problems:**
- API key visible in browser DevTools
- Anyone can steal your API key
- Malicious users can abuse your API quota
- You get charged for their requests

---

### ✅ CORRECT (Secure - Proxy Pattern)

```
Browser (Frontend)
    ↓ fetch('/api/reviews')
    ↓ NO API KEY! Just calls your server
Your Next.js API Route (/api/reviews)
    ↓ fetch('https://places.googleapis.com/v1/places/...')
    ↓ API KEY SECURE ON SERVER! 🔒
Google Places API
```

**Benefits:**
- API key never leaves the server
- Can add caching to reduce API calls
- Can add rate limiting
- Can add authentication (if needed)
- Full control over data format

---

## Current Implementation

### 1. **Frontend Code** (Reviews.tsx)
```typescript
// Calls YOUR API (not Google's)
const { reviews, loading, error } = useGoogleReviews();
```

### 2. **Custom Hook** (useGoogleReviews.ts)
```typescript
// Calls your local API route
fetch("/api/reviews")
```

### 3. **API Route** (src/app/api/reviews/route.ts)
```typescript
// THIS is where Google API is called
const endpoint = `https://places.googleapis.com/v1/places/${placeId}?fields=${fields}&key=${apiKey}`;
fetch(endpoint) // API key is safe on server
```

---

## What Changed

### Before (Missing Fields)
```typescript
const fields = "reviews"; // ❌ Too minimal
```

### After (Complete Fields) ✅
```typescript
const fields = "displayName,googleMapsUri,rating,userRatingCount,reviews.rating,reviews.text,reviews.publishTime,reviews.authorAttribution";
```

Now includes:
- ✅ `displayName` - Place name
- ✅ `googleMapsUri` - Google Maps link
- ✅ `rating` - Overall rating
- ✅ `userRatingCount` - Total review count
- ✅ `reviews.rating` - Individual review rating
- ✅ `reviews.text` - Review content
- ✅ `reviews.publishTime` - When review was posted
- ✅ `reviews.authorAttribution` - Reviewer name

---

## Testing the API

### Test Your API Route Directly

Open your browser to:
```
http://localhost:3000/api/reviews
```

You should see JSON response with Google reviews.

### Test with cURL

```bash
curl http://localhost:3000/api/reviews
```

**Note:** You're testing YOUR API, not Google's API directly. This is correct!

---

## How Data Flows

```
1. User opens website
   ↓
2. Reviews.tsx component loads
   ↓
3. useGoogleReviews() hook runs
   ↓
4. Hook calls: fetch("/api/reviews")
   ↓
5. Your API route (route.ts) receives the request
   ↓
6. API route calls Google Places API with secure API key
   ↓
7. Google returns reviews
   ↓
8. API route formats the data
   ↓
9. Hook receives formatted reviews
   ↓
10. Component displays reviews
```

---

## Security Best Practices

### ✅ DO:
- Keep API keys in `.env.local` (server-side)
- Use API routes to proxy external API calls
- Add `.env.local` to `.gitignore`
- Restart dev server after changing `.env.local`

### ❌ DON'T:
- Put API keys in frontend code
- Commit `.env.local` to git
- Call Google API directly from browser
- Share API keys publicly

---

## Why You See `/api/reviews` in Network Tab

When you open DevTools → Network tab, you'll see:

```
Request URL: http://localhost:3000/api/reviews
```

**This is CORRECT!** ✅

You will NOT see:
```
Request URL: https://places.googleapis.com/...
```

Because that call happens on your server (invisible to browser).

---

## Environment Variables

Your `.env.local` file:
```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyCixlceFxf51uZacLBSLDLNyx8PrRPWW64
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJNdY7De9dBDkRFumunlxY6E8
```

**Note:** Even though these have `NEXT_PUBLIC_` prefix, they are ONLY used in the API route (server-side), not in browser code.

---

## Troubleshooting

### "I see fallback reviews, not Google reviews"

Check in order:
1. ✅ `.env.local` exists in `parvatislap-next/` folder
2. ✅ Dev server was restarted after creating `.env.local`
3. ✅ Check browser console for error logs
4. ✅ Check server terminal for error logs
5. ✅ Test API directly: `http://localhost:3000/api/reviews`

### "How do I know if it's working?"

**Working:**
- Real Google user names appear
- Shows relative time (e.g., "2 months ago")
- Number of reviews may vary

**Not working:**
- Shows fictional names (Rahul S., Anya V., etc.)
- Always exactly 5 reviews
- "Showing cached reviews" message

---

## Summary

**Question:** Why call `/api/reviews` instead of Google API directly?

**Answer:** Security! The proxy pattern keeps your API key safe on the server. Your frontend calls YOUR API, which then calls Google's API with the secure key. This is industry-standard best practice.

Your current implementation is **CORRECT** ✅




