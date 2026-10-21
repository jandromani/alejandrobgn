"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, LayoutGrid, Map } from "lucide-react"
import { systems, type System } from "@/lib/systems-data"
import { MediumSystemCard, SmallSystemCard } from "@/components/system-preview-card"

type ViewMode = "map" | "gallery"
type FilterStatus = "all" | "Live System" | "Public Demo" | "Open Source" | "Prototype" | "Research" | "Case Study"

const statusFilters: Array<{ id: FilterStatus; label: string }> = [
  { id: "all",          label: "All"           },
  { id: "Live System",  label: "Live system"   },
  { id: "Public Demo",  label: "Public demo"   },
  { id: "Open Source",  label: "Open source"   },
  { id: "Research",     label: "Research"      },
  { id: "Prototype",    label: "Prototype"     },
  { id: "Case Study",   label: "Case study"    },
]

const levelMeta: Record<number, { label: string; description: string; accent: string }> = {
  1: { label: "Core AI Systems",           description: "Flagship platforms and core infrastructure.",             accent: "hsl(var(--signal-green))"      },
  2: { label: "Intelligence & Products",   description: "Intelligence systems and vertical products.", accent: "hsl(var(--signal-cyan))"       },
  3: { label: "Foundations & Open Source", description: "Open-source foundations and utilities.",                 accent: "hsl(var(--signal-amber))"      },
  4: { label: "Venture Lab",               description: "Research projects and early experiments.",                accent: "hsl(var(--muted-foreground))"  },
}

const statusStyle: Record<string, { dot: string; text: string }> = {
  "Live System":  { dot: "bg-signal-green animate-status-pulse", text: "text-signal-green"      },
  "Open Source":  { dot: "bg-signal-cyan",                       text: "text-signal-cyan"       },
  "Research":     { dot: "bg-signal-amber",                      text: "text-signal-amber"      },
  "Public Demo":  { dot: "bg-signal-green animate-status-pulse", text: "text-signal-green"      },
  "MVP":          { dot: "bg-signal-amber",                      text: "text-signal-amber"      },
  "Case Study":   { dot: "bg-muted-foreground",                  text: "text-muted-foreground"  },
  "Prototype":    { dot: "bg-signal-amber",                      text: "text-signal-amber"      },
}

function MapSystemCard({ system }: { system: System }) {
  const st = statusStyle[system.status] ?? { dot: "bg-muted-foreground", text: "text-muted-foreground" }
  return (
    <Link
      href={`/systems/${system.slug}`}
      className="group card-lift flex flex-col border border-border rounded-xl bg-card p-5 hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center justify-between mb-3 gap-2">
        <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${st.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`} aria-hidden="true" />
          {system.status}
        </span>
        <span className="text-xs font-mono text-muted-foreground">{system.year}</span>
      </div>
      <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">{system.name}</h3>
      <p className="text-xs font-mono text-muted-foreground mt-1 mb-3">{system.tagline}</p>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">{system.shortDescription}</p>
      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
        {system.technologies.slice(0, 3).map((t) => (
          <span key={t} className="px-2 py-0.5 rounded text-xs font-mono bg-secondary border border-border text-muted-foreground">{t}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <span className="text-xs font-mono text-muted-foreground uppercase">{system.category} · L{system.level}</span>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
      </div>
    </Link>
  )
}

export function SystemsIndex() {
  const [view, setView] = useState<ViewMode>("map")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")

  const filtered = filterStatus === "all"
    ? systems
    : systems.filter(s => s.status === filterStatus)

  const byLevel: Record<number, System[]> = { 1: [], 2: [], 3: [], 4: [] }
  filtered.forEach(s => byLevel[s.level]?.push(s))

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="relative container max-w-6xl mx-auto px-4 py-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em] mb-4">Systems catalogue</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-3">AI Systems</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Frameworks, products, tools, and platforms built against real constraints. Every preview is labeled so you can tell a live surface from a representative or conceptual artefact.
              </p>
            </div>
            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 border border-border rounded-lg bg-card flex-shrink-0" role="group" aria-label="View mode">
              <button
                onClick={() => setView("map")}
                aria-pressed={view === "map"}
                className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  view === "map" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Map className="w-3.5 h-3.5" aria-hidden="true" />
                System map
              </button>
              <button
                onClick={() => setView("gallery")}
                aria-pressed={view === "gallery"}
                className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  view === "gallery" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                Product gallery
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">

        {/* Filter bar */}
        <nav aria-label="Filter by status" className="space-y-3">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            {view === "gallery" ? "Filter by status" : "Filter by domain"}
          </p>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                aria-pressed={filterStatus === f.id}
                className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  filterStatus === f.id
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </nav>

        {/* ── MAP VIEW ──────────────────────────────────────────── */}
        {view === "map" && (
          <div className="space-y-16">
            {[1, 2, 3, 4].map(level => {
              const levelSystems = byLevel[level]
              if (!levelSystems?.length) return null
              const meta = levelMeta[level]
              return (
                <section key={level} aria-labelledby={`level-${level}-heading`} className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="w-0.5 h-8 rounded-full flex-shrink-0" style={{ background: meta.accent }} aria-hidden="true" />
                    <div>
                      <h2 id={`level-${level}-heading`} className="text-xl font-bold text-foreground">{meta.label}</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">{meta.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {levelSystems.sort((a, b) => a.order - b.order).map(s => (
                      <MapSystemCard key={s.id} system={s} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {/* ── GALLERY VIEW ──────────────────────────────────────── */}
        {view === "gallery" && (
          <div className="space-y-16">
            {[1, 2, 3, 4].map(level => {
              const levelSystems = byLevel[level]?.filter(s => s.featured)
              if (!levelSystems?.length) return null
              const meta = levelMeta[level]
              return (
                <section key={level} aria-labelledby={`gallery-level-${level}-heading`} className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="w-0.5 h-8 rounded-full flex-shrink-0" style={{ background: meta.accent }} aria-hidden="true" />
                    <div>
                      <h2 id={`gallery-level-${level}-heading`} className="text-xl font-bold text-foreground">{meta.label}</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">{meta.description}</p>
                    </div>
                  </div>
                  {/* Level 1: 2 medium + smaller */}
                  {level === 1 ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {levelSystems.slice(0, 2).map(s => <MediumSystemCard key={s.id} system={s} />)}
                      </div>
                      {levelSystems.length > 2 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {levelSystems.slice(2).map(s => <SmallSystemCard key={s.id} system={s} />)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {levelSystems.sort((a, b) => a.order - b.order).map(s => (
                        <MediumSystemCard key={s.id} system={s} />
                      ))}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div className="border-t border-border pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Interested in one of these systems?</h2>
            <p className="text-sm text-muted-foreground mt-1">Open to integrations, collaborations, and serious technical conversations.</p>
          </div>
          <Link
            href="/meet"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex-shrink-0"
          >
            Book a session
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </div>
  )
}
