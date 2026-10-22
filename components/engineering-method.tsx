"use client"

import { useState } from "react"

const steps = [
  {
    label: "01 / Specify",
    title: "Turn a brief into a testable contract",
    system: "Alejandría · internal accelerator",
    detail: "A structured specification becomes a delivery pack with requirement IDs, architecture decisions, tests, a manifest and an agent ledger. The verifier checks hashes and relationships between those artifacts.",
    evidence: "50 requirements in the reference case · 22 verifier checks · 12/12 core tests reproduced in the private audit",
    boundary: "Local deterministic reference pipeline. The document generators in the core do not invoke an LLM; no client acceptance is implied.",
  },
  {
    label: "02 / Understand",
    title: "Find the source before proposing the change",
    system: "Engineering Context · internal assessment prototype",
    detail: "Index structure, symbols and service relationships once; expose focused context to coding agents through an MCP interface. Keep the provider replaceable and the source relationship inspectable.",
    evidence: "135/135 local tests reproduced · 10 MCP tools documented · a narrow benchmark of ten questions",
    boundary: "The reported 90.5% reduction uses a heuristic token estimate and one reference repository. It is not a measured improvement in task correctness.",
  },
  {
    label: "03 / Build",
    title: "Generate candidate artifacts from a canonical model",
    system: "Factoría · bounded banking modernization PoC",
    detail: "Recover a source-linked intermediate representation, run deterministic generators, and preserve provenance in a registry. AI-assisted work built the factory; the measured factory runs were deterministic.",
    evidence: "23,811 total registry records; 22,995 include file, line and SHA-256 · 4,338 files compared across two runs",
    boundary: "The audit reports 91 modeled capabilities, 7 implemented, 6 exercised and 0 functionally compared. Repeatability is not functional parity or a completed migration.",
  },
  {
    label: "04 / Gate",
    title: "Make the release decision explicit",
    system: "AgentCycle → SDD Kit · related methods, separate implementations",
    detail: "Inspect traces against a contract, return actionable evidence and refuse completion when checks fail. Later, the OpenSpec-based SDD Kit formalized readiness, done and adversarial review at a change boundary.",
    evidence: "AgentCycle scored its own factory 7/100 and blocked delivery · SDD Kit lost three blind comparisons and revised its gates",
    boundary: "The systems share a method, not a common deployed runtime. A hook does not cryptographically establish who approved a decision.",
  },
  {
    label: "05 / Approve",
    title: "Put human authority around agent action",
    system: "KMM governance layer · internal product candidate",
    detail: "Policy checks, human approvals bound to a request hash, expiry and role, and a chained ledger express who may act and why. This is a deeper runtime experiment alongside the lighter SDD gates.",
    evidence: "133 tests in a stored verification record; the private audit reproduced 118 passes and 9 failures without the optional cryptography dependency",
    boundary: "Self-verification is not an independent security assessment. KMM, Engineering Context and Codex Loop have no verified end-to-end integration.",
  },
] as const

export function EngineeringMethod() {
  const [selected, setSelected] = useState(0)
  const current = steps[selected]

  return <div className="mt-8 grid gap-5 lg:grid-cols-[17rem_1fr]">
    <div role="group" aria-label="Engineering method stages" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
      {steps.map((step, index) => <button key={step.label} type="button" aria-pressed={selected === index} aria-controls="method-panel" onClick={() => setSelected(index)} className={`min-w-max rounded-lg border px-4 py-3 text-left font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:min-w-0 ${selected === index ? "border-[#5b8f00] bg-[#90d900]/15 text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`}>{step.label}</button>)}
    </div>
    <div id="method-panel" aria-live="polite" className="rounded-xl border border-border bg-card/60 p-6 md:p-9" tabIndex={0}>
      <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">{current.system}</p>
      <h3 className="mt-4 max-w-2xl text-2xl font-bold md:text-3xl">{current.title}</h3>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{current.detail}</p>
      <div className="mt-8 grid gap-4 border-t border-border pt-6 md:grid-cols-2">
        <div><p className="font-mono text-xs uppercase tracking-widest text-foreground">What the records support</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{current.evidence}</p></div>
        <div><p className="font-mono text-xs uppercase tracking-widest text-foreground">Proof boundary</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{current.boundary}</p></div>
      </div>
    </div>
  </div>
}
