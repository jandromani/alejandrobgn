"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronRight, Copy, Search, Sparkles, X } from "lucide-react"
import {
  evolutionFamilies,
  evolutionRecords,
  familyDescriptions,
  yearColor,
  type EvolutionConfidence,
  type EvolutionFamily,
  type EvolutionRecord,
} from "@/lib/evolution"

const familyColor: Record<EvolutionFamily, string> = {
  Foundations: "#22d3ee",
  "Products & Platforms": "#a78bfa",
  "Labs & Research": "#fb7185",
  "Agentic Infrastructure": "#b8ff5a",
  "Applied AI Side Quests": "#fbbf24",
}

const confidenceClass: Record<EvolutionConfidence, string> = {
  Confirmed: "border-signal-green/25 bg-signal-green/[0.06] text-signal-green",
  "Strong recall": "border-signal-cyan/25 bg-signal-cyan/[0.06] text-signal-cyan",
  "Partial reconstruction": "border-signal-amber/25 bg-signal-amber/[0.06] text-signal-amber",
}

type Node = {
  record: EvolutionRecord
  x: number
  y: number
  radius: number
}

function hash(value: number) {
  const result = Math.sin(value * 9283.173) * 43758.5453
  return result - Math.floor(result)
}

const constellationNodes: Node[] = evolutionRecords.map((record) => {
  const familyIndex = evolutionFamilies.indexOf(record.family)
  const yearIndex = record.year - 2023
  return {
    record,
    x: Math.round((105 + familyIndex * 197 + (hash(record.id * 7) - 0.5) * 118) * 1000) / 1000,
    y: Math.round((102 + yearIndex * 82 + (hash(record.id * 13) - 0.5) * 58) * 1000) / 1000,
    radius: 2.8 + Math.min(record.importance, 4) * 1.25,
  }
})

function normalise(value: string) {
  return value.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

function recordSearchText(record: EvolutionRecord) {
  return normalise([
    record.displayName,
    record.description,
    record.category,
    record.type,
    record.phase,
    record.stack,
    record.output,
    record.techTags.join(" "),
    record.patterns.join(" "),
    record.roles.join(" "),
  ].join(" "))
}

const recordSearchIndex = new Map(evolutionRecords.map((record) => [record.id, recordSearchText(record)]))

function Constellation({
  visibleIds,
  onOpen,
}: {
  visibleIds: Set<number>
  onOpen: (record: EvolutionRecord) => void
}) {
  const [hovered, setHovered] = useState<Node | null>(null)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-[#070a0f]">
      <div className="absolute inset-0 bg-grid opacity-15" aria-hidden="true" />
      <div className="relative flex flex-col gap-2 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-signal-green">Project constellation</p>
          <p className="mt-1 text-xs text-white/50">Family on the x-axis · year on the y-axis · one node per reconstructed artefact</p>
        </div>
        <div className="flex flex-wrap gap-3 text-[10px] font-mono text-white/45">
          {[2023, 2024, 2025, 2026].map((year) => (
            <span key={year} className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: yearColor[year] }} />
              {year}
            </span>
          ))}
        </div>
      </div>

      <div tabIndex={0} role="region" aria-label="Scrollable project constellation" className="relative graph-scrollbar overflow-x-auto">
        <svg
          viewBox="0 0 1000 430"
          className="min-w-[820px] w-full"
          role="img"
          aria-label="Visual constellation of 184 artefacts grouped into five technical families and four years. Use the accessible archive below to open any record."
          onPointerLeave={() => setHovered(null)}
        >
          {[2023, 2024, 2025, 2026].map((year, index) => (
            <g key={year}>
              <line x1="45" x2="990" y1={102 + index * 82} y2={102 + index * 82} stroke="white" strokeOpacity=".065" />
              <text x="14" y={106 + index * 82} fill="white" opacity=".34" className="font-mono text-[10px]">{year}</text>
            </g>
          ))}
          {evolutionFamilies.map((family, index) => (
            <g key={family}>
              <line x1={105 + index * 197} x2={105 + index * 197} y1="62" y2="394" stroke={familyColor[family]} strokeOpacity=".09" />
              <text
                x={105 + index * 197}
                y="30"
                fill={familyColor[family]}
                textAnchor="middle"
                className="font-mono text-[10px] font-bold"
              >
                {family.toUpperCase()}
              </text>
            </g>
          ))}
          {constellationNodes.map((node) => {
            const visible = visibleIds.has(node.record.id)
            return (
              <circle
                key={node.record.id}
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill={yearColor[node.record.year]}
                opacity={visible ? 0.82 : 0.06}
                stroke={visible && node.record.importance > 1 ? "white" : "transparent"}
                strokeOpacity=".45"
                className={visible ? "cursor-pointer transition-opacity hover:opacity-100" : "transition-opacity"}
                onPointerEnter={() => visible && setHovered(node)}
                onClick={() => visible && onOpen(node.record)}
              />
            )
          })}
          {hovered && (
            <g transform={`translate(${Math.min(hovered.x + 12, 720)} ${Math.max(hovered.y - 52, 42)})`} pointerEvents="none">
              <rect width="250" height="54" rx="8" fill="#11151c" stroke="white" strokeOpacity=".18" />
              <text x="12" y="20" fill="white" className="font-mono text-[10px] font-bold">
                {hovered.record.displayName.length > 35 ? `${hovered.record.displayName.slice(0, 35)}…` : hovered.record.displayName}
              </text>
              <text x="12" y="39" fill="white" opacity=".48" className="font-mono text-[9px]">
                {hovered.record.year} · {hovered.record.family}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

function ScoreDots({ score, color = "bg-signal-amber" }: { score: number; color?: string }) {
  return (
    <span className="mt-3 flex gap-1" aria-label={`${score} out of 5`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} className={`h-1 flex-1 rounded-full ${value <= score ? color : "bg-border"}`} />
      ))}
    </span>
  )
}

function ProjectDrawer({
  record,
  onClose,
}: {
  record: EvolutionRecord
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose])

  async function copyLink() {
    const url = new URL(window.location.href)
    url.searchParams.set("artifact", String(record.id))
    await navigator.clipboard.writeText(url.toString())
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-labelledby="artifact-title">
      <button className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label="Close artefact details" />
      <article className="absolute inset-y-0 right-0 w-full max-w-3xl overflow-y-auto border-l border-border bg-background shadow-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md md:px-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Public-safe record · {String(record.id).padStart(3, "0")} / {evolutionRecords.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-signal-green" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy link"}
            </button>
            <button
              ref={closeRef}
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="px-5 py-10 md:px-10 md:py-14">
          <div className="flex flex-wrap gap-2">
            {record.symbols.map((symbol) => (
              <span key={symbol.label} title={symbol.label} className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-base">
                {symbol.icon}
              </span>
            ))}
          </div>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-signal-cyan">
            {record.type} · {record.category} · {record.date}
          </p>
          <h2 id="artifact-title" className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-5xl">
            {record.displayName}
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {record.patterns.map((pattern) => (
              <span key={pattern} className="rounded-full border border-border bg-card px-3 py-1 text-[10px] font-mono text-muted-foreground">
                {pattern}
              </span>
            ))}
          </div>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">{record.description}</p>

          <section className="mt-10 rounded-2xl border border-signal-green/20 bg-signal-green/[0.045] p-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-green">What this demonstrates</p>
            <p className="mt-3 leading-relaxed text-foreground">{record.professionalSignal}</p>
          </section>

          <div className="mt-10 grid gap-8">
            <section>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-cyan">Why it mattered</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{record.whyItMatters}</p>
            </section>

            <section>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-cyan">Reconstructed system flow</h3>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                {record.architectureFlow.map((node, index) => (
                  <div key={`${node}-${index}`} className="contents">
                    {index > 0 && <ChevronRight className="mx-auto h-4 w-4 rotate-90 text-signal-cyan/60 sm:rotate-0" aria-hidden="true" />}
                    <div className="flex-1 rounded-xl border border-border bg-card px-3 py-4 text-center text-[11px] font-mono text-foreground">
                      {node}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-cyan">Recovered technical stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {record.techTags.map((technology) => (
                  <span key={technology} className="rounded-lg border border-signal-cyan/15 bg-signal-cyan/[0.045] px-3 py-2 text-xs font-mono text-foreground">
                    {technology}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{record.stackNote}</p>
            </section>

            <section className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Complexity</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{record.complexityScore} / 5</p>
                <ScoreDots score={record.complexityScore} />
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Maturity</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{record.maturityLabel}</p>
                <ScoreDots score={record.maturityScore} color="bg-signal-cyan" />
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Autonomy</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{record.autonomyLabel}</p>
                <ScoreDots score={Math.min(record.autonomyScore + 1, 5)} color="bg-signal-green" />
              </div>
            </section>

            <section className="rounded-2xl border border-border p-5">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Evidence surface</h3>
              <p className="mt-3 font-medium text-foreground">{record.evidenceSurface}</p>
              {record.provenance ? (
                <div className="mt-4 rounded-lg border border-border bg-background p-4 text-sm leading-6">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-signal-green">
                    Source type · {record.provenance.kind.replaceAll("-", " ")}
                  </p>
                  <p className="mt-2 text-muted-foreground">{record.provenance.label}</p>
                  {record.provenance.url && (
                    <a href={record.provenance.url} target={record.provenance.url.startsWith("https://") ? "_blank" : undefined}
                      rel={record.provenance.url.startsWith("https://") ? "noopener noreferrer" : undefined}
                      className="mt-2 inline-block font-medium text-foreground underline underline-offset-4 hover:text-signal-green">
                      Inspect available source ↗
                    </a>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Source existence is not proof of full functional equivalence, audited enterprise adoption or production deployment.
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Historical reconstruction: evidence and confidence predate the 2026 source manifest.
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-[10px] font-mono ${confidenceClass[record.confidence]}`}>
                  {record.confidence}
                </span>
                <span className="rounded-full border border-border bg-card px-3 py-1 text-[10px] font-mono text-muted-foreground">{record.status}</span>
                <span className="rounded-full border border-border bg-card px-3 py-1 text-[10px] font-mono text-muted-foreground">{record.model.label}</span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{record.model.note}</p>
              {record.notes && <p className="mt-3 text-xs leading-relaxed text-signal-amber">Recovery note: {record.notes}</p>}
            </section>

            <section>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-cyan">Roles exercised</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {record.roles.map((role) => (
                  <span key={role} className="rounded-full border border-signal-amber/20 bg-signal-amber/[0.04] px-3 py-1.5 text-xs text-foreground">
                    {role}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  )
}

export function EvolutionExplorer({ initialArtifact }: { initialArtifact?: number }) {
  const [query, setQuery] = useState("")
  const [year, setYear] = useState("All years")
  const [family, setFamily] = useState<"All families" | EvolutionFamily>("All families")
  const [confidence, setConfidence] = useState<"All confidence" | EvolutionConfidence>("All confidence")
  const [visibleCount, setVisibleCount] = useState(24)
  const [selectedId, setSelectedId] = useState<number | null>(
    evolutionRecords.some((record) => record.id === initialArtifact) ? initialArtifact ?? null : null,
  )

  const filtered = useMemo(() => {
    const needle = normalise(query.trim())
    return evolutionRecords.filter((record) => {
      if (needle && !recordSearchIndex.get(record.id)?.includes(needle)) return false
      if (year !== "All years" && String(record.year) !== year) return false
      if (family !== "All families" && record.family !== family) return false
      if (confidence !== "All confidence" && record.confidence !== confidence) return false
      return true
    })
  }, [confidence, family, query, year])

  const visibleIds = useMemo(() => new Set(filtered.map((record) => record.id)), [filtered])
  const selectedRecord = evolutionRecords.find((record) => record.id === selectedId) ?? null

  useEffect(() => {
    setVisibleCount(24)
  }, [query, year, family, confidence])

  useEffect(() => {
    const onPopState = () => {
      const artifact = Number(new URL(window.location.href).searchParams.get("artifact"))
      setSelectedId(evolutionRecords.some((record) => record.id === artifact) ? artifact : null)
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  function openRecord(record: EvolutionRecord) {
    setSelectedId(record.id)
    const url = new URL(window.location.href)
    url.searchParams.set("artifact", String(record.id))
    window.history.pushState({}, "", url)
  }

  function closeRecord() {
    setSelectedId(null)
    const url = new URL(window.location.href)
    url.searchParams.delete("artifact")
    window.history.replaceState({}, "", url)
  }

  function resetFilters() {
    setQuery("")
    setYear("All years")
    setFamily("All families")
    setConfidence("All confidence")
  }

  return (
    <>
      <section id="archive" aria-labelledby="archive-heading" className="container max-w-6xl mx-auto px-4 py-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-signal-green">The complete public-safe archive</p>
            <h2 id="archive-heading" className="mt-3 text-3xl font-bold text-foreground md:text-5xl">Every recovered artefact. No résumé compression.</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Products and experiments coexist deliberately. Scope, maturity and confidence remain visible so quantity never masquerades as production status.
          </p>
        </div>

        <div className="sticky top-16 z-30 mt-10 rounded-2xl border border-border bg-background/90 p-3 shadow-xl backdrop-blur-xl">
          <div className="grid gap-2 lg:grid-cols-[1.4fr_repeat(3,.7fr)]">
            <label className="relative">
              <span className="sr-only">Search artefacts</span>
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search governance, GIS, benchmark, SQL…"
                className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-signal-green/50"
              />
            </label>
            <select aria-label="Filter timeline by year" value={year} onChange={(event) => setYear(event.target.value)} className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-signal-green/50">
              <option>All years</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
            <select aria-label="Filter timeline by project family" value={family} onChange={(event) => setFamily(event.target.value as typeof family)} className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-signal-green/50">
              <option>All families</option>
              {evolutionFamilies.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select aria-label="Filter timeline by confidence" value={confidence} onChange={(event) => setConfidence(event.target.value as typeof confidence)} className="h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-signal-green/50">
              <option>All confidence</option>
              <option>Confirmed</option>
              <option>Strong recall</option>
              <option>Partial reconstruction</option>
            </select>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 px-1">
            <p className="text-xs font-mono text-muted-foreground">{filtered.length} / 184 visible in the constellation</p>
            {(query || year !== "All years" || family !== "All families" || confidence !== "All confidence") && (
              <button onClick={resetFilters} className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Reset filters</button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Constellation visibleIds={visibleIds} onOpen={openRecord} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, visibleCount).map((record) => (
            <button
              key={record.id}
              onClick={() => openRecord(record)}
              className="card-lift group min-h-[260px] rounded-2xl border border-border bg-card p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  {String(record.id).padStart(3, "0")} · {record.date}
                </p>
                <span className="text-sm">{record.symbols.slice(0, 3).map((symbol) => symbol.icon).join(" ")}</span>
              </div>
              <p className="mt-5 text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: familyColor[record.family] }}>{record.family}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent">{record.displayName}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{record.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {record.techTags.slice(0, 3).map((technology) => (
                  <span key={technology} className="rounded-md border border-border px-2 py-1 text-[9px] font-mono text-muted-foreground">{technology}</span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className={`rounded-full border px-2 py-1 text-[9px] font-mono ${confidenceClass[record.confidence]}`}>{record.confidence}</span>
                <span className="text-[10px] text-muted-foreground transition-colors group-hover:text-foreground">Open record →</span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
            <p className="text-sm text-muted-foreground">No artefacts match this combination.</p>
            <button onClick={resetFilters} className="mt-3 text-sm text-foreground underline underline-offset-4">Reset the archive</button>
          </div>
        )}

        {visibleCount < filtered.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((count) => count + 24)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/30"
            >
              <Sparkles className="h-4 w-4 text-signal-green" />
              Load 24 more
            </button>
          </div>
        )}
      </section>

      {selectedRecord && <ProjectDrawer record={selectedRecord} onClose={closeRecord} />}
    </>
  )
}

export function EvolutionFamilyLegend() {
  const counts = new Map<EvolutionFamily, number>()
  evolutionRecords.forEach((record) => counts.set(record.family, (counts.get(record.family) ?? 0) + 1))

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-5">
      {evolutionFamilies.map((family) => (
        <div key={family} className="bg-background p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: familyColor[family] }} />
            <span className="font-mono text-xl font-bold text-foreground">{counts.get(family)}</span>
          </div>
          <p className="mt-5 text-sm font-semibold leading-snug text-foreground">{family}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{familyDescriptions[family]}</p>
        </div>
      ))}
    </div>
  )
}
