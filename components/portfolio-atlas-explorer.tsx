"use client"

import { useEffect, useMemo, useState } from "react"
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
  const [query, setQuery] = useState("")
  // URL query state opens a selected node without creating a second canonical page.
  useEffect(() => {
    const restore = () => {
      const id = new URLSearchParams(window.location.search).get("node")
      if (id && nodes.some(node => node.id === id)) setFocus(id)
    }
    restore()
    window.addEventListener("popstate", restore)
    return () => window.removeEventListener("popstate", restore)
  }, [nodes])
  const selectNode = (id: string) => {
    setFocus(id)
    const url = new URL(window.location.href)
    url.searchParams.set("node", id)
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash)
  }
  const reset = () => {
    setFocus("case:cybersecurity-ai-engineering")
    setFilter("all")
    setQuery("")
    const url = new URL(window.location.href)
    url.searchParams.delete("node")
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash)
  }
  const matches = nodes.filter(node =>
    (filter === "all" || node.kind === filter) &&
    (query.trim().length === 0 || [node.title,node.description,node.kind].join(" ").toLowerCase().includes(query.trim().toLowerCase()))
  )
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
  const visible = new Set([...matches.map(n => n.id), current.id])
  const connected = new Set(related.map((r) => r.node.id))

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.7fr)]">
      <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-[#0a1018]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <span className="inline-flex items-center gap-2 font-mono text-xs text-white/75"><Network className="h-4 w-4" /> EDITORIAL RELATIONSHIPS / NOT LIVE SYSTEM DEPENDENCIES</span>
          <button type="button" onClick={reset}
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
        <div className="border-b border-white/10 px-4 py-4">
          <label htmlFor="atlas-search" className="mb-2 block text-sm font-semibold text-white">Find an artifact or topic</label>
          <input id="atlas-search" type="search" value={query} onChange={event => setQuery(event.target.value)}
            placeholder="Search cases, systems, technical writing…"
            className="min-h-11 w-full rounded-lg border border-white/30 bg-[#162836] px-3 text-base text-white placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-[#b9e462]" />
          <p className="mt-2 text-xs text-white/75" role="status">{matches.length} matching entries · {nodes.length} total</p>
          {query.trim() !== "" && <div className="mt-3 max-h-48 overflow-y-auto" aria-label="Atlas search results">
            {matches.slice(0,12).map(node => <button type="button" key={node.id} onClick={() => selectNode(node.id)}
              className="block w-full rounded-md px-3 py-2 text-left text-sm text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white">
              <span className="font-semibold">{node.title}</span><span className="ml-2 text-xs text-white/65">/ {node.kind}</span>
            </button>)}
            {matches.length === 0 && <p className="py-3 text-sm text-white/80">No matches. Clear the search or choose All.</p>}
          </div>}
        </div>
        <div className="p-4 lg:hidden">
          <label htmlFor="atlas-mobile-node" className="mb-2 block text-sm font-semibold text-white">
            Browse a portfolio entry without the graph
          </label>
          <select id="atlas-mobile-node" value={focus} onChange={(event) => selectNode(event.target.value)}
            className="min-h-12 w-full rounded-md border border-white/30 bg-[#162836] px-3 text-base text-white focus-visible:ring-2 focus-visible:ring-[#b9e462]">
            {nodes.filter((node) => matches.some(item => item.id === node.id) || node.id === focus).map((node) =>
              <option key={node.id} value={node.id}>{node.kind} / {node.title}</option>
            )}
          </select>
          <p className="mt-3 text-sm leading-6 text-white/75">Select an entry to view its connections and open the real source page below.</p>
        </div>
        <div className="hidden overflow-x-auto lg:block" role="region" aria-label="Navigable map of portfolio relationships" tabIndex={0}>
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
                onClick={() => selectNode(n.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") {e.preventDefault();selectNode(n.id)} }}
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
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Selected evidence · {current.kind}</p>
        <h2 className="mt-4 text-2xl font-semibold leading-tight">{current.title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{current.description}</p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Editorial relationship legend">
          {(["method","evidence","context","theme"] as const).map(tag => <span key={tag} className="rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground">{tag}</span>)}
        </div>
        <a href={`/atlas?node=${encodeURIComponent(current.id)}#map`} className="mt-4 block text-sm font-semibold underline underline-offset-4">Permalink to this entry</a>
        <Link href={current.href} className="mt-5 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-3 text-sm font-semibold text-background">
          Open source page <ArrowUpRight className="h-4 w-4"/>
        </Link>
        <h3 className="mt-8 border-t border-border pt-5 text-sm font-semibold">Contextual connections ({related.length})</h3>
        <div className="mt-3 max-h-[370px] space-y-2 overflow-y-auto">
          {related.map(({ node, why, relation }) => (
            <div key={node.id} className="rounded-md border border-border p-3">
              <button type="button" className="text-left text-sm font-semibold text-foreground hover:underline focus-visible:underline" onClick={() => selectNode(node.id)}>
                {node.title}
              </button>
              <p className="mt-1 font-mono text-xs uppercase text-muted-foreground">{node.kind} / {relation}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{why}</p>
              <Link href={node.href} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-4">Visit page <ArrowUpRight className="h-3 w-3"/></Link>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
