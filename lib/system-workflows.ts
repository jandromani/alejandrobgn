export type WorkflowNodeKind =
  | "input"
  | "agent"
  | "control"
  | "model"
  | "store"
  | "output"

export interface WorkflowNode {
  id: string
  eyebrow: string
  label: string
  description: string
  technologies: string[]
  kind: WorkflowNodeKind
  x: number
  y: number
  proof: string
}

export interface WorkflowEdge {
  from: string
  to: string
  label?: string
}

export interface SystemWorkflow {
  title: string
  summary: string
  disclosure: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

const fanInEdges: WorkflowEdge[] = [
  { from: "n1", to: "n2" },
  { from: "n1", to: "n3" },
  { from: "n2", to: "n4" },
  { from: "n3", to: "n4" },
  { from: "n4", to: "n5" },
  { from: "n4", to: "n6" },
  { from: "n5", to: "n7" },
  { from: "n6", to: "n7" },
]

const positions = {
  n1: { x: 95, y: 220 },
  n2: { x: 275, y: 115 },
  n3: { x: 275, y: 325 },
  n4: { x: 485, y: 220 },
  n5: { x: 680, y: 115 },
  n6: { x: 680, y: 325 },
  n7: { x: 895, y: 220 },
} as const

function node(
  id: keyof typeof positions,
  eyebrow: string,
  label: string,
  description: string,
  technologies: string[],
  kind: WorkflowNodeKind,
  proof: string,
): WorkflowNode {
  return { id, eyebrow, label, description, technologies, kind, proof, ...positions[id] }
}

export const systemWorkflows: Record<string, SystemWorkflow> = {
  aiactmiddleware: {
    title: "Governed inference path",
    summary: "A request becomes a governed model interaction with explicit policy gates and an evidence trail.",
    disclosure: "Representative workflow based on the public prototype surface and stated architecture.",
    edges: fanInEdges,
    nodes: [
      node("n1", "Input", "AI request", "A prompt arrives with the use case and runtime context needed for a governance decision.", ["request context", "use case"], "input", "The public prototype exposes governance-focused prompts through a real chat surface."),
      node("n2", "Context", "Use-case capture", "The runtime records purpose, actor, model path, and the context required to interpret risk.", ["FastAPI", "typed context"], "agent", "Context capture is architectural; it is not a legal determination by itself."),
      node("n3", "Policy", "Risk signals", "Rules map the interaction to candidate risk signals and required control checks.", ["policy rules", "EU AI Act"], "control", "Signals are assistive controls and still require organisation-specific legal interpretation."),
      node("n4", "Control plane", "Policy gates", "The middleware decides which controls, disclosures, logging, or review steps must execute.", ["control plane", "guardrails"], "control", "This is the core middleware responsibility represented by the public prototype."),
      node("n5", "Runtime", "Managed model", "Approved requests continue through a server-managed model path.", ["LLM runtime", "server managed"], "model", "The public prototype explicitly identifies its server-managed runtime."),
      node("n6", "Escalation", "Human review", "Higher-risk or ambiguous cases are routed to a human decision point.", ["review gate", "override"], "output", "A human gate is a control boundary, not a claim of automated compliance."),
      node("n7", "Evidence", "Audit event", "Decision context, applied controls, and the resulting response are assembled into an inspectable event.", ["OpenTelemetry", "PostgreSQL"], "store", "The graph is representative; the lead screenshot remains the real public prototype."),
    ],
  },
  agnosticengine: {
    title: "Intent-to-product runtime",
    summary: "Buyer language and live catalog structure converge into ranked product actions and measurable handoffs.",
    disclosure: "Representative runtime view derived from the current public product-discovery surface.",
    edges: fanInEdges,
    nodes: [
      node("n1", "Input", "Buyer intent", "A shopper describes a need in natural language instead of navigating rigid filters.", ["conversation", "intent"], "input", "The public surface demonstrates assisted buyer conversations."),
      node("n2", "Commerce", "Catalog adapter", "Product data is normalised from Shopify or WooCommerce into a searchable catalog shape.", ["Shopify", "WooCommerce"], "store", "The public page names both commerce integrations and displays catalog coverage."),
      node("n3", "Interpretation", "Intent model", "The request is translated into attributes, constraints, and a product-selection objective.", ["intent routing", "constraints"], "agent", "This is a representative view of the product-discovery runtime, not an LLM vendor router."),
      node("n4", "Decision", "Product ranker", "Intent and catalog evidence are combined into a ranked set of relevant products.", ["ranking", "catalog evidence"], "agent", "Ranking quality depends on the connected merchant catalog and merchandising rules."),
      node("n5", "Experience", "Assisted answer", "The system returns an explanation and product candidates inside the buying conversation.", ["Next.js", "conversation UI"], "output", "The public proof board shows conversation and product-discovery activity."),
      node("n6", "Action", "Commerce handoff", "Recommendations lead into product clicks, add-to-cart, or another merchant-owned action.", ["click", "add-to-cart"], "output", "The runtime is designed to end in a commerce action rather than a standalone answer."),
      node("n7", "Evidence", "Proof board", "Catalog, conversation, and assisted-action signals are exposed as a time-bound product proof surface.", ["event counters", "snapshot"], "store", "Public proof-board values are product claims, not independently audited conversion metrics."),
    ],
  },
  entropiccore: {
    title: "Entropy regulation loop",
    summary: "Agent state is measured, compared with policy, and corrected before instability compounds.",
    disclosure: "Representative control loop; package version and test counts come from the public proof surface.",
    edges: fanInEdges,
    nodes: [
      node("n1", "Runtime", "Agent state", "The running agent exposes the state and signals needed for stability analysis.", ["agent state", "runtime"], "input", "The graph explains the package concept; it is not a claim of one universal stability metric."),
      node("n2", "Measurement", "Entropy index", "State variation is condensed into an entropy signal that can be tracked over time.", ["entropy", "telemetry"], "agent", "The public surface displays an entropy output produced by the package concept."),
      node("n3", "Recovery", "Checkpoint store", "Known-good state is retained as a recovery option before intervention is required.", ["checkpoint", "state store"], "store", "Checkpoint behaviour is part of the representative runtime design."),
      node("n4", "Policy", "Threshold gate", "The current signal is evaluated against configured stability policy and operating bounds.", ["thresholds", "policy"], "control", "Thresholds are application-specific and require calibration."),
      node("n5", "Decision", "Intervention plan", "When policy is breached, the runtime selects a bounded correction or recovery action.", ["controller", "intervention"], "agent", "The intervention pattern is represented conceptually rather than as a live production trace."),
      node("n6", "Fallback", "Restore state", "The runtime can fall back to a known-good checkpoint when correction is insufficient.", ["rollback", "checkpoint"], "control", "Recovery remains dependent on the host agent and its state model."),
      node("n7", "Output", "Stable resume", "The agent resumes with a recorded stability event for later inspection.", ["resume", "telemetry"], "output", "Public proof currently covers the package surface, version, and test status."),
    ],
  },
  psycheos: {
    title: "Browser-local safety evaluation",
    summary: "Attack protocols, personas, and environments combine into a bounded local evaluation and inspectable verdict.",
    disclosure: "Representative workflow based on the public BYOK, browser-local product surface.",
    edges: fanInEdges,
    nodes: [
      node("n1", "Target", "Model config", "The evaluator receives a target configuration and user-provided model access path.", ["BYOK", "target config"], "input", "The public product describes a bring-your-own-key, browser-local model."),
      node("n2", "Library", "Attack protocols", "Selected adversarial protocols define the behaviours the evaluation will probe.", ["700+ protocols", "red teaming"], "store", "The protocol count is a current public product claim, not an external certification."),
      node("n3", "Context", "Persona + environment", "Personas and environments shape the scenario in which each protocol is executed.", ["personas", "environments"], "agent", "The public product lists multiple personas and environments as evaluation dimensions."),
      node("n4", "Execution", "Local evaluator", "The browser orchestrates prompts and model responses without a PsycheOS server receiving the test data.", ["browser local", "zero server"], "model", "Browser-local and no-telemetry are stated properties of the public surface."),
      node("n5", "Analysis", "Behaviour scoring", "Observed responses are mapped to risk dimensions and severity signals.", ["risk scoring", "signals"], "agent", "Scores support investigation; they do not replace domain-specific safety review."),
      node("n6", "Control", "Review gate", "Potential failures remain available for manual interpretation and retesting.", ["human review", "retest"], "control", "Human review prevents an automated score being presented as final truth."),
      node("n7", "Evidence", "Safety report", "The run produces an inspectable result that ties scenarios to observed model behaviour.", ["report", "evidence"], "output", "The lead preview is a real public product surface; the workflow itself is representative."),
    ],
  },
  aivendorcompare: {
    title: "Claim verification pipeline",
    summary: "Primary-source claims are normalised, checked, time-stamped, and published as a deliberately perishable snapshot.",
    disclosure: "Representative workflow behind a real, time-stamped public snapshot interface.",
    edges: fanInEdges,
    nodes: [
      node("n1", "Sources", "Vendor claims", "Pricing, model, and capability claims enter from identified public vendor sources.", ["primary sources", "pricing"], "input", "The public dashboard exposes claim coverage and verification state."),
      node("n2", "Schema", "Claim normaliser", "Different vendor formats are converted into comparable fields with provenance attached.", ["normalisation", "provenance"], "agent", "Normalisation makes comparison possible but cannot remove all vendor ambiguity."),
      node("n3", "Time", "Freshness clock", "Each claim retains publication and verification timing so staleness remains visible.", ["timestamp", "freshness"], "control", "The current public surface explicitly warns when its snapshot is stale."),
      node("n4", "Rules", "Verification checks", "Coverage and consistency checks decide whether a claim can be shown as verified, missing, or disputed.", ["33/33 claims", "checks"], "control", "Counts are tied to the published snapshot and can change on the next verification run."),
      node("n5", "Build", "Snapshot publisher", "A bounded data release is assembled instead of implying continuously live vendor intelligence.", ["snapshot", "versioning"], "store", "The UI is correctly labelled as snapshot data rather than live execution."),
      node("n6", "Watch", "Drift monitor", "Age and source changes identify where the published comparison needs to be refreshed.", ["drift", "alerts"], "agent", "Freshness signals reveal uncertainty instead of hiding it."),
      node("n7", "Surface", "Comparison UI", "Users inspect pricing and capability cards with verification and freshness context attached.", ["Next.js", "evidence UI"], "output", "The lead preview is a real interface captured from the public snapshot."),
    ],
  },
  "aigile-document-intelligence": {
    title: "Document intelligence workflow",
    summary: "Unstructured enterprise documents become reviewable structured records with traceable extraction steps.",
    disclosure: "Representative case-study workflow; no public runtime is claimed.",
    edges: fanInEdges,
    nodes: [
      node("n1", "Input", "Enterprise docs", "Documents arrive in different layouts, qualities, and business formats.", ["PDF", "images"], "input", "The project is presented as a case study rather than a live public product."),
      node("n2", "Ingestion", "OCR + parsing", "Text, layout, and document boundaries are extracted into a processable representation.", ["OCR", "parsing"], "agent", "Extraction quality depends on source quality and document type."),
      node("n3", "Context", "Document class", "Classification selects the schema and business rules appropriate to the document.", ["classification", "schemas"], "control", "Rules remain domain-specific and need maintained examples."),
      node("n4", "Extraction", "Field pipeline", "Target fields and relationships are extracted with confidence and source context.", ["NLP", "confidence"], "model", "The workflow visualises the processing pattern without claiming a public execution."),
      node("n5", "Control", "Validation rules", "Business constraints catch incompatible or incomplete extracted values.", ["validation", "business rules"], "control", "Validation narrows errors but cannot eliminate human review for edge cases."),
      node("n6", "Review", "Exception queue", "Low-confidence or conflicting records are sent to an operator with source context.", ["human review", "exceptions"], "output", "The case study treats review as part of the system, not as failure."),
      node("n7", "Output", "Structured record", "Approved data is published to a downstream API or enterprise workflow.", ["API", "structured data"], "store", "The graph is a representative workflow and is labelled accordingly."),
    ],
  },
  brewmatch: {
    title: "Taste-to-offer intent engine",
    summary: "Taste language and catalog evidence combine into explainable coffee matches and merchant-owned actions.",
    disclosure: "Representative workflow supporting a real public product interface.",
    edges: fanInEdges,
    nodes: [
      node("n1", "Input", "Taste intent", "The buyer describes flavour, brew method, caffeine preference, and what is wrong in the cup.", ["taste", "brew context"], "input", "The live public product exposes taste and discovery entry points."),
      node("n2", "Profile", "Intent interpreter", "Natural preferences are translated into a reusable roast and preparation profile.", ["intent model", "profile"], "agent", "The profile is guidance for discovery, not a guarantee of taste."),
      node("n3", "Catalog", "Coffee offers", "Merchant offers are normalised with roast, origin, process, and availability signals.", ["1,487 offers", "catalog"], "store", "Offer and recommendation-ready counts are public product counters and can change."),
      node("n4", "Decision", "Match engine", "The taste profile and catalog attributes produce ranked, explainable candidate coffees.", ["matching", "ranking"], "agent", "Recommendation quality depends on catalog detail and user input."),
      node("n5", "Experience", "Coffee guidance", "The product explains the match with roast guidance, brew tips, and buying keywords.", ["Next.js", "explanations"], "output", "The output helps the buyer decide before leaving the product."),
      node("n6", "Commerce", "Offer routing", "High-intent users are routed to the merchant that owns price, stock, checkout, and fulfilment.", ["merchant link", "handoff"], "output", "BrewMatch does not claim to sell coffee or manage fulfilment."),
      node("n7", "Evidence", "Intent events", "First-party events can connect discovery, outbound clicks, and later conversion imports.", ["first-party events", "analytics"], "store", "Public counters are product evidence, not audited commercial outcomes."),
    ],
  },
  llmtrace: {
    title: "Local observability path",
    summary: "An instrumented LLM call becomes a local trace with messages, costs, latency, feedback, and errors attached.",
    disclosure: "Representative instrumentation path paired with a real anonymised package run.",
    edges: fanInEdges,
    nodes: [
      node("n1", "Call", "LLM function", "An application invokes an instrumented LLM function inside a trace session.", ["Python", "decorator"], "input", "The package repository documents lightweight Python instrumentation."),
      node("n2", "Context", "Trace session", "Session and user context group related messages without requiring a hosted platform.", ["session", "context"], "agent", "The delivered screenshot uses anonymised local session and user identifiers."),
      node("n3", "Capture", "Usage signals", "Prompts, responses, tokens, cost, latency, feedback, and errors become trace records.", ["tokens", "latency", "cost"], "agent", "Captured values depend on what the application and provider expose."),
      node("n4", "Storage", "Local SQLite", "Trace records persist locally for inspection and aggregation.", ["SQLite", "local first"], "store", "The package is intentionally lightweight rather than a hosted multi-tenant service."),
      node("n5", "Compute", "Metrics rollup", "Stored records are aggregated into session and model-level operational views.", ["aggregation", "metrics"], "agent", "The local run used the package's real aggregation endpoints."),
      node("n6", "Loop", "Feedback + errors", "Human feedback and failures reconnect output quality to the original session.", ["feedback", "errors"], "control", "Feedback remains meaningful only when teams define how it will be reviewed."),
      node("n7", "Surface", "Flask dashboard", "A local dashboard exposes traces and totals for debugging and operational review.", ["Flask", "dashboard"], "output", "The lead preview was captured from an actual local package run with anonymised data."),
    ],
  },
}

export function getSystemWorkflow(slug: string): SystemWorkflow | undefined {
  return systemWorkflows[slug]
}
