"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type AnimatedTestimonial = {
  quote: string;
  name: string;
  designation?: string;
  src: string;
  alt?: string;
};

type Props = {
  testimonials: AnimatedTestimonial[];
  autoplay?: boolean;
  intervalMs?: number;
  className?: string;
};

/**
 * AnimatedTestimonials
 * - Inspired by Aceternity UI "Animated Testimonials", implemented without external animation deps.
 * - Uses simple opacity/translate transitions for smooth, lightweight UX.
 */
export function AnimatedTestimonials({
  testimonials,
  autoplay = true,
  intervalMs = 5500,
  className = "",
}: Props) {
  const safeTestimonials = useMemo(() => testimonials.filter(Boolean), [testimonials]);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [phase, setPhase] = useState<"idle" | "prep" | "animating">("idle");
  const [dir, setDir] = useState<"next" | "prev">("next");
  const timeoutRef = useRef<number | null>(null);

  const DURATION_MS = 700;
  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"; // smooth, natural

  const isAnimating = phase !== "idle";

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    if (isPaused) return;
    if (phase !== "idle") return;
    if (safeTestimonials.length <= 1) return;

    const id = window.setInterval(() => {
      start("next");
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, intervalMs, isPaused, phase, safeTestimonials.length]);

  const normalize = (idx: number) => {
    if (safeTestimonials.length === 0) return 0;
    return ((idx % safeTestimonials.length) + safeTestimonials.length) % safeTestimonials.length;
  };

  const start = (nextDir: "next" | "prev") => {
    if (safeTestimonials.length === 0) return;
    if (safeTestimonials.length === 1) return;
    if (phase !== "idle") return;

    setDir(nextDir);
    setPhase("prep"); // swap the behind images instantly (without motion)
    requestAnimationFrame(() => setPhase("animating")); // then promote behind card to front

    timeoutRef.current = window.setTimeout(() => {
      setActive((cur) => normalize(cur + (nextDir === "next" ? 1 : -1)));
      setPhase("idle");
      setDir("next");
    }, DURATION_MS);
  };

  const goTo = (idx: number) => {
    if (safeTestimonials.length === 0) return;
    const target = normalize(idx);
    if (target === active) return;
    // Dots jump directly (no stack animation); arrow buttons handle the animated promotion.
    setActive(target);
  };

  const prev = () => start("prev");
  const next = () => start("next");

  if (safeTestimonials.length === 0) return null;

  // During "prev" animation, show previous cards behind so they can be promoted.
  const stack = dir === "prev" && phase !== "idle" ? [active, active - 1, active - 2] : [active, active + 1, active + 2];
  const t = safeTestimonials[normalize(stack[0])];
  const t2 = safeTestimonials[normalize(stack[1])];
  const t3 = safeTestimonials[normalize(stack[2])];

  const baseFront = "translateX(0px) translateY(0px) rotate(0deg) scale(1)";
  const baseMid = "translateX(-6px) translateY(6px) rotate(-4deg) scale(0.99)";
  const baseBack = "translateX(-16px) translateY(14px) rotate(-10deg) scale(0.98)";

  const toFront = baseFront;
  const toMid = baseMid;
  const toBack = baseBack;

  const frontTransform =
    phase === "animating" ? toBack : baseFront; // front slides back
  const midTransform =
    phase === "animating" ? toFront : baseMid; // behind card promotes to front
  const backTransform =
    phase === "animating" ? toMid : baseBack; // deepest becomes middle

  return (
    <section
      className={[
        "w-full",
        // Match TREKS hero border/shadow system
        "bg-[var(--bg-primary)]",
        "border border-[var(--border-color)] rounded-[28px]",
        "shadow-[0_22px_70px_rgba(0,0,0,0.10)]",
        "dark:shadow-[0_22px_70px_rgba(0,0,0,0.40)]",
        "overflow-hidden",
        className,
      ].join(" ")}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Testimonials"
    >
      {/*
        Legacy layout (kept for plug-and-play rollback)
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-0">
          <div className="relative min-h-[300px] lg:min-h-[420px]">
            <Image
              key={t.src}
              src={t.src}
              alt={t.alt ?? `${t.name} — Parvati's Lap Villa`}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div key={`${active}-${t.name}`} className="transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100 translate-y-0">
              <div className="mb-4">
                <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted)]">Meghbari Luxury Villa</p>
              </div>
              <blockquote className="text-[var(--text-primary)] text-xl sm:text-2xl font-light leading-relaxed">“{t.quote}”</blockquote>
              <div className="mt-6">
                <div className="text-[var(--text-primary)] tracking-wide">{t.name}</div>
                {t.designation && <div className="text-[var(--text-secondary)] text-sm mt-1">{t.designation}</div>}
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button type="button" onClick={prev} className="w-10 h-10 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 hover:scale-105 hover:border-[rgba(154,173,122,0.4)]" aria-label="Previous testimonial">&lt;</button>
                <button type="button" onClick={next} className="w-10 h-10 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 hover:scale-105 hover:border-[rgba(154,173,122,0.4)]" aria-label="Next testimonial">&gt;</button>
              </div>
              <div className="flex items-center gap-2">
                {safeTestimonials.map((_, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      className={["h-2 rounded-full transition-all duration-300", isActive ? "w-8 bg-[var(--accent)]" : "w-2 bg-[var(--border-color)] hover:bg-[var(--accent)]"].join(" ")}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-8 sm:p-10 lg:p-12">
        {/* Left: stacked image cards */}
        <div className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] flex items-center justify-center">
          <div className="relative w-full max-w-[520px] h-[320px] sm:h-[400px] lg:h-[500px]">
            {/* Back card 2 */}
            <div
              className={[
                "absolute inset-0 rounded-[28px] overflow-hidden",
                "border border-[var(--border-color)] bg-[var(--bg-secondary)]",
                "shadow-[0_30px_70px_rgba(0,0,0,0.12)]",
                "transition-[transform,opacity]",
                "will-change-transform",
              ].join(" ")}
              style={{
                transform: backTransform,
                opacity: phase === "animating" ? 0.72 : 0.55,
                transitionDuration: phase === "prep" ? "0ms" : `${DURATION_MS}ms`,
                transitionTimingFunction: EASE,
                filter: "saturate(0.9)",
              }}
              aria-hidden="true"
            >
              <Image
                src={t3.src}
                alt={t3.alt ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                priority={false}
              />
            </div>

            {/* Back card 1 */}
            <div
              className={[
                "absolute inset-0 rounded-[28px] overflow-hidden",
                "border border-[var(--border-color)] bg-[var(--bg-secondary)]",
                "shadow-[0_30px_70px_rgba(0,0,0,0.14)]",
                "transition-[transform,opacity]",
                "will-change-transform",
              ].join(" ")}
              style={{
                transform: midTransform,
                opacity: phase === "animating" ? 1 : 0.75,
                transitionDuration: phase === "prep" ? "0ms" : `${DURATION_MS}ms`,
                transitionTimingFunction: EASE,
              }}
              aria-hidden="true"
            >
              <Image
                src={t2.src}
                alt={t2.alt ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                priority={false}
              />
            </div>

            {/*
              Previous animation (kept for plug-and-play rollback)
              - outgoing card popped out and faded away
              - replaced now with "behind-to-front promotion" animation
            */}

            {/* Active card */}
            <div
              className={[
                "absolute inset-0 rounded-[28px] overflow-hidden",
                "border border-[var(--border-color)] bg-[var(--bg-secondary)]",
                "shadow-[0_35px_90px_rgba(0,0,0,0.18)]",
                "transition-[transform,opacity]",
                "will-change-transform",
              ].join(" ")}
              style={{
                transform: frontTransform,
                opacity: phase === "animating" ? 0.75 : 1,
                zIndex: 20,
                transitionDuration: phase === "prep" ? "0ms" : `${DURATION_MS}ms`,
                transitionTimingFunction: EASE,
              }}
            >
              <Image
                key={t.src}
                src={t.src}
                alt={t.alt ?? `${t.name} — Parvati's Lap Villa`}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

              {/* Tiny badge (matches shared reference corner icon vibe) */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <span className="text-white text-sm font-semibold tracking-wide">PL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: text content */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <div className="text-4xl sm:text-5xl font-light tracking-[0.04em] text-[var(--text-primary)]">
              {t.name}
            </div>
            {t.designation && (
              <div className="mt-3 text-base sm:text-lg font-light tracking-wide text-[var(--text-secondary)]">
                {t.designation}
              </div>
            )}
          </div>

          <p className="mt-8 text-lg sm:text-xl font-light leading-[2.0] text-[var(--text-secondary)] max-w-[52ch]">
            {t.quote}
          </p>

          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={isAnimating}
              className="w-11 h-11 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={next}
              disabled={isAnimating}
              className="w-11 h-11 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              &rarr;
            </button>
          </div>

          {/* Optional dots (kept, but understated) */}
          <div className="mt-8 flex items-center gap-2">
            {safeTestimonials.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  disabled={isAnimating}
                  className={[
                    "h-2 rounded-full transition-all duration-300",
                    isActive
                      ? "w-8 bg-[var(--accent)]"
                      : "w-2 bg-[var(--border-color)] hover:bg-[var(--accent)]",
                  ].join(" ")}
                  aria-label={`Go to item ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

