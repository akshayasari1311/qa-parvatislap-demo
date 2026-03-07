/**
 * Test script to verify Google Places API setup
 * Run: node scripts/test-google-api.js
 */

require('dotenv').config({ path: '.env' });

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

console.log('\n========================================');
console.log('Google Places API Test');
console.log('========================================\n');

// Check environment variables
console.log('1. Checking Environment Variables:');
console.log('   API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : '❌ MISSING');
console.log('   Place ID:', placeId || '❌ MISSING');

if (!apiKey || !placeId) {
  console.log('\n❌ ERROR: Environment variables are missing!');
  console.log('\nPlease create a .env.local file with:');
  console.log('NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_api_key');
  console.log('NEXT_PUBLIC_GOOGLE_PLACE_ID=your_place_id');
  process.exit(1);
}

// Test API call
console.log('\n2. Testing Google Places API...');

const fields = 'reviews';
const endpoint = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?fields=${encodeURIComponent(fields)}&key=${apiKey}`;

fetch(endpoint, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(async (response) => {
    console.log('   Status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('\n❌ API Error Response:');
      console.log(errorText);
      return;
    }

    const data = await response.json();
    
    if (!data.reviews || data.reviews.length === 0) {
      console.log('\n⚠️  No reviews found in response');
      console.log('Response:', JSON.stringify(data, null, 2));
      return;
    }

    console.log('\n✅ Success! Found', data.reviews.length, 'reviews');
    console.log('\nFirst review preview:');
    console.log('   Rating:', data.reviews[0].rating);
    console.log('   Author:', data.reviews[0].authorAttribution.displayName);
    console.log('   Text:', data.reviews[0].text.text.substring(0, 100) + '...');
    
    console.log('\n========================================');
    console.log('All systems are working! ✅');
    console.log('========================================\n');
  })
  .catch((error) => {
    console.log('\n❌ Network Error:');
    console.log(error.message);
    console.log('\nPlease check:');
    console.log('1. Internet connection');
    console.log('2. API key is valid');
    console.log('3. Places API (New) is enabled in Google Cloud Console');
  });

