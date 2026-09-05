import { NextResponse } from "next/server";
import { getSchedulingProvider } from "@/lib/scheduling/provider";
import { getConsultationType } from "@/lib/scheduling/consultations";
import type { BookingRequest } from "@/lib/scheduling/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = 4000;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, MAX) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ status: "error", message: "invalid_body" }, { status: 400 });
  }

  // Automated submission.
  if (clean(body.company_website)) {
    return NextResponse.json({ status: "error", message: "rejected" }, { status: 202 });
  }

  const payload: BookingRequest = {
    typeId: clean(body.typeId),
    start: clean(body.start),
    timeZone: clean(body.timeZone) || "Europe/Berlin",
    name: clean(body.name),
    email: clean(body.email),
    notes: clean(body.notes) || undefined,
    company: clean(body.company) || undefined,
    phone: clean(body.phone) || undefined,
  };

  const type = getConsultationType(payload.typeId);
  if (!type) {
    return NextResponse.json({ status: "error", message: "unknown_type" }, { status: 400 });
  }
  if (!payload.name || !payload.email || !payload.start) {
    return NextResponse.json({ status: "error", message: "missing_fields" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) {
    return NextResponse.json({ status: "error", message: "invalid_email" }, { status: 422 });
  }
  if (Number.isNaN(Date.parse(payload.start))) {
    return NextResponse.json({ status: "error", message: "invalid_start" }, { status: 422 });
  }

  const provider = getSchedulingProvider();
  if (!provider) {
    // Never report a booking that did not happen.
    return NextResponse.json({ status: "not_configured" }, { status: 503 });
  }

  const result = await provider.createBooking({ type, request: payload });
  const status =
    result.status === "booked"
      ? 201
      : result.status === "not_configured"
        ? 503
        : result.status === "unavailable"
          ? 409
          : 502;

  return NextResponse.json(result, { status, headers: { "cache-control": "no-store" } });
}
