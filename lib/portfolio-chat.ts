export type PortfolioSource = {
  title: string
  url: string
  summary: string
  keywords: readonly string[]
}

// Public, editorial context only. Keep client records and private audit artifacts out.
export const portfolioSources: readonly PortfolioSource[] = [
  {
    title: "Selected enterprise work",
    url: "/work",
    summary: "Three sector-anonymized engagements in cybersecurity, banking modernization and public-sector developer copilots. Each case separates what the delivery team recorded from independently verified client outcomes.",
    keywords: ["work", "case", "client", "enterprise", "projects", "impact", "trabajo", "casos", "clientes", "proyectos", "resultados"],
  },
  {
    title: "Cybersecurity engineering",
    url: "/work/cybersecurity-ai-engineering",
    summary: "Alejandro helped a small technical group put project-aware assistants, agent-proposed PRs and adapted specification and review practices into use with a participating engineering team within a month, according to the delivery account.",
    keywords: ["cybersecurity", "dars", "adoption", "team", "copilot", "month", "training", "ciberseguridad", "equipo", "mes", "formación"],
  },
  {
    title: "Banking modernization",
    url: "/work/banking-modernization",
    summary: "A bounded reference-module PoC explored source inventory, canonical representation and deterministic generation. Its records include 22,995 entries linked to file, line and SHA-256; 4,338 files were compared across two runs. This does not establish whole-estate migration or functional equivalence.",
    keywords: ["banking", "factory", "factoria", "modernization", "legacy", "graph", "migration", "reproducibility", "banca", "modernización", "migración", "grafo"],
  },
  {
    title: "Public-sector copilots",
    url: "/work/public-sector-copilots",
    summary: "Alejandro led a Java backend agent package with ten specialist skills and three agents, prepared through twelve reported audit rounds before handover. The public account is anonymized.",
    keywords: ["public sector", "government", "java", "audit", "skills", "agents", "copilots", "sector público", "auditoría", "agentes"],
  },
  {
    title: "Engineering method and evidence register",
    url: "/engineering#evidence",
    summary: "Alejandría is a company-owned internal accelerator for traceable requirements. The banking Factoría is a client PoC. The OpenSpec-based SDD Kit was developed with colleagues in the AI CoE. These are related but separate settings, each with a distinct owner and proof boundary.",
    keywords: ["method", "alejandria", "factoría", "sdd", "openspec", "evidence", "gates", "ownership", "governance", "método", "evidencia", "puertas", "propiedad"],
  },
  {
    title: "When my quality gates lost",
    url: "/writing/when-my-quality-gates-lost",
    summary: "Alejandro published negative blind comparisons of SDD review plans, what the evaluations exposed and how he changed the gates. The article includes an interactive explanatory figure; it does not claim the method won those comparisons.",
    keywords: ["failure", "lost", "experiment", "evaluation", "blind", "adversarial", "sdd", "press", "fallo", "perdió", "evaluación", "prensa"],
  },
  {
    title: "Engineering systems",
    url: "/systems",
    summary: "Public system pages distinguish a runnable prototype, a simulated adapter, a concept and a published package. The A2A agent platform is still developing; public source is inspectable at github.com/jandromani/A2A.",
    keywords: ["systems", "a2a", "platform", "open source", "repository", "llmtrace", "entropic", "vendor", "sistemas", "plataforma", "repositorio"],
  },
  {
    title: "Atlas, labs and writing",
    url: "/atlas",
    summary: "An interactive editorial graph connects the enterprise cases, public systems, eight preserved browser experiments and technical field notes. The graph shows editorial relationships, not live runtime dependencies.",
    keywords: ["atlas", "labs", "browser", "writing", "articles", "graph", "visual", "anatomy", "laboratorios", "artículos", "gráfico", "anatomía"],
  },
  {
    title: "About Alejandro",
    url: "/about",
    summary: "Alejandro is an AI Tech Lead at knowmad mood in Madrid. His software engineering background spans HPE, NTT DATA and Ayesa. His personal portfolio documents engineering work and research.",
    keywords: ["about", "alejandro", "who", "background", "experience", "knowmad", "career", "gis", "quién", "trayectoria", "experiencia"],
  },
  {
    title: "Contact Alejandro",
    url: "/contact",
    summary: "For a conversation with the actual person rather than this portfolio guide, use the contact page. This assistant cannot speak on Alejandro's behalf or make commitments.",
    keywords: ["contact", "email", "linkedin", "hire", "talk", "meet", "message", "contacto", "hablar", "contratar", "mensaje"],
  },
]

function normalize(value: string) {
  return value.toLocaleLowerCase("en").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function selectPortfolioSources(question: string): PortfolioSource[] {
  const query = normalize(question)
  const words = new Set(query.match(/[a-z0-9]{3,}/g) ?? [])
  const scored = portfolioSources.map((source, index) => {
    let score = 0
    for (const keyword of source.keywords) {
      const normalized = normalize(keyword)
      if (normalized.includes(" ")) {
        if (query.includes(normalized)) score += 3
      } else if (words.has(normalized)) {
        score += 2
      }
    }
    return { source, index, score }
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.index - b.index)

  return scored.length ? scored.slice(0, 3).map((item) => item.source) : [portfolioSources[0], portfolioSources[4], portfolioSources[8]]
}

export function guidedPortfolioAnswer(sources: readonly PortfolioSource[]) {
  return sources.slice(0, 2).map((source) => source.summary).join("\n\n") +
    "\n\nOpen the linked pages for the full scope and evidence."
}
