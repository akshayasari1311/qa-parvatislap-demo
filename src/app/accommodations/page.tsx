import type { Metadata } from "next";
import Accommodations from "@/components/sections/Accommodations";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema, generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Hostel & Villa Accommodations in Kasol (Parvati Valley)",
  description:
    "Explore Parvati’s Lap accommodations in Lapas Village near Kasol — luxury villa, private rooms, and dorm stays with mountain views. A calm base for treks in Parvati Valley.",
  keywords: [
    "kasol hostel",
    "kasol villa",
    "kasol accommodation",
    "parvati valley stay",
    "lapas village stay",
    "hostel in kasol",
    "villa in kasol",
    "kheerganga base stay",
  ],
  // Keep this route for backward compatibility, but canonicalize to the new URL.
  path: "/hostel-villa",
});

export default function AccommodationsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Hostel & Villa", url: "/hostel-villa" },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <main className="pt-28">
        <Accommodations />
      </main>
    </>
  );
}

