import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Enquiry intake.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TODO(client): set ENQUIRY_WEBHOOK_URL in the deployment environment.
 * Until it is set this route returns 503 and the form tells the visitor to
 * email instead — it never pretends an enquiry was delivered.
 *
 * The endpoint receives a JSON body; point it at a CRM intake, a transactional
 * mail provider, or an internal handler. Optionally set ENQUIRY_WEBHOOK_TOKEN
 * to have it sent as a bearer token.
 * ─────────────────────────────────────────────────────────────────────────
 */
const MAX_FIELD = 4000;

type Payload = Record<string, unknown>;

function sanitise(body: Payload) {
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed) clean[key] = trimmed.slice(0, MAX_FIELD);
  }
  return clean;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const data = sanitise(body);

  // Honeypot — a value here means an automated submission.
  if (data.company_website) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }

  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN
          ? { authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "upstream_unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
