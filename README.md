# Alejandro Baratas — AI systems field portfolio

[![Live portfolio](https://img.shields.io/badge/live-alejandrobgn.vercel.app-00D9FF?style=flat-square)](https://alejandrobgn.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-111111?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Alejandro Baratas — AI Tech Lead and Agentic Systems Architect](https://alejandrobgn.vercel.app/api/og?type=profile)](https://alejandrobgn.vercel.app)

This is not a downloadable CV wrapped in a landing page. It is an evidence-led portfolio about designing, shipping and governing production AI systems: their interfaces, architectures, operating limits, traces and economic consequences.

The V2 homepage presents the ORIGINAL Pum Pum Café 3D experience (unaltered HTML), two strictly anonymous four-week enterprise cases, and FOUR real standalone HTML artifacts: Pum Pum, AssetGraph, MontageOS V6.4 and RoomForge V7. No source code or data from enterprise customers is included.

The site connects four kinds of evidence:

- **Enterprise** — cybersecurity agentic engineering and banking legacy modernization, at sector level only.
- **Labs** — four ORIGINAL independent HTML experiences with actual captured screenshots and a full-screen launch; no synthetic replacement interfaces.
- **Systems** — ten product and infrastructure case studies with deliberately honest preview states.
- **Writing** — eight long-form technical field notes on agent governance, orchestration, observability, safety, entropy and AI platform economics.
- **Evolution** — an interactive timeline that shows how earlier product, data and engineering work compounds into the current AI practice.

## Design principles

### Evidence before theatre

Every project preview identifies what the visitor is actually seeing: a real product interface, demo data, a representative workflow, an architecture diagram, a recorded execution or a live result. Conceptual visuals are never presented as production telemetry.

### The portfolio is the interface

The visual language borrows from operating consoles, research dossiers and technical field manuals. Maps, traces, diagrams and runtime views are implemented as first-class interface components—not decorative screenshots pasted over generic cards.

### Technical writing belongs inside the system

Articles include original diagrams, source trails, changelogs, related systems, reading progress and share controls. The writing and the products cross-reference each other so claims can be investigated instead of merely trusted.

## Architecture

```text
app/                    Next.js App Router pages, metadata and dynamic OG images
components/             Portfolio surfaces, diagrams and shared UI primitives
content/articles/       Long-form Markdown source material
data/                   Article metadata, expanded content and capability data
lib/                    SEO, systems, workflows and evolution models
public/projects/        Product evidence and project-specific visual assets
scripts/                SEO, image-conversion and optional visual-QA utilities
```

Notable routes:

- `/enterprise` and `/enterprise/[slug]` — anonymized four-week professional engagements
- `/labs` and `/labs/[slug]` — exact independently authored original HTML files; captures can be produced via `scripts/capture-original-htmls.mjs`.

- `/systems` and `/systems/[slug]` — system index and evidence-rich case studies
- `/writing` and `/writing/[slug]` — technical journal and long-form articles
- `/evolution` — 184-project learning timeline and capability map
- `/about` — professional lineage rendered as a systems map
- `/api/og` — dynamic Open Graph artwork for profile, system and article sharing

## Local development

Requirements: Node.js 20.9 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

Production checks:

```bash
pnpm build
pnpm typecheck
node scripts/seo-audit.mjs
node scripts/v2-validation.mjs
# optional: node scripts/visual-qa.mjs (with Chrome CDP running)
```

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI and Base UI primitives
- Recharts for data-driven views
- Vercel Analytics and Vercel deployment

## Public surfaces represented here

The portfolio links to live or published work including AI Act Middleware, Agnostic Engine, Entropic Core, PsycheOS, AI Vendor Compare, BrewMatch and LLMTRACE. Each case study states its evidence boundary and maturity level independently.

## Content and reuse

The source is public for inspection and discussion. Personal copy, project evidence, brand assets and article content remain the property of their respective owners. No open-source licence is granted by default.

---

Built and maintained by [Alejandro Baratas](https://www.linkedin.com/in/alejandro-bgn/) · [Live portfolio](https://alejandrobgn.vercel.app)


## V2 source authenticity and screenshots

All four HTML artifacts have SHA-1 Git blob integrity checks in `scripts/v2-validation.mjs`. These source files are served under `public/labs/original/`; their public routes are excluded from search indexing. Lab listing thumbnails are **static WebP screenshots captured from the original HTML**, not AI-generated screenshots or mockups. If static PNG captures are desired, launch Chrome with remote debugging and run `node scripts/capture-original-htmls.mjs http://localhost:9333 http://localhost:3000` while the site is running. This produces `public/labs/covers/*.png`. Validate the resulting screenshots visually before committing them. 

Business case numeric disclosures currently include only timeboxes and explicitly identified architectural scope counts, NOT private client output/ROI metrics. Public AssetGraph research metrics are bounded dataset-specific measurements; no claim of broadly production-ready AI or 24/7 field deployment is made.
