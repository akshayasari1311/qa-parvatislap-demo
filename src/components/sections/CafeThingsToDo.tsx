"use client";

import { useImageModal } from "@/hooks/useImageModal";
import { ImageModal } from "@/components/modal/ImageModal";
import { Gallery } from "@/components/gallery/Gallery";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * CafeThingsToDo Component
 * Displays cafe information, galleries, and things to do with trek cards
 * Extracted from legacy-index.html (lines 1817-2011)
 */

// Cafe gallery images
const cafeImages = [
  "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-2.jpg",
  "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-1.jpg",
  "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-4.jpg",
  "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-3.jpg",
  "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-6.jpg",
  "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-0.jpg",
  "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-5.jpg",
];

// Trek data
interface Trek {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const treks: Trek[] = [
  {
    id: "pin-parvati-pass",
    title: "Pin Parvati Pass Trek",
    subtitle: "10-12 days | 110 km",
    description: "One of the most challenging treks in the Indian Himalayas, crossing the Pin Parvati Pass at 5,319m. This epic journey connects the lush Parvati Valley with the cold desert of Spiti, traversing glaciers, moraines, and remote high-altitude terrain. For experienced trekkers seeking the ultimate Himalayan adventure.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-pin-parvati-pass-trek-spiti-high-altitude-glacier-camping.jpg",
  },
  {
    id: "jiwa-nala-trek",
    title: "Jiwa Nala Trek",
    subtitle: "3-4 hrs | 6 km",
    description: "A serene trek to the pristine Jiwa Nala stream near Grahan. Walk through dense pine forests along crystal-clear mountain waters, perfect for nature lovers and bird watchers. This peaceful trail offers a glimpse into untouched Himalayan wilderness with opportunities to spot local wildlife and enjoy tranquil forest camping.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-jiwa-nala-trek-grahan-pine-forest-stream-camping.jpg",
  },
  {
    id: "grahan-village-trek",
    title: "Grahan Village Trek",
    subtitle: "3-4 hrs | 7 km",
    description: "An enchanting trek through dense pine and oak forests leading to the isolated Grahan village. This offbeat trail offers stunning views of snow-capped peaks, traditional Himachali architecture, and warm local hospitality. Perfect for those seeking an authentic mountain experience away from tourist crowds.",
    image: "/images/Trek/grahan-village-trek.jpeg",
  },
  {
    id: "sar-pass-trek",
    title: "Sar Pass Trek",
    subtitle: "5-6 days | 48 km",
    description: "A challenging high-altitude trek crossing Sar Pass at 4,220m. Experience diverse landscapes from pine forests to alpine meadows, frozen lakes, and snow-covered peaks. This multi-day adventure offers thrilling snow slides, stunning campsites at Biskeri Thach, and panoramic views of the Parvati and Tosh valleys.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-sar-pass-trek-biskeri-thach-snow-slide-high-altitude.jpg",
  },
  {
    id: "bhandak-thach-trek",
    title: "Bhandak Thach Trek",
    subtitle: "2 days | 15 km",
    description: "Often called the 'Switzerland of India,' this trek takes you through Swajani meadows to the breathtaking Bhandak Thach campsite. Walk through dense forests, cross pristine streams, and camp under starlit skies surrounded by panoramic Himalayan views including Papi Chura and Dharmi Chura peaks.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-bhandak-thach-trek-swajani-meadows-camping.jpg",
  },
  {
    id: "swajani-biskeri-trek",
    title: "Swajani-Bhandak-Biskeri Trek",
    subtitle: "2-3 days | 18 km",
    description: "An offbeat alpine adventure starting from Pulga village. Trek through the hidden Swajani meadows to Bhandak Thach and culminate at the stunning Biskeri Thach with 360° Himalayan views. This lesser-known trail offers solitude, pristine nature, and spectacular campsites under star-studded skies away from crowded routes.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-swajani-biskeri-trek-pulga-offbeat-alpine-camping.jpg",
  },
  {
    id: "kheerganga-trek",
    title: "Kheerganga Trek",
    subtitle: "4-6 hrs | 12 km",
    description: "The most famous trek in Parvati Valley! Journey through lush forests and scenic meadows to reach natural hot springs at 2,960m altitude. Soak in therapeutic hot water pools surrounded by snow-capped peaks, enjoy camping under the stars, and witness spectacular sunrise views over the Himalayas.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-kheerganga-trek-hot-spring-parvati-valley-camping.jpg",
  },
  {
    id: "sargi-trek",
    title: "Sargi Trek",
    subtitle: "3 hrs | 5 km",
    description: "Challenge yourself with the invigorating Sargi Trek starting from Parvati's Lap. This moderate hike takes you through dense forests and over pristine streams, leading to a breathtaking viewpoint with panoramic vistas of the surrounding glaciers and the entire Parvati Valley. A must-do for every serious trekker staying at our property.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-sargi-trek-glacier-viewpoint-forest-trail.jpg",
  },
  {
    id: "shikoi-hikes",
    title: "Shikoi Hikes",
    subtitle: "30 min trek",
    description: "Explore the beauty of the region on the picturesque Shikoi Hikes. These shorter, more accessible trails wind through local villages and terraced farms, offering a glimpse into the traditional way of life in the mountains. Perfect for families and beginners to reconnect with nature and soak in the tranquil atmosphere.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-shikoi-hike-village-trail-terraced-farms-family-trek.jpg",
  },
  {
    id: "kasol-exploration",
    title: "Kasol Exploration",
    subtitle: "1 hr journey",
    description: "A 20 min short hike and 30 min drive away is the famous town of Kasol. Dive into its lively party scene, explore the eclectic cafes, and shop for unique handicrafts. Kasol is the perfect place to experience a mix of Israeli and local cultures, with vibrant nightlife and authentic Himalayan cuisine.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-kasol-exploration-cafes-israeli-food-nightlife.jpg",
  },
  {
    id: "chalal",
    title: "Chalal Trek",
    subtitle: "30-40 min | Very Easy",
    description: "A short riverside trail from Kasol via the suspension bridge to Chalal village. Known as the valley's trance trail, it passes through pine forests with Parvati river views and offers a quick, scenic escape ideal for beginners.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-chalal-trek-parvati-river-forest-trail-village-walk.jpg",
  },
  {
    id: "rasol",
    title: "Rasol Trek",
    subtitle: "3-4 hrs | Moderate to Steep",
    description: "A demanding uphill climb above Chalal to Rasol village at high altitude. This offbeat trek rewards effort with expansive mountain views, traditional village life, and a quiet atmosphere away from crowded routes.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-rasol-trek-chalal-route-mountain-village-viewpoint.jpg",
  },
  {
    id: "malana-waichin",
    title: "Malana → Waichin",
    subtitle: "1.5-2 hrs | Moderate to Steep",
    description: "Explore the culture around Malana and continue to Waichin Valley (Magic Valley), a scenic high-meadow route with panoramic Himalayan views. Popular for camping, stargazing, and an offbeat mountain experience.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-malana-waichin-trek-magic-valley-camping-himalayan-views.jpg",
  },
];

export default function CafeThingsToDo({
  showHeader = true,
  showCafeIntro = true,
  showThingsToDo = true,
}: {
  showHeader?: boolean;
  showCafeIntro?: boolean;
  showThingsToDo?: boolean;
}) {
  const { isOpen, images, mode, startIndex, openCarousel, closeModal } = useImageModal();

  const handleImageClick = (clickedImages: string[], clickedIndex: number) => {
    openCarousel(clickedImages, clickedIndex);
  };

  // Trek gallery auto-scroll state and refs
  const trekTrackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality for trek cards
  useEffect(() => {
    const track = trekTrackRef.current;
    if (!track) return;

    // Disable CSS transition for smooth auto-scroll animation
    track.style.transition = 'none';

    const scrollSpeed = 0.6; // pixels per frame (matching original implementation)
    let scrollPosition = 0;

    const animate = () => {
      if (!isPaused && track) {
        // Increment scroll position
        scrollPosition += scrollSpeed;

        // Calculate total width of original items (before clones)
        const firstCard = track.querySelector('.trek-card') as HTMLElement;
        if (firstCard) {
          const cardWidth = firstCard.offsetWidth + 24; // 24px is gap (1.5rem from gap-6)
          const totalWidth = cardWidth * treks.length;

          // Seamless loop: reset to beginning when we reach the cloned section
          if (scrollPosition >= totalWidth) {
            scrollPosition = 0;
          }

          // Apply transform for smooth animation
          track.style.transform = `translateX(-${scrollPosition}px)`;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Navigation handlers with index-based scrolling
  const handlePrevClick = () => {
    const track = trekTrackRef.current;
    if (!track) return;

    const firstCard = track.querySelector('.trek-card') as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 24; // 24px gap (1.5rem from gap-6)
    
    // Calculate previous index (wrap around to end if at beginning)
    const newIndex = currentIndex === 0 ? treks.length - 1 : currentIndex - 1;
    
    // Enable transition for smooth navigation
    track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(-${newIndex * cardWidth}px)`;
    
    setCurrentIndex(newIndex);

    // Disable transition after animation completes
    setTimeout(() => {
      if (track) track.style.transition = 'none';
    }, 420);
  };

  const handleNextClick = () => {
    const track = trekTrackRef.current;
    if (!track) return;

    const firstCard = track.querySelector('.trek-card') as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 24; // 24px gap (1.5rem from gap-6)
    
    // Calculate next index (wrap around to beginning if at end)
    const newIndex = currentIndex === treks.length - 1 ? 0 : currentIndex + 1;
    
    // Enable transition for smooth navigation
    track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(-${newIndex * cardWidth}px)`;
    
    setCurrentIndex(newIndex);

    // Disable transition after animation completes
    setTimeout(() => {
      if (track) track.style.transition = 'none';
    }, 420);
  };

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <>
      <section id="cafe-things" className="bg-primary py-24 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px-64">
        <div className="max-w-79rem mx-auto [@media(min-width:2560px)]:max-w-[235rem]">
          {showHeader && (
            <div className="text-center mb-12">
              <h1 className="section-title title-section">CAFE & THINGS TO DO</h1>
            </div>
          )}

          {/* Cafe Section */}
          <div className="mb-20">
            {showCafeIntro && (
              <>
                <h2 className="text-3xl font-light text-primary mb-8 text-center [@media(min-width:2560px)]:text-[2.75rem]">
                  Our Cafe: ADHIKARA - A Taste of the Himalayas
                </h2>

                <div className="max-w-4xl [@media(min-width:2560px)]:max-w-[112rem] mx-auto mb-12">
                  <p className="text-lg leading-[1.8] text-secondary text-center mb-6 [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[4rem]">
                    Perched high on the mountain above Lapas Village, our cafe offers more than just a mealâ€”it&apos;s an experience for the soul. Surrounded by majestic glaciers and the serene Parvati Valley, our traditional restaurant and cafe is a warm and welcoming space where every bite is a tribute to the peaceful surroundings.
                  </p>
                  <p className="text-lg leading-[1.8] text-secondary text-center [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[4rem]">
                    Based on what our guests have said, our food is a highlight of their stay. We&apos;re known for serving delicious and wholesome meals that perfectly complement a day of trekking and exploration. Whether you&apos;re craving authentic Indian cuisine or a hot cup of tea to warm you up after a trek, we are dedicated to providing a dining experience that feels like home.
                  </p>
                </div>
              </>
            )}

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 text-center transition-all duration-300 shadow-[0_10px_30px_rgba(128,128,0,0.1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(128,128,0,0.2)] hover:border-[rgba(154,173,122,0.4)] dark:bg-gradient-to-br dark:from-[rgba(57,255,20,0.05)] dark:to-[rgba(0,0,0,0.8)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.1)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.2)] dark:hover:border-[rgba(57,255,20,0.4)] [@media(min-width:2560px)]:h-[46rem]">
                <span className="text-[3rem] mb-5 block">
                  <Image
                    src="/images/Parvati's Lap - Luxury Hostel & Villa - HeartyFood5.png"
                    alt="Parvati's Lap - Luxury Hostel & Villa, Kasol (Parvati Valley), Himachal Pradesh â€” hearty food at ADHIKARA Cafe"
                    width={130}
                    height={130}
                    className="inline w-[130px] h-[130px] [@media(min-width:2560px)]:w-[250px] [@media(min-width:2560px)]:h-[250px]"
                    loading="lazy"
                  />
                </span>
                <h3 className="font-light text-[var(--text-primary)] mb-4 tracking-wider [@media(min-width:2560px)]:text-[3rem]">Hearty and Delicious Food</h3>
                <p className="text-[var(--text-secondary)] leading-[1.6] [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem]">
                  Our food is often described as &quot;mind-blowing,&quot; &quot;very good,&quot; and &quot;tasty,&quot; with some guests mentioning that we make as per their taste.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 text-center transition-all duration-300 shadow-[0_10px_30px_rgba(128,128,0,0.1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(128,128,0,0.2)] hover:border-[rgba(154,173,122,0.4)] dark:bg-gradient-to-br dark:from-[rgba(57,255,20,0.05)] dark:to-[rgba(0,0,0,0.8)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.1)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.2)] dark:hover:border-[rgba(57,255,20,0.4)] [@media(min-width:2560px)]:h-[46rem]">
                <span className="text-[3rem] mb-5 block">
                  <Image
                    src="/images/Parvati's Lap - Luxury Hostel & Villa - TasteOfHome4.png"
                    alt="Parvati's Lap - Luxury Hostel & Villa, Kasol (Parvati Valley), Himachal Pradesh â€” home-style hospitality at ADHIKARA Cafe"
                    width={130}
                    height={130}
                    className="inline w-[130px] h-[130px] [@media(min-width:2560px)]:w-[250px] [@media(min-width:2560px)]:h-[250px]"
                    loading="lazy"
                  />
                </span>
                <h3 className="font-light text-[var(--text-primary)] mb-4 tracking-wider [@media(min-width:2560px)]:text-[3rem]">A Taste of Home</h3>
                <p className="text-[var(--text-secondary)] leading-[1.6] [@media(min-width:2560px)]:text-[28px]">
                  Our team is committed to making you feel like family, serving meals with a hospitality that is as comforting as the food itself.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 text-center transition-all duration-300 shadow-[0_10px_30px_rgba(128,128,0,0.1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(128,128,0,0.2)] hover:border-[rgba(154,173,122,0.4)] dark:bg-gradient-to-br dark:from-[rgba(57,255,20,0.05)] dark:to-[rgba(0,0,0,0.8)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.1)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.2)] dark:hover:border-[rgba(57,255,20,0.4)] [@media(min-width:2560px)]:h-[46rem]">
                <span className="text-[3rem] mb-5 block">
                  <Image
                    src="/images/Parvati's Lap - Luxury Hostel & Villa - PerfectSetting1.png"
                    alt="Parvati's Lap - Luxury Hostel & Villa, Kasol (Parvati Valley), Himachal Pradesh â€” cafe seating with Himalayan views"
                    width={130}
                    height={130}
                    className="inline w-[130px] h-[130px] [@media(min-width:2560px)]:w-[250px] [@media(min-width:2560px)]:h-[250px]"
                    loading="lazy"
                  />
                </span>
                <h3 className="font-light text-[var(--text-primary)] mb-4 tracking-wider [@media(min-width:2560px)]:text-[3rem]">The Perfect Setting</h3>
                <p className="text-[var(--text-secondary)] leading-[1.6] [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem]">
                  Enjoy your meal with an unbeatable view of the Himalayas and starry night with full moons. Our cafe and outdoor seating areas are designed for you to relax, connect with fellow travelers, and savor the peaceful ambiance and enjoy sunrises and sunsets.
                </p>
              </div>
            </div>

            {/* Cafe Gallery */}
            <div className="mb-48">
              <h3 className="text-2xl font-light text-[var(--text-primary)] mb-8 text-center tracking-[0.1em] uppercase relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80px] after:h-[2px] after:bg-[var(--accent)] after:rounded-full dark:after:bg-[#39ff14] [@media(min-width:2560px)]:text-[2.75rem]">Cafe Gallery</h3>
              <Gallery
                images={cafeImages}
                onImageClick={handleImageClick}
                alt="Parvati's Lap - Luxury Hostel & Villa, Lapas Village (Kasol), Parvati Valley, Himachal Pradesh â€” ADHIKARA Cafe photo"
              />
            </div>
          </div>

          {/* Things to Do Section */}
          {showThingsToDo && (
          <div>
            <h2 className="text-3xl font-light text-primary mb-8 text-center [@media(min-width:2560px)]:text-[2.75rem]">
              THINGS TO DO
            </h2>

            <div className="max-w-4xl [@media(min-width:2560px)]:max-w-[112rem] mx-auto mb-12">
              <p className="text-lg leading-[1.8] text-secondary text-center mb-6 [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[4rem]">
                Escape the crowds and discover a true mountain sanctuary, where adventure begins right at your doorstep. We are not just a place to stay; we are your gateway to the unexplored trails, vibrant culture, and breathtaking landscapes of this legendary region.
              </p>

              <h3 className="text-2xl font-light text-primary mb-8 text-center [@media(min-width:2560px)]:text-[2.5rem]">
                Adventure Awaits: Hikes and Treks from Our Doorstep
              </h3>
              <p className="text-lg leading-[1.8] text-secondary text-center [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[4rem]">
                At Parvati&apos;s Lap, you are perfectly positioned to embark on some of the most stunning hikes in the Himalayas. Our location offers unparalleled access to trails that take you far from the beaten path.
              </p>
            </div>

            {/* Trek Cards Gallery */}
            <div 
              className="relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-[24px] p-8 border-2 border-[var(--border-color)] shadow-[0_20px_60px_rgba(128,128,0,0.1)] dark:bg-gradient-to-br dark:from-[rgba(0,0,0,0.8)] dark:to-[rgba(57,255,20,0.05)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_20px_60px_rgba(57,255,20,0.1)] mb-12"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className="absolute top-1/2 -translate-y-1/2 left-5 bg-[#808000] border-2 border-[rgba(154,173,122,0.3)] w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center text-[20px] text-white transition-all duration-300 z-20 backdrop-blur-[10px] hover:bg-[#556b2f] hover:scale-110 hover:shadow-[0_10px_25px_rgba(128,128,0,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-90 dark:bg-[#39ff14] dark:text-black dark:border-[rgba(57,255,20,0.4)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] dark:hover:bg-[#2ecc11] dark:hover:shadow-[0_10px_25px_rgba(57,255,20,0.4)] [@media(min-width:2560px)]:w-[99px] [@media(min-width:2560px)]:h-[99px] [@media(min-width:2560px)]:text-[3rem]"
                onClick={handlePrevClick}
                aria-label="Previous trek"
              >
                &lt;
              </button>
              <button 
                className="absolute top-1/2 -translate-y-1/2 right-5 bg-[#808000] border-2 border-[rgba(154,173,122,0.3)] w-[50px] h-[50px] rounded-full cursor-pointer flex items-center justify-center text-[20px] text-white transition-all duration-300 z-20 backdrop-blur-[10px] hover:bg-[#556b2f] hover:scale-110 hover:shadow-[0_10px_25px_rgba(128,128,0,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-90 dark:bg-[#39ff14] dark:text-black dark:border-[rgba(57,255,20,0.4)] dark:shadow-[0_0_15px_rgba(57,255,20,0.3)] dark:hover:bg-[#2ecc11] dark:hover:shadow-[0_10px_25px_rgba(57,255,20,0.4)] [@media(min-width:2560px)]:w-[99px] [@media(min-width:2560px)]:h-[99px] [@media(min-width:2560px)]:text-[3rem]"
                onClick={handleNextClick}
                aria-label="Next trek"
              >
                &gt;
              </button>

              <div className="flex transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] gap-6" ref={trekTrackRef}>
                {/* Clone items at the end for seamless infinite loop */}
                {treks.map((trek) => (
                  <div key={trek.id} className="trek-card bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-2 border-[var(--border-color)] rounded-[20px] overflow-hidden shrink-0 transition-all duration-300 shadow-[0_10px_30px_rgba(128,128,0,0.15)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(128,128,0,0.25)] dark:bg-gradient-to-br dark:from-[rgba(0,0,0,0.8)] dark:to-[rgba(57,255,20,0.05)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.15)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.25)] !w-[280px] md:!w-[350px] [@media(min-width:2560px)]:!w-[40rem]">
                    <div className="relative overflow-hidden !h-[220px] [@media(min-width:2560px)]:!h-[30rem] [@media(min-width:2560px)]:!w-[40rem]">
                      {trek.image ? (
                        <Image
                          src={trek.image}
                          alt={`Parvati's Lap - Luxury Hostel & Villa, Lapas Village (Kasol), Parvati Valley, Himachal Pradesh â€” ${trek.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 280px, (max-width: 2560px) 350px, 640rem"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)]" />
                      )}
                    </div>
                    <div className="p-6 [@media(min-width:2560px)]:p-16">
                      <h4 className="text-xl font-light text-primary mb-4 [@media(min-width:2560px)]:text-[3rem]">
                        {trek.title}
                      </h4>
                      <p className="accommodation-subtitle [@media(min-width:2560px)]:text-[26px]" style={{ color: '#6b8a6b' }}>{trek.subtitle}</p>
                      <p className="text-secondary leading-relaxed [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem]">
                        {trek.description}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Clone all cards again for seamless loop */}
                {treks.map((trek) => (
                  <div key={`clone-${trek.id}`} className="trek-card bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-2 border-[var(--border-color)] rounded-[20px] overflow-hidden shrink-0 transition-all duration-300 shadow-[0_10px_30px_rgba(128,128,0,0.15)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(128,128,0,0.25)] dark:bg-gradient-to-br dark:from-[rgba(0,0,0,0.8)] dark:to-[rgba(57,255,20,0.05)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.15)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.25)] !w-[280px] md:!w-[350px] [@media(min-width:2560px)]:!w-[40rem]">
                    <div className="relative overflow-hidden !h-[220px] [@media(min-width:2560px)]:!h-[30rem] [@media(min-width:2560px)]:!w-[40rem]">
                      {trek.image ? (
                        <Image
                          src={trek.image}
                          alt={`Parvati's Lap - Luxury Hostel & Villa, Lapas Village (Kasol), Parvati Valley, Himachal Pradesh â€” ${trek.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 280px, (max-width: 2560px) 350px, 640rem"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)]" />
                      )}
                    </div>
                    <div className="p-6 [@media(min-width:2560px)]:p-16">
                      <h4 className="text-xl font-light text-primary mb-4 [@media(min-width:2560px)]:text-[3rem]">
                        {trek.title}
                      </h4>
                      <p className="accommodation-subtitle [@media(min-width:2560px)]:text-[26px]" style={{ color: '#6b8a6b' }}>{trek.subtitle}</p>
                      <p className="text-secondary leading-relaxed [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem]">
                        {trek.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 text-center transition-all duration-300 shadow-[0_10px_30px_rgba(128,128,0,0.1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(128,128,0,0.2)] hover:border-[rgba(154,173,122,0.4)] dark:bg-gradient-to-br dark:from-[rgba(57,255,20,0.05)] dark:to-[rgba(0,0,0,0.8)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.1)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.2)] dark:hover:border-[rgba(57,255,20,0.4)]">
                <Image
                  src="/images/Parvati's Lap - Luxury Hostel & Villa - HostelActivities1.png"
                  alt="Parvati's Lap - Luxury Hostel & Villa, Lapas Village (Kasol), Parvati Valley, Himachal Pradesh â€” hostel activities and common areas"
                  width={120}
                  height={120}
                  className="inline h-[120px] w-[120px] [@media(min-width:2560px)]:h-[16rem] [@media(min-width:2560px)]:w-[16rem]"
                  loading="lazy"
                />
                <h4 className="text-lg font-light text-primary mb-2 [@media(min-width:2560px)]:text-[3rem] [@media(min-width:2560px)]:mb-[3rem]">
                  Hostel Activities
                </h4>
                <p className="text-[var(--text-secondary)] leading-[1.6] [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem] [@media(min-width:2560px)]:mb-[3rem]">
                  Inside the hostel, find your tribe. Our common areas are a haven for travelers to swap stories, play board games, or simply relax by a bonfire under a sky full of stars. We host jam sessions, movie nights, and community events to ensure a vibrant and welcoming atmosphere.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 text-center transition-all duration-300 shadow-[0_10px_30px_rgba(128,128,0,0.1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(128,128,0,0.2)] hover:border-[rgba(154,173,122,0.4)] dark:bg-gradient-to-br dark:from-[rgba(57,255,20,0.05)] dark:to-[rgba(0,0,0,0.8)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.1)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.2)] dark:hover:border-[rgba(57,255,20,0.4)]">
                <Image
                  src="/images/Parvati's Lap - Luxury Hostel & Villa - SpiritualImmersion1.png"
                  alt="Parvati's Lap - Luxury Hostel & Villa, Parvati Valley, Himachal Pradesh â€” spiritual and cultural immersion experiences"
                  width={120}
                  height={120}
                  className="inline h-[120px] w-[120px] [@media(min-width:2560px)]:h-[16rem] [@media(min-width:2560px)]:w-[16rem]"
                  loading="lazy"
                />
                <h4 className="text-lg font-light text-primary mb-2 [@media(min-width:2560px)]:text-[3rem] [@media(min-width:2560px)]:mb-[3rem]">
                  Spiritual and Cultural Immersion
                </h4>
                <p className="text-[var(--text-secondary)] leading-[1.6] [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem] [@media(min-width:2560px)]:mb-[3rem]">
                  Visit ancient temples in Manikaran, meditate by the gushing Parvati River, or simply find a quiet spot to practice yoga. The spiritual energy of the valley is palpable and offers a unique experience for those seeking inner peace.
                </p>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Image Modal for Gallery */}
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






