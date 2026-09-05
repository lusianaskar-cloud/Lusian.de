import { notFound } from "next/navigation";

/**
 * Anything under a locale that matches no other route.
 *
 * Without this, an unknown path has no matching route at all and Next falls
 * back to the global not-found — which sits outside `app/[lang]` and so
 * renders with no language, no direction and no chrome. Catching it here
 * means a mistyped URL still arrives in the reader's own language.
 */
export default function LocalisedCatchAll(): never {
  notFound();
}
