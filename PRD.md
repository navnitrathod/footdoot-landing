# PRD — FootDoot: Fake-Door Validation Storefront

**Status:** Draft v2
**Owner:** Henil Mehta
**Date:** 2026-06-30
**Type:** Fake-door / Wizard-of-Oz validation (looks live, isn't)
**Stack:** Next.js (App Router) — chosen for SEO + AEO + GEO

---

## 1. Purpose & Strategy

We are running a **fake-door test**. The site presents itself as a **fully
launched, premium footwear marketplace** — AR try-on, foot scanning, AI fit,
500+ brands, real catalog, checkout. **None of it is actually built.**

The visitor must never feel they're looking at a prototype, a survey, or a
"coming soon" page. They believe FootDoot is a real, working product. We then
measure their **genuine, unprompted behavior**:

> *Do real people, who think this product exists, try to use it and try to buy?*

This produces far truer demand signal than a waitlist form, because there is no
"would you…?" framing — only real intent expressed through real clicks.

**The illusion breaks only at the last possible moment**, gracefully, when a user
takes a high-intent action (scan feet / try-on / checkout). At that point we show
a believable "launching in your region soon — be first to get access" interstitial
that captures their contact info *as a consequence of their intent*, not as the
ask.

---

## 2. Why this beats a waitlist form (the v1 approach we rejected)

| Waitlist form | Fake-door storefront |
|---|---|
| "Would you want this?" (hypothetical) | "Try to use it" (real behavior) |
| Self-reported intent (inflated) | Revealed intent (clicks, depth, checkout attempts) |
| Selects for enthusiasts | Captures normal shoppers |
| One signal (sign-up) | Rich funnel (browse → try → cart → buy intent) |

---

## 3. Goals & Non-Goals

### Goals
- Make a **convincingly real** storefront (visually matches the mockup).
- Instrument **every meaningful action** to measure revealed demand.
- Identify which "magic" features pull people in (Scan My Feet, Virtual Try-On, AI Fit).
- Capture contact info **only at the high-intent moment**, framed as early access.
- Rank top SEO/AEO/GEO so the site is *discoverable* and gets organic traffic + AI citations.

### Non-Goals
- No real AR, foot scanning, ML, inventory, payments, or fulfillment.
- No "this is a prototype / survey / waitlist" messaging anywhere on the main experience.
- No real money charged. (See §9 Ethics.)
- No user accounts/login that actually persist anything functional.

---

## 4. The Experience (must match the mockup)

A real-feeling, SSR'd Next.js storefront. Reference design = the provided mockup.

### 4.1 Global nav
- Logo **footdoot** (F mark, red accent).
- Categories: Men · Women · Kids · Sports · Formal · Casual · Accessories · Brands · **Sale** (red).
- **Try & Fit** badge, search bar, wishlist, cart (with item count), account icon.
- All links work and lead to believable, populated pages.

### 4.2 Hero (dark, premium)
- Headline: **"Your perfect fit. Anywhere."** (Anywhere in red.)
- Sub: "Scan. Discover. Try virtually. Shop from 500+ top brands."
- Primary CTA: **Scan My Feet** (red) → triggers the high-intent flow (§5).
- Secondary CTA: **How it works** (opens a slick concept video/animation).
- Floating product shots + category orbit (Casual / Sneakers / Formal / Sandals).
- Trust strip: AI-Powered Fit · Virtual Try-On · Easy Returns · 100% Authentic.

### 4.3 Category rail
Sneakers · Sports Shoes · Formal Shoes · Sandals & Floaters · Heels · Flats · Boots · Accessories · View All. Each opens a populated listing page.

### 4.4 Top Brands
"Top Brands. Endless Choices." — Nike, Adidas, Puma, Skechers, Reebok, New Balance, Aldo, Clarks, Campus, Red Tape, … (logos as carousel).

### 4.5 Feature showcase cards
- **AI Fit Technology** — "We analyze 20+ foot measurements for the perfect fit." → Learn more.
- **Virtual Try-On** — "See how it looks on you using AR technology." → Try now.
- **Worry-Free Shopping** — "7 days easy return and exchange." → Know more.

### 4.6 Product sections
- **Recommended For You**, Trending, New Arrivals, Best in <City> — populated with
  real-looking product cards (image, brand, name, price, rating, "Try On" / "Add to cart").
- Product detail pages (PDP) with 360° gallery, size selector, comfort score,
  reviews — all believable, all instrumented.

### 4.7 The catalog is fake but believable
- Use real brand names + license-free or placeholder product imagery.
- Prices, ratings, "in stock", review snippets are seeded static data.
- Everything is SSG/ISR so it loads instantly and indexes well.

---

## 5. The Fake-Door Mechanics (where intent is captured)

Each "magic" action runs a believable flow, then converts intent into a captured signal:

1. **Scan My Feet** → opens a camera-permission-style screen / animated "scanning…"
   → resolves to: *"FootDoot AI fit is rolling out in your city. Get early access —
   we'll notify you the moment scanning is live near you."* → email/phone capture.
2. **Virtual Try-On / Try On** (on PDP) → "Launching in your region — reserve your
   spot for early AR access." → capture.
3. **Add to Cart → Checkout** → realistic cart & checkout UI; at payment step:
   *"We're onboarding your area now. Reserve this pair at launch price."* → capture
   (no payment taken). This is the **strongest** purchase-intent signal.
4. **Talk to a footwear expert / Home trial** → "Booking opens at launch" → capture.

Capture is always framed as a **benefit unlocked by their action**, never as a survey.

---

## 6. Instrumentation & Metrics

Analytics: PostHog (or GA4) for full funnel + session replay + heatmaps.

### Tracked events (the real product spec)
- `page_view` (with path, referrer, device, geo)
- `hero_cta_scan_click`, `how_it_works_play`
- `category_click`, `brand_click`, `search_query`
- `product_view`, `try_on_click`, `add_to_wishlist`
- `add_to_cart`, `begin_checkout`, **`purchase_intent`** (hit pay wall)
- `early_access_captured` (email/phone submitted), with `source_action`
- Scroll depth, time on page, return visits.

### Success metrics (go / no-go)
**Revealed-intent funnel (primary):**
- **Visit → product_view rate** (are they actually shopping?) — target ≥ 40%.
- **product_view → high-intent action** (scan / try-on / add_to_cart) — target ≥ 15%.
- **high-intent → purchase_intent** (reach the fake pay wall) — target ≥ 25%.
- **Email/phone capture rate among high-intent users** — target ≥ 30%.
- **Absolute: first 100 `purchase_intent` events** = strong green light.

**Feature pull:** which CTA (Scan My Feet vs Try-On vs AI Fit) drives the most engagement.

**Decision rule (tune to traffic budget):**
- ✅ **Build** if purchase-intent funnel clears targets AND ≥100 purchase_intent events.
- 🟡 **Iterate** copy/feature framing if browse is high but intent is low.
- ❌ **Stop/pivot** if browse → high-intent stays < 5% across multiple channels.

---

## 7. SEO + AEO + GEO Requirements (why Next.js)

This is a core requirement, not an afterthought — organic discovery + AI-engine
visibility is how we get cheap, genuine (non-paid) traffic.

### SEO (classic search)
- SSR/SSG via Next.js App Router; fast LCP, clean semantic HTML.
- Per-page `metadata` (title, description, canonical), Open Graph / Twitter cards.
- `sitemap.xml`, `robots.txt`, clean URL structure (`/men/sneakers/<product>`).
- Image optimization (`next/image`), responsive, Core Web Vitals green.
- Internal linking across categories/brands/products.

### AEO (Answer Engine Optimization — featured snippets, voice, "People also ask")
- **Structured data / JSON-LD**: `Product`, `Offer`, `AggregateRating`, `BreadcrumbList`,
  `FAQPage`, `Organization`, `WebSite` + `SearchAction`.
- FAQ blocks answering real buyer questions ("how to find perfect shoe size",
  "best shoes for standing all day", "true-to-size vs runs small").
- Concise, directly-answerable content blocks.

### GEO (Generative Engine Optimization — get cited by ChatGPT/Perplexity/Gemini/AI Overviews)
- Authoritative, citable long-form content: fit guides, brand size charts,
  "best shoes for <profession/occasion>" hubs.
- Clear entity definitions, consistent naming, factual statements LLMs can lift.
- Stats/comparisons in clean tables; clear headings; updated dates.
- `llms.txt` describing the site for AI crawlers; allow reputable AI bots in robots.txt.
- Strong, consistent brand entity (Organization schema, about page, consistent NAP).

---

## 8. Technical Approach

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Rendering:** SSG/ISR for catalog + content (SEO/speed); client components for
  interactive fake-door flows.
- **Data:** Static/seeded JSON for products, brands, reviews (no DB needed for catalog).
- **Capture backend:** lightweight API route → Supabase / Airtable / Sheet for
  `early_access` leads. Email validation, basic anti-spam.
- **Analytics:** PostHog (events + replay + funnels) or GA4 + custom events.
- **Media:** placeholder/licensed product imagery; CSS/Lottie for "scanning" + AR demo.
- **Hosting:** Vercel.
- **Design:** match the mockup — dark premium hero, red (#E11) accent, clean light body.

---

## 9. Ethics & Risk Guardrails

Fake-door testing is a standard, legitimate technique **as long as no one is harmed**:
- **Never charge money** or take payment details for a product that can't ship.
- The early-access interstitial is **truthful in spirit**: we *are* planning to launch;
  we *will* contact them. No false delivery promises, no fake order confirmations.
- Honor all captured emails: real follow-up at/after real launch, easy unsubscribe.
- No real brand impersonation claims beyond listing brand names as a marketplace would.
- Have a private "this is an early validation build" disclosure ready if asked directly,
  and a real privacy policy on data capture.

**Other risks:**
- *Low traffic = inconclusive* → pre-commit a channel/traffic plan.
- *Looks too good → users frustrated it's not live* → graceful early-access framing softens this.
- *Selection bias* → run ≥2 distinct channels, compare funnels.

---

## 10. Milestones

| # | Milestone | Output |
|---|---|---|
| 1 | Next.js scaffold + design system (Tailwind, tokens, fonts) | Repo + hero matches mockup |
| 2 | Storefront pages (home, category, PDP, cart, checkout) | Believable, populated site |
| 3 | Fake-door flows + early-access capture | Scan/Try-On/Checkout → capture working |
| 4 | Analytics + full funnel events | Verified tracking in PostHog/GA4 |
| 5 | SEO/AEO/GEO pass (metadata, JSON-LD, sitemap, content hubs, llms.txt) | Indexable, AI-citable |
| 6 | Launch + drive traffic; run 2–4 weeks | Collected behavioral data |
| 7 | Analyze vs success metrics | Go / iterate / no-go decision |

---

## 11. Open Questions

- Traffic plan: paid ads, social, SEO-only, communities — and budget/volume?
- Geographic focus for the "launching in your area" framing (single city vs national)?
- PostHog vs GA4 for analytics?
- How real should checkout look (full address/payment UI vs stop earlier)?
- Test window length and final success thresholds?

---

## 12. Appendix — Vision Features (surfaced as "live" in the storefront)

These appear as working/advertised features in the fake-door site; engagement with
each is a measured signal of demand:

Virtual try-on (AR) · Foot scanning & size recommendation · Walking analysis ·
Material exploration (360°/zoom) · AI salesperson/concierge · Real walking videos ·
Side-by-side compare · Comfort score · Wardrobe match · Video reviews ·
"Shopkeeper recommendation" · Occasion-based shopping · Home trial (order 3, keep 1) ·
Live expert video call · Store-like discovery · Wear-out prediction · Comfort
guarantee/returns · Digital shoe rack/collections · Gamified store sections.
