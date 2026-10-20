# Alejandro Baratas — AI systems field portfolio

[![Live portfolio](https://img.shields.io/badge/live-alejandrobgn.vercel.app-00D9FF?style=flat-square)](https://alejandrobgn.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-111111?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Alejandro Baratas — AI Tech Lead and Agentic Systems Architect](https://alejandrobgn.vercel.app/api/og?type=profile)](https://alejandrobgn.vercel.app)

This is not a downloadable CV wrapped in a landing page. It is an evidence-led portfolio about designing, shipping and governing production AI systems: their interfaces, architectures, operating limits, traces and economic consequences.

The site connects four kinds of evidence:

- **Systems** — product and infrastructure case studies with deliberately honest preview states.
- **Labs** — eight original browser artifacts, their captured interfaces, and explicit runtime/QA limitations.
- **Writing** — eight long-form technical field notes on agent governance, orchestration, observability, safety, entropy and AI platform economics.
- **Evolution** — 201 documented records: 184 reconstructed historical entries and 17 later milestones, each presented with its evidence limits rather than as equivalent products.

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

- `/systems` and `/systems/[slug]` — system index and evidence-rich case studies
- `/atlas` and `/atlas/graph.json` — interactive, strongly connected editorial evidence graph and public machine-readable manifest
- `/writing` and `/writing/[slug]` — technical journal and long-form articles
- `/evolution` — 201-record learning timeline and capability map (184 historical reconstructions + 17 later milestones)
- `/labs` and `/labs/[slug]` — eight preserved standalone HTML experiments, Chromium captures and scope-limited QA notes
- `/publications` — independent editorial issues and the original Mateo visual-book reader
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
node scripts/evidence-integrity.mjs
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
