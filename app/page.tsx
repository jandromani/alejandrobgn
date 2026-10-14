import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ExternalLink } from "lucide-react"
import { systems } from "@/lib/systems-data"
import { getFeaturedArticles, pillarLabels } from "@/data/writing"
import {
  FeaturedSystemCard,
  MediumSystemCard,
  SmallSystemCard,
  AppliedProductCard,
  FoundationCard,
} from "@/components/system-preview-card"
import { HomeOperatingDossier } from "@/components/home-operating-dossier"
import { HomeSignalManifesto } from "@/components/home-signal-manifesto"
import { EvolutionGrowthCurve } from "@/components/evolution-growth-curve"
import { SignalPattern } from "@/components/signal-pattern"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, createPageMetadata, personId, personJsonLd, siteConfig, websiteId, websiteJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  ogKind: "profile",
  absoluteTitle: true,
  keywords: ["AI portfolio", "AI engineering leader", "Madrid AI architect"],
})

export default function Page() {
  const featuredArticles = getFeaturedArticles()

  // Systems by role
  const aiActMiddleware = systems.find(s => s.slug === "aiactmiddleware")!
  const agnosticEngine  = systems.find(s => s.slug === "agnosticengine")!
  const entropicCore    = systems.find(s => s.slug === "entropiccore")!
  const psycheOS        = systems.find(s => s.slug === "psycheos")!
  const aiVendorCompare = systems.find(s => s.slug === "aivendorcompare")!
  const aiGILE          = systems.find(s => s.slug === "aigile-document-intelligence")!
  const llmtrace        = systems.find(s => s.slug === "llmtrace")!
  const brewmatch       = systems.find(s => s.slug === "brewmatch")!

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          websiteJsonLd(),
          personJsonLd(),
          {
            "@type": "WebPage",
            "@id": `${absoluteUrl("/")}#webpage`,
            url: absoluteUrl("/"),
            name: siteConfig.title,
            description: siteConfig.description,
            isPartOf: { "@id": websiteId },
            about: { "@id": personId },
            inLanguage: siteConfig.language,
            dateModified: "2026-08-03",
          },
        ]}
      />

      <HomeOperatingDossier />
      <HomeSignalManifesto />

      {/* ── CORE SYSTEMS — EDITORIAL LAYOUT ──────────────────────── */}
      <section aria-labelledby="systems-heading" className="container max-w-6xl mx-auto px-4 py-20 space-y-6">
        <div className="flex items-baseline justify-between gap-4 mb-10">
          <div className="space-y-1">
            <h2 id="systems-heading" className="text-2xl font-bold text-foreground">Core systems</h2>
            <p className="text-sm text-muted-foreground">Runtimes, frameworks, and products. Each one built to solve a specific problem in the AI infrastructure stack.</p>
          </div>
          <Link href="/systems" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 flex-shrink-0">
            Full catalogue <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>

        {/* Row 1 — Featured: AI Act Middleware (full width) */}
        <FeaturedSystemCard system={aiActMiddleware} />

        {/* Row 2 — Primary: Agnostic Engine + Entropic Core */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediumSystemCard system={agnosticEngine} />
          <MediumSystemCard system={entropicCore} />
        </div>

        {/* Row 3 — Supporting: PsycheOS + AI Vendor Compare + aiGILE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SmallSystemCard system={psycheOS} />
          <SmallSystemCard system={aiVendorCompare} />
          <SmallSystemCard system={aiGILE} />
        </div>
      </section>

      <div className="border-t border-border" />

      {/* ── FOUNDATIONS — LLMTRACE ────────────────────────────────── */}
      <section aria-labelledby="foundations-heading" className="container max-w-6xl mx-auto px-4 py-20 space-y-8">
        <div>
          <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-2">Foundation layer</p>
          <h2 id="foundations-heading" className="text-xl font-bold text-foreground">Open source infrastructure</h2>
          <p className="text-sm text-muted-foreground mt-1">The observability and tracing layer that underpins everything else.</p>
        </div>
        <FoundationCard system={llmtrace} />
      </section>

      <div className="border-t border-border" />

      {/* ── APPLIED PRODUCT — BREWMATCH ───────────────────────────── */}
      <section aria-labelledby="applied-heading" className="container max-w-6xl mx-auto px-4 py-20 space-y-8">
        <div>
          <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-2">Applied product</p>
          <h2 id="applied-heading" className="text-xl font-bold text-foreground">Vertical AI execution</h2>
          <p className="text-sm text-muted-foreground mt-1">A live product that demonstrates the full stack: intent classification, catalog intelligence, and commercial handoff.</p>
        </div>
        <AppliedProductCard system={brewmatch} />
      </section>

      <div className="border-t border-border" />

      {/* ── AI CO-EVOLUTION TEASER ─────────────────────────────── */}
      <section aria-labelledby="evolution-heading" className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" aria-hidden="true" />
        <div className="relative container max-w-6xl mx-auto px-4 py-20">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] font-mono text-signal-green uppercase tracking-[0.22em]">43 months building with AI</p>
              <h2 id="evolution-heading" className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
                The systems did not appear overnight.
              </h2>
              <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                The path began in early 2023 by forcing GPT-3.5 to preserve long-form context. It now spans 184 reconstructed artefacts across GIS, APIs, model economics, reliability, safety, multi-agent systems and governance.
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                The flagship systems are the compressed result of that history.
              </p>
              <Link
                href="/evolution"
                className="mt-7 inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-signal-green/50"
              >
                See the complete evolution
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <EvolutionGrowthCurve compact />
          </div>
        </div>
      </section>

      {/* ── WRITING PREVIEW ──────────────────────────────────────── */}
      <section aria-labelledby="writing-heading" className="container max-w-6xl mx-auto px-4 py-20 space-y-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.2em] text-signal-green">Technical field notes / published</p>
            <h2 id="writing-heading" className="mt-2 text-4xl font-bold text-foreground">Production AI, after the demo.</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Long-form engineering with inspectable architecture, explicit evidence boundaries and real related systems.</p>
          </div>
          <Link href="/writing" className="inline-flex flex-shrink-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[.14em] text-signal-green">
            All articles <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {featuredArticles.slice(0, 3).map((article,index) => (
            <Link
              key={article.id}
              href={`/writing/${article.slug}`}
              className={`group relative overflow-hidden border border-border bg-[#07090d] text-white transition-colors hover:border-signal-green/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index===0?"md:col-span-2 md:grid md:grid-cols-[1.05fr_.95fr]":""}`}
            >
              <div className="flex min-h-[250px] flex-col p-6"><span className="font-mono text-[8px] uppercase tracking-[.18em] text-signal-green">FN-{String(article.id).padStart(3,"0")} / {pillarLabels[article.pillar]}</span><h3 className={`${index===0?"text-2xl":"text-lg"} mt-4 font-mono font-bold leading-tight tracking-[-.03em]`}>{article.title}</h3><p className="mt-3 line-clamp-3 font-mono text-[9px] leading-5 text-white/60">{article.summary}</p><div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[8px] text-white/55"><span>{article.wordCount.toLocaleString("en-US")} words</span><span className="text-signal-green">Read note →</span></div></div>
              {index===0&&<div className="min-h-[210px]"><SignalPattern kind={article.pillar} label={`Visual index for ${article.title}`}/></div>}
            </Link>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="relative container max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Open to serious work</p>
              <h2 id="cta-heading" className="text-3xl font-bold text-foreground">
                Agentic systems, governance, observability.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Technical leadership for teams building AI products that need to be reliable, observable, governable, and economically viable. Open to full-time roles, advisory work, and serious technical collaborations.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link
                href="/experience"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See experience
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground text-sm rounded-md hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Start a conversation
              </Link>
              <a
                href="https://www.linkedin.com/in/alejandro-bgn/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                LinkedIn
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
