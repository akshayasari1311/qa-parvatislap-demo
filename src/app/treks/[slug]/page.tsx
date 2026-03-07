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
  { slug: "jiwa-nala", title: "Jiwa Nala Trek" },
  { slug: "bhandak-thach", title: "Bhandak Thach Trek" },
  { slug: "swajani-biskeri", title: "Swajani-Biskeri Trek" },
  { slug: "sargi", title: "Sargi Trek" },
  { slug: "shikoi", title: "Shikoi Hikes" },
  { slug: "kasol-exploration", title: "Kasol Exploration" },
];

const STATIC_TREKS: Record<string, { subtitle: string; body: string[]; image?: string }> = {
  "pin-parvati-pass": {
    subtitle: "10-12 days | ~110 km | A classic trans-Himalayan expedition from Parvati Valley (Kullu) to Pin Valley (Spiti).",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-pin-parvati-pass-trek-spiti-high-altitude-glacier-camping.jpg",
    body: [
      "Not every trek is a hike. Some are full mountain crossings. Pin Parvati Pass is one of them.",
      "The Trek: Parvati Valley to Spiti Crossover",
      "Starting Point: Barshaini side (Kasol base) and exit toward Mudh in Pin Valley",
      "Difficulty: Difficult to Technical (high-altitude expedition)",
      "Duration: 10-12 days",
      "Approx Distance: Around 100-110 km",
      "Highest Point: Pin Parvati Pass (~5,319 m)",
      "This route starts in the green valleys of Kullu and ends in the stark, high-altitude terrain of Spiti. You move across glaciers, moraines, river crossings, and long exposed sections where weather can shift quickly.",
      "Who Should Do It",
      "Experienced trekkers with solid fitness, prior altitude exposure, and proper acclimatization planning.",
      "Before You Commit",
      "Use Kasol and Parvati Valley as your prep base, then move only with a suitable weather window and local support team.",
    ],
  },
  "jiwa-nala": {
    subtitle: "3-4 hrs | ~6 km | A low-crowd forest trail near Grahan with clear mountain stream sections.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-jiwa-nala-trek-grahan-pine-forest-stream-camping.jpg",
    body: [
      "If Kasol feels crowded, Jiwa Nala feels like the quiet mountain version of the same valley.",
      "The Trek: Forest Trail to Crystal Stream Sections",
      "Starting Point: Kasol-Grahan side trailheads",
      "Difficulty: Easy to Moderate",
      "Duration: 3-4 hours",
      "Approx Distance: Around 6 km",
      "Jiwa Nala is a half-day nature trek through pine forests and stream-side paths. It is perfect for slow walking, birding, and photography without committing to a full-day climb.",
      "Best For",
      "Couples, beginners, and trekkers taking a recovery day between longer routes.",
      "Local Tip",
      "Start early, carry water and a light layer, and check local trail updates before heading out.",
    ],
  },
  "bhandak-thach": {
    subtitle: "2 days | ~15 km | A Pulga-side meadow trek to broad alpine camps in upper Parvati Valley.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-bhandak-thach-trek-swajani-meadows-camping.jpg",
    body: [
      "Bhandak Thach is where the valley opens up and the mountain skyline suddenly takes over.",
      "The Trek: Pulga Forests to High Meadow Camps",
      "Starting Point: Pulga village (via Kasol-Barshaini side access)",
      "Difficulty: Moderate",
      "Duration: 2 days",
      "Approx Distance: Around 15 km",
      "This route climbs through forest belts and opens into wide thach meadows that are ideal for camping and stargazing.",
      "Why Trekkers Love It",
      "Lower crowd levels than mainstream routes, big horizon views, and strong sunrise-sunset camp moments.",
      "Planning Note",
      "Route conditions vary by season. Confirm weather, camping spots, and guide support before departure.",
    ],
  },
  "swajani-biskeri": {
    subtitle: "2-3 days | ~18 km | An offbeat Pulga-side meadow circuit to Biskeri with wide ridge panoramas.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-swajani-biskeri-trek-pulga-offbeat-alpine-camping.jpg",
    body: [
      "Swajani-Biskeri is for trekkers who want the views of famous routes without the traffic of famous routes.",
      "The Trek: Offbeat Meadow Circuit to Biskeri Thach",
      "Starting Point: Pulga side approach",
      "Difficulty: Moderate",
      "Duration: 2-3 days",
      "Approx Distance: Around 18 km",
      "This trail moves across meadow systems above Parvati Valley and reaches Biskeri sectors known for open 360-degree mountain views.",
      "The Vibe",
      "Quiet campsites, long ridgeline sunsets, and a strong offbeat feel compared to crowded valley trails.",
      "Safety First",
      "Wayfinding can be unclear in changing weather, so local guide support is recommended.",
    ],
  },
  sargi: {
    subtitle: "3 hrs | ~5 km | A moderate Kasol-side climb with glacier-facing and valley-wide viewpoints.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-sargi-trek-glacier-viewpoint-forest-trail.jpg",
    body: [
      "Short trek, serious payoff. Sargi gives big valley views without needing a multi-day plan.",
      "The Trek: Local Climb to Glacier-Facing Viewpoints",
      "Starting Point: Kasol-Lapas side trails",
      "Difficulty: Moderate",
      "Duration: Around 3 hours",
      "Approx Distance: Around 5 km",
      "The route combines forest sections, stream crossings, and open viewpoint points overlooking Parvati Valley ridges.",
      "Best Use Case",
      "A strong half-day conditioning trek before longer routes like Sar Pass or Pin Parvati logistics.",
      "Practical Tip",
      "Carry water, light weather protection, and enough daylight buffer for descent.",
    ],
  },
  shikoi: {
    subtitle: "30-60 mins | Easy | Local hikes through village trails, farms, and Parvati Valley culture.",
    image: "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-shikoi-hike-village-trail-terraced-farms-family-trek.jpg",
    body: [
      "Not every mountain day needs to be a grind. Shikoi hikes are built for slow travel and local connection.",
      "The Trek: Easy Village and Farm-Side Walks",
      "Starting Point: Local village paths near Kasol side stays",
      "Difficulty: Easy",
      "Duration: 30-60 mins",
      "Approx Distance: Short local loops",
      "These walks pass terraced farms, small forest paths, and village lanes, offering a culture-first mountain experience.",
      "Best For",
      "Families, beginners, and trekkers using the day for recovery or acclimatization.",
      "Timing Tip",
      "Go in daylight for better views and easier route decisions.",
    ],
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
    body: [
      "Kasol exploration is your zero-pressure mountain day between high-effort trek blocks.",
      "The Route: Cafe Hops, Riverside Walks, and Market Streets",
      "Starting Point: Kasol main market",
      "Difficulty: Easy",
      "Duration: 1 hour to half-day",
      "This plan covers Parvati riverside stretches, local cafes, market lanes, and nearby transfer points for upcoming treks.",
      "Why It Matters",
      "Kasol works as a practical logistics base for Parvati Valley routes and a recovery stop before or after major climbs.",
      "Smart Window",
      "Visit early morning or late afternoon to avoid peak traffic and market rush.",
    ],
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
    .replace(/â€“|â€”/g, "-")
    .replace(/â€¦/g, "...")
    .replace(/Â°/g, " degrees")
    .replace(/Â/g, "")
    .replace(/\u00A0/g, " ")
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
  const lines = block
    .split(/\r?\n/g)
    .map((l) => l.trim())
    .filter(Boolean);

  const star = lines.find((l) => l.startsWith("*"));
  if (star) return normalizeText(star.replace(/^\*\s*/, "").trim());

  const candidate = lines.find((l) => l.length > 12 && !/^map it with image/i.test(l) && !/^\w+\s*Trek/i.test(l));
  return normalizeText(candidate ?? "Legends, trails, and alpine stories-crafted for the curious.");
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

  const blocks: Array<{ type: "h2" | "p" | "li"; text: string }> = [];
  const paras = cleaned
    .join("\n")
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean);

  for (const p of paras) {
    const lines = p.split(/\r?\n/g).map((x) => x.trim()).filter(Boolean);
    for (const ln of lines) {
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
    blocks.push({ type: "p", text: "" });
  }

  const out: typeof blocks = [];
  for (const b of blocks) {
    if (b.type === "p" && b.text === "") {
      if (out.length === 0) continue;
      const prev = out[out.length - 1]!;
      if (prev.type === "p" && prev.text === "") continue;
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
  const preferStatic = def.slug === "malana-waichin";
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
                  <p className="mt-4 text-[var(--text-secondary)] leading-[1.9] max-w-[65ch]">{subtitle}</p>
                </div>
              </div>
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
              <FadeIn>
                <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-[24px] p-8 sm:p-10 shadow-[0_10px_26px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_26px_rgba(0,0,0,0.28)]">
                  {body.map((b, i) => {
                    if (b.type === "h2") {
                      return (
                        <h2 key={i} className="mt-10 first:mt-0 text-2xl font-light text-[var(--text-primary)] tracking-wide">
                          {b.text}
                        </h2>
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
                    if (b.type === "p" && b.text === "") {
                      return <div key={i} className="h-3" />;
                    }

                    if (b.type === "p" && looksLikeHeading(b.text)) {
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
