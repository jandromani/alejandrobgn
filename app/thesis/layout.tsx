import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "AI Systems Thesis",
    description: "Legacy statement of principles. Current systems and long-form technical evidence are available in the systems and writing sections.",
    path: "/thesis",
    ogKind: "writing",
  }),
  robots: { index: false, follow: true },
}

export default function ThesisLayout({ children }: { children: React.ReactNode }) {
  return children
}

