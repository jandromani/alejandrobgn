import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Venture Lab",
    description: "Legacy venture index. The maintained catalogue now lives in AI Systems.",
    path: "/venture-lab",
    ogKind: "systems",
  }),
  robots: { index: false, follow: true },
}

export default function VentureLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
