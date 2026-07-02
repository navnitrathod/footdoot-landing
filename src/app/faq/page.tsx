import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { FAQ_GROUPS, ALL_FAQS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Footdoot FAQ — Sizing, Delivery, Returns & Fit Technology",
  description:
    "Answers to common Footdoot questions: how to find your perfect shoe size, true-to-size vs runs small, delivery times, 7-day returns and how the AI foot scan and AR try-on work.",
  alternates: { canonical: "/faq" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/faq`,
    title: "Footdoot FAQ — Sizing, Delivery, Returns & Fit Technology | Footdoot",
    description:
      "Answers to common questions about sizing, delivery, returns and Footdoot's AI fit technology.",
  },
};

// Answer-first lead paragraph (~55 words) — concise and directly quotable for
// featured snippets / People Also Ask.
const LEAD =
  "Footdoot is an AI-powered footwear marketplace. Scan your feet once to get a size that fits across brands, try shoes on virtually in AR, and shop 1000+ styles with free 7-day returns. Below are answers to the most common questions about sizing, delivery, returns and our fit technology.";

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/faq#faq`,
        mainEntity: ALL_FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-6 lg:px-8">
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span className="px-2">/</span>
            <span className="font-medium text-ink">FAQ</span>
          </nav>

          <header className="mt-4 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 px-6 py-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">{LEAD}</p>
          </header>

          {/* on-page topic jump links — internal linking + PAA structure */}
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="FAQ topics">
            {FAQ_GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600 transition hover:border-brand hover:text-brand"
              >
                {g.title}
              </a>
            ))}
          </nav>

          {FAQ_GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="mt-10 scroll-mt-24">
              <h2 className="text-lg font-bold text-ink">{g.title}</h2>
              <div className="mt-4 space-y-3">
                {g.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-xl border border-gray-100 bg-gray-50 p-4 open:bg-white open:ring-1 open:ring-black/5"
                  >
                    <summary className="cursor-pointer list-none text-sm font-semibold text-ink marker:content-none">
                      {f.q}
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-12 border-t border-gray-100 pt-8">
            <h2 className="text-lg font-bold text-ink">Still deciding?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
              Find your fit in a couple of taps, or browse the collections to see what’s in.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/match"
                className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Find your match
              </Link>
              {["men", "women", "sneakers", "sports-shoes"].map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-brand hover:text-brand"
                >
                  {slug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
