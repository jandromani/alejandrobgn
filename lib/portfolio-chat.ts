export type PortfolioSource = {
  title: string
  url: string
  summary: string
  details?: string
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
    details: "The team prepared backend, frontend and testing-focused assistance, captured repository conventions and business vocabulary, and routed agent candidate changes through inspectable pull requests and human review. At follow-up the backend copilot was back in production and the participating team continued the approach, according to the delivery team. This is not an independently audited adoption percentage or customer business KPI. Alejandro contributed hands-on engineering and technical direction.",
    keywords: ["cybersecurity", "dars", "adoption", "team", "copilot", "month", "training", "ciberseguridad", "equipo", "mes", "formación"],
  },
  {
    title: "Banking modernization",
    url: "/work/banking-modernization",
    summary: "A four-week, bounded reference-module PoC explored source inventory, canonical representation and deterministic generation. Of 23,811 registry entries, 22,995 had file, line and SHA-256 together. Two runs compared 4,338 files, with no defect in the defined reproducibility check. This does not establish whole-estate migration or functional equivalence.",
    details: "The internal RC4.7 engineering record catalogued 91 canonical functions across 18 areas, processed 197 legacy JSF screens into 173 candidate Angular views, and recorded 23,811 evidence entries: 23,228 with a hash and 22,995 with source file, line and hash together. Two clean factory runs compared 4,338 files: 3,952 normalized-identical, 22 compared by hash only, 99 by identity only, and 265 declared volatile. Do not claim all 4,338 files were identical. The engine regression suite reported 1,383 passed and 22 skipped out of 1,405; separate API and frontend suites reported 257 and 227 tests. Only 7 of 91 represented functions were implemented, 6 exercised, and 0 compared with legacy behavior. Alejandro architected the corpus-first approach and presented the PoC. The private record shows source lineage and a bounded reproducibility check, not customer acceptance, functional parity or estate-wide migration.",
    keywords: ["banking", "factory", "factoria", "modernization", "legacy", "graph", "migration", "reproducibility", "banca", "modernización", "migración", "grafo"],
  },
  {
    title: "Public-sector copilots",
    url: "/work/public-sector-copilots",
    summary: "Alejandro led a Java backend agent package with ten specialist skills and three agents, prepared through twelve reported audit rounds before handover. The public account is anonymized.",
    details: "The Java backend preparation package had ten specialist skills, three agents and 25 supporting references; a separate ticket-to-spec package addressed upstream work. Private reports describe twelve agent-led audit rounds and 150 review cycles. Round summaries mention about 47 corrections, while detailed bullets document 36; five blockers are individually identifiable. The July snapshot did not establish deployment into the client repository, later use or measured productivity. Alejandro led technical work and hands-on development; the client retained codebase ownership and acceptance.",
    keywords: ["public sector", "government", "java", "audit", "skills", "agents", "copilots", "sector público", "auditoría", "agentes"],
  },
  {
    title: "Engineering method and evidence register",
    url: "/engineering#evidence",
    summary: "Alejandría is a company-owned internal accelerator for traceable requirements. The banking Factoría is a client PoC. The OpenSpec-based SDD Kit was developed with colleagues in the AI CoE. These are related but separate settings, each with a distinct owner and proof boundary.",
    details: "The five decisions are specification contract, source context, bounded candidate, quality gates and human authorization. Alejandría's private reference pack recorded 50 traceable requirements, 22 hash and ledger checks and 12 of 12 reproduced core tests; it is an internal company asset, not a public product. The Factoría was a separate banking client PoC. AgentCycle blocked an earlier factory after a 7/100 assessment. The later SDD Kit used lightweight explicit review gates, developed with AI CoE colleagues, and lost two scored blind plan comparisons to an agent baseline. Engineering Context reproduced 135 tests; Codex Loop's command bridge reproduced 33; KMM's audit reproduced 118 passes and nine dependency-related failures. The three layers were not verified as one integrated production system. KNOWMAD Agentic System SDLC is another internal prototype with 68 reproduced tests and seven open release gates, not a customer outcome. Ownership differs by asset and these figures come from private or self-produced engineering records.",
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
