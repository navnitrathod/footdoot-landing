// Demo product catalog for the fake-door storefront. Deterministically
// generated (no randomness, so SSG output is stable) — swap for a real
// catalog later. Each category page lists these.

import { CATEGORIES, type Category } from "@/lib/data";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: string;
  category: string; // slug
  image: string;
  tone: string;
};

type CatSpec = {
  base: number;
  brands: string[];
  types: string[];
  tones: string[];
  description: string;
  faqs: { q: string; a: string }[];
};

const SPECS: Record<string, CatSpec> = {
  sneakers: {
    base: 1299,
    brands: ["Nike", "adidas", "PUMA", "Campus", "Asian", "Skechers"],
    types: ["Knit Sneaker", "Court Classic", "Retro Runner", "Canvas Low", "Mesh Trainer", "Street Low", "Lite Walk", "Air Cushion"],
    tones: ["#eef0f2", "#e9edf2", "#f4dfe6", "#e6e8ec"],
    description: "Everyday sneakers built for comfort and all-day style — from clean court classics to cushioned mesh trainers, across every top brand.",
    faqs: [
      { q: "What is the best sneaker size to order on Footdoot?", a: "Scan your feet with Footdoot's AI fit to get a brand-specific size — a size 9 in one sneaker brand can fit like an 8.5 in another." },
      { q: "Are these sneakers good for walking all day?", a: "Yes — most sneakers here use cushioned soles and breathable mesh, ideal for long walks and standing hours." },
    ],
  },
  "sports-shoes": {
    base: 1499,
    brands: ["Nike", "adidas", "PUMA", "Reebok", "New Balance", "Sparx"],
    types: ["Trail Runner", "Gym Trainer", "Marathon Pro", "Court Sport", "Speed Run", "Training Flex", "Lite Sprint", "Pro Walk"],
    tones: ["#e9edf2", "#eef0f2", "#e4ecf4", "#e6e8ec"],
    description: "Performance sports shoes for running, training and the gym — responsive cushioning, grip and breathability for every workout.",
    faqs: [
      { q: "Which sports shoes are best for running?", a: "Look for lightweight runners with responsive cushioning; Footdoot's walking analysis recommends a model based on your gait and pronation." },
      { q: "Can I use these for gym training?", a: "Yes — the trainer and flex models offer stable soles suited to gym and cross-training." },
    ],
  },
  "formal-shoes": {
    base: 1799,
    brands: ["Red Tape", "Clarks", "ALDO", "Bata", "Hush Puppies", "Louis Philippe"],
    types: ["Oxford", "Derby", "Brogue", "Monk Strap", "Loafer", "Slip-on Formal", "Cap-toe", "Penny Loafer"],
    tones: ["#e7d7c6", "#efe4d8", "#e6ddcf", "#e9d8c4"],
    description: "Office-ready formal shoes in genuine and vegan leather — Oxfords, Derbies, brogues and loafers that pair with suits and smart-casual alike.",
    faqs: [
      { q: "Are Footdoot formal shoes genuine leather?", a: "Each product page lists the material; we stock both genuine-leather and premium vegan-leather formals from top brands." },
      { q: "Which formal shoe is best for office wear?", a: "Black Oxfords and Derbies are the most versatile for office and formal occasions." },
    ],
  },
  "sandals-floaters": {
    base: 699,
    brands: ["Bata", "Campus", "PUMA", "adidas", "Crocs", "Sparx"],
    types: ["Cushion Slide", "Strap Floater", "Comfort Sandal", "Sport Slide", "Daily Floater", "Slip Sandal", "Trek Floater", "EVA Slide"],
    tones: ["#efe2d3", "#e7d7c6", "#e9edf2", "#f7ecdf"],
    description: "Lightweight sandals and floaters for everyday comfort, travel and monsoon — cushioned footbeds and quick-dry straps.",
    faqs: [
      { q: "Are these sandals good for daily walking?", a: "Yes — cushioned footbeds and grippy soles make them comfortable for daily wear and commuting." },
      { q: "Are Footdoot floaters waterproof?", a: "Most EVA and sport slides are water-friendly and quick-drying; check the product page for each model." },
    ],
  },
  heels: {
    base: 1199,
    brands: ["Catwalk", "ALDO", "Metro", "Mochi", "Inc.5", "Lavie"],
    types: ["Block Heel", "Stiletto", "Wedge", "Kitten Heel", "Platform Heel", "Ankle-strap Heel", "Pump", "Slingback"],
    tones: ["#f4dfe6", "#f7e8ed", "#efe2d3", "#e9d8c4"],
    description: "Heels for work and occasion — comfortable block heels and wedges to elegant stilettos and pumps, in season's best shades.",
    faqs: [
      { q: "Which heel height is most comfortable for all day?", a: "Block heels and wedges (2–3 inches) distribute weight better and are the most comfortable for long wear." },
      { q: "How do I pick the right heel size?", a: "Use Footdoot's foot scan for a precise fit — heels fit tighter than sneakers, so accurate sizing matters most here." },
    ],
  },
  flats: {
    base: 899,
    brands: ["Mochi", "Bata", "Catwalk", "Metro", "Inc.5", "Carlton London"],
    types: ["Ballet Flat", "Pointed Flat", "Loafer Flat", "Mule", "Slip-on Flat", "Bow Flat", "Juttis", "Espadrille"],
    tones: ["#f7ecdf", "#f4dfe6", "#e7d7c6", "#efe2d3"],
    description: "Versatile flats and ballerinas for work and everyday — soft cushioned soles in classic and statement styles.",
    faqs: [
      { q: "Are ballet flats good for office wear?", a: "Yes — pointed and classic ballet flats are office-appropriate and pair with both formal and casual outfits." },
      { q: "Do flats run true to size?", a: "Sizing varies by brand; Footdoot's fit scan recommends the right size for each flat you view." },
    ],
  },
  boots: {
    base: 2199,
    brands: ["Red Tape", "Clarks", "Woodland", "Timberland", "ALDO", "Carlton London"],
    types: ["Chelsea Boot", "Chukka", "Combat Boot", "Ankle Boot", "Hiking Boot", "Desert Boot", "Biker Boot", "Lace-up Boot"],
    tones: ["#e6e8ec", "#e7d7c6", "#efe4d8", "#e9d8c4"],
    description: "Boots for every season — rugged hiking and combat boots to sleek Chelsea and Chukka styles in leather and suede.",
    faqs: [
      { q: "Which boots are best for outdoor trekking?", a: "Hiking boots with high-grip lugged soles and ankle support are best for trails and uneven terrain." },
      { q: "How should boots fit?", a: "Boots should be snug at the heel with room at the toes — Footdoot's scan factors in sock thickness for the right size." },
    ],
  },
  accessories: {
    base: 599,
    brands: ["Footdoot", "Lavie", "Baggit", "Wildcraft", "Hidesign", "Caprese"],
    types: ["Backpack", "Sling Bag", "Tote", "Wallet", "Shoe Care Kit", "Socks Pack", "Laptop Bag", "Belt"],
    tones: ["#e4ecf4", "#f4dfe6", "#e7d7c6", "#eef0f2"],
    description: "Bags, backpacks and footwear accessories to complete the look — plus shoe-care essentials to keep every pair fresh.",
    faqs: [
      { q: "Does Footdoot sell shoe-care products?", a: "Yes — shoe-care kits, cleaning brushes and protectant sprays are available under accessories." },
      { q: "Are the bags genuine leather?", a: "We carry both genuine-leather and durable synthetic bags; the material is listed on each product." },
    ],
  },
};

const REVIEWS = ["1.2K", "845", "2.3K", "560", "3.1K", "990", "1.5K", "420", "780", "2.0K", "1.1K", "650"];
const PER_CATEGORY = 12;

function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategory(slug: string) {
  const cat = categoryBySlug(slug);
  const spec = SPECS[slug];
  if (!cat || !spec) return undefined;
  return { ...cat, description: spec.description, faqs: spec.faqs };
}

export function getCategorySlugs(): string[] {
  return CATEGORIES.filter((c) => SPECS[c.slug]).map((c) => c.slug);
}

export function getProductsByCategory(slug: string): Product[] {
  const cat = categoryBySlug(slug);
  const spec = SPECS[slug];
  if (!cat || !spec) return [];
  return Array.from({ length: PER_CATEGORY }, (_, i) => {
    const brand = spec.brands[i % spec.brands.length];
    const type = spec.types[i % spec.types.length];
    const gender = i % 3 === 0 ? "Men" : i % 3 === 1 ? "Women" : "Unisex";
    const bump = (i % 5) * 120;
    const price = spec.base + bump;
    const mrp = Math.round((price + 600 + (i % 4) * 250) / 10) * 10;
    return {
      id: `${slug}-${i + 1}`,
      name: `${brand} ${gender} ${type}`,
      brand,
      price,
      mrp,
      rating: +(3.9 + ((i % 9) * 0.1)).toFixed(1),
      reviews: REVIEWS[i % REVIEWS.length],
      category: slug,
      image: `/images/allproduct/${brand} ${gender} ${type}.webp`,
      tone: spec.tones[i % spec.tones.length],
    };
  });
}

/* ------------------------------------------------------------------ */
/* nav "sections" (Men / Women / Kids / …) — collections that reuse    */
/* the category products, served from the same SEO-friendly route.     */
/* ------------------------------------------------------------------ */
type SectionSpec = {
  name: string;
  description: string;
  from: string[];
  gender?: "Men" | "Women";
  kids?: boolean;
  faqs: { q: string; a: string }[];
};

const SECTION_SPECS: Record<string, SectionSpec> = {
  men: {
    name: "Men's Footwear",
    from: ["sneakers", "sports-shoes", "formal-shoes", "sandals-floaters", "boots"],
    gender: "Men",
    description: "Shop men's footwear online — sneakers, sports shoes, formal shoes, sandals and boots from top brands, with AI fit and easy returns.",
    faqs: [
      { q: "How do I find my men's shoe size online?", a: "Scan your feet with Footdoot's AI fit for a brand-accurate size — sizing differs between sneaker, formal and sports brands." },
      { q: "Which men's shoes are best for daily wear?", a: "Cushioned sneakers and slip-ons are the most versatile for everyday use; formal Derbies suit office wear." },
    ],
  },
  women: {
    name: "Women's Footwear",
    from: ["heels", "flats", "sandals-floaters", "sneakers", "sports-shoes"],
    gender: "Women",
    description: "Shop women's footwear online — heels, flats, sandals, sneakers and sports shoes in the season's best styles, with AI fit and easy returns.",
    faqs: [
      { q: "How should women's heels and flats fit?", a: "Heels fit tighter than sneakers — use Footdoot's foot scan for a precise size so there's no slipping or pinching." },
      { q: "Which women's shoes are most comfortable for all day?", a: "Block heels, cushioned flats and sneakers offer the best all-day comfort." },
    ],
  },
  kids: {
    name: "Kids' Footwear",
    from: ["sneakers", "sports-shoes", "sandals-floaters"],
    kids: true,
    description: "Shop kids' footwear online — durable, comfortable sneakers, sports shoes and sandals built for growing feet, with easy returns.",
    faqs: [
      { q: "How do I pick the right kids' shoe size?", a: "Leave a little growing room — Footdoot's scan recommends a size with the right toe allowance for kids." },
      { q: "Are these kids' shoes durable?", a: "Yes — they use sturdy soles and reinforced toes to handle active play." },
    ],
  },
  sports: {
    name: "Sports & Active",
    from: ["sports-shoes", "sneakers"],
    description: "Sports and active footwear for running, training and the gym — responsive cushioning, grip and breathability for every workout.",
    faqs: [
      { q: "Which shoes are best for running?", a: "Lightweight runners with responsive cushioning; Footdoot's walking analysis recommends a pair based on your gait." },
      { q: "Can I use sports shoes for the gym?", a: "Yes — trainers with stable soles suit gym and cross-training." },
    ],
  },
  formal: {
    name: "Formal Footwear",
    from: ["formal-shoes", "boots"],
    description: "Formal footwear for the office and occasions — Oxfords, Derbies, brogues, loafers and dress boots in leather and vegan leather.",
    faqs: [
      { q: "Which formal shoe is best for office wear?", a: "Black Oxfords and Derbies are the most versatile for office and formal occasions." },
      { q: "Are these formal shoes genuine leather?", a: "Each product lists its material — we stock both genuine and premium vegan leather." },
    ],
  },
  casual: {
    name: "Casual Footwear",
    from: ["sneakers", "sandals-floaters", "flats"],
    description: "Casual footwear for everyday comfort — sneakers, sandals, slip-ons and flats that go with everything.",
    faqs: [
      { q: "What are the best casual shoes for daily wear?", a: "Cushioned sneakers and slip-ons are the most comfortable and versatile for daily casual wear." },
      { q: "Do casual shoes run true to size?", a: "Sizing varies by brand; Footdoot's fit scan recommends the right size for each pair." },
    ],
  },
  brands: {
    name: "Shop by Brand",
    from: ["sneakers", "sports-shoes", "formal-shoes", "heels"],
    description: "Shop footwear from top brands — Nike, adidas, PUMA, Skechers, Red Tape, Clarks, Campus and more, all in one place with AI fit.",
    faqs: [
      { q: "Which brands does Footdoot stock?", a: "Footdoot brings together 500+ top footwear brands including Nike, adidas, PUMA, Skechers, Reebok, New Balance, Red Tape and Clarks." },
      { q: "Are all brand products authentic?", a: "Yes — every product is 100% authentic and sourced from the brands or authorised distributors." },
    ],
  },
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
  faqs: { q: string; a: string }[];
  products: Product[];
};

function buildSectionProducts(slug: string, spec: SectionSpec): Product[] {
  const pool = spec.from.flatMap((cs) => getProductsByCategory(cs));
  const filtered = spec.gender
    ? pool.filter((p) => p.name.includes(spec.gender as string) || p.name.includes("Unisex"))
    : pool;

  // round-robin across source categories for variety
  const byCat: Record<string, Product[]> = {};
  filtered.forEach((p) => {
    (byCat[p.category] = byCat[p.category] || []).push(p);
  });
  const cats = Object.keys(byCat);
  const out: Product[] = [];
  let i = 0;
  while (out.length < 12 && cats.some((c) => byCat[c][i])) {
    for (const c of cats) {
      if (byCat[c][i]) out.push(byCat[c][i]);
      if (out.length >= 12) break;
    }
    i++;
  }
  return out.slice(0, 12).map((p, idx) => ({
    ...p,
    id: `${slug}-${idx + 1}`,
    name: spec.kids ? p.name.replace(/\b(Men|Women|Unisex)\b/, "Kids") : p.name,
  }));
}

export function getCollection(slug: string): Collection | undefined {
  const cat = getCategory(slug);
  if (cat) {
    return { slug, name: cat.name, description: cat.description, faqs: cat.faqs, products: getProductsByCategory(slug) };
  }
  const sec = SECTION_SPECS[slug];
  if (sec) {
    return { slug, name: sec.name, description: sec.description, faqs: sec.faqs, products: buildSectionProducts(slug, sec) };
  }
  return undefined;
}

export function getAllSlugs(): string[] {
  return [...getCategorySlugs(), ...Object.keys(SECTION_SPECS)];
}
