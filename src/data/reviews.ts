/**
 * Customer Reviews Data
 * Update this file with actual customer reviews
 * Used for generating review schema and displaying testimonials
 */

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string; // ISO date format
  title?: string;
  text: string;
  source?: 'Google' | 'Facebook' | 'Direct';
}

/**
 * Customer Reviews
 * Add real reviews from guests
 */
export const reviews: Review[] = [
  {
    id: "review-1",
    author: "Sample Guest 1",
    rating: 5,
    date: "2024-11-01",
    title: "Amazing Mountain Experience",
    text: "The most beautiful hostel in Kasol! Stunning views, friendly staff, and delicious food at the cafe. Highly recommend for anyone visiting Parvati Valley.",
    source: "Google"
  },
  {
    id: "review-2",
    author: "Sample Guest 2",
    rating: 5,
    date: "2024-10-15",
    title: "Perfect Base for Trekking",
    text: "Great location for Kheerganga trek. Clean rooms, comfortable beds, and amazing hospitality. The bonfire nights were memorable!",
    source: "Facebook"
  },
  {
    id: "review-3",
    author: "Sample Guest 3",
    rating: 4,
    date: "2024-09-20",
    title: "Peaceful Retreat",
    text: "Very peaceful and serene location. Perfect for disconnecting from city life. The villa is luxurious and the views are breathtaking.",
    source: "Direct"
  },
  // Add more real reviews here
];

/**
 * Calculate aggregate rating
 */
export function getAggregateRating() {
  if (reviews.length === 0) {
    return { rating: 0, count: 0 };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return {
    rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    count: reviews.length,
  };
}

/**
 * Generate review schema for structured data
 */
export function generateReviewSchema() {
  const aggregateRating = getAggregateRating();

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Parvati's Lap",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.rating.toString(),
      "reviewCount": aggregateRating.count.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.text,
      ...(review.title && { "name": review.title })
    }))
  };
}

