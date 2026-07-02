import { TESTIMONIALS } from "@/lib/data";
import { Star } from "@/components/icons";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 lg:px-8">
      <h2 className="mb-7 text-center text-xl font-bold text-ink">Loved by Thousands</h2>
      <div className="no-scrollbar grid grid-flow-col gap-4 overflow-x-auto pb-2 [grid-auto-columns:minmax(260px,1fr)] lg:grid-cols-4 lg:grid-flow-row">
        {TESTIMONIALS.slice(0, 5).map((t) => (
          <figure key={t.name} className="flex flex-col rounded-2xl bg-gray-50 p-5 ring-1 ring-black/5">
            <div className="flex gap-0.5 text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                {t.name.charAt(0)}
              </span>
              <span className="text-sm font-medium text-gray-600">— {t.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
