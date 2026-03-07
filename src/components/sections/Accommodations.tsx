"use client";

import { useImageModal } from "@/hooks/useImageModal";
import { ImageModal } from "@/components/modal/ImageModal";
import Image from "next/image";

/**
 * Accommodations Component
 * Displays all accommodation options in a grid layout
 * Each card opens an image carousel modal when clicked
 * Extracted from legacy-index.html (lines 1677-1815)
 */

// Accommodation data structure
interface Accommodation {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  mainImage: string;
}

const accommodations: Accommodation[] = [
  {
    id: "meghbari-villa",
    title: "Meghbari Luxury Villa",
    description: "Exclusive private villa with 180-degree glacier views and complete seclusion. Perfect for honeymoon couples seeking ultimate luxury.",
    images: [
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-1.jpg",
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-2.jpg",
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-3.jpg",
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-4.jpg",
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-5.jpg",
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-6.jpg",
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-7.jpg",
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-8.jpg",
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-9.jpg",
      "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-10.jpg",
    ],
    mainImage: "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-1.jpg",
  },
  {
    id: "4-beds-wood-room",
    title: "4 Beds Wood Room",
    subtitle: "Attached Washroom",
    description: "Cozy wooden room with traditional Himachali architecture, accommodating up to 4 guests with mountain views.",
    images: [
      "/images/4BedsWoodRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-wood-room-homestay-camps-kheerganga-view-wood-room-1.jpg",
      "/images/4BedsWoodRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-wood-room-homestay-camps-kheerganga-view-wood-room-2.jpg",
      "/images/4BedsWoodRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-wood-room-homestay-camps-kheerganga-view-wood-room-3.jpg",
      "/images/4BedsWoodRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-wood-room-homestay-camps-kheerganga-view-wood-room-4.jpg",
      "/images/4BedsWoodRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-wood-room-homestay-camps-kheerganga-view-wood-room-5.jpg",
    ],
    mainImage: "/images/4BedsWoodRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-wood-room-homestay-camps-kheerganga-view-wood-room-1.jpg",
  },
  {
    id: "3-beds-attic-room",
    title: "3 Beds Attic Room",
    subtitle: "Inter connected with 4 bed Balcony room\nAttached Washroom",
    description: "Charming attic room with unique architecture and stunning valley views, perfect for small groups.",
    images: [
      "/images/3BedsBalconyRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-attic-room-homestay-camps-view-3-beds-attic-room-1.jpg",
      "/images/3BedsBalconyRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-attic-room-homestay-camps-view-3-beds-attic-room-2.jpg",
      "/images/3BedsBalconyRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-attic-room-homestay-camps-view-3-beds-attic-room-3.jpg",
      "/images/3BedsBalconyRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-attic-room-homestay-camps-view-3-beds-attic-room-4.jpg",
    ],
    mainImage: "/images/3BedsBalconyRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-attic-room-homestay-camps-view-3-beds-attic-room-1.jpg",
  },
  {
    id: "4-beds-balcony-room",
    title: "4 Beds Balcony Room",
    subtitle: "Interconnected with 3 Beds Attic Room\nAttached Washroom",
    description: "Spacious room with private balcony offering panoramic mountain views and fresh Himalayan air.",
    images: [
      "/images/4BedsBalconyRoom/parvatis-lap-hostel-villa-hemp-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-balcony-room-homestay-camps-view-4-beds-balcony-room-1.jpg",
      "/images/4BedsBalconyRoom/parvatis-lap-hostel-villa-hemp-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-balcony-room-homestay-camps-view-4-beds-balcony-room-2.jpg",
      "/images/4BedsBalconyRoom/parvatis-lap-hostel-villa-hemp-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-balcony-room-homestay-camps-view-4-beds-balcony-room-3.jpg",
      "/images/4BedsBalconyRoom/parvatis-lap-hostel-villa-hemp-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-balcony-room-homestay-camps-view-4-beds-balcony-room-4.jpg",
    ],
    mainImage: "/images/4BedsBalconyRoom/parvatis-lap-hostel-villa-hemp-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-balcony-room-homestay-camps-view-4-beds-balcony-room-1.jpg",
  },
  {
    id: "4-beds-hemp-room",
    title: "4 Beds Hemp Room",
    subtitle: "Outside Washroom",
    description: "Eco-friendly room built with natural hemp materials, offering sustainable comfort in the mountains.",
    images: [
      "/images/4BedsHempRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-hemp-sarpass-room-homestay-camps-view-hemp-room-1.jpg",
      "/images/4BedsHempRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-hemp-sarpass-room-homestay-camps-view-hemp-room-2.jpg",
      "/images/4BedsHempRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-hemp-sarpass-room-homestay-camps-view-hemp-room-3.jpg",
      "/images/4BedsHempRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-hemp-sarpass-room-homestay-camps-view-hemp-room-4.jpg",
    ],
    mainImage: "/images/4BedsHempRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-hemp-sarpass-room-homestay-camps-view-hemp-room-4.jpg",
  },
  {
    id: "14-beds-stone-room",
    title: "14 Beds Stone Room",
    subtitle: "Outside Washroom",
    description: "Large dormitory with traditional stone construction, perfect for backpackers and budget travelers.",
    images: [
      "/images/14BedsStoneRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-stone-kheerganga-room-homestay-camps-view-stone-room-1.jpg",
      "/images/14BedsStoneRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-stone-kheerganga-room-homestay-camps-view-stone-room-2.jpg",
      "/images/14BedsStoneRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-stone-kheerganga-room-homestay-camps-view-stone-room-3.jpg",
      "/images/14BedsStoneRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-stone-kheerganga-room-homestay-camps-view-stone-room-4.jpg",
      "/images/14BedsStoneRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-stone-kheerganga-room-homestay-camps-view-stone-room-5.jpg",
    ],
    mainImage: "/images/14BedsStoneRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-stone-kheerganga-room-homestay-camps-view-stone-room-3.jpg",
  },
];

export default function Accommodations() {
  const { isOpen, images, mode, startIndex, openCarousel, closeModal } = useImageModal();

  const handleCardClick = (accommodationImages: string[]) => {
    // console.log('ðŸ  Accommodations - Card clicked with images:', accommodationImages);
    openCarousel(accommodationImages, 0); // Always start from first image for accommodation cards
  };

  return (
    <>
      <section id="accommodations" className="bg-secondary py-24 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px-64">
        <div className="max-w-79rem [@media(min-width:2560px)]:max-w-[235rem] mx-auto">
          <div className="text-center mb-12">
            <h1 className="section-title title-section">HOSTEL & VILLA</h1>
            <p className="text-lg text-secondary max-w-[600px] mx-auto leading-normal [@media(min-width:2560px)]:text-[2rem] [@media(min-width:2560px)]:max-w-[59rem]">
              Choose from our range of comfortable stays, from budget-friendly hostel beds to luxury private villas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accommodations.map((accommodation) => (
              <div
                key={accommodation.id}
                className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-2 border-[var(--border-color)] rounded-[20px] overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(128,128,0,0.15)] cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(128,128,0,0.25)] dark:bg-gradient-to-br dark:from-[rgba(0,0,0,0.8)] dark:to-[rgba(57,255,20,0.05)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.15)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.25)]"
                onClick={() => handleCardClick(accommodation.images)}
              >
                <div className="relative overflow-hidden h-[216px] [@media(min-width:2560px)]:h-[26rem]">
                  <Image
                    src={accommodation.mainImage}
                    alt={accommodation.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQEBAQEBAAAAAAAAAAAAAAABAgADEf/aAAwDAQACEQMRAD8AuNR9T3d1qEkVlcSW8QlZVCswBAPzj+VB1BqE1xqNxNO5aSWVnZj7JJyT+1pQGJ3HmY2p/9k="
                  />
                </div>
                <div className="p-6 [@media(min-width:2560px)]:p-[82px]">
                  <h3 className="text-2xl font-light text-[var(--text-primary)] mb-2 tracking-[0.05em] [@media(min-width:2560px)]:text-[3rem]">
                    {accommodation.title}
                  </h3>
                  {accommodation.subtitle && (
                    <p className="text-sm font-normal text-[var(--muted)] mb-3 italic opacity-85 [@media(min-width:2560px)]:text-[21px]">
                      {accommodation.subtitle.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < accommodation.subtitle!.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                  <p className="text-[var(--text-secondary)] leading-[1.6] mb-4 [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem]">
                    {accommodation.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal for Accommodation Carousels */}
      <ImageModal
        isOpen={isOpen}
        images={images}
        mode={mode}
        startIndex={startIndex}
        onClose={closeModal}
      />
    </>
  );
}

