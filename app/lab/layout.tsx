import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Research Laboratory",
    description: "Legacy research index. Current experiments and technical lineage now live in AI Co-Evolution and the systems catalogue.",
    path: "/lab",
    ogKind: "evolution",
  }),
  robots: { index: false, follow: true },
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children
}

