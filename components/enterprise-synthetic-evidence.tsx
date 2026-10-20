type Stage = { id: string; title: string; decision: string; output: string; sample: string }
type Variant = "cybersecurity" | "modernization"

const cases: Record<Variant, { eyebrow: string; title: string; premise: string; stages: Stage[]; meaning: string }> = {
  cybersecurity: {
    eyebrow: "SYNTHETIC / Agent-assisted engineering / Example only",
    title: "What a reviewable agent change looks like",
    premise: "Fictional commerce codebase and a fictional order-retry feature. This demonstrates the engineering control pattern, not a client's repository, tickets, actual PRs or measured test output.",
    stages: [
      {
        id: "01", title: "Context before execution",
        decision: "Bind a task to repository conventions, policy and the definition of a valid change.",
        output: "Scoped task packet",
        sample: `TASK: add a retry-limit guard\nDOMAIN: demo/order-api\nCONTEXT: conventions.md + retry-policy.yaml\nTOOLS: read repo, propose patch\nWRITE: PR-only; no direct merge`
      },
      {
        id: "02", title: "Specification and roles",
        decision: "Make acceptance testable and divide responsibilities between specialist roles.",
        output: "Spec + explicit acceptance conditions",
        sample: `GIVEN retryCount exceeds configured limit\nWHEN a request is processed\nTHEN return a typed rejection\nAND preserve a traceable reason\nACCEPT: no silent retries; no secret logging`
      },
      {
        id: "03", title: "Reviewable agent proposal",
        decision: "Treat agent output as a candidate engineering change instead of autonomous acceptance.",
        output: "Illustrative PR package",
        sample: `PR / example-only\nFILES: RetryGuard.ts, retry.spec.ts\nRATIONALE: rejection belongs at API boundary\nEVIDENCE: diff + test plan + trace links\nSTATE: awaiting human review`
      },
      {
        id: "04", title: "Three quality gates",
        decision: "Use readiness, completion and adversarial review as independent questions.",
        output: "Human-owned acceptance decision",
        sample: `DoR  : scope + policy + testable contract\nDoD  : implementation + test evidence\nREVIEW: probe missing edge cases + risks\nOWNER : engineer accepts or requests changes\nRESULT: no automatic approval`
      },
    ],
    meaning: "The value is not the sample change itself. It is the repeatable path from unfamiliar context to a proposed, inspected and owned engineering outcome.",
  },
  modernization: {
    eyebrow: "SYNTHETIC / Legacy-to-target transformation / Example only",
    title: "A miniature source-to-evidence factory",
    premise: "Fictional Java application and fictional account domain. Source symbols, identifiers and output contracts below are invented solely to explain the modernization mechanism.",
    stages: [
      {
        id: "01", title: "Observe the legacy corpus",
        decision: "Extract source facts and control flow before treating a file as independent.",
        output: "Source-linked observations",
        sample: `legacy/demo/AccountPolicy.java\n  AccountController -> AccountPolicy\n  AccountPolicy -> CustomerRepository\n  status ACTIVE -> allow eligibility check\n  source: lines 31–47 (fictional)`
      },
      {
        id: "02", title: "Normalize into an IR",
        decision: "Represent relationships and behavior in one canonical model, annotated with provenance.",
        output: "Canonical intermediate representation",
        sample: `entity: Account\noperation: checkEligibility\ndependsOn: CustomerRepository.lookup\nconstraint: status == ACTIVE\norigin: demo/AccountPolicy.java#L31-L47\nconfidence: requires verification`
      },
      {
        id: "03", title: "Generate target candidates",
        decision: "Generate contracts and candidate code from the IR rather than translating arbitrary snippets.",
        output: "Versionable target artifacts",
        sample: `target/account/eligibility.contract.ts\ninput: AccountId\noutput: EligibilityResult\nrule: read status before decision\ntrace: IR/checkEligibility\nstatus: candidate, not parity-certified`
      },
      {
        id: "04", title: "Check reproducibility separately",
        decision: "Separate deterministic output, provenance coverage and functional parity tests.",
        output: "Three distinct verification questions",
        sample: `REPEATABLE: does same input reproduce artifacts?\nTRACEABLE : can each rule cite source origin?\nEQUIVALENT: does target preserve legacy behavior?\n\nOnly verified checks can be marked passed.\nA repeatable generator does not prove parity.`
      },
    ],
    meaning: "The architectural gain is an inspectable transformation chain. Full-system parity, migration completion and production readiness require separate tests outside this illustrative example.",
  },
}

export function EnterpriseSyntheticEvidence({ variant }: { variant: Variant }) {
  const model = cases[variant]
  return (
    <section aria-labelledby={`synthetic-${variant}-heading`} className="space-y-7">
      <div className="max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#587f00] dark:text-signal-green">{model.eyebrow}</p>
        <h2 id={`synthetic-${variant}-heading`} className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{model.title}</h2>
        <p className="mt-4 text-sm leading-8 text-muted-foreground">{model.premise}</p>
      </div>
      <ol className="grid gap-3 lg:grid-cols-4">
        {model.stages.map(stage => (
          <li key={stage.id} className="flex flex-col rounded-xl border border-border bg-card p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-[#587f00] dark:text-signal-green">{stage.id} / {stage.output}</p>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{stage.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground">{stage.decision}</p>
            <details className="mt-5 rounded-md border border-border bg-background">
              <summary className="cursor-pointer px-3 py-3 text-sm font-semibold text-foreground hover:text-[#587f00] dark:hover:text-signal-green">
                Inspect synthetic artifact
              </summary>
              <pre className="overflow-x-auto border-t border-border p-3 font-mono text-xs leading-6 text-foreground"><code>{stage.sample}</code></pre>
            </details>
          </li>
        ))}
      </ol>
      <div className="rounded-xl border border-border bg-secondary/30 p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">Why the mechanism matters</p>
        <p className="mt-3 text-sm leading-8 text-foreground">{model.meaning}</p>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          All snippets, filenames, sample decisions and identifiers in this demonstration are synthetic.
          They are not customer screenshots, measured runtime telemetry or proof of production deployment.
        </p>
      </div>
    </section>
  )
}
