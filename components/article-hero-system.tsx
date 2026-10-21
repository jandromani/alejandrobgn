import Link from "next/link"
import { ArrowLeft, History, UserRound } from "lucide-react"
import type { WritingArticle } from "@/data/writing"
import { pillarLabels } from "@/data/writing"
import { ArticleActions } from "@/components/article-actions"
import { ArticleFieldVisual } from "@/components/article-field-visual"

export function ArticleHeroSystem({ article, publishedDate, updatedDate, wordCount, readingMinutes, toc, evidenceBoundary }: { article:WritingArticle; publishedDate:string; updatedDate?:string|false; wordCount:number; readingMinutes:number; toc:string[]; evidenceBoundary?:string }){
  return <header className="article-instrument relative border-b border-border bg-[#07090d] text-white">
    <div className="article-rail" aria-hidden="true"><span>00</span>{[1,2,3,4,5,6,7,8].map(n=><span key={n}>{String(n).padStart(2,"0")}</span>)}<span>END</span></div>
    <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[minmax(0,1fr)_280px] lg:pl-14">
      <div className="min-w-0 px-4 pb-10 pt-10 lg:px-9">
        <Link href="/writing" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[.16em] text-white/60 transition-colors hover:text-signal-green"><ArrowLeft className="h-3 w-3"/> Writing / field notes</Link>
        <div className="mt-8 grid gap-8 xl:grid-cols-[.72fr_1.28fr] xl:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[.22em] text-signal-green">Technical field note / {pillarLabels[article.pillar]}</p>
            <h1 className="mt-5 font-mono text-[clamp(2.55rem,4.3vw,5rem)] font-bold leading-[.94] tracking-[-.065em]">{article.title}</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/68">{article.summary}</p>
            <div className="mt-7 flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full border border-signal-green/35"><UserRound className="h-3.5 w-3.5 text-signal-green"/></span><div><Link href="/about" rel="author" className="text-xs font-medium text-white hover:text-signal-green">{article.author??"Alejandro Baratas"}</Link><p className="font-mono text-xs text-white/80">Published {publishedDate}{updatedDate?` · Updated ${updatedDate}`:""}</p></div></div>
          </div>
          <div className="relative min-h-[360px]"><p className="absolute left-4 top-2 z-10 font-mono text-xs uppercase tracking-[.2em] text-white/60">The operating loop / abstract</p><ArticleFieldVisual article={article}/></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[.12em] text-white/60"><span>Pillar <strong className="font-medium text-signal-green">{pillarLabels[article.pillar]}</strong></span><span>{wordCount.toLocaleString("en-US")} words</span><span className="text-signal-green">{readingMinutes} min read</span>{article.version&&<span>Editorial v{article.version}</span>}</div><ArticleActions/></div>
      </div>
      <aside className="border-t border-white/15 px-5 py-10 lg:border-l lg:border-t-0" aria-label="Field note map">
        <p className="font-mono text-xs uppercase tracking-[.2em] text-white/65">In this field note</p>
        <ol className="mt-5">{toc.slice(0,12).map((heading,i)=><li key={`${heading}-${i}`} className="grid grid-cols-[22px_1fr_auto] border-b border-white/[.07] py-2 font-mono text-xs leading-4"><span className={i===0?"text-signal-green":"text-white/55"}>{String(i+1).padStart(2,"0")}</span><span className={i===0?"text-signal-green":"text-white/65"}>{heading}</span><span className="text-white/80">{Math.max(2,Math.round(readingMinutes/Math.min(12,toc.length)))}m</span></li>)}</ol>
        {evidenceBoundary&&<div className="mt-8 border-t border-white/15 pt-6"><p className="font-mono text-xs uppercase tracking-[.18em] text-signal-amber">Evidence boundary</p><p className="mt-3 text-[10px] leading-5 text-white/60">{evidenceBoundary}</p></div>}
        {article.changelog&&<details className="mt-7 border-t border-white/15 pt-5"><summary className="flex cursor-pointer list-none items-center gap-2 font-mono text-xs uppercase tracking-[.16em] text-white/60"><History className="h-3 w-3 text-signal-cyan"/> Editorial changelog</summary><ol className="mt-4 space-y-3">{article.changelog.map(item=><li key={`${item.date}-${item.note}`}><time className="font-mono text-xs text-signal-cyan">{item.date}</time><p className="mt-1 text-xs leading-4 text-white/58">{item.note}</p></li>)}</ol></details>}
      </aside>
    </div>
  </header>
}
