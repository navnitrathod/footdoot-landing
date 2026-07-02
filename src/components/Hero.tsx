"use client";

import Image from "next/image";
import { openEarlyAccess, track } from "@/lib/analytics";
import { Play, Scan } from "@/components/icons";
import { FeatureIcon } from "@/components/icons";

const TRUST = [
  { icon: "shield", title: "AI Fit Technology", sub: "Precision recommendations" },
  { icon: "tag", title: "Virtual Try-On", sub: "See before you buy" },
  { icon: "rotate", title: "7 Days Returns", sub: "Hassle-free returns" },
  { icon: "lock", title: "Secure Payments", sub: "100% safe & secure" },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl">
        {/* full-bleed background image */}
        <Image
          src="/hero-section.webp"
          alt="Footdoot footwear collection — sneakers, sandals and a handbag"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="object-cover object-center"
        />
        {/* readability scrim: solid-ish on the left, clears toward the products on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/10 sm:via-white/55 sm:to-transparent" />

        {/* content */}
        <div className="relative z-10 px-6 py-12 sm:px-10 lg:py-20">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-black/5">
              AI-Powered Fit Recommendations
            </span>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.03] tracking-tight text-ink sm:text-6xl">
              Your perfect fit.
              <br />
              <span className="text-brand">Every time.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-gray-700">
              Scan your feet, discover your size across brands, and shop
              comfortably from 1000+ styles.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <button
                onClick={() => openEarlyAccess("hero_scan_my_feet", { redirect: "/match" })}
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
              >
                <Scan className="h-5 w-5" />
                Scan My Feet
              </button>
              <button
                onClick={() => track("how_it_works_play")}
                className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-gray-400"
              >
                <Play className="h-5 w-5" />
                How it works
              </button>
            </div>

            <div className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {TRUST.map((t) => (
                <div key={t.title} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10">
                    <FeatureIcon name={t.icon} className="h-4 w-4 text-brand" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-ink">{t.title}</p>
                    <p className="text-[11px] text-gray-600">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* carousel dots */}
          <div className="mt-10 flex gap-1.5">
            <span className="h-2 w-5 rounded-full bg-brand" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
