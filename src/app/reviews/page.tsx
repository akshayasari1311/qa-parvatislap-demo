import type { Metadata } from "next";
import Reviews from "@/components/sections/Reviews";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema, generateMetadata } from "@/lib/seo";
import { HeroCard } from "@/components/ui/hero-card";

export const metadata: Metadata = generateMetadata({
  title: "Guest Reviews — Parvati’s Lap (Kasol / Parvati Valley)",
  description:
    "Read guest reviews for Parvati’s Lap — a luxury hostel & villa stay above Lapas Village near Kasol. See what guests say about views, cafe food, hospitality, and treks.",
  keywords: [
    "parvati's lap reviews",
    "kasol hostel reviews",
    "kasol villa reviews",
    "parvati valley stay reviews",
    "lapas village hostel reviews",
  ],
  path: "/reviews",
});

export default function ReviewsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Reviews", url: "/reviews" },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <main className="pt-28">
        <section className="bg-secondary py-16 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-20 [@media(min-width:2560px)]:px-64">
          <div className="max-w-79rem [@media(min-width:2560px)]:max-w-[235rem] mx-auto">
            <HeroCard
              title="REVIEWS"
              subtitle="What our guests are saying"
              // description="Real guest experiences at Parvati’s Lap — views, cafe food, hospitality, and the calm mountain vibe above Lapas Village near Kasol."
           description="At Parvati’s Lap, every stay comes with unforgettable views, warm hospitality, and a peaceful mountain atmosphere. Our guests often share how their experience here goes beyond just accommodation — it becomes a memorable part of their journey through Parvati Valley.

Travelers visiting from across India and around the world frequently highlight the breathtaking views of the Himalayas, the relaxing environment above Lapas Village, and the friendly community vibe that makes Parvati’s Lap feel like a home in the mountains.

Many guests also love the combination of comfortable hostel stays, delicious food from our café, and easy access to some of the best trekking routes near Kasol such as Kheerganga, Grahan, and Rasol. After a day of exploring forests, villages, and mountain trails, returning to a peaceful stay with great food and welcoming people becomes the highlight of their trip.

Visitors often mention the calm surroundings, fresh mountain air, and stunning sunrise and sunset views over Parvati Valley as some of the most special parts of their experience.

These reviews and stories from our guests continue to inspire us to provide a warm, authentic Himalayan stay where travelers can relax, explore, and create lasting memories in the heart of Himachal Pradesh."
           />
          </div>
        </section>

        {/* Keep homepage section styling on the homepage; on /reviews we hide the internal H1 to avoid duplicate headers */}
        <Reviews showHeader={false} />
      </main>
    </>
  );
}

