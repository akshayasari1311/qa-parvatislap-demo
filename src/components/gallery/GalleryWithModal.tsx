"use client";

import { useState } from "react";
import { Gallery } from "./Gallery";
import { ImageModal } from "../modal/ImageModal";

/**
 * GalleryWithModal Component
 * Combines Gallery and ImageModal for a complete image viewing experience
 * 
 * @param images - Array of image URLs
 * @param scrollSpeed - Gallery scroll speed (default: 0.6)
 * @param itemWidth - Gallery item width (default: 424)
 * @param className - Additional CSS classes
 * @param alt - Alt text prefix for images
 */

interface GalleryWithModalProps {
  images: string[];
  scrollSpeed?: number;
  itemWidth?: number;
  className?: string;
  alt?: string;
}

export function GalleryWithModal({
  images,
  scrollSpeed = 0.6,
  itemWidth = 424,
  className = "",
  alt = "Gallery image",
}: GalleryWithModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  /**
   * Handle image click - open modal
   */
  const handleImageClick = (imageArray: string[], index: number) => {
    // Reorder images to start from clicked index for better UX
    const reorderedImages = [
      ...imageArray.slice(index),
      ...imageArray.slice(0, index),
    ];
    
    setModalImages(reorderedImages);
    setStartIndex(0); // Always start at 0 since we reordered
    setModalOpen(true);
  };

  /**
   * Close modal
   */
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Gallery
        images={images}
        onImageClick={handleImageClick}
        scrollSpeed={scrollSpeed}
        itemWidth={itemWidth}
        className={className}
        alt={alt}
      />

      <ImageModal
        isOpen={modalOpen}
        images={modalImages}
        mode="carousel"
        onClose={handleCloseModal}
      />
    </>
  );
}







