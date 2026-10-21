import { permanentRedirect } from "next/navigation"

// The former laboratory index contained stale placeholder links.
// Preserve the legacy deep link without maintaining a competing catalogue.
export default function LegacyLabRedirect() {
  permanentRedirect("/labs")
}
