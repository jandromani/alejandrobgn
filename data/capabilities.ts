export interface Capability {
  domain: string
  description: string
  skills: string[]
  linkedSystems?: string[]
}

export const capabilities: Capability[] = [
  {
    domain: 'Agentic Systems & Orchestration',
    description: 'Designing, implementing, and operating autonomous agent systems at scale. Multi-agent coordination, decision flows, and emergent behavior management.',
    skills: [
      'Agent architecture design',
      'Multi-agent orchestration',
      'Tool calling and function selection',
      'State management in agents',
      'Agent evaluation and testing',
      'Hierarchical and mesh topologies',
    ],
    linkedSystems: ['AgnosticEngine', 'PsycheOS', 'AIActMiddleware'],
  },
  {
    domain: 'AI Governance & Compliance',
    description: 'Building governance frameworks for AI systems. EU AI Act compliance, audit trails, permission models, and policy implementation.',
    skills: [
      'EU AI Act implementation',
      'Governance architecture',
      'Audit trail design',
      'Permission and delegation systems',
      'Compliance automation',
      'Risk assessment frameworks',
    ],
    linkedSystems: ['AIActMiddleware'],
  },
  {
    domain: 'LLM Reliability & Cost',
    description: 'Optimizing LLM systems for production reliability and cost efficiency. Entropy management, caching, token optimization, and model selection strategies.',
    skills: [
      'Token optimization',
      'Prompt engineering at scale',
      'Caching strategies',
      'Model evaluation and selection',
      'Cost attribution',
      'Vendor comparison',
    ],
    linkedSystems: ['EntropicCore', 'AIVendorCompare', 'LLMTRACE'],
  },
  {
    domain: 'Observability & Tracing',
    description: 'Building observable AI systems. LLM tracing, debugging agent behavior, understanding model outputs, and production monitoring.',
    skills: [
      'Distributed tracing for LLMs',
      'Agent path visualization',
      'Token and cost tracking',
      'Error diagnosis in AI systems',
      'Production metrics',
      'Real-time debugging',
    ],
    linkedSystems: ['LLMTRACE', 'PsycheOS'],
  },
  {
    domain: 'Backend & Platform Engineering',
    description: 'Building robust backend systems and platforms. Microservices, distributed systems, databases, and infrastructure at scale.',
    skills: [
      'Microservices architecture',
      'API design and implementation',
      'Database design',
      'Distributed systems',
      'Kubernetes orchestration',
      'Cloud infrastructure',
    ],
    linkedSystems: [],
  },
  {
    domain: 'Technical Leadership & Strategy',
    description: 'Guiding technical direction, mentoring teams, and making architectural decisions that balance innovation with pragmatism.',
    skills: [
      'Architecture decision making',
      'Technical strategy',
      'Team mentoring',
      'Cross-functional collaboration',
      'Knowledge transfer',
      'Long-term roadmapping',
    ],
    linkedSystems: [],
  },
  {
    domain: 'Programming & Tools',
    description: 'Multi-language expertise with deep knowledge of Python, Java, TypeScript, and deployment tooling.',
    skills: ['Python', 'Java', 'TypeScript/Node.js', 'SQL', 'gRPC', 'REST APIs', 'Docker', 'Kubernetes'],
    linkedSystems: [],
  },
]

export function getCapabilitiesByDomain(domain: string): Capability | undefined {
  return capabilities.find((c) => c.domain === domain)
}

export function getAllDomains(): string[] {
  return capabilities.map((c) => c.domain)
}
