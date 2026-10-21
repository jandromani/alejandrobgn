#!/usr/bin/env node
import assert from "node:assert/strict"
import { existsSync, readFileSync, statSync } from "node:fs"
import { resolve, join } from "node:path"

const root = resolve(import.meta.dirname, "..")
const exists = (p) => existsSync(join(root, p))
const read = (p) => readFileSync(join(root, p), "utf8")
const requireFile = (p) => assert.ok(exists(p), `Missing required site file: ${p}`)

const routes = [
  "app/atlas/page.tsx", "app/atlas/graph.json/route.ts", "app/work/page.tsx",
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
assert.ok(nav.includes('href:"/atlas"'), "Atlas missing from explore navigation")
assert.ok(nav.includes('href:"/work"'), "Enterprise work missing from main navigation")
assert.ok(!nav.includes('role="menubar"') && !nav.includes('role="menuitem"'), "Navigation must not use application-menu ARIA")
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

import { readdirSync } from "node:fs"
function walkPages(dir) {
  for (const item of readdirSync(join(root,dir),{withFileTypes:true})) {
    const path=dir+"/"+item.name
    if (item.isDirectory()) walkPages(path)
    else if (item.name==="page.tsx") {
      const source=read(path)
      assert.ok(!source.includes("<main ") && !source.includes("<main>"), "Nested main landmark in "+path)
    }
  }
}
walkPages("app")
for (const path of ["components/home-operating-dossier.tsx","components/portfolio-atlas-explorer.tsx","components/engineering-anatomy.tsx"]) {
  const source=read(path)
  for (const size of [8,9,10,11]) assert.ok(!source.includes("text-["+size+"px]"), "Unreadable microtype: "+path)
}
assert.ok(read("components/portfolio-atlas-explorer.tsx").includes('id="atlas-mobile-node"'), "Native mobile Atlas selector missing")
assert.ok(read("components/engineering-anatomy.tsx").includes('aria-label="Anatomy process steps"'), "Touch Anatomy controls missing")
for (const path of ["app/meet/layout.tsx","app/thesis/layout.tsx","app/venture-lab/layout.tsx"]) {
  assert.ok(read(path).includes("index: false"), "Expected legacy/utility noindex missing: "+path)
}
for (const path of ["/thesis","/venture-lab","/meet"]) {
  assert.ok(!sitemap.includes('absoluteUrl("'+path+'")'), "Noindex route advertised in sitemap: "+path)
}

console.log(JSON.stringify({ result:"PASS", checks:"offline source integrity, internal links, canonical URL, interactive Anatomy and semantic graph", externalValidation:"not included" }))
