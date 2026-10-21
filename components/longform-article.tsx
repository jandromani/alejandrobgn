import { ArrowUpRight, Check, CircleAlert, Gauge, ListChecks, Quote } from "lucide-react"
import type { DeepArticle } from "@/data/article-content"

export function LongformArticle({ content }: { content: DeepArticle }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[210px_minmax(0,740px)] lg:items-start">
      <aside className="hidden lg:block lg:sticky lg:top-24">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">In this field guide</p>
        <nav aria-label="Article table of contents" className="mt-4 border-l border-border">
          {content.sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex gap-2 border-l border-transparent py-1.5 pl-3 text-xs leading-snug text-muted-foreground transition-colors hover:border-signal-green hover:text-foreground"
            >
              <span className="font-mono text-[9px] text-muted-foreground/60">{String(index + 1).padStart(2, "0")}</span>
              <span>{section.title}</span>
            </a>
          ))}
          <a href="#failure-modes" className="block border-l border-transparent py-1.5 pl-3 text-xs text-muted-foreground hover:border-signal-amber hover:text-foreground">Failure modes</a>
          <a href="#implementation" className="block border-l border-transparent py-1.5 pl-3 text-xs text-muted-foreground hover:border-signal-cyan hover:text-foreground">Implementation</a>
          <a href="#sources" className="block border-l border-transparent py-1.5 pl-3 text-xs text-muted-foreground hover:border-signal-green hover:text-foreground">Sources</a>
        </nav>
      </aside>

      <article className="min-w-0 space-y-16">
        <section className="space-y-7">
          <p className="text-xl leading-relaxed text-foreground/90 md:text-2xl">{content.standfirst}</p>
          <blockquote className="relative overflow-hidden rounded-2xl border border-signal-green/30 bg-signal-green/5 p-6 md:p-8">
            <Quote className="absolute right-5 top-5 h-12 w-12 text-signal-green/10" aria-hidden="true" />
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-green">Core thesis</p>
            <p className="relative mt-3 text-lg font-semibold leading-relaxed text-foreground">{content.thesis}</p>
          </blockquote>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <ListChecks className="h-4 w-4 text-signal-cyan" aria-hidden="true" />
              What you should leave with
            </p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {content.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal-green" aria-hidden="true" />
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {content.sections.map((section, index) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 space-y-6">
            <header className="space-y-2 border-b border-border pb-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-green">
                {section.eyebrow ?? `Chapter ${String(index + 1).padStart(2, "0")}`}
              </p>
              <h2 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">{section.title}</h2>
            </header>
            <div className="space-y-5">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 80)} className="text-base leading-8 text-foreground/82">{paragraph}</p>
              ))}
            </div>
            {section.bullets && (
              <ul className="space-y-3 rounded-xl border border-border bg-card/60 p-5 md:p-6">
                {section.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 80)} className="flex gap-3 text-sm leading-7 text-foreground/80">
                    <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal-green" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
            {section.code && (
              <div className="overflow-hidden rounded-xl border border-border bg-[#090c11]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/55">{section.code.label}</span>
                  <span className="text-[9px] font-mono text-signal-green">{section.code.language}</span>
                </div>
                <pre tabIndex={0} role="region" aria-label="Scrollable code example" className="overflow-x-auto p-5 text-xs leading-6 text-white/80"><code>{section.code.value}</code></pre>
              </div>
            )}
          </section>
        ))}

        <section id="failure-modes" className="scroll-mt-24 space-y-6">
          <header className="space-y-2 border-b border-border pb-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-amber">Operational reality</p>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Failure modes worth designing for</h2>
          </header>
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {content.failureModes.map((item) => (
              <div key={item.mode} className="grid gap-3 p-5 md:grid-cols-[150px_1fr_1fr] md:p-6">
                <p className="flex items-start gap-2 text-sm font-semibold text-foreground"><CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal-amber" aria-hidden="true" />{item.mode}</p>
                <div><p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Signal</p><p className="mt-1 text-sm leading-relaxed text-foreground/75">{item.signal}</p></div>
                <div><p className="text-[9px] font-mono uppercase tracking-wider text-signal-green">Response</p><p className="mt-1 text-sm leading-relaxed text-foreground/75">{item.response}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="scorecard" className="scroll-mt-24 space-y-6">
          <header className="space-y-2 border-b border-border pb-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-cyan">Measurement</p>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">The operating scorecard</h2>
          </header>
          <div tabIndex={0} role="region" aria-label="Scrollable technical table" className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[680px] text-left">
              <thead className="bg-secondary text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                <tr><th className="px-4 py-3">Metric</th><th className="px-4 py-3">Why it matters</th><th className="px-4 py-3">Guardrail</th></tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {content.metrics.map((item) => (
                  <tr key={item.metric} className="align-top">
                    <td className="px-4 py-4 text-sm font-semibold text-foreground">{item.metric}</td>
                    <td className="px-4 py-4 text-sm leading-relaxed text-foreground/70">{item.why}</td>
                    <td className="px-4 py-4 text-sm leading-relaxed text-foreground/70">{item.guardrail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="implementation" className="scroll-mt-24 space-y-6">
          <header className="space-y-2 border-b border-border pb-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-green">From memo to runtime</p>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Implementation sequence</h2>
          </header>
          <ol className="space-y-4">
            {content.implementation.map((item, index) => (
              <li key={item.phase} className="rounded-xl border border-border bg-card p-5 md:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-signal-green/30 bg-signal-green/10 text-xs font-mono text-signal-green">{index + 1}</span>
                  <div><h3 className="font-semibold text-foreground">{item.phase}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.outcome}</p></div>
                </div>
                <ul className="mt-4 grid gap-2 pl-12 md:grid-cols-2">
                  {item.work.map((work) => <li key={work} className="text-xs leading-relaxed text-foreground/75">— {work}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-6 rounded-2xl border border-signal-green/25 bg-signal-green/5 p-6 md:p-8">
          <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-signal-green"><Gauge className="h-4 w-4" aria-hidden="true" />Design review checklist</p>
          <div className="grid gap-3 md:grid-cols-2">
            {content.checklist.map((item) => <p key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/80"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal-green" aria-hidden="true" />{item}</p>)}
          </div>
        </section>

        <section id="sources" className="scroll-mt-24 space-y-6">
          <header className="space-y-2 border-b border-border pb-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Primary material</p>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Sources and further reading</h2>
          </header>
          <div className="grid gap-3">
            {content.sources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-signal-green/40">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{source.publisher}</p><h3 className="mt-1 font-semibold text-foreground group-hover:text-signal-green">{source.title}</h3></div><ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-signal-green" aria-hidden="true" /></div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{source.note}</p>
              </a>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
