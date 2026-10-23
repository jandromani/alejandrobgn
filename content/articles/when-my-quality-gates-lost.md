# My method lost two scored comparisons. Here is what I changed.

In September 2026, I used a local copy of the public Documenso repository to compare plans for a change. One agent used the specification-driven delivery kit I developed with colleagues at knowmad mood’s AI Center of Excellence; another worked without it. AI-agent judges assessed the plans against the code. Each judge saw one plan, but the method’s vocabulary was partly visible, so the blinding was limited. The kit’s plan lost both scored comparisons: **23/40 against 28/40** and **26/40 against 28/40**. The scores are a useful negative result, not a general performance estimate.

This work grew out of my role in the AI CoE. I led substantial work on an OpenSpec-based SDD Kit that ties a change to its specification, implementation, human judgement and archive decision. The comparison exposed a weak point: a gate could read the specification carefully and still miss a defect in the code. The kit and its internal experiment are company work, with contributions from colleagues.

## The failure that made the method better

In a separate August test project, I seeded five specification defects. The standard validator caught one; after that defect was fixed, it reported **“1 passed, 0 failed”** with four still present. The kit’s entry gate marked those four as blockers and returned **NOT READY**. This is a historical test record; the original seeded change is not retained for a fresh reproduction.

The AI-agent judges found weaknesses in both plans and did not recommend building either as submitted. The kit’s output was weaker in the two recorded score comparisons. I treated the negative result as an input to engineering: compare the findings to the code, update the review instructions and test the next iteration. The original experiment branches are not currently available to rerun.

The experiment led to **seven internal pull requests** in the kit. Separately, October audits expanded the archive hook’s test battery from 38 to 225 cases. These are process changes inside the AI CoE, not measured productivity gains or independent client validation. The uncomfortable scores prompted a closer inspection of what our checks actually covered.

## How the method evolved

The SDD Kit is the compact expression of a longer line of engineering work. In separate internal projects, I first used a canonical brief with numbered requirements and deterministic checks, then a modernization factory with release gates and a source-linked evidence registry, and then a governance cycle willing to block its own delivery when evidence was weak. Those were distinct systems, built in different contexts; they are not one integrated product or codebase. Their shared rule is simple: a generated result is not a completed change until a person can inspect the specification, the work and the decision record.

The factory case records **23,811 evidence entries**, of which **22,995** link a file, line and hash together. That distinction matters more than quoting the larger number alone. The AgentCycle prototype rated an earlier Factoría **7/100 and blocked delivery**; another self-audit of that factory gave a conflicting score. These records document the checks and the willingness to stop; they do not establish client business impact or independent adoption of the later SDD Kit. The [anonymized modernization case](/work/banking-modernization) explains the factory's scope and limitations.

## Three gates and a recorded human decision

The kit follows a change from **Ready** through implementation to **Done** and **Archive**. Ready asks whether the change has enough context to start. Done asks for a person’s review of implementation against intended behavior and evidence. Archive records the final verdict. A signature is requested and recorded; the hook does not verify the signer’s identity or enforce that a person actually signed.

I hardened the source archive hook through **38 → 109 → 128 → 225 simulated shell cases**; all 225 passed in `bash` and `dash` when rerun on a copy on 22 October. Four small agent-made sample changes reached Archive with their test suites green and stand-in signers. The internally distributed package still pointed to an earlier hook at the time of audit. These results demonstrate the tested source behavior, not a live end-to-end session with a person, full command coverage or enforced approval.

## How I actually work with agents

My private session log for a **14-day active window between 29 September and 21 October 2026** records **129 delegated agent tasks**, **36 pull requests across five repositories**, and **16 evidence-backed closures** in a focused delivery day. The log also records follow-ups and stopped tasks. Those counts describe directed work across personal and professional contexts; they are not equivalent to 129 autonomous employees or 36 accepted production changes.

I use parallelism to explore and verify: define a narrow task, assign a source of truth, ask for an artifact, review the result, and stop or redirect when the evidence does not hold. The report's task coding puts about **60%** of those assignments into rehearsal, audit or independent judging rather than initial production. The point of directing many agents is to create more opportunities to find faults before anyone relies on the output.

One delivery rehearsal before a release planned for more than 300 people used **30 agent assignments across six waves** to inspect links, content and blocking issues. The log records **2,333 links inspected** and **12 blocking issues** over two days. These are counts of the audit workflow, not proof of attendee outcomes. I also turned a repeatable, GPU-free video production workflow into a kit and guide, yielding four videos, including one for a personal channel, over two days. That is the same habit at a smaller scale: turn an improvised workflow into an artifact another person can run.

## Evidence is something I build, not a slide at the end

For a separate internal center-of-excellence effort, I made a dated evidence ledger with **17 tabulated records**. The record format ties assets to decisions and review notes. An audit I commissioned from four AI subagents reported **138 findings, including 12 blocking findings**, and forced corrections to earlier claims. That was an internal agent review, not an external professional audit. That was uncomfortable and useful. It made the boundary between what we built, what someone else checked and what a buyer could rely on much sharper.

The same standard applies to credit. I designed the SDD Kit, development and documentation knowledge bases, the ledger and a distributable video workflow. I audited and documented a colleague's asset vault; I do not present that vault as code I authored. A method gains value when another engineer can see the artifact, its owner, the review decision and the remaining gap.

## What carries over to a client engagement

The SDD Kit belongs to knowmad mood’s AI CoE; I led parts of its design and used it as a testbed with colleagues. Client delivery is a separate evidence boundary. In a cybersecurity engagement, a small technical nucleus helped a team introduce project-aware assistants, agent-proposed PRs and review in less than a month. In a banking modernization PoC, I architected a deterministic, source-traceable factory; its repeatability and evidence counts are documented in the [anonymized case](/work/banking-modernization). In a public-sector engagement, we delivered role-specific copilots after repeated audits and corrections, described in the [sector-only account](/work/public-sector-copilots).

I do not publish client repositories, internal code, private logs or the identities behind these cases. Some historical source material is no longer available. The figures are explanatory illustrations; source test records and the AI-agent audit are private. Permission to publish company assets or detailed internal artefacts is a separate requirement. The durable lesson is an engineering habit: when my method scores worse in review, inspect the failure and strengthen the checks.
