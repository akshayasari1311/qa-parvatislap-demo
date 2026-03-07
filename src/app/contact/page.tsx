import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  generateBreadcrumbSchema,
  generateMetadata,
  generateContactPointSchema,
  generateOrganizationContactSchema,
  generateLocalBusinessContactSchema,
} from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Contact — Parvati’s Lap (Kasol / Parvati Valley)",
  description:
    "Contact Parvati’s Lap in Lapas Village near Kasol — WhatsApp, phone, email, and location details. Reach out for booking help, cafe questions, or trek planning.",
  keywords: [
    "parvati's lap contact",
    "kasol hostel contact",
    "lapas village contact",
    "kasol stay contact",
    "parvati valley stay contact",
  ],
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  const contactPoint = generateContactPointSchema();
  const organizationContact = generateOrganizationContactSchema();
  const localBusinessContact = generateLocalBusinessContactSchema();

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <StructuredData data={contactPoint} />
      <StructuredData data={organizationContact} />
      <StructuredData data={localBusinessContact} />
      <main className="pt-28">
        <Contact />
      </main>
    </>
  );
}

