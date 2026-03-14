"use client";

import Image from "next/image";
import Link from "next/link";
import { trekDetailPath } from "@/lib/routes";
import { FadeIn } from "@/components/ui/fade-in";
import { Tilt } from "@/components/ui/tilt";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export type TrekCard = {
  slug: string;
  title: string;
  tagline: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function TreksLanding({ cards }: { cards: TrekCard[] }) {
  return (
    <section className="bg-secondary py-24 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px-64">
      <div className="max-w-79rem [@media(min-width:2560px)]:max-w-[235rem] mx-auto">
        {/* Hero */}
        <FadeIn>
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-[var(--bg-primary)] px-8 sm:px-10 py-14 sm:py-16 shadow-[0_22px_70px_rgba(0,0,0,0.10)] dark:shadow-[0_22px_70px_rgba(0,0,0,0.40)]">
            {/* Fog/gradient background */}
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(700px circle at 18% 25%, rgba(154,173,122,0.22), transparent 60%), radial-gradient(650px circle at 82% 35%, rgba(57,255,20,0.10), transparent 60%), radial-gradient(900px circle at 50% 120%, rgba(128,128,0,0.12), transparent 65%)",
                filter: "blur(0px)",
              }}
            />
            <div className="absolute inset-0 opacity-50" aria-hidden="true">
              <div className="w-[140%] h-[140%] -translate-x-[10%] -translate-y-[10%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.10),transparent_55%)] animate-[trekFog_14s_ease-in-out_infinite]" />
            </div>
            <style>{`
              @keyframes trekFog {
                0% { transform: translate(-10%, -10%) scale(1); opacity: .40; }
                50% { transform: translate(-6%, -12%) scale(1.04); opacity: .55; }
                100% { transform: translate(-10%, -10%) scale(1); opacity: .40; }
              }
            `}</style>

            <div className="relative text-center">
              <h1 className="section-title title-section">TREKS</h1>
              <p className="mt-4 text-lg text-secondary max-w-[720px] mx-auto leading-normal [@media(min-width:2560px)]:text-[2rem]">
                Treks of Parvati Valley
              </p>
              <div className="mt-5 max-w-[920px] mx-auto space-y-4">
                <p className="text-[var(--text-secondary)] leading-[1.9]">
                  Parvati Valley in Himachal Pradesh is one of the most iconic trekking destinations in the Indian Himalayas, attracting backpackers, hikers, and adventure travelers from around the world. Starting from the lively village of Kasol, the valley opens into a network of scenic forest trails, remote Himalayan villages, alpine meadows, and high-altitude mountain passes that define the trekking culture of the region.
                </p>
                <p className="text-[var(--text-secondary)] leading-[1.9]">
                  Among the most popular trails is the Kheerganga Trek, famous for its forest paths, hot springs, and breathtaking views of the Parvati mountains. Other beautiful village treks such as the Grahan Trek, Rasol Trek, Chalal Trek, Jiwa Nala Trek, and Sargi Trek take travelers through dense pine forests, wooden Himachali settlements, and peaceful mountain landscapes.
                </p>
                <p className="text-[var(--text-secondary)] leading-[1.9]">
                  Trekkers can also explore charming Himalayan villages including Tosh, Kutla, Pulga, and Kalga, each offering unique views of the valley, traditional culture, and serene nature trails.
                </p>
                <p className="text-[var(--text-secondary)] leading-[1.9]">
                  For experienced adventurers, Parvati Valley also offers challenging high-altitude expeditions like the Sar Pass Trek, Bhandak Thach Trek, and the Swajani-Bhandak-Biskeri Trek, routes that cross glacier valleys, alpine ridges, and untouched Himalayan terrain.
                </p>
                <p className="text-[var(--text-secondary)] leading-[1.9]">
                  Together, these trails make Parvati Valley near Kasol one of the best trekking regions in Himachal Pradesh, offering unforgettable journeys through the wild beauty of the Himalayas.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {cards.map((c, idx) => (
            <FadeIn key={c.slug} delayMs={Math.min(260, idx * 70)}>
              <Tilt max={3}>
                <Link href={trekDetailPath(c.slug)} className="block">
                  <CardSpotlight className="h-full">
                    <div className="relative">
                      {c.imageSrc ? (
                        <div className="relative w-full aspect-[16/10] bg-[var(--bg-secondary)]">
                          <Image
                            src={c.imageSrc}
                            alt={c.imageAlt ?? c.title}
                            fill
                            quality={100}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-[16/10] bg-[radial-gradient(circle_at_30%_30%,rgba(154,173,122,0.25),transparent_55%),radial-gradient(circle_at_70%_50%,rgba(57,255,20,0.10),transparent_60%),linear-gradient(135deg,rgba(0,0,0,0.02),rgba(0,0,0,0.08))]" />
                      )}
                    </div>

                    <div className="p-7">
                      <div className="text-2xl font-light text-[var(--text-primary)] tracking-wide">{c.title}</div>
                      <p className="mt-3 text-[var(--text-secondary)] leading-[1.8]">
                        {c.tagline}
                      </p>
                      <div className="mt-6 text-xs tracking-[0.22em] uppercase text-[var(--muted)]">
                        Read the story →
                      </div>
                    </div>
                  </CardSpotlight>
                </Link>
              </Tilt>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}



