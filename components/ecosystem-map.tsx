"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Activity, ArrowRight, Network, Play, Radio, Square } from "lucide-react"
import { getEvidenceLabel, type System } from "@/lib/systems-data"

const positions: Record<string, { x: number; y: number }> = {
  aiactmiddleware: { x: 180, y: 100 },
  psycheos: { x: 500, y: 70 },
  entropiccore: { x: 820, y: 100 },
  aivendorcompare: { x: 875, y: 300 },
  brewmatch: { x: 775, y: 490 },
  llmtrace: { x: 500, y: 520 },
  "aigile-document-intelligence": { x: 225, y: 475 },
  agnosticengine: { x: 125, y: 300 },
}

const categoryMeta: Record<System["category"], { label: string; color: string }> = {
  governance: { label: "Governance", color: "hsl(var(--signal-green))" },
  orchestration: { label: "Orchestration", color: "hsl(var(--signal-cyan))" },
  stability: { label: "Stability", color: "hsl(var(--signal-amber))" },
  safety: { label: "Safety", color: "#f87171" },
  observability: { label: "Observability", color: "#a78bfa" },
  intelligence: { label: "Intelligence", color: "#38bdf8" },
  products: { label: "Applied product", color: "#f472b6" },
  platform: { label: "Platform", color: "#94a3b8" },
}

const categoryThesis: Record<System["category"], string> = {
  governance: "Controls belong in the runtime path, with evidence attached to every consequential decision.",
  orchestration: "Intent should terminate in a useful system action, not in another layer of AI theatre.",
  stability: "Agent autonomy needs measurable operating bounds, recovery paths, and explicit intervention policy.",
  safety: "Safety work becomes credible when scenarios, signals, and review boundaries are inspectable.",
  observability: "If prompts, responses, costs, latency, and failures cannot be traced, the system cannot be operated.",
  intelligence: "Time, provenance, and uncertainty matter as much as the comparison itself.",
  products: "The technical stack only matters when it can survive contact with a real user and a commercial handoff.",
  platform: "Reusable platform decisions are where AI experiments become maintainable systems.",
}

function connectionPath(x: number, y: number) {
  const centerX = 500
  const centerY = 290
  const controlX = centerX + (x - centerX) * 0.5
  return `M ${centerX} ${centerY} C ${controlX} ${centerY}, ${controlX} ${y}, ${x} ${y}`
}

export function EcosystemMap({ portfolioSystems }: { portfolioSystems: System[] }) {
  const graphSystems = useMemo(
    () => portfolioSystems.filter((system) => positions[system.slug]),
    [portfolioSystems],
  )
  const [activeId, setActiveId] = useState(graphSystems[0]?.id ?? "")
  const [isTracing, setIsTracing] = useState(false)
  const activeSystem = graphSystems.find((system) => system.id === activeId) ?? graphSystems[0]

  useEffect(() => {
    if (!isTracing || graphSystems.length === 0) return
    let index = 0
    setActiveId(graphSystems[0].id)
    const interval = window.setInterval(() => {
      index += 1
      if (index >= graphSystems.length) {
        window.clearInterval(interval)
        setIsTracing(false)
        return
      }
      setActiveId(graphSystems[index].id)
    }, 950)
    return () => window.clearInterval(interval)
  }, [isTracing, graphSystems])

  if (!activeSystem) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_100px_hsl(var(--background)/0.65)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-border bg-secondary/70">
        <div className="flex items-center gap-3 min-w-0">
          <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-signal-green/30 bg-signal-green/10 text-signal-green">
            <Network className="h-4 w-4" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-signal-green animate-status-pulse" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-green">AI Systems Graph</p>
            <p className="truncate text-xs text-muted-foreground">Conceptual relationship map · select any system to inspect it</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsTracing((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-mono text-foreground transition-colors hover:border-signal-green/40 hover:bg-signal-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-green"
        >
          {isTracing ? <Square className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
          {isTracing ? "Tracing…" : "Run portfolio trace"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_330px]">
        <div className="relative overflow-x-auto graph-scrollbar border-b xl:border-b-0 xl:border-r border-border" tabIndex={0} aria-label="Interactive portfolio systems graph">
          <div className="pointer-events-none sticky left-0 top-0 z-30 flex w-screen max-w-[calc(100vw-2rem)] justify-end px-4 pt-3 xl:hidden">
            <span className="rounded-full border border-border bg-background/90 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-muted-foreground shadow-sm backdrop-blur">
              Swipe graph to explore →
            </span>
          </div>
          <div className="relative min-w-[820px] h-[560px] bg-grid scanline">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 52%, hsl(var(--signal-green)/0.12), transparent 28%)" }} />

            <svg viewBox="0 0 1000 560" className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
              <defs>
                <linearGradient id="portfolio-edge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--signal-green))" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="hsl(var(--signal-cyan))" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(var(--signal-amber))" stopOpacity="0.75" />
                </linearGradient>
                <filter id="portfolio-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {graphSystems.map((system, index) => {
                const position = positions[system.slug]
                const path = connectionPath(position.x, position.y)
                const active = activeSystem.id === system.id
                return (
                  <g key={system.id}>
                    <path d={path} fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
                    <path
                      d={path}
                      fill="none"
                      stroke="url(#portfolio-edge)"
                      strokeWidth={active ? 2.8 : 1.2}
                      strokeOpacity={active ? 1 : 0.36}
                      strokeDasharray="8 13"
                      className="graph-edge-flow"
                      filter={active ? "url(#portfolio-glow)" : undefined}
                    />
                    <circle r={active ? 4 : 2.6} fill={categoryMeta[system.category].color} className="graph-signal-packet">
                      <animateMotion dur={`${3.1 + (index % 4) * 0.4}s`} begin={`${index * 0.22}s`} repeatCount="indefinite" path={path} />
                    </circle>
                  </g>
                )
              })}
            </svg>

            <div className="absolute left-1/2 top-[52%] z-10 w-[184px] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, hsl(var(--signal-green)), hsl(var(--signal-cyan)), hsl(var(--signal-amber)))", boxShadow: "0 0 70px hsl(var(--signal-green)/0.15)" }}>
              <div className="rounded-[15px] bg-background/95 px-5 py-4 text-center backdrop-blur-md">
                <Radio className="mx-auto h-5 w-5 text-signal-green" aria-hidden="true" />
                <p className="mt-2 text-[9px] font-mono uppercase tracking-[0.22em] text-muted-foreground">Operating thesis</p>
                <p className="mt-1 text-sm font-bold text-foreground">Production AI</p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">Intent · control · runtime · evidence</p>
              </div>
            </div>

            {graphSystems.map((system) => {
              const position = positions[system.slug]
              const active = activeSystem.id === system.id
              const meta = categoryMeta[system.category]
              return (
                <div
                  key={system.id}
                  className="group absolute z-20 w-[146px] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${position.x / 10}%`, top: `${position.y / 5.6}%` }}
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-label={`Inspect ${system.name}`}
                    onClick={() => { setIsTracing(false); setActiveId(system.id) }}
                    onMouseEnter={() => { if (!isTracing) setActiveId(system.id) }}
                    onFocus={() => { if (!isTracing) setActiveId(system.id) }}
                    className={`relative w-full rounded-xl p-[1px] text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-green ${active ? "scale-[1.06]" : "hover:scale-[1.03]"}`}
                    style={{
                      background: active
                        ? `linear-gradient(125deg, ${meta.color}, hsl(var(--foreground)/0.18), ${meta.color})`
                        : "linear-gradient(125deg, hsl(var(--border)), hsl(var(--foreground)/0.12), hsl(var(--border)))",
                      boxShadow: active ? `0 0 36px color-mix(in srgb, ${meta.color} 26%, transparent)` : undefined,
                    }}
                  >
                    <span className="block rounded-[11px] bg-card/95 px-3 py-3 backdrop-blur-sm">
                      <span className="flex items-center justify-between gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} aria-hidden="true" />
                        <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{meta.label}</span>
                      </span>
                      <span className="mt-2 block text-xs font-semibold leading-tight text-foreground">{system.name}</span>
                      <span className="mt-1 block truncate text-[9px] font-mono text-muted-foreground">{system.technologies.slice(0, 2).join(" · ")}</span>
                    </span>
                  </button>
                  <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-40 -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-center text-[10px] text-muted-foreground opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    Inspect stack and evidence
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative min-h-[390px] bg-background/35 p-6">
          <div className="absolute right-5 top-5 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
            <Activity className="h-3 w-3 text-signal-green" aria-hidden="true" />
            Node inspector
          </div>
          <div key={activeSystem.id} className="flex h-full flex-col pt-7 animate-in fade-in slide-in-from-right-2 duration-200">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: categoryMeta[activeSystem.category].color }} aria-hidden="true" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{categoryMeta[activeSystem.category].label}</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-foreground">{activeSystem.name}</h3>
              <p className="mt-1 text-xs font-mono text-muted-foreground">{activeSystem.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{activeSystem.shortDescription}</p>

              <div className="mt-5 rounded-xl border border-border bg-card p-4">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-signal-green">System thesis</p>
                <p className="mt-2 text-xs leading-relaxed text-foreground/85">{categoryThesis[activeSystem.category]}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {activeSystem.technologies.slice(0, 4).map((technology) => (
                  <span key={technology} className="rounded-md border border-border bg-secondary px-2 py-1 text-[10px] font-mono text-muted-foreground">{technology}</span>
                ))}
              </div>

              <div className="mt-auto pt-6">
                {activeSystem.evidence && (
                  <p className="mb-3 text-[10px] font-mono text-muted-foreground">
                    Evidence: <span className="text-foreground">{getEvidenceLabel(activeSystem.evidence)}</span>
                  </p>
                )}
                <Link
                  href={`/systems/${activeSystem.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-green"
                >
                  Inspect system
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
