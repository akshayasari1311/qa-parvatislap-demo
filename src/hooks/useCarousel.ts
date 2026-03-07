import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useCarousel Hook
 * Manages image carousel with auto-scroll, navigation, and keyboard support
 * Converts initImageModal() carousel logic from new_index.html (lines 253-380)
 * 
 * @param images - Array of image URLs
 * @param autoScrollDelay - Auto-scroll interval in ms (default: 2500)
 * @param initialSlide - Initial slide index (default: 0)
 * @returns {object} Carousel state and control functions
 */
export function useCarousel(images: string[], autoScrollDelay: number = 2500, initialSlide: number = 0) {
  // Debug: Check incoming images
  // console.log('🎠 useCarousel - Received images:', images);
  // console.log('🎠 useCarousel - Images count:', images.length);
  // console.log('🎠 useCarousel - Initial slide:', initialSlide);
  
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  /**
   * Navigate to next slide
   */
  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => (current + 1) % images.length);
  }, [images.length]);

  /**
   * Navigate to previous slide
   */
  const prevSlide = useCallback(() => {
    setCurrentSlide((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  /**
   * Go to specific slide
   */
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  /**
   * Start auto-scroll (without state update to avoid cascading renders)
   */
  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    autoScrollIntervalRef.current = setInterval(nextSlide, autoScrollDelay);
  }, [nextSlide, autoScrollDelay]);

  /**
   * Stop auto-scroll (without state update to avoid cascading renders)
   */
  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = undefined;
    }
  }, []);

  /**
   * Handle manual navigation (stops auto-scroll temporarily)
   */
  const handlePrev = useCallback(() => {
    stopAutoScroll();
    prevSlide();
    
    // Resume after 5 seconds
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 5000);
  }, [stopAutoScroll, prevSlide, startAutoScroll]);

  const handleNext = useCallback(() => {
    stopAutoScroll();
    nextSlide();
    
    // Resume after 5 seconds
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 5000);
  }, [stopAutoScroll, nextSlide, startAutoScroll]);

  /**
   * Handle keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  /**
   * Start auto-scroll on mount
   */
  useEffect(() => {
    if (images.length > 1) {
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  /**
   * Reset slide when images array reference changes OR when initialSlide changes
   * Using ref to avoid triggering effect on every render
   */
  const prevImagesRef = useRef(images);
  const prevInitialSlideRef = useRef(initialSlide);
  
  if (prevImagesRef.current !== images || prevInitialSlideRef.current !== initialSlide) {
    prevImagesRef.current = images;
    prevInitialSlideRef.current = initialSlide;
    // Reset to initialSlide or 0 if current slide is out of bounds
    const validInitialSlide = initialSlide < images.length ? initialSlide : 0;
    setCurrentSlide(validInitialSlide);
    // console.log('🎠 useCarousel - Resetting to slide:', validInitialSlide);
  }

  /**
   * Get prev, current, and next slide indices for display
   */
  const prevIndex = (currentSlide - 1 + images.length) % images.length;
  const nextIndex = (currentSlide + 1) % images.length;

  // Debug: Log current carousel state
  // console.log('🎠 useCarousel - Current state:', {
  //   currentSlide,
  //   currentImage: images[currentSlide],
  //   totalImages: images.length,
  //   prevIndex,
  //   nextIndex
  // });

  return {
    currentSlide,
    prevIndex,
    nextIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    handlePrev,
    handleNext,
    startAutoScroll,
    stopAutoScroll,
  };
}

