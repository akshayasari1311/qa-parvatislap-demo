"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * HomeContent Component
 * Main content section with introduction
 * Appears with fade-in animation when scrolled into view
 * Extracted from legacy-index.html (lines 1652-1675)
 */
export default function HomeContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-primary pt-16 pb-6 px-10 sm:px-14 md:px-20 lg:px-29 xl:px-40 2xl:px-60 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px_120 transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-79rem mx-auto [@media(min-width:2560px)]:max-w-[235rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="block text-[36px] font-light tracking-wide text-olive-light uppercase mb-4 [@media(min-width:2560px)]:text-[5rem] [@media(min-width:2560px)]:mb-8 [@media(min-width:2560px)]:tracking-[0.05em]">
              WELCOME TO PARADISE
            </span>
            <h2 className="text-[20px] block font-light tracking-wider text-primary mb-8 [@media(min-width:2560px)]:text-[2.5rem]">
              Where Mountains Meet Luxury
            </h2>

            <p className="text-lg leading-[1.8] text-secondary mb-6 [@media(min-width:2560px)]:text-[2rem] [@media(min-width:2560px)]:leading-[2] [@media(min-width:2560px)]:mb-[2rem]">
              Parvati&apos;s Lap Hostel & Villa is the ideal starting point for your adventures. Wake up to the fresh mountain air, then set out to explore nearby treks, vibrant villages, and cascading waterfalls across the mountain. After a day of adventure, return to our peaceful retreat to relax by a bonfire, share stories with fellow travelers, and gaze at a sky full of stars untouched by city lights.
            </p>

            <p className="text-lg leading-[1.8] text-secondary mb-6 [@media(min-width:2560px)]:text-[2rem] [@media(min-width:2560px)]:leading-[2] [@media(min-width:2560px)]:mb-[2rem]">
              We are committed to providing a space that feels both secluded and connected. Our dedication to a high-quality guest experience, combined with our stunning location, makes Parvati&apos;s Lap the premier choice for your Himalayan adventure.
            </p>
          </div>

          <div className="sticky top-[100px] h-fit [@media(min-width:2560px)]:top-[120px]">
            <div className="h-96 [@media(min-width:2560px)]:h-[42rem] rounded-xl overflow-hidden relative">
              <Image
                src="/images/home/parvatis-lap-hostel-villa-himalayas-kasol-lapas-mountain-offbeat-camps-homestay-kheerganga-pulga-tosh-view-home.jpg"
                alt="Parvati's Lap - Luxury Hostel & Villa, Lapas Village (Kasol), Parvati Valley, Himachal Pradesh — mountain view near the property"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


