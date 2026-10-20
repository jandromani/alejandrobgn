import Link from "next/link"
import { ArrowUpRight, Network } from "lucide-react"
import { relatedPortfolioNodes } from "@/lib/portfolio-graph"

/** Crawlable server-rendered relationships from the same typed graph used by /atlas. */
export function RelatedEvidence({ id, limit = 4 }: { id: string; limit?: number }) {
  const links = relatedPortfolioNodes(id, limit)
  if (!links.length) return null
  return <section id="related-evidence" aria-labelledby="related-evidence-heading" className="border-t border-border bg-card/20">
    <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#587f00] dark:text-signal-green"><Network className="h-4 w-4"/> Cross-referenced / Evidence graph</p>
          <h2 id="related-evidence-heading" className="mt-3 text-2xl font-bold md:text-3xl">Continue through the engineering evidence</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Editorial links to related work. These are conceptual or documented relationships, not runtime integrations.
          </p>
        </div>
        <Link href="/atlas" className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">
          Explore the full atlas <ArrowUpRight className="h-4 w-4"/>
        </Link>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {links.map(({ node, why, relation }) => (
          <Link key={node.id} href={node.href} className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-colors hover:border-foreground/35">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{node.kind} / {relation}</span>
            <h3 className="mt-3 text-base font-semibold leading-snug">{node.title}</h3>
            <p className="mt-3 flex-1 text-xs leading-6 text-muted-foreground">{why}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold group-hover:underline">Inspect evidence <ArrowUpRight className="h-3.5 w-3.5"/></span>
          </Link>
        ))}
      </div>
    </div>
  </section>
}
