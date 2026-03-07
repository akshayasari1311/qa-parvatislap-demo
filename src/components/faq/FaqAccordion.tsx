"use client";

import { useMemo, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

function normalizeForRender(answer: string) {
  return answer.replace(/\r\n/g, "\n");
}

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const normalized = useMemo(
    () => items.map((it) => ({ ...it, answer: normalizeForRender(it.answer) })),
    [items],
  );

  return (
    <div className="space-y-6">
      {normalized.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <section
            key={faq.question}
            className="bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-[22px] transition-all duration-300 shadow-[0_10px_30px_rgba(128,128,0,0.10)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(128,128,0,0.18)] dark:bg-gradient-to-br dark:from-[rgba(0,0,0,0.8)] dark:to-[rgba(57,255,20,0.05)] dark:border-[rgba(57,255,20,0.2)] dark:shadow-[0_10px_30px_rgba(57,255,20,0.10)] dark:hover:shadow-[0_20px_40px_rgba(57,255,20,0.18)]"
          >
            <button
              type="button"
              className="w-full text-left px-8 py-7 flex items-center justify-between gap-6"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
            >
              <h2 className="text-xl md:text-2xl font-light text-primary tracking-wide [@media(min-width:2560px)]:text-[2.25rem]">
                {faq.question}
              </h2>

              <span
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
                style={{
                  borderColor:
                    "var(--border-color)" in ({} as any)
                      ? undefined
                      : "rgba(154, 173, 122, 0.35)",
                }}
                aria-hidden="true"
              >
                <span className="text-2xl leading-none text-secondary">+</span>
              </span>
            </button>

            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-8 pb-8">
                <div className="max-h-[320px] overflow-y-auto pr-2">
                  <p className="text-lg leading-[1.8] text-secondary whitespace-pre-line [@media(min-width:2560px)]:text-[1.75rem] [@media(min-width:2560px)]:leading-[3rem]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

