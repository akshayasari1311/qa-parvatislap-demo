"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /**
   * Max rotation in degrees.
   */
  max?: number;
};

/**
 * Tilt (Reactive-image tiltOnHover inspired)
 * - Very subtle pointer-based 3D tilt.
 * - Respects reduced motion.
 */
export function Tilt({ children, className = "", max = 4 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) setEnabled(false);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const rotY = (px - 0.5) * (max * 2);
    const rotX = (0.5 - py) * (max * 2);
    el.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={["transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", className].join(" ")}
      style={{ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)" }}
    >
      {children}
    </div>
  );
}

