"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

export type BentoItem = {
  title: string; // filename
  description: string;
  src: string;
  alt: string;
};

type GridProps = {
  items: BentoItem[];
  className?: string;
};

function spanForIndex(i: number) {
  // Simple bento pattern. Safe on any item count.
  // Keep it bento-like via width (col-span), but avoid fixed row spans
  // so text never gets cut off and spacing stays consistent.
  if (i === 0) return "md:col-span-2";
  if (i === 3) return "md:col-span-2";
  return "md:col-span-1";
}

export function BentoGrid({ items, className = "" }: GridProps) {
  return (
    <div className={["grid grid-cols-1 md:grid-cols-3 gap-6", className].join(" ")}>
      {items.map((item, i) => (
        <FadeIn key={`${item.src}-${i}`} className={spanForIndex(i)} delayMs={Math.min(220, i * 60)}>
          <BentoGridItem item={item} index={i} />
        </FadeIn>
      ))}
    </div>
  );
}

function sizesForIndex(i: number) {
  // 3-column grid on md+. Some items span 2 columns.
  const isWide = i === 0 || i === 3;
  return isWide
    ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
    : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
}

function BentoGridItem({ item, index }: { item: BentoItem; index: number }) {
  const hideTitle = /\.jpe?g$/i.test(item.title.trim());
  const isWide = index === 0 || index === 3;
  const imageAspect = isWide ? "aspect-[21/9]" : "aspect-[16/10]";

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[22px] flex flex-col",
        "border border-[var(--border-color)]",
        "bg-[var(--bg-primary)]",
        "shadow-[0_10px_26px_rgba(0,0,0,0.06)]",
        "dark:shadow-[0_10px_26px_rgba(0,0,0,0.28)]",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,0,0,0.10)]",
        "dark:hover:shadow-[0_18px_44px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      <div className={["relative w-full", imageAspect, "bg-[var(--bg-secondary)]"].join(" ")}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]"
          sizes={sizesForIndex(index)}
          quality={100}
        />
      </div>

      <div className="p-6">
        {!hideTitle && (
          <div className="m-0 text-xs tracking-[0.22em] uppercase text-[var(--muted)]">{item.title}</div>
        )}
        <p className={[hideTitle ? "mt-0" : "mt-3", "m-0 text-[var(--text-secondary)] leading-[1.75]"].join(" ")}>
          {item.description}
        </p>
      </div>
    </article>
  );
}

