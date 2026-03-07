import type { Metadata } from "next";
import CafeThingsToDo from "@/components/sections/CafeThingsToDo";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema, generateMetadata } from "@/lib/seo";
import { HeroCard } from "@/components/ui/hero-card";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = generateMetadata({
  title: "ADHIKARA Cafe â€” Best Cafe in Kasol (Parvati Valley)",
  description:
    "ADHIKARA Cafe at Parvatiâ€™s Lap in Lapas Village (near Kasol) is a mountain-view cafe serving wholesome Himachali & Indian food, chai/coffee, and comfort meals â€” perfect after treks in Parvati Valley.",
  keywords: [
    "best cafe in kasol",
    "kasol cafe",
    "parvati valley cafe",
    "cafe in lapas village",
    "cafe near kheerganga",
    "adhikara cafe",
    "parvati's lap cafe",
    "mountain view cafe kasol",
    "food in kasol",
  ],
  path: ROUTES.CAFE,
});

export default function CafePage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Cafe", url: ROUTES.CAFE },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbs} />

      <main className="pt-28">
        <section className="bg-secondary py-16 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-20 [@media(min-width:2560px)]:px-64">
          <div className="max-w-79rem [@media(min-width:2560px)]:max-w-[235rem] mx-auto">
            <HeroCard
              title="CAFE"
              subtitle="Our Cafe: ADHIKARA - A Taste of the Himalayas"
            >
              <div className="max-w-4xl mx-auto mt-10">
                <p className="text-lg leading-[1.8] text-secondary text-center mb-6 [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[4rem]">
                  Perched high on the mountain above Lapas Village, our cafe offers more than just a mealâ€”it&apos;s an experience for the soul. Surrounded by majestic glaciers and the serene Parvati Valley, our traditional restaurant and cafe is a warm and welcoming space where every bite is a tribute to the peaceful surroundings.
                </p>
                <p className="text-lg leading-[1.8] text-secondary text-center [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[4rem]">
                  Based on what our guests have said, our food is a highlight of their stay. We&apos;re known for serving delicious and wholesome meals that perfectly complement a day of trekking and exploration. Whether you&apos;re craving authentic Indian cuisine or a hot cup of tea to warm you up after a trek, we are dedicated to providing a dining experience that feels like home.
                </p>
              </div>
            </HeroCard>
          </div>
        </section>

        {/* Keep homepage section styling on the homepage; on /cafe we hide the internal H1 to avoid duplicate headers */}
        <CafeThingsToDo showHeader={false} showCafeIntro={false} showThingsToDo={false} />
      </main>

      {/*
        LEGACY IMPLEMENTATION (kept for reference)
        ----------------------------------------
        This was the previous dedicated `/cafe` page layout. We now render the shared
        `CafeThingsToDo` section component for consistency with the homepage and to avoid duplication.

        import Image from "next/image";
        import { generateBreadcrumbSchema, generateMetadata, siteConfig } from "@/lib/seo";

        const cafeImages = [
          "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-2.jpg",
          "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-1.jpg",
          "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-4.jpg",
          "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-3.jpg",
          "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-6.jpg",
          "/images/Cafe/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-israli-luxury-wooden-glacier-stone-sarpass-special-brownie--cafe-food-best-glacier-live-music-indian-food-best-sunset-view-cafe-0.jpg",
        ];

        return (
          <>
            <StructuredData data={breadcrumbs} />
            <main className="bg-primary">
              <section className="pt-28 pb-20 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:pt-40 [@media(min-width:2560px)]:pb-24 [@media(min-width:2560px)]:px-64">
                <div className="max-w-79rem mx-auto [@media(min-width:2560px)]:max-w-[235rem]">
                  <header className="text-center mb-12">
                    <h1 className="section-title title-section">ADHIKARA CAFE</h1>
                    <p className="text-lg text-secondary max-w-[900px] mx-auto leading-normal [@media(min-width:2560px)]:text-[2rem] [@media(min-width:2560px)]:max-w-[68rem]">
                      A mountain-view cafe above Lapas Village (near Kasol) â€” warm meals, chai/coffee, and a cozy space to unwind
                      after treks in Parvati Valley.
                    </p>
                  </header>

                  <div className="max-w-4xl [@media(min-width:2560px)]:max-w-[112rem] mx-auto mb-14">
                    <h2 className="text-3xl font-light text-primary mb-4 text-center [@media(min-width:2560px)]:text-[2.75rem]">
                      One of the best cafes in Kasol â€” for food, views, and post-trek comfort
                    </h2>
                    <p className="text-lg leading-[1.8] text-secondary text-center mb-6 [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[4rem]">
                      Perched high on the mountain, ADHIKARA Cafe is part of Parvati&apos;s Lap. Guests come here for wholesome,
                      filling meals, a warm cup of tea, and a peaceful vibe surrounded by glaciers and the Parvati Valley.
                    </p>
                    <p className="text-lg leading-[1.8] text-secondary text-center [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[4rem]">
                      Whether you&apos;re staying with us or visiting during your Kasol trip, this is an easy place to slow down, refuel,
                      and enjoy the mountains.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
                    <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 text-center shadow-[0_10px_30px_rgba(128,128,0,0.10)] dark:bg-gradient-to-br dark:from-[rgba(57,255,20,0.05)] dark:to-[rgba(0,0,0,0.8)] dark:border-[rgba(57,255,20,0.2)]">
                      <h3 className="font-light text-[var(--text-primary)] mb-3 tracking-wider [@media(min-width:2560px)]:text-[3rem]">Mountain-view seating</h3>
                      <p className="text-[var(--text-secondary)] leading-[1.6] [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem]">
                        Views of the Parvati Valley and surrounding peaks â€” especially magical at sunrise and sunset.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 text-center shadow-[0_10px_30px_rgba(128,128,0,0.10)] dark:bg-gradient-to-br dark:from-[rgba(57,255,20,0.05)] dark:to-[rgba(0,0,0,0.8)] dark:border-[rgba(57,255,20,0.2)]">
                      <h3 className="font-light text-[var(--text-primary)] mb-3 tracking-wider [@media(min-width:2560px)]:text-[3rem]">Hearty, wholesome food</h3>
                      <p className="text-[var(--text-secondary)] leading-[1.6] [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem]">
                        Comfort meals that pair perfectly with trekking days â€” simple, satisfying, and made with care.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[20px] p-8 text-center shadow-[0_10px_30px_rgba(128,128,0,0.10)] dark:bg-gradient-to-br dark:from-[rgba(57,255,20,0.05)] dark:to-[rgba(0,0,0,0.8)] dark:border-[rgba(57,255,20,0.2)]">
                      <h3 className="font-light text-[var(--text-primary)] mb-3 tracking-wider [@media(min-width:2560px)]:text-[3rem]">Cozy Himalayan vibe</h3>
                      <p className="text-[var(--text-secondary)] leading-[1.6] [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3rem]">
                        A calm space to read, work, or hang out â€” with warm drinks when the mountain air gets chilly.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                    {cafeImages.map((src) => (
                      <div key={src} className="relative overflow-hidden rounded-[20px] border-2 border-[var(--border-color)] bg-secondary aspect-[4/3]">
                        <Image
                          src={src}
                          alt="ADHIKARA Cafe at Parvati's Lap â€” cafe in Kasol / Parvati Valley"
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                          priority={false}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <a
                      href={siteConfig.links.booking}
                      className="inline-flex items-center justify-center gap-3 bg-[#808000] text-white px-6 py-3 rounded-xl text-sm no-underline hover:bg-[#556b2f] hover:-translate-y-1 transition-all duration-300 font-semibold [@media(min-width:2560px)]:text-[1.75rem] [@media(min-width:2560px)]:py-6 dark:bg-[#39ff14] dark:text-black dark:hover:bg-[#2ecc11]"
                    >
                      Book a stay (Cafe access + views)
                    </a>
                    <div className="mt-4">
                      <a href=\"/contact\" className=\"text-secondary underline underline-offset-4 hover:text-primary transition-colors\">
                        Contact us for cafe timing / menu questions
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </>
        );
      */}
    </>
  );
}




