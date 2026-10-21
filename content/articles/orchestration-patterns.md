# Agent Orchestration Patterns for Complex Workflows

**Sequential, parallel, hierarchical and mesh orchestration patterns. When to use each, their trade-offs, and how to implement them without turning coordination into the most expensive part of the system.**

*Alejandro Baratas*

*Published November 25, 2025 · Updated July 2026*

---

## Summary

Most teams reach for multiple agents before proving that one agent with good tools and a deterministic workflow is insufficient.

The result is often an expensive role-playing exercise:

* one agent plans;
* another researches;
* another criticises;
* another supervises;
* another summarises what the others said.

The architecture looks sophisticated.

The system spends more tokens, carries more state, creates more failure points and sometimes performs worse than the single agent it replaced.

Multi-agent orchestration earns its complexity only when decomposition, parallelism, specialisation, context isolation or independent verification improve the outcome more than they increase coordination cost.

The central argument of this article is:

> **We do not really orchestrate agents. We orchestrate situations, authority, state, budgets and evidence.**

Agents are replaceable execution units.

The workflow graph is the enduring product.

---

# Do not start with the agents

The first diagram of a multi-agent system usually contains boxes labelled:

```text id="h2qokb"
Planner
Researcher
Writer
Critic
Supervisor
```

That diagram already contains the first architectural mistake.

It begins with actors instead of beginning with the situation.

Before deciding how many agents exist, the system should answer:

* What has happened?
* What needs to become true?
* Which facts must be known?
* Which decisions must be made?
* Which actions can change external state?
* Which work can happen independently?
* Which work depends on previous results?
* Who owns the canonical state?
* What evidence must remain afterward?
* What makes the workflow stop?

Only then should we decide whether a step needs:

* deterministic code;
* a tool;
* one LLM call;
* one stateful agent;
* several specialised agents;
* a human decision.

The agents are not the architecture.

They are possible workers inside the architecture.

---

# The situation graph is the product

While building systems such as document-intelligence workflows, governance runtimes, vendor-comparison engines and agent evaluation environments, I repeatedly encountered the same pattern.

At first, each problem appeared to require a different collection of agents.

A requirements agent.

A compliance agent.

A solution-design agent.

A cost agent.

A risk agent.

An evaluator.

A governance agent.

But the deeper structure was not a list of roles.

It was a graph of situations.

For example:

```text id="f4k7z2"
Document received
      ↓
Requirements unresolved
      ↓
Requirements extracted
      ↓
Conflicts detected
      ↓
Human or policy decision required
      ↓
Solution evidence incomplete
      ↓
Evidence produced
      ↓
Deliverable ready
```

Each node represents a meaningful state of the work.

Each edge represents a permitted transition.

An agent may help produce that transition.

But the agent is not the transition itself.

This distinction matters because models, providers and frameworks will change.

The business situation will remain.

The lasting asset is not:

> “We have a Requirements Agent.”

It is:

> “We have a governed process for transforming an unstructured requirement into a versioned, attributable and testable system obligation.”

That process can use one model today and another tomorrow.

It can use an agent, deterministic parser or human reviewer depending on confidence and risk.

The situation graph survives the implementation.

---

# Orchestration is movement

I define agent orchestration as the controlled movement of five things:

## 1. Work

Which task is being performed?

## 2. Authority

Which actor is permitted to perform it?

## 3. State

Which information may the actor read or modify?

## 4. Budget

How much time, money and computation may it consume?

## 5. Evidence

What must it return so the next actor can trust or challenge its work?

A workflow is reliable when these five things move predictably even if the model’s reasoning does not.

That produces a different architecture from simply allowing agents to talk to one another.

---

# Workflow or agent?

A useful distinction is between **workflows** and **agents**.

A workflow follows code-defined paths.

An agent dynamically decides which steps or tools to use.

Anthropic describes the distinction similarly: workflows orchestrate models and tools through predefined code paths, while agents allow the model to direct its own process and tool usage. Their guidance is to start with the simplest architecture and increase autonomy only when the task requires it, because agentic systems trade cost and latency for flexibility.

This gives us a first decision rule:

> If the path can be specified reliably in code, use code.

Do not ask a model to decide:

* whether the next required pipeline stage is stage three;
* whether a mandatory validator should execute;
* whether a payment exceeded a fixed threshold;
* whether all required fields exist;
* whether a deterministic test passed.

Use agents where the next useful step depends on interpretation, ambiguity or discoveries made during execution.

---

# The single-agent baseline

Before adding multiple agents, build the strongest reasonable single-agent baseline.

That baseline may include:

* retrieval;
* tools;
* memory;
* structured output;
* validators;
* deterministic routing;
* checkpoints;
* human approval.

A single augmented agent can already perform complex work.

LangGraph’s own multi-agent guidance warns that not every complex task needs multiple agents; a single agent with the right tools and context management may achieve the same result.

Multi-agent architecture should answer a specific limitation of the baseline.

Valid reasons include:

## Context isolation

Different subtasks require large, specialised contexts that would overwhelm one shared context.

## True parallelism

Several independent tasks can be completed simultaneously.

## Specialist capability

Different models, prompts, tools or security scopes are materially better for different work.

## Independent verification

The system needs separate attempts or adversarial perspectives that should not contaminate one another.

## Authority separation

One actor should propose an action while another approves or validates it.

## Long-horizon decomposition

The work is too broad to remain coherent inside one agent’s context and state.

“Multi-agent sounds more advanced” is not a valid reason.

---

# My orchestration rule

I use a simple test:

[
V_m > C_c + C_s + C_e
]

where:

* (V_m) is the additional value created by multiple agents;
* (C_c) is coordination cost;
* (C_s) is state-management cost;
* (C_e) is the additional error surface.

If multiple agents do not produce enough additional value to pay for those three costs, use fewer agents.

This is not only a financial equation.

Coordination also consumes:

* latency;
* tokens;
* engineering effort;
* observability;
* human attention;
* operational risk.

Anthropic reported that its multi-agent research architecture performed strongly on broad, parallel research tasks, but also found that its agents used roughly four times the tokens of normal chat interactions and its multi-agent system approximately fifteen times as many. The architecture was economically justified for high-value research, not as a universal replacement for single-agent execution.

More agents can improve performance.

They do so partly by spending more computation.

That is a feature only when the problem is worth the spend.

---

# Pattern 0 — Deterministic orchestration

Before discussing multi-agent patterns, we should acknowledge the most useful pattern:

> No agent decides the workflow.

The application controls the sequence.

```text id="wpb2a9"
Input
  ↓
Validate
  ↓
Retrieve
  ↓
LLM extraction
  ↓
Deterministic checks
  ↓
LLM synthesis
  ↓
Human approval
  ↓
Publish
```

This is often the correct architecture for:

* regulated processes;
* document pipelines;
* financial workflows;
* repeatable enterprise operations;
* tasks with known mandatory stages.

## Advantages

* predictable;
* testable;
* easy to trace;
* easier to budget;
* straightforward recovery;
* clear state ownership.

## Limitations

* less flexible;
* cannot easily discover new paths;
* brittle when the task is genuinely open-ended;
* may require extensive branching logic.

The presence of an LLM does not make the complete system an agent.

That is fine.

The objective is a useful system, not terminological purity.

---

# Pattern 1 — Sequential orchestration

Sequential orchestration passes work through a series of specialised stages.

```text id="xqiw9t"
Agent A
  ↓
Agent B
  ↓
Agent C
  ↓
Agent D
```

Each stage depends on the output of the previous stage.

Examples:

* extract requirements;
* normalise requirements;
* identify conflicts;
* produce solution mapping;
* validate evidence;
* generate deliverable.

This pattern fits systems such as RFP analysis or document-intelligence pipelines, where each transformation creates the structured state required by the next.

## When to use it

Use sequential orchestration when:

* dependencies are real;
* stages have distinct contracts;
* intermediate artefacts matter;
* ordering is mandatory;
* checkpoints are useful;
* failures should be isolated by stage.

## The main risk: the game of telephone

Agent A interprets the source.

Agent B receives Agent A’s summary.

Agent C receives Agent B’s interpretation.

By the final stage, the output may be coherent but disconnected from the original evidence.

Every handoff compresses information.

Every compression introduces selection.

Every selection can introduce error.

## The correct implementation

Do not pass only prose between agents.

Persist shared artefacts:

```text id="7us4v8"
Source document
Requirement objects
Evidence references
Conflict records
Decision records
Generated sections
Validation results
```

The next agent receives:

* the task;
* references to canonical artefacts;
* only the context necessary for its stage.

It should not receive the entire conversational history by default.

Anthropic describes a similar technique in its multi-agent research system: subagents can write artefacts to persistent storage and return lightweight references to the coordinator, reducing the “game of telephone” and avoiding repeated copying of large outputs through conversation history.

## Sequential contract

Every stage should declare:

```yaml id="smxjft"
stage: compliance_mapping
input:
  - requirement_set:v3
  - evidence_registry:v2
output:
  schema: compliance_mapping:v1
authority:
  read:
    - requirements
    - evidence
  write:
    - compliance_mapping
budget:
  max_cost: 0.75
  max_turns: 6
termination:
  success:
    - all_requirements_mapped
  escalate:
    - unresolved_high_risk_requirement
```

This is not prompt engineering.

It is workflow engineering.

---

# Pattern 2 — Parallel orchestration

Parallel orchestration divides work into independent branches.

```text id="9tybdl"
             ┌→ Agent A
Task ────────┼→ Agent B
             ├→ Agent C
             └→ Agent D
                    ↓
                Aggregator
```

There are two main forms.

## Sectioning

Different agents handle different parts of the problem.

Examples:

* research different markets;
* analyse different vendors;
* inspect different document sections;
* evaluate different risk domains;
* execute independent test suites.

## Independent attempts

Several agents solve the same problem independently.

Their outputs are then compared, voted on or evaluated.

This can be useful when:

* confidence matters;
* errors are uncorrelated;
* diversity of approach is valuable;
* the result can be verified.

Anthropic’s pattern guidance distinguishes these uses of parallelisation: dividing a task into independent sections and running multiple attempts for voting or confidence.

## When to use it

Use parallel orchestration when:

* tasks are independent;
* branches do not mutate the same state;
* the aggregator can reconcile outputs;
* the value of reduced latency or increased coverage justifies additional cost.

## The main risk: false independence

Tasks often appear independent but share hidden dependencies.

For example:

* a cost agent uses assumptions produced by the architecture agent;
* a compliance agent depends on the final intended use;
* two research agents retrieve different versions of the same policy;
* parallel code agents modify the same file.

Parallel execution in these cases creates:

* inconsistent assumptions;
* merge conflicts;
* duplicated work;
* non-deterministic results.

## Write isolation

Parallel workers should normally write to isolated namespaces:

```text id="03yr7v"
run/123/research/vendor-a
run/123/research/vendor-b
run/123/risk/security
run/123/risk/compliance
```

The aggregator, not the workers, owns the merged state.

Parallel workers should not silently overwrite canonical artefacts.

## Budgeted fan-out

Parallelism must have explicit limits:

```text id="x99uqg"
max_workers: 4
max_depth: 1
max_cost_per_worker: 0.40
max_total_cost: 1.20
timeout_seconds: 90
```

An orchestrator that may spawn an arbitrary number of agents is not adaptive.

It is economically unbounded.

Anthropic reported that early versions of its research system sometimes spawned dozens of subagents for simple requests or continued searching for nonexistent evidence. Explicit effort rules based on query complexity were needed to control the number of agents and tool calls.

---

# Pattern 3 — Hierarchical orchestration

Hierarchical orchestration uses a supervisor or lead agent that delegates to specialised workers.

```text id="4domxt"
                Supervisor
              /     |      \
        Research  Risk   Solution
             \      |      /
                Synthesis
```

This is one of the most useful and most abused patterns.

It is useful because the supervisor can:

* decompose open-ended tasks;
* allocate work;
* maintain global objectives;
* inspect gaps;
* request additional work;
* synthesise results.

Anthropic’s research system uses an orchestrator-worker pattern in which a lead agent plans the research, creates specialised subagents and later synthesises their findings. It is particularly effective for breadth-first questions with parallel, independent lines of investigation.

OpenAI’s Agents SDK also distinguishes manager-style orchestration, where a central agent calls specialists as tools while retaining control, from handoffs in which another agent takes over the interaction.

## When to use it

Use a hierarchy when:

* the problem requires dynamic decomposition;
* workers need isolated contexts;
* one actor must preserve the global objective;
* workers have clearly differentiated capabilities;
* synthesis requires a coherent final authority.

## The supervisor bottleneck

The supervisor may become:

* the largest context;
* the most expensive call;
* the single point of failure;
* the information bottleneck;
* the universal translator between specialists.

When every worker returns long prose to the supervisor, the lead agent eventually carries the entire system inside its context.

The hierarchy has not solved context pressure.

It has merely concentrated it.

## The solution: references, not repetition

Workers should return:

```text id="hsfawo"
status
structured result
evidence references
unresolved questions
confidence
cost
```

Not their complete internal conversation.

## Supervisor authority

The supervisor should not automatically possess every worker’s permissions.

A research supervisor may delegate work to a security agent.

That does not mean it should inherit production security credentials.

The hierarchy governs work.

It should not become a privilege-escalation tree.

## Hierarchy is not management theatre

Do not create:

* a CEO agent;
* a CTO agent;
* a Product Manager agent;
* a Developer agent;
* a QA agent;

merely to reproduce an organisation chart in prompts.

Human job titles bundle many social and political responsibilities that do not translate cleanly into software capabilities.

Define agents by bounded functions:

* `requirement_extractor`;
* `source_verifier`;
* `risk_classifier`;
* `patch_generator`;
* `test_executor`.

Capability is more useful than costume.

---

# Pattern 4 — Routing and handoffs

Routing chooses the specialist best suited to the current situation.

```text id="fkylv5"
Request
   ↓
Router
 ├→ Finance specialist
 ├→ Legal specialist
 ├→ Technical specialist
 └→ Human escalation
```

There are two different mechanisms.

## Agent as tool

The parent agent calls a specialist for a bounded task and retains control.

Example:

```text id="i0v4qq"
Coordinator
   ↓ calls
Pricing specialist
   ↓ returns result
Coordinator continues
```

## Handoff

The current agent transfers control to another agent.

```text id="zz7v7i"
Triage agent
   ↓ transfers
Refund agent
   ↓ owns conversation
```

OpenAI’s Agents SDK formalises this difference: agents-as-tools keep the manager in control, while a handoff transfers the conversation to the specialist.

## When to use agents as tools

Use a specialist as a tool when:

* the parent needs the result as one input;
* the task is narrow;
* the parent owns synthesis;
* conversation control should remain central.

## When to use handoffs

Use a handoff when:

* the specialist should own the next interaction;
* the user has entered a clearly different domain;
* the receiving agent has the correct tools and authority;
* carrying the original coordinator adds no value.

## The routing problem

The router itself needs evaluation.

Measure:

* correct-route rate;
* unnecessary handoffs;
* routing latency;
* fallback rate;
* specialist success;
* cost per route;
* harmful misroutes.

A sophisticated network with a poor router is simply a system that fails before the specialist starts.

---

# Pattern 5 — Evaluator–optimizer

In this pattern, one actor generates and another evaluates.

```text id="dlridp"
Generator
    ↓
Evaluator
    ↓
Accept / revise / reject
    ↓
Generator
```

This is useful when quality can be expressed through a rubric.

Examples:

* proposal generation;
* code and tests;
* policy compliance;
* citation verification;
* structured extraction;
* content quality.

## When to use it

Use evaluator–optimizer loops when:

* evaluation criteria are clear;
* the evaluator has access to evidence;
* revision can meaningfully improve the output;
* the loop has a strict stopping condition.

## The independence problem

If generator and evaluator use:

* the same model;
* the same context;
* the same assumptions;
* the same prompt style;

their errors may be strongly correlated.

The evaluator may simply approve a fluent version of the same mistake.

Independent verification may require:

* a different model;
* different evidence;
* deterministic tests;
* isolated context;
* human review.

## The infinite revision problem

Every evaluator loop must define:

```text id="4weu28"
max_revisions
minimum_improvement
acceptance_threshold
escalation_condition
budget
```

Otherwise:

```text id="wc6751"
Generate
Critique
Rewrite
Critique again
Rewrite again
```

becomes expensive performance art.

---

# Pattern 6 — Mesh and swarm orchestration

A mesh allows agents to communicate more directly without one permanent supervisor.

```text id="qc2cu2"
Agent A ↔ Agent B
   ↕         ↕
Agent C ↔ Agent D
```

It promises:

* resilience;
* distributed intelligence;
* emergent collaboration;
* dynamic delegation.

It also creates the hardest control problem.

## When it may be useful

Mesh architectures can make sense when:

* no single agent can maintain global context;
* work emerges dynamically;
* agents possess genuinely different local information;
* the network can tolerate eventual consistency;
* exploration matters more than strict predictability.

Potential domains include:

* distributed investigation;
* adversarial simulation;
* complex search;
* dynamic planning;
* decentralised monitoring.

## Why meshes fail

Without strong protocols, a mesh produces:

* loops;
* message storms;
* duplicated tasks;
* contradictory state;
* unclear ownership;
* hidden escalation;
* uncontrolled cost.

A mesh without topology constraints is not a swarm.

It is a group chat with API keys.

## Sparse topology

Not every agent should communicate with every other agent.

AutoGen’s multi-agent debate example uses a sparse communication topology in which agents exchange information with selected neighbours for a bounded number of rounds before an aggregator produces the result.

Sparse topology reduces:

* communication volume;
* context duplication;
* convergence pressure;
* cost.

## Mesh requirements

A viable mesh needs:

* unique agent identity;
* typed messages;
* task ownership;
* deduplication;
* leases or locks;
* bounded communication rounds;
* authority propagation;
* budget propagation;
* conflict resolution;
* termination.

Without these mechanisms, emergent behaviour becomes an excuse for missing architecture.

---

# The production default is usually hybrid

Real enterprise workflows rarely fit one pattern.

A more realistic architecture combines them.

```text id="5wck4q"
Deterministic intake
        ↓
Router
        ↓
Hierarchical planning
        ↓
Parallel specialists
        ↓
Sequential validation
        ↓
Independent evaluator
        ↓
Human approval
        ↓
Deterministic execution
```

For example, an RFP or complex document workflow may use:

1. Deterministic file validation.
2. One extraction agent.
3. Parallel requirement and risk analysis.
4. A supervisor that identifies gaps.
5. Sequential compliance mapping.
6. An independent evidence evaluator.
7. A human decision for unresolved commitments.
8. Deterministic compilation of the final artefact.

The architecture should change pattern when the control requirement changes.

Do not force the whole system into one fashionable topology.

---

# Every handoff needs a contract

Natural-language messages are not sufficient as workflow boundaries.

A handoff should be a typed contract.

At minimum:

```yaml id="vcow4y"
task_id: rfp-2026-014
from: orchestrator
to: security-risk-agent

objective:
  identify_security_requirements

inputs:
  requirement_ids:
    - REQ-041
    - REQ-052
  evidence_refs:
    - DOC-3:p44-p51

constraints:
  jurisdiction: EU
  prohibited_assumptions:
    - certification_exists
    - customer_accepts_residual_risk

output:
  schema: security_assessment:v2

authority:
  read:
    - requirements
    - evidence
  write:
    - draft_security_assessment
  denied:
    - final_commitment
    - pricing_change

budget:
  max_cost_eur: 0.60
  max_turns: 8
  deadline_seconds: 120

termination:
  success:
    - all_requirements_assessed
  escalate:
    - missing_evidence
    - unresolved_critical_risk
```

The contract prevents several failures:

* task ambiguity;
* authority leakage;
* context dumping;
* unbounded work;
* unverifiable outputs.

AutoGen’s core runtime similarly treats agents as identified actors communicating through serialisable message types, rather than relying solely on unstructured chat.

---

# Shared state is not shared conversation

One of the worst architectural shortcuts is using the conversation transcript as the database.

A chat history contains:

* instructions;
* speculative reasoning;
* tool results;
* corrections;
* abandoned ideas;
* final decisions.

It does not clearly distinguish them.

A production system should separate:

## Conversation

What agents and users said.

## Working state

The current structured state of the task.

## Evidence

Source artefacts that support claims.

## Decisions

Approved transitions and their authority.

## Outputs

Generated artefacts.

The conversation can help explain the trajectory.

It should not automatically become the source of truth.

---

# State ownership

Every state object needs an owner.

Examples:

| State                   | Owner                          |
| ----------------------- | ------------------------------ |
| Original document       | Intake service                 |
| Requirement record      | Requirement pipeline           |
| Risk assessment         | Risk specialist until approved |
| Final compliance status | Governance workflow            |
| Published deliverable   | Artifact compiler              |
| Budget ledger           | Runtime                        |
| Audit trace             | Control plane                  |

Several agents may propose updates.

Only the owning component should commit canonical state.

This avoids a common failure:

> The last agent to speak becomes the truth.

---

# Optimistic state is not verified state

Agent systems often need to work with incomplete information.

The state model should distinguish:

```text id="a6lpj3"
candidate
proposed
verified
approved
rejected
superseded
```

A model-generated claim begins as a candidate.

It should not become verified merely because another model repeats it.

A proposed architecture is not an approved commitment.

An extracted requirement is not automatically correct.

State transitions should require evidence or authority.

---

# Disagreement is a first-class state

When agents disagree, the system should not hide the conflict inside a synthesis paragraph.

Store the disagreement.

```yaml id="o8qlz7"
conflict_id: C-018
subject: data_retention_period

positions:
  - agent: compliance-agent
    value: 5_years
    evidence:
      - policy:eu-retention-v2#4.1

  - agent: solution-agent
    value: 2_years
    evidence:
      - customer-rfp#REQ-088

status: unresolved
resolution_required_from: human_owner
```

This makes conflict:

* inspectable;
* routable;
* resolvable;
* auditable.

Consensus should be the result of a resolution mechanism.

Not a stylistic rewrite.

---

# Majority voting is not truth

Three agents agreeing does not prove correctness.

They may share:

* the same model;
* the same training bias;
* the same retrieved source;
* the same prompt;
* the same false assumption.

Voting is most useful when errors are sufficiently independent.

Alternative resolution mechanisms include:

## Evidence-weighted resolution

Prefer the conclusion with stronger sources.

## Authority-weighted resolution

A policy engine overrules a general reasoning agent on a fixed rule.

## Deterministic validation

Execute code, query the system or test the claim.

## Adversarial review

Ask a separate actor to find disconfirming evidence.

## Human decision

Escalate when consequences justify it.

The objective is not agreement.

It is justified resolution.

---

# Termination is architecture

Every agent example eventually reaches:

```text id="m63o1y"
while not done:
    continue
```

But what exactly means “done”?

A reliable workflow defines terminal conditions externally.

## Success

The required state exists and passes validation.

## Partial success

Useful work is complete but some issues remain unresolved.

## Escalation

A human or higher-authority process must decide.

## Failure

The system cannot complete the task safely.

## Budget exhaustion

Further work is not economically justified.

## Cancellation

The user or policy stops execution.

AutoGen exposes explicit termination conditions for agent teams, and Anthropic recommends stopping conditions such as maximum iterations to maintain control over autonomous loops.

Termination is not merely a technical safeguard.

It is:

* a safety feature;
* an economic feature;
* a user-experience feature.

---

# Progress must be measurable

An agent should not continue merely because it can generate another step.

Define progress in terms of state change.

Examples:

* one more requirement verified;
* one conflict resolved;
* one failing test eliminated;
* one missing source found;
* confidence increased through independent evidence;
* unresolved scope reduced.

If three consecutive iterations consume budget without changing meaningful state, stop or intervene.

More activity is not progress.

---

# Idempotency and side effects

Any agent capable of changing external state needs idempotent operations.

A retry should not:

* send the same email twice;
* create two refunds;
* open duplicate tickets;
* deploy twice;
* overwrite approved data.

Every action should have:

```text id="664h6t"
idempotency_key
task_id
actor_id
approval_id
expected_state
resulting_state
```

Read-only reasoning can tolerate experimentation.

Write operations require stronger discipline.

---

# Checkpoints and recovery

Long-running orchestration will fail.

Networks time out.

Models return malformed output.

Tools change.

Workers crash.

Restarting the whole workflow may be expensive or unsafe.

Checkpoint:

* canonical state;
* completed stages;
* evidence;
* budgets;
* active policies;
* pending tasks;
* side effects already committed.

Anthropic describes using deterministic retry logic and regular checkpoints in its production research architecture so agents can resume rather than starting long tasks again.

Recovery should resume from verified state.

Not from a raw transcript of speculation.

---

# Observability must follow the graph

A traditional trace shows:

```text id="ybskaf"
service-a → service-b → database
```

An agent trace should show:

```text id="b1593n"
Task
├── Route decision
├── Plan version
├── Worker A
│   ├── Retrieval
│   ├── Tool calls
│   └── Evidence
├── Worker B
│   ├── Model
│   ├── Cost
│   └── Proposed state
├── Conflict
├── Evaluator
├── Human approval
└── External action
```

Record:

* agent identity;
* model;
* prompt;
* input references;
* output schema;
* tools;
* delegations;
* tokens;
* cost;
* latency;
* policy decisions;
* state transitions;
* termination reason.

The OpenAI Agents SDK includes built-in tracing for visualising and debugging agent workflows, while AutoGen’s runtime treats lifecycle, communication, monitoring and debugging as core infrastructure concerns.

But tracing every event is not enough.

The trace must preserve meaning.

---

# Evaluating orchestration

An agent can reach the correct answer through a dangerous process.

It can also follow the intended process and reach the wrong answer.

Evaluation therefore needs two levels.

## Outcome evaluation

Did the workflow produce the correct end state?

## Process evaluation

Did it remain inside acceptable constraints?

Process checks may include:

* only authorised tools used;
* no forbidden data accessed;
* cost within budget;
* no duplicate side effects;
* citations valid;
* required approval obtained;
* delegation depth acceptable.

Anthropic notes that multi-agent paths may differ legitimately between executions, making rigid turn-by-turn evaluation difficult. Their approach emphasises end-state evaluation, supplemented with checkpoints for workflows that mutate state.

The goal is not to require one exact trajectory.

It is to allow several valid trajectories inside governed boundaries.

---

# Economics of orchestration

For a multi-agent run:

[
C_{\text{total}}
================

\sum_{i=1}^{n} C_{\text{agent}*i}
+
C*{\text{coordination}}
+
C_{\text{evaluation}}
+
C_{\text{retries}}
+
C_{\text{state}}
]

The hidden term is coordination.

Coordination cost includes:

* describing tasks;
* transmitting context;
* interpreting outputs;
* resolving conflicts;
* merging artefacts;
* monitoring workers.

A worker may produce useful output for €0.10.

The complete system may spend €1.00 communicating around it.

Measure:

* cost per agent;
* cost per stage;
* cost per accepted outcome;
* coordination-to-work ratio;
* duplicate-work rate;
* idle waiting time;
* p95 total cost.

A system that saves human time may justify significant model cost.

But the value must be connected to the business outcome.

---

# Orchestration as governance

Once agents can delegate, orchestration becomes an authority system.

A parent should not be able to grant a child permissions it does not possess.

The child’s effective authority should be:

[
A_{\text{child}}
================

A_{\text{parent}}
\cap
A_{\text{registered}}
\cap
A_{\text{task}}
\cap
A_{\text{policy}}
]

The child may receive:

* less authority;
* less budget;
* less context.

Never more.

Every delegation should record:

* delegating actor;
* receiving actor;
* task;
* capabilities;
* expiry;
* budget;
* evidence requirement.

This is why I see orchestration and governance as inseparable.

An orchestrator that moves work without moving bounded authority is incomplete.

---

# How my own systems map to these patterns

The systems I have built publicly are not all examples of the same topology.

That is precisely the point.

## AI Vendor Compare — parallel evidence collection

Providers and claims can often be investigated independently.

Parallel workers can examine:

* model capability;
* pricing;
* governance;
* deployment;
* contractual claims.

A target Truth Graph links claims to versions and sources. The public product currently demonstrates a real snapshot interface; continuous agent collection remains an operating architecture rather than a claim of live daily coverage.

The value comes from parallel coverage and evidence separation, not from agents debating in a chat.

## PsycheOS — independent evaluation

Safety and human-benchmark scenarios benefit from:

* isolated attempts;
* adversarial perspectives;
* separate evaluation;
* defence and challenge.

The independence of evaluators matters more than the number of agent personas.

## AI Act Middleware — authority and policy gates

The public prototype demonstrates how policy, evidence and governance decisions can surround an agent workflow.

In a production topology, this role belongs before consequential execution: inspect delegated authority, evaluate the proposed action, attach obligations and preserve the decision record.

The prototype does not claim automatic compliance. It makes the control boundary visible.

## LLMTRACE — observability that follows the graph

LLMTRACE is a historical open-source tracing prototype. The published provider adapters wrap mocks; its dashboard is illustrative rather than evidence of a real provider trace.

Its role in orchestration is to preserve one causal identity across model calls, tools, workers, retries and evaluation so topology can be compared with outcome, cost and failure evidence.

## Entropic Core — checkpoints and intervention

Entropic Core explores budgets, drift signals, checkpoints and intervention in an executable laboratory.

It is evidence of a control-loop implementation, not proof of a universal entropy metric or a complete production orchestrator.

Together these systems map concrete pieces of the operating model. They are separate artefacts at different maturity levels, not one secretly integrated multi-agent platform.

---

# Common failure modes

## One agent per noun

A project contains requirements, so we create a Requirements Agent.

It contains risk, so we create a Risk Agent.

It contains reports, so we create a Report Agent.

A noun in the domain model does not automatically deserve an autonomous actor.

Create an agent only when the capability, context or authority boundary justifies one.

---

## The role-playing company

The system recreates an entire corporate hierarchy in prompts.

The agents spend tokens holding meetings, producing status reports and approving one another’s opinions.

This often imitates the overhead of an organisation without reproducing its accountability.

---

## Shared-chat architecture

All agents read and write to one long conversation.

State ownership disappears.

Context grows.

Speculation becomes indistinguishable from decisions.

Use a state store and artefact registry.

---

## Universal supervisor

Every event returns to one agent.

It becomes the router, planner, memory, evaluator, writer and final authority.

The system is technically multi-agent but operationally one giant agent with expensive assistants.

---

## Unbounded swarm

Agents can create agents that create agents.

No depth.

No fan-out limit.

No budget propagation.

This is not emergence.

It is uncontrolled recursion.

---

## Consensus theatre

Several nearly identical agents agree.

The system reports “high confidence”.

Agreement created by correlated models and shared context is not independent verification.

---

## Retry storms

A worker fails.

The supervisor retries.

The runtime retries.

The tool retries.

Another agent retries the same task.

Retries need one owner and one global budget.

---

## Context broadcasting

Every worker receives every document and every previous message.

Specialisation without context isolation loses much of its value.

---

## Orchestration without evidence

Agents return conclusions with no source references, intermediate artefacts or validation state.

The coordinator can only trust the prose.

That is not orchestration.

It is delegated opacity.

---

# Pattern-selection guide

## Use deterministic orchestration when:

* the path is known;
* compliance stages are mandatory;
* predictability matters;
* actions are consequential.

## Use sequential orchestration when:

* each stage creates required input for the next;
* intermediate artefacts need validation;
* recovery by stage is useful.

## Use parallel orchestration when:

* subtasks are genuinely independent;
* speed or coverage matters;
* isolated attempts improve confidence.

## Use hierarchical orchestration when:

* decomposition is dynamic;
* specialists require separate contexts;
* one actor must preserve the global objective.

## Use routing or handoffs when:

* requests fall into distinct domains;
* specialists should own different interactions;
* capability selection is the main problem.

## Use evaluator–optimizer loops when:

* success has a clear rubric;
* revision can improve the output;
* stopping rules are explicit.

## Use mesh orchestration when:

* decentralised information is essential;
* dynamic peer collaboration creates real value;
* you can afford the control infrastructure.

## Use one agent when:

* none of the above creates enough additional value.

---

# A production implementation blueprint

A robust orchestration runtime needs at least these components:

```text id="pzfbqp"
┌─────────────────────────────┐
│ Situation / Workflow Graph  │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Runtime                     │
│ identity · lifecycle        │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Router / Scheduler          │
│ dependencies · concurrency  │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Agent and Tool Registry     │
│ capabilities · versions     │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ State and Artefact Store    │
│ ownership · provenance      │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Policy and Budget Engine    │
│ authority · cost · limits   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Trace and Evidence Layer    │
│ events · decisions · proof  │
└─────────────────────────────┘
```

The framework is not the architecture.

LangGraph, AutoGen, OpenAI Agents SDK or a custom runtime can implement parts of this model.

The important decisions remain yours:

* state;
* authority;
* evidence;
* budget;
* termination.

---

# The orchestration contract

A useful central representation might look like:

```yaml id="jkiqq2"
workflow:
  id: governed-rfp-analysis
  version: 3

situations:
  - id: document_received
  - id: requirements_extracted
  - id: conflicts_resolved
  - id: evidence_verified
  - id: deliverable_approved

transitions:
  - from: document_received
    to: requirements_extracted
    executor: requirement_extractor
    mode: sequential
    validator: requirement_schema_validator

  - from: requirements_extracted
    to: conflicts_resolved
    executor:
      pattern: parallel
      workers:
        - compliance_specialist
        - solution_specialist
      aggregator: conflict_resolver

  - from: conflicts_resolved
    to: evidence_verified
    executor: evidence_evaluator
    approval:
      required_when:
        - critical_requirement_unresolved

limits:
  total_cost_eur: 8
  max_duration_minutes: 20
  max_delegation_depth: 2
  max_parallel_workers: 4

evidence:
  required:
    - source_references
    - state_transitions
    - model_versions
    - policy_decisions
    - final_validation
```

This representation begins with situations and transitions.

Not personalities.

---

# The deeper lesson

I initially thought orchestration was about connecting specialised agents.

It is not.

It is about preserving coherence while work moves between imperfect actors.

That includes human actors.

A reliable orchestration system must maintain:

* the objective;
* the current state;
* the authority chain;
* the evidence;
* the budget;
* the stopping conditions.

Agents may reason dynamically.

The system around them must remain structurally legible.

---

# The real product is the operating model

Models will improve.

Frameworks will change.

Some agents will disappear because one stronger model can absorb their role.

Other agents will appear because new tools create useful specialisation.

If the architecture is defined by named agent boxes, every model generation will force a redesign.

If the architecture is defined by:

* situations;
* contracts;
* state transitions;
* authority;
* evidence;

the system can evolve.

An agent becomes a replaceable implementation of a capability.

The operating model remains.

---

# Conclusion

Most teams ask:

> How should these agents talk to each other?

I think that is the wrong first question.

Ask:

> What must remain true while the work moves through the system?

The task must remain identifiable.

The objective must remain intact.

The state must have an owner.

Evidence must retain provenance.

Authority must not expand silently.

Budgets must remain bounded.

Disagreements must become visible.

Side effects must be controlled.

The workflow must know when to stop.

Only after defining those invariants should we choose sequential, parallel, hierarchical or mesh orchestration.

Sequential systems preserve dependency.

Parallel systems create speed and breadth.

Hierarchies create decomposition and global coordination.

Meshes create decentralised exploration.

Every pattern creates value.

Every pattern also creates a new failure surface.

The objective is not to build the system with the most agents.

It is to build the smallest topology capable of solving the situation reliably.

Because agents are not the product.

The public-facing agent, the specialist agents, the evaluator and the supervisor may all be replaced.

The enduring product is the graph that explains:

* what happens;
* what can happen next;
* who may cause it;
* what evidence is required;
* and where the system must stop.

That graph is the operational DNA of the system.

Everything else is an implementation.

