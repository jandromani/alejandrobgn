import { RelatedEvidence } from "@/components/related-evidence"
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
import { FrontierShowcase } from "@/components/frontier-showcase"
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
            dateModified: "2026-10-21",
            hasPart: [
              { "@type": "WebPage", "@id": `${absoluteUrl("/atlas")}#collection`, url: absoluteUrl("/atlas"), name: "Engineering Evidence Atlas" },
              { "@type": "Article", url: absoluteUrl("/work/cybersecurity-ai-engineering"), name: "AI-assisted engineering activation" },
              { "@type": "Article", url: absoluteUrl("/work/banking-modernization"), name: "Source-to-evidence modernization" },
            ],
          },
        ]}
      />


      <HomeOperatingDossier mode="hero" />

      {/* Executive first: preserve original operating thesis, catalogue, evidence ledger and research below. */}
      <section id="enterprise-outcomes" aria-labelledby="enterprise-outcomes-heading" className="scroll-mt-20 border-b border-border bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">01 / Selected enterprise outcomes</p>
          <h2 id="enterprise-outcomes-heading" className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">Engineering changes that teams could use.</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
            Two sector-anonymized engagements. Each case separates personal contribution, joint delivery and the evidence actually demonstrated.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link key="cybersecurity-ai-engineering" href="/work/cybersecurity-ai-engineering" className="group flex flex-col evidence-card p-6 transition-colors hover:border-signal-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">Cybersecurity / AI engineering</p>
            <p className="mt-7 font-mono text-4xl font-bold tracking-tight text-foreground">&lt; 1 month</p>
            <h3 className="mt-4 text-xl font-semibold leading-snug text-foreground md:text-2xl">AI-assisted engineering workflows in use</h3>
            <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">Two technical peers helped a participating team adopt project-aware specialist assistance, agent PR workflows and an adapted specification-and-review process.</p>
            <p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">Delivery-team-reported time-to-use, not externally audited or company-wide adoption.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-[#587f00] dark:group-hover:text-signal-green">Inspect decisions and evidence <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>

          <Link key="banking-modernization" href="/work/banking-modernization" className="group flex flex-col evidence-card p-6 transition-colors hover:border-signal-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">Banking / modernization</p>
            <p className="mt-7 font-mono text-4xl font-bold tracking-tight text-foreground">4-week PoC</p>
            <h3 className="mt-4 text-xl font-semibold leading-snug text-foreground md:text-2xl">Source-to-evidence modernization</h3>
            <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">A bounded reference module explored source-linked knowledge, canonical modelling, reproducible generation and explicit quality gates.</p>
            <p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">Technical demonstration, not a complete migration or proven functional parity.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-[#587f00] dark:group-hover:text-signal-green">Inspect decisions and evidence <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="responsibility-heading" className="border-b border-border bg-card/20">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">02 / What I can own</p>
              <h2 id="responsibility-heading" className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Responsibility beyond the model call.</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Architecture, implementation and adoption — responsibilities linked to case studies and inspectable engineering.</p>
            </div>
            <Link href="/experience" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground hover:text-[#587f00] dark:hover:text-signal-green">
              Career and contributions <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
          <Link key="01" href="/work/cybersecurity-ai-engineering" className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/30">
            <p className="font-mono text-xs text-[#587f00] dark:text-signal-green">01 / ACCOUNTABILITY</p>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Enterprise AI engineering</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Make project-aware agents and reviewable pull requests useful to a real team, with collaboration and quality gates.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">Explore evidence <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>

          <Link key="02" href="/work/banking-modernization" className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/30">
            <p className="font-mono text-xs text-[#587f00] dark:text-signal-green">02 / ACCOUNTABILITY</p>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Knowledge-driven modernization</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Recover legacy source relationships and make generation and its limitations traceable.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">Explore evidence <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>

          <Link key="03" href="https://github.com/jandromani/A2A" className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/30">
            <p className="font-mono text-xs text-[#587f00] dark:text-signal-green">03 / ACCOUNTABILITY</p>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Agentic platform architecture</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Design orchestration, scoped tools, human approvals, observability and technical governance.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">Explore evidence <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>
          </div>
          <div className="mt-10 grid items-center gap-5 rounded-xl border border-border bg-background p-6 md:grid-cols-[1fr_auto] md:p-7">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">Recent public engineering / source inspection</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                <strong className="text-foreground">A2A</strong> is a rapid, public architecture exercise built in October 2026. Inspect its specifications, implementation, security gates, test evidence and unresolved production dependencies. Code is not proof of client deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/jandromani/A2A" target="_blank" rel="noopener noreferrer" className="rounded-md border border-border px-4 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">A2A source ↗</a>
            </div>
          </div>
        </div>
      </section>

      <FrontierShowcase />

      <HomeSignalManifesto />

      {/* Complete legacy cards remain at /systems; home is a curated introduction. */}
      <section aria-labelledby="systems-heading" className="border-t border-border bg-background">
        <div className="container mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 py-10 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal-green">Complete engineering catalogue</p>
            <h2 id="systems-heading" className="mt-2 text-2xl font-semibold text-foreground">Every system, its maturity, architecture and evidence.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              The original AI Act Middleware, Agnostic Engine, Entropic Core, PsycheOS,
              Earlier prototypes, including LLMTRACE, stay in the historical Systems catalogue and are labelled by actual maturity.
            </p>
          </div>
          <Link href="/systems" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">
            Inspect all systems <ArrowRight className="h-4 w-4" aria-hidden="true"/>
          </Link>
        </div>
      </section>

      {/* ── AI CO-EVOLUTION TEASER ─────────────────────────────── */}
      <section className="border-t border-border bg-card/20" aria-label="Technical systems atlas">
        <div className="container mx-auto max-w-6xl px-4 pb-4 pt-16 md:pt-20">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">Technical archive / systems atlas</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">The systems beneath the method.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Original interactive topology and evidence ledger, preserved from the earlier portfolio.
            These diagrams map a shared design thesis, not live runtime interconnections.
          </p>
        </div>
        <details className="group border-t border-border">
          <summary className="mx-auto flex max-w-6xl cursor-pointer flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span>Expand interactive topology and Evidence Ledger</span>
            <span className="font-mono text-xs text-signal-green group-open:hidden">OPEN +</span>
            <span className="hidden font-mono text-xs text-signal-green group-open:inline">CLOSE −</span>
          </summary>
          <HomeOperatingDossier mode="technical" />
        </details>
      </section>

      <section aria-labelledby="evolution-heading" className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" aria-hidden="true" />
        <div className="relative container max-w-6xl mx-auto px-4 py-20">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-mono text-signal-green uppercase tracking-[0.22em]">46 calendar months since Jan 2023</p>
              <h2 id="evolution-heading" className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
                The systems did not appear overnight.
              </h2>
              <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                The path began in early 2023 by forcing GPT-3.5 to preserve long-form context. The archive contains 201 technical records: 184 historical and 17 later entries. Of these, 140 are internally tagged Confirmed, 58 Strong recall and 3 Partial reconstruction. These are provenance classifications, not 201 independently verified products.
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
        <div className="flex flex-col items-start gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-signal-green">Technical field notes / published</p>
            <h2 id="writing-heading" className="mt-2 text-4xl font-bold text-foreground">Production AI, after the demo.</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Long-form engineering with inspectable architecture, explicit evidence boundaries and real related systems.</p>
          </div>
          <Link href="/writing" className="inline-flex flex-shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[.14em] text-signal-green">
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
              <div className="flex min-h-[250px] flex-col p-6"><span className="font-mono text-xs uppercase tracking-[.18em] text-signal-green">FN-{String(article.id).padStart(3,"0")} / {pillarLabels[article.pillar]}</span><h3 className={`${index===0?"text-2xl":"text-lg"} mt-4 font-mono font-bold leading-tight tracking-[-.03em]`}>{article.title}</h3><p className="mt-3 line-clamp-3 font-mono text-xs leading-5 text-white/60">{article.summary}</p><div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs text-white/55"><span>{article.wordCount.toLocaleString("en-US")} words</span><span className="text-signal-green">Read note →</span></div></div>
              {index===0&&<div className="min-h-[210px]"><SignalPattern kind={article.pillar} label={`Visual index for ${article.title}`}/></div>}
            </Link>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      <section aria-labelledby="editorial-heading" className="border-t border-border bg-card/20">
        <div className="container mx-auto grid max-w-6xl gap-7 px-4 py-14 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#587f00] dark:text-signal-green">Independent editorial publishing</p>
            <h2 id="editorial-heading" className="mt-3 text-2xl font-bold text-foreground md:text-3xl">Five magazines. One illustrated book.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">The Intelligence Ahead (50 editorial pages) and Mateo y el Algoritmo (124 original illustrated pages). Public creative work, separate from engineering deployment claims.</p>
          </div>
          <Link href="/publications" className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">Explore publications <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="relative container max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">Open to serious work</p>
              <h2 id="cta-heading" className="text-3xl font-bold text-foreground">
                Agentic systems, governance, observability.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Selective conversations about complex engineering responsibility, AI adoption and platform architecture, with specific ownership and outcomes.
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

      <RelatedEvidence id="index:home" />
    </div>
  )
}
