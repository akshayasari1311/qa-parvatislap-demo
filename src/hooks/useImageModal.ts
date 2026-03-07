import { useState, useCallback, useEffect } from "react";

/**
 * useImageModal Hook
 * Manages fullscreen image modal state with single image or carousel support
 * Converts initImageModal() from new_index.html (lines 253-380)
 * 
 * @returns {object} Modal state and control functions
 */
export function useImageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [mode, setMode] = useState<"single" | "carousel">("single");
  const [startIndex, setStartIndex] = useState(0);

  /**
   * Open modal with a single image
   */
  const openSingleImage = useCallback((imageSrc: string) => {
    setImages([imageSrc]);
    setMode("single");
    setStartIndex(0);
    setIsOpen(true);
  }, []);

  /**
   * Open modal with carousel of images
   * @param imageArray - Array of images to display
   * @param initialIndex - Index of the image to start with (default: 0)
   */
  const openCarousel = useCallback((imageArray: string[], initialIndex: number = 0) => {
    setImages(imageArray);
    setMode("carousel");
    setStartIndex(initialIndex);
    setIsOpen(true);
  }, []);

  /**
   * Close modal
   */
  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Clear images after animation completes
    setTimeout(() => {
      setImages([]);
    }, 300);
  }, []);

  /**
   * Handle Escape key to close modal
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeModal]);

  return {
    isOpen,
    images,
    mode,
    startIndex,
    openSingleImage,
    openCarousel,
    closeModal,
  };
}

