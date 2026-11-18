"use client"

import { useState } from "react"
import Link from "next/link"
import { Activity, ArrowRight, Bot, CircleDollarSign, Compass, Gauge, GitBranch, ShieldCheck, Workflow } from "lucide-react"

const capabilities = [
  {
    id: "orchestration",
    label: "01 · Orchestration",
    title: "Agnostic Engine",
    slug: "agnosticengine",
    status: "Product-discovery prototype",
    evidence: "A focused commerce workflow from shopper intent to catalog handoff.",
    boundary: "An applied product prototype—not a general-purpose enterprise agent platform.",
    stack: ["Next.js", "Shopify", "WooCommerce"],
    icon: Workflow,
    tone: "cyan",
  },
  {
    id: "evaluation",
    label: "02 · Evaluation",
    title: "EvalYourAI",
    slug: "evalyourai",
    status: "Public browser-local product",
    evidence: "A published run tested 14 models with 18 social-engineering protocols, repeated five times: 1,260 attacks.",
    boundary: "Preliminary, model-judged and not human-calibrated. It is not an agent/tool-use evaluation or a safety ranking.",
    stack: ["Browser runtime", "OpenRouter BYOK", "Node.js CLI"],
    icon: Gauge,
    tone: "green",
  },
  {
    id: "governance",
    label: "03 · Governance",
    title: "AI Act Middleware",
    slug: "aiactmiddleware",
    status: "Public prototype",
    evidence: "A public interaction surface explores AI Act-inspired controls and review states.",
    boundary: "Illustrative prototype—not legal advice, an audit ledger or a compliance certification.",
    stack: ["TypeScript", "React", "Vercel Functions"],
    icon: ShieldCheck,
    tone: "green",
  },
  {
    id: "observability",
    label: "04 · Observability",
    title: "LLMTRACE",
    slug: "llmtrace",
    status: "Historical open-source alpha",
    evidence: "A local tracing interface for model calls, latency, tokens and cost.",
    boundary: "The published provider adapters wrap mocks; production-provider telemetry is not demonstrated.",
    stack: ["Python", "Flask", "SQLite"],
    icon: Activity,
    tone: "cyan",
  },
  {
    id: "reliability",
    label: "05 · Reliability",
    title: "Entropic Core",
    slug: "entropiccore",
    status: "Research concept",
    evidence: "A design exploration of agent budgets, state drift, checkpoints and bounded intervention.",
    boundary: "The package's source and test claims are not independently verified; no production efficacy is claimed.",
    stack: ["Python", "asyncio", "runtime controls"],
    icon: GitBranch,
    tone: "amber",
  },
  {
    id: "economics",
    label: "06 · Economics",
    title: "AI Vendor Compare",
    slug: "aivendorcompare",
    status: "Real interface · Snapshot data",
    evidence: "A provider-pricing and claims comparison with visible source provenance and freshness state.",
    boundary: "Snapshot last verified 30 June 2026; it may be materially stale and is not live market data.",
    stack: ["Next.js", "Python", "Versioned snapshots"],
    icon: CircleDollarSign,
    tone: "amber",
  },
] as const

const mapPositions = [
  { x: 170, y: 90 }, { x: 500, y: 90 }, { x: 830, y: 90 },
  { x: 170, y: 530 }, { x: 500, y: 530 }, { x: 830, y: 530 },
]

const paths = [
  "M500 310 C390 250 280 155 170 90",
  "M500 310 C500 230 500 150 500 90",
  "M500 310 C610 250 720 155 830 90",
  "M500 310 C390 370 280 465 170 530",
  "M500 310 C500 390 500 470 500 530",
  "M500 310 C610 370 720 465 830 530",
]

const toneClasses = {
  green: "border-signal-green/35 text-signal-green",
  cyan: "border-signal-cyan/35 text-signal-cyan",
  amber: "border-signal-amber/35 text-amber-700 dark:text-amber-300",
}

export function AgenticCapabilityMap() {
  const [activeId, setActiveId] = useState<string>(capabilities[1].id)
  const active = capabilities.find((item) => item.id === activeId) ?? capabilities[1]

  return (
    <section aria-labelledby="capability-map-title" className="border-b border-border bg-card/15">
      <div className="container mx-auto max-w-7xl px-4 pb-14 pt-20 md:pb-18 md:pt-24">
        <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[#476700] dark:text-signal-green">01 / Agentic systems practice</p>
          <h2 id="capability-map-title" className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-5xl">One practice. Multiple systems. Different evidence.</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">I work across the agent lifecycle—from orchestration and evaluation to governance, observability, reliability and economics. Each node is a separate project or example; this map does not imply one integrated platform.</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background shadow-[0_28px_90px_hsl(var(--background)/.35)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-signal-green/30 bg-signal-green/10 text-signal-green"><Bot className="h-4 w-4" aria-hidden="true" /></span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.17em] text-muted-foreground">Capability map</p>
                <p className="text-sm font-semibold text-foreground">Agentic systems, end to end</p>
              </div>
            </div>
            <p className="max-w-xl text-xs leading-5 text-muted-foreground">Select a node to inspect its work, evidence and limits. Connections show related capabilities, not live integrations.</p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_310px]">
            <div className="min-w-0 border-b border-border p-4 lg:border-b-0 lg:border-r lg:p-5">
              <div className="relative hidden aspect-[1.65/1] min-h-[500px] overflow-hidden rounded-xl border border-border/70 bg-card/35 lg:block" role="group" aria-label="Interactive agentic systems capability map">
                <div className="pointer-events-none absolute inset-0 opacity-35" style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)/.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(var(--signal-green)/.08), transparent 40%)" }} aria-hidden="true" />
                <svg viewBox="0 0 1000 620" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="capability-link" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--signal-green))" stopOpacity=".48" />
                      <stop offset="100%" stopColor="hsl(var(--signal-cyan))" stopOpacity=".18" />
                    </linearGradient>
                  </defs>
                  {paths.map((path, index) => <g key={path}>
                    <path d={path} fill="none" stroke="hsl(var(--border))" strokeWidth="5" opacity=".18" />
                    <path d={path} fill="none" stroke="url(#capability-link)" strokeWidth={activeId === capabilities[index].id ? "2.2" : "1.35"} strokeDasharray="5 8" />
                  </g>)}
                  {mapPositions.map((position, index) => <circle key={capabilities[index].id} cx={position.x} cy={position.y} r={activeId === capabilities[index].id ? 5 : 3} fill={activeId === capabilities[index].id ? "hsl(var(--signal-green))" : "hsl(var(--muted-foreground))"} />)}
                  <circle cx="500" cy="310" r="8" fill="hsl(var(--signal-green))" opacity=".7" />
                  <circle cx="500" cy="310" r="20" fill="none" stroke="hsl(var(--signal-green))" strokeOpacity=".2" />
                </svg>

                {capabilities.map((item, index) => {
                  const Icon = item.icon
                  const position = mapPositions[index]
                  const selected = activeId === item.id
                  return <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(item.id)}
                    onFocus={() => setActiveId(item.id)}
                    className={`absolute z-10 w-[min(225px,28%)] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-card/95 p-3 text-left shadow-lg backdrop-blur-sm transition duration-200 hover:-translate-y-[54%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-green ${selected ? `${toneClasses[item.tone]} ring-1 ring-current/25 shadow-[0_0_34px_hsl(var(--signal-green)/.1)]` : "border-border text-foreground hover:border-foreground/35"}`}
                    style={{ left: `${position.x / 10}%`, top: `${position.y / 6.2}%` }}
                  >
                    <span className="flex items-start gap-2.5">
                      <span className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg border bg-background ${toneClasses[item.tone]}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[9px] uppercase tracking-[.1em] text-muted-foreground">{item.label}</span>
                        <span className="mt-1 block text-xs font-semibold leading-5 text-foreground">{item.title}</span>
                        <span className="mt-1 block truncate text-[10px] leading-4 text-muted-foreground">{item.status}</span>
                      </span>
                    </span>
                  </button>
                })}

                <div className="pointer-events-none absolute left-1/2 top-1/2 z-[5] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-signal-green/25 bg-background/95 px-4 py-4 text-center shadow-[0_18px_55px_hsl(var(--background)/.75)] backdrop-blur">
                  <Compass className="mx-auto h-5 w-5 text-signal-green" aria-hidden="true" />
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">The discipline</p>
                  <p className="mt-1 text-sm font-bold text-foreground">Agentic systems</p>
                  <p className="mt-1 text-[10px] leading-4 text-muted-foreground">Design · build · evaluate · operate</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:hidden">
                {capabilities.map((item) => {
                  const Icon = item.icon
                  const selected = activeId === item.id
                  return <button key={item.id} type="button" aria-pressed={selected} onClick={() => setActiveId(item.id)} className={`rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-green ${selected ? "border-signal-green/45 bg-signal-green/5" : "border-border bg-card/60"}`}>
                    <span className="flex items-center gap-2.5"><Icon className={`h-4 w-4 ${toneClasses[item.tone].split(" ")[1]}`} aria-hidden="true" /><span><span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{item.label}</span><span className="mt-1 block text-sm font-semibold text-foreground">{item.title}</span></span></span>
                  </button>
                })}
              </div>
            </div>

            <aside key={active.id} aria-live="polite" className="flex min-w-0 flex-col p-5 md:p-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${active.tone === "green" ? "bg-signal-green" : active.tone === "cyan" ? "bg-signal-cyan" : "bg-signal-amber"}`} aria-hidden="true" />
                Evidence inspector
              </div>
              <p className="mt-7 font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">{active.label}</p>
              <h3 className="mt-2 text-2xl font-bold leading-tight text-foreground">{active.title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{active.status}</p>

              <div className="mt-6 border-t border-border pt-5">
                <p className="font-mono text-[9px] uppercase tracking-[.14em] text-signal-green">What the artifact shows</p>
                <p className="mt-2 text-sm leading-6 text-foreground/90">{active.evidence}</p>
              </div>
              <div className="mt-5 border-t border-border pt-5">
                <p className="font-mono text-[9px] uppercase tracking-[.14em] text-amber-700 dark:text-amber-300">Boundary</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{active.boundary}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {active.stack.map((technology) => <span key={technology} className="rounded-md border border-border bg-secondary px-2 py-1 text-[9px] font-mono text-muted-foreground">{technology}</span>)}
              </div>
              <Link href={`/systems/${active.slug}`} className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-green">
                Inspect evidence and workflow <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
