"use client";

import { useState } from "react";
import { openEarlyAccess, track } from "@/lib/analytics";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-5 border-t border-gray-100 pt-8 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">✉</span>
          <div>
            <h2 className="text-base font-bold text-ink">Stay in the loop</h2>
            <p className="text-sm text-gray-500">
              Subscribe to get updates on new arrivals, deals &amp; more.
            </p>
          </div>
        </div>
        <form
          className="flex w-full max-w-md gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            track("newsletter_submit");
            openEarlyAccess("newsletter", { email });
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm text-ink outline-none ring-1 ring-transparent placeholder:text-gray-400 focus:ring-brand/40"
          />
          <button className="shrink-0 rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
