import type { Metadata } from "next";
import Views from "@/components/sections/Views";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema, generateMetadata } from "@/lib/seo";
import { HeroCard } from "@/components/ui/hero-card";

export const metadata: Metadata = generateMetadata({
  title: "Himalayan Views in Kasol (Parvati Valley) — Photos",
  description:
    "Explore Himalayan views from Parvati’s Lap above Lapas Village near Kasol — valley panoramas, mountain light, and peaceful scenery in Parvati Valley.",
  keywords: [
    "kasol views",
    "parvati valley views",
    "lapas village views",
    "himalayan views kasol",
    "parvati's lap photos",
  ],
  path: "/views",
});

export default function ViewsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Views", url: "/views" },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <main className="pt-28">
        <section className="bg-secondary py-16 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-20 [@media(min-width:2560px)]:px-64">
          <div className="max-w-79rem [@media(min-width:2560px)]:max-w-[235rem] mx-auto">
            <HeroCard
              title="VIEWS"
              subtitle="Himalayan panoramas above Parvati Valley"
             // description="Capture the breathtaking beauty of Parvati’s Lap and the surrounding Himalayas — mountain light, valley air, and calm moments above Lapas Village near Kasol."
            description="At Parvati’s Lap, the views are one of the most unforgettable parts of the experience. Located high above Lapas Village near Kasol in the beautiful Parvati Valley, the property offers breathtaking panoramas of the surrounding Himalayan mountains, forests, and valleys.

From sunrise to sunset, guests can enjoy changing mountain landscapes filled with soft golden light, drifting clouds, and fresh valley air. Early mornings reveal peaceful Himalayan horizons while evenings bring colorful sunsets over the snow-covered peaks.

The location provides a perfect vantage point to capture the natural beauty of Himachal Pradesh. Travelers often spend quiet moments on balconies, open terraces, or nearby viewpoints simply watching the mountains and enjoying the calm atmosphere of the valley.

Many visitors say that the views alone make their stay memorable. The combination of fresh mountain air, wide open landscapes, and the peaceful environment above Parvati Valley creates a perfect place to relax and reconnect with nature.

Whether you are enjoying morning tea, returning after a trek, or watching the sunset over the mountains, the panoramic views at Parvati’s Lap offer a truly special Himalayan experience near Kasol."
            />
          </div>
        </section>

        {/* Keep homepage section styling on the homepage; on /views we hide the internal H1 to avoid duplicate headers */}
        <Views showHeader={false} />
      </main>
    </>
  );
}

