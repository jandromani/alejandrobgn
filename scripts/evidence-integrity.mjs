#!/usr/bin/env node
/**
 * Static, offline source-integrity gate.
 * Checks the portfolio's public evidence contract; it deliberately does not
 * attempt vendor APIs, real devices, production URLs or end-to-end claims.
 */
import assert from "node:assert/strict"
import { existsSync, readFileSync, statSync } from "node:fs"
import { join, resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const read = (path) => readFileSync(join(root, path), "utf8")
const fileExists = (path) => existsSync(join(root, path))
const originalLabs = read("data/frontier-labs.ts").split("export const originalLabs:")[1]?.split("] as const")[0]
assert.ok(originalLabs, "Original Labs dataset is absent")

const slugs = [...originalLabs.matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map((m) => m[1])
const demos = [...originalLabs.matchAll(/^\s+demo:\s*"([^"]+)"/gm)].map((m) => m[1])
assert.equal(slugs.length, 8, "Public Labs count changed: update the source and evidence contract together")
assert.equal(demos.length, slugs.length, "Every original Lab needs a standalone HTML path")
assert.equal(new Set(slugs).size, slugs.length, "Duplicate Lab slugs")
for (let i = 0; i < slugs.length; i++) {
  const relative = demos[i].replace(/^\//, "")
  assert.ok(fileExists(`public/${relative}`), `Missing HTML for ${slugs[i]}: ${demos[i]}`)
}

const qa = JSON.parse(read("public/labs/qa-report.json"))
assert.equal(qa.labs.length, slugs.length, "QA manifest must cover all public Labs")
assert.match(qa.test ?? "", /DOM\/render smoke; no end-to-end/i, "QA must disclose its scope")
const qaSlugs = new Set(qa.labs.map((lab) => lab.slug))
for (const slug of slugs) {
  assert.ok(qaSlugs.has(slug), `Lab ${slug} missing in QA manifest`)
  const row = qa.labs.find((lab) => lab.slug === slug)
  assert.equal(typeof row.source_exists, "boolean", `Missing source status for ${slug}`)
  assert.equal(typeof row.rendered, "boolean", `Missing DOM status for ${slug}`)
  assert.ok(Array.isArray(row.runtime_errors), `Missing error list for ${slug}`)
  assert.ok(typeof row.limitations === "string" && row.limitations.includes("not tested"),
    `Lab ${slug} must disclose untested work`)
  if (row.cover_generated) {
    const cover = `public/labs/covers/${slug}.webp`
    assert.ok(fileExists(cover), `Claimed Chromium capture missing: ${cover}`)
    assert.ok(statSync(join(root, cover)).size > 200, `Capture is empty: ${cover}`)
  }
}
const patched = "public/labs/runtime/openspec-sdd-lab-fixed.html"
const archived = "public/labs/original/openspec-sdd-lab.html"
assert.ok(fileExists(archived) && fileExists(patched), "OpenSpec needs separate original and patched runtime files")
assert.notEqual(read(archived), read(patched), "OpenSpec patched runtime must not replace archived original")
const openSpec = qa.labs.find((lab) => lab.slug === "openspec")
assert.equal(openSpec.variant_path, patched, "OpenSpec QA must name the actual patched runtime")
assert.ok(Array.isArray(openSpec.original_source_error), "OpenSpec original error audit missing")
assert.ok(Array.isArray(openSpec.patched_runtime_errors), "OpenSpec patched runtime audit missing")
const labPage = read("app/labs/[slug]/page.tsx")
assert.match(labPage, /originalSource = lab\.archive \?\? lab\.demo/, "Archived originals must be downloadable")
assert.match(labPage, /patched=\{hasRuntimePatch\}/, "Patched viewer must be identified")

const historic = JSON.parse(read("data/evolution.json"))
const recent = read("data/evolution-late-2026.ts")
assert.equal(historic.length, 184, "Historical records changed: revise public counts and provenance labels")
assert.deepEqual(historic.map((record) => record.id), Array.from({ length: 184 }, (_, i) => i + 1),
  "Historical ledger IDs must be contiguous")
const lateCount = (recent.match(/\{date:"2026-/g) ?? []).length
const provenanceCount = (recent.match(/kind:"(?:public-repository|preserved-html|archived-document|delivery-team-account|historical-reference)"/g) ?? []).length
assert.equal(lateCount, 17, "Recent milestones changed: review homepage/evolution totals")
assert.equal(provenanceCount, lateCount, "Each recent milestone requires explicit provenance")
assert.match(read("app/page.tsx"), /201 technical records/, "V3: Homepage record total missing")
assert.match(read("app/page.tsx"), /140 are internally tagged Confirmed/, "V3: historical provenance breakdown missing")
assert.ok(!read("app/page.tsx").includes("LLMTRACE source ↗"), "V3: mock instrumentor must not be a flagship source")
assert.ok(!read("app/page.tsx").includes("43 months"), "V3: stale career history")
assert.match(read("app/evolution/page.tsx"), /201 technical records/, "Evolution ledger total is outdated")

const publications = read("app/publications/page.tsx")
const issueIds = [...publications.matchAll(/number:\s*"(00\d)"/g)].map((m) => m[1])
assert.deepEqual([...issueIds].sort(), ["001", "002", "003", "004", "005"], "Editorial issue list changed")
assert.ok(publications.includes("/mateo/leer"), "Original Mateo reader link absent")
const navbarSource = read("components/navbar.tsx")
assert.ok(navbarSource.includes('href:"/publications"') || navbarSource.includes('href: "/publications"'), "Publications omitted from navigation")

console.log(JSON.stringify({
  contract: "static/offline evidence consistency only",
  labs: slugs.length,
  qaManifestEntries: qa.labs.length,
  historicalRecords: historic.length,
  laterMilestones: lateCount,
  publicEvolutionTotal: historic.length + lateCount,
  magazineIssues: issueIds.length,
  externalValidation: "excluded",
  result: "PASS"
}, null, 2))
