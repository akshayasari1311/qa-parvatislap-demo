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
              description="Capture the breathtaking beauty of Parvati’s Lap and the surrounding Himalayas — mountain light, valley air, and calm moments above Lapas Village near Kasol."
            />
          </div>
        </section>

        {/* Keep homepage section styling on the homepage; on /views we hide the internal H1 to avoid duplicate headers */}
        <Views showHeader={false} />
      </main>
    </>
  );
}

