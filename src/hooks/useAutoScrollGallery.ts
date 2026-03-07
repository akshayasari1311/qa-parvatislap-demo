import { useEffect, useRef, useCallback } from "react";

/**
 * useAutoScrollGallery Hook
 * Implements continuous auto-scrolling gallery with cloned items for seamless looping
 * Converts initGalleryNavigation() from new_index.html (lines 141-215)
 * 
 * @param scrollSpeed - Speed of auto-scroll in pixels per frame (default: 0.6)
 * @param itemWidth - Width of gallery item + gap in pixels (default: 424)
 * @returns {object} Refs and control functions for gallery
 */
export function useAutoScrollGallery(scrollSpeed: number = 0.6, itemWidth: number = 424) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const isScrollingRef = useRef(true);
  const animationIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Continuous scroll animation
   */
  const continuousScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || !isScrollingRef.current) return;

    scrollPositionRef.current += scrollSpeed;
    
    // Get count of original items (items without data-cloned attribute)
    const originalItems = Array.from(track.children).filter(
      (child) => !child.hasAttribute("data-cloned")
    );
    const itemWidth = originalItems[0]?.getBoundingClientRect().width || 424;
    const gap = 24; // gap between items
    const trackWidth = originalItems.length * (itemWidth + gap);

    // Reset position when reaching end of original items
    if (scrollPositionRef.current >= trackWidth) {
      scrollPositionRef.current = 0;
    }

    track.style.transform = `translateX(-${scrollPositionRef.current}px)`;
    track.style.transition = "none";

    animationIdRef.current = requestAnimationFrame(continuousScroll);
  }, [scrollSpeed]);

  /**
   * Stop auto-scrolling
   */
  const stopScroll = useCallback(() => {
    isScrollingRef.current = false;
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
  }, []);

  /**
   * Start auto-scrolling
   */
  const startScroll = useCallback(() => {
    isScrollingRef.current = true;
    continuousScroll();
  }, [continuousScroll]);

  /**
   * Navigate to previous item
   */
  const navigatePrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    stopScroll();
    scrollPositionRef.current = Math.max(0, scrollPositionRef.current - itemWidth);
    track.style.transform = `translateX(-${scrollPositionRef.current}px)`;
    track.style.transition = "transform 0.4s ease";

    // Resume auto-scroll after 3 seconds
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(startScroll, 3000);
  }, [itemWidth, stopScroll, startScroll]);

  /**
   * Navigate to next item
   */
  const navigateNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    stopScroll();
    scrollPositionRef.current += itemWidth;
    track.style.transform = `translateX(-${scrollPositionRef.current}px)`;
    track.style.transition = "transform 0.4s ease";

    // Resume auto-scroll after 3 seconds
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(startScroll, 3000);
  }, [itemWidth, stopScroll, startScroll]);

  /**
   * Initialize gallery on mount
   */
  useEffect(() => {
    startScroll();

    const container = containerRef.current;
    if (container) {
      // Pause on hover
      container.addEventListener("mouseenter", stopScroll);
      container.addEventListener("mouseleave", startScroll);
    }

    // Cleanup
    return () => {
      stopScroll();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      if (container) {
        container.removeEventListener("mouseenter", stopScroll);
        container.removeEventListener("mouseleave", startScroll);
      }
    };
  }, [startScroll, stopScroll]);

  return {
    containerRef,
    trackRef,
    navigatePrev,
    navigateNext,
  };
}

