import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo"
import { RelatedEvidence } from "@/components/related-evidence"

const path="/engineering/delivery-systems"
export const metadata:Metadata=createPageMetadata({title:"Reusable Engineering Context & Quality Gates",description:"Public architectural explanation of four modular patterns for human-governed AI engineering, without proprietary source or a claim of certified customer adoption.",path,ogKind:"experience"})
const capabilities=[
 {title:"Context assets",need:"Make reusable conventions and engineering instructions portable across tasks and repositories.",boundary:"Versioned, domain-scoped assets; promote a learning only after review. Avoid exposing private client context."},
 {title:"Developer knowledge",need:"Maintain source-linked technical understanding: architecture, contracts, conventions and current repository facts.",boundary:"Project-specific knowledge with provenance; not the same as general reusable conventions."},
 {title:"Product knowledge",need:"Represent user journeys, acceptance criteria and domain meanings that code alone cannot communicate.",boundary:"Business-specific and access-controlled; should not be conflated with source-only technical KB."},
 {title:"Specification-driven quality gates",need:"Check readiness, implementation agreement and adversarial review before completion or archiving.",boundary:"Human sign-off remains an explicit part of quality; a gate is not proof of absence of defects."},
] as const
export default function DeliverySystemsPage(){return <div className="min-h-screen bg-background text-foreground">
<JsonLd data={[{"@type":"TechArticle",headline:"Reusable knowledge and quality gates for AI-assisted engineering",url:absoluteUrl(path)},breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Work",path:"/work"},{name:"Reusable delivery architecture",path}])]}/>
<header className="border-b border-border bg-card/20"><div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
<p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Capability architecture · public high-level synthesis</p>
<h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Make agent-assisted delivery reusable, not magical.</h1>
<p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Four separate concerns: reusable context assets, source-specific developer knowledge, product/domain knowledge and specification quality gates. They can be adopted independently. This is a public conceptual explanation, not the source code of a client or an audited commercial deployment.</p>
</div></header>
<section className="container mx-auto max-w-6xl px-4 py-16">
<h2 className="text-2xl font-semibold">What each capability is for</h2>
<div className="mt-7 grid gap-4 md:grid-cols-2">{capabilities.map((x,i)=><article key={x.title} className="rounded-xl border border-border bg-card p-6">
<p className="font-mono text-xs text-[#476700] dark:text-signal-green">{String(i+1).padStart(2,"0")} / MODULAR CAPABILITY</p>
<h3 className="mt-3 text-xl font-semibold">{x.title}</h3>
<p className="mt-4 text-sm leading-7 text-muted-foreground">{x.need}</p>
<p className="mt-5 border-t border-border pt-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Boundary: </strong>{x.boundary}</p>
</article>)}</div>
<div className="mt-10 rounded-xl border border-border bg-secondary/30 p-6">
<h2 className="text-xl font-semibold">Evidence maturity</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">This page explains an architectural approach informed by professional work. Team-by-team adoption, client identity, internal repositories and commercial ROI are not disclosed or externally validated. A public implementation or approved case study would be a separate evidence item.</p>
<Link href="/work" className="mt-5 inline-flex rounded-md border border-border px-4 py-3 text-sm font-semibold">Inspect the two anonymized enterprise cases →</Link>
</div>
</section><RelatedEvidence id="engineering:delivery-systems"/>
</div>}
