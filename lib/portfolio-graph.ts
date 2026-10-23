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
  {
    id: "case:public-sector-copilots",
    title: "Audited development copilots",
    kind: "case",
    href: "/work/public-sector-copilots",
    description: "An anonymized account of specialist copilots delivered after repeated audit and correction.",
  },
]
const editorialNodes: PortfolioNode[] = [
  { id: "publication:the-intelligence-ahead", title: "The Intelligence Ahead", kind: "publication", href: "/publications", description: "Independent editorial work and original readers." },
  { id: "index:experience", title: "Professional experience", kind: "index", href: "/experience", description: "Roles, responsibilities and contributions." },
  { id: "index:evolution", title: "AI Co-Evolution", kind: "index", href: "/evolution", description: "The historical archive, later milestones and stated confidence." },
  { id: "index:about", title: "About / lineage", kind: "index", href: "/about", description: "The journey from GIS to agentic engineering." },
  { id: "index:work", title: "Enterprise work", kind: "index", href: "/work", description: "Case studies with scope, measured engineering process outcomes and proof boundaries." },
  { id: "index:home", title: "Portfolio homepage", kind: "index", href: "/", description: "Executive entry to engineering outcomes and verifiable work." },
  { id: "index:systems", title: "Engineering systems catalogue", kind: "index", href: "/systems", description: "All systems and their maturity, evidence labels and known limits." },
  { id: "index:labs", title: "Original HTML laboratories", kind: "index", href: "/labs", description: "Browse recovered, runnable research artifacts and their QA caveats." },
  { id: "index:writing", title: "Technical field notes", kind: "index", href: "/writing", description: "Long-form technical writing and related implementations." },
  { id: "index:atlas", title: "Engineering Atlas", kind: "index", href: "/atlas", description: "Visual and machine-readable navigation of the editorial graph." },
  { id: "index:thesis", title: "Engineering principles", kind: "index", href: "/thesis", description: "The operating principles behind the public technical systems." },
  { id: "index:venture-lab", title: "Venture lab", kind: "index", href: "/venture-lab", description: "An exploratory catalogue of commercially-oriented AI prototypes." },
  { id: "index:meet", title: "Professional contact", kind: "index", href: "/meet", description: "A legacy route that redirects to professional contact." },
  { id: "index:contact", title: "Professional contact", kind: "index", href: "/contact", description: "Contact for research and technical discussion." },
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
  { from:"case:public-sector-copilots", to:"writing:when-my-quality-gates-lost", relation:"method", why:"Related practice of agent roles, audit and human review; a separate AI CoE experiment." },
  { from:"index:work", to:"case:public-sector-copilots", relation:"evidence", why:"Anonymized delivery and audit account." },
  { from:"index:writing", to:"writing:when-my-quality-gates-lost", relation:"evidence", why:"AI CoE SDD Kit, bounded agent review and private session log." },
  { from:"writing:when-my-quality-gates-lost", to:"lab:openspec", relation:"method", why:"Public explanatory lab for the specification workflow; distinct from the private kit and experiment." },
  { from:"case:banking-modernization", to:"writing:when-my-quality-gates-lost", relation:"theme", why:"Both distinguish repeatable engineering checks from functional acceptance." },
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
  { from:"publication:the-intelligence-ahead", to:"index:evolution", relation:"theme", why:"Independent editorial work within the broader development timeline." },
  { from:"system:healthsync", to:"writing:governing-agentic-systems", relation:"theme", why:"Consent, privacy and governance as related design concerns; no clinical deployment claim." },
  { from:"system:servisenior", to:"writing:safety-alignment-systems", relation:"theme", why:"Human oversight and safety in sensitive assistance; no product integration claim." },
  { from:"index:experience", to:"case:cybersecurity-ai-engineering", relation:"evidence", why:"Anonymized enterprise account." },
  { from:"index:experience", to:"case:banking-modernization", relation:"evidence", why:"Source-linked technical case." },
  { from:"index:evolution", to:"lab:entropic-agent-lab", relation:"evidence", why:"An inspectable later research artifact." },
  { from:"index:about", to:"index:experience", relation:"context", why:"Career evidence for the professional lineage." },
  { from:"index:work", to:"case:cybersecurity-ai-engineering", relation:"evidence", why:"Bounded team adoption and delivery evidence." },
  { from:"index:work", to:"case:banking-modernization", relation:"evidence", why:"Bounded, traceable modernization evidence." },
  { from:"index:home", to:"index:work", relation:"context", why:"The executive-first doorway to the enterprise evidence." },
  { from:"index:home", to:"case:cybersecurity-ai-engineering", relation:"evidence", why:"Selected enterprise outcome surfaced above the research catalogue." },
  { from:"index:systems", to:"system:aiactmiddleware", relation:"context", why:"An entry into the public engineering systems catalogue." },
  { from:"index:labs", to:"lab:openspec", relation:"evidence", why:"Browse the original HTML archive and bounded browser QA." },
  { from:"index:writing", to:"writing:orchestration-patterns", relation:"context", why:"A long-form introduction to agent orchestration." },
  { from:"index:work", to:"index:atlas", relation:"context", why:"Inspect related methods after reviewing enterprise results." },
  { from:"index:atlas", to:"index:labs", relation:"context", why:"The atlas helps navigate the preserved research archive." },
  { from:"index:thesis", to:"writing:governing-agentic-systems", relation:"context", why:"Operating principles reflected in long-form technical writing." },
  { from:"index:venture-lab", to:"system:agnosticengine", relation:"context", why:"A commercially-oriented application also represented in the system catalogue." },
  { from:"index:meet", to:"index:contact", relation:"context", why:"Email is the main contact route." },
  { from:"index:contact", to:"index:experience", relation:"context", why:"Contact follows inspection of responsibilities and evidence." },
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

/**
 * Integrity gate executed whenever the app builds the atlas. Every vertex
 * needs a valid route and at least one relationship, and the editorial graph
 * must form one connected component. No relationship means runtime coupling.
 */
const nodeIds = new Set(portfolioNodes.map((n) => n.id))
if (nodeIds.size !== portfolioNodes.length) throw new Error("Duplicate portfolio graph node ID")
if (new Set(portfolioNodes.map((n) => n.href)).size !== portfolioNodes.length) {
  throw new Error("A portfolio route is registered more than once in the atlas")
}
for (const edge of portfolioEdges) {
  if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to) || edge.from === edge.to) {
    throw new Error(`Broken atlas edge ${edge.from} -> ${edge.to}`)
  }
}
if (portfolioNodes.length) {
  const reachable = new Set<string>()
  const stack = [portfolioNodes[0].id]
  while (stack.length) {
    const id = stack.pop()!
    if (reachable.has(id)) continue
    reachable.add(id)
    for (const e of portfolioEdges) {
      if (e.from === id && !reachable.has(e.to)) stack.push(e.to)
      if (e.to === id && !reachable.has(e.from)) stack.push(e.from)
    }
  }
  if (reachable.size !== nodeIds.size) {
    const isolated = [...nodeIds].filter((id) => !reachable.has(id))
    throw new Error(`Disconnected portfolio graph: ${isolated.join(", ")}`)
  }
}


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
