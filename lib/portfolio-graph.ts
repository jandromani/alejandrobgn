import { systems } from "@/lib/systems-data"
import { articles } from "@/data/writing"
import { originalLabs } from "@/data/frontier-labs"

export type PortfolioKind = "case" | "system" | "lab" | "writing" | "publication" | "index"
export type PortfolioRelation = "method" | "evidence" | "context" | "theme"
export type PortfolioNode = {
  id: string
  title: string
  kind: PortfolioKind
  href: string
  description: string
}
export type PortfolioEdge = { from: string; to: string; relation: PortfolioRelation; why: string }

// A curated *editorial* knowledge graph, not a declaration of deployed
// software dependencies. IDs and destinations always come from real routes.
const caseNodes: PortfolioNode[] = [
  {
    id: "case:cybersecurity-ai-engineering",
    title: "AI-assisted engineering activation",
    kind: "case",
    href: "/work/cybersecurity-ai-engineering",
    description: "An anonymized, bounded account of a team's assisted-development rollout.",
  },
  {
    id: "case:banking-modernization",
    title: "Source-to-evidence modernization",
    kind: "case",
    href: "/work/banking-modernization",
    description: "A bounded source-linked modernization proof of concept.",
  },
]
const editorialNodes: PortfolioNode[] = [
  { id: "publication:the-intelligence-ahead", title: "The Intelligence Ahead", kind: "publication", href: "/publications", description: "Independent editorial work and original readers." },
  { id: "index:experience", title: "Professional experience", kind: "index", href: "/experience", description: "Roles, responsibilities and contributions." },
  { id: "index:evolution", title: "AI Co-Evolution", kind: "index", href: "/evolution", description: "The historical archive, later milestones and stated confidence." },
  { id: "index:about", title: "About / lineage", kind: "index", href: "/about", description: "The journey from GIS to agentic engineering." },
]

export const portfolioNodes: PortfolioNode[] = [
  ...caseNodes,
  ...systems.map((s) => ({
    id: `system:${s.slug}`,
    title: s.name,
    kind: "system" as const,
    href: `/systems/${s.slug}`,
    description: s.shortDescription,
  })),
  ...originalLabs.map((l) => ({
    id: `lab:${l.slug}`,
    title: l.title,
    kind: "lab" as const,
    href: `/labs/${l.slug}`,
    description: l.summary,
  })),
  ...articles.map((a) => ({
    id: `writing:${a.slug}`,
    title: a.title,
    kind: "writing" as const,
    href: `/writing/${a.slug}`,
    description: a.summary,
  })),
  ...editorialNodes,
]

const explicitEdges: PortfolioEdge[] = [
  { from:"case:cybersecurity-ai-engineering", to:"lab:openspec", relation:"method", why:"Specifications, context and human-review gates — illustrative method, not client runtime." },
  { from:"case:cybersecurity-ai-engineering", to:"writing:orchestration-patterns", relation:"context", why:"Design choices for bounded agent coordination." },
  { from:"case:cybersecurity-ai-engineering", to:"writing:governing-agentic-systems", relation:"context", why:"Permission boundaries and accountability." },
  { from:"case:cybersecurity-ai-engineering", to:"system:llmtrace", relation:"theme", why:"Evidence-oriented observability design; no claim that this product was installed for the client." },
  { from:"case:banking-modernization", to:"lab:openspec", relation:"method", why:"Specification gates as a separate engineering pattern." },
  { from:"case:banking-modernization", to:"writing:orchestration-patterns", relation:"context", why:"Controlled handoffs and repeatable transformations." },
  { from:"case:banking-modernization", to:"system:llmtrace", relation:"theme", why:"Auditability and traceability as related design concerns, not deployed integration." },
  { from:"lab:entropic-agent-lab", to:"system:entropiccore", relation:"theme", why:"Shared reliability, entropy and recovery research theme." },
  { from:"lab:montageos", to:"writing:orchestration-patterns", relation:"theme", why:"Creative orchestration as a separate research application." },
  { from:"lab:roomforge", to:"lab:pumpum", relation:"theme", why:"Two distinct browser-based spatial explorations." },
  { from:"lab:robotics-radar", to:"lab:robotics-terminal", relation:"context", why:"Complementary robotics market hypothesis interfaces; not live pricing." },
  { from:"lab:assetgraph", to:"writing:building-in-public", relation:"evidence", why:"Archived promotion-audit states and honest prototype labelling." },
  { from:"lab:pumpum", to:"lab:montageos", relation:"theme", why:"Two independent creative-engineering artifacts." },
  { from:"lab:openspec", to:"writing:governing-agentic-systems", relation:"context", why:"Human gates and authority models." },
  { from:"publication:the-intelligence-ahead", to:"lab:robotics-radar", relation:"theme", why:"Robotics coverage and independent research artifacts." },
  { from:"index:experience", to:"case:cybersecurity-ai-engineering", relation:"evidence", why:"Anonymized enterprise account." },
  { from:"index:experience", to:"case:banking-modernization", relation:"evidence", why:"Source-linked technical case." },
  { from:"index:evolution", to:"lab:entropic-agent-lab", relation:"evidence", why:"An inspectable later research artifact." },
  { from:"index:about", to:"index:experience", relation:"context", why:"Career evidence for the professional lineage." },
]

const normalized = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")
const systemIdFromName = (name: string) => systems.find((s) =>
  normalized(s.name) === normalized(name) || normalized(s.slug) === normalized(name))?.slug

const systemEdges: PortfolioEdge[] = systems.flatMap((s) =>
  s.relatedSystems.filter((slug) => systems.some((p) => p.slug === slug) && slug !== s.slug)
    .map((slug): PortfolioEdge => ({
      from: `system:${s.slug}`,
      to: `system:${slug}`,
      relation: "theme",
      why: "Related engineering design; not proof of runtime integration.",
    }))
)

const articleEdges: PortfolioEdge[] = articles.flatMap((a) =>
  (a.linkedSystems ?? []).flatMap((name) => {
    const slug = systemIdFromName(name)
    return slug ? [{
      from: `writing:${a.slug}`,
      to: `system:${slug}`,
      relation: "context" as const,
      why: "Referenced system in the technical article.",
    }] : []
  })
)

const unique = new Map<string, PortfolioEdge>()
for (const edge of [...explicitEdges, ...systemEdges, ...articleEdges]) {
  unique.set(`${edge.from}->${edge.to}`, edge)
}
export const portfolioEdges = [...unique.values()]
export const portfolioNodeMap = new Map(portfolioNodes.map((node) => [node.id, node]))

export function relatedPortfolioNodes(id: string, limit = 5): Array<{ node: PortfolioNode; relation: PortfolioRelation; why: string }> {
  // Show both directions, preserving the original meaning and avoiding duplicates.
  const seen = new Set<string>()
  return portfolioEdges.flatMap((edge) => {
    const other = edge.from === id ? edge.to : edge.to === id ? edge.from : null
    if (!other || seen.has(other)) return []
    const node = portfolioNodeMap.get(other)
    if (!node) return []
    seen.add(other)
    return [{ node, relation: edge.relation, why: edge.why }]
  }).slice(0, limit)
}
