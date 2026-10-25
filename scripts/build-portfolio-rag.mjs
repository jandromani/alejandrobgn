// Build a public-only retrieval corpus from the pages Next.js actually rendered.
// Run after `next build`; a second build bundles the refreshed JSON into the API.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { spawn } from "node:child_process"
import { createServer } from "node:net"

const root = process.cwd()
const rendered = join(root, ".next/server/app")
const sitemap = readFileSync(join(rendered, "sitemap.xml.body"), "utf8")
const paths = [...sitemap.matchAll(/<loc>https:\/\/alejandrobgn\.vercel\.app([^<]*)<\/loc>/g)]
  .map((match) => match[1] || "/")
  .filter((path) => path !== "/ask") // A conversation cannot cite itself as evidence.
const extras = [
  "labs/original/roomforge.html", "labs/original/assetgraph.html",
  "labs/original/montageos.html", "labs/original/openspec-sdd-lab.html",
  "labs/original/robotics-investment-terminal.html", "labs/original/pumpum.html",
  "labs/original/robotics-radar.html", "labs/original/entropic-agent-lab.html",
  "anatomy/figures/factory.html", "anatomy/figures/blind-review-balance.html",
  "anatomy/figures/three-gates-press.html", "anatomy/figures/agentic.html",
  "anatomy/figures/modernization-duplicator.html",
]
const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"])
const blocks = new Set(["h1", "h2", "h3", "h4", "p", "li", "tr", "figcaption", "blockquote", "dt", "dd"])

function decode(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”" }
  return value.replace(/&(#(?:x[0-9a-f]+|[0-9]+)|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const number = entity[1]?.toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
      return Number.isInteger(number) && number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : match
    }
    return named[entity.toLowerCase()] ?? match
  })
}

function clean(value) {
  return decode(value).replace(/\s+/g, " ").trim()
}

function extract(html) {
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>|<!--[\s\S]*?-->/gi, "")
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main\s*>/i)
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/i)
  html = main?.[1] ?? body?.[1] ?? html
  const stack = []
  const result = []
  let active = null
  let section = "Overview"
  let anchor = ""
  let title = ""
  let pendingNumber = ""
  for (const token of html.match(/<[^>]*>|[^<]+/g) ?? []) {
    if (!token.startsWith("<")) {
      if (active && !stack.some((node) => node.skip)) active.text += " " + token
      continue
    }
    const tagMatch = token.match(/^<\s*(\/?)\s*([a-z][\w:-]*)/i)
    if (!tagMatch) continue
    const tag = tagMatch[2].toLowerCase()
    if (tagMatch[1]) {
      if (active?.tag === tag) {
        const text = clean(active.text)
        if (/^[\d,.]+(?:\s*\/\s*[\d,.]+)?$/.test(text)) pendingNumber = text
        else if (text.length >= 8 && !/^(?:open|close|explore|learn more|back|next)$/i.test(text)) {
          if (tag.startsWith("h")) {
            section = text
            anchor = active.anchor
            if (!title && tag === "h1") title = text
          } else {
            result.push({ section, anchor, text: pendingNumber ? `${pendingNumber} ${text}` : text })
            pendingNumber = ""
          }
        }
        active = null
      }
      const last = stack.map((node) => node.tag).lastIndexOf(tag)
      if (last >= 0) stack.length = last
      continue
    }
    const id = token.match(/\bid=(?:"([^"]+)"|'([^']+)')/i)?.[1] ?? token.match(/\bid=(?:"([^"]+)"|'([^']+)')/i)?.[2] ?? ""
    const skip = ["script", "style", "nav", "footer", "svg", "iframe", "canvas", "noscript", "form", "button", "template"].includes(tag) || stack.some((node) => node.skip)
    if (!voidTags.has(tag) && !/\/\s*>$/.test(token)) stack.push({ tag, id, skip })
    if (skip || !blocks.has(tag) || active) continue
    const parentId = [...stack].reverse().find((node) => node.id)?.id
    active = { tag, anchor: tag.startsWith("h") ? id || parentId || anchor : anchor, text: "" }
  }
  return { title, blocks: result }
}

function chunksFor(page, sourceType, html) {
  const { title, blocks } = extract(html)
  if (!title && blocks.length === 0) throw new Error(`No visible content: ${page}`)
  const chunks = []
  let current = null
  function flush() {
    if (current && current.text.length >= 45) {
      const { anchor: _anchor, ...chunk } = current
      chunks.push(chunk)
    }
    current = null
  }
  for (const block of blocks) {
    if (!current || current.section !== block.section || current.anchor !== block.anchor || (current.text + block.text).length > 1250) {
      flush()
      current = { url: page + (block.anchor ? `#${encodeURIComponent(block.anchor)}` : ""), page, title: title || page.split("/").pop(), section: block.section, anchor: block.anchor, text: "", sourceType }
    }
    current.text += (current.text ? " " : "") + block.text
  }
  flush()
  return chunks
}

const pages = []
const dynamic = []
for (const path of paths) {
  const file = join(rendered, `${path === "/" ? "index" : path.slice(1)}.html`)
  if (existsSync(file)) pages.push({ path, sourceType: "page", html: readFileSync(file, "utf8") })
  else dynamic.push(path)
}
if (dynamic.length) {
  const port = await new Promise((resolve, reject) => {
    const server = createServer()
    server.once("error", reject)
    server.listen(0, "127.0.0.1", () => {
      const address = server.address()
      server.close(() => resolve(address.port))
    })
  })
  const launcher = `const os=require('node:os');os.networkInterfaces=()=>({lo:[{address:'127.0.0.1',family:'IPv4',internal:true}]});process.argv=['node','next','start','-p','${port}','-H','127.0.0.1'];require('next/dist/bin/next')`
  const server = spawn(process.execPath, ["-e", launcher], { cwd: root, stdio: "ignore" })
  try {
    for (let attempt = 0; attempt < 60; attempt++) {
      try {
        const response = await fetch(`http://127.0.0.1:${port}/`)
        if (response.ok) break
      } catch { /* server is still starting */ }
      if (server.exitCode !== null) throw new Error("Next server exited while building the RAG corpus")
      if (attempt === 59) throw new Error("Next server did not become ready")
      await new Promise((resolve) => setTimeout(resolve, 200))
    }
    for (const path of dynamic) {
      const response = await fetch(`http://127.0.0.1:${port}${path}`)
      if (!response.ok) throw new Error(`Cannot render sitemap page ${path}: HTTP ${response.status}`)
      pages.push({ path, sourceType: "page", html: await response.text() })
    }
  } finally {
    server.kill("SIGTERM")
  }
}
for (const extra of extras) {
  const file = join(root, "public", extra)
  if (!existsSync(file)) throw new Error(`Public exhibit missing: ${extra}`)
  pages.push({ path: `/${extra}`, sourceType: extra.startsWith("anatomy/") ? "figure" : "lab", html: readFileSync(file, "utf8") })
}
const chunks = pages.flatMap(({ path, sourceType, html }) => chunksFor(path, sourceType, html))
  .map((chunk, index) => ({ id: index + 1, ...chunk }))
const included = new Set(chunks.map((chunk) => chunk.page))
const missing = pages.filter(({ path }) => !included.has(path)).map(({ path }) => path)
if (missing.length) throw new Error(`Pages without searchable text: ${missing.join(", ")}`)
const output = join(root, ".generated/portfolio-rag-index.json")
mkdirSync(join(root, ".generated"), { recursive: true })
writeFileSync(output, JSON.stringify({ version: 1, pages: pages.length, chunks }, null, 2) + "\n")
console.log(`Indexed ${pages.length} public routes and exhibits into ${chunks.length} grounded passages (${(readFileSync(output).length / 1024).toFixed(0)} KiB).`)
