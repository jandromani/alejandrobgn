import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen min-w-0 flex flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" className="min-w-0 w-full flex-1" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  )
}
