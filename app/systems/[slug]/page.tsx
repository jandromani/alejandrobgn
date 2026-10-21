import { RelatedEvidence } from "@/components/related-evidence"
import { notFound } from "next/navigation"
import { getEvidenceLabel, getSystemBySlug, getRelatedSystems, systems } from "@/lib/systems-data"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, FileText, Package, BookOpen, ArrowRight } from "lucide-react"
import { ProductPreview } from "@/components/product-preview"
import { TransparencyBlock } from "@/components/transparency-block"
import { RuntimeXRay } from "@/components/runtime-xray"
import { getSystemWorkflow } from "@/lib/system-workflows"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, ogImageUrl, personId, websiteId } from "@/lib/seo"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return systems.map((system) => ({ slug: system.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const system = getSystemBySlug(slug)
  if (!system) return {}
  return createPageMetadata({
    title: `${system.name} — ${system.tagline}`,
    description: system.shortDescription,
    path: `/systems/${system.slug}`,
    ogKind: "system",
    ogSlug: system.slug,
    keywords: [system.name, system.category, system.role, ...system.technologies],
  })
}

const statusConfig: Record<string, { dot: string; text: string; border: string; bg: string }> = {
  "Live System":  { dot: "bg-signal-green animate-status-pulse", text: "text-signal-green",  border: "border-signal-green/30",  bg: "bg-signal-green/5"  },
  "Open Source":  { dot: "bg-signal-cyan",                       text: "text-signal-cyan",   border: "border-signal-cyan/30",   bg: "bg-signal-cyan/5"   },
  "Research":     { dot: "bg-signal-amber",                      text: "text-amber-800 dark:text-amber-300",  border: "border-signal-amber/30",  bg: "bg-signal-amber/5"  },
  "Public Demo":  { dot: "bg-signal-green animate-status-pulse", text: "text-signal-green",  border: "border-signal-green/30",  bg: "bg-signal-green/5"  },
  "MVP":          { dot: "bg-signal-amber",                      text: "text-signal-amber",  border: "border-signal-amber/30",  bg: "bg-signal-amber/5"  },
  "Case Study":   { dot: "bg-muted-foreground",                  text: "text-muted-foreground", border: "border-border",        bg: "bg-muted/10"        },
  "Archived":     { dot: "bg-muted-foreground",                  text: "text-muted-foreground", border: "border-border",        bg: "bg-muted/10"        },
  "Private":      { dot: "bg-muted-foreground",                  text: "text-muted-foreground", border: "border-border",        bg: "bg-muted/10"        },
  "Prototype":    { dot: "bg-signal-amber",                      text: "text-signal-amber",  border: "border-signal-amber/30",  bg: "bg-signal-amber/5"  },
}

const categoryLabel: Record<string, string> = {
  governance:    "Governance",
  orchestration: "Orchestration",
  stability:     "Stability",
  safety:        "Safety",
  observability: "Observability",
  intelligence:  "Intelligence",
  products:      "Products",
  platform:      "Platform",
}

export default async function SystemDetailPage({ params }: Props) {
  const { slug } = await params
  const system = getSystemBySlug(slug)
  if (!system) notFound()

  const relatedSystems = getRelatedSystems(system.id)
  const workflow = getSystemWorkflow(system.slug)
  const status = statusConfig[system.status] ?? { dot: "bg-muted-foreground", text: "text-muted-foreground", border: "border-border", bg: "bg-muted/10" }
  const externalLinks = Object.values(system.links).filter((value): value is string => Boolean(value))
  const canonical = absoluteUrl(`/systems/${system.slug}`)
  const modified = system.evidence?.lastVerified ?? `${system.year}-01-01`

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "SoftwareApplication",
            "@id": `${canonical}#software`,
            name: system.name,
            alternateName: system.tagline,
            description: system.shortDescription,
            url: canonical,
            mainEntityOfPage: canonical,
            applicationCategory: `${categoryLabel[system.category] ?? system.category} AI system`,
            dateCreated: `${system.year}-01-01`,
            dateModified: modified,
            creator: { "@id": personId },
            author: { "@id": personId },
            isPartOf: { "@id": `${absoluteUrl("/systems")}#collection` },
            keywords: [system.category, system.role, ...system.technologies].join(", "),
            featureList: system.technologies,
            sameAs: externalLinks,
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Portfolio status",
                value: system.status,
              },
              ...(system.evidence
                ? [
                    {
                      "@type": "PropertyValue",
                      name: "Public evidence label",
                      value: getEvidenceLabel(system.evidence),
                    },
                  ]
                : []),
            ],
            ...(system.links.repo ? { codeRepository: system.links.repo } : {}),
            ...(system.links.live
              ? {
                  potentialAction: {
                    "@type": "ViewAction",
                    target: system.links.live,
                    name: `Open ${system.name}`,
                  },
                }
              : {}),
          },
          {
            ...breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Systems", path: "/systems" },
              { name: system.name, path: `/systems/${system.slug}` },
            ]),
            "@id": `${canonical}#breadcrumb`,
          },
          {
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            url: canonical,
            name: `${system.name} — ${system.tagline}`,
            description: system.shortDescription,
            isPartOf: { "@id": websiteId },
            mainEntity: { "@id": `${canonical}#software` },
            primaryImageOfPage: ogImageUrl("system", system.slug),
            breadcrumb: { "@id": `${canonical}#breadcrumb` },
            inLanguage: "en",
          },
        ]}
      />
      <div className="min-h-screen bg-background">

      {/* ── FULL-BLEED HEADER ──────────────────────────────────────── */}
      <header className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />
        {/* Subtle glow based on status */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: system.status === "Live System" ? "hsl(var(--signal-green)/0.08)" : system.status === "Open Source" ? "hsl(var(--signal-cyan)/0.08)" : "hsl(var(--signal-amber)/0.08)" }}
          aria-hidden="true"
        />

        <div className="relative container max-w-6xl mx-auto px-4 pt-8 pb-12">

          {/* Back */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Systems catalogue
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">

            {/* Left */}
            <div className="space-y-6">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 text-xs border rounded-full px-2.5 py-1 font-mono ${status.text} ${status.border} ${status.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                  {system.status}
                </span>
                <span className="text-xs font-mono border border-border rounded-full px-2.5 py-1 text-muted-foreground bg-card">
                  {system.role}
                </span>
                <span className="text-xs font-mono text-muted-foreground border border-border rounded-full px-2.5 py-1 bg-card">
                  {categoryLabel[system.category] ?? system.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">{system.year}</span>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{system.name}</h1>
                <p className="text-base font-mono text-muted-foreground mt-2">{system.tagline}</p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{system.shortDescription}</p>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {system.links.repo && (
                  <a href={system.links.repo} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md bg-card hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="View repository (opens in new tab)">
                    <Github className="w-4 h-4" aria-hidden="true" /> Repository
                  </a>
                )}
                {system.links.live && (
                  <a href={system.links.live} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="View live demo (opens in new tab)">
                    <ExternalLink className="w-4 h-4" aria-hidden="true" /> Live demo
                  </a>
                )}
                {system.links.docs && (
                  <a href={system.links.docs} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md bg-card hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="View documentation (opens in new tab)">
                    <FileText className="w-4 h-4" aria-hidden="true" /> Documentation
                  </a>
                )}
                {system.links.pypi && (
                  <a href={system.links.pypi} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md bg-card hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="View on PyPI (opens in new tab)">
                    <Package className="w-4 h-4" aria-hidden="true" /> PyPI
                  </a>
                )}
                {system.links.article && (
                  <a href={system.links.article} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md bg-card hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Read article (opens in new tab)">
                    <BookOpen className="w-4 h-4" aria-hidden="true" /> Article
                  </a>
                )}
              </div>
            </div>

            {/* Right — stack panel */}
            <div className="hidden lg:block">
              <div className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="px-5 py-3 border-b border-border bg-secondary">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Stack</p>
                </div>
                <div className="p-5 flex flex-wrap gap-2">
                  {system.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs font-mono rounded-md bg-secondary border border-border text-foreground/90">
                      {t}
                    </span>
                  ))}
                </div>
                {system.verifiedMetrics && system.verifiedMetrics.length > 0 && (
                  <>
                    <div className="px-5 py-3 border-t border-b border-border bg-secondary">
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Key metric</p>
                    </div>
                    <div className="p-5 space-y-1">
                      <p className="text-3xl font-bold font-mono text-foreground">{system.verifiedMetrics[0].value}</p>
                      <p className="text-xs text-muted-foreground">{system.verifiedMetrics[0].name}</p>
                      <p className="text-xs text-muted-foreground">{system.verifiedMetrics[0].context}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ──────────────────────────────────────────────────── */}
      <div className="container max-w-6xl mx-auto px-4 py-16 space-y-16">

        {/* Problem Statement */}
        <section aria-labelledby="problem-heading" className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8">
          <div>
            <h2 id="problem-heading" className="text-sm font-mono uppercase tracking-widest text-muted-foreground">The problem</h2>
          </div>
          <div>
            <p className="text-xl text-foreground leading-relaxed font-medium">{system.problemStatement}</p>
          </div>
        </section>

        <div className="border-t border-border" />

        {/* Architecture */}
        <section aria-labelledby="arch-heading" className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8">
          <div>
            <h2 id="arch-heading" className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Architecture</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{system.description}</p>
            {system.architecture && (
              <div className="mt-4 p-5 border border-border rounded-xl bg-card font-mono text-sm text-muted-foreground whitespace-pre-wrap overflow-x-auto">
                {system.architecture}
              </div>
            )}
          </div>
        </section>

        {workflow && (
          <>
            <div className="border-t border-border" />
            <RuntimeXRay workflow={workflow} systemName={system.name} />
          </>
        )}

        {/* Product Evidence */}
        {system.evidence && (
          <>
            <div className="border-t border-border" />
            <section aria-labelledby="evidence-heading" className="space-y-8">
              <div>
                <h2 id="evidence-heading" className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-1">How it works</h2>
                <p className="text-xs text-muted-foreground max-w-2xl">Each artefact is labeled at project level so a real public surface is not confused with a representative workflow or a concept visualization. Lead preview: <span className="text-foreground">{getEvidenceLabel(system.evidence)}</span>.</p>
              </div>

              {/* Three-column evidence grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProductPreview asset={system.evidence.assets.overview} kind="interface" previewLabel={getEvidenceLabel(system.evidence)} priority />
                <ProductPreview asset={system.evidence.assets.workflow} kind="workflow" />
                <ProductPreview asset={system.evidence.assets.underTheHood} kind="architecture" />
              </div>

              {/* Transparency block */}
              <TransparencyBlock evidence={system.evidence} systemStatus={system.status} />

              {/* Interactive preview CTA if live link exists */}
              {system.links.live && (
                <div className="flex items-center gap-4 p-5 border border-border rounded-xl bg-card">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">Interactive preview</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Open the live system in a new tab to interact with it directly.</p>
                  </div>
                  <a
                    href={system.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex-shrink-0"
                    aria-label={`Open ${system.name} live system (opens in new tab)`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    Open live system
                  </a>
                </div>
              )}
            </section>
          </>
        )}

        {/* Verified Metrics */}
        {system.verifiedMetrics && system.verifiedMetrics.length > 0 && (
          <>
            <div className="border-t border-border" />
            <section aria-labelledby="metrics-heading" className="space-y-8">
              <div>
                <h2 id="metrics-heading" className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-1">Results</h2>
                <p className="text-xs text-muted-foreground">Evidence metrics with context. Public claims, snapshots, and benchmarks are labeled instead of being presented as production results.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {system.verifiedMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-6 border border-border rounded-xl bg-card space-y-3"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal-green" aria-hidden="true" />
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{metric.name}</p>
                    </div>
                    <p className="text-4xl font-bold font-mono text-foreground leading-none">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.context}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Honest Limits */}
        {system.honestLimits && system.honestLimits.length > 0 && (
          <>
            <div className="border-t border-border" />
            <section aria-labelledby="limits-heading" className="space-y-6">
              <div>
                <h2 id="limits-heading" className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-1">Honest limits</h2>
                <p className="text-xs text-muted-foreground">What this system does not solve, or where it has real constraints.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {system.honestLimits.map((limit, i) => (
                  <div
                    key={i}
                    className="p-5 border rounded-xl space-y-2"
                    style={{ borderColor: "hsl(var(--signal-amber)/0.3)", background: "hsl(var(--signal-amber)/0.04)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal-amber flex-shrink-0" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-foreground">{limit.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{limit.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Related Systems */}
        {relatedSystems.length > 0 && (
          <>
            <div className="border-t border-border" />
            <section aria-labelledby="related-heading" className="space-y-6">
              <h2 id="related-heading" className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Related systems</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedSystems.map((rel) => {
                  const relStatus = statusConfig[rel.status] ?? { dot: "bg-muted-foreground", text: "text-muted-foreground", border: "border-border", bg: "bg-muted/10" }
                  return (
                    <Link
                      key={rel.id}
                      href={`/systems/${rel.slug}`}
                      className="group card-lift p-5 border border-border rounded-xl bg-card hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${relStatus.dot}`} aria-hidden="true" />
                        <span className={`text-xs font-mono ${relStatus.text}`}>{rel.status}</span>
                      </div>
                      <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">{rel.name}</h3>
                      <p className="text-xs font-mono text-muted-foreground mt-1 mb-3">{rel.tagline}</p>
                      <div className="flex items-center justify-between border-t border-border pt-3 mt-3">
                        <span className="text-xs font-mono text-muted-foreground uppercase">{rel.category}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          </>
        )}

        {/* Footer CTA */}
        <div className="border-t border-border pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">Questions about this system?</p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              All systems
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-semibold rounded-md hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start a conversation
            </Link>
          </div>
        </div>

      </div>
      </div>
      <RelatedEvidence id={`system:${system.slug}`} />
    </>
  )
}
