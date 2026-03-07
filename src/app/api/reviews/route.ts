import { NextResponse } from "next/server";

/**
 * API Route to proxy Google Places API requests
 * This keeps the API key secure on the server side
 * 
 * GET /api/reviews - Fetches reviews from Google Places API
 */

interface GoogleReview {
  name?: string;
  rating: number;
  text: {
    text: string;
  };
  authorAttribution: {
    displayName: string;
  };
  publishTime?: string;
  relativePublishTimeDescription?: string;
}

interface GooglePlacesResponse {
  reviews?: GoogleReview[];
}

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

    // console.log("[API Route] API Key exists:", !!apiKey);
    // console.log("[API Route] Place ID:", placeId);

    if (!apiKey || !placeId) {
      // console.error("[API Route] Missing API key or Place ID");
      return NextResponse.json(
        { error: "API configuration missing" },
        { status: 500 }
      );
    }

    // Fields to retrieve from Google Places API (New)
    // Include all necessary review fields
    const fields = "displayName,googleMapsUri,rating,userRatingCount,reviews.rating,reviews.text,reviews.publishTime,reviews.authorAttribution";

    // Google Places API (New) endpoint
    const endpoint = `https://places.googleapis.com/v1/places/${encodeURIComponent(
      placeId
    )}?fields=${encodeURIComponent(fields)}&key=${apiKey}`;

    // console.log("[API Route] Calling Google Places API...");
    // console.log("[API Route] Endpoint:", endpoint.replace(apiKey, 'API_KEY_HIDDEN'));

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache for 1 hour to reduce API calls
      next: { revalidate: 3600 },
    });

    // console.log("[API Route] Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      // console.error("[API Route] Google Places API error:", errorText);
      return NextResponse.json(
        { error: `Failed to fetch reviews from Google Places API: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data: GooglePlacesResponse = await response.json();
    // console.log("[API Route] Received data:", JSON.stringify(data, null, 2).substring(0, 500));

    if (!data.reviews || data.reviews.length === 0) {
      // console.warn("[API Route] No reviews found in response");
      return NextResponse.json(
        { error: "No reviews found" },
        { status: 404 }
      );
    }

    // console.log("[API Route] Successfully fetched", data.reviews.length, "reviews");

    // Map Google Reviews to simplified format
    const reviews = data.reviews.map((review, index) => {
      // Format publish time if available
      let timeDescription = "";
      if (review.publishTime) {
        const publishDate = new Date(review.publishTime);
        const now = new Date();
        const diffMs = now.getTime() - publishDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays < 1) timeDescription = "today";
        else if (diffDays < 7) timeDescription = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        else if (diffDays < 30) timeDescription = `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
        else if (diffDays < 365) timeDescription = `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
        else timeDescription = `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
      } else if (review.relativePublishTimeDescription) {
        timeDescription = review.relativePublishTimeDescription;
      }

      return {
        id: `google-review-${review.name || index}`,
        stars: Math.round(review.rating),
        text: `"${review.text?.text || "No review text available"}"`,
        author: `- ${review.authorAttribution?.displayName || "Anonymous"}${
          timeDescription ? `, ${timeDescription}` : ""
        }`,
      };
    });

    // console.log("[API Route] Returning", reviews.length, "mapped reviews");
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    // console.error("[API Route] Error in /api/reviews:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

