#!/usr/bin/env node
import assert from "node:assert/strict"
import { existsSync, readFileSync, statSync } from "node:fs"
import { resolve, join } from "node:path"

const root = resolve(import.meta.dirname, "..")
const exists = (p) => existsSync(join(root, p))
const read = (p) => readFileSync(join(root, p), "utf8")
const requireFile = (p) => assert.ok(exists(p), `Missing required site file: ${p}`)

const routes = [
  "app/atlas/page.tsx", "app/atlas/graph.json/route.ts",
  "app/work/cybersecurity-ai-engineering/page.tsx",
  "app/work/banking-modernization/page.tsx",
  "app/labs/[slug]/page.tsx",
  "app/systems/[slug]/page.tsx",
  "app/writing/[slug]/page.tsx",
]
routes.forEach(requireFile)
for (const [slug, variant, casePath] of [
  ["agentic", "delivery", "app/work/cybersecurity-ai-engineering/page.tsx"],
  ["factory", "modernization", "app/work/banking-modernization/page.tsx"],
]) {
  const asset = `public/anatomy/figures/${slug}.html`
  requireFile(asset)
  assert.ok(statSync(join(root, asset)).size > 20000, `Anatomy generated HTML is unexpectedly small: ${asset}`)
  assert.match(read(asset), /data-moving-pin/, `Original Anatomy SVG controls missing: ${slug}`)
  const page = read(casePath)
  assert.ok(page.includes(`<EngineeringAnatomy variant="${variant}"`), `New interactive explainer not wired: ${variant}`)
  assert.ok(page.includes(`src="/anatomy/figures/${slug}.html"`), `Preserved Anatomy original not reachable: ${slug}`)
  assert.ok(page.includes('id="anatomy"'), `Deep link #anatomy missing: ${casePath}`)
}
for (const page of routes.filter((p) => p.includes("[slug]") || p.includes("/work/"))) {
  assert.ok(read(page).includes("<RelatedEvidence "), `Crawlable cross-reference cards missing: ${page}`)
}
const nav = read("components/navbar.tsx")
const footer = read("components/footer.tsx")
const sitemap = read("app/sitemap.ts")
assert.ok(nav.includes('href: "/atlas"'), "Atlas missing from main navigation")
assert.ok(footer.includes('href="/atlas"'), "Atlas missing from footer")
assert.ok(sitemap.includes('absoluteUrl("/atlas")'), "Atlas missing from sitemap")
const seo = read("lib/seo.ts")
assert.match(seo, /https:\/\/alejandrobgn\.vercel\.app/, "Canonical domain unexpectedly changed")
const llms = read("public/llms.txt")
assert.match(llms, /\/atlas\/graph\.json/, "Machine-readable atlas missing from llms.txt")
assert.ok(!/https:\/\/(?:alejandrobgn-v2-review|alejandro-bgn-portfolio)\.vercel\.app/.test(llms),
  "Preview hostname leaked into canonical LLM site map")
const client = read("components/engineering-anatomy.tsx")
for (const field of ["onClick", "onKeyDown", "aria-pressed", "setOpen", "setSelected"]) {
  assert.ok(client.includes(field), `Anatomy accessibility/interaction regression: ${field}`)
}
console.log(JSON.stringify({ result:"PASS", checks:"offline source integrity, internal links, canonical URL, interactive Anatomy and semantic graph", externalValidation:"not included" }))
