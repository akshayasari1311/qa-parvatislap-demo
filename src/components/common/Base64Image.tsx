"use client";

import { ImgHTMLAttributes } from "react";
import { autoOptimizeImageSrc, Base64ImageKey, getBase64Image } from "@/lib/base64Images";

/**
 * Base64Image Component
 * 
 * A drop-in replacement for <img> that automatically uses base64 encoded images
 * when available, reducing HTTP requests for small images.
 * 
 * Usage:
 * // With automatic path resolution:
 * <Base64Image src="/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-sar-pass-trek-biskeri-thach-snow-slide-high-altitude.jpg" alt="Sar Pass" />
 * 
 * // With explicit base64 key:
 * <Base64Image base64Key="sarPass" alt="Sar Pass" />
 * 
 * // Falls back to regular img if no base64 available
 */

interface Base64ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Original image path - will be auto-resolved to base64 if available */
  src?: string;
  /** Explicit base64 key to use */
  base64Key?: Base64ImageKey;
  /** Alt text (required for accessibility) */
  alt: string;
}

export function Base64Image({ 
  src, 
  base64Key, 
  alt, 
  className,
  loading = "lazy",
  ...props 
}: Base64ImageProps) {
  // Determine the final image source
  let imageSrc: string;
  
  if (base64Key) {
    // Use explicit base64 key
    imageSrc = getBase64Image(base64Key);
  } else if (src) {
    // Auto-resolve path to base64 if available
    imageSrc = autoOptimizeImageSrc(src);
  } else {
    console.warn("Base64Image: No src or base64Key provided");
    return null;
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      {...props}
    />
  );
}

export default Base64Image;


