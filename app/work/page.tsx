import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, GitBranch, ShieldCheck } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { RelatedEvidence } from "@/components/related-evidence"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Selected Enterprise Work — Agentic Delivery and Modernization",
  description: "Two anonymized engineering outcomes: AI-assisted developer workflows put into use in under a month and a source-linked, quality-gated modernization proof.",
  path: "/work", ogKind: "experience", keywords:["enterprise AI engineering","agent-assisted delivery","legacy modernization","technical leadership"],
})
const cases = [
  {
    category:"Cybersecurity · AI engineering", title:"AI workflows teams could use in under a month.",
    number:"<1 month", label:"Delivery-team-reported time to use",
    description:"Two technical peers helped activate project-aware specialist assistance, reviewable PRs and specification-driven collaboration. Human review remained central.",
    limit:"Not an independently audited, company-wide adoption or ROI claim.",
    url:"/work/cybersecurity-ai-engineering", icon:ShieldCheck,
  },
  {
    category:"Banking · Modernization PoC", title:"Traceable modernization, not blind code translation.",
    number:"89.9%", label:"Reported reduction in working context",
    description:"Source relationships, a canonical model, bounded generation and reproducibility checks supported a scoped reference exercise.",
    limit:"Not a completed migration, measured savings or verified functional parity.",
    url:"/work/banking-modernization", icon:GitBranch,
  },
]
export default function WorkPage() {
  return <div className="min-h-screen bg-background">
    <JsonLd data={[
      {"@type":"CollectionPage","@id":absoluteUrl("/work")+"#collection",url:absoluteUrl("/work"),name:"Selected Enterprise Work",
        isPartOf:{"@id":websiteId},author:{"@id":personId},
        mainEntity:{"@type":"ItemList",itemListElement:cases.map((c,i)=>({"@type":"ListItem",position:i+1,name:c.title,url:absoluteUrl(c.url)}))}},
      breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Work",path:"/work"}]),
    ]}/>
    <header className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#5b8f00] dark:text-signal-green">01 / Enterprise outcomes</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">Engineering outcomes with a visible proof boundary.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">I lead architecture, implementation and team adoption of AI-assisted engineering. These cases separate my contribution, shared delivery and what the evidence actually supports.</p>
      </div>
    </header>
    <section className="container mx-auto max-w-6xl px-4 py-14 md:py-20" aria-labelledby="work-cases">
      <h2 id="work-cases" className="mb-7 text-2xl font-semibold">Two outcomes. Inspect the method.</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {cases.map(item=>{
          const Icon=item.icon
          return <Link key={item.url} href={item.url} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-[#5b8f00] focus-visible:ring-2 focus-visible:ring-ring md:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-[#5b8f00] dark:text-signal-green">{item.category}</p>
            <div className="mt-8 flex items-center justify-between gap-4"><strong className="font-mono text-4xl tracking-tight text-foreground">{item.number}</strong><Icon className="h-7 w-7 text-muted-foreground" aria-hidden="true"/></div>
            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            <h3 className="mt-7 text-2xl font-semibold leading-tight">{item.title}</h3>
            <p className="mt-4 flex-1 text-base leading-7 text-muted-foreground">{item.description}</p>
            <p className="mt-6 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">{item.limit}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Inspect case and evidence <ArrowRight className="h-4 w-4"/></span>
          </Link>
        })}
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/experience" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold">Career and responsibilities <ArrowUpRight className="h-4 w-4"/></Link>
        <Link href="/atlas" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold">Evidence graph <ArrowUpRight className="h-4 w-4"/></Link>
        <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background">Start a conversation <ArrowRight className="h-4 w-4"/></Link>
      </div>
    </section>
    <RelatedEvidence id="index:work"/>
  </div>
}
