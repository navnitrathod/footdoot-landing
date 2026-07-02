import { WHY } from "@/lib/data";
import { FeatureIcon } from "@/components/icons";

export default function WhyShop() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8">
      <h2 className="text-center text-xl font-bold text-ink">
        Why shop with <span className="text-brand">Footdoot?</span>
      </h2>
      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {WHY.map((w) => (
          <div key={w.title} className="flex flex-col items-center text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-brand/20 bg-brand/5">
              <FeatureIcon name={w.icon} className="h-6 w-6 text-brand" />
            </span>
            <h3 className="mt-3 text-sm font-semibold text-ink">{w.title}</h3>
            <p className="mt-1 text-[11px] leading-snug text-gray-500">{w.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
