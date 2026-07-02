import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getAllSlugs, getCollection, getCategorySlugs, getCategory } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

// Pre-render every collection at build time → instant, cacheable pages.
export const dynamicParams = false;
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) return {};
  const title = `${col.name} — Buy ${col.name} Online`;
  return {
    title,
    description: col.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${slug}`,
      title: `${title} | Footdoot`,
      description: col.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CollectionPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) notFound();

  const products = col.products;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: col.name, item: `${SITE_URL}/${slug}` },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${col.name} — Footdoot`,
        description: col.description,
        url: `${SITE_URL}/${slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: products.length,
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              brand: { "@type": "Brand", name: p.brand },
              category: col.name,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: p.rating,
                reviewCount: Number(String(p.reviews).replace("K", "")) || 100,
              },
              offers: {
                "@type": "Offer",
                price: p.price,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: col.faqs.map((f) => ({
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
        <div className="mx-auto max-w-[1280px] px-4 py-6 lg:px-8">
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span className="px-2">/</span>
            <span className="font-medium text-ink">{col.name}</span>
          </nav>

          <header className="mt-4 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 px-6 py-7">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{col.name}</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">{col.description}</p>
            <p className="mt-3 text-xs font-semibold text-gray-500">{products.length} styles</p>
          </header>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-ink">{products.length}</span> products
            </p>
            <span className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600">Sort: Popularity</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <section className="mt-12 border-t border-gray-100 pt-8">
            <h2 className="text-lg font-bold text-ink">About {col.name} at Footdoot</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">{col.description}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {col.faqs.map((f) => (
                <div key={f.q} className="rounded-xl bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-ink">{f.q}</h3>
                  <p className="mt-1.5 text-sm text-gray-600">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <nav className="mt-10 flex flex-wrap gap-2" aria-label="Browse categories">
            {getCategorySlugs()
              .filter((s) => s !== slug)
              .map((s) => {
                const c = getCategory(s)!;
                return (
                  <Link
                    key={s}
                    href={`/${s}`}
                    className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600 transition hover:border-brand hover:text-brand"
                  >
                    {c.name}
                  </Link>
                );
              })}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
