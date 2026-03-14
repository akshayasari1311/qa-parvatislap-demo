import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import TreksLanding, { type TrekCard } from "@/components/sections/TreksLanding";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema, generateMetadata, generateTreksCollectionSchema } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

function normalizeText(input: string) {
  return input
    .replace(/â€™|â€˜/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/â€“|â€”/g, "-")
    .replace(/â€¦/g, "...")
    .replace(/Â°/g, " degrees")
    .replace(/Â/g, "")
    .replace(/\u00A0/g, " ")
    .trim();
}

function pickTagline(block: string, fallback: string) {
  const lines = block
    .split(/\r?\n/g)
    .map((l) => l.trim())
    .filter(Boolean);

  const star = lines.find((l) => l.startsWith("*"));
  if (star) return normalizeText(star.replace(/^\*\s*/, "").trim());

  // Common pattern: a "headline" line right after the trek name
  const candidate = lines.find((l) => l.length > 12 && !/^map it with image/i.test(l) && !/^\w+\s*Trek/i.test(l));
  if (candidate) {
    return normalizeText(candidate.replace(/<[^>]+>/g, ""));
  }
  return normalizeText(fallback);
}

function pickImage(block: string): string | undefined {
  const m = block.match(/map it with image\s*\(.*?file name\s*-\s*([^)]+)\)/i);
  if (m?.[1]) {
    const file = m[1].trim();
    if (file && !/keep it blank/i.test(file)) return `/images/Trek/${file}`;
  }
  const m2 = block.match(/map it with image\s*\((Parvati's Lap - Luxury Hostel & Villa - [^)]+)\)/i);
  if (m2?.[1]) return `/images/Trek/${m2[1].trim()}`;
  const m3 = block.match(/map it with image\s*\(([^)]+\.(?:jpe?g|png|webp|avif))\)/i);
  if (m3?.[1] && !/keep it blank/i.test(m3[1])) return `/images/Trek/${m3[1].trim()}`;
  return undefined;
}

function loadCards(): TrekCard[] {
  const filePath = path.join(process.cwd(), "public", "content3.txt");
  const text = fs.readFileSync(filePath, "utf8");

  const blocks = text.split(/_{10,}/g).map((b) => b.trim()).filter(Boolean);

  const defs: Array<{ key: RegExp; slug: string; title: string; fallback: string }> = [
    { key: /^Kheerganga Trek/im, slug: "kheerganga", title: "Kheerganga", fallback: "Legends, hot springs, and forest trails." },
    { key: /^Sarpass Trek/im, slug: "sar-pass", title: "Sar Pass", fallback: "Frozen lake lore and high-altitude rites of passage." },
    { key: /^Grahan Trek/im, slug: "grahan", title: "Grahan", fallback: "A secret village trail and old-world mountain culture." },
    { key: /^Chalal Trek/im, slug: "chalal", title: "Chalal", fallback: "Riverside walk, day vibes, and midnight beats." },
    { key: /^Rasol trek/im, slug: "rasol", title: "Rasol", fallback: "A steep climb to magic views above Kasol." },
    { key: /^Malana trek/im, slug: "malana-waichin", title: "Malana -> Waichin", fallback: "Forbidden rules below, freedom above the clouds." },
  ];

  const cards = defs.map((d) => {
    const block = blocks.find((b) => d.key.test(b)) ?? "";
    const tagline = pickTagline(block, d.fallback);
    const imageSrc = pickImage(block);

    return {
      slug: d.slug,
      title: d.title,
      tagline,
      imageSrc,
      imageAlt: `Parvati's Lap Hostel and Villa parvati valley, kasol, Himalayas - ${d.title} trek photo, Himachal Pradesh.`,
    };
  });

  const additionalCards: TrekCard[] = [
    {
      slug: "pin-parvati-pass",
      title: "Pin Parvati Pass",
      tagline: "A demanding Parvati Valley-to-Spiti crossover via Pin Parvati Pass (5,319 m).",
      imageSrc: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-pin-parvati-pass-trek-spiti-high-altitude-glacier-camping.jpg",
      imageAlt: "Pin Parvati Pass trek route, Parvati Valley to Spiti, Himachal Pradesh.",
    },
    {
      slug: "jiwa-nala",
      title: "Jiwa Nala",
      tagline: "A short Grahan-side forest and stream trail ideal for a half-day Himalayan walk.",
      imageSrc: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-jiwa-nala-trek-grahan-pine-forest-stream-camping.jpg",
      imageAlt: "Jiwa Nala trek near Kasol and Grahan, Parvati Valley, Himachal Pradesh.",
    },
    {
      slug: "bhandak-thach",
      title: "Bhandak Thach",
      tagline: "A Pulga-side meadow trek known for alpine camps and wide Parvati Valley views.",
      imageSrc: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-bhandak-thach-trek-swajani-meadows-camping.jpg",
      imageAlt: "Bhandak Thach meadow trek near Kasol, Parvati Valley, Himachal Pradesh.",
    },
    {
      slug: "swajani-biskeri",
      title: "Swajani-Biskeri",
      tagline: "An offbeat Pulga ridge-meadow route to Biskeri Thach with 360-degree mountain views.",
      imageSrc: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-swajani-biskeri-trek-pulga-offbeat-alpine-camping.jpg",
      imageAlt: "Swajani and Biskeri Thach alpine trek in Parvati Valley, Himachal Pradesh.",
    },
    {
      slug: "sargi",
      title: "Sargi Trek",
      tagline: "A moderate local climb for glacier-facing viewpoints above Kasol and Parvati Valley.",
      imageSrc: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-sargi-trek-glacier-viewpoint-forest-trail.jpg",
      imageAlt: "Sargi trek near Kasol with glacier and valley views, Himachal Pradesh.",
    },
    {
      slug: "shikoi",
      title: "Shikoi Hikes",
      tagline: "Easy village-side hikes through farms, forest paths, and local Himalayan culture.",
      imageSrc: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-shikoi-hike-village-trail-terraced-farms-family-trek.jpg",
      imageAlt: "Shikoi local hikes near Kasol and Lapas Village, Himachal Pradesh.",
    },
    {
      slug: "kasol-exploration",
      title: "Kasol Exploration",
      tagline: "A low-effort rest-day outing for Kasol cafes, markets, and Parvati riverside walks.",
      imageSrc: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-kasol-exploration-cafes-israeli-food-nightlife.jpg",
      imageAlt: "Kasol exploration in Parvati Valley, Himachal Pradesh.",
    },
  ];

  return [...cards, ...additionalCards];
}

export const metadata: Metadata = generateMetadata({
  title: "Treks of Parvati Valley (Kasol) - Legends & Trails",
  description:
    "Explore Kheerganga, Sar Pass, Grahan, Chalal, Rasol, and Malana-Waichin. Stories, myths, trail tips, and basecamp guidance from Parvati's Lap in Parvati Valley, Himachal Pradesh.",
  keywords: [
    "parvati valley treks",
    "kasol treks",
    "kheerganga trek",
    "sar pass trek",
    "grahan trek",
    "chalal trek",
    "rasol trek",
    "malana waichin",
  ],
  path: ROUTES.TREKS,
});

export default function TreksPage() {
  const cards = loadCards();

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Treks", url: ROUTES.TREKS },
  ]);
  const treksCollectionSchema = generateTreksCollectionSchema(cards, ROUTES.TREKS);

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <StructuredData data={treksCollectionSchema} />
      <main className="pt-28">
        <TreksLanding cards={cards} />
      </main>
    </>
  );
}

