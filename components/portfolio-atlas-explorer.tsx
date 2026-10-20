"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Network, RotateCcw } from "lucide-react"
import type { PortfolioEdge, PortfolioKind, PortfolioNode } from "@/lib/portfolio-graph"

type Props = { nodes: PortfolioNode[]; edges: PortfolioEdge[] }
const groups: { id: PortfolioKind | "all"; name: string }[] = [
  { id: "all", name: "All" },
  { id: "case", name: "Case studies" },
  { id: "system", name: "Systems" },
  { id: "lab", name: "Labs" },
  { id: "writing", name: "Writing" },
  { id: "publication", name: "Editorial" },
  { id: "index", name: "Context" },
]
const tint: Record<PortfolioKind, string> = {
  case: "#b9e462", system: "#60c7d9", lab: "#f2b976",
  writing: "#bb9deb", publication: "#ef97a5", index: "#9aa9b9",
}
const centers: Record<PortfolioKind, { x: number; y: number; rx: number; ry: number }> = {
  case: { x: 185, y: 205, rx: 93, ry: 88 },
  system: { x: 525, y: 210, rx: 210, ry: 127 },
  lab: { x: 868, y: 340, rx: 148, ry: 169 },
  writing: { x: 452, y: 517, rx: 208, ry: 102 },
  publication: { x: 105, y: 487, rx: 1, ry: 1 },
  index: { x: 135, y: 607, rx: 98, ry: 46 },
}
export function PortfolioAtlasExplorer({ nodes, edges }: Props) {
  const [focus, setFocus] = useState("case:cybersecurity-ai-engineering")
  const [filter, setFilter] = useState<PortfolioKind | "all">("all")
  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>()
    for (const kind of Object.keys(centers) as PortfolioKind[]) {
      const members = nodes.filter((node) => node.kind === kind)
      const { x, y, rx, ry } = centers[kind]
      members.forEach((node, i) => {
        const a = -Math.PI / 2 + i * 2 * Math.PI / Math.max(1, members.length)
        map.set(node.id, { x: x + (members.length === 1 ? 0 : rx * Math.cos(a)), y: y + (members.length === 1 ? 0 : ry * Math.sin(a)) })
      })
    }
    return map
  }, [nodes])
  const current = nodes.find((node) => node.id === focus) ?? nodes[0]
  const related = edges
    .filter((edge) => edge.from === current.id || edge.to === current.id)
    .map((edge) => ({
      node: nodes.find((node) => node.id === (edge.from === current.id ? edge.to : edge.from)),
      why: edge.why, relation: edge.relation,
    }))
    .filter((row): row is { node: PortfolioNode; why: string; relation: PortfolioEdge["relation"] } => Boolean(row.node))
  const visible = new Set(nodes.filter((n) => filter === "all" || n.kind === filter || n.id === current.id).map((n) => n.id))
  const connected = new Set(related.map((r) => r.node.id))

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.7fr)]">
      <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-[#0a1018]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <span className="inline-flex items-center gap-2 font-mono text-xs text-white/75"><Network className="h-4 w-4" /> EDITORIAL RELATIONSHIPS / NOT LIVE SYSTEM DEPENDENCIES</span>
          <button type="button" onClick={() => {setFilter("all");setFocus("case:cybersecurity-ai-engineering")}}
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
        <div className="flex flex-wrap gap-2 border-b border-white/10 px-4 py-3" aria-label="Filter portfolio graph by content type">
          {groups.map((group) => (
            <button type="button" key={group.id} aria-pressed={filter === group.id} onClick={() => setFilter(group.id)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-white ${filter === group.id ? "border-[#b9e462] bg-[#b9e462] text-[#111b13]" : "border-white/20 text-white/75 hover:border-white/50"}`}>
              {group.name}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto" role="region" aria-label="Navigable map of portfolio relationships" tabIndex={0}>
          <svg viewBox="0 0 1100 700" role="img" aria-label={`Graph with ${nodes.length} portfolio entries and ${edges.length} documented editorial relationships. Choose a node to inspect its links.`}
            className="block min-w-[700px] w-full" style={{ background:"radial-gradient(circle at 52% 40%, #142536, #0a1018 65%)" }}>
            <defs>
              <pattern id="atlas-dots" width="27" height="27" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#314352"/></pattern>
            </defs>
            <rect width="1100" height="700" fill="url(#atlas-dots)"/>
            {edges.map((e, i) => {
              if (!visible.has(e.from) || !visible.has(e.to)) return null
              const p = positions.get(e.from), q = positions.get(e.to)
              if (!p || !q) return null
              const active = e.from === current.id || e.to === current.id
              return <path key={i} d={`M${p.x} ${p.y} Q550 350 ${q.x} ${q.y}`}
                fill="none" stroke={active ? "#b9e462" : "#65829b"} strokeWidth={active ? 2.5 : 0.8}
                strokeOpacity={active ? 0.9 : 0.12} strokeDasharray={e.relation === "theme" ? "4 5" : undefined} />
            })}
            {nodes.filter((n) => visible.has(n.id)).map((n) => {
              const p = positions.get(n.id)
              if (!p) return null
              const active = n.id === current.id, adjacent = connected.has(n.id)
              return <g key={n.id} transform={`translate(${p.x} ${p.y})`} role="button" tabIndex={0}
                aria-label={`Select ${n.title}`} aria-pressed={active}
                onClick={() => setFocus(n.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") {e.preventDefault();setFocus(n.id)} }}
                className="cursor-pointer outline-none focus-visible:opacity-70">
                {active && <circle r="20" fill="none" stroke="#b9e462" strokeWidth="1.5" strokeDasharray="3 3"/>}
                <circle r={active ? 12 : adjacent ? 9 : 6.5} fill={tint[n.kind]} stroke="#111a25" strokeWidth="3" />
                <circle r="17" fill="transparent"/>
                {(active || adjacent || n.kind === "case") && <text x="0" y="-22" textAnchor="middle" fill={active ? "#fff" : "#cad7e4"}
                  fontSize="10.5" fontWeight={active ? 700 : 500} style={{pointerEvents:"none"}}>
                  {n.title.length > 24 ? n.title.slice(0,23) + "…" : n.title}
                </text>}
              </g>
            })}
            <text x="32" y="35" fill="#a9bbcf" fontSize="12" fontFamily="monospace">CHOOSE NODES · FOLLOW CONTEXTUAL EDGES</text>
          </svg>
        </div>
        <p className="px-4 py-3 text-xs leading-5 text-white/55">
          Solid and dashed links encode editorial relationships. Every selected entry opens a real route on this domain. Nothing here claims runtime data integration.
        </p>
      </div>
      <aside className="rounded-2xl border border-border bg-card p-5 md:p-7" aria-live="polite">
        <p className="font-mono text-xs uppercase tracking-widest text-[#587f00] dark:text-signal-green">Selected evidence · {current.kind}</p>
        <h2 className="mt-4 text-2xl font-semibold leading-tight">{current.title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{current.description}</p>
        <Link href={current.href} className="mt-5 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-3 text-sm font-semibold text-background">
          Open source page <ArrowUpRight className="h-4 w-4"/>
        </Link>
        <h3 className="mt-8 border-t border-border pt-5 text-sm font-semibold">Contextual connections ({related.length})</h3>
        <div className="mt-3 max-h-[370px] space-y-2 overflow-y-auto">
          {related.map(({ node, why, relation }) => (
            <div key={node.id} className="rounded-md border border-border p-3">
              <button type="button" className="text-left text-sm font-semibold text-foreground hover:underline focus-visible:underline" onClick={() => setFocus(node.id)}>
                {node.title}
              </button>
              <p className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">{node.kind} / {relation}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{why}</p>
              <Link href={node.href} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-4">Visit page <ArrowUpRight className="h-3 w-3"/></Link>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
