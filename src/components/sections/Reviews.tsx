"use client";

import { useAutoScrollGallery } from "@/hooks/useAutoScrollGallery";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

/**
 * Reviews Component
 * Guest reviews and testimonials section
 * Fetches real-time reviews from Google Places API
 * Features auto-scrolling review cards with manual navigation
 */

export default function Reviews({ showHeader = true }: { showHeader?: boolean }) {
  // Fetch Google Reviews on component load
  const { reviews, loading, error } = useGoogleReviews();

  const { containerRef, trackRef, navigatePrev, navigateNext } =
    useAutoScrollGallery(0.6, 424); // scrollSpeed: 0.6px/frame, itemWidth: 380px + 24px gap

  // Render review cards
  const renderReviewCards = (isClone: boolean = false) => {
    return reviews.map((review, index) => {
      const actualIndex = isClone ? index + reviews.length : index;
      return (
        <div
          key={`${review.id}-${actualIndex}`}
          className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-2 border-[var(--border-color)] rounded-[20px] h-[309px] p-7 w-[300px] md:w-[380px] [@media(min-width:2560px)]:w-[46rem] [@media(min-width:2560px)]:h-[450px] shrink-0 shadow-[0_10px_30px_rgba(128,128,0,0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(128,128,0,0.25)] hover:border-[rgba(154,173,122,0.4)] dark:bg-gradient-to-br dark:from-[rgba(0,0,0,0.8)] dark:to-[rgba(57,255,20,0.05)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.15)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.25)] dark:hover:border-[rgba(57,255,20,0.4)] flex flex-col"
          data-cloned={isClone ? "true" : undefined}
        >
          {/* Stars - Fixed at top */}
          <div className="text-[#fbbf24] text-[20px] mb-4 [@media(min-width:2560px)]:text-[3rem] shrink-0">
            {Array.from({ length: review.stars }, (_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          
          {/* Review Text - Scrollable */}
          <div className="flex-1 overflow-y-auto mb-5 scrollbar-thin scrollbar-thumb-[rgba(154,173,122,0.3)] scrollbar-track-transparent hover:scrollbar-thumb-[rgba(154,173,122,0.5)] dark:scrollbar-thumb-[rgba(57,255,20,0.3)] dark:hover:scrollbar-thumb-[rgba(57,255,20,0.5)]">
            <p className="text-[var(--text-secondary)] leading-[1.7] italic text-base [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem] pr-2">
              {review.text}
            </p>
          </div>
          
          {/* Author - Fixed at bottom */}
          <p className="text-[var(--text-primary)] font-semibold text-[0.9rem] [@media(min-width:2560px)]:text-[21px] shrink-0">{review.author}</p>
        </div>
      );
    });
  };

  return (
    <section
      id="reviews"
      className="py-24 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 bg-secondary [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px-64"
    >
      <div className="max-w-79rem mx-auto [@media(min-width:2560px)]:max-w-[235rem]">
        {showHeader && (
          <div className="text-center mb-12">
            <h1 className="section-title title-section">REVIEWS</h1>
            <p className="text-lg text-secondary max-w-[600px] mx-auto leading-normal [@media(min-width:2560px)]:text-[2rem] [@media(min-width:2560px)]:max-w-[59rem]">
              What our guests are saying about their experience at Parvati&apos;s
              Lap
            </p>
            {error && (
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                Showing cached reviews
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)] dark:border-[#39ff14]"></div>
          </div>
        )}

        {/* Reviews Gallery */}
        {!loading && reviews.length > 0 && (
        <div ref={containerRef} className="relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-[24px] p-8 border-2 border-[var(--border-color)] shadow-[0_20px_60px_rgba(128,128,0,0.1)] dark:bg-gradient-to-br dark:from-[rgba(0,0,0,0.8)] dark:to-[rgba(57,255,20,0.05)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_20px_60px_rgba(57,255,20,0.1)]">
          <button
            onClick={navigatePrev}
            className="absolute top-1/2 -translate-y-1/2 left-5 bg-[#808000] border-2 border-[rgba(154,173,122,0.3)] w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center text-[20px] text-white transition-all duration-300 z-20 backdrop-blur-[10px] hover:bg-[#556b2f] hover:scale-110 hover:shadow-[0_10px_25px_rgba(128,128,0,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-90 dark:bg-[#39ff14] dark:text-black dark:border-[rgba(57,255,20,0.4)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] dark:hover:bg-[#2ecc11] dark:hover:shadow-[0_10px_25px_rgba(57,255,20,0.4)] [@media(min-width:2560px)]:w-[99px] [@media(min-width:2560px)]:h-[99px] [@media(min-width:2560px)]:text-[3rem]"
            aria-label="Previous review"
          >
            ‹
          </button>
          <button
            onClick={navigateNext}
            className="absolute top-1/2 -translate-y-1/2 right-5 bg-[#808000] border-2 border-[rgba(154,173,122,0.3)] w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center text-[20px] text-white transition-all duration-300 z-20 backdrop-blur-[10px] hover:bg-[#556b2f] hover:scale-110 hover:shadow-[0_10px_25px_rgba(128,128,0,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-90 dark:bg-[#39ff14] dark:text-black dark:border-[rgba(57,255,20,0.4)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] dark:hover:bg-[#2ecc11] dark:hover:shadow-[0_10px_25px_rgba(57,255,20,0.4)] [@media(min-width:2560px)]:w-[99px] [@media(min-width:2560px)]:h-[99px] [@media(min-width:2560px)]:text-[3rem]"
            aria-label="Next review"
          >
            ›
          </button>

          <div className="overflow-hidden">
            <div ref={trackRef} className="flex transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] gap-6">
              {/* Original review cards */}
              {renderReviewCards(false)}
              {/* Cloned review cards for infinite loop */}
              {renderReviewCards(true)}
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
