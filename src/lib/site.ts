// Single source of truth for the site's public origin.
//
// Set NEXT_PUBLIC_SITE_URL per deployment (production / preview) so metadata,
// canonicals, the sitemap, robots and JSON-LD all resolve to the real domain
// instead of the fallback below. Trailing slashes are stripped so callers can
// safely do `${SITE_URL}/path`.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://footdoot.com"
).replace(/\/+$/, "");

// Google Search Console verification token (Settings → Ownership → HTML tag).
// Optional: when set, Next injects the <meta name="google-site-verification">.
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
