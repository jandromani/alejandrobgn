"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Bot,
  Cpu,
  Database,
  Radio,
  ShieldCheck,
} from "lucide-react"
import type { SystemWorkflow, WorkflowNode, WorkflowNodeKind } from "@/lib/system-workflows"

const kindMeta: Record<WorkflowNodeKind, { label: string; color: string; className: string; icon: typeof Bot }> = {
  input: {
    label: "Input",
    color: "hsl(var(--signal-cyan))",
    className: "text-signal-cyan border-signal-cyan/35 bg-signal-cyan/10",
    icon: ArrowDownToLine,
  },
  agent: {
    label: "Agent logic",
    color: "hsl(var(--signal-green))",
    className: "text-signal-green border-signal-green/35 bg-signal-green/10",
    icon: Bot,
  },
  control: {
    label: "Control",
    color: "hsl(var(--signal-amber))",
    className: "text-signal-amber border-signal-amber/35 bg-signal-amber/10",
    icon: ShieldCheck,
  },
  model: {
    label: "Model runtime",
    color: "#a78bfa",
    className: "text-violet-300 border-violet-400/35 bg-violet-400/10",
    icon: Cpu,
  },
  store: {
    label: "State / evidence",
    color: "#94a3b8",
    className: "text-slate-300 border-slate-400/35 bg-slate-400/10",
    icon: Database,
  },
  output: {
    label: "Output",
    color: "#f472b6",
    className: "text-pink-300 border-pink-400/35 bg-pink-400/10",
    icon: ArrowUpFromLine,
  },
}

function edgePath(source: WorkflowNode, target: WorkflowNode) {
  const startX = source.x + 76
  const endX = target.x - 76
  const middleX = startX + (endX - startX) / 2
  return `M ${startX} ${source.y} C ${middleX} ${source.y}, ${middleX} ${target.y}, ${endX} ${target.y}`
}

export function RuntimeXRay({ workflow, systemName }: { workflow: SystemWorkflow; systemName: string }) {
  const [activeId, setActiveId] = useState(workflow.nodes[3]?.id ?? workflow.nodes[0].id)
  const nodeMap = useMemo(() => new Map(workflow.nodes.map((item) => [item.id, item])), [workflow.nodes])
  const activeNode = nodeMap.get(activeId) ?? workflow.nodes[0]

  return (
    <section aria-labelledby="runtime-xray-heading" className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-3.5 h-3.5 text-signal-green" aria-hidden="true" />
            <p className="text-[11px] font-mono text-signal-green uppercase tracking-[0.2em]">Runtime X-Ray</p>
          </div>
          <h2 id="runtime-xray-heading" className="text-2xl md:text-3xl font-bold text-foreground">{workflow.title}</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">{workflow.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Workflow legend">
          {(["input", "agent", "control", "model", "store", "output"] as WorkflowNodeKind[]).map((kind) => (
            <span key={kind} className={`inline-flex items-center gap-1.5 px-2 py-1 border rounded-full text-[10px] font-mono uppercase tracking-wider ${kindMeta[kind].className}`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: kindMeta[kind].color }} aria-hidden="true" />
              {kindMeta[kind].label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_80px_hsl(var(--background)/0.55)]">
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-border bg-secondary/70">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-signal-green animate-status-pulse" aria-hidden="true" />
            <span className="text-[11px] font-mono text-foreground uppercase tracking-widest truncate">{systemName} / execution topology</span>
          </div>
          <span className="hidden text-[10px] font-mono text-muted-foreground uppercase tracking-wider flex-shrink-0 sm:inline">Select a node</span>
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider flex-shrink-0 sm:hidden">Swipe to explore →</span>
        </div>

        <div className="overflow-x-auto graph-scrollbar" tabIndex={0} aria-label={`${systemName} representative workflow diagram`}>
          <div className="relative min-w-[980px] h-[440px] bg-grid scanline">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 48% 50%, hsl(var(--signal-green)/0.07), transparent 34%)" }} />

            <svg viewBox="0 0 1000 440" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              <defs>
                <linearGradient id={`xray-edge-${systemName.replace(/\W/g, "-")}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--signal-cyan))" stopOpacity="0.55" />
                  <stop offset="52%" stopColor="hsl(var(--signal-green))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--signal-amber))" stopOpacity="0.55" />
                </linearGradient>
                <filter id={`xray-glow-${systemName.replace(/\W/g, "-")}`} x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {workflow.edges.map((edge, index) => {
                const source = nodeMap.get(edge.from)
                const target = nodeMap.get(edge.to)
                if (!source || !target) return null
                const path = edgePath(source, target)
                const isActive = activeId === edge.from || activeId === edge.to
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <path d={path} fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
                    <path
                      d={path}
                      fill="none"
                      stroke={`url(#xray-edge-${systemName.replace(/\W/g, "-")})`}
                      strokeWidth={isActive ? 2.4 : 1.25}
                      strokeOpacity={isActive ? 1 : 0.42}
                      strokeDasharray="7 11"
                      className="graph-edge-flow"
                      filter={isActive ? `url(#xray-glow-${systemName.replace(/\W/g, "-")})` : undefined}
                    />
                    <circle r={isActive ? 3.5 : 2.5} fill={kindMeta[target.kind].color} className="graph-signal-packet">
                      <animateMotion dur={`${2.8 + (index % 3) * 0.45}s`} begin={`${index * 0.18}s`} repeatCount="indefinite" path={path} />
                    </circle>
                  </g>
                )
              })}
            </svg>

            {workflow.nodes.map((item, index) => {
              const meta = kindMeta[item.kind]
              const Icon = meta.icon
              const isActive = item.id === activeId
              return (
                <div
                  key={item.id}
                  className="group absolute w-[154px] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${item.x / 10}%`, top: `${item.y / 4.4}%` }}
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`Inspect ${item.label}`}
                    onClick={() => setActiveId(item.id)}
                    onMouseEnter={() => setActiveId(item.id)}
                    onFocus={() => setActiveId(item.id)}
                    className={`relative w-full min-h-[76px] rounded-xl p-[1px] text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-green ${isActive ? "scale-[1.04]" : "hover:scale-[1.02]"}`}
                    style={{
                      background: isActive
                        ? `linear-gradient(120deg, ${meta.color}, hsl(var(--foreground)/0.16), ${meta.color})`
                        : "linear-gradient(120deg, hsl(var(--border)), hsl(var(--foreground)/0.12), hsl(var(--border)))",
                      boxShadow: isActive ? `0 0 34px color-mix(in srgb, ${meta.color} 24%, transparent)` : undefined,
                    }}
                  >
                    <span className="flex min-h-[74px] items-center gap-3 rounded-[11px] bg-card/95 px-3 py-2.5 backdrop-blur-sm">
                      <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border ${meta.className}`}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{String(index + 1).padStart(2, "0")} · {item.eyebrow}</span>
                        <span className="mt-1 block text-xs font-semibold leading-tight text-foreground">{item.label}</span>
                      </span>
                    </span>
                  </button>
                  <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-44 -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-center text-[10px] leading-relaxed text-muted-foreground opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    Click to inspect this stage
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-t border-border bg-background/35 p-5 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 lg:gap-10"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider ${kindMeta[activeNode.kind].className}`}>
                    {kindMeta[activeNode.kind].label}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Active stage</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-foreground">{activeNode.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{activeNode.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeNode.technologies.map((technology) => (
                    <span key={technology} className="rounded-md border border-border bg-secondary px-2 py-1 text-[10px] font-mono text-muted-foreground">{technology}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 md:p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-signal-green">Evidence boundary</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{activeNode.proof}</p>
                <p className="mt-4 border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">{workflow.disclosure}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
