"use client";

import { useCarousel } from "@/hooks/useCarousel";
import { useEffect } from "react";

/**
 * ImageModal Component
 * Fullscreen image modal with carousel support
 * Extracted from new_index.html modal section (lines 2306-2315)
 * 
 * @param isOpen - Whether the modal is open
 * @param images - Array of image URLs
 * @param mode - Display mode: "single" or "carousel"
 * @param onClose - Callback to close the modal
 */

interface ImageModalProps {
  isOpen: boolean;
  images: string[];
  mode: "single" | "carousel";
  startIndex?: number;
  onClose: () => void;
}

export function ImageModal({ isOpen, images, mode, startIndex = 0, onClose }: ImageModalProps) {
  // Debug: Check what ImageModal receives
  // console.log('🖼️ ImageModal - Props:', { isOpen, images, mode, startIndex, imagesCount: images.length });
  
  const carousel = useCarousel(images, 2500, startIndex);

  /**
   * Handle click on modal backdrop to close
   */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * Prevent body scroll when modal is open
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) {
    // console.log('🖼️ ImageModal - NOT rendering (closed or no images):', { isOpen, imagesCount: images.length });
    return null;
  }

  const altPrefix =
    "Parvati's Lap - Luxury Hostel & Villa, Lapas Village (Kasol), Parvati Valley, Himachal Pradesh";

  // console.log('🖼️ ImageModal - RENDERING with active class:', { 
  //   isOpen, 
  //   mode, 
  //   imagesCount: images.length,
  //   currentSlide: carousel.currentSlide 
  // });

  return (
    <div
      className={`image-modal ${isOpen ? "active" : ""}`}
      id="imageModal"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        className="close-modal"
        id="closeImageModal"
        onClick={onClose}
        aria-label="Close image"
      >
        ×
      </button>

      {/* Single Image Mode */}
      {mode === "single" && (
        <img
          className="modal-image"
          id="modalImage"
          src={images[0]}
          alt={`${altPrefix} — full-size photo`}
        />
      )}

      {/* Carousel Mode */}
      {mode === "carousel" && (
        <div id="carouselContainer" className="carousel-container">
          {/* Previous Button */}
          <button
            className="carousel-nav carousel-nav-prev"
            id="carouselPrev"
            onClick={(e) => {
              e.stopPropagation();
              carousel.handlePrev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Carousel Track */}
          <div id="carouselTrack" className="carousel-track">
            {images.map((image, index) => {
              let slideClass = "carousel-slide";
              
              if (index === carousel.prevIndex) {
                slideClass += " carousel-slide-prev";
              } else if (index === carousel.currentSlide) {
                slideClass += " carousel-slide-active";
              } else if (index === carousel.nextIndex) {
                slideClass += " carousel-slide-next";
              }

              // Debug: Log each image render
              // console.log(`🖼️ Rendering slide ${index}:`, {
              //   src: image,
              //   class: slideClass,
              //   isActive: index === carousel.currentSlide,
              //   currentSlide: carousel.currentSlide
              // });

              return (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${altPrefix} — photo ${index + 1}`}
                  className={slideClass}
                  // onLoad={() => console.log(`✅ Image loaded: ${image}`)}
                  // onError={(e) => console.error(`❌ Image failed to load: ${image}`, e)}
                />
              );
            })}
          </div>

          {/* Next Button */}
          <button
            className="carousel-nav carousel-nav-next"
            id="carouselNext"
            onClick={(e) => {
              e.stopPropagation();
              carousel.handleNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>

          {/* Slide Indicators */}
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${
                  index === carousel.currentSlide ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  carousel.goToSlide(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

