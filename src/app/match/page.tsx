import type { Metadata } from "next";
import MatchExperience from "@/components/match/MatchExperience";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find Your Footwear Match — 6 quick taps",
  description:
    "Answer 6 quick questions about your style, routine and budget, and Footdoot hand-picks 5 pairs matched to how you actually live.",
  alternates: { canonical: "/match" },
  robots: { index: true, follow: true },
};

// HowTo structured data for the foot-scan → fit flow. Answer engines and
// Google's HowTo rich results can lift these steps directly.
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to find your perfect shoe size with Footdoot",
  description:
    "Use Footdoot's AI foot scan to get a shoe size that fits across brands, then try shoes on in AR before you buy.",
  totalTime: "PT2M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the fit scanner",
      text: "Tap “Scan My Feet” on Footdoot and allow camera access.",
      url: `${SITE_URL}/match`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Scan both feet",
      text: "Follow the on-screen guide to capture each foot. Footdoot measures your length, width and arch — no special hardware needed.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Get your true size",
      text: "Footdoot converts your measurements into a brand-specific size for every product, because a size 9 in one brand can fit like an 8.5 in another.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Try shoes on virtually",
      text: "Use AR try-on to see how a pair looks on your own feet from every angle before buying.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Order with confidence",
      text: "Add your recommended size to cart and check out — every order is backed by free 7-day returns.",
    },
  ],
};

export default function MatchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <MatchExperience />
    </>
  );
}
