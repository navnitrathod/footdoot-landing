// Validate every JSON-LD block in the built site.
//
// Run after `next build`:  node scripts/validate-jsonld.mjs
// Walks .next/server/app for pre-rendered *.html, extracts each
// <script type="application/ld+json"> block, JSON-parses it, and checks that
// every node carries @context and a @type (directly or inside @graph).
// Exits non-zero on any malformed or incomplete block so it can gate CI.
//
// Note: this checks structural validity locally. Confirming rich-result
// eligibility still needs Google's Rich Results Test on the live URLs.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), ".next", "server", "app");

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

const LD_RE =
  /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

function nodesOf(parsed) {
  if (Array.isArray(parsed)) return parsed;
  if (parsed && Array.isArray(parsed["@graph"])) return parsed["@graph"];
  return [parsed];
}

let blocks = 0;
let pages = 0;
const errors = [];

for (const file of htmlFiles(ROOT)) {
  const html = readFileSync(file, "utf8");
  const rel = file.slice(ROOT.length) || "/index.html";
  let m;
  let pageHadLd = false;
  while ((m = LD_RE.exec(html))) {
    blocks++;
    pageHadLd = true;
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch (e) {
      errors.push(`${rel}: invalid JSON — ${e.message}`);
      continue;
    }
    if (parsed["@context"] == null) {
      errors.push(`${rel}: JSON-LD block missing @context`);
    }
    for (const node of nodesOf(parsed)) {
      if (node == null || typeof node !== "object") {
        errors.push(`${rel}: non-object node in JSON-LD`);
      } else if (node["@type"] == null) {
        errors.push(`${rel}: node missing @type`);
      }
    }
  }
  if (pageHadLd) pages++;
}

if (errors.length) {
  console.error(`✗ JSON-LD validation failed (${errors.length} problem(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `✓ JSON-LD valid: ${blocks} block(s) across ${pages} page(s), all with @context and @type.`,
);
