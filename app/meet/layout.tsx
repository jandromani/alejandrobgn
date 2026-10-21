import type React from "react"
import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Book a meeting",
    description: "Book a 30-minute conversation with Alejandro Baratas about enterprise AI engineering.",
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
