# Observability for Agentic Systems

**Why enterprises need a governance wrapper around agents—and how to turn traces, policy decisions, budgets, side effects and human interventions into operational control.**

*Published December 10, 2025 · Updated July 2026*

---

# The interface is not the system

An agent can look healthy while it is failing.

The model responds. The API returns `200`. The dashboard remains green. Tool calls complete. Tokens continue to move through the platform. Yet the agent may be repeating the same search, acting on stale evidence, exceeding its delegated authority, leaking context across tenants, or accumulating partially committed side effects that nobody can reconstruct.

Traditional application monitoring asks whether a service is available, fast and error-free. Agentic operations require a harder set of questions:

- What goal was accepted?
- Which identity acted on whose behalf?
- What authority was delegated, and how far did it propagate?
- Which evidence shaped each decision?
- Which model, prompt, policy and tool versions were active?
- What did the system attempt, and what actually committed?
- Where did the plan change?
- How much budget was consumed without new evidence or progress?
- When did a human, evaluator or policy engine alter the trajectory?
- Can the organisation stop, revoke, replay and explain the run now?

That is not a logging problem. It is an operating-model problem.

> **An enterprise does not need another dashboard around its agents. It needs a governance wrapper in the execution path.**

The wrapper observes, but it also constrains. It gives every agent a durable identity, evaluates authority before tools execute, propagates trace context across delegation, records policy decisions, meters budgets, distinguishes attempts from commits, and exposes intervention points while there is still time to change the outcome.

Observability becomes useful when it can answer an incident question. Governance becomes real when it can change execution. The enterprise control plane needs both.

# What a governance wrapper actually wraps

A model is not an agent. A prompt is not an agent. A process with a model, tools, memory, state and a loop may behave agentically, but the governable object is larger than any one of those components.

The wrapper surrounds the complete unit of delegated work:

1. A principal asks for an outcome.
2. An intake layer authenticates the principal and classifies the task.
3. A policy decision establishes the allowed purpose, tools, data, budget and autonomy level.
4. A runtime creates or invokes one or more agents.
5. Agents reason, retrieve, call models, use tools, delegate and revise plans.
6. External systems accept, reject or partially commit changes.
7. Evaluators and humans may approve, deny or redirect the work.
8. The runtime reconciles the final state and closes the evidence record.

The control plane is responsible for the boundaries between those steps. If it sits only after generation, it sees the story too late. If it trusts each agent to self-report correctly, it has delegated governance to the system being governed.

The minimum wrapper has seven responsibilities:

| Control | Runtime question | Required evidence |
|---|---|---|
| Identity | Who or what is acting? | Agent, principal, tenant and workload identity |
| Authority | Why may it act? | Delegation chain, capability scope and expiry |
| Policy | Is this action allowed now? | Policy version, inputs, decision and obligations |
| State | What did the world look like? | Versioned reads, writes, checkpoints and conflicts |
| Budget | How much autonomy remains? | Calls, cost, time, depth, fan-out and risk consumption |
| Evidence | Why was this path chosen? | Sources, evaluations, reason codes and uncertainty |
| Recovery | How can we contain it? | Pause, revoke, cancel, compensate and resume paths |

This model deliberately separates model reasoning from control authority. The model can propose a tool invocation. The tool gateway decides whether the invocation is valid, authorised, affordable and safe to attempt.

# A trace is a causal graph, not a transcript

A chat transcript records messages. A useful agent trace records causality.

The root should represent one accepted unit of work: resolve a support case, produce a verified brief, change a customer record, compare a set of vendors, or execute a governed workflow. Every operation that materially advances, redirects or constrains that unit belongs to the same trace context.

Children may include:

- agent and workflow invocations;
- model calls and route decisions;
- retrieval queries and evidence selection;
- tool validation, attempt and result;
- policy decisions and approval requests;
- state reads, writes and version conflicts;
- evaluator runs and quality gates;
- human interventions;
- checkpoints, retries and compensations.

A strict tree is not always enough. Work may cross queues, pause for approval, fan out to workers, join later or continue in another service. W3C Trace Context provides a portable way to propagate trace identity across boundaries. Span links can express asynchronous causality where parent-child nesting would be misleading.

OpenTelemetry's GenAI semantic conventions provide increasingly useful provider-neutral fields for operations, agents, workflows, tools, model identity and usage. They are a foundation, not the complete enterprise schema. The application must still define its own semantics for authority, policy, progress, outcomes and side effects.

```yaml
trace:
  id: trc_01JZ...
  workload_id: work_7842
  principal_id: usr_218
  tenant_id: acme_eu
  purpose: resolve_refund_exception
  risk_class: consequential

runtime:
  agent_id: refund-investigator
  agent_version: 3.4.1
  prompt_version: sha256:9a21...
  policy_version: refunds-eu@18
  model_route: reasoning-standard

authority:
  delegated_by: support-supervisor
  capabilities:
    - read:orders/customer_scope
    - propose:refund/max_250_eur
  expires_at: 2026-07-22T14:30:00Z

budget:
  calls_max: 18
  cost_max_eur: 1.20
  duration_max_seconds: 90
  delegation_depth_max: 1

outcome:
  status: escalated
  reason_code: evidence_conflict
  attempted_actions: 2
  committed_actions: 0
```

The schema should let an operator move from the outcome back to the exact facts that shaped it. A trace that captures every token but cannot say which policy authorised a side effect is high-volume telemetry and low-value evidence.

# The complete agent evidence graph

Enterprise trace design should begin with incident questions, not whatever an SDK happens to emit.

Suppose a customer claims that an agent changed a contract incorrectly. The reconstruction needs more than the final response. It needs the document version the agent read, the retrieval result it selected, the rule it inferred, the policy decision that allowed the tool, the arguments sent to that tool, the target system's response, the commit identifier, and any later compensation.

The graph contains several kinds of truth:

## Declared intent

The accepted goal, constraints, principal and purpose. This is not free-form prompt text alone. It is the contract the runtime agreed to execute.

## Observed context

Documents, records, tool results and messages available at a specific version. Store references and hashes by default. Content access follows a separate policy.

## Proposed decisions

Plans, candidate actions, route choices and generated arguments. A proposal is not yet an authorised or committed action.

## Control decisions

Deterministic or policy-engine outcomes: allow, deny, require approval, narrow, redact, substitute, pause or stop. Every decision carries a stable reason code and policy version.

## External effects

What was attempted, accepted, committed, rejected, timed out or left uncertain. Distributed systems make this distinction essential. A timeout does not prove that nothing happened.

## Evaluation evidence

Schema checks, factuality checks, business rules, model judges, human review and downstream outcomes. Each evaluator has an identity, version, rubric and uncertainty.

## Recovery evidence

Cancellation, capability revocation, lease release, compensation, rollback and human resolution. An incident is not closed because the agent stopped producing tokens.

When these records share durable identifiers, the organisation can investigate a run as a graph of claims and state transitions. When they remain in separate vendor consoles, correlation becomes forensic guesswork.

# Observe decisions, not hidden thoughts

Agent observability does not require collecting private chain-of-thought. It requires observable decision records.

The operationally useful record is concise:

- decision type;
- selected action;
- alternatives considered at the control boundary;
- evidence references;
- policy and evaluator results;
- confidence or uncertainty class;
- reason code;
- budget before and after;
- resulting state transition.

This record can be generated by application code around the model. It is more stable, safer and easier to query than an unconstrained reasoning transcript.

For example, a route decision can state that three providers were eligible, one failed the data-residency policy, one exceeded the latency envelope and the remaining route was selected. That explains the action without exposing hidden model reasoning or sensitive prompt content.

> **Reasoning can remain probabilistic. Accountability cannot remain implicit.**

# The signal that ordinary monitoring misses: no progress

Infrastructure monitoring is good at detecting exceptions. Agents often fail without throwing one.

Every model call succeeds. Every search returns data. Every critic requests one more revision. The trajectory remains alive but does not become more complete, more supported or more correct.

The runtime needs a progress model independent of the agent's self-assessment. Depending on the task, progress can mean:

- a new required field verified;
- a unique evidence source accepted;
- a milestone completed;
- uncertainty reduced;
- an external state transition committed;
- a blocker classified;
- a human decision requested with sufficient context.

Useful derived signals include:

| Signal | Interpretation | Possible intervention |
|---|---|---|
| Calls without new evidence | Search or reasoning loop | Change strategy or stop |
| Repeated attempt fingerprint | Semantic retry | Suppress duplicate and inspect cause |
| Plan oscillation | Conflicting objectives or weak state | Restore checkpoint or escalate |
| Cost burn above progress | Economic drift | Downgrade route or terminate |
| Growing context, stable answer | Context accumulation without gain | Compact from verified state |
| Repeated delegation | Responsibility avoidance | Cap depth and return ownership |
| Tool success, outcome failure | Wrong local objective | Re-evaluate workflow contract |

The key metric is not tokens per second. It is verified progress per unit of autonomy consumed.

# Attempted is not committed

One of the most damaging observability mistakes is recording a tool call as if it were an effect.

A tool invocation passes through states:

1. Proposed by an agent.
2. Validated against a schema.
3. Evaluated by policy.
4. Approved automatically or by a human.
5. Attempted against an external system.
6. Accepted or rejected by that system.
7. Committed, partially committed or left uncertain.
8. Verified through a read-back or event.
9. Compensated, if required.

Retries become dangerous when the runtime cannot distinguish those states. If a payment API times out after accepting a request, repeating the call without an idempotency key may duplicate the charge. If a CRM returns an error after a partial update, a clean-looking failure span can conceal corrupted state.

Every consequential tool needs:

- a stable action identifier;
- an idempotency key;
- target resource version;
- request hash;
- expected effect;
- provider acknowledgement;
- commit or uncertainty state;
- verification strategy;
- compensation path.

This is where observability becomes transaction discipline.

# The control loop: observe, diagnose, govern, intervene, prove

Dashboards report. Control loops act.

The wrapper continuously converts runtime signals into bounded interventions:

1. **Observe** the trace, budget, state, policy and evidence graph.
2. **Diagnose** anomalies using deterministic checks and calibrated evaluators.
3. **Govern** the next action against purpose, authority and risk.
4. **Intervene** at the least disruptive effective level.
5. **Prove** what happened by closing the evidence record.

Intervention should be progressive:

- warn or annotate;
- ask for missing evidence;
- narrow a tool or data scope;
- reduce fan-out or call budget;
- substitute a model route;
- restore a checkpoint;
- require human approval;
- pause the workflow;
- revoke capability tokens;
- cancel and compensate.

The system should not jump from passive monitoring to emergency shutdown. It needs intermediate controls that preserve useful work while reducing risk.

Entropic Core explores this runtime-control idea through budgets, checkpoints and interventions. It is useful as an experimental control mechanism, not evidence that one universal entropy score can govern every agent. The defensible pattern is the closed loop, not a claim that a single metric explains all failure.

# A governance wrapper needs two stores, not one exhaust pipe

Agent telemetry can contain credentials, personal data, legal material, health information, confidential documents and attacker-controlled instructions. Capturing everything by default creates a second, less governed copy of the organisation's most sensitive context.

OpenTelemetry explicitly warns that GenAI tool arguments and results may contain sensitive information. W3C Trace Context likewise says trace propagation fields must not carry personally identifiable or sensitive data.

A safer design separates stores.

## Operational event store

Broadly queryable metadata required for reliability and control:

- identifiers and versions;
- timings and status;
- reason codes;
- hashes and sizes;
- data classifications;
- policy outcomes;
- budget movement;
- side-effect states;
- evidence references.

## Restricted content store

Narrow, encrypted, access-controlled content captured only when justified:

- redacted prompt or output samples;
- reviewed incident payloads;
- replay fixtures;
- high-risk action arguments;
- documents required for an investigation.

Content capture should be opt-in by policy, short-lived by retention class and auditable. Sampling should be risk-aware. A denied novel tool call or consequential financial action may justify richer evidence than a routine FAQ response.

Metadata-first does not mean evidence-poor. Hashes, classifications, schema results and references often prove the control path without copying the underlying content.

# From observability to governance evidence

Operations, security, compliance, finance and product ask different questions of the same run.

Operations asks where latency and failure occurred. Security asks what identity crossed which trust boundary. Compliance asks which control applied and what evidence supports it. Finance asks what the accepted outcome cost. Product asks whether the result created value.

One trace can support all five if the schema is designed as an evidence spine rather than a vendor-specific dump.

The evidence package for a consequential run can include:

- workload and principal identity;
- declared purpose and risk class;
- system, agent, prompt, model, tool and policy versions;
- authority chain and approvals;
- sources and data classifications;
- decision and intervention reason codes;
- attempted and committed side effects;
- cost and budget reconciliation;
- evaluation results;
- human involvement;
- final outcome and recovery state.

This does not automatically produce legal compliance. It creates inspectable records from which an organisation can demonstrate that controls were designed, invoked and reviewed. Regulatory obligations still depend on the concrete system and role of each organisation.

# How the existing systems map to the control plane

The portfolio contains several real building blocks. They should not be presented as one finished enterprise platform when they are currently separate systems.

## LLMTRACE: the trace spine

LLMTRACE is the strongest direct observability artefact: an installable open-source package and a real anonymised trace surface. It demonstrates instrumentation around sessions, model usage, latency, errors and evaluation. Its strategic role is to carry provider-neutral trace identity and runtime facts.

What it proves today is narrower than a complete control plane. It does not by itself establish enterprise identity governance, policy enforcement, transactional compensation or organisation-wide evidence retention.

## AI Act Middleware: the governance decision surface

AI Act Middleware is a real public prototype for governance workflow and evidence concepts. In the target architecture, it supplies policy decisions, obligations, control records and audit-oriented evidence around a trace.

The public interface is not evidence of automatic legal compliance. It is evidence of a governance surface and an implementation direction.

## Entropic Core: the intervention layer

Entropic Core provides an executable experimental vocabulary for drift, budgets, checkpoints and runtime intervention. It demonstrates how signals can affect a control loop. Its synthetic experiments do not prove production efficacy or a universal measure of system entropy.

## PsycheOS: the behavioural evaluation surface

PsycheOS demonstrates a browser-local safety evaluation surface using user-provided model access. It can inform the evaluation layer by producing versioned scenarios, protocols and outcomes while avoiding a central server receiving test content.

It is a separate safety product, not currently a live policy engine inside LLMTRACE.

Together these systems reveal the architecture I have been working towards: trace what agents do, govern what they may do, evaluate how they behave and intervene before drift becomes damage. The integration is the next system boundary, not a claim hidden inside the portfolio.

# Incident reconstruction: a concrete example

Consider a procurement agent that recommends a vendor and drafts a purchase request. A manager reports that the selected provider violated the organisation's data-residency rule.

Weak telemetry shows a successful model call and the final recommendation.

A governed trace shows:

1. The workflow accepted a task for an EU tenant.
2. The vendor catalogue snapshot was 19 days old.
3. A retrieval span selected a provider page whose region statement had changed.
4. The policy engine evaluated an incomplete residency attribute as `unknown`.
5. The router incorrectly treated `unknown` as eligible.
6. The agent proposed a purchase request.
7. The tool gateway required human approval, so no purchase committed.
8. The manager rejected the request.
9. The trace generated a stale-source incident and a regression case.
10. The eligibility policy changed from `unknown → allow` to `unknown → block` for residency.

That is observability doing organisational work. It identifies the mechanism, limits the blast radius, preserves evidence and changes a control so the same class of failure becomes harder to repeat.

# Metrics that matter

System availability remains necessary, but it is not sufficient. A practical scorecard spans four layers.

## Reliability

- trace-context propagation rate;
- tool validation and timeout rate;
- queue and checkpoint health;
- partial or uncertain commit rate;
- recovery success rate.

## Agent effectiveness

- verified task completion;
- progress per model or tool call;
- unique evidence per worker;
- plan-revision and loop rate;
- escalation quality;
- outcome variance by version.

## Governance

- actions with valid authority chain;
- policy decision coverage;
- approvals bound to exact action hashes;
- high-risk actions without complete evidence;
- intervention and revocation latency;
- incidents converted into regression cases.

## Economics

- cost per accepted outcome;
- budget exhaustion rate;
- retry waste;
- failed-trajectory cost;
- human-review cost;
- cost avoided by early intervention.

Every metric needs a denominator and a decision. A dashboard tile without an owner, threshold and response is decoration.

# Failure modes of agent observability

## Transcript logging

The team can read messages but cannot reconstruct state, authority, policy or side effects. Add structured decision and transition events.

## Telemetry as surveillance

Everything is captured because storage is cheap. The exhaust becomes a privacy and insider-risk system. Make sensitive content exceptional, not default.

## Green-loop blindness

All calls succeed while the task circles. Instrument progress, unique evidence and semantic attempt fingerprints.

## Broken delegation traces

The supervisor is visible, but worker tasks start new unrelated traces. Propagate context and authority references across every queue and handoff.

## Approval theatre

A person clicks approve without seeing the exact action, evidence or consequence. Bind approval to an immutable action hash and expire it when material inputs change.

## Judge monoculture

One model family generates and evaluates the same behaviour. Combine deterministic validators, downstream outcomes, human samples and independent evaluators.

## Post-hoc governance

Policies run after a tool already changed external state. Move the decision point before execution and verify the effect afterwards.

## Vendor-console fragmentation

Model calls, tools, policies and business outcomes live in separate products with incompatible identifiers. Adopt one portable trace and application-owned semantics.

# A production implementation blueprint

## Phase 1 — Define the governable unit

Choose the business outcome represented by one trace. Name the principal, tenant, purpose, owner and risk class. Write the incident questions the trace must answer.

Do this before installing another observability SDK.

## Phase 2 — Instrument the spine

Adopt W3C-compatible trace propagation. Create spans for workflow, agent, model, retrieval, tool, policy, state and approval operations. Version every runtime artefact.

Start metadata-first. Establish retention and access classes before enabling content capture.

## Phase 3 — Put governance in the path

Require identity and capability scope at the tool gateway. Evaluate policy before attempt. Bind approvals to action hashes. Record obligations that must be verified after execution.

## Phase 4 — Model progress and budgets

Define milestones and accepted outcomes. Add call, cost, duration, depth and fan-out budgets. Detect repeated plans, duplicate work and cost without progress.

## Phase 5 — Build intervention and recovery

Implement pause, narrow, reroute, checkpoint, revoke, cancel and compensate. Test each path deliberately. A kill switch that has never been exercised is a diagram.

## Phase 6 — Close the evaluation loop

Turn privacy-reviewed failures into replayable cases. Test prompt, model, policy and tool changes against both final quality and trajectory behaviour. Publish release gates.

## Phase 7 — Operate the control plane

Assign owners, service objectives and runbooks. Review drift in policy coverage, trace completeness, budget tails and evidence retention. Governance is a continuing operating function, not a launch checklist.

# The enterprise contract

Before an agent platform can be treated as a controlled enterprise asset, it should be able to answer yes to these questions:

- Does every accepted unit of work receive one durable trace identity?
- Can delegated work be followed across services, queues and agents?
- Is every acting identity linked to a principal and scoped authority?
- Are policy decisions in the execution path?
- Can attempted actions be separated from committed effects?
- Are prompts, models, tools, policies and evaluators versioned?
- Can the runtime detect cost without progress?
- Is sensitive content absent from default telemetry?
- Can operators pause, revoke, cancel and compensate?
- Do production incidents become evaluation cases?
- Can finance reconcile cost to an accepted outcome?
- Can an auditor inspect controls without reading every private prompt?

If the answer is no, the system may still be useful. It is not yet fully governable.

# The deeper lesson

Agents turn software execution into a negotiation between intent, evidence, policy and changing state. That makes observability more important, but it also changes what observability must become.

The goal is not to watch intelligence happen. The goal is to maintain control over delegated capability.

LLMTRACE demonstrates a real trace surface. AI Act Middleware demonstrates a public governance prototype. Entropic Core explores runtime intervention. PsycheOS demonstrates a local safety-evaluation surface. They are honest, separate proofs of components in a larger architecture.

The enterprise opportunity is the layer that connects them:

> **Identity before autonomy. Policy before side effect. Trace through delegation. Evidence after outcome. Intervention before damage.**

That layer is not observability as a dashboard.

It is observability as the nervous system of agent governance.

