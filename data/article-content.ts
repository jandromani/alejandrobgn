import { articleContentExtra } from "@/data/article-content-extra"

export interface ArticleSection {
  id: string
  title: string
  eyebrow?: string
  paragraphs: string[]
  bullets?: string[]
  code?: {
    language: string
    label: string
    value: string
  }
}

export interface ArticleFailureMode {
  mode: string
  signal: string
  response: string
}

export interface ArticleMetric {
  metric: string
  why: string
  guardrail: string
}

export interface ArticleSource {
  title: string
  publisher: string
  url: string
  note: string
}

export interface DeepArticle {
  standfirst: string
  thesis: string
  takeaways: string[]
  sections: ArticleSection[]
  failureModes: ArticleFailureMode[]
  metrics: ArticleMetric[]
  implementation: Array<{ phase: string; outcome: string; work: string[] }>
  checklist: string[]
  sources: ArticleSource[]
}

export const articleContent: Record<string, DeepArticle> = {
  "governing-agentic-systems": {
    standfirst: "Agent governance fails when it is treated as a policy document sitting beside the product. An agent is a runtime actor: it interprets intent, chooses tools, reads data, changes state, and may create consequences faster than a traditional approval process can react. The practical answer is to encode authority, evidence, interruption, and accountability into the execution path itself.",
    thesis: "The unit of governance is not the model response. It is the complete decision: who asked, what context was used, which authority was delegated, which tools were considered, what changed, what evidence was retained, and who can reverse the result.",
    takeaways: [
      "A risk register becomes operational only when every risk maps to an enforceable runtime control and an observable event.",
      "Identity must travel through the entire agent chain; a service account is not a substitute for the originating human or workload principal.",
      "Tool permissions should be scoped by purpose, data boundary, value at risk, duration, and reversibility—not by a single broad role.",
      "Human oversight needs a designed interaction contract: what is shown, when intervention is required, and how long a decision may wait.",
      "Audit evidence should explain the control path without storing unrestricted prompts, secrets, or personal data forever.",
      "The safest architecture preserves a deterministic control plane around a probabilistic reasoning plane.",
    ],
    sections: [
      {
        id: "from-chatbot-to-actor",
        title: "The governance boundary changed when software became an actor",
        eyebrow: "Why the old model breaks",
        paragraphs: [
          "Traditional application governance assumes that developers decide the sequence of operations and users choose among bounded actions. Agentic systems invert part of that relationship. The developer defines tools and constraints, but the model may choose the next operation, construct arguments, repeat a step, delegate work, or stop. That flexibility is the source of value and the source of a new control problem: the exact execution path is not known when the system is designed.",
          "This does not make agents ungovernable. It changes where governance belongs. Reviews of model cards and prompts remain useful, but they cannot authorize a payment, protect a customer record, or prove why a workflow crossed a threshold. Those responsibilities belong to deterministic services surrounding the model: identity, policy evaluation, tool mediation, state management, telemetry, approval, and recovery.",
          "A helpful mental model separates the reasoning plane from the authority plane. The reasoning plane may propose a plan in natural language or structured form. The authority plane decides whether each proposed action is admissible in the present context. The model can recommend; only the control plane can confer capability. This separation is the architectural foundation for meaningful oversight.",
        ],
        bullets: [
          "Treat every tool call as a proposed state transition, not as trusted model output.",
          "Resolve policy against current identity, resource, purpose, jurisdiction, and accumulated session risk.",
          "Make side effects idempotent where possible and attach a reversal or compensation strategy where they are not.",
          "Keep model reasoning optional evidence; keep control decisions mandatory evidence.",
        ],
      },
      {
        id: "risk-tiering",
        title: "Classify the action, not only the use case",
        paragraphs: [
          "Enterprise teams often label an entire application low, medium, or high risk. That classification is too coarse for an agent. The same assistant may summarize a public report, read a confidential contract, draft an email, and initiate a supplier change. Each action has a different blast radius, reversibility, legal basis, and need for human review. Governance therefore needs an action taxonomy beneath the use-case taxonomy.",
          "A workable decision envelope combines five dimensions: sensitivity of the data observed, consequence of the action, degree of reversibility, confidence in the interpretation, and authority of the requesting principal. The envelope can then select one of several outcomes: allow, allow with redaction, require confirmation, require a named approver, simulate only, or deny. This is more expressive than a single confidence threshold and easier to audit than free-form instructions embedded in a system prompt.",
          "Risk accumulates across a session. Ten individually harmless reads may reconstruct a sensitive profile; a sequence of reversible changes may become difficult to unwind; an agent repeatedly hitting denied tools may indicate prompt injection or goal drift. A mature control plane therefore maintains a session risk budget and can tighten permissions as uncertainty, cost, or impact grows.",
        ],
        bullets: [
          "Observation: what information may enter the context window?",
          "Reasoning: which transformations are allowed and which require protected processing?",
          "Action: what external state can change, with what monetary or legal consequence?",
          "Persistence: what may be remembered, for how long, and under which subject rights?",
          "Delegation: may this agent create another actor, and can delegated authority exceed the parent envelope?",
        ],
      },
      {
        id: "identity-and-delegation",
        title: "Identity is a chain of custody",
        paragraphs: [
          "An agent should never become an identity laundering mechanism. When every tool call arrives under one powerful service account, the downstream system cannot distinguish Alejandro approving a contract from a background process retrying an old task. The audit log may show which agent acted, but not whose authority made the action legitimate. That gap becomes critical during incident response and access review.",
          "Propagate an immutable subject identifier, tenant, session, declared purpose, and delegation identifier alongside each request. Issue short-lived capability tokens for narrowly described actions rather than forwarding durable credentials into model-accessible context. The token should identify the resources, verbs, limits, expiration, and approval that produced it. A child agent receives a subset of its parent's authority, never an implicit copy.",
          "Purpose limitation deserves technical representation. A user may permit an agent to read invoices to reconcile a payment but not to reuse the same data for sales profiling. A purpose claim cannot prevent every misuse by itself, yet it enables policy evaluation, audit queries, retention decisions, and detection of purpose drift. Without it, consent and authorization collapse into a generic authenticated flag.",
        ],
        code: {
          language: "json",
          label: "Example delegated capability",
          value: `{
  "subject": "usr_82f1",
  "actor": "agent.procurement.v3",
  "purpose": "supplier-reconciliation",
  "session": "ses_2026_0719_04",
  "allow": ["invoice:read", "supplier:compare"],
  "deny": ["supplier:update", "payment:create"],
  "constraints": {
    "tenant": "tenant_eu_14",
    "max_records": 50,
    "expires_at": "2026-07-19T12:10:00Z"
  },
  "approval_ref": "apr_91b7"
}`,
        },
      },
      {
        id: "policy-enforcement",
        title: "Put policy at every irreversible boundary",
        paragraphs: [
          "A single gateway check at the beginning of a workflow is insufficient. Context changes after retrieval, the plan changes after tool output, and the consequence changes when a draft becomes a committed transaction. Policy must be evaluated at the boundaries where new information enters, authority is delegated, an external tool is invoked, data leaves a trust zone, or state becomes difficult to reverse.",
          "Keep policies deterministic and versioned. The model may classify intent or extract entities, but those outputs should be treated as claims with provenance and confidence. A policy engine can use the claims alongside trusted facts; it should not accept a sentence such as 'the user approved this' without an approval record. Every decision should record policy version, relevant inputs, outcome, obligations, and a stable reason code.",
          "Obligations are as important as allow and deny. A request may be allowed only if personal data is masked, a response is watermarked, a second model evaluates safety, a retention tag is applied, or a reviewer receives a compact evidence packet. Encoding these obligations gives teams a path between uncontrolled autonomy and blanket prohibition.",
        ],
        bullets: [
          "Pre-retrieval: authorize data sources and apply row-, field-, or document-level filters.",
          "Post-retrieval: scan for secrets, instructions embedded in content, and policy-conflicting data.",
          "Pre-tool: validate schema, argument bounds, resource scope, and current approval state.",
          "Post-tool: verify outcome, detect partial completion, and decide whether compensation is required.",
          "Pre-response: enforce disclosure, grounding, privacy, and jurisdiction-specific obligations.",
        ],
      },
      {
        id: "human-oversight",
        title: "Human-in-the-loop is an interface, not a checkbox",
        paragraphs: [
          "An approval button does not create effective oversight. Reviewers need enough information to understand the proposed action, the evidence supporting it, the uncertainty that remains, and the consequences of approval or rejection. Dumping an entire trace into a modal creates fatigue; showing only a fluent recommendation creates automation bias. The design problem is to compress evidence without hiding material disagreement.",
          "Create review tiers. Low-impact ambiguity can ask the originating user for confirmation. Material financial, employment, safety, or legal actions should route to an authorized reviewer with separation of duties. Emergency stops should be available to operators who may not have business approval authority. Each tier needs a service-level objective: an agent waiting forever is not safely paused if downstream locks, reservations, or temporary credentials remain active.",
          "The reviewer interaction itself becomes evidence. Record what the person saw, which policy required review, what they changed, the decision, and the reason. Do not infer meaningful oversight from a click that occurred in 600 milliseconds on a hidden summary. Measure review quality through sampling, disagreement, reversals, and reviewer load—not merely approval rate.",
        ],
        bullets: [
          "Show the proposed action and affected resources before explanatory prose.",
          "Separate model confidence from policy certainty and evidence completeness.",
          "Expose alternatives: edit arguments, reduce scope, simulate, reject, or escalate.",
          "Expire approvals when material inputs, models, policies, or resources change.",
        ],
      },
      {
        id: "evidence-design",
        title: "Build evidence that can answer a real investigation",
        paragraphs: [
          "A useful trace can reconstruct causality across services without turning the observability platform into an uncontrolled copy of sensitive conversations. Capture identifiers and hashes by default; capture content selectively, with redaction and explicit retention. Link the user request, agent version, model invocation, retrieved artefacts, policy decisions, tool attempts, approvals, side effects, and final response under one trace and decision identifier.",
          "Evidence should be immutable enough to support investigation but correctable enough to respect privacy and data-quality obligations. One pattern stores a tamper-evident event ledger containing minimal facts and references to separately governed content stores. Content may then expire or be deleted while the ledger preserves proof that a control ran, which policy version was used, and what category of outcome occurred.",
          "Design audit questions before designing fields. Can an investigator identify every customer record read by a failed session? Can finance reconcile model and tool cost to a tenant? Can security find all executions that used a compromised connector? Can legal determine which decisions were made under an obsolete policy? If the schema cannot answer those questions efficiently, it is telemetry, not yet evidence.",
        ],
      },
      {
        id: "eu-ai-act-runtime",
        title: "Translate regulatory duties into runtime capabilities",
        paragraphs: [
          "The EU AI Act does not prescribe one middleware architecture, and not every agent is a high-risk AI system. It does, however, make several engineering concerns concrete for relevant systems: lifecycle risk management, technical documentation, logging, transparency, human oversight, accuracy, robustness, cybersecurity, post-market monitoring, and incident handling. The first task is a defensible classification of role and use case, not a generic 'EU compliant' badge.",
          "For a high-risk context, map each applicable requirement to an owner, control, evidence event, test, retention rule, and exception path. Article 14's human oversight language should influence reviewer authority and stop mechanisms. Articles 12 and 19 should influence automatic logging and retention design. Article 9 should produce an iterative risk loop connected to incidents and monitoring, not a risk assessment frozen before launch.",
          "Architecture cannot replace legal analysis, conformity assessment, quality management, or organizational accountability. Its role is to make the chosen interpretation enforceable and observable. A good governance layer reduces the distance between what policy says should happen and what the runtime can prove did happen.",
        ],
      },
      {
        id: "operating-model",
        title: "Governance needs an operating model, not a central veto team",
        paragraphs: [
          "Central governance teams cannot manually approve every prompt, tool, model, and release. Product teams understand context but may normalize local risk. The scalable model is federated: a central group owns the control framework, evidence schema, minimum policies, exception process, and assurance tooling; domain teams own use-case classification, acceptance criteria, data contracts, and operational response.",
          "Release gates should be evidence-driven. A team demonstrates that threat models, evaluations, access controls, red-team scenarios, rollback procedures, and monitoring thresholds exist for the action classes it enables. Higher autonomy requires stronger evidence, not merely a more senior signature. Runtime exceptions should be time-boxed, observable, and tied to a remediation owner.",
          "Finally, govern change rather than pretending the system is static. Models are retired, prompts evolve, tools add parameters, regulations receive guidance, and attackers discover new paths. Maintain a bill of materials covering models, prompts, connectors, data sources, policies, and evaluators. Any material change should trigger the subset of tests and approvals appropriate to its blast radius.",
        ],
      },
    ],
    failureModes: [
      { mode: "Authority laundering", signal: "Downstream actions share one service identity and cannot be attributed to the initiating principal.", response: "Propagate subject and delegation context; issue short-lived capability tokens per action envelope." },
      { mode: "Prompt-only policy", signal: "Safety rules exist in system instructions but tool endpoints accept any syntactically valid call.", response: "Enforce deterministic authorization and argument validation outside the model at every side-effect boundary." },
      { mode: "Approval theatre", signal: "Reviewers approve nearly everything quickly and cannot see changed resources or material uncertainty.", response: "Redesign evidence packets, tier reviews, measure reversals and disagreement, and sample approved outcomes." },
      { mode: "Audit data lake", signal: "Raw prompts, tool results, secrets, and personal data are retained indefinitely in one telemetry store.", response: "Separate minimal tamper-evident events from governed content; redact, encrypt, restrict, and expire by policy." },
      { mode: "Delegation explosion", signal: "Child agents create more workers or tools than expected and cost, latency, and authority grow without bound.", response: "Set depth, fan-out, cost, time, and capability budgets inherited monotonically by descendants." },
      { mode: "Stale approval", signal: "An approved plan executes after inputs, policy, model, or target resource has materially changed.", response: "Bind approval to hashes and versions; re-evaluate policy immediately before commit." },
    ],
    metrics: [
      { metric: "Controlled-action coverage", why: "Shows whether consequential tools actually pass through policy enforcement.", guardrail: "Target 100% for externally visible or irreversible actions; alert on bypass paths." },
      { metric: "Decision evidence completeness", why: "Measures whether a trace can reconstruct identity, policy, tool, approval, and outcome.", guardrail: "Block high-risk execution when mandatory evidence fields are missing." },
      { metric: "Human review precision", why: "A queue that flags everything trains reviewers to click through.", guardrail: "Track escalation yield, reviewer disagreement, reversals, and time-to-decision by risk tier." },
      { metric: "Unauthorized attempt rate", why: "Repeated denials reveal prompt injection, goal drift, or misconfigured tools.", guardrail: "Rate-limit and quarantine sessions that exceed contextual thresholds." },
      { metric: "Capability lifetime", why: "Long-lived delegated credentials expand the impact of leakage or stale intent.", guardrail: "Measure p95 token duration and reject capabilities beyond policy maxima." },
      { metric: "Compensation success", why: "Partial failures are inevitable in multi-step workflows.", guardrail: "Test and monitor reversal paths; escalate any non-compensatable partial commit." },
    ],
    implementation: [
      { phase: "Inventory consequential actions", outcome: "A shared map of agents, tools, data boundaries, and external state changes.", work: ["Enumerate tool verbs and resource types", "Identify irreversibility, value at risk, and regulatory context", "Record current identities and bypass paths", "Name business and technical owners"] },
      { phase: "Define decision envelopes", outcome: "Consistent allow, constrain, review, simulate, and deny outcomes.", work: ["Create action and data sensitivity tiers", "Define delegated capability format", "Specify session risk accumulation", "Design exception expiry and ownership"] },
      { phase: "Insert enforcement points", outcome: "No consequential action depends only on model compliance.", work: ["Mediate retrieval and tool access", "Validate structured arguments", "Apply obligations such as masking", "Bind approvals to current inputs"] },
      { phase: "Instrument evidence", outcome: "One trace reconstructs control flow without unrestricted content retention.", work: ["Adopt stable decision and trace identifiers", "Version agents, prompts, policies, and tools", "Separate event ledger from content", "Test audit queries with investigators"] },
      { phase: "Exercise failure", outcome: "Teams can stop, contain, investigate, and recover an agent workflow.", work: ["Run prompt-injection scenarios", "Test expired and over-broad capabilities", "Force partial tool failures", "Rehearse kill switch and compensation"] },
      { phase: "Operate and improve", outcome: "Governance follows system change and observed incidents.", work: ["Review scorecards by action class", "Sample human approvals", "Connect incidents to risk updates", "Retire stale exceptions and connectors"] },
    ],
    checklist: [
      "Can every external side effect be attributed to both an agent and an originating principal?",
      "Does delegated authority become narrower with every handoff?",
      "Can policy deny a tool call even if the model insists it is necessary?",
      "Are approvals invalidated when material inputs change?",
      "Can an operator stop the workflow and leave resources in a safe state?",
      "Are prompts and tool results redacted and retained by explicit policy?",
      "Can you reconstruct which policy version authorized a past decision?",
      "Does the test suite cover misuse, indirect prompt injection, and partial failure?",
      "Are regulatory claims scoped to a classified use case rather than the whole product?",
      "Is there a named owner for every runtime exception?",
    ],
    sources: [
      { title: "Regulation (EU) 2024/1689 — Artificial Intelligence Act", publisher: "EUR-Lex", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689", note: "Primary legal text. Articles 9, 12, 14, 17, and 19 are especially relevant to risk management, logging, oversight, quality systems, and log retention for high-risk AI systems." },
      { title: "Artificial Intelligence Risk Management Framework: Generative AI Profile", publisher: "NIST", url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence", note: "Cross-sectoral guidance organized around Govern, Map, Measure, and Manage, with suggested actions for generative AI risk." },
      { title: "Agentic AI — Threats and Mitigations", publisher: "OWASP GenAI Security Project", url: "https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/", note: "Threat-model-based reference for risks introduced by autonomous planning, tools, memory, and multi-agent interaction." },
      { title: "MITRE ATLAS", publisher: "MITRE", url: "https://atlas.mitre.org/", note: "Living knowledge base of tactics, techniques, mitigations, and case studies for attacks against predictive, generative, and agentic AI systems." },
    ],
  },
  "entropy-problem-llms": {
    standfirst: "Production LLM systems rarely fail as a single dramatic hallucination. They degrade through accumulation: longer contexts, stale memories, repeated summaries, retries, branching tool calls, hidden provider changes, and feedback loops that slowly separate the current execution from the original intent. I use entropy as an engineering metaphor for that growing uncertainty and disorder—not as a claim that one scalar can explain intelligence.",
    thesis: "Long-running agents need an explicit uncertainty budget. Context, cost, state, and behavioral divergence must be measured, bounded, and periodically compressed back into verified facts before the system loses the ability to explain why it is still acting.",
    takeaways: [
      "Context length is capacity, not memory quality; more tokens can amplify stale or conflicting evidence.",
      "Separate immutable facts, derived beliefs, plans, and ephemeral observations so each can age differently.",
      "Measure trajectory drift against the user goal and policy envelope, not only token-level model confidence.",
      "Checkpoint before irreversible actions and compact state using provenance-preserving summaries.",
      "Retries require budgets and diversity; repeated sampling from the same failure state is not resilience.",
      "Evaluate complete trajectories, including cost and recovery, rather than judging only the final answer.",
    ],
    sections: [
      { id: "define-entropy", title: "A useful definition of operational entropy", paragraphs: [
        "Shannon entropy has a precise mathematical meaning. In an agent runtime, however, teams often use entropy loosely to describe uncertainty, branching, inconsistency, and loss of control. That metaphor is useful only if it produces observable variables. I decompose operational entropy into four families: epistemic uncertainty about the world, state inconsistency across memories and tools, trajectory divergence from the declared objective, and resource dispersion across tokens, calls, latency, and retries.",
        "No universal score should decide whether an agent is safe. A weighted score can prioritize intervention, but each component remains inspectable. A low-confidence extraction may be harmless in a draft and unacceptable before a payment. A high token count may be efficient for research and evidence of looping in a deterministic lookup. Entropy is therefore contextual: a signal evaluated against action class, budget, and expected workflow shape.",
      ], bullets: ["Epistemic: unsupported claims, contradictory evidence, or unresolved ambiguity.", "State: divergent copies of the same fact, stale plans, and orphaned tool outcomes.", "Trajectory: growing semantic distance between current actions and the accepted goal.", "Resource: fan-out, retry, context, latency, and cost growth outside the expected envelope."] },
      { id: "context-is-not-memory", title: "Why a larger context window does not solve memory", paragraphs: [
        "A context window is a working set assembled for the next inference. It does not decide which facts deserve permanence, whether a source has been superseded, or whether a summary preserved the exception that matters now. Simply appending every message creates recency bias, duplicate instructions, prompt-injection persistence, and a rising retrieval burden. The model spends attention resolving contradictions that the system should have resolved earlier.",
        "Use typed memory. Event memory records what happened. Semantic memory stores normalized facts with provenance and validity. Working memory contains the current plan and unresolved questions. Policy memory is versioned and cannot be overwritten by ordinary content. Before assembly, a context builder selects the minimum evidence necessary for the next decision, applies trust and freshness rules, and records why each item was included.",
      ], bullets: ["Attach source, observed_at, valid_from, valid_to, confidence, and sensitivity to durable facts.", "Prefer references to large artefacts over copying them into every step.", "Expire derived beliefs when their supporting evidence changes.", "Never let retrieved content silently redefine system policy or tool authority."] },
      { id: "trajectory-control", title: "Control the trajectory, not each sentence", paragraphs: [
        "An agent can produce individually plausible steps while moving toward the wrong objective. The runtime needs periodic trajectory checks: restate the accepted goal, list completed and pending commitments, compare current tool activity with the plan, and identify new assumptions. These checks should be triggered by risk events—new delegation, repeated failure, cost spikes, sensitive retrieval, or an impending side effect—not after an arbitrary number of turns alone.",
        "The control loop can choose among continue, re-plan, ask, compact, roll back, hand off, or stop. Re-planning should not erase failed evidence. Preserve the previous plan, reason code, and state diff so operators can understand oscillation. A stable system is not one that never changes plan; it is one that changes deliberately, within budget, and can explain why.",
      ], code: { language: "python", label: "Illustrative intervention rule", value: `risk = weighted_sum(
    contradiction_rate=signals.contradictions,
    goal_distance=signals.semantic_drift,
    retry_pressure=signals.retries / budgets.max_retries,
    cost_pressure=signals.cost / budgets.max_cost,
)

if pending_action.irreversible and risk > 0.35:
    return require_checkpoint_and_review()
if risk > 0.70:
    return stop_and_preserve_state(reason="entropy_budget_exceeded")
if signals.context_saturation:
    return compact_from_verified_facts()` } },
      { id: "compaction", title: "Compaction must preserve provenance and dissent", paragraphs: [
        "Naive summarization is lossy compression performed by the same class of model whose state is being compressed. Important caveats disappear, minority evidence is flattened, and invented coherence can replace unresolved conflict. A safer compactor extracts structured commitments, facts, uncertainties, source references, and rejected alternatives. It then verifies that every retained assertion is supported by an input span or trusted system record.",
        "Use checkpoints as transaction boundaries. A checkpoint contains the accepted goal, policy and agent versions, capability envelope, normalized facts, open questions, planned next actions, completed side effects, compensation handles, and budget consumption. After validation, earlier conversational detail can leave the hot context while remaining available in governed trace storage.",
      ] },
      { id: "feedback-loops", title: "Prevent self-reinforcing error", paragraphs: [
        "Agents increasingly consume model-generated summaries, synthetic evaluations, and outputs produced by other agents. The danger is not that synthetic data is always bad; it is that provenance disappears and generated claims are recursively treated as independent evidence. Research on model collapse examines a related training-data feedback loop. At runtime, the practical analogue is confidence inflation through repetition.",
        "Tag generated artefacts, preserve their dependency graph, and avoid counting restatements as corroboration. Require fresh external evidence for high-impact claims. Evaluators should receive source material where possible and be tested for correlated failure with the generator. A second model from the same prompt family is not automatically an independent judge.",
      ] },
      { id: "evaluation", title: "Evaluate long horizons as systems", paragraphs: [
        "Final-answer accuracy hides expensive or dangerous trajectories. A production evaluation set should score goal completion, unsupported claims, policy violations, unnecessary tool calls, repeated work, state corruption, recovery quality, human interventions, latency, and cost. Record both outcome and path so a release cannot improve headline quality by silently doubling calls or approvals.",
        "Replay is essential but not sufficient because providers and external tools change. Keep deterministic fixtures for control logic, recorded tool contracts for regression, and live canaries for integration drift. Evaluate perturbations: missing data, malicious retrieved instructions, timeouts after partial commits, contradictory sources, reduced budgets, and model substitutions. Stability is demonstrated under stress, not inferred from a happy-path demo.",
      ] },
    ],
    failureModes: [
      { mode: "Context hoarding", signal: "Token use rises with session age while answer quality and retrieval precision fall.", response: "Build typed memory, relevance gates, and checkpoint-based compaction." },
      { mode: "Retry vortex", signal: "The same tool or model call repeats with semantically equivalent inputs.", response: "Use attempt fingerprints, bounded retries, changed strategy requirements, and stop conditions." },
      { mode: "Summary mutation", signal: "Claims in memory cannot be mapped back to source evidence.", response: "Require provenance for compacted facts and preserve unresolved conflicts explicitly." },
      { mode: "Goal drift", signal: "Tool activity remains fluent but no longer advances accepted success criteria.", response: "Run trajectory checks and require re-planning or user clarification at drift thresholds." },
      { mode: "Synthetic consensus", signal: "Multiple agents agree because they consumed the same generated claim.", response: "Track dependency lineage and require independent external evidence for material assertions." },
      { mode: "State fracture", signal: "Planner, memory store, and external system disagree about completed work.", response: "Use idempotency keys, state versions, reconciliation, and checkpointed compensation handles." },
    ],
    metrics: [
      { metric: "Goal-distance trend", why: "Detects trajectories that are active but no longer useful.", guardrail: "Escalate when distance increases across consecutive consequential steps." },
      { metric: "Unsupported-claim rate", why: "Measures epistemic debt entering durable state or output.", guardrail: "Zero tolerance for material claims used in irreversible decisions." },
      { metric: "Context utility", why: "Compares included context with evidence actually used.", guardrail: "Compact or rebuild when low-utility context dominates the working set." },
      { metric: "Retry diversity", why: "Distinguishes recovery from repeated sampling of one failure.", guardrail: "A retry must alter provider, prompt, tool, evidence, or strategy." },
      { metric: "State reconciliation lag", why: "Shows how long internal and external truth remain inconsistent.", guardrail: "Page operators when consequential state exceeds the workflow SLO." },
      { metric: "Cost per verified outcome", why: "Connects resource entropy to delivered value.", guardrail: "Budget by outcome class and include failed trajectories." },
    ],
    implementation: [
      { phase: "Model the state", outcome: "Facts, beliefs, plans, events, and policies have separate schemas.", work: ["Define provenance and freshness fields", "Identify authoritative systems of record", "Version plans and memory writes", "Classify generated artefacts"] },
      { phase: "Set budgets", outcome: "Every run has explicit limits for time, calls, cost, context, and authority.", work: ["Budget by action class", "Define checkpoint triggers", "Add fan-out and retry limits", "Specify safe stop outcomes"] },
      { phase: "Instrument drift", outcome: "Operators can see contradiction, goal distance, and resource pressure.", work: ["Trace memory reads and writes", "Fingerprint repeated attempts", "Record plan diffs", "Link claims to evidence"] },
      { phase: "Add intervention", outcome: "The runtime can compact, re-plan, ask, hand off, roll back, or stop.", work: ["Implement deterministic control rules", "Preserve pre-intervention state", "Test compensation", "Expose operator controls"] },
      { phase: "Stress trajectories", outcome: "Release evidence covers long-horizon and partial-failure behavior.", work: ["Replay production-shaped traces", "Inject contradictory evidence", "Force tool timeouts", "Compare outcome, path, and cost"] },
    ],
    checklist: ["Is every durable belief linked to evidence?", "Can generated evidence be distinguished from external evidence?", "Does every retry change strategy?", "Can the runtime detect progress without asking the model?", "Are checkpoints created before irreversible actions?", "Can a session stop safely when budgets expire?", "Do evaluations score trajectory and outcome?", "Can old memory be invalidated when source facts change?"],
    sources: [
      { title: "Effective context engineering for AI agents", publisher: "Anthropic Engineering", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", note: "Practical discussion of curating the limited context available to an agent rather than treating the window as an undifferentiated transcript." },
      { title: "How Bad is Training on Synthetic Data?", publisher: "arXiv", url: "https://arxiv.org/abs/2404.05090", note: "Statistical analysis of recursive synthetic-data training and model collapse; useful background for reasoning about feedback loops and provenance." },
      { title: "Is Model Collapse Inevitable?", publisher: "arXiv", url: "https://arxiv.org/abs/2404.01413", note: "Shows how assumptions about replacing versus accumulating real and synthetic data materially change collapse behavior." },
      { title: "GenAI semantic conventions", publisher: "OpenTelemetry", url: "https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/", note: "Standardized attributes for model operations, agents, workflows, tool calls, usage, and sensitive-content handling." },
    ],
  },
  "avoiding-vendor-lock-in": {
    standfirst: "Vendor neutrality is often sold as a universal adapter that translates one chat API into another. That is the least important part. Real lock-in lives in semantics: tool-calling behavior, structured-output guarantees, context limits, safety policy, caching, identity, batch operations, evaluation data, and the operational habits built around one provider.",
    thesis: "A vendor-agnostic platform should stabilize the application's intent and evidence contracts while allowing provider-specific capabilities to remain explicit. The goal is controlled substitution, not the fiction that every model behaves the same.",
    takeaways: ["Design a small canonical capability contract, not a lowest-common-denominator copy of every API.", "Route by evaluated task requirements and policy, never by marketing benchmark alone.", "Preserve provider-native escape hatches behind typed capability checks.", "Treat prompts, tools, evaluators, and safety settings as versioned deployment artefacts.", "Run shadow traffic and replay evaluations before changing routing weights.", "Measure switching cost continuously through portability tests."],
    sections: [
      { id: "where-lock-in-lives", title: "Map lock-in before abstracting it", paragraphs: [
        "API shape is visible lock-in; behavioral dependence is the expensive kind. A workflow may rely on one provider's JSON repair, tool-choice semantics, cached-prefix behavior, citation format, regional availability, rate-limit model, or refusal style. Replacing the SDK while preserving those assumptions produces a system that compiles and quietly changes behavior.",
        "Create a dependency map across protocol, capability, behavior, operations, commercial terms, data governance, and people. For each dependency, decide whether to normalize it, expose it, or accept it deliberately. Abstraction has a maintenance cost, so do not wrap a feature unless substitution or centralized control has credible value.",
      ], bullets: ["Protocol: request, streaming, errors, retries, and usage fields.", "Capability: tools, schemas, vision, files, batch, caching, fine-tuning, and reasoning controls.", "Behavior: instruction adherence, uncertainty, refusals, language, and long-context performance.", "Operations: identity, quotas, regions, observability, support, and incident communication.", "Commercial: unit pricing, commitments, egress, minimum spend, and deprecation terms."] },
      { id: "canonical-contract", title: "Stabilize intent with a capability contract", paragraphs: [
        "The application should ask for an outcome class—extract this schema, classify under this taxonomy, draft with these sources, choose among these tools—plus nonfunctional requirements such as latency, region, maximum cost, and data policy. The gateway translates that contract into a provider request only after confirming the provider can satisfy it.",
        "Keep the contract narrow and versioned. Unknown provider fields should not leak through generic dictionaries because they become invisible dependencies. When a native feature matters, represent it as an explicit optional capability and require the caller to define fallback behavior. A portability failure should happen during validation, not halfway through a customer interaction.",
      ], code: { language: "typescript", label: "Intent-first request contract", value: `type InferenceIntent = {
  task: "extract" | "classify" | "compose" | "agent_step"
  qualityProfile: "fast" | "balanced" | "deep"
  output: { schema?: JSONSchema; maxTokens: number }
  policy: { region: "eu" | "us"; pii: "deny" | "redact" | "allow" }
  budget: { maxCostUsd: number; deadlineMs: number }
  requiredCapabilities: ("tools" | "vision" | "citations")[]
}` } },
      { id: "routing", title: "Routing is a product decision under uncertainty", paragraphs: [
        "A router chooses among deployments using task eligibility, policy, observed quality, latency, availability, and marginal cost. Start with deterministic rules because they are understandable and easy to test. Add learned routing only when you have representative labels, stable feedback, and a clear fallback. A router that saves tokens while increasing rework or review is not cheaper.",
        "Use hard gates before scores. Region, data-processing agreement, required modality, context capacity, and tool support determine eligibility. Then rank eligible deployments using recent task-specific evidence. Include exploration traffic carefully so new models can earn trust. Record the candidate set, feature values, policy version, chosen route, and outcome for every decision.",
      ] },
      { id: "adapters", title: "Adapters need conformance tests, not faith", paragraphs: [
        "Each provider adapter should normalize authentication, timeout, streaming events, usage accounting, errors, and structured output into the canonical contract. It should also declare unsupported or approximate behavior. Silent emulation is dangerous: simulating a strict schema with prompt text is not equivalent to a provider-enforced constrained decoder.",
        "Build a conformance suite with golden protocol fixtures and live canaries. Test cancellation, partial streams, malformed tool arguments, rate limits, safety refusals, empty usage fields, duplicated events, and provider timeouts. Store raw provider metadata in a governed extension field so investigations can recover detail without coupling application code to it.",
      ] },
      { id: "migration", title: "Switch through evidence, not a feature flag", paragraphs: [
        "A safe migration begins with offline replay of production-shaped cases, followed by shadow requests that do not affect users, then a small canary with explicit rollback thresholds. Compare task success, policy outcomes, structured-output validity, tool-selection precision, latency distribution, cost per verified outcome, and reviewer disagreement. Average benchmark scores cannot predict your traffic mix.",
        "Keep prompts and provider parameters in a deployment manifest. The same logical prompt may require provider-specific rendering, but every variant should map to one intent version and evaluation set. A route change is then a release with evidence and rollback, not an invisible configuration tweak.",
      ] },
      { id: "organizational-portability", title: "Portability is an operating capability", paragraphs: [
        "Teams lose portability when only one engineer understands the adapter, contracts reference one provider's terminology, evaluation data cannot be exported, or cost reports depend on proprietary dashboards. Periodic substitution exercises expose these dependencies. Route a bounded workload to an alternative, document the gaps, and price the remediation.",
        "Not all lock-in is bad. A proprietary capability can create legitimate product advantage. The important decision is to make the dependency visible, isolate its blast radius, and know the exit cost. Architecture should preserve options where options have value, not flatten every differentiator in advance.",
      ] },
    ],
    failureModes: [
      { mode: "Lowest-common denominator", signal: "The platform hides useful capabilities and every request looks like plain chat.", response: "Model optional capabilities explicitly and allow typed native paths with declared fallback." },
      { mode: "Semantic mismatch", signal: "A switched provider returns valid syntax but changes tool, refusal, or citation behavior.", response: "Use task-specific behavioral evaluations and adapter conformance tests." },
      { mode: "Router by price", signal: "Unit cost falls while retries, review, or abandonment rises.", response: "Optimize cost per verified outcome and include downstream operational cost." },
      { mode: "Hidden native fields", signal: "Application code passes arbitrary provider parameters through generic metadata.", response: "Reject unknown fields; promote required features into versioned capabilities." },
      { mode: "Untraceable fallback", signal: "Incidents cannot determine which model answered after retries or failover.", response: "Record candidate set, route reason, attempts, versions, and final provider in one trace." },
      { mode: "Paper portability", signal: "An adapter exists but has not carried representative traffic in months.", response: "Run scheduled portability drills and maintain an evidence-backed exit-cost register." },
    ],
    metrics: [
      { metric: "Portable traffic share", why: "Shows how much workload can move without product change.", guardrail: "Report by task and capability; a global percentage hides critical dependencies." },
      { metric: "Cost per verified outcome", why: "Combines model spend with retries, review, and failures.", guardrail: "Use representative task weights and confidence intervals." },
      { metric: "Structured-output validity", why: "Adapter correctness depends on more than HTTP success.", guardrail: "Measure schema validity and semantic acceptance separately." },
      { metric: "Route regret", why: "Estimates loss against the best eligible route known after evaluation.", guardrail: "Limit exploration for consequential tasks and review drift weekly." },
      { metric: "Provider concentration", why: "Reveals operational and commercial dependency.", guardrail: "Set thresholds per critical capability, not only total token volume." },
      { metric: "Migration lead time", why: "Turns portability into a tested recovery property.", guardrail: "Exercise a bounded provider substitution at least quarterly." },
    ],
    implementation: [
      { phase: "Inventory dependencies", outcome: "A provider dependency and exit-cost map.", work: ["Trace native API fields", "Map behavioral assumptions", "Record data and region constraints", "Identify proprietary operations"] },
      { phase: "Define the contract", outcome: "A small intent and capability schema owned by the platform.", work: ["Specify task classes", "Add budgets and policy", "Version error semantics", "Define explicit extensions"] },
      { phase: "Build adapters", outcome: "Providers conform or fail clearly.", work: ["Normalize streaming and usage", "Declare approximations", "Preserve raw metadata", "Add conformance fixtures"] },
      { phase: "Create evidence", outcome: "Routing decisions use task-specific evaluation and live health.", work: ["Build replay sets", "Collect outcome labels", "Measure end-to-end cost", "Define rollback thresholds"] },
      { phase: "Migrate safely", outcome: "Shadow, canary, ramp, and rollback are routine platform operations.", work: ["Mirror bounded traffic", "Compare policy and behavior", "Ramp by task", "Publish migration report"] },
    ],
    checklist: ["Does the application express intent without provider names?", "Are required capabilities validated before dispatch?", "Are native extensions typed and observable?", "Can every route decision be explained?", "Do evaluations include your real task mix?", "Is cost measured after retries and review?", "Has an alternative provider handled recent canary traffic?", "Is accepted lock-in documented with owner and exit cost?"],
    sources: [
      { title: "Compare API models", publisher: "OpenAI Developers", url: "https://developers.openai.com/api/docs/models/compare", note: "First-party model catalogue exposing current model identifiers, capabilities, context and public pricing dimensions." },
      { title: "Claude pricing", publisher: "Claude Platform", url: "https://platform.claude.com/docs/en/about-claude/pricing", note: "First-party pricing reference including model, feature, region, cache, batch and long-context distinctions." },
      { title: "Gemini Developer API pricing", publisher: "Google AI for Developers", url: "https://ai.google.dev/gemini-api/docs/pricing", note: "First-party pricing source for Gemini model families, caching, batch and paid-tier conditions." },
      { title: "Gemini deprecations", publisher: "Google AI for Developers", url: "https://ai.google.dev/gemini-api/docs/deprecations", note: "Authoritative lifecycle table linking deprecated model identifiers to shutdown dates and replacements." },
      { title: "List all models and their properties", publisher: "OpenRouter", url: "https://openrouter.ai/docs/api/api-reference/models/get-models", note: "Machine-readable catalogue for discovery and cross-checking of slugs, pricing dimensions, context, parameters and expiration state." },
      { title: "Managing Cron Jobs", publisher: "Vercel", url: "https://vercel.com/docs/cron-jobs/manage-cron-jobs", note: "Primary operational guidance for authentication, duration, non-retry behavior, concurrency, locks and idempotency." },
      { title: "GitHub Copilot billing", publisher: "GitHub Docs", url: "https://docs.github.com/en/billing/concepts/product-billing/github-copilot-billing", note: "Current first-party billing model and evidence of why monitored commercial surfaces need lifecycle-aware change detection." },
      { title: "GenAI semantic conventions", publisher: "OpenTelemetry", url: "https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/", note: "Provider-neutral telemetry vocabulary for model, agent, tool, workflow and usage operations." },
    ],
  },
  ...articleContentExtra,
}

export function getDeepArticle(slug: string): DeepArticle | undefined {
  return articleContent[slug]
}

export function getArticleWordCount(article: DeepArticle): number {
  const text = [
    article.standfirst,
    article.thesis,
    ...article.takeaways,
    ...article.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      section.code?.value ?? "",
    ]),
    ...article.failureModes.flatMap((item) => [item.mode, item.signal, item.response]),
    ...article.metrics.flatMap((item) => [item.metric, item.why, item.guardrail]),
    ...article.implementation.flatMap((item) => [item.phase, item.outcome, ...item.work]),
    ...article.checklist,
    ...article.sources.flatMap((source) => [source.title, source.publisher, source.note]),
  ].join(" ")

  return text.trim().split(/\s+/).filter(Boolean).length
}
