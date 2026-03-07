import type { Metadata } from "next";
import Villa from "@/components/sections/Villa";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema, generateMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = generateMetadata({
  title: "Meghbari Luxury Villa in Kasol (Parvati Valley)",
  description:
    "Stay at Meghbari Luxury Villa by Parvati's Lap in Lapas Village near Kasol — a private Himalayan villa with glacier views, premium comfort, and a calm base for Parvati Valley treks.",
  keywords: [
    "kasol villa",
    "luxury villa kasol",
    "meghbari villa",
    "parvati valley villa",
    "lapas village stay",
    "honeymoon villa himachal",
    "glacier view villa",
  ],
  path: ROUTES.VILLA,
});

export default function VillaPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Villa", url: ROUTES.VILLA },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <main className="pt-28">
        <Villa />
      </main>
    </>
  );
}

