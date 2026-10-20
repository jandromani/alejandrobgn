import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowRight, Braces, Database, GitBranch, ShieldCheck } from "lucide-react"
import { EvolutionExplorer, EvolutionFamilyLegend } from "@/components/evolution-explorer"
import { EvolutionGrowthCurve } from "@/components/evolution-growth-curve"
import { evolutionEras, evolutionFamilies, evolutionRecords, evolutionConfidenceCounts, evolutionHistoricalCount, evolutionAddedCount, familyDescriptions, modelEras } from "@/lib/evolution"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, createPageMetadata, personId, websiteId } from "@/lib/seo"

const evolutionDescription =
  "A public-safe reconstruction of 201 documented artefacts (184 reconstructed historical entries plus 17 later documented milestones) spanning January 2023 through October 14, 2026: context engineering, products, AI reliability, agent infrastructure and governance."

export const metadata: Metadata = createPageMetadata({
  title: "AI Co-Evolution — From CONTINUA to Control Planes",
  description: evolutionDescription,
  path: "/evolution",
  ogKind: "evolution",
  keywords: ["AI evolution timeline", "human AI collaboration", "AI engineering portfolio", "agent systems history"],
})

const topTechnologies = [
  ["Python", 40],
  ["Next.js", 11],
  ["JavaScript", 9],
  ["Structured data", 6],
  ["NumPy", 6],
  ["TypeScript", 5],
  ["Agent orchestration", 5],
  ["OpenRouter", 5],
  ["Supabase", 5],
  ["FastAPI", 4],
] as const

const recurringPatterns = [
  ["Agentic orchestration", 45],
  ["Frontend & interaction", 36],
  ["Spec-driven engineering", 32],
  ["Observability & evidence", 32],
  ["Data engineering", 30],
  ["RAG & document intelligence", 27],
  ["GIS & spatial computing", 25],
  ["Runtime governance", 24],
] as const

const lineage = [
  {
    stage: "01",
    title: "Context as explicit state",
    detail: "Continuation protocols, conversational variables and recap packets.",
    transfer: "If state matters, make it inspectable.",
    color: "text-signal-cyan",
  },
  {
    stage: "02",
    title: "Reasoning as mechanism",
    detail: "GIS engines, automation, enterprise Java and structured generators.",
    transfer: "Move repeatable thought into executable systems.",
    color: "text-signal-green",
  },
  {
    stage: "03",
    title: "Mechanisms as products",
    detail: "APIs, packages, dashboards, document intelligence and model economics.",
    transfer: "A useful capability needs an interface and operating boundary.",
    color: "text-violet-400",
  },
  {
    stage: "04",
    title: "Products as laboratories",
    detail: "Benchmarks, entropy experiments, behavioural safety and multi-model systems.",
    transfer: "Observation is weak unless it can change runtime behaviour.",
    color: "text-rose-400",
  },
  {
    stage: "05",
    title: "Laboratories as control planes",
    detail: "Specifications, evidence, governance, AgentOps and delivery factories.",
    transfer: "Autonomy needs policy, budgets, traces and intervention.",
    color: "text-signal-amber",
  },
] as const

function countByModel(key: string) {
  return evolutionRecords.filter((record) => record.model.key === key).length
}

export default async function EvolutionPage({
  searchParams,
}: {
  searchParams: Promise<{ artifact?: string }>
}) {
  const params = await searchParams
  const initialArtifact = Number(params.artifact)

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          {
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/evolution")}#collection`,
            url: absoluteUrl("/evolution"),
            name: "AI Co-Evolution — From CONTINUA to Control Planes",
            description: evolutionDescription,
            isPartOf: { "@id": websiteId },
            about: { "@id": personId },
            author: { "@id": personId },
            inLanguage: "en",
            dateCreated: "2023-01-01",
            dateModified: "2026-10-14",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: evolutionRecords.length,
              itemListElement: evolutionFamilies.map((family, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: family,
                description: familyDescriptions[family],
                additionalProperty: {
                  "@type": "PropertyValue",
                  name: "Recovered artefacts",
                  value: evolutionRecords.filter((record) => record.family === family).length,
                },
              })),
            },
            mentions: [
              "aiactmiddleware",
              "agnosticengine",
              "entropiccore",
              "psycheos",
              "aivendorcompare",
              "llmtrace",
              "brewmatch",
            ].map((slug) => ({
              "@type": "SoftwareApplication",
              url: absoluteUrl(`/systems/${slug}`),
            })),
          },
        ]}
      />
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 72% 32%, hsl(var(--signal-cyan)/0.08), transparent 32%), radial-gradient(circle at 25% 80%, hsl(var(--signal-green)/0.06), transparent 30%)" }}
          aria-hidden="true"
        />
        <div className="relative container max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-signal-green">AI Co-Evolution · Jan 2023 — 14 Oct 2026</p>
              <h1 className="mt-6 text-5xl font-bold leading-[.96] tracking-[-0.055em] text-foreground md:text-7xl">
                From CONTINUA
                <span className="block text-muted-foreground">to control planes.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                I did not suddenly pivot into AI. I began by forcing GPT-3.5 to preserve long-form context. By October 2026, the work had become verifiable AI engineering, agentic team enablement, modernisation factories and deployable interfaces.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                This is a public-safe, October-14-updated reconstruction of that path: not 201 equivalent “products”, but 184 reconstructed historic entries and 17 additional post-July documented milestones spanning methods, experiments, modules, systems and publications with their confidence and maturity left visible.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#story" className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                  Follow the evolution
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a href="#archive" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30">
                  Explore all {evolutionRecords.length}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <EvolutionGrowthCurve />
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {[
              ["43", "months building with AI"],
              [String(evolutionRecords.length), `${evolutionHistoricalCount} historical + ${evolutionAddedCount} later`],
              [String(evolutionConfidenceCounts.Confirmed), "entries classified Confirmed (mixed source standards)"],
              ["65", "recurring technologies and methods"],
            ].map(([value, label]) => (
              <div key={label} className="bg-background p-5 md:p-6">
                <p className="font-mono text-3xl font-bold text-foreground md:text-4xl">{value}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story" aria-labelledby="story-heading" className="container max-w-6xl mx-auto px-4 py-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal-cyan">Five shifts in the work</p>
            <h2 id="story-heading" className="mt-3 text-3xl font-bold text-foreground md:text-5xl">Capability did not arrive. It accumulated.</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Each stage inherited an unresolved problem from the previous one. Context led to state. State led to mechanisms. Mechanisms led to products. Products exposed reliability problems. Reliability demanded governance.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {evolutionEras.map((era) => (
            <article key={era.key} className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
              <div className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: era.color }} />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Stage {era.index}</span>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: era.color }} />
              </div>
              <p className="mt-8 text-[10px] font-mono uppercase tracking-wider" style={{ color: era.color }}>{era.years}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-foreground">{era.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{era.copy}</p>
              <div className="mt-6 flex -space-x-1">
                {era.recordIds.map((id) => {
                  const record = evolutionRecords.find((item) => item.id === id)
                  return record ? (
                    <Link
                      key={id}
                      href={`/evolution?artifact=${id}#archive`}
                      title={record.displayName}
                      className="grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-xs transition-transform hover:z-10 hover:-translate-y-1"
                    >
                      {record.symbols[0]?.icon}
                    </Link>
                  ) : null
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/35">
        <div className="container max-w-6xl mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal-green">The transfer function</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">The current systems are compressed history.</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              The archive matters because it exposes lineage. Governance was not added as a fashionable layer at the end; it emerged after repeated work on state, execution, observability, failure and evidence.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border">
            {lineage.map((item, index) => (
              <div key={item.stage} className="grid gap-4 border-b border-border bg-background p-5 last:border-b-0 md:grid-cols-[70px_1fr_1fr] md:items-center md:p-7">
                <p className={`font-mono text-2xl font-bold ${item.color}`}>{item.stage}</p>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3">
                  <GitBranch className={`mt-0.5 h-4 w-4 flex-none ${item.color}`} />
                  <p className="text-xs leading-relaxed text-foreground">{item.transfer}</p>
                </div>
                {index < lineage.length - 1 && <span className="sr-only">then</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="families-heading" className="container max-w-6xl mx-auto px-4 py-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal-amber">Five public lanes</p>
            <h2 id="families-heading" className="mt-3 text-3xl font-bold text-foreground md:text-5xl">Breadth, without flattening importance.</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Flagship systems remain flagships. Smaller experiments live in a separate lane because they demonstrate range without competing for the same claim.
          </p>
        </div>
        <div className="mt-10">
          <EvolutionFamilyLegend />
        </div>
      </section>

      <section aria-labelledby="dna-heading" className="border-y border-border bg-[#070a0f] text-white">
        <div className="container max-w-6xl mx-auto px-4 py-24">
          <div className="grid gap-6 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#b8ff5a]">Technical DNA</p>
              <h2 id="dna-heading" className="mt-3 text-3xl font-bold text-white md:text-5xl">Not “used AI”. Built across the system.</h2>
            </div>
            <p className="text-sm leading-relaxed text-white/55">
              Counts describe recurring building blocks recovered from the archive. They show where the work repeatedly returned, not proficiency scores or invented dependency telemetry.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
            <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className="flex items-center gap-3">
                <Braces className="h-5 w-5 text-[#22d3ee]" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Stack constellation</p>
                  <p className="text-xs text-white/35">Most recurrent recovered building blocks</p>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {topTechnologies.map(([technology, count], index) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[#22d3ee]/15 bg-[#22d3ee]/[0.045] px-3 py-2 font-mono text-[#c6f7ff]"
                    style={{ fontSize: `${Math.max(10, 15 - index * 0.45)}px` }}
                  >
                    {technology} <span className="text-white/30">×{count}</span>
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-[#b8ff5a]" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Recurring architecture patterns</p>
                  <p className="text-xs text-white/35">Problems the work repeatedly solves</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {recurringPatterns.map(([pattern, count], index) => (
                  <div key={pattern} className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
                    <span className="min-w-0 flex-1 text-xs text-white/70">{pattern}</span>
                    <span className="font-mono text-xs font-bold text-[#b8ff5a]">{count}</span>
                    <span className="h-1 w-12 overflow-hidden rounded-full bg-white/[0.08]">
                      <span className="block h-full rounded-full bg-[#b8ff5a]" style={{ width: `${Math.max(18, 100 - index * 10)}%` }} />
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="models-heading" className="container max-w-6xl mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal-cyan">Probable collaborator eras</p>
          <h2 id="models-heading" className="mt-3 text-3xl font-bold text-foreground md:text-5xl">The models changed. So did the questions.</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            GPT-3.5 is explicitly confirmed for the earliest CONTINUA work. Later labels indicate the model family available during each period unless a recovered artefact named the model. They are context, not project-level telemetry.
          </p>
        </div>

        <div className="graph-scrollbar mt-10 overflow-x-auto pb-3">
          <div className="grid min-w-[1100px] grid-cols-8 overflow-hidden rounded-2xl border border-border bg-border">
            {modelEras.map((model) => (
              <article key={model.key} className="bg-background p-5">
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{model.date}</p>
                <h3 className="mt-6 text-sm font-bold leading-snug text-foreground">{model.name}</h3>
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{model.copy}</p>
                <p className="mt-6 font-mono text-3xl font-bold text-foreground">{countByModel(model.key)}</p>
                <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">records in era</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />
      <EvolutionExplorer initialArtifact={Number.isFinite(initialArtifact) ? initialArtifact : undefined} />

      <section aria-labelledby="method-heading" className="border-t border-border bg-card/40">
        <div className="container max-w-6xl mx-auto px-4 py-24">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <ShieldCheck className="h-7 w-7 text-signal-green" />
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-signal-green">Method before mythology</p>
              <h2 id="method-heading" className="mt-3 text-3xl font-bold text-foreground">The uncertainty is part of the interface.</h2>
            </div>
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                The initial 184 entries retain their recorded historical confidence. The 17 later milestones use a curated source manifest: public repository, preserved HTML, archived document, team account or historical reference. Private identities, client names, exact locations and internal codenames were generalised. Distinct subsystems remain separate when the recovered record shows a separate technical output.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-signal-green/20 bg-signal-green/[0.04] p-4">
                  <p className="font-mono text-2xl font-bold text-signal-green">{evolutionConfidenceCounts.Confirmed}</p>
                  <p className="mt-2 text-xs">Records classified Confirmed under their historical or post-July source criteria; not proof of production or impact.</p>
                </div>
                <div className="rounded-xl border border-signal-cyan/20 bg-signal-cyan/[0.04] p-4">
                  <p className="font-mono text-2xl font-bold text-signal-cyan">{evolutionConfidenceCounts["Strong recall"]}</p>
                  <p className="mt-2 text-xs">Records supported by historical documentation or team accounts, without independently inspectable proof.</p>
                </div>
                <div className="rounded-xl border border-signal-amber/20 bg-signal-amber/[0.04] p-4">
                  <p className="font-mono text-2xl font-bold text-signal-amber">{evolutionConfidenceCounts["Partial reconstruction"]}</p>
                  <p className="mt-2 text-xs">Still partial reconstructions.</p>
                </div>
              </div>
              <p>
                The original 184 historical records retain their prior confidence classifications, some reconstructed from conversations rather than public artifacts. Only the 17 later milestones now use individually specified provenance. A Confirmed tag does not certify functionality, economic impact or production readiness.
              </p>
              <Link href="/writing/building-in-public" className="inline-flex items-center gap-2 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-signal-green">
                Read the reconstruction and evidence protocol
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
