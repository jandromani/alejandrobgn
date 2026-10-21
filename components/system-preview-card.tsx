import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getEvidenceLabel, getEvidenceTone, type System } from "@/lib/systems-data"

const statusDot: Record<string, { color: string; pulse: boolean; text: string }> = {
  "Live System":  { color: "bg-signal-green",      pulse: true,  text: "text-signal-green"  },
  "Open Source":  { color: "bg-signal-cyan",        pulse: false, text: "text-signal-cyan"   },
  "Research":     { color: "bg-signal-amber",       pulse: false, text: "text-signal-amber"  },
  "Public Demo":  { color: "bg-signal-green",       pulse: true,  text: "text-signal-green"  },
  "MVP":          { color: "bg-signal-amber",       pulse: false, text: "text-signal-amber"  },
  "Case Study":   { color: "bg-muted-foreground",   pulse: false, text: "text-muted-foreground" },
  "Prototype":    { color: "bg-signal-amber",       pulse: false, text: "text-signal-amber"  },
}

function EvidenceScreenshot({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string
  alt: string
  sizes: string
  priority?: boolean
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        aria-hidden="true"
        className="object-cover object-top scale-110 blur-md opacity-25"
        sizes={sizes}
      />
      <div className="absolute inset-1.5 overflow-hidden rounded-md border border-white/5 bg-background/30 shadow-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-top group-hover:scale-[1.01] transition-transform duration-500"
          sizes={sizes}
          priority={priority}
        />
      </div>
    </>
  )
}

/** Large featured card — image left ~55%, content right ~45% */
export function FeaturedSystemCard({ system }: { system: System }) {
  const dot = statusDot[system.status] ?? { color: "bg-muted-foreground", pulse: false, text: "text-muted-foreground" }
  const previewSrc = system.evidence?.assets.overview.src
  const previewAlt = system.evidence?.assets.overview.alt ?? `${system.name} interface preview`
  const previewLabel = system.evidence ? getEvidenceLabel(system.evidence) : "No preview disclosure"
  const previewTone = system.evidence ? getEvidenceTone(system.evidence) : "text-muted-foreground border-border bg-background/70"

  return (
    <article className="group card-lift border border-border rounded-xl bg-card overflow-hidden hover:border-foreground/30 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[320px]">

        {/* Preview image */}
        <div className="relative border-b lg:border-b-0 lg:border-r border-border overflow-hidden bg-secondary min-h-[200px] lg:min-h-0">
          {previewSrc ? (
            <>
              <EvidenceScreenshot src={previewSrc} alt={previewAlt} sizes="(max-width: 1024px) 100vw, 50vw" priority />
              <span className={`absolute top-2 left-2 z-10 inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border backdrop-blur-sm ${previewTone}`}>
                {previewLabel}
              </span>
              {/* Gradient fade on right for desktop */}
              <div
                className="absolute inset-y-0 right-0 w-16 hidden lg:block pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, hsl(var(--card)))" }}
                aria-hidden="true"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-lg border border-border bg-secondary" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-7">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${dot.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot.color} ${dot.pulse ? "animate-status-pulse" : ""}`} aria-hidden="true" />
                {system.status}
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{system.category}</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                {system.name}
              </h3>
              <p className="text-xs font-mono text-muted-foreground mt-1">{system.tagline}</p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{system.shortDescription}</p>

            <div className="flex flex-wrap gap-1.5">
              {system.technologies.slice(0, 4).map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-xs font-mono bg-secondary border border-border text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
            <Link
              href={`/systems/${system.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              View case study
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
            {system.links.live && (
              <a
                href={system.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                aria-label={`Open ${system.name} live system (opens in new tab)`}
              >
                Open live system
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/** Medium card — image on top, content below */
export function MediumSystemCard({ system }: { system: System }) {
  const dot = statusDot[system.status] ?? { color: "bg-muted-foreground", pulse: false, text: "text-muted-foreground" }
  const previewSrc = system.evidence?.assets.overview.src
  const previewAlt = system.evidence?.assets.overview.alt ?? `${system.name} interface preview`
  const previewLabel = system.evidence ? getEvidenceLabel(system.evidence) : "No preview disclosure"
  const previewTone = system.evidence ? getEvidenceTone(system.evidence) : "text-muted-foreground border-border bg-background/70"

  return (
    <Link
      href={`/systems/${system.slug}`}
      className="group card-lift flex flex-col border border-border rounded-xl bg-card overflow-hidden hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Preview */}
      <div className="relative aspect-[3/2] border-b border-border bg-secondary overflow-hidden">
        {previewSrc ? (
          <>
            <EvidenceScreenshot src={previewSrc} alt={previewAlt} sizes="(max-width: 768px) 100vw, 33vw" />
            <span className={`absolute top-2 left-2 z-10 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono border backdrop-blur-sm ${previewTone}`}>
              {previewLabel}
            </span>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-lg border border-border bg-secondary" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${dot.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot.color} ${dot.pulse ? "animate-status-pulse" : ""}`} aria-hidden="true" />
            {system.status}
          </span>
          <span className="text-xs font-mono text-muted-foreground">{system.year}</span>
        </div>
        <div>
          <h3 className="font-bold text-foreground group-hover:text-accent transition-colors leading-tight">{system.name}</h3>
          <p className="text-xs font-mono text-muted-foreground mt-0.5">{system.tagline}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">{system.shortDescription}</p>
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <span className="text-xs font-mono text-muted-foreground uppercase">{system.category}</span>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}

/** Small card — compact, image optional */
export function SmallSystemCard({ system }: { system: System }) {
  const dot = statusDot[system.status] ?? { color: "bg-muted-foreground", pulse: false, text: "text-muted-foreground" }
  const previewSrc = system.evidence?.assets.overview.src
  const previewAlt = system.evidence?.assets.overview.alt ?? `${system.name} interface preview`
  const previewLabel = system.evidence ? getEvidenceLabel(system.evidence) : "No preview disclosure"
  const previewTone = system.evidence ? getEvidenceTone(system.evidence) : "text-muted-foreground border-border bg-background/70"

  return (
    <Link
      href={`/systems/${system.slug}`}
      className="group card-lift flex flex-col border border-border rounded-xl bg-card overflow-hidden hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Compact image strip */}
      {previewSrc && (
        <div className="relative h-40 sm:h-44 border-b border-border bg-secondary overflow-hidden">
          <EvidenceScreenshot src={previewSrc} alt={previewAlt} sizes="(max-width: 768px) 100vw, 25vw" />
          <span className={`absolute top-2 left-2 z-10 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono border backdrop-blur-sm ${previewTone}`}>
            {previewLabel}
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${dot.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot.color} ${dot.pulse ? "animate-status-pulse" : ""}`} aria-hidden="true" />
            {system.status}
          </span>
        </div>
        <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{system.name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">{system.shortDescription}</p>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs font-mono text-muted-foreground uppercase">{system.category}</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}

/** Horizontal BrewMatch applied product card */
export function AppliedProductCard({ system }: { system: System }) {
  const dot = statusDot[system.status] ?? { color: "bg-muted-foreground", pulse: false, text: "text-muted-foreground" }
  const previewSrc = system.evidence?.assets.overview.src
  const previewAlt = system.evidence?.assets.overview.alt ?? `${system.name} interface preview`
  const previewLabel = system.evidence ? getEvidenceLabel(system.evidence) : "No preview disclosure"
  const previewTone = system.evidence ? getEvidenceTone(system.evidence) : "text-muted-foreground border-border bg-background/70"

  return (
    <article className="group card-lift border border-border rounded-xl bg-card overflow-hidden hover:border-foreground/30 transition-all">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
        {/* Content first on mobile */}
        <div className="flex flex-col justify-between p-7">
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${dot.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot.color} ${dot.pulse ? "animate-status-pulse" : ""}`} aria-hidden="true" />
                {system.status}
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase px-2 py-0.5 border border-border rounded-full">Applied product</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">{system.name}</h3>
              <p className="text-xs font-mono text-muted-foreground mt-1">{system.tagline}</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{system.shortDescription}</p>
            {system.verifiedMetrics?.[0] && (
              <div className="flex items-baseline gap-2 pt-2 border-t border-border">
                <p className="text-2xl font-bold font-mono text-foreground">{system.verifiedMetrics[0].value}</p>
                <p className="text-xs text-muted-foreground">{system.verifiedMetrics[0].name}</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
            <Link
              href={`/systems/${system.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              View case study
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            {system.links.live && (
              <a
                href={system.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Open ${system.name} live (opens in new tab)`}
              >
                Open live system
              </a>
            )}
          </div>
        </div>

        {/* Preview image */}
        <div className="relative border-t md:border-t-0 md:border-l border-border overflow-hidden bg-secondary min-h-[220px]">
          {previewSrc ? (
            <>
              <EvidenceScreenshot src={previewSrc} alt={previewAlt} sizes="(max-width: 768px) 100vw, 50vw" />
              <span className={`absolute top-2 left-2 z-10 inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border backdrop-blur-sm ${previewTone}`}>
                {previewLabel}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  )
}

/** LLMTRACE foundations horizontal card */
export function FoundationCard({ system }: { system: System }) {
  const dot = statusDot[system.status] ?? { color: "bg-muted-foreground", pulse: false, text: "text-muted-foreground" }
  const previewSrc = system.evidence?.assets.overview.src
  const previewAlt = system.evidence?.assets.overview.alt ?? `${system.name} interface preview`
  const previewLabel = system.evidence ? getEvidenceLabel(system.evidence) : "No preview disclosure"
  const previewTone = system.evidence ? getEvidenceTone(system.evidence) : "text-muted-foreground border-border bg-background/70"

  return (
    <article className="group card-lift border border-border rounded-xl bg-card overflow-hidden hover:border-signal-cyan/40 transition-all">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
        <div className="relative border-b md:border-b-0 md:border-r border-border overflow-hidden bg-secondary min-h-[200px]">
          {previewSrc ? (
            <>
              <EvidenceScreenshot src={previewSrc} alt={previewAlt} sizes="(max-width: 768px) 100vw, 50vw" />
              <span className={`absolute top-2 left-2 z-10 inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border backdrop-blur-sm ${previewTone}`}>
                {previewLabel}
              </span>
            </>
          ) : null}
        </div>
        <div className="flex flex-col justify-between p-7">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${dot.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot.color}`} aria-hidden="true" />
                {system.status}
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase px-2 py-0.5 border border-border rounded-full">Foundation layer</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">{system.name}</h3>
              <p className="text-xs font-mono text-muted-foreground mt-1">{system.tagline}</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{system.shortDescription}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border">
            <Link
              href={`/systems/${system.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              View case study
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            {system.links.repo && (
              <a
                href={system.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`View ${system.name} repository (opens in new tab)`}
              >
                GitHub
              </a>
            )}
            {system.links.pypi && (
              <a
                href={system.links.pypi}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`View ${system.name} on PyPI (opens in new tab)`}
              >
                PyPI
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
