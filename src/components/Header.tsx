"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/data";
import { openEarlyAccess, track } from "@/lib/analytics";
import { Cart, Heart, Logo, Scan, Search } from "@/components/icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-3 lg:px-8">
        {/* top row */}
        <div className="flex items-center gap-6">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2 text-ink">
            <Logo className="h-11 w-11" />
            <span className="text-2xl font-extrabold tracking-tight">footdoot</span>
          </Link>

          {/* search */}
          <div className="hidden flex-1 md:block">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-500 ring-1 ring-transparent focus-within:ring-brand/40">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                placeholder="Search for shoes, sandals, heels, bags & more..."
                className="w-full bg-transparent outline-none placeholder:text-gray-400"
                onFocus={() => track("search_focus")}
              />
            </div>
          </div>

          {/* actions */}
          <div className="ml-auto flex items-center gap-5 text-ink md:ml-0">
            <Action icon={<Scan className="h-5 w-5" />} title="Try & Fit" sub="Find your size" onClick={() => openEarlyAccess("nav_try_and_fit", { redirect: "/match" })} />
            <Action icon={<Cart className="h-5 w-5" />} title="Track Order" sub="Live Tracking" onClick={() => openEarlyAccess("nav_try_and_fit")} />
            <Action icon={<Heart className="h-5 w-5" />} title="Wishlist" sub="Saved items" onClick={() => track("wishlist_open")} />
            <button aria-label="Cart" className="relative flex items-center gap-2 text-ink hover:text-brand" onClick={() => track("cart_open")}>
              <span className="relative">
                <Cart className="h-5 w-5" />
                <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                  2
                </span>
              </span>
              <span className="hidden flex-col leading-none text-left lg:flex">
                <span className="text-sm font-semibold">Cart</span>
              </span>
            </button>
          </div>
        </div>

        {/* nav row */}
        <nav className="mt-3 hidden items-center justify-center gap-7 text-sm font-medium text-gray-700 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l}
              href={`/${l.toLowerCase()}`}
              className="transition hover:text-brand"
              onClick={() => track("nav_click", { link: l })}
            >
              {l}
            </Link>
          ))}
          <Link href="/sneakers" className="font-semibold text-brand" onClick={() => track("nav_click", { link: "Sale" })}>
            Sale
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Action({
  icon,
  title,
  sub,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="hidden items-center gap-2 text-ink hover:text-brand sm:flex">
      {icon}
      <span className="hidden flex-col leading-none text-left lg:flex">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-[10px] text-gray-400">{sub}</span>
      </span>
    </button>
  );
}
