import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();

const assets = [
  ["public/images/hero/hero-sneaker.svg", "sneaker", "#f8fafc", "#e5261f", "#111827"],
  ["public/images/hero/hero-runner.svg", "runner", "#fef3c7", "#f97316", "#0f172a"],
  ["public/images/hero/hero-formal.svg", "formal", "#f5f1eb", "#7c2d12", "#1f2937"],
  ["public/images/categories/sneakers.svg", "sneaker", "#f8fafc", "#e5261f", "#111827"],
  ["public/images/categories/sports-shoes.svg", "runner", "#eef6ff", "#2563eb", "#0f172a"],
  ["public/images/categories/formal-shoes.svg", "formal", "#f4eadf", "#7c2d12", "#111827"],
  ["public/images/categories/sandals-floaters.svg", "sandal", "#fff7ed", "#d97706", "#78350f"],
  ["public/images/categories/heels.svg", "heel", "#fff1f5", "#db2777", "#881337"],
  ["public/images/categories/flats.svg", "flat", "#fff7ed", "#ea580c", "#7c2d12"],
  ["public/images/categories/boots.svg", "boot", "#eef2f7", "#334155", "#111827"],
  ["public/images/categories/accessories.svg", "accessory", "#eef6ff", "#0ea5e9", "#0f172a"],
  ["public/images/deals/sparx-sports.svg", "runner", "#eef6ff", "#16a34a", "#0f172a"],
  ["public/images/deals/catwalk-heels.svg", "heel", "#fff1f5", "#be185d", "#831843"],
  ["public/images/deals/campus-sliders.svg", "slider", "#f0f9ff", "#0284c7", "#0f172a"],
  ["public/images/deals/asian-sneakers.svg", "sneaker", "#fff1f2", "#e5261f", "#111827"],
  ["public/images/deals/redtape-formal.svg", "formal", "#f5eee6", "#92400e", "#111827"],
  ["public/images/app/app-product-sneaker.svg", "sneaker", "#fff7ed", "#e5261f", "#111827"],
  ["public/images/app/app-product-heel.svg", "heel", "#fff1f5", "#db2777", "#831843"],
  ["public/images/app/app-product-sandal.svg", "sandal", "#fefce8", "#d97706", "#78350f"],
  ["public/images/app/app-product-bag.svg", "accessory", "#eff6ff", "#0ea5e9", "#0f172a"],
];

function shoePath(kind, accent, ink) {
  const common = `
    <ellipse cx="128" cy="190" rx="86" ry="10" fill="rgba(15,23,42,.16)"/>
  `;

  switch (kind) {
    case "runner":
      return `${common}
        <path d="M42 151c10-9 27-12 52-10 9-18 20-31 34-39 10 19 29 34 58 45 19 7 31 16 36 28 2 6-2 12-10 13H57c-16 0-24-13-15-37z" fill="#fff" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M94 141c25 5 50 9 74 6 17 6 30 14 42 25" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
        <path d="M48 171h166" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
        <path d="M65 181h56l-11 13H60c-8 0-14-4-17-11z" fill="${accent}"/>
        <path d="M145 181h73c-4 9-11 13-21 13h-65z" fill="${accent}" opacity=".78"/>
        <path d="M113 130l16 17M133 125l15 17M154 128l14 15" stroke="${ink}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      `;
    case "formal":
      return `${common}
        <path d="M35 158c14-11 35-14 64-9 9-24 25-38 48-42 10 26 31 44 63 54 9 3 14 8 15 15 1 8-5 13-17 13H53c-17 0-25-15-18-31z" fill="#552c18" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M94 149c28 5 61 4 97 12" fill="none" stroke="#b97949" stroke-width="8" stroke-linecap="round" opacity=".75"/>
        <path d="M40 176h184" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
        <path d="M110 142c15 6 35 7 59 3" stroke="#f8d9b0" stroke-width="3" stroke-linecap="round" opacity=".75"/>
        <path d="M121 129l19 14M143 125l18 16" stroke="#f8d9b0" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      `;
    case "sandal":
      return `${common}
        <path d="M39 163c33 6 80 7 139 1 22-2 37 4 45 18 4 7-1 13-12 14H57c-18 0-27-12-18-33z" fill="#fef3c7" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M68 160c14-25 35-39 62-40 31-2 54 12 68 39" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>
        <path d="M85 161c10-15 24-23 42-24 20-1 36 7 47 23" fill="none" stroke="#fff7ed" stroke-width="7" stroke-linecap="round"/>
        <path d="M44 183h174" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
      `;
    case "slider":
      return `${common}
        <path d="M35 166c37 8 91 8 161 0 16-2 26 4 31 17 2 7-3 13-14 13H54c-17 0-25-11-19-30z" fill="#e0f2fe" stroke="${ink}" stroke-width="4"/>
        <path d="M62 158c21-30 62-43 120-37 16 2 27 13 32 34" fill="${accent}" stroke="${ink}" stroke-width="4"/>
        <path d="M79 150c28-9 63-12 105-8" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".75"/>
        <path d="M42 183h178" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
      `;
    case "heel":
      return `${common}
        <path d="M53 153c33 6 65 3 96-11 22-10 40-9 55 3 13 10 18 21 15 33-2 8-9 11-20 9-44-8-89-6-135 4-19 4-30-7-27-23 1-8 7-13 16-15z" fill="#fce7f3" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M139 143c14 16 25 31 34 46" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
        <path d="M185 184l19 2-30 50h-18z" fill="${ink}"/>
        <path d="M57 190h150" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
        <path d="M72 153c18-19 38-31 61-35" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
      `;
    case "flat":
      return `${common}
        <path d="M37 158c19-11 45-14 78-8 18 3 39 6 62 8 27 2 43 11 49 25 3 8-2 14-14 14H54c-17 0-26-14-17-39z" fill="#ffedd5" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M67 153c23 21 64 27 124 17" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
        <path d="M45 185h177" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
        <circle cx="92" cy="153" r="8" fill="${accent}"/>
        <circle cx="113" cy="156" r="6" fill="${accent}" opacity=".65"/>
      `;
    case "boot":
      return `${common}
        <path d="M74 57h62c4 42 13 72 27 91 25 1 45 9 60 24 7 8 3 18-9 18H65c-18 0-26-16-15-32 18-26 25-60 24-101z" fill="#334155" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M85 67h40c2 27 7 53 16 78" stroke="#94a3b8" stroke-width="7" stroke-linecap="round" opacity=".55"/>
        <path d="M54 177h166" stroke="${ink}" stroke-width="9" stroke-linecap="round"/>
        <path d="M82 91h56M85 116h60" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round" opacity=".8"/>
        <path d="M116 147c21 10 47 15 78 15" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
      `;
    case "accessory":
      return `${common}
        <path d="M65 106h82c11 0 20 9 20 20v56H45v-56c0-11 9-20 20-20z" fill="#dbeafe" stroke="${ink}" stroke-width="4"/>
        <path d="M77 105c2-22 14-34 35-34 20 0 32 12 35 34" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
        <path d="M171 132h31c12 0 22 10 22 22v30h-53z" fill="#e0f2fe" stroke="${ink}" stroke-width="4"/>
        <path d="M62 138h88M62 159h88" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>
        <path d="M182 143h29M182 160h29" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
      `;
    default:
      return `${common}
        <path d="M34 155c11-13 31-17 59-12 9-23 23-39 44-48 8 25 30 43 66 56 15 5 24 14 26 25 1 8-5 13-17 13H52c-16 0-25-15-18-34z" fill="#fff" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M89 144c26 8 58 9 96 3" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
        <path d="M43 176h181" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
        <path d="M113 132l15 15M134 126l15 17M155 128l14 15" stroke="${ink}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
        <path d="M64 181h68l-14 14H60c-8 0-14-4-17-12z" fill="${accent}"/>
      `;
  }
}

function svg(kind, bg, accent, ink) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 256 256" role="img">
  <defs>
    <radialGradient id="glow" cx="50%" cy="48%" r="55%">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="transparent"/>
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#0f172a" flood-opacity=".18"/>
    </filter>
  </defs>
  <rect width="256" height="256" fill="none"/>
  <circle cx="128" cy="128" r="112" fill="url(#glow)"/>
  <g filter="url(#softShadow)">
    ${shoePath(kind, accent, ink)}
  </g>
</svg>
`;
}

for (const [file, kind, bg, accent, ink] of assets) {
  const fullPath = join(root, file);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, svg(kind, bg, accent, ink));
}

console.log(`Generated ${assets.length} footwear assets.`);
