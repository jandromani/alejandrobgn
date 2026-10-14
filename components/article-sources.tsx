import { ArrowUpRight, BookOpen } from "lucide-react"
import type { ArticleSource } from "@/data/article-content"

export function ArticleSources({ sources }: { sources: ArticleSource[] }) {
  if (!sources.length) return null
  return (
    <section id="sources" className="ml-auto max-w-[760px] scroll-mt-24 space-y-5">
      <header className="border-b border-border pb-4">
        <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground"><BookOpen className="h-4 w-4 text-signal-cyan" />Primary material</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground">Sources and further reading</h2>
      </header>
      <div className="grid gap-3">
        {sources.map(source => (
          <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-signal-cyan/45">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{source.publisher}</p><h3 className="mt-1 font-semibold text-foreground group-hover:text-signal-cyan">{source.title}</h3></div>
              <ArrowUpRight className="h-4 w-4 flex-none text-muted-foreground group-hover:text-signal-cyan" />
            </div>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{source.note}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

