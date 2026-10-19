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
    <main className="min-h-screen bg-background">
      <JsonLd
        data={[
          {
            "@type": "Article",
            "@id": `${absoluteUrl(route)}#case`,
            headline: "A deterministic modernization factory from legacy source to evidence",
            description: summary,
            author: { "@id": personId },
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
        <div className="relative container mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-20 md:pt-20">
          <Link href="/experience" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} aria-hidden="true" /> Professional experience
          </Link>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.19em] text-signal-green">
            Selected work / Banking sector / Anonymized
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
            From legacy source to a reproducible modernization factory.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            A four-week engineering PoC explored a more scalable idea: treat a legacy system as a corpus
            to understand, normalize and trace before generating new software. A bounded reference
            module tested the approach; migration of a complete estate was not proven.
          </p>
          <div className="mt-10 grid max-w-4xl gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            <div className="bg-card p-5">
              <p className="font-mono text-2xl font-bold text-foreground">4 weeks</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Reported PoC engagement duration</p>
            </div>
            <div className="bg-card p-5">
              <p className="font-mono text-2xl font-bold text-foreground">Reference slice</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">One bounded module, not a full migration</p>
            </div>
            <div className="bg-card p-5">
              <p className="font-mono text-2xl font-bold text-foreground">Source-linked</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Evidence as an architectural constraint</p>
            </div>
          </div>
        </div>
      </header>

      <article className="container mx-auto max-w-6xl space-y-20 px-4 py-16 md:py-24">
        <section className="grid gap-8 border-b border-border pb-16 md:grid-cols-[220px_1fr] md:gap-16" aria-labelledby="challenge">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-signal-green">01 / Thesis</p>
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

        <section aria-labelledby="pipeline">
          <div className="flex items-start gap-3">
            <Layers3 size={23} className="mt-1 shrink-0 text-signal-green" aria-hidden="true" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-signal-green">02 / Operating mechanism</p>
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
                  <span className="font-mono text-sm font-bold text-signal-green">{step.number}</span>
                  <GitBranch className="text-muted-foreground" size={17} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-4 text-xs font-medium text-foreground">{step.input}</p>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{step.process}</p>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-6 text-foreground">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-signal-green">Output / </span>
                  {step.output}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-6" aria-labelledby="anatomy-interlock">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-signal-green">Engineering anatomy / interactive mechanism</p>
            <h2 id="anatomy-interlock" className="mt-3 text-2xl font-semibold md:text-3xl">
              The source-to-evidence interlock
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              An isometric three-pin mechanism generated with the original MIT-licensed
              <a href="https://github.com/wheresryan22/anatomy" target="_blank" rel="noopener noreferrer" className="mx-1 underline decoration-border underline-offset-4 hover:text-foreground">Anatomy kit</a>.
              Toggle lineage, contract and repeatability, then test whether the proof carriage can move.
              The controls model review criteria, not a live banking environment.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-[#f6f8f5]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d7e1da] bg-[#eef3ee] px-4 py-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#263b34]">
                Actual Anatomy geometry / illustrated quality gates
              </span>
              <a href="/anatomy/figures/factory.html" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#365b3d] underline underline-offset-4">
                Open full-size figure →
              </a>
            </div>
            <iframe
              title="Interactive native Anatomy isometric machine with source lineage, contract and repeatability pins"
              src="/anatomy/figures/factory.html"
              sandbox="allow-scripts"
              loading="lazy"
              className="block h-[620px] w-full border-0 md:h-[700px]"
            />
          </div>
          <p className="max-w-4xl text-xs leading-6 text-muted-foreground">
            Controls: click the three pins or press 1, 2, 3 in the figure, then Space to test or Escape to reset.
            The mechanism is generated from the upstream geometry library (Ryan, MIT). Its states and interlock
            results are invented for explanation; they do not validate functional parity or customer acceptance.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-2" aria-label="Contribution and evidence">
          <div className="rounded-xl border border-border bg-card p-7 md:p-8">
            <div className="flex items-center gap-3"><Wrench size={21} className="text-signal-green" aria-hidden="true" /><h2 className="text-xl font-semibold">My architectural contribution</h2></div>
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
          <p className="font-mono text-[11px] uppercase tracking-widest text-signal-green">03 / Proof boundary</p>
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
    </main>
  )
}
