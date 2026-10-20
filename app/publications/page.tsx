import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, BookOpen, Newspaper, PenLine } from "lucide-react"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Editorial Publications · The Intelligence Ahead and Mateo",
  description: "Five independent AI magazine issues, fifty editorial pages and the original 124-page visual book Mateo y el Algoritmo.",
  path: "/publications",
  ogKind: "writing",
})

const issues = [
  { number: "005", title: "The Memory Ahead", subtitle: "El fin de olvidar", subject: "AI and memory" },
  { number: "004", title: "The Human Ahead", subtitle: "Lo que no se automatiza", subject: "Humans and work" },
  { number: "003", title: "The Embodied Data Ahead", subtitle: "Embodied intelligence", subject: "Robotics and data" },
  { number: "002", title: "0 → 1.000.000.000", subtitle: "La economía del billón de robots", subject: "Robotics economics" },
  { number: "001", title: "2027", subtitle: "Cuando la IA deja de ser un chatbot", subject: "Beyond chat" },
] as const

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/20">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">Editorial work / Independent publishing</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Ideas deserve engineering. They also deserve a story.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
            The Intelligence Ahead examines AI, robotics, society, memory and the systems that come next.
            Mateo y el Algoritmo translates part of that curiosity into an illustrated long-form reading experience.
            This is editorial work, separate from production-system claims.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="https://intelligence-ahead.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#90d900] px-5 py-3 text-sm font-semibold text-[#090b0f]">
              Open the publication <ArrowUpRight className="h-4 w-4" aria-hidden="true"/>
            </a>
            <a href="https://github.com/jandromani/IntelligenceAhead" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground">
              Inspect the original project <ArrowUpRight className="h-4 w-4" aria-hidden="true"/>
            </a>
          </div>
        </div>
      </header>

      <section aria-labelledby="issues-heading" className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-7">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">01 / Magazine</p>
            <h2 id="issues-heading" className="mt-3 text-3xl font-bold text-foreground md:text-4xl">The Intelligence Ahead</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Five published issues · 50 editorial pages · independent publication</p>
          </div>
          <a href="https://intelligence-ahead.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[#587f00] dark:hover:text-signal-green">
            Browse original issues <ArrowUpRight className="h-4 w-4"/>
          </a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <a key={issue.number} href="https://intelligence-ahead.vercel.app/" target="_blank" rel="noopener noreferrer" className="group flex min-h-[295px] flex-col justify-between overflow-hidden rounded-xl border border-border bg-[#0b111a] p-6 text-white hover:border-[#a3e635]">
              <div className="flex items-center justify-between">
                <Newspaper className="h-5 w-5 text-[#b8ff5a]" aria-hidden="true"/>
                <p className="font-mono text-xs uppercase tracking-widest text-[#b8ff5a]">Nº {issue.number}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[.14em] text-white/55">{issue.subject}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight">{issue.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{issue.subtitle}</p>
              </div>
              <p className="flex items-center justify-between border-t border-white/15 pt-4 font-mono text-xs text-white/75">
                Independent issue <ArrowUpRight className="h-4 w-4 text-[#b8ff5a]"/>
              </p>
            </a>
          ))}
        </div>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">
          Issue titles and publication counts are taken from the public source repository. Each card opens
          the actual editorial publication; these typography cards are not claimed to be facsimile covers.
        </p>
      </section>

      <section aria-labelledby="mateo-heading" className="border-y border-border bg-card/20">
        <div className="container mx-auto grid max-w-6xl gap-9 px-4 py-16 md:grid-cols-[1.1fr_.9fr] md:items-center md:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">02 / Illustrated long-form book</p>
            <h2 id="mateo-heading" className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Mateo y el Algoritmo</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              An original visual book with a public 124-page interactive reader. The landing,
              actual page images and press materials are available at the editorial project's live site.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://intelligence-ahead.vercel.app/mateo/leer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background">
                <BookOpen className="h-4 w-4"/> Read original pages <ArrowUpRight className="h-4 w-4"/>
              </a>
              <a href="https://intelligence-ahead.vercel.app/mateo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground">
                About the book <ArrowUpRight className="h-4 w-4"/>
              </a>
            </div>
          </div>
          <a href="https://intelligence-ahead.vercel.app/mateo" target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-xl border border-border bg-[#12171e]">
            <img src="https://intelligence-ahead.vercel.app/mateo/og-mateo.jpg" alt="Original Mateo y el Algoritmo project social artwork" width="1200" height="630" loading="lazy" className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"/>
            <div className="flex items-center justify-between px-5 py-4 text-sm font-semibold text-white"><span>Actual project artwork</span><ArrowUpRight className="h-4 w-4"/></div>
          </a>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-xl border border-border bg-card p-7">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#587f00] dark:text-signal-green"><PenLine className="h-4 w-4"/> Technical field notes</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">The engineering writing remains separate.</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">Read architectures, governance, observability and implementation lessons in the original technical journal.</p>
          </div>
          <Link href="/writing" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">Explore technical writing <ArrowRight className="h-4 w-4"/></Link>
        </div>
      </section>
    </main>
  )
}
