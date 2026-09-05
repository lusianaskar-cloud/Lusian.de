import { NextResponse } from "next/server";
import { getSchedulingProvider } from "@/lib/scheduling/provider";
import { getConsultationType } from "@/lib/scheduling/consultations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Availability is live truth about time. It is never cached and never invented. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const typeId = url.searchParams.get("type") ?? "";
  const from = url.searchParams.get("from") ?? "";
  const to = url.searchParams.get("to") ?? "";
  const timeZone = url.searchParams.get("timeZone") ?? "Europe/Berlin";

  const type = getConsultationType(typeId);
  if (!type) {
    return NextResponse.json({ status: "error", message: "unknown_type" }, { status: 400 });
  }
  if (!from || !to || Number.isNaN(Date.parse(from)) || Number.isNaN(Date.parse(to))) {
    return NextResponse.json({ status: "error", message: "bad_range" }, { status: 400 });
  }

  const provider = getSchedulingProvider();
  if (!provider) {
    return NextResponse.json({ status: "not_configured" }, { status: 503 });
  }

  const result = await provider.listSlots({ type, from, to, timeZone });
  return NextResponse.json(result, {
    status: result.status === "ok" ? 200 : result.status === "not_configured" ? 503 : 502,
    headers: { "cache-control": "no-store" },
  });
}
