export type WritingPillar = 
  | "agentic-enterprise"
  | "ai-governance"
  | "ai-engineering"
  | "building-public"
  | "ai-economics"
  | "future-work"
  | "architecture"
  | "product-experiments"

export interface WritingArticle {
  id: string | number
  slug: string
  title: string
  pillar: WritingPillar
  summary: string
  published: string
  linkedSystems?: string[]
  featured?: boolean
  wordCount: number
  author?: string
  updated?: string
  version?: string
  changelog?: Array<{ date: string; note: string }>
}

export const pillarLabels: Record<WritingPillar, string> = {
  "agentic-enterprise": "Agentic Enterprise",
  "ai-governance": "AI Governance",
  "ai-engineering": "AI Engineering",
  "building-public": "Building in Public",
  "ai-economics": "AI Economics",
  "future-work": "Future of Work",
  "architecture": "Architecture",
  "product-experiments": "Product Experiments",
}

export const articles: WritingArticle[] = [
  {
    id: "sdd-kit-blind-review",
    slug: "when-my-quality-gates-lost",
    title: "I Lost Three Rounds Against My Own Method. Here Is What I Changed.",
    pillar: "ai-engineering",
    summary: "A blind comparison on Documenso exposed defects my specification gates missed. How I rebuilt the OpenSpec-based SDD Kit, tested its archive hook and direct independent agent audits.",
    published: "2026-10-21",
    updated: "2026-10-22",
    linkedSystems: [],
    featured: true,
    wordCount: 1245,
    author: "Alejandro Baratas",
    version: "1.1",
    changelog: [
      { date: "2026-10-22", note: "Added an interactive three-gate Anatomy figure and documented the separate brief, factory and governance predecessors with their evidence limits." },
      { date: "2026-10-21", note: "First public account of the personal SDD Kit, blind review and agent direction practice, sourced from private experiment and session records." },
    ],
  },
  {
    id: 1,
    slug: "governing-agentic-systems",
    title: "Governing Agentic Systems at Enterprise Scale",
    pillar: "ai-governance",
    summary: "How to implement governance layers for autonomous agent systems without strangling innovation. Approaches to permission models, audit trails, and compliance in multi-agent architectures.",
    published: "2026-01-15",
    linkedSystems: ["AIActMiddleware"],
    featured: true,
    wordCount: 5474,
    author: "Alejandro Baratas",
    updated: "2026-07-22",
    version: "2.0",
    changelog: [
      { date: "2026-07-22", note: "Expanded the runtime control-plane model, autonomy ladder, authority-chain mechanics, evidence architecture, operating lanes, and implementation contract." },
      { date: "2026-01-15", note: "Initial publication." },
    ],
  },
  {
    id: 2,
    slug: "entropy-problem-llms",
    title: "The Entropy Problem in LLM Systems",
    pillar: "ai-engineering",
    summary: "Why cost, behaviour and state drift emerge in long-running LLM systems—and how operating envelopes, checkpoints, intervention policy and evidence loops can contain them.",
    published: "2026-01-10",
    linkedSystems: ["EntropicCore"],
    wordCount: 6515,
    author: "Alejandro Baratas",
    updated: "2026-07-22",
    version: "2.0",
    changelog: [
      { date: "2026-07-22", note: "Rebuilt around the Entropic Core laboratory: OMEGA, multidimensional entropy, operating envelopes, intervention policy, checkpoints, and an explicit evidence boundary." },
      { date: "2026-01-10", note: "Initial publication." },
    ],
  },
  {
    id: 3,
    slug: "avoiding-vendor-lock-in",
    title: "Building Vendor-Agnostic AI Platforms",
    pillar: "architecture",
    summary: "How AI Vendor Compare turns provider pages into versioned claims—and how daily agents, source provenance, verification gates and capability contracts make portability operational.",
    published: "2025-12-20",
    linkedSystems: ["AIVendorCompare", "LLMTRACE"],
    featured: true,
    wordCount: 3695,
    author: "Alejandro Baratas",
    updated: "2026-07-22",
    version: "2.0",
    changelog: [
      { date: "2026-07-22", note: "Rebuilt around the public AI Vendor Compare snapshot, source hierarchy, daily triggers, agent roles, claim lifecycle, verification controls, publishing and runtime portability." },
      { date: "2025-12-20", note: "Initial publication." },
    ],
  },
  {
    id: 4,
    slug: "ai-platform-economics",
    title: "AI Platform Economics: Cost, Margin, and Governance",
    pillar: "ai-economics",
    summary: "A proposed architecture for connecting market prices, measured trajectories and runtime budgets; the current projects have separate evidence boundaries.",
    published: "2025-12-15",
    linkedSystems: ["AIVendorCompare", "LLMTRACE", "EntropicCore"],
    wordCount: 2684,
    author: "Alejandro Baratas",
    updated: "2026-07-22",
    version: "2.0",
    changelog: [
      { date: "2026-07-22", note: "Expanded into a complete unit-economics architecture connecting market data, production traces, runtime budgets, quality floors, retries, review cost and margin." },
      { date: "2025-12-15", note: "Initial publication." },
    ],
  },
  {
    id: 5,
    slug: "observability-agentic-systems",
    title: "Observability for Agentic Systems",
    pillar: "ai-engineering",
    summary: "Why enterprises need a governance wrapper around agents: a causal trace spine for identity, authority, policy, budgets, progress, side effects, intervention and audit evidence.",
    published: "2025-12-10",
    linkedSystems: ["LLMTRACE", "AIActMiddleware", "EntropicCore", "PsycheOS"],
    wordCount: 3513,
    author: "Alejandro Baratas",
    updated: "2026-07-22",
    version: "2.0",
    changelog: [
      { date: "2026-07-22", note: "Rebuilt as an enterprise control-plane field guide covering causal traces, authority, policy, side effects, progress, privacy, intervention, incident reconstruction and the honest relationship between four existing systems." },
      { date: "2025-12-10", note: "Initial publication." },
    ],
  },
  {
    id: 6,
    slug: "building-in-public",
    title: "Building AI Systems in Public Without Lying to Yourself",
    pillar: "building-public",
    summary: "A first-person operating system for separating interfaces from products, executable metaphors from validated claims, attention from adoption, and speed from maturity.",
    published: "2025-12-01",
    featured: true,
    linkedSystems: ["BrewMatch", "AIVendorCompare", "LLMTRACE", "EntropicCore"],
    wordCount: 3038,
    author: "Alejandro Baratas",
    updated: "2026-07-22",
    version: "2.0",
    changelog: [
      { date: "2026-07-22", note: "Rewritten as a technical confession and public evidence lifecycle, with preview-state taxonomy, evidence ladder, portfolio control plane, claim calibration, disclosure controls and concrete project boundaries." },
      { date: "2025-12-01", note: "Initial publication." },
    ],
  },
  {
    id: 7,
    slug: "orchestration-patterns",
    title: "Agent Orchestration Patterns for Complex Workflows",
    pillar: "agentic-enterprise",
    summary: "A production field guide to deterministic, sequential, parallel, hierarchical, routing, evaluator–optimizer and mesh patterns—with contracts for authority, state, evidence, termination and economics.",
    published: "2025-11-25",
    linkedSystems: ["AIActMiddleware", "LLMTRACE", "EntropicCore", "AIVendorCompare"],
    wordCount: 5346,
    author: "Alejandro Baratas",
    updated: "2026-07-22",
    version: "2.0",
    changelog: [
      { date: "2026-07-22", note: "Expanded into a full production architecture: seven orchestration patterns, situation graphs, typed handoffs, authority narrowing, state ownership, conflict resolution, idempotency, recovery, evaluation, economics and governance." },
      { date: "2025-11-25", note: "Initial publication." },
    ],
  },
  {
    id: 8,
    slug: "safety-alignment-systems",
    title: "Safety & Alignment in Production AI Systems",
    pillar: "ai-governance",
    summary: "Why safety is a controlled relationship between capability, authority, context, evidence and intervention—not a refusal, benchmark or fine-tuning result.",
    published: "2025-11-20",
    linkedSystems: ["PsycheOS", "AIActMiddleware", "LLMTRACE", "EntropicCore"],
    wordCount: 6516,
    author: "Alejandro Baratas",
    updated: "2026-07-22",
    version: "2.0",
    changelog: [
      { date: "2026-07-22", note: "Rebuilt as a production safety field guide covering safety cases, agentic attack surfaces, layered guardrails, behavioural wind-tunnel evaluation, safety budgets, blast-radius engineering, incident response and state-transition control." },
      { date: "2025-11-20", note: "Initial publication." },
    ],
  },
]

export function getArticlesByPillar(pillar: WritingPillar): WritingArticle[] {
  return articles.filter((a) => a.pillar === pillar).sort((a, b) => 
    new Date(b.published).getTime() - new Date(a.published).getTime()
  )
}

export function getFeaturedArticles(): WritingArticle[] {
  return articles.filter((a) => a.featured).sort((a, b) => 
    new Date(b.published).getTime() - new Date(a.published).getTime()
  )
}

export function getArticleBySlug(slug: string): WritingArticle | undefined {
  return articles.find((a) => a.slug === slug)
}
