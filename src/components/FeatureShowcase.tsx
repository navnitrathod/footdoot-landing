"use client";

import { openEarlyAccess } from "@/lib/analytics";
import ShoeImage from "@/components/ShoeImage";

export default function FeatureShowcase() {
  return (
    <section className="mx-auto grid max-w-[1280px] gap-5 px-4 py-4 md:grid-cols-3 lg:px-8">
      {/* AI Fit */}
      <Card
        title="AI Fit Technology"
        body="We analyze 20+ foot measurements for the perfect fit."
        cta="Learn more"
        onClick={() => openEarlyAccess("ai_fit_learn_more")}
        visual={<FootScan />}
      />
      {/* Virtual Try-On */}
      <Card
        title="Virtual Try-On"
        body="See how it looks on you using AR technology."
        cta="Try now"
        onClick={() => openEarlyAccess("virtual_try_on")}
        visual={<PhoneTryOn />}
      />
      {/* Worry-Free */}
      <Card
        title="Worry-Free Shopping"
        body="7 days easy return and exchange on all orders."
        cta="Know more"
        onClick={() => openEarlyAccess("ai_fit_learn_more")}
        visual={<ReturnsBox />}
      />
    </section>
  );
}

function Card({
  title,
  body,
  cta,
  onClick,
  visual,
}: {
  title: string;
  body: string;
  cta: string;
  onClick: () => void;
  visual: React.ReactNode;
}) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-2xl bg-gray-50 ring-1 ring-black/5">
      <div className="flex flex-1 flex-col justify-center p-5">
        <h3 className="text-base font-bold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-muted">{body}</p>
        <button onClick={onClick} className="mt-3 flex items-center gap-1 text-sm font-semibold text-brand">
          {cta} <span aria-hidden>→</span>
        </button>
      </div>
      <div className="w-2/5 shrink-0">{visual}</div>
    </div>
  );
}

function FootScan() {
  return (
    <div className="relative grid h-full min-h-[150px] place-items-center bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,38,31,0.35),transparent_60%)]" />
      <svg viewBox="0 0 120 120" className="h-28 w-28">
        <circle cx="60" cy="60" r="48" fill="none" stroke="#e5261f" strokeWidth="1" opacity="0.6" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="#e5261f" strokeWidth="0.7" opacity="0.4" />
        <path d="M44 28c-5 12-6 30-4 50 2 16 10 26 23 26 10 0 16-8 18-19 1-10-1-19-1-29 0-12-3-23-9-28-9-7-22-7-27 0z" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.85" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1="34" x2="86" y1={36 + i * 12} y2={36 + i * 12} stroke="#e5261f" strokeWidth="0.5" opacity="0.4" />
        ))}
      </svg>
    </div>
  );
}

function PhoneTryOn() {
  return (
    <div className="relative grid h-full min-h-[150px] place-items-center bg-gradient-to-b from-gray-100 to-gray-200 p-3">
      <div className="relative h-[92%] w-[58%] rounded-[14px] bg-ink p-1 shadow-lg">
        <div className="flex h-full flex-col items-center justify-end overflow-hidden rounded-[11px] bg-gradient-to-b from-stone-200 to-stone-300">
          <ShoeImage
            tone="#f5f5f5"
            src="/images/app/app-product-sneaker.svg"
            alt="Virtual try-on sneaker preview"
            className="mb-4 h-10 w-16"
            rounded="rounded-md"
          />
        </div>
        <div className="absolute right-1.5 top-1/3 flex flex-col gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[9px] shadow">♡</span>
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-[9px] text-white shadow">↺</span>
        </div>
      </div>
    </div>
  );
}

function ReturnsBox() {
  return (
    <div className="relative grid h-full min-h-[150px] place-items-center bg-gray-100 p-4">
      <div className="relative h-20 w-28 rounded-md bg-ink shadow-xl">
        <div className="absolute left-1/2 top-3 -translate-x-1/2 text-[10px] font-bold text-white">footdoot</div>
        <div className="absolute -bottom-1 right-2 rotate-[-8deg] rounded-sm bg-brand px-2 py-0.5 text-[8px] font-bold text-white shadow">
          Easy Returns
        </div>
      </div>
    </div>
  );
}
