"use client";

import { useState } from "react";
import { Gallery } from "@/components/gallery/Gallery";
import { ImageModal } from "@/components/modal/ImageModal";

/**
 * Views Component
 * Showcases breathtaking Himalayan vistas with auto-scrolling gallery
 * Replica of new_index.html Views section (lines 2059-2148)
 */

// Views images array
const viewsImages = [
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-snow-glacier-stars-rainbow-galaxy-full-moon-views-5.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-snow-glacier-stars-galaxy-full-moon-bonfire-outdoor-cafe-camps-homestay-views-9.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-snow-glacier-stars-galaxy-full-moon-views-3.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-snow-glacier-stars-galaxy-full-moon-views-13.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-views-11.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-snow-sunset-views-12.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-snow-sunset-views-7.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-snow-glacier-stars-galaxy-full-moon-views-8.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-views-6.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-snow-glacier-stars-galaxy-full-moon-bonfire-outdoor-cafe-camps-homestay-views-4.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-views-1.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-snow-sunset-views-2.jpg",
  "/images/Views/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-view-sunset-snow-glacier-stars-rainbow-galaxy-full-moon-views-10.jpg",
];

export default function Views({ showHeader = true }: { showHeader?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  const handleImageClick = (images: string[], index: number) => {
    // console.log('ðŸ–¼ï¸ Views - Image clicked:', {
    //   clickedIndex: index,
    //   clickedImage: images[index],
    //   allImages: images,
    //   totalImages: images.length
    // });
    setModalImages(images);
    setStartIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        id="views"
        className="py-24 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 bg-primary [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px-64"
      >
        <div className="max-w-79rem mx-auto [@media(min-width:2560px)]:max-w-[235rem]">
          {showHeader && (
            <div className="text-center mb-12">
              <h1 className="section-title title-section">VIEWS</h1>
              <p className="text-lg text-secondary max-w-[600px] mx-auto leading-normal [@media(min-width:2560px)]:text-[2rem] [@media(min-width:2560px)]:max-w-[59rem]">
                Capture the breathtaking beauty of Parvati&apos;s Lap and the
                surrounding Himalayas
              </p>
            </div>
          )}

          {/* Views Gallery */}
          <Gallery
            images={viewsImages}
            onImageClick={handleImageClick}
            alt="Parvati's Lap - Luxury Hostel & Villa, Lapas Village (Kasol), Parvati Valley, Himachal Pradesh â€” Himalayan view photo"
          />

          {/* Instagram Link */}
          <div className="text-center mt-12">
            <a
              href="https://instagram.com/parvatis_lap"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#808000] text-white px-6 py-3 rounded-xl text-sm no-underline hover:bg-[#556b2f] hover:-translate-y-1 transition-all duration-300 font-semibold [@media(min-width:2560px)]:text-[1.75rem] [@media(min-width:2560px)]:py-6 dark:bg-[#39ff14] dark:text-black dark:hover:bg-[#2ecc11]"
            >
              <svg
                className="w-6 h-6 [@media(min-width:2560px)]:w-10 [@media(min-width:2560px)]:h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              View on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        images={modalImages}
        mode="carousel"
        startIndex={startIndex}
        onClose={closeModal}
      />
    </>
  );
}





