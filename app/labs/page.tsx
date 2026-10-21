import { RelatedEvidence } from "@/components/related-evidence"
import { LabCover } from "@/components/lab-cover"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, FileCode2, Github, Layers3 } from "lucide-react"
import { originalLabs, platformProjects } from "@/data/frontier-labs"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Interactive Engineering Labs",
  description: "Original, executable HTML research laboratories and inspectable engineering repositories: robotics, spatial AI, Pyodide, cinema, intelligence and agentic platforms.",
  path: "/labs",
  ogKind: "systems",
})

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden border-b border-border bg-card/20">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">Research showcase / Executable original artifacts</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Not just code. Systems you can inspect.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground">
            Eight original standalone HTML experiments — preserved, with capture and QA states rather than invented success claims — and a separate
            selection of public multi-file engineering projects. Explore both kinds of evidence without
            confusing a simulated interface, a bounded experiment and a production deployment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#original-html" className="rounded-md bg-[#90d900] px-5 py-3 text-sm font-semibold text-[#090b0f] hover:bg-[#9cec00]">Explore interactive HTML <ArrowRight className="ml-2 inline h-4 w-4" /></a>
            <a href="#platforms" className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">Inspect platform repositories</a>
            <a href="/labs/qa-report.json" target="_blank" rel="noopener noreferrer" className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">Read browser QA report ↗</a>
          </div>
          <p className="mt-6 text-xs leading-6 text-muted-foreground">
            Historical artifacts may use cached data, illustrative scenarios, CDNs, WebGL or external APIs.
            Full-screen mode can work better than an isolated preview.
          </p>
        </div>
      </header>

      <section id="original-html" aria-labelledby="labs-heading" className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:py-24">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-7 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">01 / Browser-native engineering</p>
            <h2 id="labs-heading" className="mt-3 text-3xl font-bold text-foreground md:text-4xl">Eight original HTML laboratories</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">Each lab links to its standalone HTML and lists the precise evidence, known runtime limits and local-browser QA status.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {originalLabs.map((lab) => (
            <article key={lab.slug} className="group flex flex-col overflow-hidden evidence-card transition-colors hover:border-foreground/35">
              <Link href={`/labs/${lab.slug}`} className="relative block h-[230px] overflow-hidden bg-[#0b121b]" aria-label={`Explore original ${lab.title} HTML laboratory`}>
                <LabCover slug={lab.slug} title={lab.title} family={lab.family} />
                <span className="absolute bottom-3 left-4 rounded-md border border-white/25 bg-[#070b12]/90 px-3 py-1.5 font-mono text-xs text-white">
                  ARCHIVED HTML / CAPTURE WHERE AVAILABLE
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs uppercase tracking-[.12em] text-[#587f00] dark:text-signal-green">{lab.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">{lab.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{lab.summary}</p>
                <p className="mt-4 text-xs leading-6 text-muted-foreground">{lab.evidence}</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">QA:</span> {lab.qaNote}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                  <Link href={`/labs/${lab.slug}`} className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-3 text-sm font-semibold text-background hover:opacity-85">
                    Inspect lab <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={lab.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm text-foreground hover:border-foreground/35">
                    Standalone <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="platforms" aria-labelledby="platforms-heading" className="border-y border-border bg-card/20">
        <div className="container mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">02 / Repositories with actual source</p>
            <h2 id="platforms-heading" className="mt-3 text-3xl font-bold text-foreground md:text-4xl">Platforms, not pretend single-file demos.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              GearWatch, WORLD//STATE and the platform projects have multi-file architectures.
              Here the evidence is the repository: inspect configuration, data pathways and limits.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {platformProjects.map((project) => (
              <a key={project.repo} href={project.repo} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-xl border border-border bg-background p-6 hover:border-foreground/35">
                <span className="flex items-center justify-between"><Github className="h-5 w-5 text-[#587f00] dark:text-signal-green" aria-hidden="true"/><ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" aria-hidden="true"/></span>
                <p className="mt-5 font-mono text-xs uppercase tracking-wider text-muted-foreground">{project.area}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{project.description}</p>
                <p className="mt-5 border-t border-border pt-4 font-mono text-xs text-[#587f00] dark:text-signal-green">{project.evidence}</p>
              </a>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/systems" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[#587f00] dark:hover:text-signal-green"><Layers3 className="h-4 w-4"/> Browse systems catalogue <ArrowRight className="h-4 w-4"/></Link>
            <Link href="/evolution" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Explore development history <ArrowRight className="h-4 w-4"/></Link>
          </div>
        </div>
      </section>
      <RelatedEvidence id="index:labs" />
    </div>
  )
}
