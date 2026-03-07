"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /**
   * IntersectionObserver rootMargin. Default triggers slightly before enter.
   */
  rootMargin?: string;
  /**
   * Delay in ms before animating in.
   */
  delayMs?: number;
};

/**
 * FadeIn
 * - Subtle "motion-like" fade + translate on enter viewport.
 * - No external libs; respects reduced motion.
 */
export function FadeIn({ children, className = "", rootMargin = "0px 0px -10% 0px", delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            window.setTimeout(() => setVisible(true), delayMs);
          } else {
            setVisible(true);
          }
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delayMs, rootMargin]);

  return (
    <div
      ref={ref}
      className={[
        "transition-all",
        "duration-700",
        "ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

