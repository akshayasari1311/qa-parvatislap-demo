# Troubleshooting Google Reviews API

## Quick Steps to Debug

### 1. Check Browser Console Logs

After restarting your dev server, check the browser console. You should see logs like:

```
[useGoogleReviews] Fetching reviews from API...
[useGoogleReviews] Response status: 200
[useGoogleReviews] Received 5 reviews
[useGoogleReviews] Setting reviews: [...]
```

### 2. Check Server Console Logs

In your terminal where `npm run dev` is running, you should see:

```
[API Route] API Key exists: true
[API Route] Place ID: ChIJNdY7De9dBDkRFumunlxY6E8
[API Route] Calling Google Places API...
[API Route] Response status: 200
[API Route] Successfully fetched X reviews
[API Route] Returning X mapped reviews
```

### 3. Common Issues & Solutions

#### Issue: "API configuration missing"
**Server logs show:**
```
[API Route] API Key exists: false
[API Route] Missing API key or Place ID
```

**Solution:**
1. Create `.env.local` file in the project root (parvatislap-next/)
2. Add these lines:
```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyCixlceFxf51uZacLBSLDLNyx8PrRPWW64
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJNdY7De9dBDkRFumunlxY6E8
```
3. **IMPORTANT:** Restart your dev server (`npm run dev`)

---

#### Issue: 401 Unauthorized or 403 Forbidden
**Server logs show:**
```
[API Route] Response status: 401
[API Route] Google Places API error: {...}
```

**Solution:**
- Check if the API key is correct
- Go to [Google Cloud Console](https://console.cloud.google.com/apis/dashboard)
- Verify "Places API (New)" is **ENABLED**
- Check API key restrictions (if any) allow your localhost

---

#### Issue: 404 Not Found
**Server logs show:**
```
[API Route] Response status: 404
```

**Solution:**
- The Place ID might be incorrect
- Verify the Place ID using [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
- Search for "Parvati's Lap Kasol" and copy the correct Place ID

---

#### Issue: "No reviews found"
**Server logs show:**
```
[API Route] Response status: 200
[API Route] Received data: {...}
[API Route] No reviews found in response
```

**Solution:**
- The place might not have any Google reviews yet
- Check the place on Google Maps to confirm reviews exist
- The API might need different permissions (check Google Cloud Console)

---

## Manual API Test

You can test the API endpoint directly in your browser:

1. Start your dev server: `npm run dev`
2. Open: `http://localhost:3000/api/reviews`
3. You should see JSON response with reviews

If you see an error, the browser will show the error message.

---

## Environment Variables Checklist

✅ **File Location:** `parvatislap-next/.env.local` (in project root, NOT in src/)

✅ **File Contents:**
```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyCixlceFxf51uZacLBSLDLNyx8PrRPWW64
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJNdY7De9dBDkRFumunlxY6E8
```

✅ **Action Required:** Restart dev server after creating/updating `.env.local`

---

## Google Cloud Console Setup

### Enable Places API (New)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one)
3. Navigate to: **APIs & Services → Library**
4. Search for: **"Places API (New)"**
5. Click **ENABLE**

### Create/Check API Key

1. Go to: **APIs & Services → Credentials**
2. Click **+ CREATE CREDENTIALS → API Key**
3. Copy the API key
4. (Optional) Click **RESTRICT KEY** to add security:
   - **Application restrictions:** HTTP referrers
   - Add: `http://localhost:3000/*`
   - **API restrictions:** Restrict key → Select "Places API (New)"
   - Click **SAVE**

---

## Testing the Full Flow

1. **Create `.env.local`** with the credentials above
2. **Restart dev server:** Stop (`Ctrl+C`) and run `npm run dev` again
3. **Open browser:** `http://localhost:3000`
4. **Navigate to Reviews section**
5. **Check console logs** (Browser Developer Tools → Console)
6. **Check server logs** (Terminal where dev server is running)

You should see:
- Loading spinner briefly
- Google reviews appear (not the fallback reviews)
- No error message under the "REVIEWS" heading

---

## How to Know if It's Working

### ✅ Working (Google Reviews)
- Reviews have **real Google user names**
- Reviews show **relative time** (e.g., "2 months ago")
- Number of reviews may vary
- No "Showing cached reviews" message

### ❌ Not Working (Fallback Reviews)
- Reviews show **fictional names** (Rahul S., Anya V., etc.)
- "Showing cached reviews" message appears
- Always exactly 5 reviews
- Check console/server logs for errors

---

## Still Not Working?

Check these in order:

1. ✅ `.env.local` file exists in correct location
2. ✅ Environment variables are spelled correctly (copy-paste recommended)
3. ✅ Dev server was restarted after creating `.env.local`
4. ✅ Places API (New) is enabled in Google Cloud Console
5. ✅ API key is valid and not restricted incorrectly
6. ✅ Internet connection is working
7. ✅ Check browser console for error messages
8. ✅ Check server terminal for error messages

---

## Contact Support

If you've checked everything above and it still doesn't work, please provide:
- Browser console logs (F12 → Console)
- Server terminal logs
- Screenshot of Google Cloud Console showing "Places API (New)" is enabled
- Contents of your `.env.local` (with API key redacted for security)




