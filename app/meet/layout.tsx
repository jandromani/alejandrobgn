import type React from "react"
import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Professional contact",
    description: "Contact Alejandro Baratas about engineering research and technical leadership.",
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
