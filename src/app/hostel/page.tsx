import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Hostel, { type HostelContent, type HostelRoom } from "@/components/sections/Hostel";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema, generateMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

type Parsed = {
  h1: string;
  tagline: string;
  intro: string;
  rooms: Array<{ name: string; lines: Array<{ file: string; description: string }> }>;
  whyTitle: string;
  whyText: string;
};

const hostelRoomImageOrder: Record<string, string[]> = {
  "4 Beds Wood Room": [
    "WoodRoom1.jpg",
    "WoodRoom2.jpg",
    "WoodRoom5.jpg",
    "WoodRoom3.jpg",
    "WoodRoom4.jpg",
  ],
  "3 Beds Attic Room": [
    "3BedsBalconyRoom1.jpg",
    "3BedsBalconyRoom4.jpg",
    "3BedsBalconyRoom3.jpg",
    "3BedsBalconyRoom2.jpg",
  ],
  "4 Beds Hemp Room": [
    "HempRoom4.jpg",
    "HempRoom3.jpg",
    "HempRoom2.jpg",
    "HempRoom1.jpg",
  ],
  "14 Beds Stone Room": [
    "StoneRoom5.jpg",
    "StoneRoom3.jpg",
    "StoneRoom4.jpg",
    "StoneRoom2.jpg",
    "StoneRoom1.jpg",
  ],
};

const hostelRoomDisplayOrder = [
  "4 Beds Wood Room",
  "3 Beds Attic Room",
  "4 Beds Balcony Room",
  "4 Beds Hemp Room",
  "14 Beds Stone Room",
];

function mapFilenameToSrc(file: string) {
  const f = file.trim();

  if (/^3BedsBalconyRoom\d+\.jpg$/i.test(f)) {
    const m = f.match(/^3BedsBalconyRoom(\d+)\.jpg$/i);
    const n = m?.[1];
    if (n) {
      return `/images/3BedsBalconyRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-attic-room-homestay-camps-view-3-beds-attic-room-${n}.jpg`;
    }
  }
  if (/^4BedsBalconyRoom\d+\.jpg$/i.test(f)) {
    const m = f.match(/^4BedsBalconyRoom(\d+)\.jpg$/i);
    const n = m?.[1];
    if (n) {
      return `/images/4BedsBalconyRoom/parvatis-lap-hostel-villa-hemp-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-balcony-room-homestay-camps-view-4-beds-balcony-room-${n}.jpg`;
    }
  }
  if (/^HempRoom\d+\.jpg$/i.test(f)) {
    const m = f.match(/^HempRoom(\d+)\.jpg$/i);
    const n = m?.[1];
    if (n) {
      return `/images/4BedsHempRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-hemp-sarpass-room-homestay-camps-view-hemp-room-${n}.jpg`;
    }
  }
  if (/^WoodRoom\d+\.jpg$/i.test(f)) {
    const m = f.match(/^WoodRoom(\d+)\.jpg$/i);
    const n = m?.[1];
    if (n) {
      return `/images/4BedsWoodRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-wood-room-homestay-camps-kheerganga-view-wood-room-${n}.jpg`;
    }
  }
  if (/^StoneRoom\d+\.jpg$/i.test(f)) {
    const m = f.match(/^StoneRoom(\d+)\.jpg$/i);
    const n = m?.[1];
    if (n) {
      return `/images/14BedsStoneRoom/parvatis-lap-hostel-villa-himalayas-kasol-chojh-mountain-offbeat-villa-hostel-luxury-wooden-glacier-stone-kheerganga-room-homestay-camps-view-stone-room-${n}.jpg`;
    }
  }

  // fallback (shouldn't be needed)
  return `/images/${encodeURIComponent(f)}`;
}

function parseContent2(text: string): Parsed {
  const lines = text
    .split(/\r?\n/g)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const isRoomHeader = (l: string) =>
    l === "3 Beds Attic Room" ||
    l === "4 Beds Balcony Room" ||
    l === "4 Beds Hemp Room" ||
    l === "4 Beds Wood Room" ||
    l === "14 Beds Stone Room";

  const h1Raw = lines[0] ?? "HOSTEL";
  const h1 = ""; // h1Raw.split("–")[0]?.trim() || "HOSTEL";
  const tagline = lines[0] ?? "";
  
  // Find the start of rooms
  let introEnd = 1;
  while (introEnd < lines.length && !isRoomHeader(lines[introEnd]!)) {
    introEnd += 1;
  }
  const intro = lines.slice(1, introEnd).join(" ");

  const rooms: Parsed["rooms"] = [];
  let i = introEnd;

  while (i < lines.length) {
    const l = lines[i]!;
    if (l.startsWith("Why Choose")) break;

    if (isRoomHeader(l)) {
      const roomName = l;
      i += 1;
      const roomLines: Array<{ file: string; description: string }> = [];

      while (i < lines.length) {
        const cur = lines[i]!;
        if (isRoomHeader(cur) || cur.startsWith("Why Choose")) break;

        // format: Filename.jpg – Description...
        const parts = cur.split("–");
        const file = (parts[0] ?? "").trim();
        const description = (parts.slice(1).join("–") ?? "").trim();
        if (file) roomLines.push({ file, description });
        i += 1;
      }

      rooms.push({ name: roomName, lines: roomLines });
      continue;
    }

    i += 1;
  }

  const whyIdx = lines.findIndex((l) => l.startsWith("Why Choose"));
  const whyTitle = whyIdx >= 0 ? lines[whyIdx]! : "Why Choose Parvati's Lap Hostel in Parvati Valley";
  const whyText = whyIdx >= 0 ? (lines[whyIdx + 1] ?? "") : "";

  return { h1, tagline, intro, rooms, whyTitle, whyText };
}

function toHostelContent(parsed: Parsed): HostelContent {
  const orderedRooms = [...parsed.rooms].sort((a, b) => {
    const ai = hostelRoomDisplayOrder.indexOf(a.name);
    const bi = hostelRoomDisplayOrder.indexOf(b.name);
    const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
    const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
    return aRank - bRank;
  });

  const rooms: HostelRoom[] = orderedRooms.map((r) => {
    const desiredOrder = hostelRoomImageOrder[r.name];
    const sortedLines = desiredOrder
      ? [...r.lines].sort((a, b) => {
          const ai = desiredOrder.indexOf(a.file);
          const bi = desiredOrder.indexOf(b.file);
          const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
          const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
          return aRank - bRank;
        })
      : r.lines;

    return {
      name: r.name,
      items: sortedLines.map((ln) => {
        const src = mapFilenameToSrc(ln.file);
        return {
          title: ln.file,
          description: ln.description,
          src,
          alt: `Parvati's Lap Hostel and Villa parvati valley, kasol, Himalayas - ${ln.description}`,
        };
      }),
    };
  });

  return {
    h1: parsed.h1 || "HOSTEL",
    tagline: parsed.tagline,
    intro: parsed.intro,
    rooms,
    whyTitle: parsed.whyTitle,
    whyText: parsed.whyText,
  };
}

function loadContent(): HostelContent {
  const filePath = path.join(process.cwd(), "public", "content2.txt");
  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseContent2(text);
  return toHostelContent(parsed);
}

export const metadata: Metadata = generateMetadata({
  title: "Hostel in Parvati Valley (Near Kasol) - Parvati's Lap",
  description:
    "Premium backpacker and budget hostel stay in Parvati Valley, Himachal Pradesh. Balcony rooms, wood and hemp dorms, and a 14-bed stone room near Kasol, Tosh, and Kheerganga trek route.",
  keywords: [
    "hostel in parvati valley",
    "kasol hostel",
    "budget hostel himachal",
    "backpacker hostel kasol",
    "kheerganga trek stay",
    "tos h hostel",
    "lapas village hostel",
  ],
  path: ROUTES.HOSTEL,
});

export default function HostelPage() {
  const content = loadContent();

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Hostel", url: ROUTES.HOSTEL },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <main className="pt-28">
        <Hostel content={content} />
      </main>
    </>
  );
}

