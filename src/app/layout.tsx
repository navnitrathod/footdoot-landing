import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import { SITE_URL, GOOGLE_SITE_VERIFICATION } from "@/lib/site";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Footdoot — Your Perfect Fit. Anywhere. | Shop 1000+ Footwear Styles",
    template: "%s | Footdoot",
  },
  description:
    "Footdoot is the AI-powered footwear marketplace. Scan your feet for true cross-brand sizing, try shoes on virtually with AR, and shop 1000+ styles from top brands with easy 7-day returns.",
  keywords: [
    "footwear marketplace",
    "AI shoe fit",
    "virtual shoe try-on",
    "foot scanning size recommendation",
    "buy shoes online",
    "perfect shoe size",
    "sneakers formal shoes sandals",
  ],
  applicationName: "Footdoot",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Footdoot",
    title: "Footdoot — Your Perfect Fit. Anywhere.",
    description:
      "Scan your feet, get the size that fits across brands, try shoes on in AR, and shop 1000+ styles with confidence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Footdoot — Your Perfect Fit. Anywhere.",
    description:
      "AI-powered footwear marketplace: foot scanning, cross-brand sizing, virtual try-on, 1000+ styles.",
  },
  robots: { index: true, follow: true },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#E5261F",
};

// Sitewide entity graph: Organization + WebSite belong on every page so search
// and AI answer engines resolve a consistent brand entity. FAQPage is
// intentionally NOT global — it lives on pages that visibly show the questions
// (/faq and each collection page), per Google's "content must be visible" rule,
// so we don't emit duplicate or invisible FAQPage markup sitewide.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Footdoot",
      url: SITE_URL,
      description:
        "AI-powered footwear marketplace offering foot scanning, cross-brand size recommendations, virtual try-on and 1000+ shoe styles.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@footdoot.com",
        telephone: "+91-98765-43210",
        contactType: "customer support",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: "Footdoot",
      publisher: { "@id": `${SITE_URL}/#org` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={query}`,
        "query-input": "required name=query",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <EarlyAccessModal />
      </body>
    </html>
  );
}
