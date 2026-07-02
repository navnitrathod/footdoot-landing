"use client";

import { useEffect, useState } from "react";
import { DEALS } from "@/lib/data";
import { openEarlyAccess, track } from "@/lib/analytics";
import { ChevronLeft, ChevronRight, Star } from "@/components/icons";
import ShoeImage from "@/components/ShoeImage";

function Countdown() {
  // Static-then-ticking countdown so SSR markup is stable, then hydrates.
  const [t, setT] = useState({ h: 8, m: 45, s: 32 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => {
        let { h, m, s } = p;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="flex items-center gap-1 font-mono text-sm font-bold text-brand">
      <Pill>{pad(t.h)}</Pill>:<Pill>{pad(t.m)}</Pill>:<Pill>{pad(t.s)}</Pill>
    </span>
  );
}
const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded bg-brand/10 px-1.5 py-0.5">{children}</span>
);

export default function DealsOfTheDay() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-ink">Deals of the Day</h2>
          <Countdown />
        </div>
        <button onClick={() => track("view_all_deals")} className="flex items-center gap-1 text-sm font-semibold text-brand">
          View All Deals <span aria-hidden>→</span>
        </button>
      </div>

      <div className="relative">
        <div className="no-scrollbar grid grid-flow-col gap-4 overflow-x-auto pb-2 [grid-auto-columns:minmax(180px,1fr)] md:grid-cols-5 md:grid-flow-row">
          {DEALS.map((d) => (
            <article
              key={d.id}
              className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition hover:shadow-lg"
            >
              <div className="relative">
                <span className="absolute left-2 top-2 z-10 rounded-md bg-brand px-2 py-0.5 text-[11px] font-bold text-white">
                  {d.off}% OFF
                </span>
                <button onClick={() => track("product_view", { id: d.id })} className="block w-full">
                  <ShoeImage
                    tone={d.tone}
                    src={d.image}
                    alt={d.name}
                    className="h-40 w-full"
                    rounded="rounded-none"
                  />
                </button>
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="line-clamp-1 text-sm font-medium text-ink">{d.name}</h3>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-base font-bold text-brand">₹{d.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{d.mrp}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                  <span className="font-medium text-gray-700">{d.rating}</span>
                  <span>({d.reviews})</span>
                </div>
                <button
                  onClick={() => openEarlyAccess("add_to_cart", { id: d.id })}
                  className="mt-3 rounded-lg bg-ink py-2 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        <NavArrow side="left" />
        <NavArrow side="right" />
      </div>
    </section>
  );
}

function NavArrow({ side }: { side: "left" | "right" }) {
  return (
    <button
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 hidden -translate-y-1/2 place-items-center rounded-full bg-white p-2 shadow-md ring-1 ring-black/5 md:grid ${
        side === "left" ? "-left-3" : "-right-3"
      }`}
    >
      {side === "left" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </button>
  );
}
