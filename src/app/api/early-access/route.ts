import { NextResponse } from "next/server";

// Validation-build lead capture. For now it just logs the lead server-side.
// TODO before launch: forward to Supabase / Airtable / Sheet + send to PostHog.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lead = {
      name: String(body.name ?? "").slice(0, 120),
      email: String(body.email ?? "").slice(0, 200),
      phone: String(body.phone ?? "").slice(0, 40),
      city: String(body.city ?? "").slice(0, 80),
      source: String(body.source ?? "unknown").slice(0, 60),
      mode: String(body.mode ?? "").slice(0, 20),
      at: new Date().toISOString(),
    };

    const hasEmail = lead.email.includes("@");
    const hasPhone = lead.phone.replace(/\D/g, "").length >= 6;
    const isGoogle = lead.email === "(google)";
    if (!hasEmail && !hasPhone && !isGoogle) {
      return NextResponse.json({ ok: false, error: "email or phone required" }, { status: 400 });
    }

    // eslint-disable-next-line no-console
    console.log("[footdoot:lead]", JSON.stringify(lead));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
