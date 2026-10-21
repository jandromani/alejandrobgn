# Alejandro Baratas — AI systems field portfolio

[![Live portfolio](https://img.shields.io/badge/live-alejandrobgn.vercel.app-00D9FF?style=flat-square)](https://alejandrobgn.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-111111?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Alejandro Baratas — AI Tech Lead and Agentic Systems Architect](https://alejandrobgn.vercel.app/api/og?type=profile)](https://alejandrobgn.vercel.app)

A professional evidence portfolio about engineering reviewable AI systems: enterprise delivery, modernization decisions, governed execution and the difference between a tested reference system and a customer-production deployment. Leadership is evaluated through decisions, evidence and limits—not product count.

The portfolio keeps these non-equivalent evidence tiers separate:

- **Enterprise work** — two sector-anonymized delivery engagements with responsibility, trade-offs and evidence boundaries.
- **Engineering proof** — [A2A governed-agent reference](/engineering/a2a) with public CI and ADRs, plus [modular delivery patterns](/engineering/delivery-systems).
- **Systems** — product/prototype catalogue with explicitly disclosed maturity and interface provenance; historical LLMTRACE is not a flagship.
- **Labs** — eight original browser artifacts, their captured interfaces, and explicit runtime/QA limitations.
- **Writing** — eight long-form technical field notes on agent governance, orchestration, observability, safety, entropy and AI platform economics.
- **Evolution** — 201 technical records (184 historical + 17 later), internally classified as 140 Confirmed, 58 Strong recall and 3 Partial reconstruction; not 201 externally validated products.

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

- `/work` — two anonymized enterprise cases and their proof boundaries
- `/engineering/a2a` — public architecture, decisions and test evidence
- `/engineering/delivery-systems` — modular context, knowledge and specification quality controls
- `/systems` and `/systems/[slug]` — catalogue of prototypes and systems by maturity
- `/atlas` and `/atlas/graph.json` — interactive, strongly connected editorial evidence graph and public machine-readable manifest
- `/writing` and `/writing/[slug]` — technical journal and long-form articles
- `/evolution` — 201-record learning archive (184 historical + 17 later, with provenance labels)
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

The portfolio links to technical demonstrations including AI Act Middleware, Agnostic Engine, Entropic Core, PsycheOS, AI Vendor Compare and BrewMatch. LLMTRACE is retained as a historical mock-based alpha with explicit disclosure. No repository or project count implies product or production maturity.

Claim ledger: [source-level evidence criteria](docs/v3-evidence-ledger.md) · [permission and measurement kit](docs/v3-evidence-request-kit.md) · [independent-reader study](docs/f5-human-validation.md).

## Content and reuse

The source is public for inspection and discussion. Personal copy, project evidence, brand assets and article content remain the property of their respective owners. No open-source licence is granted by default.

---

Built and maintained by [Alejandro Baratas](https://www.linkedin.com/in/alejandro-bgn/) · [Live portfolio](https://alejandrobgn.vercel.app)
