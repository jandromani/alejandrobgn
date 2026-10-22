import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { EngineeringMethod } from "@/components/engineering-method"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const path = "/engineering"
const description = "Alejandro Baratas's evidence-led engineering method: structured specifications, source context, deterministic delivery, quality gates and human approval, with explicit proof boundaries."
export const metadata: Metadata = createPageMetadata({
  title: "Engineering Method · From Specification to Evidence",
  description, path, ogKind: "experience",
  keywords: ["Alejandro Baratas engineering method", "Alejandría SDLC accelerator", "deterministic modernization", "agent governance", "SDD Kit"],
})

const evidence = [
  { name: "Alejandría", type: "Internal accelerator · company asset", observed: "50 traceable requirements, 22 hash and ledger checks; 12/12 core tests reproduced in a private audit.", limit: "Deterministic reference pack, no live LLM or public source package." },
  { name: "Banking Factoría", type: "Client PoC · sector anonymized", observed: "23,811 registry entries in total; 22,995 carry source file, line and SHA-256. Two runs compared 4,338 files.", limit: "Bounded reference; no measured functional equivalence or disclosed acceptance outcome." },
  { name: "AgentCycle + SDD Kit", type: "Two related gate experiments", observed: "7/100 self-block on Factoría; three blind SDD losses disclosed with the resulting design changes.", limit: "Different codebases and evaluation setups; not one installed workflow." },
  { name: "Engineering Context + KMM", type: "Internal context and governance prototypes", observed: "135/135 context-layer tests; governance audit reproduced 118 passes with 9 failures due to missing optional cryptography.", limit: "No three-layer integration test, third-party security review or enterprise adoption measurement." },
] as const

export default function EngineeringPage() {
  return <div className="min-h-screen bg-background">
    <JsonLd data={[
      { "@type": "WebPage", "@id": absoluteUrl(path) + "#webpage", url: absoluteUrl(path), name: "Engineering method — Alejandro Baratas", description, isPartOf: { "@id": websiteId }, about: { "@id": personId }, inLanguage: "en", dateModified: "2026-10-22" },
      breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Engineering method", path }]),
    ]} />
    <header className="relative overflow-hidden border-b border-border bg-card/20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" aria-hidden="true" />
      <div className="relative container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[.18em] text-[#476700] dark:text-signal-green">Engineering method / Evidence before release</p>
        <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">From a specification to a delivery someone can challenge.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">I design agent-assisted engineering around five decisions: specify the contract, establish source context, build a bounded candidate, test the gates and ask a person to authorize the result. Alejandría, the modernization Factoría and my quality-gate experiments show how that method developed in different settings.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="#method" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#90d900] px-5 py-3 text-sm font-semibold text-[#090b0f]">Explore the method <ArrowRight className="h-4 w-4" /></a><a href="#evidence" className="inline-flex min-h-11 items-center rounded-md border border-border px-5 py-3 text-sm font-semibold">Inspect the evidence</a></div>
        <p className="mt-7 max-w-3xl text-sm leading-6 text-muted-foreground">These are connected design decisions across separate assets and engagements. Company-owned source and client materials remain private; the figures below are attributed to the supplied private technical audit and the case records.</p>
      </div>
    </header>

    <section id="method" aria-labelledby="method-title" className="container mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">01 / Five decisions</p>
      <h2 id="method-title" className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">A repeatable question at each stage</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">Select a stage to see what was built, which evidence supports it and where the proof stops.</p>
      <EngineeringMethod />
    </section>

    <section aria-labelledby="lineage-title" className="border-y border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">02 / The evolution</p>
        <h2 id="lineage-title" className="mt-3 text-3xl font-bold md:text-4xl">One question, several implementations</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">The central question is: what evidence is sufficient to call a change done? Alejandría turned specifications into traceable packs. Factoría explored repeatable modernization from source. AgentCycle blocked its own factory at 7/100. The SDD Kit moved the release decision into lightweight, explicit review gates. These are related experiments, not a claim that every repository already runs as one platform.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-6"><p className="font-mono text-xs uppercase text-[#476700] dark:text-signal-green">Contract</p><h3 className="mt-3 text-xl font-semibold">Alejandría</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Requirement IDs, delivery pack, ledger and verifier. The reusable idea is a checkable contract.</p></div>
          <div className="rounded-xl border border-border bg-background p-6"><p className="font-mono text-xs uppercase text-[#476700] dark:text-signal-green">Production</p><h3 className="mt-3 text-xl font-semibold">Factoría</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Corpus-first model and deterministic outputs in a banking PoC. Source traceability is distinct from parity.</p></div>
          <div className="rounded-xl border border-border bg-background p-6"><p className="font-mono text-xs uppercase text-[#476700] dark:text-signal-green">Decision</p><h3 className="mt-3 text-xl font-semibold">AgentCycle → SDD Kit</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A self-blocking governance cycle informed a simpler change-level gate, challenged by blind review.</p></div>
        </div>
        <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold"><Link href="/work/banking-modernization" className="inline-flex items-center gap-2 underline underline-offset-4">Banking case <ArrowUpRight className="h-4 w-4" /></Link><Link href="/writing/when-my-quality-gates-lost" className="inline-flex items-center gap-2 underline underline-offset-4">SDD field note and Anatomy figure <ArrowUpRight className="h-4 w-4" /></Link></div>
      </div>
    </section>

    <section aria-labelledby="layers-title" className="border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">03 / Agent engineering layers</p>
        <h2 id="layers-title" className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">What an agent knows, does and is allowed to do</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">Three internal implementations explore the same operating problem from different angles. They were developed in sequence and have not been verified as a single integrated product.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card/40 p-6"><p className="font-mono text-xs uppercase text-[#476700] dark:text-signal-green">Knows / Engineering Context</p><h3 className="mt-3 text-xl font-semibold">Find relevant code and relationships</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A replaceable graph provider and local MCP adapter deliver focused source context. The audit reproduced 135 tests. Its ten-question token estimate is narrow and does not measure task success.</p></article>
          <article className="rounded-xl border border-border bg-card/40 p-6"><p className="font-mono text-xs uppercase text-[#476700] dark:text-signal-green">Does / Codex Loop</p><h3 className="mt-3 text-xl font-semibold">Run a task queue with preflight</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A VS Code experiment queues agent work, records events and checks the workspace before a long run. All 33 reproduced tests cover the command-assurance bridge; they do not prove the entire extension or quality of generated code.</p></article>
          <article className="rounded-xl border border-border bg-card/40 p-6"><p className="font-mono text-xs uppercase text-[#476700] dark:text-signal-green">May do / KMM</p><h3 className="mt-3 text-xl font-semibold">Apply policy and human approval</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The governance layer binds approvals to role, expiry and request hash, then records a ledger. A stored run reports 133 tests; the audit reproduced 118 passes and 9 dependency-related failures.</p></article>
        </div>
        <p className="mt-7 max-w-4xl rounded-xl border border-border bg-card/40 p-6 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">A separate SDLC control plane:</strong> the KNOWMAD Agentic System SDLC prototype offers eight versioned scenarios through CLI, REST and SDK. The private audit reproduced 68 passing tests. Its 88.2/100 readiness score is self-assessed, with seven open release gates; it is not evidence that the three layers above run together in production.</p>
      </div>
    </section>

    <section id="evidence" aria-labelledby="evidence-title" className="container mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">04 / Evidence register</p>
      <h2 id="evidence-title" className="mt-3 text-3xl font-bold md:text-4xl">The exact claim and its limit</h2>
      <div className="mt-8 overflow-x-auto rounded-xl border border-border"><table className="w-full min-w-[760px] text-left text-sm leading-6"><caption className="sr-only">Engineering assets, observed evidence and proof boundaries</caption><thead className="bg-card text-foreground"><tr><th scope="col" className="p-4 font-semibold">Asset and ownership</th><th scope="col" className="p-4 font-semibold">Recorded evidence</th><th scope="col" className="p-4 font-semibold">Proof boundary</th></tr></thead><tbody>{evidence.map(item => <tr key={item.name} className="border-t border-border align-top"><th scope="row" className="w-1/4 p-4 font-semibold"><span className="block">{item.name}</span><span className="mt-1 block font-normal text-muted-foreground">{item.type}</span></th><td className="w-[38%] p-4 text-muted-foreground">{item.observed}</td><td className="p-4 text-muted-foreground">{item.limit}</td></tr>)}</tbody></table></div>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">Source of these bounded measurements: private technical audit supplied for this portfolio, cross-checked against its code, test output and artifacts where stated. These records are self-produced or auditor-reproduced locally; they are not testimonials or independent business outcomes. Public client identifiers, raw source material and internal repositories are deliberately omitted.</p>
    </section>

    <section className="border-t border-border bg-card/20"><div className="container mx-auto max-w-6xl px-4 py-14"><h2 className="text-2xl font-bold">Where the method went into use</h2><p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">The <Link href="/work" className="font-semibold text-foreground underline underline-offset-4">enterprise cases</Link> document bounded engagements. My <Link href="/writing/when-my-quality-gates-lost" className="font-semibold text-foreground underline underline-offset-4">SDD field note</Link> opens the review method and its blind losses. For the next layer of proof, a redacted run and a client-attributable outcome would be more valuable than another activity counter.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background">Discuss the method <ArrowRight className="h-4 w-4" /></Link></div></section>
  </div>
}
