import type { Metadata } from "next"
import Link from "next/link"
import { PortfolioChat } from "@/components/portfolio-chat"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Ask the portfolio · Alejandro Baratas",
  description: "Explore Alejandro Baratas's public engineering work through a source-linked portfolio guide.",
  path: "/ask",
  ogKind: "about",
  keywords: ["Alejandro Baratas", "engineering portfolio", "AI engineering cases", "evidence"],
})

export default function AskPage() {
  return <div className="min-h-screen bg-background">
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">Explore / Ask the portfolio</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">Ask about the work behind the site.</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">A guided way to explore cases, the engineering method and its limits. Every answer points you to the public record. For a conversation with me directly, use the <Link href="/contact" className="font-semibold text-foreground underline underline-offset-4">contact page</Link>.</p>
      <div className="mt-9"><PortfolioChat /></div>
      <p className="mt-6 text-sm leading-7 text-muted-foreground">Start with a question. For the full narrative, see <Link href="/work" className="font-semibold text-foreground underline underline-offset-4">selected work</Link>, the <Link href="/engineering#evidence" className="font-semibold text-foreground underline underline-offset-4">evidence register</Link> and the <Link href="/atlas" className="font-semibold text-foreground underline underline-offset-4">Atlas</Link>.</p>
    </div>
  </div>
}
