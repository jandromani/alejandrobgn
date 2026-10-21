import { LabCover } from "@/components/lab-cover"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, FileCode2, Network } from "lucide-react"
import { originalLabs, platformProjects } from "@/data/frontier-labs"

const selections = [
  { slug: "assetgraph", role: "Observe", why: "Decision objects, overhead tracking and evidence" },
  { slug: "robotics-radar", role: "Map", why: "Robotics supply-chain mechanisms and company scenarios" },
  { slug: "openspec", role: "Control", why: "Specification-driven agents and Pyodide in the browser" },
  { slug: "montageos", role: "Create", why: "Creative orchestration and cinematic quality gates" },
] as const

export function FrontierShowcase() {
  return (
    <section id="frontier-showcase" aria-labelledby="frontier-heading" className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[.16em] text-[#587f00] dark:text-signal-green">03 / Frontier labs & systems</p>
            <h2 id="frontier-heading" className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              The experimentation is executable.
            </h2>
            <p className="mt-5 text-sm leading-8 text-muted-foreground">
              Robotics, spatial intelligence, browser Python and agentic cinema. Original interactive
              files remain intact; the multi-file platforms have their own repositories.
            </p>
          </div>
          <Link href="/labs" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground hover:text-[#587f00] dark:hover:text-signal-green">
            All eight interactive labs <ArrowRight className="h-4 w-4" aria-hidden="true"/>
          </Link>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {selections.map(({ slug, role, why }) => {
            const lab = originalLabs.find(item => item.slug === slug)!
            return (
              <Link key={lab.slug} href={`/labs/${lab.slug}`} className="group flex flex-col overflow-hidden evidence-card transition-colors hover:border-foreground/35">
                <div className="relative h-[158px] overflow-hidden bg-[#0c1720]">
                  <LabCover slug={lab.slug} title={lab.title} family={lab.family} />
                  <span className="absolute bottom-3 left-3 rounded bg-[#0b1018]/90 px-2 py-1 font-mono text-xs text-[#b8ff5a]">{role} / ORIGINAL HTML</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-foreground">{lab.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{why}</p>
                  <span className="mt-4 inline-flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-foreground">
                    Explore original <FileCode2 className="h-4 w-4" aria-hidden="true"/>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-7 flex flex-col justify-between gap-4 rounded-xl border border-border bg-background p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">Beyond standalone HTML</p>
            <p className="mt-2 text-sm leading-7 text-foreground">
              <strong>GearWatch V6</strong> maps causal market mechanisms.
              <strong> WORLD//STATE LIVE</strong> models geopolitical observations and simulations.
              Both are linked as full repositories, not misleading single-file demos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {platformProjects.slice(0, 2).map((project) => (
              <a key={project.repo} href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">
                {project.title} <ArrowUpRight className="h-4 w-4" aria-hidden="true"/>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
