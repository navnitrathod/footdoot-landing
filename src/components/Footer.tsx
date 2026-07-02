import Link from "next/link";
import { Logo } from "@/components/icons";

type FooterLink = { label: string; href: string };

const COLS: { head: string; links: FooterLink[] }[] = [
  {
    head: "Shop",
    links: [
      { label: "Men", href: "/men" },
      { label: "Women", href: "/women" },
      { label: "Kids", href: "/kids" },
      { label: "Sports", href: "/sports" },
      { label: "Sale", href: "/sneakers" },
    ],
  },
  {
    head: "Help",
    links: [
      { label: "Track Order", href: "#" },
      { label: "Returns & Exchange", href: "/faq#returns-exchange" },
      { label: "Shipping Info", href: "/faq#ordering-delivery" },
      { label: "FAQs", href: "/faq" },
      { label: "Size Guide", href: "/faq#sizing-fit" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
];

const PAY = ["VISA", "Mastercard", "UPI", "Paytm", "RuPay"];
const SOCIAL = ["f", "◎", "𝕏", "▶"];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gradient-to-b from-rose-50/40 to-gray-50 text-gray-600">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 lg:grid-cols-6 lg:px-8">
        {/* brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 text-ink">
            <Logo className="h-10 w-10" />
            <span className="text-xl font-extrabold">footdoot</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-gray-500">
            Your perfect fit. Anywhere. Shop from 1000+ styles across top brands
            at the best prices.
          </p>
          <div className="mt-4 flex gap-3">
            {SOCIAL.map((s, i) => (
              <span
                key={i}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white text-sm text-gray-600 shadow-sm ring-1 ring-gray-200 transition hover:bg-brand hover:text-white hover:ring-brand"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* link columns */}
        {COLS.map((c) => (
          <div key={c.head}>
            <h3 className="text-sm font-semibold text-ink">{c.head}</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-brand">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* contact */}
        <div>
          <h3 className="text-sm font-semibold text-ink">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            <li>support@footdoot.com</li>
            <li>+91 98765 43210</li>
            <li>Mon - Sat (9AM - 9PM)</li>
          </ul>
          <h3 className="mt-5 text-sm font-semibold text-ink">We Accept</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PAY.map((p) => (
              <span key={p} className="rounded bg-white px-2 py-1 text-[10px] font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-5 text-center text-xs text-gray-400">
        © 2024 Footdoot. All rights reserved.
      </div>
    </footer>
  );
}
