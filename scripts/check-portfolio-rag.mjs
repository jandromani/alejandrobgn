import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const index = JSON.parse(readFileSync(join(root, ".generated/portfolio-rag-index.json"), "utf8"))
const sitemap = readFileSync(join(root, ".next/server/app/sitemap.xml.body"), "utf8")
const listed = [...sitemap.matchAll(/<loc>https:\/\/alejandrobgn\.vercel\.app([^<]*)<\/loc>/g)]
  .map((match) => match[1] || "/").filter((path) => path !== "/ask")
const pages = new Set(index.chunks.map((chunk) => chunk.page))
const missing = listed.filter((path) => !pages.has(path))
const bad = []
for (const chunk of index.chunks) {
  if (/<script|<style|__next_f|sk-or-v1-/i.test(chunk.text)) bad.push(`Unclean passage ${chunk.id}`)
  if (!chunk.url.startsWith(chunk.page)) bad.push(`URL mismatch ${chunk.id}`)
  const anchor = chunk.url.split("#")[1]
  if (!anchor) continue
  const file = chunk.page.startsWith("/labs/original/") || chunk.page.startsWith("/anatomy/figures/")
    ? join(root, "public", chunk.page.slice(1))
    : join(root, ".next/server/app", `${chunk.page.slice(1)}.html`)
  if (existsSync(file) && !readFileSync(file, "utf8").includes(`id="${decodeURIComponent(anchor)}"`)) bad.push(`Broken anchor ${chunk.url}`)
}
if (missing.length || bad.length || pages.size < 50 || index.chunks.length < 500 || pages.has("/ask")) {
  throw new Error(`RAG index gate failed: ${JSON.stringify({ pages: pages.size, passages: index.chunks.length, missing, bad: bad.slice(0, 12) })}`)
}
console.log(`RAG gate passed: ${pages.size} public routes and exhibits, ${index.chunks.length} passages; all sitemap pages covered.`)
