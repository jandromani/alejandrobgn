"use client"

import { useState } from "react"
import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { articles, pillarLabels, type WritingPillar, getArticlesByPillar } from "@/data/writing"
import { SignalPattern } from "@/components/signal-pattern"

const pillars: WritingPillar[] = ["ai-governance", "ai-engineering", "agentic-enterprise", "ai-economics", "architecture", "building-public"]
const colors: Record<WritingPillar, string> = { "agentic-enterprise":"#b8ff5a", "ai-governance":"#b8ff5a", "ai-engineering":"#22d3ee", "building-public":"#f3f0e8", "ai-economics":"#fbbf24", "future-work":"#a78bfa", architecture:"#60a5fa", "product-experiments":"#b8ff5a" }
const shortLabels: Record<WritingPillar,string> = { "agentic-enterprise":"Orchestration", "ai-governance":"Governance", "ai-engineering":"Observability", "building-public":"Building in public", "ai-economics":"Economics", "future-work":"Future work", architecture:"Architecture", "product-experiments":"Experiments" }

function readingTime(words:number){ return `${Math.max(1,Math.ceil(words/210))} min read` }

export function WritingIndex(){
  const [selected,setSelected]=useState<WritingPillar|null>(null)
  const displayed=selected?getArticlesByPillar(selected):[...articles].sort((a,b)=>+new Date(b.published)-+new Date(a.published))
  const [featured,...rest]=displayed
  return <main className="writing-journal min-h-screen bg-background">
    <header className="relative overflow-hidden border-b border-border">
      <div className="journal-registration" aria-hidden="true"/>
      <div className="container relative mx-auto grid max-w-[1320px] gap-10 px-4 py-12 md:grid-cols-[1.35fr_.65fr] md:items-center md:py-14">
        <div className="md:border-r md:border-border md:pr-12">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.24em] text-signal-green">Writing / field notes</p>
          <h1 className="mt-4 max-w-3xl font-mono text-[clamp(3rem,5.4vw,5.2rem)] font-bold leading-[.94] tracking-[-.065em] text-foreground">Production AI,<br/>after the demo.</h1>
          <p className="mt-4 max-w-[560px] font-mono text-[12px] leading-6 text-muted-foreground">Field notes on building governable, observable, economic AI systems that compound.</p>
        </div>
        <nav aria-label="Topics index" className="md:pl-2">
          <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[.18em] text-muted-foreground"><span>Topics index</span><button onClick={()=>setSelected(null)} className={selected?"text-signal-green":"pointer-events-none opacity-45"}>All / {articles.length.toString().padStart(2,"0")}</button></div>
          <div className="mt-4">{pillars.map((pillar,i)=>{const count=articles.filter(a=>a.pillar===pillar).length; return <button key={pillar} onClick={()=>setSelected(selected===pillar?null:pillar)} aria-pressed={selected===pillar} className="group grid w-full grid-cols-[20px_1fr_auto] items-center border-b border-dashed border-border py-2.5 text-left font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"><span style={{color:colors[pillar]}}>▪</span><span><span className="mr-2 text-[8px] opacity-45">{String(i+1).padStart(2,"0")}</span>{shortLabels[pillar]}</span><span className={selected===pillar?"text-signal-green":"opacity-55"}>{String(count).padStart(2,"0")}</span></button>})}</div>
        </nav>
      </div>
    </header>

    <div className="container mx-auto max-w-[1320px] px-4 py-8">
      {!featured?<p className="py-24 text-center font-mono text-sm text-muted-foreground">No field notes in this category.</p>:<>
        <Link href={`/writing/${featured.slug}`} className="journal-feature group relative block overflow-hidden border border-border bg-[#07090d] text-white transition-colors hover:border-signal-green/50">
          <div className="absolute inset-y-0 right-0 w-[62%] opacity-90 md:w-[68%]"><SignalPattern kind={featured.pillar} label={`Signal architecture for ${featured.title}`}/></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090d] via-[#07090d]/95 via-45% to-transparent"/>
          <div className="relative z-10 flex min-h-[260px] max-w-[630px] flex-col p-6 md:p-8">
            <p className="font-mono text-[8px] uppercase tracking-[.2em] text-signal-green">Featured field note <span className="ml-4 text-white/55">FN-{String(featured.id).padStart(3,"0")}</span></p>
            <h2 className="mt-5 font-mono text-2xl font-bold leading-tight tracking-[-.035em] md:text-4xl">{featured.title}</h2>
            <p className="mt-3 max-w-lg font-mono text-[11px] leading-5 text-white/62">{featured.summary}</p>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 font-mono text-[8px] uppercase tracking-[.1em] text-white/60"><span>Status <strong className="ml-2 font-medium text-signal-green">Published</strong></span><span>Reading time <strong className="ml-2 font-medium text-white/70">{readingTime(featured.wordCount)}</strong></span><span>Related {featured.linkedSystems?.slice(0,1).join("")}</span></div>
          </div>
          <span className="absolute bottom-6 right-6 z-10 flex items-center gap-2 font-mono text-[9px] text-signal-green">Read field note <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"/></span>
        </Link>

        <div className="mt-7 flex items-center justify-between border-y border-border py-3 font-mono text-[8px] uppercase tracking-[.18em] text-muted-foreground"><span>{selected?shortLabels[selected]:"Field notes"} / {displayed.length.toString().padStart(2,"0")}</span><span>Sort · newest first</span></div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">{rest.map((article,i)=><Link key={article.slug} href={`/writing/${article.slug}`} className="journal-card group relative grid min-h-[170px] overflow-hidden border border-border bg-[#080b0f] text-white transition-colors hover:border-[var(--article-color)] md:grid-cols-[1.1fr_.9fr]" style={{"--article-color":colors[article.pillar]} as CSSProperties}>
          <div className="relative z-10 flex flex-col p-5"><div className="flex items-center gap-4 font-mono text-[8px] uppercase tracking-[.14em]"><span className="text-white/55">FN-{String(i+2).padStart(3,"0")}</span><span style={{color:colors[article.pillar]}}>{shortLabels[article.pillar]}</span></div><h2 className="mt-3 max-w-[390px] font-mono text-lg font-bold leading-snug tracking-[-.03em]">{article.title}</h2><p className="mt-2 line-clamp-2 font-mono text-[9px] leading-4 text-white/60">{article.summary}</p><div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[8px] text-white/55"><span className="text-signal-green">Published</span><span>{readingTime(article.wordCount)}</span></div></div>
          <div className="relative min-h-[120px] opacity-90"><SignalPattern kind={article.pillar} label={`Signal architecture for ${article.title}`}/></div>
          <ArrowRight className="absolute bottom-4 right-4 h-3.5 w-3.5 text-white/45 transition-all group-hover:translate-x-1 group-hover:text-white"/>
        </Link>)}</div>
      </>}
    </div>
  </main>
}
