"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, User } from "lucide-react";
import { Logo } from "@/components/icons";
import { track, type EarlyAccessSource } from "@/lib/analytics";

// Contextual sub-line shown under the login header, per entry point.
const CONTEXT: Record<EarlyAccessSource, string> = {
  hero_scan_my_feet: "Log in to scan your feet and unlock perfect-fit sizing.",
  nav_try_and_fit: "Log in to try shoes on and find your size across brands.",
  virtual_try_on: "Log in to see shoes on your own feet in AR.",
  add_to_cart: "Log in to add this pair and reserve it at launch price.",
  checkout: "Log in to reserve your order — no payment needed now.",
  ai_fit_learn_more: "Log in to be first to try AI Fit Technology.",
  expert_call: "Log in to book a session with a footwear expert.",
  app_download: "Log in to get the app and 10% off your first order.",
  newsletter: "Log in for new arrivals, deals and style tips.",
};

export default function EarlyAccessModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<EarlyAccessSource>("hero_scan_my_feet");
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [lead, setLead] = useState("");
  const [redirect, setRedirect] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent).detail as {
        source: EarlyAccessSource;
        extra?: { redirect?: string };
      };
      setSource(detail.source);
      setRedirect(detail.extra?.redirect ?? null);
      setDone(false);
      setLead("");
      setName("");
      setMode("signup");
      setOpen(true);
      // The "Scan My Feet" CTA gets a believable scanning animation first.
      if (detail.source === "hero_scan_my_feet") {
        setScanning(true);
        window.setTimeout(() => setScanning(false), 2600);
      } else {
        setScanning(false);
      }
    }
    window.addEventListener("footdoot:earlyaccess", onOpen);
    return () => window.removeEventListener("footdoot:earlyaccess", onOpen);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  async function submit(method: "email" | "google") {
    if (method === "email" && lead.trim().length < 4) return;
    setSubmitting(true);
    const value = method === "google" ? "(google)" : lead.trim();
    const isEmail = value.includes("@");
    track("early_access_captured", { source, method, mode });
    try {
      await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: isEmail ? value : "",
          phone: !isEmail && method === "email" ? value : "",
          city: "",
          source,
          mode,
        }),
      });
    } catch {
      /* non-blocking for the validation build */
    }
    setSubmitting(false);
    setDone(true);
    try {
      window.localStorage.setItem("footdoot_lead", "1");
    } catch {
      /* ignore */
    }
    // Capture-first flow: after details, send them into the options quiz.
    if (redirect) {
      window.setTimeout(() => {
        setOpen(false);
        router.push(redirect);
      }, 1100);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/5 text-gray-500 hover:bg-black/10"
        >
          ✕
        </button>

        {scanning ? (
          <div className="flex flex-col items-center px-8 py-14">
            <div className="relative h-44 w-44 overflow-hidden rounded-2xl bg-ink">
              <FootMesh />
              <div className="animate-scan absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-brand/0 via-brand/60 to-brand/0" />
            </div>
            <p className="mt-6 text-sm font-medium text-gray-800">Scanning your foot profile…</p>
            <p className="mt-1 text-xs text-muted">Measuring length, width &amp; arch</p>
          </div>
        ) : done ? (
          <div className="flex flex-col items-center px-8 py-12 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-green-100 text-2xl">✓</div>
            <h3 className="mt-4 text-xl font-bold text-ink">
              {redirect ? "You're in! ✨" : "You're on the list!"}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {redirect
                ? "Taking you to find your perfect pairs…"
                : "We'll reach out the moment Footdoot goes live in your area. Thanks for being an early believer."}
            </p>
            <button
              onClick={() => {
                setOpen(false);
                if (redirect) router.push(redirect);
              }}
              className="mt-6 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white"
            >
              {redirect ? "Find my pairs →" : "Done"}
            </button>
          </div>
        ) : (
          <div className="px-7 pb-8 pt-10">
            <div className="flex flex-col items-center text-center">
              <Logo className="h-11 w-11" />
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink">
                {mode === "signup" ? "Create your account" : "Welcome back"}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{CONTEXT[source]}</p>
            </div>

            {/* log in / sign up toggle */}
            <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-lg py-2 text-sm font-semibold transition ${
                    mode === m ? "bg-white text-ink shadow-sm" : "text-gray-500 hover:text-ink"
                  }`}
                >
                  {m === "login" ? "Log in" : "Sign up"}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit("email");
              }}
              className="mt-5 space-y-3"
            >
              {mode === "signup" && (
                <div>
                  <label htmlFor="eaName" className="mb-1.5 block text-sm font-semibold text-ink">Full name</label>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 focus-within:border-brand">
                    <User className="h-4 w-4 shrink-0 text-gray-400" />
                    <input
                      id="eaName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="off"
                      className="w-full bg-transparent py-3.5 text-base outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="eaField" className="mb-1.5 block text-sm font-semibold text-ink">Email or phone</label>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 focus-within:border-brand">
                  <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                  <input
                    id="eaField"
                    value={lead}
                    onChange={(e) => setLead(e.target.value)}
                    placeholder="you@example.com"
                    inputMode="email"
                    autoComplete="off"
                    className="w-full bg-transparent py-3.5 text-base outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting || lead.trim().length < 4 || (mode === "signup" && name.trim().length < 2)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark disabled:opacity-40"
              >
                {submitting ? "Please wait…" : <>{mode === "signup" ? "Create account" : "Log in"} <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
              <span className="h-px flex-1 bg-gray-200" /> or <span className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              onClick={() => submit("google")}
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-ink transition hover:bg-gray-50 disabled:opacity-50"
            >
              <GoogleG /> {mode === "signup" ? "Sign up with Google" : "Continue with Google"}
            </button>

            <p className="mt-4 text-center text-[12px] text-muted">
              {mode === "signup" ? (
                <>Already have an account?{" "}
                  <button onClick={() => setMode("login")} className="font-semibold text-brand">Log in</button>
                </>
              ) : (
                <>New to Footdoot?{" "}
                  <button onClick={() => setMode("signup")} className="font-semibold text-brand">Sign up</button>
                </>
              )}
            </p>

            <p className="mt-3 text-center text-[11px] leading-snug text-muted">
              By continuing you agree to Footdoot&apos;s Terms &amp; Privacy Policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1 .7-2.4 1.1-4 1.1-3 0-5.6-2-6.5-4.8H1.5v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.5 14.4a7.2 7.2 0 0 1 0-4.8V6.5H1.5a12 12 0 0 0 0 11z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.5 6.5l4 3.1C6.4 6.8 9 4.8 12 4.8z" />
    </svg>
  );
}

function FootMesh() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full opacity-80">
      <defs>
        <radialGradient id="fm" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#e5261f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e5261f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="#0b0b0d" />
      <circle cx="100" cy="100" r="80" fill="url(#fm)" />
      <path
        d="M70 40c-8 18-10 46-6 78 3 24 16 40 36 40 16 0 26-12 28-30 2-16-2-30-2-46 0-18-4-36-14-44-14-10-34-10-42 2z"
        fill="none"
        stroke="#e5261f"
        strokeWidth="1.2"
        opacity="0.9"
      />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1="55" x2="135" y1={50 + i * 14} y2={50 + i * 14} stroke="#e5261f" strokeWidth="0.5" opacity="0.4" />
      ))}
    </svg>
  );
}
