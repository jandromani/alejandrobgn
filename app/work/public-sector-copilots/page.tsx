import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const path = "/work/public-sector-copilots"
const description = "An anonymized public-sector engineering engagement: delivering role-specific development copilots after twelve audit rounds and 47 documented corrections."
export const metadata: Metadata = createPageMetadata({
  title: "Public-sector copilots · Engineering case", description, path, ogKind: "experience",
  keywords: ["public sector AI", "developer copilots", "specification-driven development", "AI quality audit"],
})

const metrics = [
  { value: "10", label: "specialist skills in the delivered package" },
  { value: "12", label: "audit rounds before handover" },
  { value: "47", label: "corrections recorded, including six blocking issues" },
] as const

export default function PublicSectorCopilotsPage() {
  return <div className="min-h-screen bg-background">
    <JsonLd data={[
      { "@type": "Article", "@id": `${absoluteUrl(path)}#case`, headline: "Development copilots delivered after twelve audit rounds", description, author: { "@id": personId }, isPartOf: { "@id": websiteId }, mainEntityOfPage: absoluteUrl(path), inLanguage: "en" },
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }, { name: "Public-sector copilots", path }]),
    ]} />
    <header className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All enterprise work</Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Public sector / July–August 2026 / Anonymized</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">Copilots delivered through repeated audit and correction.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">I led the engineering copilots with a peer: specification-driven work from tickets and Java backend assistance. We packaged project knowledge into specialist skills and agents, then put the delivery through repeated reviews before handover to the client team.</p>
        <div className="mt-9 grid max-w-4xl gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {metrics.map(x => <div key={x.value} className="bg-card p-6"><strong className="font-mono text-4xl">{x.value}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{x.label}</p></div>)}
        </div>
      </div>
    </header>
    <article className="container mx-auto max-w-6xl space-y-14 px-4 py-16 md:py-20">
      <section className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-14"><h2 className="text-xl font-semibold">What we built</h2><div className="max-w-3xl space-y-4 text-base leading-8 text-muted-foreground"><p>The delivered package comprised ten specialist skills, three agents and 25 supporting references. Its job was to help engineers move from a ticket and an explicit specification to a reviewable change in the existing Java environment.</p><p>My role was technical leadership and hands-on development of the copilots with one peer. The client team owned the codebase, acceptance and subsequent use.</p></div></section>
      <section className="rounded-xl border border-border bg-card p-7 md:p-10"><p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Audit trail</p><h2 className="mt-3 text-2xl font-bold">The corrections are part of the result</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">The engagement record describes twelve audit rounds, more than 140 review cycles and 47 real corrections, six of them blocking. Five consecutive rounds completed without recorded errors before handover. That sequence shows how the package was hardened; it is more informative than a claim that the first generated version was ready.</p></section>
      <section className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-14"><h2 className="text-xl font-semibold">Evidence and scope</h2><div className="max-w-3xl space-y-4 text-base leading-8 text-muted-foreground"><p>The delivery and team use are described in my private engagement and session records. The counts here describe our package and audit workflow, not independent client-wide adoption, measured productivity or an ongoing operational service level.</p><p>Client identity, repositories, tickets and internal references are excluded. The reusable practice is public: combine project-specific context, a narrow agent role, a human review point and a recorded correction loop. I discuss that method and a separate blind comparison in <Link href="/writing/when-my-quality-gates-lost" className="font-semibold text-foreground underline underline-offset-4">my SDD Kit field note</Link>.</p></div></section>
      <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background">Discuss a similar engineering problem <ArrowRight className="h-4 w-4" /></Link>
    </article>
  </div>
}
