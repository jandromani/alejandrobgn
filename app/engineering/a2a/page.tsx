import Link from "next/link"
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldAlert } from "lucide-react"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { RelatedEvidence } from "@/components/related-evidence"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, websiteId } from "@/lib/seo"

const path = "/engineering/a2a"
export const metadata: Metadata = createPageMetadata({
  title:"A2A · Governed Agent Platform — Engineering Proof",
  description:"A public FastAPI/LangGraph reference system: approval-gated tools, selected MCP/A2A/Agora contracts, audit and deployment preflight. Bounded evidence, not a production certification.",
  path,ogKind:"system",keywords:["A2A","MCP","agent governance","engineering decisions","CI","architecture"],
})
const rows = [
  {title:"Execution and approvals",visible:"FastAPI endpoints, bounded LangGraph workflows, approval checks and actor scope",proof:"app/workflows/engine.py · tests/test_governance.py",not:"General-purpose autonomous runtime"},
  {title:"Protocol interoperability",visible:"MCP tools, A2A discovery, selected Agora contracts and test fixtures",proof:"app/sdk_protocols.py · tests/test_protocol_interop.py",not:"Verified traffic across external gateways or unrelated peers"},
  {title:"Operational preflight",visible:"Production checks for identity, secrets, TLS, database, policy and archival dependencies",proof:"app/production_preflight.py · tests/test_production_activation.py",not:"Public evidence that those services were configured for a customer"},
  {title:"Audits and cost",visible:"Ledger, usage estimate, audit archive and restore logic",proof:"app/usage.py · app/audit_archive.py · tests/test_restore_verification.py",not:"Provider invoices, WORM proof from a live tenant or production SLOs"},
] as const
const repo="https://github.com/jandromani/A2A"
export default function A2AEngineeringProofPage(){
return <div className="min-h-screen bg-background text-foreground">
  <JsonLd data={[
    {"@type":"TechArticle","@id":absoluteUrl(path)+"#article",url:absoluteUrl(path),headline:"Governed Agent Platform: what is implemented and what remains unproven",isPartOf:{"@id":websiteId},about:["MCP","A2A","LangGraph","AI governance"],inLanguage:"en"},
    breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Work",path:"/work"},{name:"A2A engineering proof",path}]),
  ]}/>
  <header className="border-b border-border bg-card/20">
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"><ArrowLeft size={16}/>Enterprise work</Link>
      <p className="mt-9 font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Engineering proof · public reference implementation · October 2026</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">A2A: governed agents, inspectable boundaries.</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">Built rapidly on 13–14 October 2026 with AI-assisted engineering. The short development window is a method to scrutinize—not proof of productivity uplift, sustained uptime or enterprise adoption. Review code, decisions and test results directly.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={repo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background">Inspect source <ArrowUpRight size={16}/></a>
        <a href={repo+"/actions/workflows/ci.yml"} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold">Current commit CI <ArrowUpRight size={16}/></a>
        <a href={repo+"/blob/master/docs/architecture-decisions.md"} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold">Trade-offs & ADRs <ArrowUpRight size={16}/></a>
      </div>
    </div>
  </header>
  <section className="container mx-auto max-w-6xl px-4 py-16" aria-labelledby="scope-heading">
    <h2 id="scope-heading" className="text-3xl font-semibold">Four inspectable boundaries</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Public code and local tests establish implementation, not correctness against a customer's service configuration.</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2">{rows.map(row=><article key={row.title} className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-xl font-semibold">{row.title}</h3>
      <p className="mt-4 flex gap-2 text-sm leading-7 text-muted-foreground"><CheckCircle2 size={17} className="mt-1 shrink-0 text-[#476700] dark:text-signal-green"/><span><strong className="text-foreground">Inspectable: </strong>{row.visible}</span></p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Source: </strong>{row.proof}</p>
      <p className="mt-4 flex gap-2 border-t border-border pt-4 text-sm leading-7 text-muted-foreground"><ShieldAlert size={17} className="mt-1 shrink-0 text-amber-700 dark:text-amber-300"/><span><strong className="text-foreground">Not proven: </strong>{row.not}</span></p>
    </article>)}</div>
  </section>
  <section className="border-y border-border bg-secondary/30"><div className="container mx-auto max-w-6xl px-4 py-12">
    <h2 className="text-2xl font-semibold">How to challenge this system</h2>
    <ol className="mt-5 list-decimal space-y-3 pl-6 text-sm leading-7 text-muted-foreground">
      <li>Run governance and protocol tests with a real isolated test principal.</li>
      <li>Review human-approved write paths and failure conditions before trusting any connector.</li>
      <li>Check the latest SHA and CI, not an archived screenshot or an old green build.</li>
      <li>Provision real services and run the fail-closed production preflight; confirm backup and restore.</li>
      <li>Request a human/agent provenance log before using commit speed as a productivity claim.</li>
    </ol>
    <p className="mt-6 text-sm leading-7 text-muted-foreground">This is a public engineering reference, not an anonymized customer implementation. Operational maturity cannot be inferred from the number of files or commits.</p>
  </div></section>
  <RelatedEvidence id="engineering:a2a"/>
</div>
}
