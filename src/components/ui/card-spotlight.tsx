"use client";

import { useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * CardSpotlight (Aceternity-inspired)
 * - Subtle spotlight following cursor (CSS radial gradient).
 * - No external libs.
 */
export function CardSpotlight({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const onLeave = () => setPos(null);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={[
        "relative overflow-hidden rounded-[22px]",
        "border border-[var(--border-color)]",
        "bg-[var(--bg-primary)]",
        "shadow-[0_10px_28px_rgba(0,0,0,0.07)]",
        "dark:shadow-[0_10px_28px_rgba(0,0,0,0.35)]",
        "transition-all duration-300",
        "hover:-translate-y-1",
        className,
      ].join(" ")}
      style={
        pos
          ? {
              backgroundImage: `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, rgba(154,173,122,0.18), transparent 60%)`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

