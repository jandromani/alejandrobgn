import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { PortfolioAtlasExplorer } from "@/components/portfolio-atlas-explorer"
import { portfolioEdges, portfolioNodes } from "@/lib/portfolio-graph"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Engineering Atlas — Evidence and Connections",
  description: "Explore the connections between anonymized enterprise cases, original browser labs, public systems and technical writing. A linked evidence map, not an invented runtime architecture.",
  path: "/atlas",
  ogKind: "systems",
  keywords: ["engineering evidence", "AI architecture", "interactive technical portfolio", "knowledge graph"],
})

export default function AtlasPage() {
  return <div className="min-h-screen bg-background">
    <JsonLd data={[
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/atlas")}#collection`,
        url: absoluteUrl("/atlas"),
        name: "Engineering Atlas — Evidence and Connections",
        description: "Inspectable editorial relationships across case studies, systems, original labs and technical articles. No live dependency claim.",
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: portfolioNodes.length,
          itemListElement: portfolioNodes.map((node, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: node.title,
            url: absoluteUrl(node.href),
          })),
        },
      },
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Engineering Atlas", path: "/atlas" }]),
    ]}/>
    <header className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#587f00] dark:text-signal-green">01 / Portfolio evidence graph</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">Every artifact has a place in the system.</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
          Follow real internal URLs connecting enterprise outcomes, engineering systems, original HTML labs and technical writing.
          Connections describe why the work belongs together. They never imply client access, deployed integration or verified production behavior.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs text-muted-foreground">
          <span className="rounded-md border border-border px-3 py-2">{portfolioNodes.length} linked entries</span>
          <span className="rounded-md border border-border px-3 py-2">{portfolioEdges.length} contextual edges</span>
          <span className="rounded-md border border-border px-3 py-2">One canonical domain</span>
        </div>
      </div>
    </header>
    <section id="map" aria-labelledby="map-title" className="container mx-auto max-w-[1460px] px-4 py-12 md:px-7 md:py-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h2 id="map-title" className="text-2xl font-bold">Explore the internal graph</h2><a href="/atlas/graph.json" className="text-sm font-medium underline underline-offset-4">Read machine-readable graph JSON ↗</a></div>
      <PortfolioAtlasExplorer nodes={portfolioNodes} edges={portfolioEdges}/>
    </section>
    <section className="border-t border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold">Start with the two enterprise cases</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">The clearest account of what was owned, what changed and what remains unproven.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {portfolioNodes.filter(n => n.kind === "case").map(n => (
            <Link key={n.id} href={n.href} className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/40">
              <h3 className="text-xl font-semibold">{n.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{n.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Read case and evidence <ArrowRight className="h-4 w-4"/></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
}
