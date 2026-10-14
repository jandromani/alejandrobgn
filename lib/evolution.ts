import rawEvolutionData from "@/data/evolution.json"

export const evolutionFamilies = [
  "Foundations",
  "Products & Platforms",
  "Labs & Research",
  "Agentic Infrastructure",
  "Applied AI Side Quests",
] as const

export type EvolutionFamily = (typeof evolutionFamilies)[number]
export type EvolutionConfidence = "Confirmed" | "Strong recall" | "Partial reconstruction"

export type EvolutionRecord = {
  id: number
  date: string
  year: 2023 | 2024 | 2025 | 2026
  phase: string
  type: string
  category: string
  description: string
  stack: string
  output: string
  status: string
  confidence: EvolutionConfidence
  notes: string
  model: {
    key: string
    label: string
    certainty: "confirmed" | "inferred"
    note: string
  }
  symbols: Array<{ icon: string; label: string }>
  era: "context" | "mechanisms" | "products" | "explosion" | "governance"
  importance: number
  displayName: string
  techTags: string[]
  patterns: string[]
  roles: string[]
  maturityScore: number
  maturityLabel: string
  autonomyScore: number
  autonomyLabel: string
  complexityScore: number
  evidenceSurface: string
  architectureFlow: string[]
  professionalSignal: string
  whyItMatters: string
  stackNote: string
  family: EvolutionFamily
}

export const evolutionRecords = rawEvolutionData as unknown as EvolutionRecord[]

export const evolutionEras = [
  {
    key: "context",
    index: "01",
    years: "Jan — May 2023",
    title: "Forcing the context",
    copy: "CONTINUA, conversational variables and recursive recap packets turned GPT-3.5’s small context window into a handmade control layer.",
    recordIds: [1, 2, 3, 9, 10],
    color: "#22d3ee",
  },
  {
    key: "mechanisms",
    index: "02",
    years: "2023 — 2024",
    title: "Turning thought into mechanisms",
    copy: "Writing expanded into GIS algorithms, ArcGIS automation, enterprise Java, business systems and market scripts.",
    recordIds: [9, 11, 13, 17, 25],
    color: "#b8ff5a",
  },
  {
    key: "products",
    index: "03",
    years: "2025",
    title: "From scripts to products",
    copy: "Colabs became APIs. Prompts became datasets. Concepts became public packages, dashboards and enterprise proofs of concept.",
    recordIds: [30, 34, 40, 43, 60],
    color: "#a78bfa",
  },
  {
    key: "explosion",
    index: "04",
    years: "Jan — Jun 2026",
    title: "Experimental explosion",
    copy: "Reliability labs, behavioural safety, blockchain infrastructure, synthetic systems and multi-model applications appeared in rapid succession.",
    recordIds: [66, 72, 78, 88, 104],
    color: "#fb7185",
  },
  {
    key: "governance",
    index: "05",
    years: "Jul 2026",
    title: "Governing the factory",
    copy: "The problem changed: not how to create another agent, but how to govern the production machine and preserve evidence.",
    recordIds: [111, 118, 143, 152, 161],
    color: "#fbbf24",
  },
] as const

export const modelEras = [
  { key: "gpt35", date: "Opening months · 2023", name: "GPT-3.5", copy: "Context scarcity produced continuation protocols and portable recap packets." },
  { key: "gpt4", date: "Mar 2023 — Apr 2024", name: "GPT-3.5 → GPT-4 era", copy: "Reasoning and coding moved the work into GIS, automation and enterprise mechanisms." },
  { key: "gpt4o", date: "May 2024 — Mar 2025", name: "GPT-4o era", copy: "Faster multimodality accelerated application and document workflows." },
  { key: "gpt41", date: "Apr — Jul 2025", name: "GPT-4o / GPT-4.1 era", copy: "Longer context supported packages, SQL intelligence and enterprise prototypes." },
  { key: "gpt5", date: "Aug 2025 — Feb 2026", name: "GPT-5 era", copy: "The collaboration shifted from apps toward benchmarks, reliability and agents." },
  { key: "gpt54", date: "Mar 2026", name: "GPT-5.4 era", copy: "Tool use coincided with deeper laboratories and production architectures." },
  { key: "gpt55", date: "Apr — Jun 2026", name: "GPT-5.5 era", copy: "Agentic coding accelerated factories, synthetic systems and multi-model products." },
  { key: "gpt56", date: "Jul 2026", name: "GPT-5.5 → GPT-5.6 era", copy: "The output converged into control planes, evidence systems and governed delivery." },
] as const

export const evolutionYearCounts = [
  { year: 2023, count: 14, color: "#22d3ee" },
  { year: 2024, count: 15, color: "#b8ff5a" },
  { year: 2025, count: 39, color: "#a78bfa" },
  { year: 2026, count: 116, color: "#fbbf24" },
] as const

export const familyDescriptions: Record<EvolutionFamily, string> = {
  Foundations: "Context engineering, GIS, Java, automation and the first reusable mechanisms.",
  "Products & Platforms": "APIs, packages, dashboards, enterprise proofs of concept and public product surfaces.",
  "Labs & Research": "Reliability, safety, behavioural evaluation, benchmarks and simulation.",
  "Agentic Infrastructure": "Orchestration, observability, specifications, control planes and governed delivery.",
  "Applied AI Side Quests": "A record of applying AI to unfamiliar domains until the underlying pattern became visible.",
}

export const yearColor: Record<number, string> = {
  2023: "#22d3ee",
  2024: "#b8ff5a",
  2025: "#a78bfa",
  2026: "#fbbf24",
}

