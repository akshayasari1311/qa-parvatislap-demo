"use client";

import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { FadeIn } from "@/components/ui/fade-in";
import { HeroCard } from "@/components/ui/hero-card";

export type HostelRoom = {
  name: string;
  items: BentoItem[];
};

export type HostelContent = {
  h1: string;
  tagline: string;
  intro: string;
  rooms: HostelRoom[];
  whyTitle: string;
  whyText: string;
};

export default function Hostel({ content }: { content: HostelContent }) {
  return (
    <section className="bg-secondary py-24 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px-64">
      <div className="max-w-79rem [@media(min-width:2560px)]:max-w-[235rem] mx-auto">
        {/*
          Legacy header layout (kept for plug-and-play rollback)
          <FadeIn>
            <div className="text-center mb-14">
              <h1 className="section-title title-section">{content.h1}</h1>
              <p className="text-lg text-secondary max-w-[900px] mx-auto leading-normal [@media(min-width:2560px)]:text-[2rem]">
                {content.tagline}
              </p>
              <p className="mt-6 text-[var(--text-secondary)] leading-[1.9] max-w-[980px] mx-auto [@media(min-width:2560px)]:text-[28px] [@media(min-width:2560px)]:leading-[3.5rem]">
                {content.intro}
              </p>
            </div>
          </FadeIn>
        */}

        <div className="mb-14">
          <HeroCard title={content.h1} subtitle={content.tagline} description={content.intro} />
        </div>

        <div className="space-y-16">
          {content.rooms.map((room, idx) => (
            <div key={room.name}>
              <FadeIn delayMs={Math.min(200, idx * 70)}>
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-light text-[var(--text-primary)] tracking-[0.10em] uppercase [@media(min-width:2560px)]:text-[2.75rem]">
                    {room.name}
                  </h2>
                </div>
              </FadeIn>

              <BentoGrid items={room.items} />
            </div>
          ))}
        </div>

        <FadeIn className="mt-18">
          <div className="max-w-5xl mx-auto mt-20 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[24px] p-10 shadow-[0_20px_60px_rgba(128,128,0,0.10)] dark:shadow-[0_20px_60px_rgba(57,255,20,0.08)]">
            <h3 className="text-2xl font-light text-[var(--text-primary)] tracking-[0.08em] uppercase text-center">
              {content.whyTitle}
            </h3>
            <p className="mt-5 text-[var(--text-secondary)] leading-[1.9] text-center">
              {content.whyText}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

