"use client";

import { AnimatedTestimonials, type AnimatedTestimonial } from "@/components/ui/animated-testimonials";
import { HeroCard } from "@/components/ui/hero-card";

/**
 * Villa Section/Page Content
 * Content source: currently derived from `public/ai.txt` (villa + USP lines).
 * If you provide an uploaded `content.txt`, this file is designed to be plug-and-play:
 * swap the strings/testimonials below without changing layout logic.
 */
export default function Villa() {
  const testimonials: AnimatedTestimonial[] = [
    {
      quote:
        "Exclusive private villa with 180-degree glacier views and complete seclusion â€” a peaceful Himalayan hideaway for couples and honeymoon stays.",
      name: "Glacier View Suite",
      designation: "Meghbari Luxury Villa â€¢ Parvati Valley, Himachal Pradesh",
      src: "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-1.jpg",
      alt:
        "Parvati's Lap Hostel and Villa parvati valley, kasol, Himalayas - Meghbari Luxury Villa exterior with glacier views, Himachal Pradesh.",
    },
    {
      quote:
        "Wake up to sunrise over snow-capped peaks, spend the day exploring Parvati Valley, and return to private comfort with premium amenities.",
      name: "Sunrise & Serenity",
      designation: "Lapas Village (near Kasol) â€¢ Himalayan mountain stay",
      src: "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-2.jpg",
      alt:
        "Parvati's Lap Hostel and Villa parvati valley, kasol, Himalayas - Sunrise light on snow-capped peaks from the villa, Himachal Pradesh.",
    },
    {
      quote:
        "Designed for true quiet: panoramic valley air, warm interiors, and a stay that feels far from the crowds â€” yet close to Kasol and treks.",
      name: "Seclusion with Access",
      designation: "Base for Kheerganga, Sar Pass, and Parvati Valley trails",
      src: "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-3.jpg",
      alt:
        "Parvati's Lap Hostel and Villa parvati valley, kasol, Himalayas - Private villa views and calm mountain atmosphere, Himachal Pradesh.",
    },
    {
      quote:
        "A luxury villa stay that still feels authentic to Himachal â€” mountain textures, clean comfort, and the calm energy of Parvati Valley.",
      name: "Authentic Luxury",
      designation: "Kasol, Parvati Valley â€¢ Himachali mountain architecture vibe",
      src: "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-4.jpg",
      alt:
        "Parvati's Lap Hostel and Villa parvati valley, kasol, Himalayas - Luxury villa interiors with Himalayan design, Himachal Pradesh.",
    },
    {
      quote:
        "Perfect for photography and stargazing: wide open skies, glacier silhouettes, and unforgettable nights in the Himalayas.",
      name: "Stars & Stillness",
      designation: "Stargazing â€¢ Photography â€¢ Mountain nights",
      src: "/images/MeghbariVilla/parvatis-lap-hostel-villa-himalayas-kasol-tosh-mountain-offbeat-villa-luxury-wooden-homestay-kheerganga-camps-view-villa-5.jpg",
      alt:
        "Parvati's Lap Hostel and Villa parvati valley, kasol, Himalayas - Night ambience and mountain sky near Meghbari Villa, Himachal Pradesh.",
    },
  ];

  return (
    <section className="bg-secondary py-24 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px-64">
      <div className="max-w-79rem [@media(min-width:2560px)]:max-w-[235rem] mx-auto">
        {/*
          Legacy header layout (kept for plug-and-play rollback)
          <div className="text-center mb-12">
            <h1 className="section-title title-section">Meghbari Luxury Villa</h1>
            <p className="text-lg text-secondary max-w-[760px] mx-auto leading-normal [@media(min-width:2560px)]:text-[2rem] [@media(min-width:2560px)]:max-w-[70rem]">
              Meghbari Luxury Villa at Parvati&apos;s Lap â€” a private Himalayan stay in Lapas Village near Kasol, with glacier and valley views,
              calm seclusion, and easy access to Parvati Valley treks.
            </p>
          </div>
        */}

        <div className="mb-14">
          <HeroCard
            title="MEGHBARI LUXURY VILLA"
            subtitle="Private Himalayan villa stay near Kasol"
            description="Glacier and valley views, calm seclusion, and easy access to Parvati Valley treksâ€”crafted for couples and slow mountain mornings."
          />
        </div>

        <div className="max-w-6xl [@media(min-width:2560px)]:max-w-[140rem] mx-auto">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>

        <div className="max-w-4xl [@media(min-width:2560px)]:max-w-[112rem] mx-auto mt-14">
          <h2 className="text-2xl font-light text-[var(--text-primary)] mb-6 tracking-[0.08em] uppercase text-center [@media(min-width:2560px)]:text-[2.75rem]">
            Why choose Meghbari Villa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 shadow-[0_10px_30px_rgba(128,128,0,0.1)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.08)]">
              <h3 className="font-light text-[var(--text-primary)] mb-3 tracking-wider">Glacier & valley views</h3>
              <p className="text-[var(--text-secondary)] leading-[1.7]">
                180-degree glacier and Parvati Valley panoramas â€” sunrise, golden hour, and crisp mountain air, right from your private stay.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 shadow-[0_10px_30px_rgba(128,128,0,0.1)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.08)]">
              <h3 className="font-light text-[var(--text-primary)] mb-3 tracking-wider">Romantic, quiet, premium</h3>
              <p className="text-[var(--text-secondary)] leading-[1.7]">
                A secluded villa experience crafted for couples and honeymoon travelersâ€”privacy, comfort, and peaceful Himalayan nights.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 shadow-[0_10px_30px_rgba(128,128,0,0.1)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.08)]">
              <h3 className="font-light text-[var(--text-primary)] mb-3 tracking-wider">Trek-ready location</h3>
              <p className="text-[var(--text-secondary)] leading-[1.7]">
                Close to Kasol and perfectly positioned for Parvati Valley adventures like Kheerganga, Sar Pass, and local hikes starting near the property.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 shadow-[0_10px_30px_rgba(128,128,0,0.1)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.08)]">
              <h3 className="font-light text-[var(--text-primary)] mb-3 tracking-wider">Cafe on-site</h3>
              <p className="text-[var(--text-secondary)] leading-[1.7]">
                Enjoy hearty meals at ADHIKARA Cafe â€” perfect after a hike, with warm hospitality and Himalayan views.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


