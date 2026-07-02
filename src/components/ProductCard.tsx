"use client";

import type { Product } from "@/lib/products";
import { openEarlyAccess, track } from "@/lib/analytics";
import { Star } from "@/components/icons";
import ShoeImage from "@/components/ShoeImage";

export default function ProductCard({ product }: { product: Product }) {
  const off = Math.round((1 - product.price / product.mrp) * 100);
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition hover:shadow-lg">
      <div className="relative">
        {off > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-md bg-brand px-2 py-0.5 text-[11px] font-bold text-white">
            {off}% OFF
          </span>
        )}
        <button
          onClick={() => track("product_view", { id: product.id })}
          className="block w-full"
          aria-label={product.name}
        >
          <div className="aspect-square w-full">
            <ShoeImage tone={product.tone} src={product.image} alt={product.name} className="h-full w-full" rounded="rounded-none" />
          </div>
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{product.brand}</p>
        <h3 className="line-clamp-1 text-sm font-medium text-ink">{product.name}</h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-base font-bold text-brand">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <Star className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-medium text-gray-700">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <button
          onClick={() => openEarlyAccess("add_to_cart", { id: product.id })}
          className="mt-3 rounded-lg bg-ink py-2 text-xs font-semibold text-white transition group-hover:bg-brand"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
