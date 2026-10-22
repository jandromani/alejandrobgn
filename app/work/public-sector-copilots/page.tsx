import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const path = "/work/public-sector-copilots"
const description = "An anonymized public-sector engineering account: a role-specific copilot package passed through twelve reported audit rounds and repeated corrections before handover."
export const metadata: Metadata = createPageMetadata({
  title: "Public-sector copilots · Engineering case", description, path, ogKind: "experience",
  keywords: ["public sector AI", "developer copilots", "specification-driven development", "AI quality audit"],
})

const metrics = [
  { value: "10", label: "specialist skills in the delivered package" },
  { value: "12", label: "audit rounds before handover" },
  { value: "~47", label: "corrections reported across audit documents; not individually reconstructed" },
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
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Public sector / Anonymized</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">Copilots delivered through repeated audit and correction.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">I led the engineering copilots: specification-driven work from tickets and Java backend assistance. We packaged project knowledge into specialist skills and agents, then put the delivery through repeated reviews before handover to the client team.</p>
        <div className="mt-9 grid max-w-4xl gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {metrics.map(x => <div key={x.value} className="bg-card p-6"><strong className="font-mono text-4xl">{x.value}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{x.label}</p></div>)}
        </div>
      </div>
    </header>
    <article className="container mx-auto max-w-6xl space-y-14 px-4 py-16 md:py-20">
      <section className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-14"><h2 className="text-xl font-semibold">What we built</h2><div className="max-w-3xl space-y-4 text-base leading-8 text-muted-foreground"><p>The delivered package comprised ten specialist skills, three agents and 25 supporting references. Its job was to help engineers move from a ticket and an explicit specification to a reviewable change in the existing Java environment.</p><p>My role was technical leadership and hands-on development of the copilots. The client team owned the codebase, acceptance and subsequent use.</p></div></section>
      <section className="rounded-xl border border-border bg-card p-7 md:p-10"><p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Review record</p><h2 className="mt-3 text-2xl font-bold">The corrections are part of the result</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">The private reports describe twelve audit rounds and more than 140 review cycles. Their summary counts around 47 corrections, including six blocking issues across the documents. One round uses an approximate count and the per-cycle files were not available to the audit, so the precise total and the claim of error-free final rounds are not independently reconstructed. The useful lesson is the repeated review and correction before handover.</p></section>
      <section className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-14"><h2 className="text-xl font-semibold">Evidence and scope</h2><div className="max-w-3xl space-y-4 text-base leading-8 text-muted-foreground"><p>The package and review rounds are described in private project records. The audit examined a July preparation snapshot that did not yet show deployment into the client repository; any later use needs a separate dated deployment or adoption record. The counts describe the package and its review workflow, not independent client-wide adoption, measured productivity or an ongoing operational service level.</p><p>Client identity, repositories, tickets and internal references are excluded. The reusable practice is public: combine project-specific context, a narrow agent role, a human review point and a recorded correction loop. I discuss that method and a separate blind comparison in <Link href="/writing/when-my-quality-gates-lost" className="font-semibold text-foreground underline underline-offset-4">my SDD Kit field note</Link>.</p></div></section>
      <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background">Connect professionally <ArrowRight className="h-4 w-4" /></Link>
    </article>
  </div>
}
