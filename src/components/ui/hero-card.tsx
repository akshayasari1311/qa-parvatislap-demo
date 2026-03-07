"use client";

import { FadeIn } from "@/components/ui/fade-in";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * HeroCard
 * - Reuses the TREKS hero "fog/gradient + clean border" design.
 * - Light/dark compatible via existing CSS variables.
 */
export function HeroCard({ title, subtitle, description, className = "", children }: Props) {
  return (
    <FadeIn>
      <div
        className={[
          "relative overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-[var(--bg-primary)]",
          "px-8 sm:px-10 py-14 sm:py-16",
          "shadow-[0_22px_70px_rgba(0,0,0,0.10)] dark:shadow-[0_22px_70px_rgba(0,0,0,0.40)]",
          className,
        ].join(" ")}
      >
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
          <div className="w-[140%] h-[140%] -translate-x-[10%] -translate-y-[10%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.10),transparent_55%)] animate-[heroFog_14s_ease-in-out_infinite]" />
        </div>
        <style>{`
          @keyframes heroFog {
            0% { transform: translate(-10%, -10%) scale(1); opacity: .40; }
            50% { transform: translate(-6%, -12%) scale(1.04); opacity: .55; }
            100% { transform: translate(-10%, -10%) scale(1); opacity: .40; }
          }
        `}</style>

        <div className="relative text-center">
          <h1 className="section-title title-section">{title}</h1>
          {subtitle && (
            <p className="mt-4 text-lg text-secondary max-w-[720px] mx-auto leading-normal [@media(min-width:2560px)]:text-[2rem]">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-3 text-[var(--text-secondary)] leading-[1.9] max-w-[980px] mx-auto">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </FadeIn>
  );
}

