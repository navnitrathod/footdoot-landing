"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Lock,
  ChevronRight,
  Footprints,
  Briefcase,
  Dumbbell,
  Shirt,
  Eye,
  Building2,
  GraduationCap,
  Clock,
  House,
  Coins,
  Wallet,
  Gem,
  Crown,
  Heart,
  Package,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/icons";
import ShoeImage from "@/components/ShoeImage";
import { track } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/* catalog used by the this-or-that, the tiles and the picks           */
/* ------------------------------------------------------------------ */
type StyleKey = "sneaker" | "formal" | "slipon" | "sport" | "sandal" | "heel";

const STYLES: Record<StyleKey, { name: string; label: string; img: string; tone: string }> = {
  sneaker: { name: "Everyday Knit Sneaker", label: "Sneakers", img: "/images/categories/sneakers.svg", tone: "#eef0f2" },
  formal: { name: "Office Derby", label: "Formals", img: "/images/categories/formal-shoes.svg", tone: "#e7d7c6" },
  slipon: { name: "Soft Slip-On", label: "Slip-ons", img: "/images/categories/flats.svg", tone: "#f7ecdf" },
  sport: { name: "Trail Runner Pro", label: "Sports", img: "/images/categories/sports-shoes.svg", tone: "#e9edf2" },
  sandal: { name: "Cushion Slide", label: "Sandals", img: "/images/categories/sandals-floaters.svg", tone: "#efe2d3" },
  heel: { name: "Block Heel", label: "Heels", img: "/images/categories/heels.svg", tone: "#f4dfe6" },
};

const BUDGET_PRICE: Record<string, string> = {
  under999: "₹899",
  "1k-2.5k": "₹1,699",
  "2.5k-5k": "₹3,499",
  "5kplus": "₹6,290",
};

type Option = { value: string; title: string; sub: string; icon: ElementType };

const INTENT: Option[] = [
  { value: "everyday", title: "An everyday pair", sub: "Comfortable, goes with everything", icon: Footprints },
  { value: "work", title: "Something for work", sub: "Office-ready, smart & polished", icon: Briefcase },
  { value: "sports", title: "Sports & gym", sub: "Running, training, walking", icon: Dumbbell },
  { value: "occasion", title: "A wedding or occasion", sub: "Dressed up, festive, standout looks", icon: Shirt },
  { value: "browsing", title: "Just looking", sub: "Show me what fits me", icon: Eye },
];
const CONTEXT: Option[] = [
  { value: "office", title: "At the office", sub: "Desk, meetings, smart-casual", icon: Building2 },
  { value: "college", title: "College / campus", sub: "On the move all day", icon: GraduationCap },
  { value: "onfeet", title: "On my feet all day", sub: "Field, shop floor, commuting", icon: Clock },
  { value: "casual", title: "Mostly casual & home", sub: "Relaxed and easy", icon: House },
];
const BUDGET: Option[] = [
  { value: "under999", title: "Under ₹999", sub: "Smart value", icon: Coins },
  { value: "1k-2.5k", title: "₹1,000 – ₹2,499", sub: "The sweet spot", icon: Wallet },
  { value: "2.5k-5k", title: "₹2,500 – ₹4,999", sub: "Premium everyday", icon: Gem },
  { value: "5kplus", title: "₹5,000 +", sub: "Treat myself", icon: Crown },
];

const STEP_CONFIG: Record<number, { key: keyof Answers; eyebrow: string; title: string; sub: string; opts: Option[] }> = {
  2: { key: "intent", eyebrow: "Why you're here", title: "What are you shopping for?", sub: "This helps us personalize your picks.", opts: INTENT },
  3: { key: "context", eyebrow: "Your day", title: "Where do your shoes work hardest?", sub: "Helps us match comfort to your routine.", opts: CONTEXT },
  5: { key: "budget", eyebrow: "Comfort zone", title: "What's comfortable to spend?", sub: "Per pair, roughly. We'll stay in your range.", opts: BUDGET },
};

const POOL_BY_STEP = [4812, 2640, 1410, 760, 410, 180, 60];
const TOTAL = 6;

type Answers = {
  vibe?: string;
  intent?: string;
  context?: string;
  like?: StyleKey[];
  budget?: string;
  city?: string;
  age?: string;
};

/* ================================================================== */
export default function MatchExperience() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [hasLead, setHasLead] = useState(false);

  useEffect(() => {
    try {
      setHasLead(window.localStorage.getItem("footdoot_lead") === "1");
    } catch {
      /* ignore */
    }
  }, []);

  const inQuiz = step >= 1 && step <= TOTAL;
  const setAns = (k: keyof Answers, v: Answers[keyof Answers]) => setAnswers((a) => ({ ...a, [k]: v }));
  function go(n: number) {
    setStep(n);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }

  return (
    <div className="min-h-dvh bg-[#f4ece1] lg:grid lg:grid-cols-[minmax(360px,40%)_1fr]">
      {/* ---------------- desktop brand / stats panel ---------------- */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-b from-[#f7efe4] to-[#ecdfce] p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute right-[-140px] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full border-[44px] border-white/40" />
        <Link href="/" className="relative z-10 flex items-center gap-2 text-ink">
          <Logo className="h-9 w-9" />
          <span className="text-xl font-extrabold tracking-tight">footdoot</span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold leading-[1.02] tracking-tight text-ink">
            A few taps.
            <br />
            Five <span className="text-brand">perfect</span> pairs.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] text-gray-600">
            We read your style, routine and budget — then hand-pick footwear
            matched to how you actually live.
          </p>

          {inQuiz && (
            <>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-3 rounded-2xl bg-white/70 p-5 ring-1 ring-white/60 backdrop-blur">
                <Stat icon={Footprints}><PoolCounter target={POOL_BY_STEP[step]} />+</Stat>
                <Stat icon={Heart} label="better fit confidence">98%</Stat>
                <Stat icon={Package} label="easy returns on all orders">7 Days</Stat>
              </div>
              <div className="mt-6 max-w-md">
                <p className="mb-2 text-xs font-semibold text-gray-500">Step {step} of {TOTAL}</p>
                <Progress step={step} />
              </div>
            </>
          )}
          {!inQuiz && (
            <div className="mt-8 flex gap-3">
              <ShoeImage tone="#eef0f2" src="/images/categories/sneakers.svg" alt="" className="h-28 w-40" rounded="rounded-2xl" />
            </div>
          )}
        </div>

        <div className="relative z-10 flex justify-end">
          <ShoeImage tone="#efe2d3" src="/images/categories/sandals-floaters.svg" alt="" className="h-24 w-36 opacity-90" rounded="rounded-2xl" />
        </div>
      </aside>

      {/* ---------------- quiz card ---------------- */}
      <div className="flex min-h-dvh w-full flex-col p-3 sm:p-5 lg:p-8">
        <div className="flex flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
          <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
            {/* mobile logo */}
            <Link href="/" className="mb-5 flex items-center gap-2 text-ink lg:hidden">
              <Logo className="h-8 w-8" />
              <span className="text-lg font-extrabold tracking-tight">footdoot</span>
            </Link>

            {inQuiz && <HeaderRow step={step} onBack={() => go(step - 1)} />}

            <div key={step} className="flex flex-1 flex-col pt-6 [animation:rise_.4s_cubic-bezier(.2,.8,.2,1)]">
              {step === 0 && (
                <Welcome
                  onStart={() => { track("match_start"); go(1); }}
                  onBrowse={() => { track("match_browse_instead"); router.push("/"); }}
                />
              )}

              {step === 1 && (
                <Screen eyebrow="First, the vibe" title="Which feels more you?" sub="No wrong answer — just tap the one you'd reach for.">
                  <div className="grid grid-cols-2 gap-4">
                    <VibeCard styleKey="formal" label="Clean & classic" selected={answers.vibe === "clean-minimal"} onClick={() => setAns("vibe", "clean-minimal")} />
                    <VibeCard styleKey="sport" label="Sporty & bold" selected={answers.vibe === "sporty-bold"} onClick={() => setAns("vibe", "sporty-bold")} />
                  </div>
                  <Continue
                    disabled={!answers.vibe}
                    onClick={() => { track("match_answer", { step, q: "vibe", v: answers.vibe }); go(2); }}
                  />
                </Screen>
              )}

              {(step === 2 || step === 3 || step === 5) && (
                <OptionStep
                  cfg={STEP_CONFIG[step]}
                  value={answers[STEP_CONFIG[step].key] as string | undefined}
                  onSelect={(v) => setAns(STEP_CONFIG[step].key, v)}
                  onContinue={() => {
                    const cfg = STEP_CONFIG[step];
                    track("match_answer", { step, q: cfg.key, v: answers[cfg.key] });
                    go(step + 1);
                  }}
                />
              )}

              {step === 4 && (
                <Screen eyebrow="Tap all that catch your eye" title="Which would you actually wear?" sub="Pick as many as you like.">
                  <LikeGrid selected={answers.like ?? []} onChange={(like) => setAns("like", like)} />
                  <Continue
                    disabled={(answers.like ?? []).length === 0}
                    onClick={() => { track("match_answer", { step: 4, q: "like", v: answers.like }); go(5); }}
                  />
                </Screen>
              )}

              {step === 6 && (
                <Screen eyebrow="Almost there" title="Last bit about you" sub="Sizing and styles vary by place — this sharpens the picks.">
                  <Demographics
                    city={answers.city ?? ""}
                    age={answers.age ?? ""}
                    onCity={(v) => setAns("city", v)}
                    onAge={(v) => setAns("age", v)}
                  />
                  <Continue
                    label="See my 5 pairs"
                    icon={Sparkles}
                    disabled={!(answers.city?.trim() && answers.age)}
                    onClick={() => { track("match_complete", { answers }); go(7); }}
                  />
                </Screen>
              )}

              {step === 7 && <Results answers={answers} hasLead={hasLead} />}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@keyframes slideup{from{transform:translateY(100%)}to{transform:none}}`}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function HeaderRow({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex gap-1.5 sm:gap-2">
          {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => (
            <span
              key={n}
              className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition ${
                n === step ? "bg-brand text-white" : n < step ? "bg-rose-100 text-brand" : "bg-gray-100 text-gray-400"
              }`}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 lg:hidden">
        <Progress step={step} />
        <p className="mt-2 text-xs font-semibold text-gray-500">Step {step} of {TOTAL}</p>
      </div>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-gray-200/80">
      <div className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out" style={{ width: `${(step / TOTAL) * 100}%` }} />
    </div>
  );
}

function Stat({ icon: Icon, label, children }: { icon: ElementType; label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-100 text-ink">
        <Icon className="h-4 w-4" />
      </span>
      <span className="mt-2 text-lg font-extrabold leading-none text-brand">{children}</span>
      <span className="mt-1 text-[11px] leading-tight text-gray-500">{label ?? "pairs still match your top 5"}</span>
    </div>
  );
}

function Screen({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-[28px]">{title}</h1>
      <p className="mt-1.5 text-[15px] text-gray-500">{sub}</p>
      <div className="mt-6 flex flex-1 flex-col">{children}</div>
    </div>
  );
}

function OptionStep({
  cfg,
  value,
  onSelect,
  onContinue,
}: {
  cfg: { key: keyof Answers; eyebrow: string; title: string; sub: string; opts: Option[] };
  value?: string;
  onSelect: (v: string) => void;
  onContinue: () => void;
}) {
  return (
    <Screen eyebrow={cfg.eyebrow} title={cfg.title} sub={cfg.sub}>
      <div className="flex flex-col gap-3">
        {cfg.opts.map((o) => (
          <OptionRow key={o.value} option={o} selected={value === o.value} onClick={() => onSelect(o.value)} />
        ))}
      </div>
      <Continue disabled={!value} onClick={onContinue} />
    </Screen>
  );
}

function OptionRow({ option, selected, onClick }: { option: Option; selected: boolean; onClick: () => void }) {
  const Icon = option.icon;
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition active:scale-[0.995] ${
        selected ? "border-brand bg-rose-50/50" : "border-transparent bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose-100 text-ink">
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-base font-bold text-ink">{option.title}</span>
        <span className="text-[13px] text-gray-500">{option.sub}</span>
      </span>
      {selected ? (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
          <Check className="h-4 w-4" />
        </span>
      ) : (
        <ChevronRight className="h-5 w-5 shrink-0 text-gray-300" />
      )}
    </button>
  );
}

function VibeCard({ styleKey, label, selected, onClick }: { styleKey: StyleKey; label: string; selected: boolean; onClick: () => void }) {
  const s = STYLES[styleKey];
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-3 rounded-2xl border-2 p-4 transition active:scale-[0.98] ${
        selected ? "border-brand bg-rose-50/50" : "border-transparent bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
          <Check className="h-4 w-4" />
        </span>
      )}
      <ShoeImage tone={s.tone} src={s.img} alt={label} className="h-28 w-full" rounded="rounded-xl" />
      <span className="text-[15px] font-bold text-ink">{label}</span>
    </button>
  );
}

function LikeGrid({ selected, onChange }: { selected: StyleKey[]; onChange: (v: StyleKey[]) => void }) {
  const keys = Object.keys(STYLES) as StyleKey[];
  const toggle = (k: StyleKey) => onChange(selected.includes(k) ? selected.filter((x) => x !== k) : [...selected, k]);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {keys.map((k) => {
        const s = STYLES[k];
        const sel = selected.includes(k);
        return (
          <button
            key={k}
            onClick={() => toggle(k)}
            className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition active:scale-[0.97] ${
              sel ? "border-brand bg-rose-50/50" : "border-transparent bg-gray-50 hover:bg-gray-100"
            }`}
          >
            {sel && (
              <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-brand text-white">
                <Check className="h-3 w-3" />
              </span>
            )}
            <ShoeImage tone={s.tone} src={s.img} alt={s.label} className="h-16 w-20" rounded="rounded-lg" />
            <span className="text-[13px] font-semibold text-gray-600">{s.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Demographics({
  city,
  age,
  onCity,
  onAge,
}: {
  city: string;
  age: string;
  onCity: (v: string) => void;
  onAge: (v: string) => void;
}) {
  const ages = [["under18", "Under 18"], ["18-24", "18–24"], ["25-34", "25–34"], ["35-44", "35–44"], ["45plus", "45+"]];
  return (
    <div>
      <label htmlFor="city" className="mb-2 block text-sm font-semibold text-ink">Which city are you in?</label>
      <input
        id="city"
        value={city}
        onChange={(e) => onCity(e.target.value)}
        placeholder="e.g. Rajkot"
        autoComplete="off"
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-base outline-none focus:border-brand focus:bg-white"
      />
      <span className="mb-2 mt-5 block text-sm font-semibold text-ink">Your age</span>
      <div className="flex flex-wrap gap-2">
        {ages.map(([v, label]) => (
          <button
            key={v}
            onClick={() => onAge(v)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
              age === v ? "border-brand bg-brand text-white" : "border-transparent bg-gray-50 text-ink hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Continue({
  onClick,
  disabled,
  label = "Continue",
  icon: Icon = ArrowRight,
}: {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  icon?: ElementType;
}) {
  return (
    <div className="mt-auto pt-6">
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-4 text-base font-bold text-white transition hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-30"
      >
        {label} <Icon className="h-5 w-5" />
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <Lock className="h-3.5 w-3.5" /> Takes less than 30 seconds
      </p>
    </div>
  );
}

function Welcome({ onStart, onBrowse }: { onStart: () => void; onBrowse: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Your footwear match</p>
      <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
        Let&apos;s find your <span className="text-brand">perfect pairs.</span>
      </h1>
      <p className="mt-3 max-w-md text-[15px] text-gray-600">
        Answer 6 quick taps. We read your style, where you wear them and your
        budget — then hand-pick 5 pairs. No endless grid.
      </p>
      <div className="my-8 flex justify-center">
        <ShoeImage tone="#eef0f2" src="/images/categories/sneakers.svg" alt="Sneaker" className="h-40 w-56" rounded="rounded-3xl" />
      </div>
      <div className="mt-auto">
        <button
          onClick={onStart}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-4 text-base font-bold text-white transition hover:bg-black active:scale-[0.99]"
        >
          Find my pairs <ArrowRight className="h-5 w-5" />
        </button>
        <button onClick={onBrowse} className="mt-2 w-full py-2 text-sm font-semibold text-gray-500 hover:text-ink">
          I just want to browse
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function PoolCounter({ target }: { target: number }) {
  const [val, setVal] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 450, 1);
      setVal(Math.round(start + diff * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{val.toLocaleString("en-IN")}</>;
}

/* ------------------------------------------------------------------ */
/* results — only reachable after every detail is given               */
/* ------------------------------------------------------------------ */
function Results({ answers, hasLead }: { answers: Answers; hasLead: boolean }) {
  const [capture, setCapture] = useState<{ open: boolean; label: string; shoe?: string; price?: string }>({ open: false, label: "" });

  const likes = answers.like && answers.like.length ? answers.like : (["sneaker", "slipon"] as StyleKey[]);
  const price = BUDGET_PRICE[answers.budget ?? ""] ?? "₹1,699";

  const whyBits: string[] = [];
  if (answers.context === "onfeet") whyBits.push("all-day cushioning");
  if (answers.context === "office" || answers.intent === "work") whyBits.push("office-ready");
  if (answers.intent === "sports") whyBits.push("built for movement");
  if (answers.intent === "occasion") whyBits.push("dress-up ready");
  if (answers.vibe === "clean-minimal") whyBits.push("clean look");
  if (answers.vibe === "sporty-bold") whyBits.push("bold style");
  if (answers.city) whyBits.push("popular in " + answers.city);
  const why = whyBits.length ? whyBits.slice(0, 2).join(" · ") : "matches your taste";

  const order = [...new Set<StyleKey>([...likes, "sneaker", "slipon", "sport", "formal", "sandal"])].slice(0, 5);

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Matched for you</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">5 pairs, picked for you</h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Filtered from 4,812 down to the 5 that fit how you live{answers.city ? " in " + answers.city : ""}.
        </p>
      </div>

      <div className="my-5 flex flex-col gap-3">
        {order.map((k, i) => {
          const s = STYLES[k];
          return (
            <button
              key={k}
              onClick={() => { track("match_pick_click", { shoe: k }); setCapture({ open: true, label: s.name, shoe: k, price }); }}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-3 text-left shadow-sm transition hover:border-brand active:scale-[0.99]"
            >
              <ShoeImage tone={s.tone} src={s.img} alt={s.name} className="h-16 w-20 shrink-0" rounded="rounded-xl" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-ink">{s.name}</p>
                <p className="truncate text-[12.5px] font-semibold text-brand">{i === 0 ? "Top match — " : ""}{why}</p>
                <span className="mt-1 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-bold text-amber-700">{94 - i * 3}% fit</span>
                <p className="mt-1 text-[11px] font-bold text-brand">Tap to reserve →</p>
              </div>
              <span className="whitespace-nowrap text-[15px] font-extrabold text-ink">{price}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto rounded-2xl bg-brand p-5 text-white">
        <h3 className="text-lg font-extrabold">Like your matches?</h3>
        <p className="mt-1 text-sm opacity-90">Tap any pair to reserve it — or hold all five and get first dibs at launch.</p>
        <button
          onClick={() => { track("match_buy_intent_open", { shoe: "(all)" }); setCapture({ open: true, label: "all 5 of your matches" }); }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold text-brand transition hover:bg-rose-50"
        >
          Notify me at launch <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {capture.open && (
        <CaptureSheet
          label={capture.label}
          shoe={capture.shoe}
          price={capture.price}
          answers={answers}
          needLead={!hasLead}
          onClose={() => setCapture({ open: false, label: "" })}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
function CaptureSheet({
  label,
  shoe,
  price,
  answers,
  needLead,
  onClose,
}: {
  label: string;
  shoe?: string;
  price?: string;
  answers: Answers;
  needLead: boolean;
  onClose: () => void;
}) {
  const [lead, setLead] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    const isEmail = lead.includes("@");
    track("match_buy_intent_click", { shoe: shoe ?? "(all)", answers, needLead });
    if (needLead) {
      track("early_access_captured", { source: "match_quiz" });
      try {
        await fetch("/api/early-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: isEmail ? lead : "", phone: isEmail ? "" : lead, city: answers.city ?? "", source: "match_quiz" }),
        });
      } catch {
        /* non-blocking */
      }
    }
    setSubmitting(false);
    setDone(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div
        className="relative w-full max-w-md rounded-t-3xl bg-white p-6 pb-8 shadow-2xl [animation:slideup_.28s_cubic-bezier(.2,.8,.2,1)] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200 sm:hidden" />
        {done ? (
          <div className="py-4 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-100 text-2xl">✓</div>
            <h3 className="mt-3 text-xl font-extrabold text-ink">You&apos;re on the list.</h3>
            <p className="mt-1.5 text-sm text-gray-500">We&apos;ll hold {shoe ? "this pair" : "your matches"} and ping you the moment we launch.</p>
            <button onClick={onClose} className="mt-5 w-full rounded-xl bg-ink py-3.5 text-sm font-bold text-white">Done</button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-extrabold leading-tight text-ink">{shoe ? "Reserve this pair" : "Hold my matches"}</h3>
            <p className="mt-0.5 text-sm font-bold text-brand">{label}{price ? ` · ${price}` : ""}</p>
            {needLead ? (
              <>
                <p className="mt-3 text-sm text-gray-500">These launch soon. Leave your number or email and we&apos;ll hold {shoe ? "it" : "them"} for you — first dibs at launch.</p>
                <input value={lead} onChange={(e) => setLead(e.target.value)} placeholder="Phone or email" inputMode="email" autoComplete="off" className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-base outline-none focus:border-brand" />
                <button onClick={submit} disabled={submitting || lead.trim().length < 4} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white disabled:opacity-40">
                  {submitting ? "Submitting…" : <>Notify me at launch <ArrowRight className="h-4 w-4" /></>}
                </button>
              </>
            ) : (
              <>
                <p className="mt-3 text-sm text-gray-500">You&apos;re already on our early-access list — we&apos;ll hold {shoe ? "this pair" : "your matches"} and notify you at launch.</p>
                <button onClick={submit} disabled={submitting} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white disabled:opacity-40">
                  {submitting ? "Reserving…" : <>Reserve {shoe ? "this pair" : "my matches"} <ArrowRight className="h-4 w-4" /></>}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
