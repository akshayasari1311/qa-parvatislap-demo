"use client";

import { useState, useEffect } from "react";

export interface Review {
  id: string;
  stars: number;
  text: string;
  author: string;
}

/**
 * Custom hook to fetch Google Reviews via secure API proxy
 * Uses /api/reviews endpoint to keep API key secure on server side
 * 
 * @returns {object} - { reviews, loading, error }
 */
export function useGoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // console.log("[useGoogleReviews] Fetching reviews from API...");

        // Call our secure API proxy route
        const response = await fetch("/api/reviews", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("[useGoogleReviews] Response status:", response);

        if (!response.ok) {
          const errorData = await response.json();
          // console.error("[useGoogleReviews] API error:", errorData);
          throw new Error(errorData.error || `Failed to fetch reviews: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log("[useGoogleReviews] Received", data.reviews?.length || 0, "reviews");
        console.log(data.reviews);
        
        if (!data.reviews || data.reviews.length === 0) {
          throw new Error("No reviews found");
        }

        // console.log("[useGoogleReviews] Setting reviews:", data.reviews);
        setReviews(data.reviews);
      } catch (err) {
        // console.error("[useGoogleReviews] Error fetching Google Reviews:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        
        // Fallback to default reviews if API fails
        // console.log("[useGoogleReviews] Using fallback reviews");
        setReviews(getFallbackReviews());
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
}

/**
 * Fallback reviews in case Google API fails
 */
function getFallbackReviews(): Review[] {
  return [
    {
      id: "review-1",
      stars: 5,
      text: '"From the moment I arrived, I was blown away. The trek up is worth every step for the view alone—it\'s absolutely mind-blowing. The hostel itself has an incredible vibe. The staff is super friendly and the other guests are all amazing people."',
      author: "- Rahul S., Verified Guest",
    },
    {
      id: "review-2",
      stars: 5,
      text: '"As a solo female traveler, safety and a friendly environment are my top priorities. Parvati\'s Lap exceeded all my expectations. The dorms were clean and cozy, the food was delicious, and the hosts made me feel like family."',
      author: "- Anya V., Solo Traveler",
    },
    {
      id: "review-3",
      stars: 5,
      text: '"We booked for a few nights and ended up staying for over a week! The location is a secluded paradise, and the bonfire nights are something we\'ll never forget. It\'s not just a place to sleep; it\'s a community where you make lasting friendships."',
      author: "- The Backpacker Duo, Verified Group",
    },
    {
      id: "review-4",
      stars: 5,
      text: '"The food here is absolutely mind-blowing! Every meal felt like a warm hug after a long day of trekking. The cafe has the most incredible views and the staff goes above and beyond to make you feel at home."',
      author: "- Maria K., Food Enthusiast",
    },
    {
      id: "review-5",
      stars: 5,
      text: '"Perfect honeymoon destination! The villa is absolutely stunning with breathtaking views. Complete privacy and luxury in the heart of the Himalayas. We couldn\'t have asked for a better romantic getaway."',
      author: "- David & Sarah, Honeymooners",
    },
  ];
}

