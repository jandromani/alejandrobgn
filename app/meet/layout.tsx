import type React from "react"
import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Book a meeting",
    description: "Book a private 30-minute session with Alejandro BGN to discuss AI systems, agentic architecture, governance, and enterprise AI platforms.",
    path: "/meet",
    ogKind: "contact",
  }),
  robots: {
    index: false,
    follow: true,
  },
}

export default function MeetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
