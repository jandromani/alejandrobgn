"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { AnimatedFigureFrame } from "@/components/animated-figure-frame"

const figures = [
  {
    number: "01", label: "Three gates", title: "A change must earn its archive decision",
    context: "The SDD Kit makes readiness, completion and adversarial review visible. Sabotage mode is illustrative; in the historical seeded test the entry gate returned NOT READY for all four remaining defects.",
    src: "/anatomy/figures/three-gates-press.html", source: "/writing/when-my-quality-gates-lost", sourceLabel: "SDD field note",
    boundary: "Animated model: the gates do not execute real checks, authorize a change or prove that a person signed it.",
  },
  {
    number: "02", label: "Blind review", title: "Two scored comparisons lost",
    context: "A balance replays the two scored plan comparisons, 23–28 and 26–28. Its third beat is an illustration, not another scored loss.",
    src: "/anatomy/figures/blind-review-balance.html", source: "/writing/when-my-quality-gates-lost", sourceLabel: "Experiment and findings",
    boundary: "AI-agent judges assessed plans with partial blinding; the experiment does not measure general productivity.",
  },
  {
    number: "03", label: "Repeatable copies", title: "Reproducibility is one proof, not a migration",
    context: "The banking PoC links 22,995 evidence records to file, line and hash, and compares 4,338 files from two bounded factory runs.",
    src: "/anatomy/figures/modernization-duplicator.html", source: "/work/banking-modernization", sourceLabel: "Banking modernization case",
    boundary: "This does not establish functional parity, production rollout or estate-wide results.",
  },
] as const

export function HomeEvidenceFigures() {
  const [selected, setSelected] = useState(0)
  const active = figures[selected]

  return <section aria-labelledby="figures-title" className="border-b border-border bg-card/20">
    <div className="container mx-auto max-w-6xl px-4 py-14 md:py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">02 / Animated evidence</p>
      <h2 id="figures-title" className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">See the decisions behind the results</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">Three interactive Anatomy figures turn the method, its losses and the modernization proof boundary into scenes you can inspect. Choose a figure, play its chapters or open it full size.</p>
      <div role="group" aria-label="Choose an interactive figure" className="mt-7 grid gap-3 sm:grid-cols-3">
        {figures.map((figure, index) => <button type="button" key={figure.number} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-controls="selected-evidence-figure" className={`rounded-lg border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === index ? "border-[#5b8f00] bg-[#90d900]/15" : "border-border bg-background hover:border-foreground/40"}`}><span className="font-mono text-xs uppercase tracking-wider text-[#476700] dark:text-signal-green">Fig {figure.number} / {figure.label}</span><span className="mt-2 block text-sm font-semibold leading-6 text-foreground">{figure.title}</span></button>)}
      </div>
      <figure id="selected-evidence-figure" className="mt-5 overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-border px-5 py-5 sm:px-7">
          <div className="max-w-2xl"><figcaption className="text-xl font-semibold text-foreground">{active.title}</figcaption><p className="mt-2 text-sm leading-7 text-muted-foreground">{active.context}</p></div>
          <a href={active.src} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4">Open full size <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <AnimatedFigureFrame key={active.src} src={active.src} title={`Animated Anatomy figure: ${active.title}`} />
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-5 text-xs leading-6 text-muted-foreground sm:px-7"><span className="max-w-2xl"><strong className="text-foreground">Proof boundary:</strong> {active.boundary}</span><Link href={active.source} className="inline-flex items-center gap-1 font-semibold text-foreground underline underline-offset-4">Read {active.sourceLabel} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link></div>
      </figure>
    </div>
  </section>
}
