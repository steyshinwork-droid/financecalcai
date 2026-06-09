"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
}

export function FaqSection({ items, title = "Frequently Asked Questions" }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">{title}</h2>
      <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {items.map((item, i) => (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <ChevronDown
                className={`ml-4 h-5 w-5 shrink-0 text-gray-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 text-gray-600">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
