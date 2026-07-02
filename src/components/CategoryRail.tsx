"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { track } from "@/lib/analytics";
import { ChevronRight } from "@/components/icons";
import ShoeImage from "@/components/ShoeImage";

export default function CategoryRail() {
  return (
    <div className="mx-auto mt-6 max-w-[1280px] px-4 lg:px-8">
      <div className="no-scrollbar flex gap-3 overflow-x-auto rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-gray-100">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            onClick={() => track("category_click", { category: c.name })}
            className="group flex min-w-[104px] flex-1 flex-col items-center gap-2"
          >
            <span className="grid h-20 w-20 place-items-center rounded-full bg-gray-50 transition group-hover:bg-rose-50">
              <ShoeImage
                tone={c.tone}
                src={c.image}
                alt={`${c.name} category`}
                className="h-14 w-14 transition group-hover:scale-[1.06]"
                rounded="rounded-full"
              />
            </span>
            <span className="text-xs font-medium text-gray-700">{c.name}</span>
          </Link>
        ))}
        <Link
          href={`/${CATEGORIES[0].slug}`}
          onClick={() => track("category_click", { category: "View All" })}
          className="flex min-w-[80px] flex-col items-center justify-center gap-2 text-gray-500"
        >
          <span className="grid h-20 w-20 place-items-center rounded-full bg-gray-50">
            <ChevronRight className="h-5 w-5" />
          </span>
          <span className="text-xs font-medium">View All</span>
        </Link>
      </div>
    </div>
  );
}
