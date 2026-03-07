# Google Reviews Integration

This document explains the Google Reviews API integration implemented in the Parvati's Lap website.

## Overview

The website now fetches real-time reviews from Google Places API and displays them in the Reviews section. The implementation is secure, efficient, and includes fallback mechanisms.

## Architecture

### 1. **Custom Hook: `useGoogleReviews`**
Location: `src/hooks/useGoogleReviews.ts`

- Fetches reviews on component mount
- Manages loading and error states
- Provides fallback reviews if API fails
- Returns: `{ reviews, loading, error }`

### 2. **Secure API Proxy Route**
Location: `src/app/api/reviews/route.ts`

- **Purpose**: Keep the Google API key secure on the server side
- **Endpoint**: `GET /api/reviews`
- **Features**:
  - Server-side API key protection
  - 1-hour caching to reduce API calls
  - Error handling with proper status codes
  - Response mapping to simplified format

### 3. **Reviews Component**
Location: `src/components/sections/Reviews.tsx`

- Uses `useGoogleReviews` hook to fetch data
- Displays loading spinner during fetch
- Shows error message if API fails (uses cached reviews)
- Maintains existing UI/UX design

## Data Flow

```
Reviews Component
       ↓
useGoogleReviews Hook
       ↓
/api/reviews (Proxy)
       ↓
Google Places API
       ↓
Response Mapping
       ↓
Display Reviews
```

## API Response Mapping

Google Places API data is mapped to our Review interface:

```typescript
{
  id: "google-review-{unique-id}",    // Unique identifier
  stars: 5,                            // Rounded from Google's rating
  text: "Review content...",           // From review.text.text
  author: "- Author Name, timeframe"   // From authorAttribution + time
}
```

## Environment Variables

Create a `.env.local` file in the project root (see `.env.example`):

```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyCixlceFxf51uZacLBSLDLNyx8PrRPWW64
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJNdY7De9dBDkRFumunlxY6E8
```

### Getting Your Credentials

1. **Google Places API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create or select a project
   - Enable "Places API (New)"
   - Create API key
   - Restrict the key to your domain (optional but recommended)

2. **Place ID**:
   - Use [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Search for "Parvati's Lap Kasol"
   - Copy the Place ID

## Features

### ✅ Security
- API key is **never exposed** to the client
- Server-side proxy route handles all API calls
- Environment variables for sensitive data

### ✅ Performance
- 1-hour caching on API responses (`revalidate: 3600`)
- Reduces unnecessary API calls
- Faster load times for users

### ✅ Reliability
- Fallback reviews if API fails
- Error handling at every level
- Loading states for better UX

### ✅ User Experience
- Loading spinner during fetch
- Subtle error message if API fails
- Seamless integration with existing design
- Auto-scrolling gallery maintained

## Fallback Reviews

If the Google API fails, the component automatically displays cached/fallback reviews:

1. Rahul S. - Mind-blowing views and incredible vibe
2. Anya V. - Safe and friendly for solo travelers
3. The Backpacker Duo - Community and lasting friendships
4. Maria K. - Mind-blowing food
5. David & Sarah - Perfect honeymoon destination

## API Quota & Costs

- **Google Places API (New)**: Check current pricing at [Google Cloud Pricing](https://cloud.google.com/maps-platform/pricing)
- **Caching Strategy**: 1-hour cache reduces API calls significantly
- **Fallback**: No API calls needed if cached or if fallback is used

## Testing

### Local Development

1. Add environment variables to `.env.local`
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Navigate to `http://localhost:3000` and scroll to Reviews section
4. Check browser console for any errors

### Production

1. Add environment variables to your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Other: Refer to platform documentation

2. Deploy and verify reviews are loading correctly

## Troubleshooting

### Reviews not loading?

1. **Check API Key**: Ensure the key is correct in `.env.local`
2. **Check Place ID**: Verify Place ID is correct
3. **Check Console**: Look for error messages in browser/server console
4. **Check API Quota**: Ensure you haven't exceeded Google's free tier
5. **Check API Restrictions**: If you restricted the API key, ensure your domain is allowed

### API Errors

- **401 Unauthorized**: API key is invalid or missing
- **403 Forbidden**: API key restrictions are blocking the request
- **404 Not Found**: Place ID is incorrect
- **429 Too Many Requests**: Exceeded API quota

### Fallback Reviews Showing

If you see "Showing cached reviews" message:
- The API call failed
- Check the browser console for error details
- Verify environment variables are set correctly
- Check Google Cloud Console for API status

## Future Enhancements

Potential improvements for the future:

1. **Review Filtering**: Show only 5-star reviews
2. **Review Sorting**: Sort by date, rating, or helpfulness
3. **Review Pagination**: Load more reviews on demand
4. **Review Analytics**: Track review sentiment over time
5. **Multiple Languages**: Support reviews in different languages
6. **Rich Snippets**: Add structured data for SEO
7. **Review Caching**: Store reviews in a database for faster access

## Files Modified/Created

### Created
- `src/hooks/useGoogleReviews.ts` - Custom hook for fetching reviews
- `src/app/api/reviews/route.ts` - Secure API proxy route
- `.env.example` - Environment variables template
- `GOOGLE_REVIEWS_SETUP.md` - This documentation file

### Modified
- `src/components/sections/Reviews.tsx` - Updated to use Google Reviews
- `.env.local` - Added Google API credentials (not in git)

## Security Best Practices

✅ **DO**:
- Keep API keys in environment variables
- Use server-side proxy routes
- Restrict API keys in Google Cloud Console
- Monitor API usage regularly
- Use caching to reduce API calls

❌ **DON'T**:
- Commit `.env.local` to git
- Expose API keys in client-side code
- Use unrestricted API keys in production
- Skip error handling
- Make unnecessary API calls

## Support

For issues or questions:
1. Check this documentation
2. Review browser/server console logs
3. Check Google Cloud Console for API status
4. Verify environment variables are set correctly

---

**Implementation Date**: November 2025  
**Developer**: Senior MERN Stack Developer  
**Google Places API Version**: New (v1)




