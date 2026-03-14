import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  generateBreadcrumbSchema,
  generateMetadata as generateSeoMetadata,
  generateTrekDetailSchema,
} from "@/lib/seo";
import { ROUTES, trekDetailPath } from "@/lib/routes";

type TrekDef = {
  slug: string;
  title: string;
  key?: RegExp;
};

const TREKS: TrekDef[] = [
  { slug: "kheerganga", title: "Kheerganga Trek", key: /^Kheerganga Trek/im },
  { slug: "sar-pass", title: "Sar Pass Trek", key: /^Sarpass Trek/im },
  { slug: "grahan", title: "Grahan Trek", key: /^Grahan Trek/im },
  { slug: "chalal", title: "Chalal Trek", key: /^Chalal Trek/im },
  { slug: "rasol", title: "Rasol Trek", key: /^Rasol trek/im },
  { slug: "malana-waichin", title: "Malana -> Waichin", key: /^Malana trek/im },
  { slug: "pin-parvati-pass", title: "Pin Parvati Pass Trek" },
  { slug: "jiwa-nala", title: "Jiwa Nala Trek", key: /^Jiwa Nala Trek/im },
  { slug: "bhandak-thach", title: "Bhandak Thach Trek", key: /^Bhandak Thach Trek/im },
  { slug: "swajani-biskeri", title: "Swajani-Biskeri Trek", key: /^Swajani-Biskeri Trek/im },
  { slug: "sargi", title: "Sargi Trek", key: /^Sargi Trek/im },
  { slug: "shikoi", title: "Shikoi Hikes", key: /^Shikoi Hikes/im },
  { slug: "kasol-exploration", title: "Kasol Exploration", key: /^Kasol Exploration/im },
];

const STATIC_TREKS: Record<string, { subtitle: string; body: string[]; image?: string }> = {
  "pin-parvati-pass": {
    subtitle: "Deep in the heart of the Indian Himalayas lies one of the most challenging and rewarding trekking routes in Himachal Pradesh — the Pin Parvati Pass Trek. This legendary trail connects the lush green Parvati Valley with the cold desert landscapes of Spiti Valley, creating one of the most dramatic trekking experiences in the Himalayas.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-pin-parvati-pass-trek-spiti-high-altitude-glacier-camping.jpg",
    body: [
        "Beyond Kasol: The Legendary Pin Parvati Pass Trek (One of the Toughest Himalayan Adventures)",
        "Deep in the heart of the Indian Himalayas lies one of the most challenging and rewarding trekking routes in Himachal Pradesh — the Pin Parvati Pass Trek. This legendary trail connects the lush green Parvati Valley with the cold desert landscapes of Spiti Valley, creating one of the most dramatic trekking experiences in the Himalayas.",
        "Starting from the beautiful town of Barshaini near Kasol, the Pin Parvati Pass Trek takes adventurers through dense forests, alpine meadows, glacial rivers, and massive mountain passes before finally reaching the remote Pin Valley in Spiti.",
        "Unlike shorter treks like Kheerganga or Chalal, the Pin Parvati Pass Trek is a true expedition that tests endurance and determination while offering breathtaking views of untouched Himalayan wilderness.",
        "The Trail: From Parvati Valley to the Spiti Desert",
        "Starting Point: Barshaini (near Kasol)",
        "Difficulty: Difficult",
        "Duration: 9–11 Days",
        "The Pin Parvati Pass Trek begins from Barshaini village in Parvati Valley, the same starting point for the Kheerganga Trek. The trail initially follows the Parvati River as it winds through dense forests and green mountain landscapes.",
        "Trekkers gradually move deeper into the valley, passing through beautiful campsites such as Kheerganga, Tunda Bhuj, and Thakur Kuan. Each campsite offers incredible views of glaciers, waterfalls, and towering Himalayan peaks.",
        "As the trek progresses, the terrain becomes more rugged and challenging. Trekkers must cross icy rivers, walk across glacier fields, and climb steep mountain slopes before finally reaching the high altitude Pin Parvati Pass at around 5,300 meters above sea level.",
        "The Highlight: Crossing the Pin Parvati Pass",
        "The most thrilling moment of the journey is crossing the Pin Parvati Pass itself. Standing at over 5,300 meters, the pass offers breathtaking views of snow-covered Himalayan mountains stretching across both Parvati Valley and Spiti Valley.",
        "The landscape changes dramatically on the other side of the pass. The lush green forests of Parvati Valley slowly transform into the barren, high-altitude desert terrain of Spiti.",
        "This dramatic transition between two completely different Himalayan landscapes makes the Pin Parvati Pass Trek one of the most unique trekking experiences in India.",
        "Camping on the Pin Parvati Pass Trek",
        "Unlike village treks in Parvati Valley, the Pin Parvati Pass Trek is a full camping expedition that requires proper trekking equipment and experienced guides.",
        "If you are planning the Pin Parvati Pass Trek, here is what the experience usually includes.",
        "1. The Experience",
        "Trekkers spend several nights camping at remote locations such as Kheerganga, Tunda Bhuj, Odi Thach, and Mantalai Lake. Each campsite offers stunning views of glaciers, mountain rivers, and untouched Himalayan landscapes.",
        "The trek offers a rare opportunity to explore some of the most remote regions of the Indian Himalayas.",
        "2. The Food",
        "Meals during the expedition are usually prepared by the trekking team. Trekkers are served warm, energy-rich meals including rice, dal, vegetables, soups, and tea to maintain energy during the long trekking days.",
        "3. Guided Expeditions",
        "Because of the high altitude and challenging terrain, most trekkers complete the Pin Parvati Pass Trek through organized trekking groups with experienced mountain guides and support teams.",
        "Typical trekking packages range from ₹25,000 to ₹40,000 depending on the services and expedition duration.",
        "Digital Detox: Deep in the Himalayan Wilderness",
        "Once the trek moves beyond Barshaini and deeper into the Parvati Valley, mobile networks completely disappear. The journey becomes a true wilderness adventure where trekkers are surrounded only by mountains, glaciers, and rivers.",
        "Without modern distractions, the trek becomes a powerful experience of nature, silence, and exploration in the high Himalayas.",
        "Quick Guide for the Traveler",
        "Best Time to Visit",
        "July to September – The most suitable season when the pass is accessible and weather conditions are relatively stable.",
        "What to Carry",
        "High-quality trekking shoes, thermal clothing, gloves, sunglasses, sunscreen, trekking poles, and a good backpack are essential for this high-altitude expedition.",
        "Respect the Mountains",
        "Always follow the instructions of trekking guides, avoid littering in the fragile mountain environment, and respect the natural ecosystem of the Himalayas.",
        "Why Pin Parvati Pass Is One of the Greatest Himalayan Treks",
        "Among all treks in Himachal Pradesh, the Pin Parvati Pass Trek is considered one of the most legendary adventures. The journey connects the green forests of Parvati Valley with the cold desert of Spiti Valley through glaciers, rivers, and high mountain passes.",
        "For experienced trekkers seeking a true Himalayan expedition, the Pin Parvati Pass Trek offers one of the most unforgettable journeys in the entire Indian Himalayas."
    ]
  },
  "jiwa-nala": {
    subtitle: "3-4 hrs | ~6 km | A low-crowd forest trail near Grahan with clear mountain stream sections.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-jiwa-nala-trek-grahan-pine-forest-stream-camping.jpg",
    body: [],
  },
  "bhandak-thach": {
    subtitle: "2 days | ~15 km | A Pulga-side meadow trek to broad alpine camps in upper Parvati Valley.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-bhandak-thach-trek-swajani-meadows-camping.jpg",
    body: [],
  },
  "swajani-biskeri": {
    subtitle: "2-3 days | ~18 km | An offbeat Pulga-side meadow circuit to Biskeri with wide ridge panoramas.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-swajani-biskeri-trek-pulga-offbeat-alpine-camping.jpg",
    body: [],
  },
  sargi: {
    subtitle: "3 hrs | ~5 km | A moderate Kasol-side climb with glacier-facing and valley-wide viewpoints.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-sargi-trek-glacier-viewpoint-forest-trail.jpg",
    body: [],
  },
  shikoi: {
    subtitle: "30-60 mins | Easy | Local hikes through village trails, farms, and Parvati Valley culture.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-shikoi-hike-village-trail-terraced-farms-family-trek.jpg",
    body: [],
  },
  "malana-waichin": {
    subtitle: "1.5-2 hrs | Moderate to Steep | A culture-and-meadow route from Malana side to Waichin Valley.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-malana-waichin-trek-magic-valley-camping-himalayan-views.jpg",
    body: [
      "Malana gives you the mystery. Waichin gives you the open sky. Together, they make one of Parvati Valley's most iconic offbeat combinations.",
      "The Trek: Malana Side Access to Waichin (Magic Valley)",
      "Starting Point: Malana gate / roadhead side approach",
      "Difficulty: Moderate to Steep",
      "Duration: 1.5-2 hours to Waichin camps (varies by trail and load)",
      "Approx Distance: Short mountain ascent from Malana side",
      "Most travelers first pass through Malana's restricted cultural zone rules, then continue upward to Waichin meadows for camping and long Himalayan ridge views.",
      "Cultural Note",
      "In Malana, respect local customs. Avoid touching temples or private structures, and always ask before photographing residents.",
      "Why Waichin",
      "Waichin Valley is preferred for open meadow camping, stargazing, and quieter mountain nights above the main valley bustle.",
      "Planning Tip",
      "Carry cash, warm layers, and enough water. Trail conditions and weather can shift quickly in shoulder and winter months.",
    ],
  },
  "kasol-exploration": {
    subtitle: "1 hr journey | A low-effort Kasol outing for cafes, markets, riverside walks, and local culture.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-kasol-exploration-cafes-israeli-food-nightlife.jpg",
    body: [],
  },
};

const STATIC_TREK_META: Record<string, { description: string; keywords: string[] }> = {
  "pin-parvati-pass": {
    description:
      "Pin Parvati Pass Trek guide from Kasol and Parvati Valley: route overview, elevation (~5,319 m), Spiti crossover notes, and planning essentials in Himachal Pradesh.",
    keywords: ["pin parvati pass trek", "parvati valley to spiti trek", "himachal high altitude trek", "kasol trek guide"],
  },
  "jiwa-nala": {
    description:
      "Jiwa Nala Trek guide near Grahan and Kasol in Parvati Valley with route character, timing, and practical planning tips for a short Himachal hike.",
    keywords: ["jiwa nala trek", "grahan trek route", "kasol short trek", "parvati valley day hike"],
  },
  "bhandak-thach": {
    description:
      "Bhandak Thach Trek guide from Pulga side in Parvati Valley: meadow camps, duration options, and local planning tips for offbeat trekking in Himachal.",
    keywords: ["bhandak thach trek", "pulga meadow trek", "parvati valley camping trek", "offbeat kasol treks"],
  },
  "swajani-biskeri": {
    description:
      "Swajani-Biskeri Trek guide from Pulga, Parvati Valley with meadow route overview, 2-3 day planning context, and high-ridge viewpoint highlights.",
    keywords: ["swajani biskeri trek", "biskeri thach trek", "pulga offbeat trek", "parvati valley meadow trek"],
  },
  sargi: {
    description:
      "Sargi Trek guide near Kasol and Lapas in Parvati Valley, covering route profile, viewpoint highlights, and practical half-day planning advice.",
    keywords: ["sargi trek kasol", "lapas trek", "parvati valley viewpoint trek", "kasol half day trek"],
  },
  shikoi: {
    description:
      "Shikoi Hikes guide near Kasol in Parvati Valley with beginner-friendly village trails, farm routes, and easy Himalayan walking suggestions.",
    keywords: ["shikoi hikes", "kasol village hike", "parvati valley easy trek", "family trek kasol"],
  },
  "malana-waichin": {
    description:
      "Malana to Waichin Valley trek guide from Kasol side with cultural rules, route profile, duration context, and practical camping notes for Parvati Valley.",
    keywords: ["malana waichin trek", "magic valley trek", "malana village rules", "offbeat kasol trek"],
  },
  "kasol-exploration": {
    description:
      "Kasol Exploration guide for Parvati Valley travelers: cafes, market walks, riverside experiences, and rest-day planning between Himachal treks.",
    keywords: ["kasol exploration", "kasol cafes and market", "parvati valley travel guide", "kasol rest day"],
  },
};

function normalizeText(input: string) {
  return input
    .replace(/â€™|â€˜/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/â€“|â€”|â€"/g, "-")
    .replace(/â€¦/g, "...")
    .replace(/â‚¹/g, "Rs ")
    .replace(/Ã¢â‚¬â„¢|Ã¢â‚¬Ëœ/g, "'")
    .replace(/Ã¢â‚¬Å“|Ã¢â‚¬Â/g, '"')
    .replace(/Ã¢â‚¬â€œ|Ã¢â‚¬â€/g, "-")
    .replace(/Ã¢â‚¬Â¦/g, "...")
    .replace(/Ã‚Â°/g, " degrees")
    .replace(/Ã‚/g, "")
    .replace(/ /g, " ")
    .trim();
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

function pickSubtitle(block: string) {
  const stripTags = (value: string) =>
    value
      .replace(/^<(header|sub-header|mini-header|list|p)>/i, "")
      .replace(/<\/(header|sub-header|mini-header|list|p)>$/i, "")
      .replace(/:contentReference\[[^\]]+\]\{[^}]+\}/g, "")
      .trim();

  const lines = block
    .split(/\r?\n/g)
    .map((l) => l.trim())
    .filter(Boolean);

  const star = lines.find((l) => l.startsWith("*"));
  if (star) return normalizeText(stripTags(star.replace(/^\*\s*/, "").trim()));

  const candidate = lines.find((l) => l.length > 12 && !/^map it with image/i.test(l) && !/^\w+\s*Trek/i.test(l));
  return normalizeText(stripTags(candidate ?? "Legends, trails, and alpine stories-crafted for the curious."));
}

function extractBody(block: string) {
  const rawLines = block.split(/\r?\n/g);
  const cleaned: string[] = [];
  for (const l of rawLines) {
    const line = l.trim();
    if (!line) {
      cleaned.push("");
      continue;
    }
    if (/^map it with image/i.test(line)) continue;
    if (/^_{10,}/.test(line)) continue;
    if (/^\*\s+/.test(line)) continue;
    if (/^(Kheerganga Trek|Sarpass Trek|Grahan Trek|Chalal Trek|Rasol trek|Malana trek)/i.test(line)) continue;
    cleaned.push(l);
  }

  const blocks: Array<{ type: "h1" | "h2" | "h3" | "p" | "li" | "spacer"; text: string }> = [];
  const paras = cleaned
    .join("\n")
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean);

  for (const p of paras) {
    const lines = p.split(/\r?\n/g).map((x) => x.trim()).filter(Boolean);
    for (const ln of lines) {
      const tagged = ln.match(/^<(header|sub-header|mini-header|list|p)>([\s\S]*?)<\/\1>$/i);
      if (tagged) {
        const [, tag, rawText] = tagged;
        const text = normalizeText(rawText.replace(/:contentReference\[[^\]]+\]\{[^}]+\}/g, "").trim());
        if (!text) continue;
        if (tag === "header") {
          blocks.push({ type: "h1", text });
        } else if (tag === "sub-header") {
          blocks.push({ type: "h2", text });
        } else if (tag === "mini-header") {
          blocks.push({ type: "h3", text });
        } else if (tag === "list") {
          blocks.push({ type: "li", text });
        } else {
          blocks.push({ type: "p", text });
        }
        continue;
      }
      if (ln.startsWith("*")) {
        blocks.push({ type: "li", text: normalizeText(ln.replace(/^\*\s*/, "").trim()) });
      } else if (ln.endsWith(":") && ln.length < 80) {
        blocks.push({ type: "h2", text: normalizeText(ln.replace(/:$/, "")) });
      } else if (/^_{6,}$/.test(ln)) {
        continue;
      } else {
        blocks.push({ type: "p", text: normalizeText(ln) });
      }
    }
    blocks.push({ type: "spacer", text: "" });
  }

  const out: typeof blocks = [];
  for (const b of blocks) {
    if (b.type === "spacer") {
      if (out.length === 0) continue;
      const prev = out[out.length - 1]!;
      if (prev.type === "spacer") continue;
    }
    out.push(b);
  }
  return out;
}

function looksLikeHeading(text: string) {
  const t = text.trim();
  if (t.length < 14 || t.length > 110) return false;
  if (/^(\*|_)/.test(t)) return false;
  if (/^\d+\./.test(t)) return false;
  if (/[.!?]$/.test(t)) return false;
  if (t.includes(":")) return true;
  const words = t.split(/\s+/g);
  if (words.length <= 10) return true;
  return false;
}

function loadBlock(def: TrekDef) {
  if (!def.key) return null;
  const filePath = path.join(process.cwd(), "public", "content3.txt");
  const text = fs.readFileSync(filePath, "utf8");
  const blocks = text.split(/_{10,}/g).map((b) => b.trim()).filter(Boolean);
  return blocks.find((b) => def.key!.test(b)) ?? null;
}

export function generateStaticParams() {
  return TREKS.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: unknown }): Promise<Metadata> {
  const { slug } = (await Promise.resolve(params)) as { slug?: string };
  const def = TREKS.find((t) => t.slug === slug);
  if (!def) return {};
  const staticMeta = slug ? STATIC_TREK_META[slug] : undefined;

  return generateSeoMetadata({
    title: `${def.title} - Parvati Valley (Kasol) Trek Guide`,
    description:
      staticMeta?.description ??
      `Explore ${def.title}: legends, trail tips, and basecamp guidance for Parvati Valley. Start your journey from Parvati's Lap near Kasol, Himachal Pradesh.`,
    keywords: staticMeta?.keywords ?? ["parvati valley treks", "kasol treks", def.title.toLowerCase(), "himachal trek guide"],
    path: trekDetailPath(slug ?? ""),
  });
}

export default async function TrekDetailPage({ params }: { params: unknown }) {
  const { slug } = (await Promise.resolve(params)) as { slug?: string };
  const def = TREKS.find((t) => t.slug === slug);
  if (!def) notFound();

  const block = loadBlock(def);
  const staticTrek = STATIC_TREKS[def.slug];
  if (!block && !staticTrek) notFound();
  const preferStatic = false;
  const useStatic = Boolean(staticTrek && (preferStatic || !block));

  const subtitle = useStatic ? staticTrek!.subtitle : pickSubtitle(block!);
  const imageSrc = useStatic ? staticTrek!.image : pickImage(block!);
  const body = useStatic
    ? staticTrek!.body.flatMap((text) => [{ type: "p" as const, text }, { type: "p" as const, text: "" }])
    : extractBody(block!);
  const summaryParagraph = body.find((item) => item.type === "p" && item.text.trim().length > 0)?.text;
  const canonicalPath = trekDetailPath(slug ?? "");

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Treks", url: ROUTES.TREKS },
    { name: def.title, url: canonicalPath },
  ]);
  const trekDetailSchema = generateTrekDetailSchema({
    slug: def.slug,
    title: def.title,
    subtitle,
    description: summaryParagraph,
    imageSrc,
    canonicalPath,
  });

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <StructuredData data={trekDetailSchema} />
      <main className="pt-28">
        <section className="bg-secondary py-16 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60">
          <div className="max-w-79rem mx-auto">
            <div className="mb-6">
              <Link
                href={ROUTES.TREKS}
                className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--text-secondary)] hover:text-forest-green transition-colors"
                aria-label="Back to Treks"
              >
                <span className="text-xl leading-none">&larr;</span>
                Back to Treks
              </Link>
            </div>

            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0 overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[0_22px_70px_rgba(0,0,0,0.10)] dark:shadow-[0_22px_70px_rgba(0,0,0,0.40)]">
                <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:min-h-[420px] bg-[var(--bg-secondary)]">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={`Parvati's Lap Hostel and Villa parvati valley, kasol, Himalayas - ${def.title} hero image, Himachal Pradesh.`}
                      fill
                      quality={100}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                      priority={false}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(154,173,122,0.25),transparent_55%),radial-gradient(circle_at_70%_50%,rgba(57,255,20,0.10),transparent_60%),linear-gradient(135deg,rgba(0,0,0,0.02),rgba(0,0,0,0.08))]" />
                  )}
                </div>

                <div className="p-10 sm:p-12 flex flex-col justify-center">
                  <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--text-primary)]">{def.title}</h1>
                  <p className="mt-4 text-xl sm:text-2xl font-light text-[var(--text-secondary)] leading-[1.7] max-w-[65ch]">{subtitle}</p>
                </div>
              </div>
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
              <FadeIn>
                <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-[24px] p-8 sm:p-10 shadow-[0_10px_26px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_26px_rgba(0,0,0,0.28)]">
                  {body.map((b, i) => {
                    if (b.type === "h1") {
                      return (
                        <h2 key={i} className="mt-10 first:mt-0 text-2xl font-light text-[var(--text-primary)] tracking-wide">
                          {b.text}
                        </h2>
                      );
                    }
                    if (b.type === "h2") {
                      return (
                        <h2 key={i} className="mt-10 first:mt-0 text-2xl font-light text-[var(--text-primary)] tracking-wide">
                          {b.text}
                        </h2>
                      );
                    }
                    if (b.type === "h3") {
                      return (
                        <p key={i} className="m-0 text-[var(--text-secondary)] leading-[1.95]">
                          {b.text}
                        </p>
                      );
                    }
                    if (b.type === "li") {
                      return (
                        <div key={i} className="pl-4 relative text-[var(--text-secondary)] leading-[1.95]">
                          <span className="absolute left-0 top-[0.68em] w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          {b.text}
                        </div>
                      );
                    }
                    if (b.type === "spacer") {
                      return <div key={i} className="h-3" />;
                    }

                    if (b.type === "p" && looksLikeHeading(b.text)) {
                      return (
                        <h2 key={i} className="mt-10 first:mt-0 text-2xl font-light text-[var(--text-primary)] tracking-wide">
                          {b.text}
                        </h2>
                      );
                    }

                    if (b.type === "p" && i === 0) {
                      return (
                        <h2 key={i} className="mt-10 first:mt-0 text-2xl font-light text-[var(--text-primary)] tracking-wide">
                          {b.text}
                        </h2>
                      );
                    }

                    return (
                      <p key={i} className="m-0 text-[var(--text-secondary)] leading-[1.95]">
                        {b.text}
                      </p>
                    );
                  })}
                </div>
              </FadeIn>

              <FadeIn>
                <aside className="lg:sticky lg:top-32 h-fit space-y-4">
                  <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-[24px] p-6 shadow-[0_10px_26px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_26px_rgba(0,0,0,0.28)]">
                    <div className="text-xs tracking-[0.22em] uppercase text-[var(--muted)]">Navigation</div>
                    <div className="mt-4 flex flex-col gap-3">
                      <Link
                        href={ROUTES.TREKS}
                        className="inline-flex items-center justify-center rounded-[16px] border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-primary)]"
                      >
                        &larr; Back to Treks
                      </Link>
                    </div>
                  </div>
                </aside>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


