"use client";

import { APP_FEATURES } from "@/lib/data";
import { openEarlyAccess } from "@/lib/analytics";
import { FeatureIcon } from "@/components/icons";
import ShoeImage from "@/components/ShoeImage";

export default function AppPromo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="grid items-center gap-8 rounded-3xl bg-gradient-to-br from-rose-50 to-orange-50 px-6 py-10 sm:px-10 lg:grid-cols-3">
        {/* left */}
        <div>
          <p className="text-sm font-semibold text-brand">The Footdoot App</p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight text-ink">
            Shop smarter.
            <br />
            Anywhere, anytime.
          </h2>
          <div className="mt-7 grid grid-cols-2 gap-5">
            {APP_FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-2">
                <FeatureIcon
                  name={f.icon}
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">{f.title}</p>
                  <p className="text-[11px] text-gray-500">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* phone */}
        <div className="flex justify-center">
          <div className="relative h-72 w-40 rounded-[26px] border-[5px] border-ink bg-white p-2 shadow-2xl">
            <div className="flex items-center justify-between px-1 text-[9px] text-gray-500">
              <span>9:41</span>
              <span className="font-bold text-ink">footdoot</span>
              <span>▢</span>
            </div>
            <p className="mt-2 text-[10px] font-medium text-gray-600">
              Hi, Rohan
            </p>
            <div className="mt-1 flex items-center gap-2 rounded-lg bg-brand p-2 text-white">
              <div className="leading-tight">
                <p className="text-[10px] font-bold">New Arrivals</p>
                <p className="text-[8px]">Just for you!</p>
                <span className="mt-1 inline-block rounded bg-white px-1.5 py-0.5 text-[7px] font-semibold text-brand">
                  Shop Now
                </span>
              </div>
              <ShoeImage
                tone="#f1f1f3"
                src="/images/app/app-product-sneaker.svg"
                alt="New arrival sneaker"
                className="ml-auto h-10 w-12"
                rounded="rounded"
              />
            </div>
            <p className="mt-2 text-[9px] font-medium text-gray-500">
              Top Categories
            </p>
            <div className="mt-1 flex gap-1">
              {[
                {
                  tone: "#eef0f2",
                  src: "/images/app/app-product-sneaker.svg",
                  alt: "Sneaker",
                },
                {
                  tone: "#e7d2b8",
                  src: "/images/app/app-product-sandal.svg",
                  alt: "Sandal",
                },
                {
                  tone: "#f4dfe6",
                  src: "/images/app/app-product-heel.svg",
                  alt: "Heel",
                },
                {
                  tone: "#e4ecf4",
                  src: "/images/app/app-product-bag.svg",
                  alt: "Accessory",
                },
              ].map((item) => (
                <ShoeImage
                  key={item.src}
                  tone={item.tone}
                  src={item.src}
                  alt={item.alt}
                  className="h-7 w-7"
                  rounded="rounded"
                />
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <div>
          <h3 className="text-xl font-bold text-ink">
            Download the App and get <span className="text-brand">10% OFF</span>{" "}
            on your first order!
          </h3>
          <div className="mt-5 flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-lg bg-white p-1.5 shadow">
              <QR />
            </div>
            <div className="flex flex-col gap-2">
              <StoreBadge
                label="Google Play"
                sub="GET IT ON"
                onClick={() => openEarlyAccess("app_download")}
              />
              <StoreBadge
                label="App Store"
                sub="Download on the"
                onClick={() => openEarlyAccess("app_download")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreBadge({
  label,
  sub,
  onClick,
}: {
  label: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-ink px-3 py-1.5 text-left text-white"
    >
      <span className="text-lg">▶</span>
      <span className="leading-tight">
        <span className="block text-[8px] text-gray-300">{sub}</span>
        <span className="block text-xs font-semibold">{label}</span>
      </span>
    </button>
  );
}

function QR() {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      <rect width="40" height="40" fill="#fff" />
      {Array.from({ length: 64 }).map((_, i) => {
        const x = (i % 8) * 5;
        const y = Math.floor(i / 8) * 5;
        const on = (i * 7 + (i % 5)) % 3 === 0;
        return on ? (
          <rect key={i} x={x} y={y} width="5" height="5" fill="#000" />
        ) : null;
      })}
    </svg>
  );
}
