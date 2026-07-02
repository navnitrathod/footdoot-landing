// Lightweight analytics shim. In production this forwards to PostHog / GA4.
// For the validation build it logs to console + window.dataLayer so every
// revealed-intent event is observable. Swap `track` internals for your tool.

type Props = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    posthog?: { capture: (event: string, props?: Props) => void };
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...props, ts: Date.now() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.posthog?.capture(event, props);
  // Visible during validation; remove or gate behind a debug flag later.
  // eslint-disable-next-line no-console
  console.debug("[footdoot:track]", event, props);
}

// High-intent action -> opens the early-access fake-door flow.
export type EarlyAccessSource =
  | "hero_scan_my_feet"
  | "nav_try_and_fit"
  | "virtual_try_on"
  | "add_to_cart"
  | "checkout"
  | "ai_fit_learn_more"
  | "expert_call"
  | "app_download"
  | "newsletter";

export function openEarlyAccess(source: EarlyAccessSource, extra: Props = {}) {
  if (typeof window === "undefined") return;
  track(`intent_${source}`, extra);
  window.dispatchEvent(
    new CustomEvent("footdoot:earlyaccess", { detail: { source, extra } })
  );
}
