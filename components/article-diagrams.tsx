"use client"

import { useState } from "react"
import { Activity, ArrowDown, CircleDot, Database, DollarSign, FlaskConical, GitCompareArrows, LockKeyhole, RefreshCw, Search, ShieldCheck, Waypoints } from "lucide-react"

type DiagramProps = { headingId: string; articleSlug: string }
type Node = { id: string; label: string; eyebrow: string; detail: string; tone?: "green" | "cyan" | "amber" }

const tone = {
  green: "border-signal-green/45 bg-signal-green/10 text-signal-green",
  cyan: "border-signal-cyan/45 bg-signal-cyan/10 text-signal-cyan",
  amber: "border-signal-amber/45 bg-signal-amber/10 text-signal-amber",
}

function DiagramFrame({ label, title, note, children }: { label: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-border bg-[#080b10] text-white shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <figcaption className="flex flex-col gap-2 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-signal-green">{label}</p>
          <h3 className="mt-1 text-base font-semibold text-white">{title}</h3>
        </div>
        <p className="max-w-sm text-[10px] leading-relaxed text-white/45">{note}</p>
      </figcaption>
      {children}
    </figure>
  )
}

function Detail({ node }: { node: Node }) {
  return (
    <div className="border-t border-white/10 bg-white/[0.025] px-5 py-4" aria-live="polite">
      <div className="flex items-start gap-3">
        <CircleDot className="mt-0.5 h-4 w-4 flex-none text-signal-green" />
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/40">{node.eyebrow}</p>
          <p className="mt-1 text-sm font-semibold text-white">{node.label}</p>
          <p className="mt-1 max-w-3xl text-xs leading-6 text-white/60">{node.detail}</p>
        </div>
      </div>
    </div>
  )
}

const governanceNodes: Node[] = [
  { id: "identity", label: "Identity", eyebrow: "Who is acting?", detail: "A durable software identity separates the governed actor from its model, container and current human session.", tone: "cyan" },
  { id: "authority", label: "Authority", eyebrow: "Why may it act?", detail: "Short-lived, purpose-bound capability tokens describe the exact verbs, resources, limits and delegating principal.", tone: "green" },
  { id: "policy", label: "Policy", eyebrow: "Is it allowed now?", detail: "A deterministic decision point combines actor, task, risk, data class, budget and runtime conditions before execution.", tone: "amber" },
  { id: "approval", label: "Approval", eyebrow: "Who accepts consequence?", detail: "Human approval binds to the exact action hash and expires when material inputs, policy or target state changes.", tone: "cyan" },
  { id: "evidence", label: "Evidence", eyebrow: "Can we reconstruct it?", detail: "Every decision records versions, sources, obligations, side effects and the authority chain without treating raw logs as proof.", tone: "green" },
]

function GovernanceControlPlane() {
  const [selected, setSelected] = useState(governanceNodes[0])
  return (
    <DiagramFrame label="Interactive architecture 01" title="Governance belongs in the execution path" note="Select a control to inspect its runtime contract.">
      <div className="relative p-5 sm:p-7">
        <div className="pointer-events-none absolute left-1/2 top-10 h-[72%] w-px bg-gradient-to-b from-signal-cyan via-signal-green to-signal-amber opacity-45" />
        <div className="relative grid gap-5">
          <div className="rounded-xl border border-signal-cyan/25 bg-signal-cyan/[0.06] p-4 text-center">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-signal-cyan">Reasoning plane</p>
            <p className="mt-1 text-sm font-semibold">Model proposes an action</p>
            <p className="mt-1 text-[10px] text-white/45">Useful intent, never the security boundary</p>
          </div>
          <ArrowDown className="relative mx-auto h-4 w-4 text-white/35" />
          <div className="relative rounded-2xl border border-signal-green/30 bg-signal-green/[0.05] p-4">
            <p className="mb-4 text-center text-[9px] font-mono uppercase tracking-[0.2em] text-signal-green">Agent control plane</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {governanceNodes.map((node) => (
                <button key={node.id} onClick={() => setSelected(node)} className={`rounded-lg border px-2 py-3 text-[10px] font-mono transition-all hover:-translate-y-0.5 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/35" : "opacity-70"}`}>
                  {node.label}
                </button>
              ))}
            </div>
          </div>
          <ArrowDown className="relative mx-auto h-4 w-4 text-white/35" />
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              ["Execution plane", "Tool gateway"],
              ["External state", "Database · API · message"],
              ["Recovery plane", "Pause · revoke · compensate"],
            ].map(([a, b]) => <div key={a} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"><p className="text-[8px] font-mono uppercase tracking-wider text-white/35">{a}</p><p className="mt-1 text-xs text-white/75">{b}</p></div>)}
          </div>
        </div>
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

const autonomy: Node[] = [
  { id: "0", label: "Generate", eyebrow: "Level 0 · no external action", detail: "Produces analysis or content. Logging and data protection matter, but the user transfers the output." },
  { id: "1", label: "Recommend", eyebrow: "Level 1 · structured influence", detail: "Proposes a decision. Evidence, uncertainty and bias matter even though the system cannot execute it." },
  { id: "2", label: "Prepare", eyebrow: "Level 2 · exact approval", detail: "Constructs an action, but a person approves the precise payload—not an abstract permission to use the agent." },
  { id: "3", label: "Execute", eyebrow: "Level 3 · bounded autonomy", detail: "Performs predefined actions inside enforceable scope, value, time and reversibility limits." },
  { id: "4", label: "Delegate", eyebrow: "Level 4 · authority propagation", detail: "Coordinates agents and budgets. Every child receives only the intersection of inherited and registered capability." },
  { id: "5", label: "Material authority", eyebrow: "Level 5 · consequential action", detail: "Financial, legal, operational or human impact requires exceptional justification, safeguards and sometimes a hard prohibition." },
]

function AutonomyLadder() {
  const [selected, setSelected] = useState(autonomy[3])
  return (
    <DiagramFrame label="Interactive model 02" title="Autonomy is authority, not a personality trait" note="Control intensity rises with impact and irreversibility.">
      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-6 items-end gap-1.5 sm:gap-2">
          {autonomy.map((node, i) => (
            <button key={node.id} onClick={() => setSelected(node)} className="group flex flex-col justify-end" aria-label={`Level ${i}: ${node.label}`}>
              <div style={{ height: `${44 + i * 24}px` }} className={`flex w-full items-end justify-center rounded-t-lg border px-1 pb-2 transition-all ${selected.id === node.id ? "border-signal-green bg-signal-green/20" : "border-white/10 bg-white/[0.035] hover:border-white/25"}`}>
                <span className="text-sm font-mono text-white/80">L{i}</span>
              </div>
              <span className="mt-2 hidden text-[8px] leading-tight text-white/40 sm:block">{node.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-[8px] font-mono uppercase tracking-wider text-white/30"><span>Output</span><span>Consequential authority →</span></div>
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

function DelegationChain() {
  const nodes: Node[] = [
    { id: "principal", label: "Human principal", eyebrow: "Origin", detail: "Creates the purpose, outer budget and maximum authority envelope.", tone: "cyan" },
    { id: "parent", label: "Parent agent", eyebrow: "Delegation 01", detail: "Receives task-bound authority and may pass only a narrower subset.", tone: "green" },
    { id: "child", label: "Child agent", eyebrow: "Delegation 02", detail: "Combines inherited authority with its own registered capabilities and active policy.", tone: "green" },
    { id: "tool", label: "Tool gateway", eyebrow: "Enforcement", detail: "Validates the final capability and records the side effect plus evidence event.", tone: "amber" },
  ]
  const [selected, setSelected] = useState(nodes[1])
  return (
    <DiagramFrame label="Interactive architecture 03" title="Delegation narrows; it never manufactures authority" note="Each handoff creates a new evidence event and a smaller capability envelope.">
      <div className="p-5 sm:overflow-x-auto sm:p-7">
        <div className="mx-auto flex flex-col items-center justify-between sm:min-w-[620px] sm:flex-row">
          {nodes.map((node, i) => (
            <div key={node.id} className="contents">
              <button onClick={() => setSelected(node)} className={`w-full rounded-xl border p-3 text-center transition-transform hover:-translate-y-1 sm:w-28 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-75"}`}>
                <LockKeyhole className="mx-auto h-4 w-4" />
                <span className="mt-2 block text-[10px] font-mono">{node.label}</span>
                <span className="mt-2 block h-1 rounded bg-current" style={{ width: `${100 - i * 20}%`, marginInline: "auto" }} />
              </button>
              {i < nodes.length - 1 && <div className="flex h-12 flex-col items-center justify-center sm:h-auto sm:flex-1 sm:px-2"><div className="h-7 w-px bg-gradient-to-b from-signal-green/70 to-white/15 sm:h-px sm:w-full sm:bg-gradient-to-r" /><p className="mt-1 text-center text-[8px] font-mono text-white/25">subset ∩ policy</p></div>}
            </div>
          ))}
        </div>
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

const entropyDimensions: Node[] = [
  { id: "token", label: "Token", eyebrow: "Local distribution", detail: "Variation in next-token probability. Useful signal, but confidence is not truth.", tone: "cyan" },
  { id: "semantic", label: "Semantic", eyebrow: "Meaning distribution", detail: "Measures whether sampled answers converge on equivalent claims—not whether that claim is correct.", tone: "green" },
  { id: "trajectory", label: "Trajectory", eyebrow: "Execution paths", detail: "Variation in tools, routes, retries, delegation and stopping conditions across equivalent tasks.", tone: "amber" },
  { id: "state", label: "State", eyebrow: "Accumulated context", detail: "Contradiction, duplication, weak provenance and stale conclusions inside memory and working state.", tone: "cyan" },
  { id: "coordination", label: "Coordination", eyebrow: "Interaction graph", detail: "Loops, duplicated work and incompatible evidence between locally rational agents.", tone: "green" },
  { id: "economic", label: "Economic", eyebrow: "Cost distribution", detail: "Operational unpredictability in tokens, tools, retries, review and long-tail outcomes.", tone: "amber" },
]

function EntropyDimensions() {
  const [selected, setSelected] = useState(entropyDimensions[2])
  return (
    <DiagramFrame label="Interactive model 01" title="There is no single entropy score" note="Select a dimension. Collapsing these into one scalar can hide the diagnosis.">
      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_220px] sm:p-7">
        <div className="relative min-h-64 rounded-xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(77,255,172,.1),transparent_58%)]">
          <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {[55, 95, 135].map(r => <circle key={r} cx="250" cy="150" r={r} fill="none" stroke="rgba(255,255,255,.08)" />)}
            {entropyDimensions.map((_, i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2; return <line key={i} x1="250" y1="150" x2={250 + Math.cos(a) * 135} y2={150 + Math.sin(a) * 135} stroke="rgba(255,255,255,.08)" /> })}
            <circle cx="250" cy="150" r="23" fill="rgba(77,255,172,.14)" stroke="rgba(77,255,172,.55)" />
          </svg>
          <div className="relative grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
            {entropyDimensions.map((node) => <button key={node.id} onClick={() => setSelected(node)} className={`rounded-lg border px-2 py-3 text-[9px] font-mono backdrop-blur-sm transition-all hover:-translate-y-0.5 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-70"}`}>{node.label}</button>)}
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-white/[0.025] p-4">
          <Activity className="h-5 w-5 text-signal-green" />
          <p className="mt-4 text-[9px] font-mono uppercase tracking-wider text-white/35">{selected.eyebrow}</p>
          <p className="mt-1 font-semibold text-white">{selected.label} entropy</p>
          <p className="mt-2 text-xs leading-6 text-white/55">{selected.detail}</p>
        </div>
      </div>
    </DiagramFrame>
  )
}

const loopNodes: Node[] = [
  { id: "measure", label: "Measure", eyebrow: "Signal", detail: "Capture defined behavioural, semantic, state, trajectory and economic observations." },
  { id: "diagnose", label: "Diagnose", eyebrow: "Cause", detail: "Determine whether the issue is local, systemic, expected variation or metric failure." },
  { id: "intervene", label: "Intervene", eyebrow: "Bounded policy", detail: "Choose the least expensive action capable of addressing the diagnosed condition." },
  { id: "verify", label: "Verify", eyebrow: "Counterfactual", detail: "Compare outcome, cost and side effects; lower entropy alone does not prove improvement." },
  { id: "record", label: "Record", eyebrow: "Evidence", detail: "Preserve the signal, policy version, intervention, before/after state and accepted outcome." },
]

function ControlLoop() {
  const [selected, setSelected] = useState(loopNodes[0])
  return (
    <DiagramFrame label="Interactive architecture 02" title="Entropic Core is a closed control loop" note="A sensor without diagnosis creates noise; an intervention without verification creates belief.">
      <div className="p-5 sm:overflow-x-auto sm:p-7">
        <div className="mx-auto flex flex-col items-center sm:min-w-[650px] sm:flex-row">
          {loopNodes.map((node, i) => <div key={node.id} className="contents"><button onClick={() => setSelected(node)} className={`w-full rounded-full border px-3 py-4 text-[10px] font-mono transition-all hover:scale-[1.02] sm:w-24 sm:py-6 sm:hover:scale-105 ${selected.id === node.id ? "border-signal-green bg-signal-green/20 text-signal-green ring-1 ring-signal-green/30" : "border-white/15 bg-white/[0.035] text-white/60"}`}>{node.label}</button>{i < loopNodes.length - 1 && <div className="h-6 w-px bg-gradient-to-b from-signal-green/60 to-signal-cyan/20 sm:h-px sm:w-auto sm:flex-1 sm:bg-gradient-to-r" />}</div>)}
        </div>
        <div className="mx-auto mt-4 flex max-w-[650px] items-center justify-center gap-2 text-[8px] font-mono uppercase tracking-[0.18em] text-white/25"><span>accepted outcome</span><span>↺</span><span>new operating state</span></div>
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

function OmegaArchitecture() {
  const nodes: Node[] = [
    { id: "generator", label: "Synthetic generator", eyebrow: "Lab fact", detail: "The mock generator deliberately raises temperature, fatigue and fabricated-claim probability. It is a designed stressor, not evidence of spontaneous model fatigue.", tone: "amber" },
    { id: "monitor", label: "Entropy monitor", eyebrow: "Measured mechanism", detail: "Every generated page is passed to the Entropic Core monitor and appended to an entropy history.", tone: "cyan" },
    { id: "detector", label: "Claim detector", eyebrow: "Experimental mechanism", detail: "A detector flags suspicious claims; its performance is not independently benchmarked by this notebook.", tone: "cyan" },
    { id: "policy", label: "Intervention policy", eyebrow: "Measured mechanism", detail: "Thresholds select stabilisation, grounding or coherence interventions and regenerate under changed conditions.", tone: "green" },
    { id: "checkpoint", label: "Checkpoint + report", eyebrow: "Evidence mechanism", detail: "State is checkpointed every ten pages and before/after entropy plus intervention metadata are recorded.", tone: "green" },
  ]
  const [selected, setSelected] = useState(nodes[0])
  return (
    <DiagramFrame label="Lab-derived architecture 03" title="OMEGA: what the supplied notebook actually executes" note="Architecture reconstructed from entropic_lab.py. The experiment uses synthetic degradation and should be read as control-loop integration evidence.">
      <div className="p-5 sm:p-7">
        <div className="grid gap-2 sm:grid-cols-5">
          {nodes.map((node, i) => <button key={node.id} onClick={() => setSelected(node)} className={`relative rounded-xl border p-3 text-left transition-all hover:-translate-y-1 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/35" : "opacity-75"}`}><span className="text-[8px] font-mono text-current/70">0{i + 1}</span><FlaskConical className="mt-4 h-4 w-4" /><span className="mt-2 block text-[10px] font-semibold leading-tight">{node.label}</span>{i < nodes.length - 1 && <span className="absolute -right-2.5 top-1/2 z-10 hidden text-white/25 sm:block">→</span>}</button>)}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[8px] font-mono uppercase tracking-wider text-white/30"><span className="rounded border border-signal-amber/20 py-2">synthetic input</span><span className="rounded border border-signal-cyan/20 py-2">runtime signal</span><span className="rounded border border-signal-green/20 py-2">recorded response</span></div>
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

const interventionLevels = ["Observe", "Annotate", "Constrain", "Ground", "Verify", "Clarify", "Escalate", "Recover", "Terminate"]

function InterventionLadder() {
  const [level, setLevel] = useState(3)
  const details = [
    "Calibrate in shadow mode without changing execution.", "Attach uncertainty, provenance and missing-evidence warnings.", "Reduce action space, tools, output or delegation.", "Retrieve authoritative evidence and require citations.", "Run validators, rules or independent evaluators.", "Ask the user or upstream system for missing information.", "Route to a stronger model or accountable human reviewer.", "Restore verified state and resume under changed policy.", "Stop when risk, uncertainty or cost exceeds the envelope.",
  ]
  return (
    <DiagramFrame label="Interactive control model 04" title="Use the weakest intervention that can work" note="The ladder avoids turning every anomaly into an expensive escalation.">
      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
          {interventionLevels.map((name, i) => <button key={name} onClick={() => setLevel(i)} className={`rounded-lg border px-1 py-3 transition-all ${level === i ? "border-signal-green bg-signal-green/20 text-signal-green" : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/25"}`}><span className="block text-sm font-mono">{i}</span><span className="mt-1 block text-[8px] leading-tight">{name}</span></button>)}
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4"><ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-signal-green" /><div><p className="text-[9px] font-mono uppercase tracking-wider text-white/35">Level {level} · {interventionLevels[level]}</p><p className="mt-1 text-xs leading-6 text-white/65">{details[level]}</p></div></div>
      </div>
    </DiagramFrame>
  )
}

const intelligenceNodes: Node[] = [
  { id: "registry", label: "Source registry", eyebrow: "Authority boundary", detail: "Defines allowed URLs, source class, claim scope, cadence, extraction strategy and accountable owner.", tone: "cyan" },
  { id: "watch", label: "Change watcher", eyebrow: "Deterministic sensor", detail: "Uses ETag, Last-Modified and content hashes to avoid paying an agent to reread unchanged pages.", tone: "green" },
  { id: "discover", label: "Discovery agent", eyebrow: "Candidate generation", detail: "Release feeds and aggregator catalogues identify possible changes, but cannot directly publish commercial truth.", tone: "amber" },
  { id: "extract", label: "Claim extractor", eyebrow: "Structured evidence", detail: "Produces atomic claims with source fragments, units, scope, effective dates and content hashes.", tone: "cyan" },
  { id: "verify", label: "Truth verifier", eyebrow: "Policy decision", detail: "Compares candidates with first-party evidence, previous accepted state, invariants and conflict rules.", tone: "green" },
  { id: "surface", label: "Surface graph", eyebrow: "Product drift", detail: "Finds stale model names, tier labels and copy even when the underlying numeric claim remains valid.", tone: "amber" },
  { id: "publish", label: "Snapshot publisher", eyebrow: "Controlled release", detail: "Writes an immutable diff, runs tests, deploys a versioned snapshot and retains a rollback pointer.", tone: "green" },
]

function VendorIntelligenceGraph() {
  const [selected, setSelected] = useState(intelligenceNodes[0])
  return (
    <DiagramFrame label="Target operating architecture" title="A daily evidence pipeline, not one browsing agent" note="Select a stage to inspect its control boundary.">
      <div className="p-5 sm:p-7">
        <div className="grid gap-2 sm:grid-cols-4">
          {intelligenceNodes.map((node, index) => (
            <button key={node.id} onClick={() => setSelected(node)} className={`relative rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-72"}`}>
              <span className="text-[8px] font-mono opacity-60">{String(index + 1).padStart(2, "0")}</span>
              {index === 0 ? <Database className="mt-3 h-4 w-4" /> : index === 1 ? <RefreshCw className="mt-3 h-4 w-4" /> : index < 4 ? <Search className="mt-3 h-4 w-4" /> : <ShieldCheck className="mt-3 h-4 w-4" />}
              <span className="mt-2 block text-[10px] font-semibold leading-tight">{node.label}</span>
            </button>
          ))}
          <div className="flex items-center justify-center rounded-xl border border-dashed border-white/10 p-3 text-center text-[9px] font-mono uppercase tracking-wider text-white/30">Daily cron · release event · anomaly · freshness SLA</div>
        </div>
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

const claimStates: Node[] = [
  { id: "discovered", label: "Discovered", eyebrow: "Untrusted signal", detail: "A feed, announcement or aggregator suggests that a fact may have changed.", tone: "amber" },
  { id: "candidate", label: "Candidate", eyebrow: "Extracted claim", detail: "The value is attached to source, unit, scope, effective date and raw evidence fragment.", tone: "cyan" },
  { id: "verified", label: "Verified", eyebrow: "Authority confirmed", detail: "Policy accepts authoritative evidence and invariants for this exact claim scope.", tone: "green" },
  { id: "published", label: "Published", eyebrow: "Versioned snapshot", detail: "The claim enters an immutable release after schema, formula, link and rendering checks.", tone: "green" },
  { id: "stale", label: "Stale / disputed", eyebrow: "Visible uncertainty", detail: "Freshness expired or evidence conflicts. Previous state remains inspectable; publication is narrowed or blocked.", tone: "amber" },
]

function ClaimLifecycle() {
  const [selected, setSelected] = useState(claimStates[2])
  return (
    <DiagramFrame label="Interactive state machine" title="Claims age, conflict and recover" note="Verification is a state with evidence—not a permanent badge.">
      <div className="p-5 sm:p-7">
        <div className="flex flex-col items-center sm:flex-row">
          {claimStates.map((node, index) => <div key={node.id} className="contents"><button onClick={() => setSelected(node)} className={`w-full rounded-xl border px-3 py-4 text-[10px] font-mono transition-all hover:scale-[1.02] sm:w-28 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-70"}`}>{node.label}</button>{index < claimStates.length - 1 && <div className="h-6 w-px bg-gradient-to-b from-signal-cyan/50 to-signal-green/50 sm:h-px sm:w-auto sm:flex-1 sm:bg-gradient-to-r" />}</div>)}
        </div>
        <p className="mt-4 text-center text-[8px] font-mono uppercase tracking-[0.18em] text-white/25">recheck ↺ confirm · supersede · quarantine · rollback</p>
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

function PortabilityContract() {
  const [selected, setSelected] = useState<Node>({ id: "contract", label: "Intent contract", eyebrow: "Application-owned", detail: "Task class, capability requirements, policy, quality floor, budget and fallback are expressed without a provider name.", tone: "green" })
  const nodes: Node[] = [
    { id: "intent", label: "Product intent", eyebrow: "Application", detail: "The product defines the outcome it needs rather than selecting a model directly.", tone: "cyan" },
    { id: "contract", label: "Intent contract", eyebrow: "Application-owned", detail: "Task class, capability requirements, policy, quality floor, budget and fallback are expressed without a provider name.", tone: "green" },
    { id: "evidence", label: "Eligibility", eyebrow: "Evidence intersection", detail: "Current capabilities, policy, availability, quality and economics determine which routes may compete.", tone: "amber" },
    { id: "adapters", label: "Typed adapters", eyebrow: "Explicit translation", detail: "Adapters preserve provider differences, approximations, native extensions and failure semantics.", tone: "cyan" },
    { id: "trace", label: "Observed outcome", eyebrow: "Feedback", detail: "Route, usage, quality, latency and acceptance update future routing evidence.", tone: "green" },
  ]
  return (
    <DiagramFrame label="Runtime architecture" title="Portability is a closed evidence loop" note="The intelligence catalogue informs eligibility; it does not choose the business outcome alone.">
      <div className="grid gap-2 p-5 sm:grid-cols-5 sm:p-7">
        {nodes.map((node, index) => <button key={node.id} onClick={() => setSelected(node)} className={`relative rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-70"}`}><Waypoints className="h-4 w-4" /><span className="mt-3 block text-[10px] font-semibold">{node.label}</span>{index < nodes.length - 1 && <span className="absolute -right-2.5 top-1/2 z-10 hidden text-white/25 sm:block">→</span>}</button>)}
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

const economicsSystems: Node[] = [
  { id: "market", label: "AI Vendor Compare", eyebrow: "Published market data", detail: "Time-stamped list-price claims, capabilities, formulas, assumptions and freshness evidence.", tone: "cyan" },
  { id: "trace", label: "LLMTRACE", eyebrow: "Realised system behaviour", detail: "Route attempts, usage dimensions, latency, retries, failures and attributed cost per trajectory.", tone: "green" },
  { id: "control", label: "Entropic Core", eyebrow: "Runtime control", detail: "Budgets, intervention, checkpointing and safe termination when work exceeds its envelope.", tone: "amber" },
]

function EconomicsSystem() {
  const [selected, setSelected] = useState(economicsSystems[0])
  return (
    <DiagramFrame label="Related-system architecture" title="Market data + runtime truth + budget control" note="These are connected building blocks, not a claim that one integrated FinOps product already exists.">
      <div className="p-5 sm:p-7">
        <div className="grid gap-3 sm:grid-cols-3">
          {economicsSystems.map((node, index) => <button key={node.id} onClick={() => setSelected(node)} className={`rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-75"}`}><span className="text-[8px] font-mono opacity-60">0{index + 1}</span><GitCompareArrows className="mt-5 h-5 w-5" /><span className="mt-3 block text-sm font-semibold">{node.label}</span></button>)}
        </div>
        <div className="mx-auto mt-4 h-8 w-px bg-gradient-to-b from-white/20 to-signal-green/60" />
        <div className="mx-auto max-w-sm rounded-xl border border-signal-green/35 bg-signal-green/10 p-4 text-center"><DollarSign className="mx-auto h-5 w-5 text-signal-green" /><p className="mt-2 text-xs font-semibold text-white">Cost per accepted outcome</p><p className="mt-1 text-[9px] text-white/40">reconciled ledger · quality floor · business margin</p></div>
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

const costLayers: Node[] = [
  { id: "model", label: "Model", eyebrow: "Direct", detail: "Input, cached input, cache write, output, reasoning and media units at the applicable price scope.", tone: "cyan" },
  { id: "tools", label: "Tools + retrieval", eyebrow: "Execution", detail: "Search, code execution, databases, vector stores, external APIs and data transfer.", tone: "cyan" },
  { id: "platform", label: "Platform", eyebrow: "Infrastructure", detail: "Gateways, queues, storage, observability, idle capacity and support systems.", tone: "green" },
  { id: "assurance", label: "Assurance", eyebrow: "Quality and safety", detail: "Evaluation, moderation, red teaming, human review and governance evidence.", tone: "amber" },
  { id: "failure", label: "Failure", eyebrow: "Hidden tail", detail: "Retries, abandonment, compensation, incidents, support and downstream correction.", tone: "amber" },
]

function OutcomeCostStack() {
  const [selected, setSelected] = useState(costLayers[4])
  return (
    <DiagramFrame label="Interactive unit economics" title="The provider invoice is one layer of outcome cost" note="Select a layer to inspect the costs hidden by token-only dashboards.">
      <div className="p-5 sm:p-7">
        <div className="mx-auto max-w-xl space-y-1.5">
          {costLayers.map((node, index) => <button key={node.id} onClick={() => setSelected(node)} style={{ width: `${60 + index * 10}%` }} className={`mx-auto block rounded-lg border px-3 py-2 text-[10px] font-mono transition-all hover:scale-[1.01] ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-72"}`}>{node.label}</button>)}
        </div>
        <p className="mt-4 text-center text-[8px] font-mono uppercase tracking-[0.18em] text-white/25">divide only by verified accepted outcomes</p>
      </div>
      <Detail node={selected} />
    </DiagramFrame>
  )
}

function EligibilityRouter() {
  const nodes = ["Capability", "Policy", "Availability", "Quality floor", "Economic envelope"]
  return (
    <DiagramFrame label="Decision architecture" title="Filter first. Rank second." note="A cheap route that fails the quality or policy floor is ineligible, not efficient.">
      <div className="p-5 sm:p-7">
        <div className="grid gap-2 sm:grid-cols-5">{nodes.map((node, index) => <div key={node} className="relative rounded-xl border border-signal-cyan/25 bg-signal-cyan/[0.06] p-4 text-center"><span className="text-[8px] font-mono text-signal-cyan/60">0{index + 1}</span><p className="mt-2 text-[10px] font-semibold text-white/75">{node}</p>{index < nodes.length - 1 && <span className="absolute -right-2.5 top-1/2 z-10 hidden text-white/25 sm:block">∩</span>}</div>)}</div>
        <ArrowDown className="mx-auto my-4 h-4 w-4 text-signal-green" />
        <div className="grid gap-2 sm:grid-cols-3"><div className="rounded-lg border border-white/10 p-3 text-center text-[10px] text-white/45">Eligible route A</div><div className="rounded-lg border border-signal-green/35 bg-signal-green/10 p-3 text-center text-[10px] text-signal-green">Rank by total outcome objective</div><div className="rounded-lg border border-white/10 p-3 text-center text-[10px] text-white/45">Eligible route B</div></div>
      </div>
    </DiagramFrame>
  )
}

const wrapperNodes: Node[] = [
  { id: "identity", label: "Identity", eyebrow: "Who acts", detail: "Principal, tenant, workload and durable agent identity establish the accountable actor before execution begins.", tone: "cyan" },
  { id: "authority", label: "Authority", eyebrow: "Why it may act", detail: "Purpose-bound capabilities define verbs, resources, budgets, expiry and the complete delegation chain.", tone: "green" },
  { id: "policy", label: "Policy", eyebrow: "Whether it may act now", detail: "A deterministic decision point evaluates task, risk, data class, target state and obligations before the tool attempt.", tone: "amber" },
  { id: "evidence", label: "Evidence", eyebrow: "Why this path", detail: "Versioned sources, reason codes, evaluator outcomes and uncertainty make the trajectory reconstructable without exposing hidden reasoning.", tone: "cyan" },
  { id: "recovery", label: "Recovery", eyebrow: "How control returns", detail: "Pause, revoke, cancel, checkpoint, compensate and resume are first-class runtime operations, not incident improvisation.", tone: "green" },
]

function AgentGovernanceWrapper() {
  const [selected, setSelected] = useState(wrapperNodes[2])
  return <DiagramFrame label="Interactive control plane" title="The wrapper sits between intent and side effect" note="The model proposes. The governed runtime decides and records.">
    <div className="p-5 sm:p-7">
      <div className="rounded-xl border border-signal-cyan/25 bg-signal-cyan/[0.06] p-4 text-center"><p className="text-[9px] font-mono uppercase tracking-wider text-signal-cyan">Intent plane</p><p className="mt-1 text-sm font-semibold">Principal · goal · agent · model</p></div>
      <ArrowDown className="mx-auto my-3 h-4 w-4 text-white/30" />
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-signal-green/30 bg-signal-green/[0.04] p-4 sm:grid-cols-5">{wrapperNodes.map(node => <button key={node.id} onClick={() => setSelected(node)} className={`rounded-xl border px-3 py-4 text-[10px] font-mono transition-all hover:-translate-y-0.5 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-70"}`}>{node.label}</button>)}</div>
      <ArrowDown className="mx-auto my-3 h-4 w-4 text-white/30" />
      <div className="grid gap-2 sm:grid-cols-3">{[["Attempt", "tool gateway"], ["Commit", "external state"], ["Prove", "evidence ledger"]].map(([a,b]) => <div key={a} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"><p className="text-[9px] font-mono text-white/35">{a}</p><p className="mt-1 text-xs text-white/70">{b}</p></div>)}</div>
    </div><Detail node={selected} />
  </DiagramFrame>
}

const evidenceNodes: Node[] = [
  { id: "intent", label: "Declared intent", eyebrow: "Contract", detail: "Accepted goal, principal, purpose, constraints and risk class—not merely a free-form prompt.", tone: "cyan" },
  { id: "context", label: "Observed context", eyebrow: "Versioned inputs", detail: "Evidence references, hashes, classifications and exact state versions available to the run.", tone: "green" },
  { id: "proposal", label: "Proposed action", eyebrow: "Probabilistic", detail: "A plan or tool call remains a proposal until schema, authority and policy checks accept it.", tone: "amber" },
  { id: "control", label: "Control decision", eyebrow: "Deterministic boundary", detail: "Allow, deny, narrow, require approval or stop—with policy version and stable reason code.", tone: "green" },
  { id: "effect", label: "External effect", eyebrow: "World state", detail: "Attempted, accepted, committed, uncertain, verified or compensated are distinct states.", tone: "amber" },
  { id: "outcome", label: "Evaluation + outcome", eyebrow: "Closure", detail: "Quality, business result, human review, budget reconciliation and recovery close the evidence record.", tone: "cyan" },
]

function AgentEvidenceGraph() {
  const [selected, setSelected] = useState(evidenceNodes[3])
  return <DiagramFrame label="Causal evidence graph" title="A trace follows decisions and state transitions" note="Select a node. The trace is complete only when the effect and outcome can be reconciled.">
    <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-7">{evidenceNodes.map((node,index) => <button key={node.id} onClick={() => setSelected(node)} className={`relative rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-72"}`}><span className="text-[8px] font-mono opacity-50">0{index+1}</span><p className="mt-2 text-xs font-semibold">{node.label}</p>{index < evidenceNodes.length - 1 && <span className="absolute -bottom-3 left-1/2 text-white/25 sm:-right-2.5 sm:bottom-auto sm:left-auto sm:top-1/2">→</span>}</button>)}</div><Detail node={selected} />
  </DiagramFrame>
}

function GovernanceControlLoop() {
  const stages = ["Observe", "Diagnose", "Govern", "Intervene", "Prove"]
  const [active, setActive] = useState(2)
  return <DiagramFrame label="Runtime loop" title="Telemetry becomes valuable when it changes execution" note="Intervention should be progressive, reversible where possible and always evidenced.">
    <div className="p-5 sm:p-7"><div className="flex flex-col items-center sm:flex-row">{stages.map((stage,index) => <div key={stage} className="contents"><button onClick={() => setActive(index)} className={`w-full rounded-xl border px-3 py-4 text-[10px] font-mono transition-all sm:w-28 ${index === active ? tone.green + " ring-1 ring-white/40" : "border-white/10 bg-white/[0.03] text-white/50"}`}>{stage}</button>{index < stages.length - 1 && <div className="h-5 w-px bg-white/20 sm:h-px sm:flex-1" />}</div>)}</div><div className="mt-5 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-center"><Activity className="mx-auto h-5 w-5 text-signal-green" /><p className="mt-2 text-xs text-white/75">{["Collect trace, state, budget and evidence signals.","Detect loops, conflicts, drift and uncertain effects.","Evaluate purpose, authority, policy and remaining autonomy.","Warn, narrow, reroute, checkpoint, pause, revoke or compensate.","Close the record with outcome, cost and recovery evidence."][active]}</p></div></div>
  </DiagramFrame>
}

function PortfolioControlPlane() {
  const systems: Node[] = [
    { id:"trace", label:"LLMTRACE", eyebrow:"Trace spine", detail:"Real open-source package and anonymised trace surface for sessions, usage, latency, errors and evaluation.", tone:"cyan" },
    { id:"policy", label:"AI Act Middleware", eyebrow:"Governance surface", detail:"Real public prototype for policy, obligations and audit-oriented control evidence—not automatic compliance.", tone:"green" },
    { id:"intervention", label:"Entropic Core", eyebrow:"Runtime experiment", detail:"Executable exploration of budgets, checkpoints and intervention; synthetic evidence is not production efficacy.", tone:"amber" },
    { id:"evaluation", label:"PsycheOS", eyebrow:"Safety evaluation", detail:"Browser-local evaluation surface; currently a separate system rather than a live LLMTRACE policy engine.", tone:"cyan" },
  ]
  const [selected,setSelected] = useState(systems[0])
  return <DiagramFrame label="Evidence boundary" title="Four real building blocks, one future integration boundary" note="The diagram maps roles without claiming a finished unified enterprise platform."><div className="grid gap-3 p-5 sm:grid-cols-4 sm:p-7">{systems.map(node => <button key={node.id} onClick={() => setSelected(node)} className={`rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 ${tone[node.tone ?? "green"]} ${selected.id === node.id ? "ring-1 ring-white/40" : "opacity-70"}`}><ShieldCheck className="h-5 w-5"/><p className="mt-4 text-xs font-semibold">{node.label}</p></button>)}</div><Detail node={selected}/></DiagramFrame>
}

function EvidenceLadder() {
  const stages = ["Idea", "Architecture", "Prototype", "Reproducible", "Adopted", "Durable value"]
  const [active,setActive] = useState(3)
  return <DiagramFrame label="Evidence maturity" title="Claims earn stronger language one rung at a time" note="A project can be valuable at any rung. The label must match the proof."><div className="p-5 sm:p-7"><div className="mx-auto flex max-w-xl flex-col-reverse gap-1">{stages.map((stage,index)=><button key={stage} onClick={()=>setActive(index)} style={{width:`${55+index*9}%`}} className={`mx-auto rounded-lg border px-3 py-2 text-[10px] font-mono transition-all ${index===active ? tone.green+" ring-1 ring-white/40" : "border-white/10 bg-white/[0.025] text-white/45"}`}>{index+1}. {stage}</button>)}</div><p className="mt-4 text-center text-xs text-white/60">{["A possibility, not a capability.","A design claim with explicit boundaries.","Executable under stated conditions.","Someone else can obtain the expected result.","Used without the builder present.","Measurable value maintained over time."][active]}</p></div></DiagramFrame>
}

function PortfolioControlPlaneDiagram() {
  const pairs = [["Project","Registered asset"],["Claim","Capability declaration"],["Preview","Evidence class"],["Changelog","Audit trail"],["Archive","Lifecycle decision"]]
  return <DiagramFrame label="Portfolio governance" title="The portfolio itself needed a control plane" note="Public meaning must be versioned, evidenced and retired when it stops being true."><div className="grid gap-2 p-5 sm:grid-cols-5 sm:p-7">{pairs.map(([a,b],index)=><div key={a} className="rounded-xl border border-signal-cyan/25 bg-signal-cyan/[0.05] p-4 text-center"><span className="text-[8px] font-mono text-signal-cyan/50">0{index+1}</span><p className="mt-2 text-xs font-semibold text-white">{a}</p><p className="mt-1 text-[9px] text-white/40">{b}</p></div>)}</div></DiagramFrame>
}

function ClaimExperimentLoop() {
  const steps = ["Wild intuition","Executable metaphor","Synthetic experiment","Testable hypothesis","Controlled benchmark","Production evidence"]
  return <DiagramFrame label="Claim calibration" title="Downgrade the claim. Upgrade the experiment." note="Code can prove implementation; only the right experiment can support the wider claim."><div className="p-5 sm:p-7"><div className="grid gap-2 sm:grid-cols-3">{steps.map((step,index)=><div key={step} className={`relative rounded-xl border p-4 text-center ${index<2?tone.amber:index<4?tone.cyan:tone.green}`}><p className="text-[8px] font-mono opacity-50">0{index+1}</p><p className="mt-2 text-[10px] font-semibold">{step}</p></div>)}</div></div></DiagramFrame>
}

function PublicEvidenceLifecycle() {
  const stages: Node[] = [
    {id:"classify",label:"Classify",eyebrow:"Before",detail:"Define what exists, data state, live execution, claim, proof, boundary and owner.",tone:"cyan"},
    {id:"publish",label:"Publish",eyebrow:"Release",detail:"Attach preview label, direct proof path, version, verification date, limitation and expected output.",tone:"green"},
    {id:"observe",label:"Observe",eyebrow:"Feedback",detail:"Collect failed runs, misunderstandings, objections and reproduction evidence—not applause alone.",tone:"amber"},
    {id:"govern",label:"Revise or retire",eyebrow:"Lifecycle",detail:"Upgrade, narrow, archive or revoke the claim as evidence and maintenance state change.",tone:"green"},
  ]
  const [selected,setSelected]=useState(stages[0])
  return <DiagramFrame label="Public evidence lifecycle" title="The record must be able to disagree with the builder" note="Publication is a governed loop, not a launch event."><div className="flex flex-col items-center gap-2 p-5 sm:flex-row sm:p-7">{stages.map((node,index)=><div key={node.id} className="contents"><button onClick={()=>setSelected(node)} className={`w-full rounded-xl border p-4 text-[10px] font-mono ${tone[node.tone??"green"]} ${selected.id===node.id?"ring-1 ring-white/40":"opacity-70"}`}>{node.label}</button>{index<stages.length-1&&<span className="text-white/25">→</span>}</div>)}</div><Detail node={selected}/></DiagramFrame>
}

function SituationGraph() {
  const controls = ["Work","Authority","State","Budget","Evidence"]
  return <DiagramFrame label="Orchestration model" title="The situation graph is the enduring product" note="Agents are replaceable execution units; control semantics must survive model and framework changes."><div className="p-5 sm:p-7"><div className="grid gap-2 sm:grid-cols-5">{controls.map((c,index)=><div key={c} className="rounded-xl border border-signal-green/30 bg-signal-green/[0.06] p-4 text-center"><Waypoints className="mx-auto h-4 w-4 text-signal-green"/><p className="mt-2 text-xs font-semibold text-white">{c}</p><p className="mt-1 text-[8px] font-mono text-white/35">graph contract 0{index+1}</p></div>)}</div><ArrowDown className="mx-auto my-4 h-4 w-4 text-white/30"/><div className="rounded-xl border border-white/10 bg-white/[0.025] p-4 text-center text-xs text-white/60">planner · worker · evaluator · human · deterministic service</div></div></DiagramFrame>
}

function HybridTopology() {
  const nodes: Node[]=[
    {id:"deterministic",label:"Deterministic spine",eyebrow:"Default",detail:"Known transitions, validation, policy, budgets and side effects remain explicit code.",tone:"green"},
    {id:"router",label:"Router",eyebrow:"Selective autonomy",detail:"Classification chooses a bounded specialist path when intent classes differ materially.",tone:"cyan"},
    {id:"parallel",label:"Parallel workers",eyebrow:"Independent breadth",detail:"Fan-out only where work can be isolated and unique evidence justifies coordination cost.",tone:"amber"},
    {id:"evaluator",label:"Evaluator gate",eyebrow:"Independent check",detail:"Deterministic and probabilistic checks accept, revise, escalate or stop the result.",tone:"green"},
  ]
  const [selected,setSelected]=useState(nodes[0])
  return <DiagramFrame label="Production topology" title="Hybrid usually beats theatrical multi-agent complexity" note="Autonomy is inserted only where it creates measured lift."><div className="grid gap-3 p-5 sm:grid-cols-4 sm:p-7">{nodes.map(n=><button key={n.id} onClick={()=>setSelected(n)} className={`rounded-xl border p-4 text-left ${tone[n.tone??"green"]} ${selected.id===n.id?"ring-1 ring-white/40":"opacity-70"}`}><GitCompareArrows className="h-4 w-4"/><p className="mt-3 text-xs font-semibold">{n.label}</p></button>)}</div><Detail node={selected}/></DiagramFrame>
}

const safetyCaseNodes: Node[] = [
  { id: "purpose", label: "Intended purpose", eyebrow: "System boundary", detail: "Users, affected people, environment, data, authority, consequences and prohibited uses define what safe means here.", tone: "cyan" },
  { id: "hazards", label: "Hazard model", eyebrow: "Foreseeable failure", detail: "Accidental failure, adversarial misuse, human factors, propagation and reversibility are expressed as concrete scenarios.", tone: "amber" },
  { id: "controls", label: "Controls", eyebrow: "Prevention + containment", detail: "Least privilege, isolation, policy, validation, approval, budgets and recovery address named hazards.", tone: "green" },
  { id: "evidence", label: "Evidence", eyebrow: "Tested claim", detail: "Evaluations, red-team runs, traces, guardrail calibration and incident exercises support—or contradict—the safety argument.", tone: "cyan" },
  { id: "residual", label: "Residual risk", eyebrow: "Governed decision", detail: "Known gaps, excluded uses, monitoring, owner, approval and rollback remain explicit after controls are applied.", tone: "amber" },
]

function SafetyCaseDiagram() {
  const [selected,setSelected]=useState(safetyCaseNodes[1])
  return <DiagramFrame label="Assurance argument" title="A safety case is a claim supported by evidence" note="It does not promise zero failure; it makes purpose, hazards, controls and residual risk inspectable."><div className="flex flex-col items-center p-5 sm:flex-row sm:p-7">{safetyCaseNodes.map((node,index)=><div key={node.id} className="contents"><button onClick={()=>setSelected(node)} className={`w-full rounded-xl border px-3 py-4 text-[10px] font-mono transition-all hover:-translate-y-0.5 sm:w-28 ${tone[node.tone??"green"]} ${selected.id===node.id?"ring-1 ring-white/40":"opacity-70"}`}>{node.label}</button>{index<safetyCaseNodes.length-1&&<div className="h-5 w-px bg-white/20 sm:h-px sm:flex-1"/>}</div>)}</div><Detail node={selected}/></DiagramFrame>
}

function GuardrailStack() {
  const layers: Node[] = [
    {id:"input",label:"Input",eyebrow:"Before context",detail:"Detect obvious abuse, malicious files, unsupported formats and sensitive data without assuming intent is always visible.",tone:"cyan"},
    {id:"context",label:"Context",eyebrow:"Trust boundary",detail:"Keep instruction, evidence, untrusted content, memory provenance and data classification structurally distinct.",tone:"green"},
    {id:"output",label:"Output",eyebrow:"Generated artefact",detail:"Validate schema, claims, sensitive content and forbidden commitments—but remember unsafe actions may already have occurred.",tone:"amber"},
    {id:"runtime",label:"Runtime policy",eyebrow:"Execution path",detail:"Evaluate identity, task, authority, budget, state and proposed action before consequential execution.",tone:"green"},
    {id:"tool",label:"Tool gateway",eyebrow:"Side-effect boundary",detail:"Expose narrow capabilities with validation, idempotency, approval, quotas and short-lived credentials.",tone:"cyan"},
    {id:"post",label:"Post-action",eyebrow:"Verify + recover",detail:"Read back effects, reconcile partial commits, monitor anomalies and compensate where prevention failed.",tone:"amber"},
  ]
  const [selected,setSelected]=useState(layers[3])
  return <DiagramFrame label="Defence stack" title="No single guardrail sees the whole risk" note="Select a layer. Safety emerges from independent controls around state transitions."><div className="p-5 sm:p-7"><div className="mx-auto max-w-xl space-y-1.5">{layers.map((node,index)=><button key={node.id} onClick={()=>setSelected(node)} style={{width:`${62+index*7}%`}} className={`mx-auto block rounded-lg border px-3 py-2 text-[10px] font-mono transition-all ${tone[node.tone??"green"]} ${selected.id===node.id?"ring-1 ring-white/40":"opacity-70"}`}>{node.label}</button>)}</div></div><Detail node={selected}/></DiagramFrame>
}

function BehaviouralWindTunnel() {
  const pressures: Node[] = [
    {id:"baseline",label:"Baseline",eyebrow:"Control",detail:"Pinned model, policy, tools and clean scenario establish expected behaviour.",tone:"green"},
    {id:"authority",label:"Authority pressure",eyebrow:"Social attack",detail:"An apparent executive requests an exception beyond the authorised instruction hierarchy.",tone:"cyan"},
    {id:"conflict",label:"Instruction conflict",eyebrow:"Goal integrity",detail:"Untrusted content competes with the declared objective and attempts to redirect tools.",tone:"amber"},
    {id:"long",label:"Long horizon",eyebrow:"Boundary erosion",detail:"Repeated turns test whether refusals, uncertainty and authority boundaries decay over time.",tone:"cyan"},
    {id:"tools",label:"Tool opportunity",eyebrow:"Consequential state",detail:"The scenario exposes bounded tools so evaluation can distinguish harmful text from attempted action.",tone:"amber"},
    {id:"regression",label:"Regression",eyebrow:"Maintained evidence",detail:"A material finding becomes a versioned test for the mitigation, not a one-off jailbreak screenshot.",tone:"green"},
  ]
  const [selected,setSelected]=useState(pressures[2])
  return <DiagramFrame label="PsycheOS model" title="A behavioural wind tunnel tests pressure, not personality" note="The scenario is primary; scores are contextual observations, not psychological facts."><div className="grid gap-2 p-5 sm:grid-cols-3 sm:p-7">{pressures.map((node,index)=><button key={node.id} onClick={()=>setSelected(node)} className={`rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${tone[node.tone??"green"]} ${selected.id===node.id?"ring-1 ring-white/40":"opacity-70"}`}><span className="text-[8px] font-mono opacity-50">PRESSURE 0{index+1}</span><p className="mt-2 text-xs font-semibold">{node.label}</p></button>)}</div><Detail node={selected}/></DiagramFrame>
}

function ProductionSafetyArchitecture() {
  const layers=["Purpose + hazards","Evaluation + red team","Model + prompt","Context + memory","Runtime policy","Tool gateway","Monitoring + recovery","Evidence + governance"]
  const [active,setActive]=useState(4)
  const details=["Define intended and prohibited use, affected parties, authority and residual risk.","PsycheOS-style scenarios and regressions pressure the actual behavioural contract.","Version model behaviour, instruction hierarchy and application policy.","Preserve provenance, trust, classification, freshness and write controls.","Identity, authority, budgets and policy decide whether the proposed action may proceed.","Narrow tools validate, approve, execute and verify consequential effects.","LLMTRACE-style traces support detection; checkpoints, revocation and compensation restore control.","AI Act Middleware-style records connect controls and obligations without claiming automatic compliance."]
  return <DiagramFrame label="Production architecture" title="Safety is a vertical control system" note="The highlighted layer explains its role; no moderation endpoint can replace the stack."><div className="p-5 sm:p-7"><div className="grid gap-1.5 sm:grid-cols-2">{layers.map((layer,index)=><button key={layer} onClick={()=>setActive(index)} className={`rounded-lg border px-4 py-3 text-left text-[10px] font-mono transition-all ${index===active?tone.green+" ring-1 ring-white/40":"border-white/10 bg-white/[0.025] text-white/50"}`}><span className="mr-2 text-[8px] opacity-40">0{index+1}</span>{layer}</button>)}</div><div className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-center"><ShieldCheck className="mx-auto h-5 w-5 text-signal-green"/><p className="mt-2 text-xs leading-6 text-white/65">{details[active]}</p></div></div></DiagramFrame>
}

function SafetyStateTransition() {
  const states: Node[]=[
    {id:"before",label:"Before",eyebrow:"Verified state",detail:"Refund not issued; identity, purchase and destination versions are known.",tone:"cyan"},
    {id:"proposed",label:"Proposed",eyebrow:"Model output",detail:"The agent proposes a €150 refund. This is not yet authority or execution.",tone:"amber"},
    {id:"conditions",label:"Conditions",eyebrow:"Runtime policy",detail:"Identity verified, purchase eligible, destination unchanged and required approval present.",tone:"green"},
    {id:"commit",label:"Commit",eyebrow:"Bounded action",detail:"A narrow capability executes with idempotency and a known expected effect.",tone:"amber"},
    {id:"after",label:"After",eyebrow:"Evidence",detail:"The effect is verified, budget reconciled and policy, approval and outcome recorded.",tone:"green"},
  ]
  const [selected,setSelected]=useState(states[2])
  return <DiagramFrame label="Safety invariant" title="Invalid transitions are blocked; valid transitions remain possible" note="Production safety ultimately controls how probabilistic proposals may change real state."><div className="flex flex-col items-center p-5 sm:flex-row sm:p-7">{states.map((node,index)=><div key={node.id} className="contents"><button onClick={()=>setSelected(node)} className={`w-full rounded-xl border p-4 text-[10px] font-mono ${tone[node.tone??"green"]} ${selected.id===node.id?"ring-1 ring-white/40":"opacity-70"}`}>{node.label}</button>{index<states.length-1&&<span className="p-1 text-white/25">→</span>}</div>)}</div><Detail node={selected}/></DiagramFrame>
}

export function ArticleDiagram({ headingId, articleSlug }: DiagramProps) {
  if (articleSlug === "governing-agentic-systems") {
    if (headingId === "governance-is-a-control-plane") return <GovernanceControlPlane />
    if (headingId === "a-practical-autonomy-model") return <AutonomyLadder />
    if (headingId === "delegation-must-preserve-the-authority-chain") return <DelegationChain />
  }
  if (articleSlug === "entropy-problem-llms") {
    if (headingId === "there-is-no-single-entropy-of-an-llm-system") return <EntropyDimensions />
    if (headingId === "the-entropic-core-hypothesis") return <ControlLoop />
    if (headingId === "the-omega-experiment") return <OmegaArchitecture />
    if (headingId === "the-intervention-ladder") return <InterventionLadder />
  }
  if (articleSlug === "avoiding-vendor-lock-in") {
    if (headingId === "the-daily-vendor-intelligence-graph") return <VendorIntelligenceGraph />
    if (headingId === "the-claim-lifecycle") return <ClaimLifecycle />
    if (headingId === "from-vendor-intelligence-to-runtime-portability") return <PortabilityContract />
  }
  if (articleSlug === "ai-platform-economics") {
    if (headingId === "ai-vendor-compare-is-the-market-data-layer") return <EconomicsSystem />
    if (headingId === "the-economic-unit-is-an-accepted-outcome") return <OutcomeCostStack />
    if (headingId === "the-quality-floor-comes-before-the-price-ranking") return <EligibilityRouter />
  }
  if (articleSlug === "observability-agentic-systems") {
    if (headingId === "what-a-governance-wrapper-actually-wraps") return <AgentGovernanceWrapper />
    if (headingId === "the-complete-agent-evidence-graph") return <AgentEvidenceGraph />
    if (headingId === "the-control-loop-observe-diagnose-govern-intervene-prove") return <GovernanceControlLoop />
    if (headingId === "how-the-existing-systems-map-to-the-control-plane") return <PortfolioControlPlane />
  }
  if (articleSlug === "building-in-public") {
    if (headingId === "the-evidence-ladder") return <EvidenceLadder />
    if (headingId === "my-portfolio-needed-a-control-plane") return <PortfolioControlPlaneDiagram />
    if (headingId === "downgrade-the-claim-upgrade-the-experiment") return <ClaimExperimentLoop />
    if (headingId === "a-public-evidence-lifecycle") return <PublicEvidenceLifecycle />
  }
  if (articleSlug === "orchestration-patterns") {
    if (headingId === "the-situation-graph-is-the-product") return <SituationGraph />
    if (headingId === "the-production-default-is-usually-hybrid") return <HybridTopology />
  }
  if (articleSlug === "safety-alignment-systems") {
    if (headingId === "the-safety-case") return <SafetyCaseDiagram />
    if (headingId === "guardrails-are-a-stack") return <GuardrailStack />
    if (headingId === "psycheos-pressure-testing-model-behaviour") return <BehaviouralWindTunnel />
    if (headingId === "a-production-safety-architecture") return <ProductionSafetyArchitecture />
    if (headingId === "safety-as-control-over-state-transitions") return <SafetyStateTransition />
  }
  return null
}
