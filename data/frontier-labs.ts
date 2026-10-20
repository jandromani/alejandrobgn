export type OriginalLab = {
  slug: string
  title: string
  family: "Intelligence" | "Creative" | "Spatial" | "Robotics" | "Agentic"
  eyebrow: string
  summary: string
  demo: string
  archive?: string
  cover?: string
  evidence: string
  inspect: readonly string[]
  dependencies: string
  sourceLabel: string
  qa: "local-dom-render" | "source-only"
  qaNote: string
}
export type PlatformProject = { title: string; area: string; description: string; repo: string; evidence: string }

export const originalLabs: readonly OriginalLab[] = [
  {
    slug: "assetgraph",
    title: "AssetGraph · Frontier V14",
    family: "Intelligence",
    eyebrow: "OVERHEAD PERCEPTION / DECISION OBJECTS",
    summary: "Overhead intelligence console exploring tracked entities, mission context and inspectable decision evidence.",
    demo: "/labs/original/assetgraph.html",
    cover: "/labs/covers/assetgraph.webp",
    evidence: "Original recovered Frontier V14 HTML. Distinct from the V6 Intelligence Console and other AssetGraph research branches.",
    inspect: ["Overhead observation and track continuity", "Confidence and evidence interpretation", "Research interface, not a claim of operational surveillance"],
    dependencies: "Standalone HTML. Some data, imagery or integrations may be illustrative, cached or require external services.",
    sourceLabel: "Original archive · Frontier V14",
    qa: "local-dom-render",
    qaNote: "Offline Chromium rendered the promotion audit with FALSE as its recorded status. No interactive controls in the inspected view; model promotion is not implied.",
  },
  {
    slug: "montageos",
    title: "MontageOS · V6.4",
    family: "Creative",
    eyebrow: "AGENTIC CINEMA / CREATIVE GOVERNANCE",
    summary: "Film-control workspace with narrative memory, Cinema Brain, Living Bible, timeline and editorial quality gates.",
    demo: "/labs/original/montageos.html",
    cover: "/labs/covers/montageos.webp",
    evidence: "Recovered V6.4 HTML artifact, not a new mockup or evidence of a completed generated film.",
    inspect: ["Narrative context and shot composition", "Provider and specialist orchestration", "Creative review and export surfaces"],
    dependencies: "Remote model or media generation may require external providers, credits and configuration.",
    sourceLabel: "Original archive · V6.4",
    qa: "local-dom-render",
    qaNote: "Offline Chromium rendered the original editor and 172 controls without uncaught page errors; media providers and full editing flows remain unverified.",
  },
  {
    slug: "roomforge",
    title: "RoomForge · V7",
    family: "Spatial",
    eyebrow: "SPATIAL AI / DIGITAL TWIN LAB",
    summary: "Browser experiment connecting images, frames, depth and camera geometry to a digital-twin workflow.",
    demo: "/labs/original/roomforge.html",
    cover: "/labs/covers/roomforge.webp",
    evidence: "Original V7 HTML. The viewer is not proof of completed Gaussian splatting or production reconstruction.",
    inspect: ["Spatial capture workflow", "Optional remote VGGT or SfM pathways", "3D viewer and export-oriented architecture"],
    dependencies: "Actual reconstruction and advanced splatting require suitable imagery, compute, services or a capable browser.",
    sourceLabel: "Original archive · V7",
    qa: "source-only",
    qaNote: "Original HTML and archive cover recovered; WebGL and remote reconstruction require browser and provider validation.",
  },
  {
    slug: "pumpum",
    title: "Pum Pum Café · 3D",
    family: "Creative",
    eyebrow: "THREE.JS / INTERACTIVE ENVIRONMENT",
    summary: "Navigable stylized 3D café, with animated characters, hotspots, interior and lighting changes.",
    demo: "/labs/original/pumpum.html",
    cover: "/labs/covers/pumpum.webp",
    evidence: "Original Pum Pum environment recovered from the standalone archive; a separate creative case.",
    inspect: ["Spatial navigation and camera changes", "In-world interaction and populated environment", "Real-time lighting and Three.js scene"],
    dependencies: "Requires browser WebGL and Three.js r128 delivered by a public CDN.",
    sourceLabel: "Original archive · Three.js",
    qa: "local-dom-render",
    qaNote: "Offline Chromium rendered the original café interface and 21 controls; WebGL scene, character animation and mobile navigation still require real device QA.",
  },
  {
    slug: "robotics-radar",
    title: "Robotics · Strategic Markets Radar",
    family: "Robotics",
    eyebrow: "HUMANOIDS / SUPPLY-CHAIN MARKETS",
    summary: "Standalone strategic radar investigating robotics exposure, structural bottlenecks and company hypotheses.",
    demo: "/labs/original/robotics-radar.html",
    evidence: "Original RDX_ALL_VISIBLE_2026.html recovered from the 12 October research archive.",
    inspect: ["Sector and supply-chain candidate screens", "Interpretation of weak links and dependencies", "Scenario inputs, not investment signals"],
    dependencies: "Research demonstration: economic figures and market assumptions require independent and current verification.",
    sourceLabel: "Original archive · October 2026",
    qa: "local-dom-render",
    qaNote: "Offline Chromium DOM rendered and controls were discovered; market data freshness and full interactions are unverified.",
  },
  {
    slug: "robotics-terminal",
    title: "Robotics · Investment Terminal",
    family: "Robotics",
    eyebrow: "COMPANIES / SCENARIOS / ROBOTICS",
    summary: "Independent interactive terminal for exploring companies, investment quality and robotics demand hypotheses.",
    demo: "/labs/original/robotics-investment-terminal.html",
    evidence: "Original robotics_investment_terminal_2026.html, copied byte-for-byte from the archived standalone.",
    inspect: ["Comparative company analysis", "Investment scenario interfaces", "Research hypotheses versus verified market observations"],
    dependencies: "Research only: not financial advice; prices, contracts and estimates may be synthetic, historical or stale.",
    sourceLabel: "Original archive · October 2026",
    qa: "local-dom-render",
    qaNote: "Offline Chromium DOM rendered with buttons and inputs; scenario calculations and live data are unverified.",
  },
  {
    slug: "openspec",
    title: "OpenSpec · SDD Lab",
    family: "Agentic",
    eyebrow: "SPEC-DRIVEN DEVELOPMENT / PYODIDE",
    summary: "Interactive browser laboratory exploring agent roles, specifications, human reviews and controlled execution.",
    demo: "/labs/runtime/openspec-sdd-lab-fixed.html",
    archive: "/labs/original/openspec-sdd-lab.html",
    evidence: "Original openspec_sdd_lab.html preserved unchanged. The public runtime copy fixes a guide-button selector located outside #app; Pyodide is not confirmed end to end.",
    inspect: ["Specification-first lifecycle", "Agents, gates and validation flow", "In-browser Pyodide execution where supported"],
    dependencies: "Pyodide and remote JavaScript dependencies may require network access; example output is illustrative.",
    sourceLabel: "Original archive · Browser Python",
    qa: "local-dom-render",
    qaNote: "Offline Chromium reproduced the original guide selector error and verified that the isolated one-line runtime fix removes that exception. WebGL and Pyodide remain unverified.",
  },
  {
    slug: "entropic-agent-lab",
    title: "Entropic Agent Lab · V7.1",
    family: "Agentic",
    eyebrow: "AGENT RELIABILITY / PYODIDE",
    summary: "Original browser-based experiment for multi-agent control, entropy, recovery and guided engineering flows.",
    demo: "/labs/original/entropic-agent-lab.html",
    evidence: "Recovered ENTROPIC-AGENT-LAB V7.1 standalone with Pyodide references; not the later v8.1 editorial branch.",
    inspect: ["Agent workflow states and guided controls", "Entropy/recovery visual explanations", "Browser-executed Python pathways where available"],
    dependencies: "Research sandbox; Pyodide may load externally. Conceptual controls are not proof of production autonomy.",
    sourceLabel: "Original archive · V7.1",
    qa: "local-dom-render",
    qaNote: "Offline Chromium DOM rendered without uncaught errors; internal page title says v5.1 although the archived filename says v7.1. Runtime lineage and Pyodide flows remain unverified.",
  },
] as const

export const platformProjects: readonly PlatformProject[] = [
  {
    title: "GearWatch V6",
    area: "Causal market intelligence · Multi-file application",
    description: "WORLD → MONEY: causal mechanisms, signals, independent market confirmation and thesis tracking. A real repository, not a standalone HTML. No verified trading profitability is claimed.",
    repo: "https://github.com/jandromani/HolaInframundo",
    evidence: "Public repository / README and implementation",
  },
  {
    title: "WORLD//STATE LIVE",
    area: "Geopolitical simulation · Live-data architecture",
    description: "Graph of global tensions, public-event intake and a separate fictional strategy fork. Simulated tension indices are not event probabilities.",
    repo: "https://github.com/jandromani/InframundoShow",
    evidence: "Public repository / documented data and simulation separation",
  },
  {
    title: "A2A · Agentic Platform",
    area: "Multi-agent engineering · API and control",
    description: "An executable architecture for knowledge, technical inventory and operational workflows, with scoped tools, approvals and configuration-dependent providers.",
    repo: "https://github.com/jandromani/A2A",
    evidence: "Public repository / executable examples and documented limits",
  },
  {
    title: "Fabrik-Codek",
    area: "Local AI memory · Personal knowledge architecture",
    description: "A local-first cognitive assistant exploring retrieval, knowledge graphs and adaptive tooling around a user-managed model.",
    repo: "https://github.com/jandromani/Fabrik-Codek",
    evidence: "Public repository / inspect source and setup requirements",
  },
  {
    title: "Atlas Long Stay",
    area: "Hotel commerce · Product architecture",
    description: "Verification-led hotel search, pricing evidence and sourcing workflow. Searchable properties are not equivalent to bookable inventory.",
    repo: "https://github.com/jandromani/Petshop",
    evidence: "Public repository / explicit commercial readiness gates",
  },
] as const

export function findOriginalLab(slug: string) {
  return originalLabs.find((lab) => lab.slug === slug)
}
