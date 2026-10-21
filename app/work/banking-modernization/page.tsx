import { relatedPortfolioNodes } from "@/lib/portfolio-graph"
import { EngineeringAnatomy } from "@/components/engineering-anatomy"
import { RelatedEvidence } from "@/components/related-evidence"
import { EnterpriseSyntheticEvidence } from "@/components/enterprise-synthetic-evidence"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight, GitBranch, Layers3, ShieldCheck, Wrench } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const route = "/work/banking-modernization"
const summary =
  "A four-week, sector-anonymized engineering proof of concept: architecting a corpus-first, source-traceable and deterministic route from legacy software to reviewable modernization assets, tested on a bounded reference module."

export const metadata: Metadata = createPageMetadata({
  title: "Deterministic legacy modernization · Enterprise engineering case",
  description: summary,
  path: route,
  ogKind: "experience",
  keywords: ["legacy modernization", "software reverse engineering", "deterministic generation", "canonical model", "source traceability"],
})

const pipeline = [
  {
    number: "01",
    title: "Understand the source corpus",
    input: "Legacy repositories, views, configuration and service contracts",
    process: "Inspect structure, dependencies and source locations before attempting a rewrite.",
    output: "A traceable inventory and a reference slice",
  },
  {
    number: "02",
    title: "Recover technical meaning",
    input: "Source relationships and selected legacy behaviors",
    process: "Separate observed facts from inferred behavior. Preserve references to the originating files.",
    output: "Structured system knowledge",
  },
  {
    number: "03",
    title: "Create a canonical model",
    input: "Source-linked facts and reconstructed contracts",
    process: "Describe relationships using a graph and a consistent intermediate representation, rather than translating files one by one.",
    output: "Canonical engineering representation",
  },
  {
    number: "04",
    title: "Generate target artifacts",
    input: "Canonical model and explicit transformation rules",
    process: "Use bounded generators to produce candidate contracts, components, tests and documentation.",
    output: "Versionable candidate artifacts",
  },
  {
    number: "05",
    title: "Compare reproducibly",
    input: "Generated assets, source references and declared execution settings",
    process: "Check repeatability and artifact consistency inside the reference scope. Report gaps rather than hiding them.",
    output: "Repeatability evidence and unresolved items",
  },
  {
    number: "06",
    title: "Keep the proof boundary visible",
    input: "A bounded reference-module PoC",
    process: "Distinguish a demonstrated technical approach from full-estate generalization, runtime parity and customer acceptance.",
    output: "A reviewable result with explicit limitations",
  },
] as const

const leadership = [
  "Conceived the corpus-first modernization architecture rather than a sequence of isolated manual migrations.",
  "Decomposed the technical path into source understanding, canonical representation, deterministic generation and evidence gates.",
  "Used one bounded module as a proving ground while keeping the wider-estate objective separate from what was actually tested.",
  "Kept reproducibility, source attribution and functional equivalence as different verification questions.",
] as const

const outcomes = [
  "A reference-module proof of concept explored the end-to-end architecture across source understanding, target generation and repeatability.",
  "The work produced structured knowledge and candidate modernization artifacts with traceability back to source evidence.",
  "The PoC documented checks, missing evidence and environment dependencies rather than treating generated artifacts as a completed migration.",
] as const

export default function BankingModernizationPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          {
            "@type": "Article",
            "@id": `${absoluteUrl(route)}#case`,
            headline: "A deterministic modernization factory from legacy source to evidence",
            description: summary,
            author: { "@id": personId },
            mentions: relatedPortfolioNodes("case:banking-modernization").map(({node}) => ({
              "@type":"CreativeWork",
              name:node.title,
              url:absoluteUrl(node.href),
            })),
            isPartOf: { "@id": websiteId },
            mainEntityOfPage: absoluteUrl(route),
            inLanguage: "en",
            about: ["Legacy modernization", "Knowledge graphs", "Deterministic code generation"],
          },
          {
            ...breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Experience", path: "/experience" },
              { name: "Banking modernization", path: route },
            ]),
            "@id": `${absoluteUrl(route)}#breadcrumb`,
          },
        ]}
      />

      <header className="relative overflow-hidden border-b border-border">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="relative container mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-16 md:pt-16">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} aria-hidden="true" /> All enterprise work
          </Link>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.19em] text-[#476700] dark:text-signal-green">
            Selected work / Banking sector / Anonymized
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
            From legacy source to a reproducible modernization factory.
          </h1>
          <div className="mt-7 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            <div className="bg-card p-5">
              <p className="font-mono text-2xl font-bold text-foreground">4 weeks</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Reported PoC engagement duration</p>
            </div>
            <div className="bg-card p-5">
              <p className="font-mono text-2xl font-bold text-foreground">89.9%</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Team-reported reduction in working context for the scoped method, not time saved</p>
            </div>
            <div className="bg-card p-5">
              <p className="font-mono text-2xl font-bold text-foreground">13 gates</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Internal technical checks reported green in the evaluated scope; not functional parity</p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            A four-week engineering PoC explored a more scalable idea: treat a legacy system as a corpus
            to understand, normalize and trace before generating new software. A bounded reference
            module tested the approach; migration of a complete estate was not proven.
          </p>
          <a href="#anatomy" className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-foreground/40">
            Explore the interactive engineering Anatomy <ArrowRight className="h-4 w-4" aria-hidden="true"/>
          </a>
          <p className="mt-4 max-w-4xl text-xs leading-6 text-muted-foreground">
            These are engineering-team-reported process measurements from a bounded reference scope, not customer business KPIs or independent certification. The baseline and test evidence are not published because source material is confidential; no estate-wide migration or functional equivalence is claimed.
          </p>
        </div>
      </header>

      <section id="anatomy" aria-labelledby="anatomy-heading" className="scroll-mt-20 border-b border-border bg-card/15">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Interactive engineering Anatomy / Original explanatory model</p>
          <h2 id="anatomy-heading" className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Interactive Anatomy · Legacy evidence lock</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Explore how lineage, contract and reproducibility gates connect to a release decision. Modelled controls explain the method; they do not certify functional equivalence.</p>
          <div className="mt-7">
            <EngineeringAnatomy variant="modernization" />
          </div>
          <details className="mt-6 rounded-xl border border-border bg-card/40">
            <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-foreground">
              Inspect preserved mechanical Anatomy experiment (original kit SVG)
            </summary>
            <div className="border-t border-border">
              <iframe src="/anatomy/figures/factory.html" title="Interactive Anatomy · Legacy evidence lock — preserved original kit mechanism" loading="lazy" sandbox="allow-scripts"
                className="block h-[740px] w-full border-0 md:h-[700px]" />
            </div>
            <p className="px-5 py-4 text-xs leading-6 text-muted-foreground">
              Historical three-pin mechanism, generated from the upstream MIT-licensed Anatomy kit. All controls are fictional.
              <a href="/anatomy/figures/factory.html" target="_blank" rel="noopener noreferrer" className="ml-2 underline underline-offset-4">Open the standalone archive ↗</a>
            </p>
          </details>
        </div>
      </section>

      <article className="container mx-auto max-w-6xl space-y-20 px-4 py-16 md:py-24">
        <section className="grid gap-8 border-b border-border pb-16 md:grid-cols-[220px_1fr] md:gap-16" aria-labelledby="challenge">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">01 / Thesis</p>
            <h2 id="challenge" className="mt-3 text-xl font-semibold">Why the corpus comes first</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Translating one legacy file can create code without recovering the meaning of the whole system.
              Dependencies, views, contracts and configuration must be understood together so that each output
              can be traced to its source.
            </p>
            <p>
              The proposed solution was a canonical engineering representation and a controlled generator
              pipeline. The one-module PoC tested that architecture while leaving full-system equivalence as a separate question.
            </p>
          </div>
        </section>

        <section aria-labelledby="results-title" className="space-y-7">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">02 / Demonstrated scope</p>
            <h2 id="results-title" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">What the reference module made possible</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The PoC connected source understanding to a repeatable generation workflow, so a technical
              reviewer could inspect where candidate outputs came from and which checks were applied.
              It was a bounded demonstration, not an estate-wide migration.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
            {[
              { label: "System understanding", result: "Source-linked technical representation", detail: "Repository relationships, selected contracts and source references organised before generation." },
              { label: "Engineering output", result: "Versionable modernization candidates", detail: "Target artifacts derived through explicit transformation rules from the canonical representation." },
              { label: "Reviewable evidence", result: "Repeatability checks with explicit limits", detail: "Consistency checks on a reference slice; functional parity and whole-estate coverage remain separate gates." },
            ].map((item) => (
              <article key={item.label} className="bg-card p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">{item.label}</p>
                <h3 className="mt-3 text-lg font-semibold leading-7 text-foreground">{item.result}</h3>
                <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="decisions-title" className="rounded-xl border border-border bg-card/40 p-7 md:p-9">
          <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">03 / Architecture decisions</p>
          <h2 id="decisions-title" className="mt-3 text-2xl font-semibold">Why not simply translate file by file?</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              ["Corpus before code", "Resolve dependencies and business-relevant contracts before treating any isolated output as representative."],
              ["Canonical model before generators", "Use one source-attributed representation rather than letting each target artifact infer its own meaning."],
              ["Evidence before migration claims", "Treat deterministic output, source traceability and functional equivalence as three distinct verification questions."],
            ].map(([title, decision]) => (
              <div key={title}>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{decision}</p>
              </div>
            ))}
          </div>
        </section>

        <EnterpriseSyntheticEvidence variant="modernization" />

        <section aria-labelledby="pipeline">
          <div className="flex items-start gap-3">
            <Layers3 size={23} className="mt-1 shrink-0 text-[#476700] dark:text-signal-green" aria-hidden="true" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">04 / Transformation path</p>
              <h2 id="pipeline" className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">From source to evidence</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                Six connected engineering decisions — the explanation, not a claim that an entire banking estate was migrated.
              </p>
            </div>
          </div>
          <ol className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((step) => (
              <li key={step.number} className="flex flex-col rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#476700] dark:text-signal-green">{step.number}</span>
                  <GitBranch className="text-muted-foreground" size={17} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-4 text-xs font-medium text-foreground">{step.input}</p>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{step.process}</p>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-6 text-foreground">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Output / </span>
                  {step.output}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-4 lg:grid-cols-2" aria-label="Contribution and evidence">
          <div className="rounded-xl border border-border bg-card p-7 md:p-8">
            <div className="flex items-center gap-3"><Wrench size={21} className="text-[#476700] dark:text-signal-green" aria-hidden="true" /><h2 className="text-xl font-semibold">My architectural contribution</h2></div>
            <ul className="mt-6 space-y-4">
              {leadership.map(x => <li key={x} className="text-sm leading-7 text-muted-foreground">— {x}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-7 md:p-8">
            <div className="flex items-center gap-3"><ShieldCheck size={21} className="text-signal-cyan" aria-hidden="true" /><h2 className="text-xl font-semibold">What the PoC supports</h2></div>
            <ul className="mt-6 space-y-4">
              {outcomes.map(x => <li key={x} className="text-sm leading-7 text-muted-foreground">— {x}</li>)}
            </ul>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-secondary/30 p-7 md:p-9" aria-labelledby="scope">
          <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">05 / Proof boundary</p>
          <h2 id="scope" className="mt-3 text-2xl font-semibold">Reproducible artifacts are not functional parity</h2>
          <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground">
            The reported work was a bounded technical proof of concept. Repeatability under declared conditions does
            not establish functional equivalence, operational deployment, bank-wide applicability or financial savings.
            Client identifiers, internal code, architecture details and unpublished project counts are intentionally excluded.
          </p>
        </section>

        <footer className="flex flex-col gap-5 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-7 text-muted-foreground">
            Designed to communicate the engineering idea and its validation limits without disclosing customer materials.
          </p>
          <Link href="/experience" className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/35">
            Back to experience <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </footer>
      </article>
      <RelatedEvidence id={`case:banking-modernization`} />
    </div>
  )
}
