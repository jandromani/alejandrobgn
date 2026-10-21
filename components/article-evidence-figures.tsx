import Image from "next/image"

type EvidenceItem = {
  src: string
  alt: string
  label: string
  title: string
  caption: string
}

type EvidenceGroup = {
  articleSlug: string
  headingId: string
  eyebrow: string
  title: string
  note: string
  items: EvidenceItem[]
}

const groups: EvidenceGroup[] = [
  {
    articleSlug: "governing-agentic-systems",
    headingId: "governance-is-a-control-plane",
    eyebrow: "Existing system evidence",
    title: "The governance surface already exists",
    note: "A real public prototype—not an audited compliance result.",
    items: [{ src: "/projects/aiactmiddleware/live-preview.png", alt: "AI Act Middleware public chat prototype", label: "Real public prototype", title: "AI Act Middleware", caption: "The public interface makes risk classification, controls and review state visible around an AI interaction." }],
  },
  {
    articleSlug: "entropy-problem-llms",
    headingId: "the-omega-experiment",
    eyebrow: "Executable evidence",
    title: "From metaphor to package output",
    note: "A concept preview; the displayed package version and tests have not been reproduced from public source.",
    items: [{ src: "/projects/entropiccore/live-preview.png", alt: "Entropic Core concept preview", label: "Concept preview", title: "Entropic Core · OMEGA", caption: "A proposed reliability model. The displayed version and test signals are not independently inspectable here." }],
  },
  {
    articleSlug: "avoiding-vendor-lock-in",
    headingId: "the-public-product-is-a-perishable-evidence-snapshot",
    eyebrow: "Current product evidence",
    title: "The market view is real—and time-bound",
    note: "A captured interface backed by snapshot data, not a claim of a continuously live oracle.",
    items: [{ src: "/projects/aivendorcompare/live-preview.png", alt: "AI Vendor Compare public interface showing provider comparison data", label: "Real interface · Snapshot data", title: "AI Vendor Compare", caption: "The visible comparison surface demonstrates the product and schema; freshness and source state determine what each claim can support." }],
  },
  {
    articleSlug: "ai-platform-economics",
    headingId: "what-the-connected-systems-can-claim",
    eyebrow: "Three separate proofs",
    title: "Market price, realised trajectory, runtime control",
    note: "Related building blocks—not one integrated production FinOps platform.",
    items: [
      { src: "/projects/aivendorcompare/live-preview.png", alt: "AI Vendor Compare market snapshot", label: "Snapshot data", title: "Market", caption: "Published list-price and capability claims." },
      { src: "/projects/llmtrace/real-trace.png", alt: "LLMTRACE prototype dashboard", label: "Prototype illustration", title: "Runtime", caption: "Illustrative session data from a historical alpha; provider adapters are mocks." },
      { src: "/projects/entropiccore/live-preview.png", alt: "Entropic Core concept preview", label: "Concept preview", title: "Control", caption: "Budgets and interventions as a proposed runtime hypothesis." },
    ],
  },
  {
    articleSlug: "observability-agentic-systems",
    headingId: "a-trace-is-a-causal-graph-not-a-transcript",
    eyebrow: "Prototype boundary",
    title: "A trace needs a verifiable provider integration",
    note: "The historical LLMTRACE adapters wrap mock provider classes.",
    items: [{ src: "/projects/llmtrace/real-trace.png", alt: "LLMTRACE prototype dashboard illustration", label: "Prototype illustration", title: "LLMTRACE", caption: "The interface illustrates session fields; it does not prove telemetry from a real provider SDK." }],
  },
  {
    articleSlug: "building-in-public",
    headingId: "a-concrete-portfolio-evidence-map",
    eyebrow: "Evidence states in practice",
    title: "Different projects deserve different labels",
    note: "Visual polish is separated from data and execution maturity.",
    items: [
      { src: "/projects/brewmatch/live-preview.png", alt: "BrewMatch public product interface", label: "Real product interface", title: "BrewMatch", caption: "A live discovery surface with merchant handoff." },
      { src: "/projects/aivendorcompare/live-preview.png", alt: "AI Vendor Compare interface", label: "Real interface · Snapshot data", title: "AI Vendor Compare", caption: "A real comparison UI whose evidence ages." },
      { src: "/projects/aiactmiddleware/live-preview.png", alt: "AI Act Middleware prototype", label: "Real public prototype", title: "AI Act Middleware", caption: "A governance interaction surface, not legal certification." },
      { src: "/projects/llmtrace/real-trace.png", alt: "LLMTRACE prototype illustration", label: "Prototype illustration", title: "LLMTRACE", caption: "Historical alpha with mock adapters." },
    ],
  },
  {
    articleSlug: "orchestration-patterns",
    headingId: "how-my-own-systems-map-to-these-patterns",
    eyebrow: "Pattern evidence",
    title: "The portfolio proves different parts of the graph",
    note: "Representative workflows and real artefacts—never presented as one deployed multi-agent platform.",
    items: [
      { src: "/projects/aivendorcompare/workflow.webp", alt: "AI Vendor Compare evidence workflow", label: "Representative workflow", title: "Parallel evidence", caption: "Independent provider claims converge through verification." },
      { src: "/projects/llmtrace/workflow.webp", alt: "LLMTRACE proposed instrumentation workflow", label: "Concept workflow", title: "Graph observability", caption: "A proposed path from execution to trace; current adapters are mocks." },
      { src: "/projects/entropiccore/workflow.webp", alt: "Entropic Core checkpoint recovery workflow", label: "Representative runtime view", title: "Recovery", caption: "Checkpoints and interventions preserve control over long trajectories." },
    ],
  },
  {
    articleSlug: "safety-alignment-systems",
    headingId: "psycheos-pressure-testing-model-behaviour",
    eyebrow: "Existing product evidence",
    title: "The behavioural wind tunnel has a public surface",
    note: "Browser-local BYOK evaluation—not clinical diagnosis or a universal alignment score.",
    items: [{ src: "/projects/psycheos/live-preview.png", alt: "PsycheOS browser-local safety evaluation interface", label: "Real public product surface", title: "PsycheOS", caption: "The public interface organises protocols, personas and environments while keeping model access in the browser." }],
  },
]

export function ArticleEvidenceFigure({ articleSlug, headingId }: { articleSlug: string; headingId: string }) {
  const group = groups.find(item => item.articleSlug === articleSlug && item.headingId === headingId)
  if (!group) return null

  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
      <figcaption className="border-b border-border px-5 py-4 sm:flex sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-signal-cyan">{group.eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold text-foreground">{group.title}</h3>
        </div>
        <p className="mt-2 max-w-sm text-[10px] leading-relaxed text-muted-foreground sm:mt-0">{group.note}</p>
      </figcaption>
      <div className={`grid gap-px bg-border ${group.items.length === 1 ? "grid-cols-1" : group.items.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {group.items.map(item => (
          <div key={`${item.title}-${item.label}`} className="min-w-0 bg-background">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#080b10]">
              <Image src={item.src} alt={item.alt} fill sizes={group.items.length === 1 ? "(max-width: 1024px) 100vw, 760px" : "(max-width: 640px) 100vw, 360px"} className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]" />
              <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/75 px-2.5 py-1 text-[8px] font-mono uppercase tracking-wider text-white backdrop-blur">{item.label}</span>
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}
