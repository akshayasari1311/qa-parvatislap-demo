"use client";

import { useAutoScrollGallery } from "@/hooks/useAutoScrollGallery";
import Image from "next/image";

/**
 * Gallery Component
 * Auto-scrolling image gallery with manual controls
 * Uses useAutoScrollGallery hook for continuous marquee effect
 * 
 * @param images - Array of image URLs to display
 * @param onImageClick - Callback when an image is clicked
 * @param scrollSpeed - Speed of auto-scroll (default: 0.6)
 * @param itemWidth - Width of each item + gap in pixels (default: 424)
 * @param className - Additional CSS classes
 */

interface GalleryProps {
  images: string[];
  onImageClick?: (images: string[], startIndex: number) => void;
  scrollSpeed?: number;
  itemWidth?: number;
  className?: string;
  alt?: string;
}

export function Gallery({
  images,
  onImageClick,
  scrollSpeed = 0.6,
  itemWidth = 424,
  className = "",
  alt = "Gallery image",
}: GalleryProps) {
  const { containerRef, trackRef, navigatePrev, navigateNext } =
    useAutoScrollGallery(scrollSpeed, itemWidth);

  /**
   * Handle image click - open modal with all images
   * For cloned images, use modulo to get the actual index
   */
  const handleImageClick = (index: number) => {
    if (onImageClick) {
      const actualIndex = index % images.length;
      // console.log('🎯 Gallery - Image click:', {
      //   clickedIndex: index,
      //   actualIndex: actualIndex,
      //   totalImages: images.length,
      //   clickedImageUrl: images[actualIndex]
      // });
      onImageClick(images, actualIndex);
    }
  };

  if (images.length === 0) {
    return null;
  }

  // Render images twice for infinite loop effect
  const renderGalleryItems = (isClone: boolean = false) => {
    return images.map((image, index) => {
      const actualIndex = isClone ? index + images.length : index;
      return (
        <div
          key={`${image}-${actualIndex}`}
          className="shrink-0 w-[400px] h-[300px] rounded-[20px] overflow-hidden relative cursor-pointer transition-all duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_10px_30px_rgba(128,128,0,0.2)] border-[2px] border-[rgba(154,173,122,0.2)] hover:scale-105 hover:-translate-y-[10px] hover:shadow-[0_25px_50px_rgba(128,128,0,0.3)] hover:z-10 hover:border-[rgba(154,173,122,0.4)] [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-[0.4s] [&>img]:ease-out hover:[&>img]:scale-110 dark:border-[rgba(57,255,20,0.3)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.2)] dark:hover:shadow-[0_25px_50px_rgba(57,255,20,0.3)] dark:hover:border-[rgba(57,255,20,0.5)] [@media(min-width:2560px)]:h-[36rem] [@media(min-width:2560px)]:w-[46rem] zoomable-image"
          onClick={() => handleImageClick(actualIndex)}
          data-cloned={isClone ? "true" : undefined}
        >
          <Image
            src={image}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 320px, 400px"
          />
        </div>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-[24px] p-8 border-2 border-[var(--border-color)] shadow-[0_20px_60px_rgba(128,128,0,0.1)] dark:bg-gradient-to-br dark:from-[rgba(0,0,0,0.8)] dark:to-[rgba(57,255,20,0.05)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_20px_60px_rgba(57,255,20,0.1)] ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={navigatePrev}
        className="absolute top-1/2 -translate-y-1/2 left-5 bg-[#808000] border-2 border-[rgba(154,173,122,0.3)] w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center text-[20px] text-white transition-all duration-300 z-20 backdrop-blur-[10px] hover:bg-[#556b2f] hover:scale-110 hover:shadow-[0_10px_25px_rgba(128,128,0,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-90 dark:bg-[#39ff14] dark:text-black dark:border-[rgba(57,255,20,0.4)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] dark:hover:bg-[#2ecc11] dark:hover:shadow-[0_10px_25px_rgba(57,255,20,0.4)] [@media(min-width:2560px)]:w-[99px] [@media(min-width:2560px)]:h-[99px] [@media(min-width:2560px)]:text-[3rem]"
        aria-label="Previous images"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={navigateNext}
        className="absolute top-1/2 -translate-y-1/2 right-5 bg-[#808000] border-2 border-[rgba(154,173,122,0.3)] w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center text-[20px] text-white transition-all duration-300 z-20 backdrop-blur-[10px] hover:bg-[#556b2f] hover:scale-110 hover:shadow-[0_10px_25px_rgba(128,128,0,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-90 dark:bg-[#39ff14] dark:text-black dark:border-[rgba(57,255,20,0.4)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] dark:hover:bg-[#2ecc11] dark:hover:shadow-[0_10px_25px_rgba(57,255,20,0.4)] [@media(min-width:2560px)]:w-[99px] [@media(min-width:2560px)]:h-[99px] [@media(min-width:2560px)]:text-[3rem]"
        aria-label="Next images"
      >
        ›
      </button>

      {/* Gallery Track */}
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] gap-6">
          {/* Original images */}
          {renderGalleryItems(false)}
          {/* Cloned images for infinite loop */}
          {renderGalleryItems(true)}
        </div>
      </div>
    </div>
  );
}

