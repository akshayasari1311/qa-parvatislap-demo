# Gallery & ImageModal Usage Guide

Complete guide for using the Gallery and ImageModal components with auto-scroll functionality.

## Components Overview

### 1. **Gallery** - Auto-scrolling image gallery
- Continuous marquee effect with `useAutoScrollGallery` hook
- Manual navigation controls (prev/next)
- Pause on hover
- Click handler for opening modal

### 2. **ImageModal** - Fullscreen modal viewer
- Single image or carousel mode
- Auto-scroll through images (2.5s interval)
- Manual navigation (prev/next, keyboard arrows)
- Click backdrop or press Escape to close

### 3. **GalleryWithModal** - Combined component
- Gallery + Modal in one component
- Handles state management
- Ready to use out of the box

---

## Quick Start

### Option 1: Use GalleryWithModal (Recommended)

```tsx
import { GalleryWithModal } from "@/components/gallery";
import { viewsImages } from "@/lib/images";

export default function ViewsSection() {
  return (
    <section>
      <h2>Scenic Views</h2>
      <GalleryWithModal
        images={viewsImages}
        scrollSpeed={0.6}
        itemWidth={424}
        alt="Scenic view"
      />
    </section>
  );
}
```

### Option 2: Use Gallery and ImageModal Separately

```tsx
"use client";

import { useState } from "react";
import { Gallery } from "@/components/gallery";
import { ImageModal } from "@/components/modal/ImageModal";
import { cafeImages } from "@/lib/images";

export default function CafeSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);

  const handleImageClick = (images: string[], index: number) => {
    setModalImages(images);
    setModalOpen(true);
  };

  return (
    <>
      <Gallery
        images={cafeImages}
        onImageClick={handleImageClick}
        alt="Cafe"
      />
      
      <ImageModal
        isOpen={modalOpen}
        images={modalImages}
        mode="carousel"
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
```

---

## Available Image Collections

All images are centralized in `src/lib/images.ts`:

### Accommodation Images

```tsx
import { accommodationImages } from "@/lib/images";

// Individual rooms
accommodationImages.meghbariVilla          // 13 images
accommodationImages.fourBedsWoodRoom       // 5 images
accommodationImages.threeBedsBalconyRoom   // 4 images
accommodationImages.fourBedsBalconyRoom    // 4 images
accommodationImages.fourBedsHempRoom       // 4 images
accommodationImages.fourteenBedsStoneRoom  // 5 images
```

### Gallery Collections

```tsx
import { viewsImages, cafeImages, trekImages } from "@/lib/images";

viewsImages    // 13 scenic views
cafeImages     // 7 cafe photos
trekImages     // 4 trek images (object with named treks)
```

### Helper Functions

```tsx
import { getAllAccommodationImages, getAllGalleryImages } from "@/lib/images";

// Get all accommodation images as flat array
const allRooms = getAllAccommodationImages(); // 35 images

// Get all gallery images
const allImages = getAllGalleryImages(); // 55 images
```

---

## Component Props

### Gallery Props

```typescript
interface GalleryProps {
  images: string[];              // Required: Array of image URLs
  onImageClick?: (images: string[], startIndex: number) => void;
  scrollSpeed?: number;          // Default: 0.6 (pixels per frame)
  itemWidth?: number;            // Default: 424 (width + gap)
  className?: string;            // Additional CSS classes
  alt?: string;                  // Alt text prefix
}
```

### ImageModal Props

```typescript
interface ImageModalProps {
  isOpen: boolean;               // Required: Modal visibility
  images: string[];              // Required: Array of image URLs
  mode: "single" | "carousel";   // Required: Display mode
  onClose: () => void;           // Required: Close callback
}
```

### GalleryWithModal Props

```typescript
interface GalleryWithModalProps {
  images: string[];              // Required: Array of image URLs
  scrollSpeed?: number;          // Default: 0.6
  itemWidth?: number;            // Default: 424
  className?: string;            // Additional CSS classes
  alt?: string;                  // Alt text prefix
}
```

---

## Real-World Examples

### Example 1: Accommodations Section

```tsx
"use client";

import { GalleryWithModal } from "@/components/gallery";
import { accommodationImages } from "@/lib/images";

export default function Accommodations() {
  return (
    <section id="accommodations" className="bg-secondary py-24 px-6">
      <div className="max-w-79rem mx-auto">
        <h1 className="title-section text-center mb-12">HOSTEL & VILLA</h1>
        
        {/* Meghbari Luxury Villa */}
        <div className="mb-16">
          <h3 className="accommodation-title">Meghbari Luxury Villa</h3>
          <p className="accommodation-description mb-6">
            Exclusive private villa with 180-degree glacier views
          </p>
          <GalleryWithModal
            images={accommodationImages.meghbariVilla}
            alt="Meghbari Villa"
            scrollSpeed={0.5}
          />
        </div>

        {/* 4 Beds Wood Room */}
        <div className="mb-16">
          <h3 className="accommodation-title">4 Beds Wood Room</h3>
          <GalleryWithModal
            images={accommodationImages.fourBedsWoodRoom}
            alt="Wood Room"
          />
        </div>
      </div>
    </section>
  );
}
```

### Example 2: Views Section

```tsx
import { GalleryWithModal } from "@/components/gallery";
import { viewsImages } from "@/lib/images";

export default function Views() {
  return (
    <section id="views" className="bg-primary py-24 px-6">
      <div className="max-w-79rem mx-auto">
        <h1 className="title-section text-center mb-12">VIEWS</h1>
        <p className="text-center text-secondary mb-12">
          Breathtaking Himalayan vistas from every corner
        </p>
        <GalleryWithModal
          images={viewsImages}
          scrollSpeed={0.8}
          alt="Scenic view"
        />
      </div>
    </section>
  );
}
```

### Example 3: Custom Gallery with Different Speeds

```tsx
import { GalleryWithModal } from "@/components/gallery";

export default function CustomSection() {
  const images = [
    "/images/custom1.jpg",
    "/images/custom2.jpg",
    "/images/custom3.jpg",
  ];

  return (
    <GalleryWithModal
      images={images}
      scrollSpeed={1.2}      // Faster scroll
      itemWidth={320}        // Smaller items
      className="my-8"
      alt="Custom gallery"
    />
  );
}
```

---

## Features

### Auto-Scroll Gallery
- ✅ Continuous infinite loop (clones items seamlessly)
- ✅ Smooth 60fps animation with `requestAnimationFrame`
- ✅ Manual navigation with prev/next buttons
- ✅ Pause on hover
- ✅ Resume after 3 seconds of manual navigation
- ✅ Responsive item sizing

### Image Modal
- ✅ Fullscreen overlay with backdrop blur
- ✅ Carousel with prev/current/next slide positioning
- ✅ Auto-scroll every 2.5 seconds
- ✅ Keyboard navigation (Arrow keys, Escape)
- ✅ Click backdrop to close
- ✅ Slide indicators
- ✅ Prevents body scroll when open

### Performance
- ✅ Lazy loading images with `loading="lazy"`
- ✅ Proper cleanup on unmount
- ✅ Memoized callbacks in hooks
- ✅ Efficient DOM manipulation
- ✅ CSS transforms for smooth animations

---

## Styling

All styles are in `styles/globals.css`:

### Gallery Classes
- `.gallery-container` - Outer container with controls
- `.gallery-overflow` - Overflow hidden wrapper
- `.gallery-track` - Animated track
- `.gallery-item` - Individual gallery item
- `.gallery-prev`, `.gallery-next` - Navigation buttons
- `.zoomable-image` - Clickable image cursor

### Modal Classes
- `.image-modal` - Modal container
- `.modal-image` - Single image display
- `.close-modal` - Close button
- `.carousel-container` - Carousel wrapper
- `.carousel-track` - Carousel slides container
- `.carousel-slide` - Individual slide
- `.carousel-slide-active` - Active slide
- `.carousel-slide-prev`, `.carousel-slide-next` - Adjacent slides
- `.carousel-nav` - Navigation buttons
- `.carousel-indicators` - Slide dots

---

## Tips & Best Practices

1. **Image Optimization**: Use Next.js Image component for optimized images:
   ```tsx
   import Image from "next/image";
   // Use in custom gallery items
   ```

2. **Accessibility**: Always provide meaningful `alt` text:
   ```tsx
   <GalleryWithModal images={images} alt="Room interior" />
   ```

3. **Performance**: Don't load too many images at once. Consider pagination or lazy loading for large galleries.

4. **Customization**: Adjust `scrollSpeed` and `itemWidth` based on your design:
   - Slower speed (0.3-0.5): More relaxed viewing
   - Faster speed (0.8-1.2): Dynamic, energetic feel
   - Smaller items (300-350px): Fit more on screen
   - Larger items (450-500px): Focus on individual images

5. **Responsive Design**: The gallery automatically adapts, but you can add custom breakpoints:
   ```tsx
   <GalleryWithModal
     images={images}
     className="lg:px-12 2xl:px-24"
   />
   ```

---

## Troubleshooting

### Gallery not auto-scrolling?
- Check if `scrollSpeed` is set to a positive number
- Ensure images array is not empty
- Verify CSS classes are loaded

### Modal not opening?
- Check `isOpen` state is updating
- Verify `images` array is passed correctly
- Check browser console for errors

### Images not loading?
- Verify image paths are correct (start with `/`)
- Check images exist in `public/images/` folder
- Inspect network tab for 404 errors

### Carousel stuck on one image?
- Ensure `mode="carousel"` is set
- Check images array has more than one image
- Verify `useCarousel` hook is functioning

---

## Advanced Usage

### Custom Modal Trigger

```tsx
"use client";

import { useState } from "react";
import { ImageModal } from "@/components/modal/ImageModal";

export default function CustomTrigger() {
  const [modalOpen, setModalOpen] = useState(false);
  const images = ["/img1.jpg", "/img2.jpg"];

  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        View Gallery
      </button>
      
      <ImageModal
        isOpen={modalOpen}
        images={images}
        mode="carousel"
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
```

### Programmatic Gallery Control

```tsx
import { useAutoScrollGallery } from "@/hooks/useAutoScrollGallery";

export function ControlledGallery() {
  const gallery = useAutoScrollGallery(0.6, 424);

  return (
    <div>
      <button onClick={gallery.navigatePrev}>Prev</button>
      <div ref={gallery.containerRef}>
        <div ref={gallery.trackRef}>
          {/* Gallery items */}
        </div>
      </div>
      <button onClick={gallery.navigateNext}>Next</button>
    </div>
  );
}
```

---

## Summary

The Gallery and ImageModal components provide a complete, production-ready solution for displaying image galleries with auto-scroll and modal viewing capabilities. They're built with React best practices, use custom hooks for logic reuse, and include all the features from the original HTML implementation.

**Files:**
- `src/components/gallery/Gallery.tsx`
- `src/components/gallery/GalleryWithModal.tsx`
- `src/components/modal/ImageModal.tsx`
- `src/hooks/useAutoScrollGallery.ts`
- `src/hooks/useCarousel.ts`
- `src/hooks/useImageModal.ts`
- `src/lib/images.ts`







