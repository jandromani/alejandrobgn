import type { ReactNode } from "react"
import { ArticleDiagram } from "@/components/article-diagrams"
import { ArticleEvidenceFigure } from "@/components/article-evidence-figures"
import { SddPressFigure } from "@/components/sdd-press-figure"

type Block =
  | { type: "heading"; level: number; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "code"; language: string; value: string }
  | { type: "table"; rows: string[][] }
  | { type: "formula"; value: string }

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function isSpecial(line: string) {
  return /^#{1,3}\s/.test(line) || /^```/.test(line) || /^>\s?/.test(line) || /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line) || /^\|/.test(line) || line === "[" || line === "---"
}

function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r/g, "").split("\n")
  const raw: Block[] = []
  let i = 0
  let titleSkipped = false
  let deckSkipped = false

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line || line === "---" || /^\*Published .+Updated .+\*$/.test(line) || /^\*Alejandro Baratas\*$/.test(line)) { i++; continue }
    if (titleSkipped && !deckSkipped && /^\*\*.+\*\*$/.test(line)) { deckSkipped = true; i++; continue }

    const heading = line.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      if (!titleSkipped && heading[1].length === 1) { titleSkipped = true; i++; continue }
      const text = heading[2].replace(/\*\*/g, "")
      raw.push({ type: "heading", level: heading[1].length, text, id: slugify(text) })
      i++
      continue
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim() || "text"
      const body: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith("```")) body.push(lines[i++])
      i++
      raw.push({ type: "code", language, value: body.join("\n").trim() })
      continue
    }

    if (line === "[") {
      const body: string[] = []
      i++
      while (i < lines.length && lines[i].trim() !== "]") body.push(lines[i++].trim())
      i++
      raw.push({ type: "formula", value: body.join(" ").replace(/\\text\{([^}]+)\}/g, "$1") })
      continue
    }

    if (/^>\s?/.test(line)) {
      const body: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) body.push(lines[i++].trim().replace(/^>\s?/, ""))
      raw.push({ type: "quote", text: body.join(" ") })
      continue
    }

    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line)
      const pattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/
      const items: string[] = []
      while (i < lines.length && pattern.test(lines[i].trim())) items.push(lines[i++].trim().replace(pattern, ""))
      raw.push({ type: "list", ordered, items })
      continue
    }

    if (line.startsWith("|")) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i++].trim().replace(/^\||\|$/g, "").split("|").map(cell => cell.trim())
        if (!cells.every(cell => /^:?-{3,}:?$/.test(cell))) rows.push(cells)
      }
      raw.push({ type: "table", rows })
      continue
    }

    const body = [line]
    i++
    while (i < lines.length && lines[i].trim() && !isSpecial(lines[i].trim())) body.push(lines[i++].trim())
    raw.push({ type: "paragraph", text: body.join(" ") })
  }

  const compact: Block[] = []
  for (const block of raw) {
    const previous = compact.at(-1)
    if (block.type === "paragraph" && previous?.type === "paragraph" && previous.text.length + block.text.length < 620) {
      previous.text += ` ${block.text}`
    } else {
      compact.push(block)
    }
  }
  return compact
}

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g).filter(Boolean)
  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) return <strong key={index} className="font-semibold text-foreground">{token.slice(2, -2)}</strong>
    if (token.startsWith("`") && token.endsWith("`")) return <code key={index} className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-signal-cyan">{token.slice(1, -1)}</code>
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-signal-cyan underline decoration-signal-cyan/30 underline-offset-4 hover:decoration-signal-cyan">{link[1]}</a>
    if (token.startsWith("*") && token.endsWith("*")) return <em key={index}>{token.slice(1, -1)}</em>
    return token
  })
}

export function TechnicalArticle({ markdown, articleSlug }: { markdown: string; articleSlug: string }) {
  const blocks = parseMarkdown(markdown)
  const toc = blocks.filter((block): block is Extract<Block, { type: "heading" }> => block.type === "heading" && block.level === 1)

  return (
    <div data-article-body className="grid gap-12 lg:grid-cols-[220px_minmax(0,760px)] lg:items-start">
      <aside className="hidden lg:sticky lg:top-24 lg:block">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Field guide map</p>
        <nav aria-label="Article table of contents" className="mt-4 max-h-[72vh] overflow-y-auto border-l border-border pr-2">
          {toc.map((item, index) => (
            <a key={`${item.id}-${index}`} href={`#${item.id}`} className="group flex gap-2 border-l border-transparent py-1.5 pl-3 text-[11px] leading-snug text-muted-foreground transition-colors hover:border-signal-green hover:text-foreground">
              <span className="font-mono text-[8px] text-muted-foreground/50">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.text}</span>
            </a>
          ))}
        </nav>
      </aside>

      <article className="min-w-0">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            const Heading = block.level === 1 ? "h2" : "h3"
            return (
              <div key={`${block.id}-${index}`}>
                <Heading id={block.id} className={`${block.level === 1 ? "mb-6 mt-16 border-b border-border pb-5 text-2xl md:text-3xl" : "mb-4 mt-10 text-xl md:text-2xl"} scroll-mt-24 font-bold leading-tight text-foreground first:mt-0`}>
                  {block.text}
                </Heading>
                <ArticleDiagram headingId={block.id} articleSlug={articleSlug} />
                <ArticleEvidenceFigure headingId={block.id} articleSlug={articleSlug} />
                {articleSlug === "when-my-quality-gates-lost" && block.id === "three-human-decisions-one-enforceable-boundary" && <SddPressFigure />}
              </div>
            )
          }
          if (block.type === "paragraph") return <p key={index} className="mb-5 text-base leading-8 text-foreground/82">{inline(block.text)}</p>
          if (block.type === "quote") return <blockquote key={index} className="my-7 rounded-r-xl border-l-2 border-signal-green bg-signal-green/[0.055] px-5 py-4 text-lg font-medium leading-8 text-foreground">{inline(block.text)}</blockquote>
          if (block.type === "list") {
            const List = block.ordered ? "ol" : "ul"
            return <List key={index} className={`${block.ordered ? "list-decimal" : "list-disc"} mb-7 ml-5 space-y-2 marker:text-signal-green`}>{block.items.map((item, itemIndex) => <li key={itemIndex} className="pl-2 text-sm leading-7 text-foreground/78">{inline(item)}</li>)}</List>
          }
          if (block.type === "code") return <div key={index} className="my-7 overflow-hidden rounded-xl border border-border bg-[#080b10]"><div className="flex items-center justify-between border-b border-white/10 px-4 py-2"><span className="text-[9px] font-mono uppercase tracking-wider text-white/80">Architecture contract</span><span className="text-[9px] font-mono text-signal-green">{block.language}</span></div><pre tabIndex={0} role="region" aria-label="Scrollable code example" className="overflow-x-auto p-5 text-xs leading-6 text-white/75"><code>{block.value}</code></pre></div>
          if (block.type === "formula") return <div key={index} tabIndex={0} role="region" aria-label="Scrollable mathematical expression" className="my-7 overflow-x-auto rounded-xl border border-signal-cyan/20 bg-signal-cyan/[0.045] px-5 py-4 text-center font-mono text-sm text-signal-cyan">{block.value}</div>
          if (block.type === "table") return <div key={index} tabIndex={0} role="region" aria-label="Scrollable technical table" className="my-8 overflow-x-auto rounded-xl border border-border"><table className="w-full min-w-[620px] text-left"><thead className="bg-secondary">{block.rows[0] && <tr>{block.rows[0].map((cell, i) => <th key={i} className="px-4 py-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{inline(cell)}</th>)}</tr>}</thead><tbody className="divide-y divide-border bg-card">{block.rows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-sm leading-6 text-foreground/75">{inline(cell)}</td>)}</tr>)}</tbody></table></div>
          return null
        })}
      </article>
    </div>
  )
}
