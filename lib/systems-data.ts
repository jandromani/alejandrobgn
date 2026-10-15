export interface VerifiedMetric {
  name: string
  value: string | number
  context: string
}

export interface HonestLimit {
  title: string
  description: string
}

export interface DemoInfo {
  url?: string
  notes?: string
}

export interface PaperInfo {
  url?: string
  title?: string
}

export interface Testimonial {
  quote: string
  source: string
}

export interface EvidenceAsset {
  src: string
  alt: string
  caption: string
  title: string
}

export interface ProductEvidence {
  interfaceType: "real" | "representative" | "conceptual"
  dataType: "live" | "demo" | "synthetic" | "anonymised" | "snapshot"
  executionType: "live" | "recorded" | "simulated"
  codeVisibility: "public" | "private" | "selected"
  /** The exact disclosure shown next to the lead preview. */
  previewLabel?: string
  lastVerified: string
  assets: {
    overview: EvidenceAsset
    workflow: EvidenceAsset
    underTheHood: EvidenceAsset
  }
}

export function getEvidenceLabel(evidence: ProductEvidence): string {
  if (evidence.previewLabel) return evidence.previewLabel
  if (evidence.interfaceType === "conceptual") return "Concept visualization"
  if (evidence.interfaceType === "representative") return "Representative workflow"
  if (evidence.dataType === "demo") return "Real interface · Demo data"
  if (evidence.dataType === "snapshot") return "Real interface · Snapshot data"
  if (evidence.dataType === "anonymised") return "Real anonymised interface"
  return "Real product interface"
}

export function getEvidenceTone(evidence: ProductEvidence): string {
  const label = getEvidenceLabel(evidence)
  if (label.startsWith("Real")) return "text-signal-green border-signal-green/40 bg-signal-green/10"
  if (label.includes("Architecture") || label.includes("Generated")) {
    return "text-signal-cyan border-signal-cyan/40 bg-signal-cyan/10"
  }
  return "text-signal-amber border-signal-amber/40 bg-signal-amber/10"
}

export interface System {
  id: string
  slug: string
  name: string
  tagline: string
  category: "governance" | "orchestration" | "stability" | "safety" | "observability" | "intelligence" | "products" | "platform"
  shortDescription: string
  description: string
  problemStatement: string
  role: "Framework" | "Product" | "Research" | "Platform" | "Tool" | "Open Source"
  status: "Live System" | "Open Source" | "Research" | "Public Demo" | "MVP" | "Prototype" | "Case Study" | "Archived" | "Private"
  level: 1 | 2 | 3 | 4
  year: number
  featured: boolean
  order: number
  technologies: string[]
  verifiedMetrics?: VerifiedMetric[]
  honestLimits?: HonestLimit[]
  architecture?: string
  demo?: DemoInfo
  paper?: PaperInfo
  testimonials?: Testimonial[]
  links: {
    repo?: string
    live?: string
    docs?: string
    pypi?: string
    article?: string
  }
  evidence?: ProductEvidence
  relatedSystems: string[]
}

export const systems: System[] = [
  // LEVEL 1: CORE AI SYSTEMS
  {
    id: "aiactmiddleware",
    slug: "aiactmiddleware",
    name: "AI Act Middleware",
    tagline: "AI Governance · Regulatory Control Plane",
    category: "governance",
    shortDescription: "Public prototype for making EU AI Act controls visible inside an AI runtime",
    description:
      "A governance framework that implements compliance requirements for the EU AI Act. Provides automated risk assessment, transparency logging, and audit trails for AI systems in production environments. Enables organizations to deploy AI systems in Europe with systematic compliance, turning regulatory complexity into architectural advantage.",
    problemStatement:
      "Organizations deploying AI in Europe face unclear regulatory paths. Without systematic governance, every deployment becomes a legal risk. AI Act Middleware makes compliance architectural, not bureaucratic.",
    role: "Framework",
    status: "Public Demo",
    level: 1,
    year: 2024,
    featured: true,
    order: 1,
    technologies: ["Python", "FastAPI", "PostgreSQL", "OpenTelemetry"],
    verifiedMetrics: [
      {
        name: "Implementation",
        value: "Public control-plane prototype",
        context: "Reference implementation for EU AI Act governance patterns",
      },
      {
        name: "Audit Trail",
        value: "100% of interactions logged",
        context: "When properly instrumented with LLMTRACE",
      },
    ],
    honestLimits: [
      {
        title: "Regulatory Interpretation",
        description: "Implements Alejandro's interpretation of EU AI Act. Legal review still required for your specific context.",
      },
      {
        title: "Model-Agnostic Limits",
        description: "Works best with models that support structured logging. Local/closed models require custom adapters.",
      },
    ],
    links: {
      live: "https://aiactmiddleware.vercel.app/chat",
    },
    evidence: {
      interfaceType: "real",
      dataType: "demo",
      executionType: "live",
      codeVisibility: "selected",
      previewLabel: "Real public prototype",
      lastVerified: "2026-07-22",
      assets: {
        overview: {
          src: "/projects/aiactmiddleware/live-preview.png",
          alt: "AI Act Middleware public chat prototype showing a server-managed runtime, compliance-focused test prompts, and a tribunal-ready chat state",
          title: "Public AI Act middleware prototype",
          caption: "Captured from the public runtime: a chat surface for testing governance prompts with server-managed models. It is a demo prototype, not an audited compliance result.",
        },
        workflow: {
          src: "/projects/aiactmiddleware/workflow.webp",
          alt: "Step-by-step compliance workflow trace from input received through risk classification to human review gate",
          title: "Compliance workflow trace",
          caption: "Every interaction produces a full audit trail: input received, risk classification, controls applied, evidence generated, and human review gate where required.",
        },
        underTheHood: {
          src: "/projects/aiactmiddleware/underhood.webp",
          alt: "Audit log structure and compliance report showing 47 decisions logged with 12 flagged for human review",
          title: "Audit log and evidence structure",
          caption: "Structured JSON audit logs capture every decision with evidence hash, operator ID, and compliance status. Reports are generated per-operator and per-period.",
        },
      },
    },
    relatedSystems: ["llmtrace", "psycheos", "agnosticengine"],
  },

  {
    id: "agnosticengine",
    slug: "agnosticengine",
    name: "Agnostic Engine",
    tagline: "Product Discovery · Intent-to-Product Runtime",
    category: "orchestration",
    shortDescription: "Product discovery runtime that turns shopper intent into catalog actions and storefront conversion",
    description:
      "A public product-discovery surface for Shopify and WooCommerce. It connects a real catalog to intent-led conversations, product recommendations, storefront handoff, and a small proof board for observing the commercial loop.",
    problemStatement:
      "Most storefronts make the shopper translate their own problem into a catalog query. Agnostic Engine turns that friction into a guided path from plain-language intent to a product click or assisted conversion.",
    role: "Product",
    status: "Public Demo",
    level: 1,
    year: 2024,
    featured: true,
    order: 2,
    technologies: ["Next.js", "Shopify", "WooCommerce", "intent routing"],
    verifiedMetrics: [
      {
        name: "Catalog surface",
        value: "4 products",
        context: "Structured, normalized catalog shown in the public proof board",
      },
      {
        name: "Intent proof",
        value: "41 conversations",
        context: "Public proof-board snapshot; not presented as a production benchmark",
      },
    ],
    honestLimits: [
      {
        title: "Proof-board scope",
        description: "The public page shows a bounded proof surface, not a complete commerce analytics suite.",
      },
      {
        title: "Tenant-specific work",
        description: "Catalog normalization, storefront integration, and conversion instrumentation still depend on each merchant.",
      },
    ],
    links: {
      live: "https://agnosticengine.vercel.app/",
    },
    evidence: {
      interfaceType: "representative",
      dataType: "snapshot",
      executionType: "live",
      codeVisibility: "selected",
      previewLabel: "Representative runtime view",
      lastVerified: "2026-07-22",
      assets: {
        overview: {
          src: "/projects/agnosticengine/live-preview.png",
          alt: "Agnostic Engine product discovery page for Shopify and WooCommerce showing a proof board, catalog products, and buyer conversations",
          title: "Product discovery runtime view",
          caption: "Captured from the public surface: product intent is translated into catalog clicks and assisted buying conversations. It is a representative runtime view, not a provider router.",
        },
        workflow: {
          src: "/projects/agnosticengine/workflow.webp",
          alt: "Live routing session showing document summarization request routed to Groq with streaming response and real-time cost counter",
          title: "Live routing session",
          caption: "Routing happens transparently. The application sends a standard request; the engine selects the provider, streams the response, and tracks cost.",
        },
        underTheHood: {
          src: "/projects/agnosticengine/underhood.webp",
          alt: "Architecture diagram showing application connected to routing layer with arrows to five LLM providers and routing statistics panel",
          title: "Routing layer architecture",
          caption: "The routing layer sits between application and providers. Routing weights are configured via YAML and updated without redeployment.",
        },
      },
    },
    relatedSystems: ["aiactmiddleware", "llmtrace", "aivendorcompare"],
  },

  {
    id: "entropiccore",
    slug: "entropiccore",
    name: "Entropic Core",
    tagline: "Agent Stability · Open Source Runtime",
    category: "stability",
    shortDescription: "Open-source runtime for measuring and regulating agent entropy before systems drift",
    description:
      "A runtime designed specifically for agentic systems that need to operate reliably over long periods. Handles state management, failure recovery, graceful degradation, and observability at the runtime level. Treats stability as a first-class architectural concern, not an afterthought.",
    problemStatement:
      "Agentic systems fail in production for systemic reasons: state inconsistency, accumulating errors, unclear failure modes. Entropic Core addresses the architectural causes, not just the symptoms.",
    role: "Framework",
    status: "Open Source",
    level: 1,
    year: 2026,
    featured: true,
    order: 3,
    technologies: ["Python", "asyncio", "Redis", "SQLAlchemy"],
    verifiedMetrics: [
      {
        name: "Release",
        value: "v4.0.0",
        context: "Version displayed on the public project page",
      },
      {
        name: "Test suite",
        value: "242 tests passed",
        context: "Public proof-page output; not an independent reliability benchmark",
      },
    ],
    honestLimits: [
      {
        title: "Status: Public Beta",
        description: "Stable core API, but lacking 24/7 support, SOC 2 certification, and formal SLAs. Suitable for production-aware teams; not for compliance-critical systems without additional layers.",
      },
      {
        title: "Scale Limits",
        description: "Optimized for 10-100 concurrent agents. Beyond that requires horizontal scaling implementation.",
      },
      {
        title: "Model Dependencies",
        description: "Assumes models respond predictably. Models with high variance need custom retry logic.",
      },
    ],
    links: {
      live: "https://v0-entropic-core-final.vercel.app/",
    },
    evidence: {
      interfaceType: "representative",
      dataType: "demo",
      executionType: "recorded",
      codeVisibility: "selected",
      previewLabel: "Generated from package output",
      lastVerified: "2026-07-22",
      assets: {
        overview: {
          src: "/projects/entropiccore/live-preview.png",
          alt: "Entropic Core public page showing v4.0.0, 242 tests passed, entropy output, and a stability proof signal",
          title: "Public entropy-regulation proof surface",
          caption: "Generated from the package and public proof output: version, tests, entropy status, and stability signal. It is not a production dashboard snapshot.",
        },
        workflow: {
          src: "/projects/entropiccore/workflow.webp",
          alt: "State machine diagram showing agent transitioning from RUNNING through DEGRADED to INTERVENTION then RECOVERED with checkpoint file structure",
          title: "State machine and checkpoint recovery",
          caption: "Recovery is automated and deterministic. The runtime saves checkpoints continuously and restores from the last known-good state on intervention.",
        },
        underTheHood: {
          src: "/projects/entropiccore/underhood.webp",
          alt: "Redis key structure visualization and Python StateManager code showing checkpoint creation and recovery methods",
          title: "State store and recovery internals",
          caption: "State is stored in Redis with structured keys. The StateManager handles snapshot creation, versioning, and atomic restoration.",
        },
      },
    },
    relatedSystems: ["psycheos", "llmtrace", "aiactmiddleware"],
  },

  {
    id: "psycheos",
    slug: "psycheos",
    name: "PsycheOS",
    tagline: "AI Safety · Alignment & Red Teaming Platform",
    category: "safety",
    shortDescription: "Browser-local AI safety platform for adversarial protocols, personas, environments, and guardrails",
    description:
      "A systematic framework for testing alignment and discovering failure modes in AI systems. Provides structured red teaming capabilities, jailbreak detection, prompt injection testing, and behavioral verification. Treats safety as measurable and testable.",
    problemStatement:
      "AI safety is often treated as a binary (safe/unsafe) rather than measurable. How do you know what failure modes your system might hit? PsycheOS makes safety testable.",
    role: "Platform",
    status: "Public Demo",
    level: 1,
    year: 2024,
    featured: true,
    order: 4,
    technologies: ["Python", "pytest", "adversarial testing", "prompt engineering"],
    verifiedMetrics: [
      {
        name: "Attack protocols",
        value: "700+",
        context: "Public product claim; scope shown on the live landing page",
      },
      {
        name: "Execution model",
        value: "Browser-local",
        context: "The public product states zero-server execution and no telemetry",
      },
    ],
    honestLimits: [
      {
        title: "Unknown Unknowns",
        description: "Can only test for known failure modes. Novel attacks will slip through.",
      },
      {
        title: "Model Dependence",
        description: "Effectiveness varies by model. Requires calibration for each model family.",
      },
    ],
    links: {
      live: "https://psycheos-psi.vercel.app/",
    },
    evidence: {
      interfaceType: "real",
      dataType: "snapshot",
      executionType: "live",
      codeVisibility: "selected",
      previewLabel: "Real public product surface",
      lastVerified: "2026-07-22",
      assets: {
        overview: {
          src: "/projects/psycheos/live-preview.png",
          alt: "PsycheOS safety operating system page showing browser-local BYOK model, attack protocol counts, personas, and environments",
          title: "Public PsycheOS safety surface",
          caption: "Captured from the public product page: browser-local, BYOK safety testing and red-team coverage are presented as the product surface. Counts are public product claims, not an external audit.",
        },
        workflow: {
          src: "/projects/psycheos/workflow.webp",
          alt: "Batch test runner showing 50 attack vectors being evaluated with progress bar and expanded failure result showing critical severity",
          title: "Batch safety evaluation",
          caption: "Test suites run all attack vectors against a system configuration and produce an aggregate risk score with per-vector breakdowns.",
        },
        underTheHood: {
          src: "/projects/psycheos/underhood.webp",
          alt: "Attack vector taxonomy tree showing 53 vectors across five categories with detection rates per category",
          title: "Attack vector taxonomy",
          caption: "Vectors are organized by category. Custom vectors can be added via configuration. Detection rates are measured per category and updated as models change.",
        },
      },
    },
    relatedSystems: ["aiactmiddleware", "entropiccore", "llmtrace"],
  },

  // LEVEL 2: INTELLIGENCE & APPLIED PRODUCTS
  {
    id: "aivendorcompare",
    slug: "aivendorcompare",
    name: "AI Vendor Compare",
    tagline: "Vendor Intelligence · Cost & Performance Governance",
    category: "intelligence",
    shortDescription: "Public comparison surface for model pricing, claims, lineup drift, and runtime freshness",
    description:
      "Public vendor-intelligence dashboard comparing provider pricing, lineup, capability claims, workload assumptions, and freshness. The current product publishes a versioned snapshot with Truth Graph, Surface Graph, formula provenance, and visible drift state rather than presenting stale data as live market truth.",
    problemStatement:
      "Provider prices, model names, billing units, and deprecations change independently. AI Vendor Compare explores how to turn those moving surfaces into sourced claims whose freshness and uncertainty remain visible.",
    role: "Product",
    status: "Public Demo",
    level: 2,
    year: 2024,
    featured: true,
    order: 1,
    technologies: ["Next.js", "Python", "versioned snapshots", "claim provenance"],
    verifiedMetrics: [
      {
        name: "Claims",
        value: "33/33 verified",
        context: "Current published snapshot in the public interface",
      },
      {
        name: "Freshness",
        value: "21+ days stale",
        context: "The public interface explicitly ages the latest recorded verification cycle instead of claiming live freshness",
      },
    ],
    honestLimits: [
      {
        title: "Pricing Accuracy",
        description: "Based on public pricing. Complex volume discounts may not be reflected.",
      },
      {
        title: "Performance Benchmarks",
        description: "Synthetic benchmarks. Real performance depends on your specific prompts and use cases.",
      },
    ],
    links: {
      live: "https://ai-vendor-compare.vercel.app/",
    },
    evidence: {
      interfaceType: "real",
      dataType: "snapshot",
      executionType: "live",
      codeVisibility: "private",
      previewLabel: "Real interface · Snapshot data",
      lastVerified: "2026-07-22",
      assets: {
        overview: {
          src: "/projects/aivendorcompare/live-preview.png",
          alt: "AI Vendor Compare snapshot dashboard showing publication date, freshness warning, claim verification status, coverage checks, and provider pricing cards",
          title: "Vendor comparison snapshot",
          caption: "Captured from the public dashboard snapshot. Claim coverage and pricing are time-stamped and may become stale; the badge is intentionally not presented as live execution.",
        },
        workflow: {
          src: "/projects/aivendorcompare/workflow.webp",
          alt: "Pricing timeline chart showing OpenAI GPT-4 price changes four times over 12 months with capability comparison table for six providers",
          title: "Claim drift and pricing history",
          caption: "Provider claims and pricing are tracked over time. The version history shows exactly what changed, when, and by how much.",
        },
        underTheHood: {
          src: "/projects/aivendorcompare/underhood.webp",
          alt: "Truth Graph visualization showing verified and disputed claims as nodes with data collection pipeline diagram",
          title: "Truth Graph and data pipeline",
          caption: "Claims are extracted from provider documentation, tested independently where possible, and stored with version history and source links.",
        },
      },
    },
    relatedSystems: ["llmtrace", "entropiccore"],
  },

  {
    id: "aigile-document-intelligence",
    slug: "aigile-document-intelligence",
    name: "aiGILE Document Intelligence",
    tagline: "Grounded Enterprise Intelligence · Semantic Document Processing",
    category: "intelligence",
    shortDescription: "Semantic search and understanding for large document collections",
    description:
      "Enterprise search powered by semantic understanding rather than keyword matching. Works with large document collections (policies, contracts, regulatory documents, knowledge bases). Returns grounded results with evidence chains. Built for teams that need to find and understand information fast.",
    problemStatement:
      "Keyword search fails on nuanced queries. Semantic search without grounding produces hallucinations. aiGILE Document Intelligence bridges the gap: semantic understanding grounded in real document evidence.",
    role: "Product",
    status: "Case Study",
    level: 2,
    year: 2023,
    featured: true,
    order: 2,
    technologies: ["Python", "vector search", "RAG", "document processing"],
    verifiedMetrics: [
      {
        name: "Search Accuracy",
        value: "94%",
        context: "Compared to manual document review on test queries",
      },
      {
        name: "Processing Speed",
        value: "<2s per query",
        context: "On 50K document collections",
      },
    ],
    honestLimits: [
      {
        title: "Domain Adaptation",
        description: "Needs fine-tuning for specialized terminology. General models may misunderstand domain-specific concepts.",
      },
      {
        title: "Multi-Language",
        description: "Currently optimized for English. Other languages need additional training data.",
      },
    ],
    links: {},
    evidence: {
      interfaceType: "representative",
      dataType: "anonymised",
      executionType: "recorded",
      codeVisibility: "selected",
      previewLabel: "Representative workflow",
      lastVerified: "2025-06-01",
      assets: {
        overview: {
          src: "/projects/aigile-document-intelligence/overview.webp",
          alt: "Document intelligence interface showing user query with grounded answer containing inline citations pointing to source passages and confidence score",
          title: "Grounded answer with citations",
          caption: "Every answer is grounded in retrieved document passages. Citations link directly to the source paragraph. No answer is presented without a retrievable evidence chain.",
        },
        workflow: {
          src: "/projects/aigile-document-intelligence/workflow.webp",
          alt: "Pipeline visualization showing document ingestion, embedding, semantic retrieval with similarity scores, and answer assembly with citations",
          title: "Retrieval and grounding pipeline",
          caption: "The pipeline ingests documents, creates embeddings, retrieves the most relevant passages for each query, and assembles a grounded answer with confidence scores.",
        },
        underTheHood: {
          src: "/projects/aigile-document-intelligence/underhood.webp",
          alt: "RAG architecture diagram showing embedding model, vector store, hybrid retrieval strategy, and document version history table",
          title: "RAG architecture and document versioning",
          caption: "Hybrid retrieval combines semantic and keyword search. Documents are versioned so the knowledge base stays current when source documents are updated.",
        },
      },
    },
    relatedSystems: ["llmtrace", "agnosticengine"],
  },

  {
    id: "brewmatch",
    slug: "brewmatch",
    name: "BrewMatch",
    tagline: "Intent Engine · Vertical AI Product",
    category: "products",
    shortDescription: "Live coffee taste matcher that turns brew preferences into a personalized recommendation profile",
    description:
      "A vertical AI product for specialty coffee. The public matcher captures taste preference, brew method, caffeine preference, and the current issue in the cup, then produces a reusable roast profile and buying guidance.",
    problemStatement:
      "Coffee shoppers often know what is wrong with a cup but not which catalog attributes will fix it. BrewMatch converts that lived preference into a structured profile before the next purchase.",
    role: "Product",
    status: "Live System",
    level: 2,
    year: 2023,
    featured: true,
    order: 3,
    technologies: ["Next.js", "Python", "intent classification", "personalization"],
    verifiedMetrics: [
      {
        name: "Live offers",
        value: "1,487",
        context: "Public product counter; current catalog coverage may change",
      },
      {
        name: "Recommendation-ready coffees",
        value: "179",
        context: "Public product counter; not a conversion benchmark",
      },
    ],
    honestLimits: [
      {
        title: "Cold Start Problem",
        description: "Needs user interaction history. First recommendations are generic.",
      },
      {
        title: "Regional Catalogs",
        description: "Specific to Spanish beverage market. Catalogs for other regions need local curation.",
      },
    ],
    links: {
      live: "https://brewmatch-two.vercel.app/",
    },
    evidence: {
      interfaceType: "real",
      dataType: "live",
      executionType: "live",
      codeVisibility: "private",
      previewLabel: "Real product interface",
      lastVerified: "2026-07-22",
      assets: {
        overview: {
          src: "/projects/brewmatch/live-preview.png",
          alt: "BrewMatch specialty coffee intent engine showing live offer counters and routes into the matcher and coffee atlas",
          title: "Live BrewMatch coffee discovery surface",
          caption: "A real public product surface: specialty coffee discovery with live-offer counters and direct routes into matching and catalog exploration.",
        },
        workflow: {
          src: "/projects/brewmatch/workflow.webp",
          alt: "Representative BrewMatch workflow from taste preferences through profile generation and buying guidance",
          title: "Taste intent workflow",
          caption: "The matcher turns taste and brew context into a structured roast profile and recommendation guidance.",
        },
        underTheHood: {
          src: "/projects/brewmatch/underhood.webp",
          alt: "Conceptual BrewMatch model showing how taste signals map to roast profile and product attributes",
          title: "Taste profile model",
          caption: "A conceptual view of the mapping between taste signals, brew context, roast profile, and buying guidance.",
        },
      },
    },
    relatedSystems: ["aigile-document-intelligence"],
  },

  // LEVEL 3: FOUNDATIONS & OPEN SOURCE
  {
    id: "llmtrace",
    slug: "llmtrace",
    name: "LLMTRACE",
    tagline: "LLM Observability · Open Source Monitoring",
    category: "observability",
    shortDescription: "Python toolkit for capturing LLM prompts, responses, tokens, costs, errors, and sessions",
    description:
      "An open-source Python toolkit for instrumenting LLM applications. It stores sessions locally, captures prompts and responses, tracks tokens, costs, metrics, feedback, and errors, and includes a lightweight Flask dashboard for inspection.",
    problemStatement:
      "LLM applications become difficult to debug once prompts, outputs, costs, and failures are scattered across logs. LLMTRACE provides a small instrumentation and trace-storage layer that can run locally.",
    role: "Open Source",
    status: "Open Source",
    level: 3,
    year: 2023,
    featured: true,
    order: 1,
    technologies: ["Python", "OpenTelemetry", "structured logging", "cost tracking"],
    verifiedMetrics: [
      {
        name: "Published",
        value: "PyPI v0.1.4",
        context: "Public package and repository; current project maturity is alpha",
      },
      {
        name: "Dashboard",
        value: "Local Flask UI",
        context: "Included for inspecting sessions, messages, metrics, feedback, and errors",
      },
    ],
    honestLimits: [
      {
        title: "Real-Time Streaming",
        description: "Batched reporting. Real-time dashboards need additional integration.",
      },
      {
        title: "Cost Attribution",
        description: "Tracks spend. Attribution to specific features requires custom tagging.",
      },
    ],
    links: {
      repo: "https://github.com/jandromani/llmtrace",
      pypi: "https://pypi.org/project/llmtrace/",
    },
    evidence: {
      interfaceType: "real",
      dataType: "anonymised",
      executionType: "recorded",
      codeVisibility: "public",
      previewLabel: "Real anonymised trace",
      lastVerified: "2026-07-22",
      assets: {
        overview: {
          src: "/projects/llmtrace/real-trace.png",
          alt: "LLMTRACE dashboard showing an anonymised support-triage session with model, token, cost, and timestamp fields",
          title: "Real anonymised trace",
          caption: "Captured from the package dashboard after a local run with anonymised user and session identifiers. The visible cost and token totals come from the trace data, not a mock card.",
        },
        workflow: {
          src: "/projects/llmtrace/workflow.webp",
          alt: "Code editor showing LLMTRACE Python decorator and the resulting trace in the dashboard alongside a pip install command",
          title: "Three-line instrumentation",
          caption: "Instrumenting any LLM call requires three lines of code: install, import, and decorate. The trace appears in the dashboard immediately.",
        },
        underTheHood: {
          src: "/projects/llmtrace/underhood.webp",
          alt: "Analytics dashboard showing 7-day LLM cost breakdown by model, request counts, latency percentiles, and error rate",
          title: "Cost and performance analytics",
          caption: "Aggregate analytics show cost breakdown by model, request volume, p95 latency, and error rate over configurable time windows.",
        },
      },
    },
    relatedSystems: ["aiactmiddleware", "entropiccore", "agnosticengine"],
  },

  // LEVEL 4: VENTURE LAB
  {
    id: "healthsync",
    slug: "healthsync",
    name: "HealthSync",
    tagline: "Health Tech Research Project",
    category: "products",
    shortDescription: "Experimental health monitoring and coordination system",
    description:
      "Research project exploring how AI can coordinate health information across providers. Early-stage work on interoperability and patient data governance.",
    problemStatement:
      "Health data is fragmented across providers. HealthSync explores how to give patients unified access to their own data.",
    role: "Research",
    status: "MVP",
    level: 4,
    year: 2023,
    featured: false,
    order: 1,
    technologies: ["Python", "health APIs", "data coordination"],
    links: {},
    relatedSystems: [],
  },

  {
    id: "servisenior",
    slug: "servisenior",
    name: "ServiSenior",
    tagline: "Elderly Care Coordination",
    category: "products",
    shortDescription: "Service coordination platform for senior care",
    description:
      "Platform for coordinating care services for elderly populations. Demonstrates how to build products that work in regulated, human-centric domains.",
    problemStatement:
      "Senior care is fragmented. ServiSenior attempts to coordinate services through a unified interface.",
    role: "Product",
    status: "MVP",
    level: 4,
    year: 2023,
    featured: false,
    order: 2,
    technologies: ["Next.js", "coordination logic", "accessibility"],
    links: {},
    relatedSystems: [],
  },

  // OCTOBER 2026 FRONTIER — original public HTML/repository evidence
  {
    id:"assetgraph",slug:"assetgraph",name:"AssetGraph",tagline:"Visual Intelligence · Evidence-backed Spatial Decisions",
    category:"intelligence",shortDescription:"Overhead perception, SAR tracking, identity continuity and evidence-gated decision objects.",
    description:"Original AssetGraph Frontier V14 overhead HTML is viewable in the interactive lab. It is one of several independent branches: Product Console V6 contains a richer OSINT interface, SAR V12 targets reacquisition, and Core 0.2.1/C17 is packaged engineering and tests. Dataset-specific research results are reported with their limited protocols.",
    problemStatement:"Computer vision without identity continuity, sensor context, reproducibility and traceable decision boundaries is not an inspectable enterprise intelligence system.",
    role:"Research",status:"Research",level:2,year:2026,featured:true,order:1,
    technologies:["Computer Vision","Python","GIS","Evidence Packs","Tracking"],
    verifiedMetrics:[{name:"PETS09 IDF1",value:"0.8555",context:"Blind test frames 61–120; zero ID switches in that specific evaluation"},
    {name:"Identity memory uplift",value:"+8.19 pp",context:"Cycle 09 separate identity lockbox"},
    {name:"SAR recall",value:"98.72%",context:"Frozen maritime stress window only"}],
    honestLimits:[{title:"Different branches",description:"Frontier V14 is the latest recovered overhead HTML, not newer than every Core/Console component."},
    {title:"No general production validation",description:"The benchmark results cannot be generalized to arbitrary cameras, domains or enterprise deployments."}],
    demo:{url:"/labs/assetgraph",notes:"Original independent overhead HTML with scoped benchmark notes"},
    links:{live:"/labs/assetgraph"},relatedSystems:["montageos","roomforge"]
  },
  {
    id:"montageos",slug:"montageos",name:"MontageOS",tagline:"Cinema Brain · Film Nervous System V6.4",
    category:"orchestration",shortDescription:"Narrative Bible, production memory, editorial judges and model/provider orchestration in one film-control workspace.",
    description:"An original interactive audiovisual production system, connecting a Cinema Brain, Living Bible, specialist reviews, media providers, shot orchestration and governance into a controllable workflow.",
    problemStatement:"Cinematic generation needs narrative consistency, review gates and traceable transitions beyond individual prompts or isolated clips.",
    role:"Research",status:"Public Demo",level:2,year:2026,featured:true,order:2,
    technologies:["Multimodal Agents","Cinema Brain","Living Bible","Workflow Gates","HTML"],
    verifiedMetrics:[{name:"Original release",value:"V6.4",context:"719 KB archived standalone HTML; external providers not included"}],
    honestLimits:[{title:"Provider-dependent rendering",description:"Real generated film outputs depend on external tools, credentials, credits and human editorial approval."}],
    demo:{url:"/labs/montageos"},links:{live:"/labs/montageos"},relatedSystems:["assetgraph","roomforge"]
  },
  {
    id:"roomforge",slug:"roomforge",name:"RoomForge",tagline:"Spatial AI · Gaussian Splatting · Digital Twins",
    category:"products",shortDescription:"Capture-to-3D workflow spanning frames, depth, SfM, point clouds and navigable property twins.",
    description:"RoomForge V7 explores how to create navigable property reconstructions from photographs and video, with browser-side fallbacks and optional external VGGT/depth and geometry services.",
    problemStatement:"Turning unconstrained phone video into a consistent spatial twin involves sensor, camera, reconstruction and visualization problems; a 3D viewer alone is not a full reconstruction pipeline.",
    role:"Research",status:"Research",level:2,year:2026,featured:true,order:3,
    technologies:["3D","VGGT","SfM","Depth","Gaussian Splatting"],
    verifiedMetrics:[{name:"Original version",value:"V7",context:"42 KB standalone Pure-JS experimental HTML"}],
    honestLimits:[{title:"End-to-end compute",description:"No general proof of GPU-based Gaussian Splat production from arbitrary real captures."}],
    demo:{url:"/labs/roomforge"},links:{live:"/labs/roomforge"},relatedSystems:["assetgraph","montageos"]
  },
  {
    id:"gearwatch",slug:"gearwatch",name:"GearWatch",tagline:"Event Intelligence · Causal Market Signals",
    category:"intelligence",shortDescription:"Ingest external events, extract proposed mechanisms and track confirmation against market observations.",
    description:"Original codebase exploring whether geopolitical and economic events can be translated into evidence-tagged hypotheses and compared against subsequent market data.",
    problemStatement:"News summarization is not a trading signal; hypotheses need independent confirmation, source lineage and failure tracking.",
    role:"Research",status:"Research",level:2,year:2026,featured:true,order:4,
    technologies:["GDELT","LLM Extraction","GitHub Actions","Market Data"],
    honestLimits:[{title:"No audited returns",description:"The existence of a signal workflow does not establish profitable predictions."}],
    links:{repo:"https://github.com/jandromani/HolaInframundo"},relatedSystems:["worldstate","assetgraph"]
  },
  {
    id:"worldstate",slug:"worldstate",name:"WORLD//STATE LIVE",tagline:"Geopolitical Intelligence · World Graph",
    category:"intelligence",shortDescription:"Maintain an inspectable state of geopolitical observations and separate observed developments from simulated scenarios.",
    description:"Original application bridging external event streams, world-state relationships, scenarios and a navigable intelligence map.",
    problemStatement:"Global-event analysis needs visible source attribution and a strict separation between what was observed and what the system inferred.",
    role:"Research",status:"Prototype",level:2,year:2026,featured:true,order:5,
    technologies:["World Graph","Events","Simulation","News Intelligence"],
    honestLimits:[{title:"Scenario boundaries",description:"Simulation is a modelled exercise rather than a factual description of future events."}],
    links:{repo:"https://github.com/jandromani/InframundoShow"},relatedSystems:["gearwatch","assetgraph"]
  },
  {
    id:"atlaslongstay",slug:"atlaslongstay",name:"Atlas Long Stay",tagline:"Travel Commerce · Verified Supply · Economic Attribution",
    category:"products",shortDescription:"Hotel search-to-booking workflow that distinguishes sourced inventory, pricing evidence and financial attribution.",
    description:"A full-stack original travel-commerce architecture with hotel identity, sourcing, verification, offer workflows, SEO entry points and payments or booking-related attribution modules.",
    problemStatement:"Search results are not contracted hotel inventory and discovered prices are not payable offers: commercial state must remain verifiable at every handoff.",
    role:"Product",status:"Prototype",level:2,year:2026,featured:true,order:6,
    technologies:["Next.js","Hotel APIs","SEO","Booking Workflow","Payments"],
    honestLimits:[{title:"Commercial adoption",description:"No verified bookings, partner supply volumes or revenue are claimed."}],
    links:{repo:"https://github.com/jandromani/Petshop"},relatedSystems:["agnosticengine","brewmatch"]
  },
  {
    id:"pumpum",slug:"pumpum",name:"Pum Pum Café 3D",tagline:"Pixel-art-inspired Interactive 3D · Living Characters",
    category:"products",shortDescription:"A dense, explorable café with characters, menus, environment interactions and day/night controls.",
    description:"The exact original interactive Pum Pum Café 3D HTML, presented in its own project card rather than as the homepage banner.",
    problemStatement:"Show how a lively visual world can become a navigable experience rather than a static hero illustration.",
    role:"Research",status:"Public Demo",level:4,year:2026,featured:false,order:3,
    technologies:["Three.js","HTML","Character Simulation","Interactive 3D"],
    verifiedMetrics:[{name:"HTML source",value:"97 KB",context:"Excluding external Three.js runtime"}],
    honestLimits:[{title:"Browser environment",description:"WebGL and a public CDN are required for the original scene."}],
    demo:{url:"/labs/pumpum"},links:{live:"/labs/pumpum"},relatedSystems:["roomforge","montageos"]
  },

]

export function getSystemBySlug(slug: string): System | undefined {
  return systems.find((system) => system.slug === slug)
}

export function getSystemById(id: string): System | undefined {
  return systems.find((system) => system.id === id)
}

export function getRelatedSystems(systemId: string): System[] {
  const system = getSystemById(systemId)
  if (!system) return []
  return system.relatedSystems
    .map((id) => getSystemById(id))
    .filter((s): s is System => s !== undefined)
}

export function getSystemsByLevel(level: 1 | 2 | 3 | 4): System[] {
  return systems.filter((s) => s.level === level).sort((a, b) => a.order - b.order)
}

export function getSystemsByCategory(category: System["category"]): System[] {
  return systems.filter((s) => s.category === category)
}

export function getFeaturedSystems(): System[] {
  return systems.filter((s) => s.featured).sort((a, b) => a.level - b.level || a.order - b.order)
}

export function getSystemsByStatus(status: System["status"]): System[] {
  return systems.filter((s) => s.status === status)
}

export const categories = [
  "governance",
  "orchestration",
  "stability",
  "safety",
  "observability",
  "intelligence",
  "products",
  "platform",
] as const

export const statuses = [
  "Live System",
  "Open Source",
  "Research",
  "Public Demo",
  "MVP",
  "Prototype",
  "Case Study",
  "Archived",
  "Private",
] as const

export const levels = [1, 2, 3, 4] as const
