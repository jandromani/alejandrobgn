import { enterpriseEvidence } from "@/lib/enterprise-evidence"
import { HeroEvidenceFlow } from "@/components/hero-evidence-flow"
import Image from "next/image"
import Link from "next/link"
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Coffee,
  FileSearch,
  Gauge,
  Network,
  Radio,
  Scale,
  ShieldCheck,
  Sparkles,
  Waypoints,
  Zap,
} from "lucide-react"
import { getEvidenceLabel, systems, type System } from "@/lib/systems-data"

type NodePosition = {
  x: number
  y: number
}

const topologyPositions: Record<string, NodePosition> = {
  aiactmiddleware: { x: 50, y: 9 },
  agnosticengine: { x: 18, y: 26 },
  entropiccore: { x: 82, y: 26 },
  psycheos: { x: 12, y: 61 },
  llmtrace: { x: 88, y: 61 },
  aivendorcompare: { x: 22, y: 88 },
  "aigile-document-intelligence": { x: 50, y: 91 },
  brewmatch: { x: 78, y: 88 },
}

const systemIcons: Record<string, typeof Network> = {
  aiactmiddleware: ShieldCheck,
  agnosticengine: Waypoints,
  entropiccore: Zap,
  psycheos: BrainCircuit,
  aivendorcompare: Scale,
  "aigile-document-intelligence": FileSearch,
  llmtrace: Activity,
  brewmatch: Coffee,
}

const systemSignals: Record<System["category"], string> = {
  governance: "bg-signal-green",
  orchestration: "bg-signal-cyan",
  stability: "bg-violet-400",
  safety: "bg-signal-green",
  observability: "bg-signal-cyan",
  intelligence: "bg-signal-green",
  products: "bg-signal-green",
  platform: "bg-slate-400",
}

function evidenceTone(label: string) {
  if (label.startsWith("Real")) {
    return {
      dot: "bg-signal-green",
      text: "text-[#476700] dark:text-signal-green",
      border: "group-hover:border-signal-green/45",
    }
  }
  if (label.includes("Generated") || label.includes("Architecture")) {
    return {
      dot: "bg-signal-cyan",
      text: "text-cyan-700 dark:text-signal-cyan",
      border: "group-hover:border-signal-cyan/45",
    }
  }
  return {
    dot: "bg-signal-amber",
    text: "text-amber-700 dark:text-signal-amber",
    border: "group-hover:border-signal-amber/45",
  }
}

function SystemNode({ system }: { system: System }) {
  const Icon = systemIcons[system.slug] ?? Sparkles
  const position = topologyPositions[system.slug]

  return (
    <Link
      href={`/systems/${system.slug}`}
      aria-label={`Inspect ${system.name}`}
      className="group absolute z-20 w-[184px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card/95 p-3 shadow-[0_14px_40px_hsl(var(--background)/.35)] backdrop-blur-sm transition duration-200 hover:-translate-y-[54%] hover:border-foreground/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <span className="flex items-start gap-2.5">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-border bg-secondary text-foreground transition-colors group-hover:border-foreground/25">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start gap-1.5">
            <span className="text-xs font-semibold leading-tight text-foreground">{system.name}</span>
            <span className={`h-1.5 w-1.5 flex-none rounded-full ${systemSignals[system.category]}`} aria-hidden="true" />
          </span>
          <span className="mt-1 block line-clamp-2 text-xs font-mono leading-[1.45] text-muted-foreground">
            {system.tagline.replaceAll(" · ", " / ")}
          </span>
        </span>
      </span>
    </Link>
  )
}

function MobileSystemNode({ system }: { system: System }) {
  const Icon = systemIcons[system.slug] ?? Sparkles

  return (
    <Link
      href={`/systems/${system.slug}`}
      className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card/75 p-3.5 transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-border bg-secondary">
        <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="truncate text-xs font-semibold text-foreground">{system.name}</span>
          <span className={`h-1.5 w-1.5 flex-none rounded-full ${systemSignals[system.category]}`} aria-hidden="true" />
        </span>
        <span className="mt-1 block truncate text-xs font-mono text-muted-foreground">{system.tagline}</span>
      </span>
    </Link>
  )
}

function EvidenceCard({ slug }: { slug: string }) {
  const system = systems.find((item) => item.slug === slug)!
  const evidence = system.evidence!
  const asset = evidence.assets.overview
  const label = getEvidenceLabel(evidence)
  const tone = evidenceTone(label)

  return (
    <Link
      href={`/systems/${system.slug}`}
      className={`group overflow-hidden rounded-xl border border-border bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tone.border}`}
    >
      <span className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className={`h-2 w-2 flex-none rounded-full ${tone.dot}`} aria-hidden="true" />
        <span className={`truncate text-xs font-mono uppercase tracking-[0.1em] ${tone.text}`}>{label}</span>
      </span>
      <span className="relative block aspect-[16/8.4] overflow-hidden bg-secondary">
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover object-top opacity-80 transition duration-500 group-hover:scale-[1.015] group-hover:opacity-100"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-card via-card/5 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute inset-x-0 bottom-0 block p-4">
          <span className="block text-sm font-semibold text-foreground">{system.name}</span>
          <span className="mt-0.5 block truncate text-xs font-mono text-muted-foreground">{asset.title}</span>
        </span>
      </span>
    </Link>
  )
}

export function HomeOperatingDossier({ mode = "all" }: { mode?: "hero" | "technical" | "all" }) {
  const graphSystems = systems.filter((system) => system.featured && topologyPositions[system.slug])
  const publicCount = systems.filter((system) => Boolean(system.links.live)).length
  const openCount = systems.filter((system) => system.status === "Open Source").length

  return (
    <section aria-labelledby={mode === "technical" ? undefined : "hero-heading"} aria-label={mode === "technical" ? "Systems topology and evidence ledger" : undefined} className="relative overflow-hidden border-b border-border bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)/.07) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 69% 39%, hsl(var(--signal-green)/.065), transparent 24%), radial-gradient(circle at 28% 60%, hsl(var(--signal-green)/.035), transparent 25%)",
        }}
        aria-hidden="true"
      />

      <div className={mode === "hero" ? "relative mx-auto grid max-w-[1536px] grid-cols-1 xl:grid-cols-[minmax(0,53%)_minmax(0,47%)]" : mode === "technical" ? "relative mx-auto grid max-w-[1536px] grid-cols-1" : "relative mx-auto grid min-h-[690px] max-w-[1536px] grid-cols-1 xl:grid-cols-[42%_58%]"}>
        {mode !== "technical" && (
        <div className="relative flex min-w-0 flex-col justify-between border-b border-border px-5 py-10 md:px-10 xl:border-b-0 xl:px-12 xl:py-12">
          <div className="pointer-events-none absolute bottom-0 left-6 top-10 hidden w-px bg-border md:block" aria-hidden="true">
            <span className="absolute left-[-5px] top-[34%] h-px w-5 bg-signal-green" />
            <span className="absolute left-[10px] top-[32.5%] font-mono text-xs text-[#476700] dark:text-signal-green">01</span>
          </div>

          <div className="relative min-w-0 md:pl-12">
            <p className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-[#476700] dark:text-signal-green">
              <span className="flex h-4 w-4 items-center justify-center border border-border bg-card">
                <span className="h-1.5 w-1.5 bg-signal-green" />
              </span>
              Alejandro Baratas · Technical leadership dossier
            </p>
            <p className="mt-6 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              AI Tech Lead · Agentic engineering · Madrid / Remote
            </p>

            <h1
              id="hero-heading"
              className="mt-6 max-w-[680px] text-[clamp(2.65rem,4.5vw,5.1rem)] font-bold leading-[1.01] tracking-[-0.055em] text-foreground"
            >
              Enterprise AI
              <br />
              engineering
              <br />
              <span className="text-[#476700] dark:text-signal-green dark:drop-shadow-[0_0_22px_hsl(var(--signal-green)/.2)]">
                teams can use.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              I turn complex engineering into reviewable delivery. In recent engagements, I helped teams use specialist AI workflows in under a month and built source-linked modernization with scoped technical quality gates.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-3 rounded-md bg-[#90d900] px-6 py-3 text-sm font-semibold text-[#090b0f] transition-colors hover:bg-[#9cec00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See enterprise results
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="/atlas"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-border bg-card/65 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/35 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Explore the evidence atlas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <dl className="relative mt-10 grid grid-cols-2 gap-3 border-t border-border pt-5 md:ml-0">
            {[
              [enterpriseEvidence.deliveryTime.short, "team AI workflow", "activation¹", "text-[#476700] dark:text-signal-green"],
              [enterpriseEvidence.contextReduction.short, "working context", "reduction¹", "text-foreground"],
              [enterpriseEvidence.modernizationGates.short, "scoped quality", "gates green¹", "text-foreground"],
              ["11+", "years in", "engineering", "text-cyan-700 dark:text-signal-cyan"],
            ].map(([value, first, second, color], index) => (
              <div key={value + first} className="rounded-lg border border-border bg-card/35 px-3 py-3">
                <dt className={`font-mono text-3xl font-bold ${color}`}>{value}</dt>
                <dd className="mt-1 text-sm leading-5 text-muted-foreground">
                  {first}
                  <br />
                  {second}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 max-w-xl text-xs leading-6 text-muted-foreground">
            ¹ Self-reported engineering measurements from bounded, anonymized engagements; not independently audited client KPIs, time saved or full functional equivalence. Details and scope are disclosed in the two enterprise case studies below.
          </p>
        </div>
        )}
        {mode === "hero" && <HeroEvidenceFlow />}
        {mode !== "hero" && (
        <div className="relative min-h-[640px] min-w-0 px-5 py-8 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-foreground">Systems topology</p>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-2 text-[#476700] dark:text-signal-green">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-green" />
                {publicCount} public
              </span>
              <span className="flex items-center gap-2 text-cyan-700 dark:text-signal-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-cyan" />
                {openCount} open-source
              </span>
              <span className="hidden items-center gap-2 text-muted-foreground sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                {graphSystems.length} mapped nodes
              </span>
            </div>
          </div>

          <p className="mt-4 rounded-md border border-border bg-card/40 px-3 py-2 text-xs font-mono leading-relaxed text-muted-foreground">
            Conceptual portfolio topology · connections show a shared operating thesis, not runtime dependencies.
          </p>

          <div
            className="relative mt-2 hidden h-[530px] lg:block"
            role="group"
            aria-label={`Conceptual topology of ${graphSystems.length} featured portfolio systems connected to a shared AI operating thesis`}
          >
            <svg viewBox="0 0 1000 600" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="home-topology-edge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--signal-green))" stopOpacity=".56" />
                  <stop offset="55%" stopColor="hsl(var(--signal-cyan))" stopOpacity=".35" />
                  <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity=".18" />
                </linearGradient>
              </defs>
              <g fill="none" stroke="hsl(var(--border))" strokeWidth="1.3">
                <path d="M500 300 C500 220 500 145 500 70" />
                <path d="M500 300 C390 260 270 200 170 150" />
                <path d="M500 300 C610 260 730 200 830 150" />
                <path d="M500 300 C340 310 205 345 88 365" />
                <path d="M500 300 C660 310 795 345 912 365" />
                <path d="M500 300 C390 385 300 470 210 530" />
                <path d="M500 300 C500 390 500 470 500 548" />
                <path d="M500 300 C610 385 700 470 790 530" />
              </g>
              <g fill="none" stroke="url(#home-topology-edge)" strokeWidth="1.2" strokeDasharray="5 9" opacity=".8">
                <path d="M500 300 C500 220 500 145 500 70" />
                <path d="M500 300 C390 260 270 200 170 150" />
                <path d="M500 300 C610 260 730 200 830 150" />
                <path d="M500 300 C340 310 205 345 88 365" />
                <path d="M500 300 C660 310 795 345 912 365" />
                <path d="M500 300 C390 385 300 470 210 530" />
                <path d="M500 300 C500 390 500 470 500 548" />
                <path d="M500 300 C610 385 700 470 790 530" />
              </g>
              <g fill="hsl(var(--foreground))" opacity=".35">
                <rect x="496" y="296" width="8" height="8" />
              </g>
            </svg>

            <div className="absolute left-1/2 top-1/2 z-10 w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-px"
              style={{ background: "linear-gradient(135deg, hsl(var(--signal-green)), hsl(var(--signal-cyan)), hsl(var(--border)))" }}>
              <div className="rounded-[15px] bg-background/95 px-5 py-4 text-center backdrop-blur">
                <Radio className="mx-auto h-5 w-5 text-[#476700] dark:text-signal-green" aria-hidden="true" />
                <p className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Shared operating thesis</p>
                <p className="mt-1 text-sm font-bold text-foreground">Production AI</p>
                <p className="mt-1 text-xs font-mono leading-relaxed text-muted-foreground">Intent · control · runtime · evidence</p>
              </div>
            </div>

            {graphSystems.map((system) => <SystemNode key={system.id} system={system} />)}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            {graphSystems.map((system) => <MobileSystemNode key={system.id} system={system} />)}
          </div>
        </div>
        )}
      </div>

      {mode !== "hero" && (
      <div id="evidence-ledger" className="relative scroll-mt-20 border-t border-border bg-card/20">
        <div className="mx-auto max-w-[1536px] px-5 py-7 md:px-9">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Gauge className="h-4 w-4 flex-none text-[#476700] dark:text-signal-green" aria-hidden="true" />
              <h2 className="text-xs font-mono uppercase tracking-[0.14em] text-foreground">Evidence ledger</h2>
              <span className="hidden text-xs font-mono text-muted-foreground md:inline">
                Real interfaces · real traces · representative outputs
              </span>
            </div>
            <Link href="/systems" className="inline-flex items-center gap-2 text-xs font-mono text-[#476700] hover:text-foreground dark:text-signal-green">
              View all evidence
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <EvidenceCard slug="aiactmiddleware" />
            <EvidenceCard slug="llmtrace" />
            <EvidenceCard slug="entropiccore" />
            <EvidenceCard slug="brewmatch" />
          </div>
        </div>
      </div>
      )}
    </section>
  )
}
