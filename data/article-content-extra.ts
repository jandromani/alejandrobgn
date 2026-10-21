import type { DeepArticle } from "@/data/article-content"

export const articleContentExtra: Record<string, DeepArticle> = {
  "ai-platform-economics": {
    standfirst: "The provider invoice is only one line in the economics of an AI platform. Real unit cost includes retrieval, orchestration, retries, evaluation, human review, observability, idle capacity, failed sessions, and the engineering needed to keep behavior inside an acceptable envelope.",
    thesis: "Optimize margin per verified outcome, not price per token. A cheaper call that increases retries, abandonment, or review load can be the most expensive route in the system.",
    takeaways: [
      "Build a cost ledger at trace and tenant level.",
      "Separate inference, platform, assurance, and failure cost.",
      "Route by outcome class and quality floor.",
      "Cache only when semantics, privacy, and invalidation are understood.",
      "Budget before execution and reconcile after it.",
      "Price uncertainty and human review into the product model.",
    ],
    sections: [
      {
        id: "economic-unit",
        title: "Define the economic unit",
        paragraphs: [
          "Tokens are an input, not a customer outcome. Pick the unit the product creates: a verified extraction, resolved support case, accepted recommendation, completed research brief, or safely executed workflow. Attribute every model call, tool, retrieval, evaluator, and review minute to that unit through a shared trace identifier.",
          "Report distributions rather than averages. A small tail of looping agents can consume the margin created by thousands of ordinary requests. Segment by task, tenant, route, cache status, outcome, and failure reason so optimization does not hide quality regressions.",
        ],
        bullets: [
          "Direct cost: model input, output, cached, reasoning, media, and tool-provider charges.",
          "Platform cost: gateways, queues, vector search, databases, telemetry, and egress.",
          "Assurance cost: evaluation, moderation, red teaming, human review, and incident response.",
          "Failure cost: retries, abandoned work, compensation, refunds, and support.",
        ],
      },
      {
        id: "runtime-budgets",
        title: "Make budgets part of the runtime contract",
        paragraphs: [
          "A workflow should receive maximum cost, deadline, call count, and review allowance alongside its goal. The planner may reserve budget for branches, but a deterministic runtime decides whether to continue, downgrade, ask, or stop. Asking the model to be economical is not an accounting control.",
          "Use progressive investment. Start with deterministic rules or a small classifier, spend more only when uncertainty or value justifies it, and reserve expensive reasoning for decisions where it changes expected outcome. Calibrate the cascade with representative evaluations; do not assume small models are always sufficient.",
        ],
      },
      {
        id: "cache-economics",
        title: "Caching is an invalidation and privacy design",
        paragraphs: [
          "Exact caches suit deterministic, versioned, non-personal requests. Prefix caching can reduce repeated context processing but has provider-specific semantics. Semantic caching creates greater savings and greater risk: similar wording does not imply equivalent authorization, freshness, jurisdiction, or required evidence.",
          "Keys should incorporate every semantic input capable of changing correctness: model, prompt, policy, tenant, locale, source snapshot, tool schema, and permission boundary. Record why a hit was eligible. A cross-tenant cache must never turn cost optimization into data leakage.",
        ],
        bullets: [
          "Derive TTL from source volatility.",
          "Use versioned namespaces and content hashes.",
          "Bypass consequential decisions unless equivalence is proven.",
          "Measure avoided spend and cache-induced error together.",
        ],
      },
      {
        id: "optimize-system",
        title: "Optimize the system, not the invoice",
        paragraphs: [
          "The safe optimization loop is measure, hypothesize, replay, shadow, canary, and ramp. Test prompt compaction, model substitution, retrieval changes, caching, and evaluator sampling against one outcome scorecard. Accept savings only while quality, safety, and latency remain inside guardrails.",
          "FinOps, AI engineering, product, and finance need one vocabulary. Finance sees forecast, commitments, allocation, and margin. Engineers see spend attached to traces, versions, routes, and failures. Product sees outcome value and willingness to pay. Without one ledger, each group optimizes a different denominator.",
        ],
      },
    ],
    failureModes: [
      { mode: "Token myopia", signal: "Dashboards exclude tools, retries, review, and failed outcomes.", response: "Allocate end-to-end spend to a verified product outcome." },
      { mode: "Cheap-model trap", signal: "Inference price falls while correction and abandonment rise.", response: "Enforce task quality floors and optimize total outcome cost." },
      { mode: "Unsafe cache", signal: "Hits cross permissions, stale data, or tenant boundaries.", response: "Version semantic inputs, isolate tenants, and bypass high-impact decisions." },
      { mode: "Unbounded autonomy", signal: "Long-tail runs dominate spend and latency.", response: "Set call, cost, time, fan-out, and review budgets with safe stop paths." },
    ],
    metrics: [
      { metric: "Cost per verified outcome", why: "The denominator customers value.", guardrail: "Include failure, review, tools, and allocated platform spend." },
      { metric: "Gross margin by task", why: "Reveals workflows hidden by blended averages.", guardrail: "Review p50, p95, and loss-making tail separately." },
      { metric: "Retry waste", why: "Shows spend that created no new evidence.", guardrail: "Fingerprint equivalent attempts and cap repetition." },
      { metric: "Cache value", why: "Balances avoided compute against incorrect reuse.", guardrail: "Track savings and quality delta by cache class." },
      { metric: "Commit utilization", why: "Exposes idle provisioned capacity and spillover.", guardrail: "Forecast by workload shape, not annual token average." },
    ],
    implementation: [
      { phase: "Instrument the ledger", outcome: "Every cost maps to trace, tenant, task, route, and outcome.", work: ["Normalize provider usage", "Capture tools and review", "Allocate shared spend", "Tag failed outcomes"] },
      { phase: "Define budgets", outcome: "Workflows know economic and latency limits before acting.", work: ["Budget by task value", "Reserve branch allowance", "Define downgrade and stop", "Alert on tail growth"] },
      { phase: "Create quality floors", outcome: "Cheaper routes cannot silently reduce quality.", work: ["Build representative evaluations", "Calibrate routing", "Measure rework", "Set rollback thresholds"] },
      { phase: "Optimize safely", outcome: "Cost changes ship through evidence.", work: ["Replay", "Shadow", "Canary", "Publish margin and quality deltas"] },
    ],
    checklist: ["Can spend be reconciled to one outcome?", "Do budgets stop loops before the invoice does?", "Does caching include tenant and policy versions?", "Are failed sessions included in unit cost?", "Is human review priced?", "Can route changes roll back?", "Are commitments compared with real utilization?", "Does pricing reflect expensive actions?"],
    sources: [
      { title: "Compare API models", publisher: "OpenAI Developers", url: "https://developers.openai.com/api/docs/models/compare", note: "First-party model pricing and capability dimensions used as market-data inputs rather than realised workload cost." },
      { title: "Gemini Developer API pricing", publisher: "Google AI for Developers", url: "https://ai.google.dev/gemini-api/docs/pricing", note: "First-party evidence for standard, cache and batch pricing distinctions." },
      { title: "Claude pricing", publisher: "Claude Platform", url: "https://platform.claude.com/docs/en/about-claude/pricing", note: "First-party model, caching, batch, long-context and regional pricing mechanics." },
      { title: "Usage and Cost API", publisher: "Claude Platform", url: "https://platform.claude.com/docs/en/manage-claude/usage-cost-api", note: "Primary API documentation for reconciling usage and cost by workspace, model, geography and cost type." },
      { title: "List all models and their properties", publisher: "OpenRouter", url: "https://openrouter.ai/docs/api/api-reference/models/get-models", note: "Structured model and pricing catalogue useful for discovery and routed-market comparisons." },
      { title: "GenAI semantic conventions", publisher: "OpenTelemetry", url: "https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/", note: "Provider-neutral attributes for model identity, usage and agent operations in a trace-level cost ledger." },
      { title: "FinOps Framework", publisher: "FinOps Foundation", url: "https://www.finops.org/framework/", note: "Operating model for allocation, forecasting, unit economics, and optimization." },
      { title: "LLMTrace repository", publisher: "GitHub", url: "https://github.com/jandromani/llmtrace", note: "Alejandro's open-source instrumentation layer for connecting model usage, latency, errors and cost to sessions and traces." },
    ],
  },
  "observability-agentic-systems": {
    standfirst: "An agent trace is not a prettier chat transcript. It is the causal record of a distributed, probabilistic workflow: plans changed, tools were attempted, state mutated, policies intervened, budgets moved, and humans sometimes altered the path.",
    thesis: "Trace decisions and state transitions, not only model calls. During an incident the decisive question is why an action was attempted, under whose authority, using which evidence, and what changed.",
    takeaways: [
      "Use one trace across gateway, agents, models, retrieval, tools, policy, and review.",
      "Model plans and decisions as events with stable reason codes.",
      "Keep sensitive content out of default span attributes.",
      "Link evaluations and business outcomes to production traces.",
      "Observe absence of progress, not only exceptions.",
      "Design telemetry from incident questions and retention constraints.",
    ],
    sections: [
      {
        id: "trace-model",
        title: "Model the complete unit of work",
        paragraphs: [
          "The initiating request becomes the root span. Children represent agent invocations, model operations, retrieval, tool execution, policy decisions, approvals, and state writes. Links connect asynchronous or delegated work where a strict tree would misrepresent causality.",
          "Consequential events need identity, tenant, agent and prompt version, policy version, model route, tool schema, budget state, outcome, and error class. Content is optional and governed; control facts are mandatory. OpenTelemetry's GenAI conventions provide a vocabulary, while the application still owns its decision semantics.",
        ],
        bullets: [
          "Trace: one accepted unit of work.",
          "Span: one timed operation or transition.",
          "Event: a notable point such as a plan revision.",
          "Link: causality across queues, sessions, or delegation.",
          "Metric: aggregated health, quality, cost, or risk.",
        ],
      },
      {
        id: "progress",
        title: "Instrument progress and intent",
        paragraphs: [
          "Agents can loop successfully at the infrastructure layer: every request returns 200 while the task makes no progress. Record the accepted goal, plan version, current step, completed commitments, new evidence, and reason for the next action. Derive progress from verified state changes rather than asking the model whether it is progressing.",
          "Attempt fingerprints expose semantic retries. Plan diffs expose oscillation. Tool-result hashes expose duplicate work. Budget burn without new evidence is an anomaly that should stop a trajectory before a conventional error appears.",
        ],
      },
      {
        id: "privacy",
        title: "Observe without creating a shadow breach",
        paragraphs: [
          "Prompts, documents, arguments, and outputs may contain personal data, secrets, privileged material, or attacker-controlled instructions. Default instrumentation should capture size, hash, category, model metadata, and reason codes. Content capture should be opt-in, redacted before export, encrypted, restricted, and short-lived.",
          "Separate an operational event store from a restricted content store. An event may prove that a check ran and reference content that later expires. Sample by risk: denials, novel tools, failures, and high-value actions justify richer evidence than routine traffic.",
        ],
      },
      {
        id: "evaluation-loop",
        title: "Close the loop from trace to evaluation",
        paragraphs: [
          "Privacy-reviewed production traces should become regression cases. Preserve inputs, invariants, tool fixtures, and failure reason. Replay affected cases whenever a prompt, model, policy, adapter, or tool changes, and compare trajectory as well as final output.",
          "Model judges help scale review but have correlated biases. Combine deterministic validators, business outcomes, human samples, and diverse evaluators. Store evaluator identity, version, rubric, evidence, and uncertainty like any other consequential component.",
        ],
      },
    ],
    failureModes: [
      { mode: "Transcript logging", signal: "Text is visible but state, policy, and side effects are not.", response: "Trace decision events, attempts, versions, approvals, and outcomes." },
      { mode: "PII exhaust", signal: "Sensitive content is exported broadly by default.", response: "Use metadata-first telemetry and governed, short-lived content capture." },
      { mode: "Green loop", signal: "Calls succeed while cost rises and no milestone completes.", response: "Add progress, fingerprints, plan diffs, and no-progress alerts." },
      { mode: "Judge monoculture", signal: "One model family generates and evaluates the same behavior.", response: "Combine validators, outcomes, human samples, and calibrated judges." },
    ],
    metrics: [
      { metric: "Trace completeness", why: "Determines whether incidents can reconstruct causality.", guardrail: "Require identity, versions, route, tool, policy, and outcome." },
      { metric: "Progress per call", why: "Detects successful infrastructure doing useless work.", guardrail: "Stop when budget burns without milestones or evidence." },
      { metric: "Tool error taxonomy", why: "Separates validation, authorization, timeout, and partial commit.", guardrail: "Every failure maps to a stable reason and recovery path." },
      { metric: "Evaluation linkage", why: "Shows whether failures become regression tests.", guardrail: "Track incidents without a curated case and owner." },
      { metric: "Sensitive-content capture", why: "Quantifies privacy exposure.", guardrail: "Default zero for sensitive environments; audit exceptions." },
    ],
    implementation: [
      { phase: "Write incident questions", outcome: "The schema serves decisions operators must make.", work: ["Interview security and support", "Map identifiers", "Define reason codes", "Set retention classes"] },
      { phase: "Instrument the spine", outcome: "Trace context crosses every runtime boundary.", work: ["Adopt W3C context", "Add GenAI attributes", "Link delegated work", "Version artefacts"] },
      { phase: "Add progress and cost", outcome: "Loops and waste become visible.", work: ["Record milestones", "Fingerprint attempts", "Track budgets", "Alert on no-progress burn"] },
      { phase: "Connect evaluation", outcome: "Incidents improve release gates.", work: ["Curate safe cases", "Replay changes", "Calibrate judges", "Publish scorecards"] },
    ],
    checklist: ["Can one trace follow delegated work?", "Can you distinguish attempted from committed actions?", "Are all runtime artefacts versioned?", "Can loops be detected without exceptions?", "Is content capture auditable?", "Do incidents become regression cases?", "Is the schema provider-neutral?", "Does every alert have a runbook?"],
    sources: [
      { title: "GenAI semantic conventions", publisher: "OpenTelemetry", url: "https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/", note: "Attributes for agents, models, workflows, tools, usage, and sensitive content." },
      { title: "Security and sensitive telemetry", publisher: "OpenTelemetry", url: "https://opentelemetry.io/docs/security/", note: "Primary guidance for protecting telemetry, preventing tampering and controlling sensitive data collection." },
      { title: "Trace Context", publisher: "W3C", url: "https://www.w3.org/TR/trace-context/", note: "Vendor-neutral propagation of trace identity across distributed systems." },
      { title: "AI Risk Management Framework Core", publisher: "NIST", url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/", note: "Govern, map, measure and manage as continuous, cross-cutting risk-management functions." },
      { title: "Regulation (EU) 2024/1689", publisher: "EUR-Lex", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", note: "Official AI Act text, including record-keeping and governance obligations for applicable systems and actors." },
      { title: "LLMTrace repository", publisher: "GitHub", url: "https://github.com/jandromani/llmtrace", note: "Alejandro's open-source toolkit for LLM sessions, usage, errors, and evaluations." },
      { title: "llmtrace 0.1.4", publisher: "PyPI", url: "https://pypi.org/project/llmtrace/", note: "Published package evidence, metadata, extras, and release history." },
    ],
  },
  "building-in-public": {
    standfirst: "Building in public is useful when the public record reduces uncertainty: what exists, what runs, what was measured, what failed, and what remains conceptual. It becomes noise when screenshots imply maturity that the repository, package, or operating evidence cannot support.",
    thesis: "A strong public portfolio is an evidence system. Every claim should resolve to a runnable surface, inspectable artefact, reproducible result, or clearly labeled hypothesis.",
    takeaways: [
      "Separate interface reality, data reality, and execution reality.",
      "Publish decisions and failure analysis, not only launches.",
      "Make the smallest credible proof easy to reproduce.",
      "Use changelogs and versioned evidence to show trajectory.",
      "Protect users and secrets before sharing traces.",
      "Treat feedback as input, not validation by applause.",
    ],
    sections: [
      {
        id: "evidence-ladder",
        title: "Use an evidence ladder",
        paragraphs: [
          "A concept diagram, representative workflow, demo with synthetic data, recorded execution, public prototype, package release, and production outcome are different evidence states. None is automatically weak; the problem is presenting them as equivalent. Label the state beside the preview and explain what a visitor can independently verify.",
          "For each project provide one lead claim, one runnable or inspectable proof, one architecture explanation, and one honest limitation. This is stronger than twenty badges. A hiring manager should move from curiosity to verification in two clicks.",
        ],
        bullets: [
          "Claim: precise, scoped, and falsifiable.",
          "Proof: URL, package, repository, trace, test, or captured interface.",
          "Boundary: demo data, synthetic result, selected code, or conceptual layer.",
          "Freshness: date last verified and known degradation.",
        ],
      },
      {
        id: "reasoning-record",
        title: "Publish the reasoning trail",
        paragraphs: [
          "Senior value appears in trade-offs. Explain why a deterministic gate surrounds the model, why a route was rejected, why local storage was chosen, or why a metric is not defensible yet. Show the alternative considered and the condition that would change the decision.",
          "Postmortems are credible when they avoid theatre. Describe impact, mechanism, detection gap, containment, repair, and systemic follow-up. Remove secrets and personal data, but preserve enough mechanism for another builder to learn.",
        ],
      },
      {
        id: "reproducibility",
        title: "Make proof inexpensive to reproduce",
        paragraphs: [
          "A public package needs pinned setup, a minimal example, sample data, expected output, tests, license, and a truthful maturity marker. A public app needs a stable first-run path and a visible explanation when providers are unavailable. A polished shell that silently fails destroys trust.",
          "Automate link checks, smoke tests, screenshots, and release notes. Tie generated previews to package or runtime output where possible. If a result is composed manually, label it representative rather than forcing the audience to guess.",
        ],
      },
      {
        id: "feedback",
        title: "Convert attention into learning",
        paragraphs: [
          "Stars, likes, and views measure distribution, not usefulness. Ask visitors to complete a bounded task, observe where they hesitate, and record which assumptions changed. Issue quality, repeated setup failures, and unsupported use cases are better product signals than generic praise.",
          "Public work creates obligations. Never expose customer data, credentials, internal endpoints, or unreviewed legal claims to look authentic. Anonymisation must consider combinations of fields, not only names.",
        ],
      },
    ],
    failureModes: [
      { mode: "Demo inflation", signal: "A designed dashboard is read as a live result.", response: "Label interface, data, and execution state beside every preview." },
      { mode: "Launch treadmill", signal: "Announcements exist without maintained proof.", response: "Publish fewer releases with reproducible evidence and follow-up." },
      { mode: "Vanity feedback", signal: "Decisions follow attention rather than observed tasks.", response: "Collect task evidence, issue patterns, and learning hypotheses." },
      { mode: "Evidence leak", signal: "Realistic traces reveal private context or secrets.", response: "Use synthetic or reviewed anonymised data." },
    ],
    metrics: [
      { metric: "Proof conversion", why: "Shows movement from claim to evidence.", guardrail: "Measure clicks to live surface, package, repository, or trace." },
      { metric: "Reproduction success", why: "Tests whether documentation creates confidence.", guardrail: "Run clean-environment setup regularly." },
      { metric: "Evidence freshness", why: "Prevents stale screenshots and broken links.", guardrail: "Set review dates and automated smoke tests." },
      { metric: "Learning closure", why: "Shows whether feedback changes the work.", guardrail: "Link accepted feedback to a decision or release." },
    ],
    implementation: [
      { phase: "Inventory claims", outcome: "Every statement has an evidence state and owner.", work: ["Classify previews", "Remove unsupported metrics", "Record dates", "List broken paths"] },
      { phase: "Build proof paths", outcome: "Visitors verify the strongest claim quickly.", work: ["Create minimal examples", "Add expected output", "Link architecture", "State limitations"] },
      { phase: "Automate freshness", outcome: "Evidence degrades visibly rather than silently.", work: ["Smoke-test URLs", "Render previews", "Check package setup", "Maintain changelog"] },
      { phase: "Publish learning", outcome: "The record demonstrates judgment.", work: ["Write decisions", "Publish postmortems", "Close feedback loops", "Archive abandoned claims"] },
    ],
    checklist: ["Is every preview labeled?", "Can a visitor reproduce the claim?", "Are limitations visible?", "Do dates reveal freshness?", "Are traces safe to disclose?", "Does each article contain a real decision?", "Are abandoned experiments explained?", "Can feedback be linked to change?"],
    sources: [
      { title: "OpenSSF Scorecard", publisher: "OpenSSF", url: "https://securityscorecards.dev/", note: "Automated checks for repository and supply-chain practices." },
      { title: "SLSA specification", publisher: "OpenSSF", url: "https://slsa.dev/spec/", note: "Framework for build integrity, provenance, and supply-chain assurance." },
      { title: "Semantic Versioning 2.0.0", publisher: "SemVer", url: "https://semver.org/", note: "A compatibility contract for communicating change." },
      { title: "LLMTrace", publisher: "GitHub", url: "https://github.com/jandromani/llmtrace", note: "A concrete portfolio artefact that can be independently inspected." },
    ],
  },
  "orchestration-patterns": {
    standfirst: "Most teams reach for multiple agents before proving that one agent with good tools and a deterministic workflow is insufficient. Orchestration earns its complexity only when decomposition, parallelism, specialization, or independent verification improve the outcome more than they increase coordination cost.",
    thesis: "Choose the least autonomous topology that satisfies the task. Escalate from pipeline to router, supervisor, parallel workers, and mesh only with evaluation evidence and explicit budgets.",
    takeaways: [
      "Workflows and agents are different control choices.",
      "Parallelism helps breadth but multiplies cost and synthesis risk.",
      "Delegated authority must narrow across the graph.",
      "Shared memory needs ownership and conflict rules.",
      "Termination is part of orchestration design.",
      "Evaluate topology against a strong single-agent baseline.",
    ],
    sections: [
      {
        id: "pattern-selection",
        title: "Start with the control requirement",
        paragraphs: [
          "Sequential workflows fit known steps and explicit verification. Routers select specialist paths when intent classes are distinct. Parallel workers reduce wall time or broaden search when subtasks are independent. Supervisors help when decomposition must adapt. A mesh is justified only when peer collaboration measurably beats simpler structures.",
          "Do not call a chain of prompts multi-agent merely because each prompt has a name. Ask who owns state, who grants authority, how work is scheduled, how disagreement is resolved, and how execution terminates.",
        ],
        bullets: [
          "Pipeline: predictable and debuggable; limited adaptation.",
          "Router: efficient specialization; classification risk.",
          "Supervisor-worker: adaptive decomposition; central bottleneck.",
          "Fan-out/fan-in: breadth and speed; synthesis and cost pressure.",
          "Peer mesh: debate or resilience; highest coordination entropy.",
        ],
      },
      {
        id: "handoff-contracts",
        title: "Give every handoff a contract",
        paragraphs: [
          "Delegation should specify objective, inputs, tools, data boundary, budget, deadline, output schema, evidence, and stop conditions. A worker returns outcome, evidence references, uncertainty, side effects, and open questions. Free-form messages hide contract failures.",
          "Use immutable task identifiers and idempotency keys. Workers must distinguish new tasks, retries, and revisions. Authority inherited from a supervisor must be equal or narrower; spawning a specialist cannot create access the parent lacked.",
        ],
      },
      {
        id: "state-conflict",
        title: "Design state ownership and disagreement",
        paragraphs: [
          "Shared writable memory invites races and silent overwrites. Prefer append-only events, explicit ownership, compare-and-swap versions, and a reducer that produces the current view. Facts retain provenance; proposals remain distinct from decisions.",
          "When workers disagree, do not let a synthesizer create smooth prose and call the conflict resolved. Preserve claims and evidence, validate deterministically where possible, adjudicate with a rubric where necessary, and escalate material uncertainty.",
        ],
      },
      {
        id: "termination",
        title: "Termination is a safety and economics feature",
        paragraphs: [
          "Set limits for depth, fan-out, calls, time, cost, repeated plans, and pending side effects. Completion follows accepted criteria or verified state, not a model declaring success. A stopped workflow releases leases, revokes capabilities, reconciles partial actions, and preserves evidence.",
          "Benchmark every topology against deterministic code, retrieval plus one model, and a single agent with the same tools. Measure success, support, policy compliance, latency, cost, interventions, and variance. Remove any agent whose specialization creates no measurable incremental value.",
        ],
      },
    ],
    failureModes: [
      { mode: "Agent theatre", signal: "Named agents add prompts but no distinct capability.", response: "Collapse to one agent or deterministic step." },
      { mode: "Fan-out storm", signal: "Workers multiply faster than unique evidence.", response: "Budget fan-out and require expected information gain." },
      { mode: "Memory race", signal: "Workers overwrite facts without provenance.", response: "Use events, ownership, versions, and reducers." },
      { mode: "Endless handoff", signal: "Agents delegate or critique without completion.", response: "Set depth, cycle, time, cost, and repeated-plan limits." },
    ],
    metrics: [
      { metric: "Incremental topology lift", why: "Proves orchestration beats the baseline.", guardrail: "Include confidence, cost, and latency." },
      { metric: "Unique evidence per worker", why: "Detects duplicated parallel effort.", guardrail: "Reduce fan-out when marginal gain falls." },
      { metric: "Synthesis loss", why: "Measures valid evidence omitted in the result.", guardrail: "Preserve citations and unresolved conflict." },
      { metric: "Delegation depth", why: "Correlates with authority and coordination risk.", guardrail: "Set task-specific maxima." },
      { metric: "Safe termination rate", why: "Verifies reconciliation and revocation.", guardrail: "Test timeout and budget exhaustion." },
    ],
    implementation: [
      { phase: "Establish baseline", outcome: "A simpler system sets the bar.", work: ["Build deterministic workflow", "Test one agent", "Record failures", "Identify bottleneck"] },
      { phase: "Select topology", outcome: "Pattern maps to decomposition needs.", work: ["Define independence", "Set state ownership", "Specify conflict rules", "Design termination"] },
      { phase: "Contract handoffs", outcome: "Delegation is typed and budgeted.", work: ["Schema tasks", "Narrow capabilities", "Add idempotency", "Preserve evidence"] },
      { phase: "Evaluate and prune", outcome: "Only valuable agents remain.", work: ["Replay tasks", "Measure lift", "Inspect duplication", "Remove weak roles"] },
    ],
    checklist: ["Does each agent have a distinct capability?", "Is the simple baseline documented?", "Can delegated authority only narrow?", "Who owns mutable state?", "How is disagreement preserved?", "What terminates cycles?", "Can partial work be compensated?", "Does every worker add evidence?"],
    sources: [
      { title: "Building effective agents", publisher: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/building-effective-agents", note: "Workflows, routing, parallelization, orchestrator-worker, and evaluator-optimizer patterns." },
      { title: "How we built our multi-agent research system", publisher: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/multi-agent-research-system", note: "Concrete orchestrator-worker architecture and coordination lessons." },
      { title: "Cloud design patterns", publisher: "Microsoft Azure", url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/", note: "Distributed-system and AI orchestration patterns." },
      { title: "Model Context Protocol specification", publisher: "MCP", url: "https://modelcontextprotocol.io/specification/latest", note: "Protocol contracts for tools, resources, and prompts." },
    ],
  },
  "safety-alignment-systems": {
    standfirst: "Production safety is not a classifier placed after generation. It is a system property created by scoped authority, trusted context, secure tools, evaluations, monitoring, human control, and recovery. Alignment goals become operational only when they constrain what the runtime can observe and change.",
    thesis: "Control blast radius first. A model will never be perfectly predictable, so dangerous states must be difficult to reach, visible when approached, and recoverable when prevention fails.",
    takeaways: [
      "Threat-model the complete application, not only the model.",
      "Separate untrusted content from instructions and authority.",
      "Use least privilege, isolation, and reversible actions.",
      "Test attack chains rather than isolated prompts.",
      "Calibrate detectors and preserve human override.",
      "Turn incidents into evaluation and control requirements.",
    ],
    sections: [
      {
        id: "system-boundary",
        title: "Safety begins at the system boundary",
        paragraphs: [
          "An application combines model, instructions, retrieval, memory, tools, identity, UI, and downstream services. Prompt injection becomes dangerous when untrusted content crosses into instruction or when persuasive text becomes privileged action. A refusal benchmark cannot cover that architecture.",
          "Draw trust boundaries and data flows. Mark content origins, authoritative instructions, credentials, state changes, and human intervention. Map threats with OWASP and MITRE ATLAS, then connect each threat to preventive, detective, and recovery controls.",
        ],
      },
      {
        id: "capability-security",
        title: "Constrain capability before interpreting intent",
        paragraphs: [
          "A model-facing tool should expose the narrowest safe operation, not a generic shell, database, or HTTP client. Validate arguments against trusted schemas and resource policy. Use short-lived credentials, isolation, network allowlists, quotas, idempotency, and dry-run modes. High-impact actions need fresh approval bound to the exact change.",
          "Content cannot grant authority. Documents, pages, emails, and tool results remain untrusted even when they claim to be system messages. Delimit data and enforce policy outside the prompt.",
        ],
        bullets: [
          "Authenticate the originating principal.",
          "Authorize retrieval before context assembly.",
          "Let the model propose a bounded action.",
          "Validate schema, policy, and current approval.",
          "Execute with a short-lived capability and verify outcome.",
        ],
      },
      {
        id: "safety-evaluation",
        title: "Build layered safety evaluations",
        paragraphs: [
          "Start with deterministic tests for permissions, schemas, secrets, and forbidden resources. Add scenarios for direct and indirect prompt injection, tool poisoning, memory manipulation, exfiltration, excessive agency, denial of wallet, and unsafe output handling. Exercise complete attack chains with real control assertions.",
          "Model evaluators scale coverage but require calibration against expert labels and hard cases. Track false negatives and false positives by harm class. A detector that blocks everything drives workarounds; one that explains safety while missing side effects is worse.",
        ],
      },
      {
        id: "assurance-loop",
        title: "Operate safety as continuous assurance",
        paragraphs: [
          "Monitor policy denials, injection signals, unusual tool sequences, capability requests, data movement, evaluator disagreement, and reversals. Connect incidents to threat models, evaluation cases, policy changes, and training. Version every control so a past decision can be reconstructed.",
          "Frameworks organize work but do not certify a product by association. NIST supports governance and measurement; OWASP catalogs application risks; MITRE ATLAS structures adversary behavior; the EU AI Act may create legal obligations depending on role and use case. Engineering turns applicable requirements into tested controls and evidence.",
        ],
      },
    ],
    failureModes: [
      { mode: "Classifier perimeter", signal: "Safety depends on one generation filter.", response: "Layer authority, isolation, validation, approval, and recovery." },
      { mode: "Instruction confusion", signal: "Retrieved content can redefine goals or permission.", response: "Treat it as untrusted data and enforce external policy." },
      { mode: "Overpowered tool", signal: "A generic connector exposes broad credentials.", response: "Use narrow tools, short-lived capabilities, quotas, and sandboxing." },
      { mode: "Red-team theatre", signal: "Tests collect prompts but never exercise tools.", response: "Run end-to-end attack chains with state and recovery assertions." },
      { mode: "Silent partial action", signal: "A timeout hides changed external state.", response: "Use idempotency, verification, reconciliation, and compensation." },
    ],
    metrics: [
      { metric: "Attack-path coverage", why: "Measures system threats, not prompt count.", guardrail: "Map tests to assets, boundaries, and controls." },
      { metric: "Action containment", why: "Shows whether attempts reach side effects.", guardrail: "Zero unauthorized commits; count attempts separately." },
      { metric: "Detector calibration", why: "Balances missed harm and overblocking.", guardrail: "Report precision and recall by harm class." },
      { metric: "Capability exposure", why: "Quantifies privilege reachable by an agent.", guardrail: "Review high-impact verbs and token lifetimes." },
      { metric: "Recovery time", why: "Prevention will not cover every failure.", guardrail: "Exercise stop, revoke, reconcile, and rollback." },
    ],
    implementation: [
      { phase: "Threat-model the system", outcome: "Assets, boundaries, attack paths, and owners are explicit.", work: ["Map data and instructions", "Inventory credentials", "Use OWASP and ATLAS", "Rank impact"] },
      { phase: "Reduce blast radius", outcome: "Agents receive only capability required now.", work: ["Narrow tools", "Issue short-lived tokens", "Isolate execution", "Add dry-run and approval"] },
      { phase: "Build evaluations", outcome: "Release gates cover controls and attack chains.", work: ["Create misuse cases", "Test indirect injection", "Force partial failures", "Calibrate evaluators"] },
      { phase: "Operate assurance", outcome: "Signals, incidents, and changes form one loop.", work: ["Monitor sequences", "Version controls", "Rehearse response", "Convert incidents to tests"] },
    ],
    checklist: ["Are external documents always untrusted?", "Can content request but never grant authority?", "Are tools narrower than underlying APIs?", "Do credentials expire with the task?", "Are high-impact actions reviewed?", "Do tests exercise tools and state?", "Can operators stop and revoke?", "Can safety decisions be reconstructed?"],
    sources: [
      { title: "OWASP Top 10 for Agentic Applications", publisher: "OWASP GenAI Security Project", url: "https://genai.owasp.org/resource/aiuc-1-crosswalks-owasp-top-10-for-agentic-applications/", note: "Current agentic risk taxonomy spanning goal hijacking, tool misuse, identity abuse, memory poisoning, inter-agent communication and cascading failure." },
      { title: "MITRE ATLAS", publisher: "MITRE", url: "https://atlas.mitre.org/", note: "Adversary tactics, techniques, mitigations, and case studies." },
      { title: "NIST AI RMF Generative AI Profile", publisher: "NIST", url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence", note: "Primary cross-sectoral profile for integrating generative-AI risks into Govern, Map, Measure and Manage." },
      { title: "Regulation (EU) 2024/1689", publisher: "EUR-Lex", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/", note: "Official AI Act text supporting the article's scoped discussion of lifecycle risk management, human oversight, robustness and cybersecurity." },
      { title: "OpenAI Model Spec", publisher: "OpenAI", url: "https://model-spec.openai.com/", note: "OpenAI's evolving specification for intended model behaviour and instruction priority; a behavioural reference, not an application security boundary." },
      { title: "Fine-tuning safety checks", publisher: "OpenAI Developers", url: "https://developers.openai.com/api/docs/guides/direct-preference-optimization#safety-checks", note: "Official guidance that model-level checks do not replace use-case-specific evaluation before production." },
      { title: "Agentic Misalignment", publisher: "Anthropic Research", url: "https://www.anthropic.com/research/agentic-misalignment", note: "Controlled simulated stress tests showing why autonomy, sensitive information and unmonitored action require targeted safeguards; not evidence of observed real-deployment incidents." },
      { title: "PsycheOS public safety surface", publisher: "Alejandro Baratas", url: "https://psycheos-psi.vercel.app/", note: "The browser-local BYOK evaluation surface discussed as a behavioural wind tunnel, not a diagnostic or universal alignment oracle." },
    ],
  },
}
