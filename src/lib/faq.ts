// Single source of truth for sitewide FAQ content. The /faq page renders both
// the visible Q&A and the FAQPage JSON-LD from this list, so answer-engine
// structured data can never drift from what users actually see on the page.

export type Faq = { q: string; a: string };
export type FaqGroup = { id: string; title: string; faqs: Faq[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "sizing-fit",
    title: "Sizing & Fit",
    faqs: [
      {
        q: "How do I find my perfect shoe size on Footdoot?",
        a: "Tap “Scan My Feet” and let your phone camera measure your length, width and arch. Footdoot then recommends the right size for each brand you view — so you order the pair that actually fits, not just your usual number.",
      },
      {
        q: "What is the difference between “true to size”, “runs small” and “runs large”?",
        a: "“True to size” means the shoe fits at your usual size. “Runs small” means you should size up (the shoe fits tighter than labelled); “runs large” means you should size down. Footdoot factors each style’s fit into your scan-based recommendation, so you don’t have to guess.",
      },
      {
        q: "Why is my shoe size different across brands?",
        a: "Brands cut their lasts differently, so a size 9 in one brand can fit like an 8.5 in another. Footdoot maps your foot measurements to each brand’s real sizing, giving you a brand-specific recommendation instead of one universal number.",
      },
      {
        q: "How accurate is the Footdoot foot scan?",
        a: "The scan measures length, width and arch from your phone camera — no special hardware needed — and matches them against brand size charts. It gets more accurate the more you shop, learning from the fit of pairs you keep.",
      },
    ],
  },
  {
    id: "ordering-delivery",
    title: "Ordering & Delivery",
    faqs: [
      {
        q: "How long does delivery take?",
        a: "Most orders are delivered within 3–7 business days, depending on your location. You can track your order in real time from the Footdoot app.",
      },
      {
        q: "Do you offer cash on delivery?",
        a: "Yes. Footdoot supports cash on delivery along with UPI, cards, and popular wallets like Paytm — all payments are 100% secure.",
      },
      {
        q: "How much does shipping cost?",
        a: "Standard shipping is free on eligible orders. Any applicable delivery charge is shown clearly at checkout before you pay.",
      },
    ],
  },
  {
    id: "returns-exchange",
    title: "Returns & Exchange",
    faqs: [
      {
        q: "What is Footdoot's return policy?",
        a: "Footdoot offers 7-day easy returns and exchanges on all orders. If a pair doesn’t fit or isn’t right, start a return from the app within 7 days of delivery.",
      },
      {
        q: "How do I exchange for a different size?",
        a: "Open your order in the app, choose “Exchange”, and pick the new size — Footdoot’s fit scan suggests the size most likely to fit so the exchange gets it right the first time.",
      },
      {
        q: "Are returns free?",
        a: "Yes — returns and size exchanges within the 7-day window are free. We arrange pickup from your address.",
      },
    ],
  },
  {
    id: "try-on-tech",
    title: "Virtual Try-On & Fit Technology",
    faqs: [
      {
        q: "How does virtual try-on work?",
        a: "Footdoot’s AR try-on uses your phone camera to place a 3D model of the shoe on your own feet, so you can see how a pair looks from every angle before you buy.",
      },
      {
        q: "Do I need any special hardware to scan my feet?",
        a: "No. All you need is your phone’s camera — there’s no attachment, sensor or reference object required.",
      },
    ],
  },
  {
    id: "products-authenticity",
    title: "Products & Authenticity",
    faqs: [
      {
        q: "Are the products on Footdoot authentic?",
        a: "Yes — every product is 100% authentic, sourced from the brands or their authorised distributors.",
      },
      {
        q: "How many brands and styles can I shop?",
        a: "Footdoot brings together 1000+ styles from 500+ top footwear brands — including Nike, adidas, PUMA, Skechers, Red Tape and Clarks — all in one place.",
      },
    ],
  },
];

// Flattened list for building FAQPage JSON-LD.
export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.faqs);
