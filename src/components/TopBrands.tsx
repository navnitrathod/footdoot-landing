"use client";

import { BRANDS } from "@/lib/data";
import { track } from "@/lib/analytics";
import { ChevronRight } from "@/components/icons";

export default function TopBrands() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8">
      <h2 className="mb-5 text-lg font-bold text-ink">
        Top Brands. <span className="text-brand">Endless Choices.</span>
      </h2>
      <div className="no-scrollbar flex items-center gap-8 overflow-x-auto">
        {BRANDS.map((b) => (
          <button
            key={b}
            onClick={() => track("brand_click", { brand: b })}
            className="shrink-0 text-lg font-extrabold tracking-tight text-gray-700 grayscale transition hover:text-ink hover:grayscale-0"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {b}
          </button>
        ))}
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-200 text-gray-500">
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </section>
  );
}
