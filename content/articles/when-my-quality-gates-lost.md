# I lost three rounds against my own method. Here is what I changed.

In September 2026, I took a change in the public Documenso repository and ran a personal, controlled comparison. One implementation used my specification-driven delivery kit; the other used a simpler workflow. Independent reviewers assessed the resulting changes without knowing which method produced which. My kit lost three rounds. In two recorded comparisons the scores were **23/40 against 28/40** and **26/40 against 28/40**. The useful result was not a win for a tool. It was a concrete reason to change my own process.

This work grew out of evenings and weekends spent turning agent-assisted development into an engineering discipline. I designed and iterated an OpenSpec-based SDD Kit that ties a change to its specification, implementation, human judgement and archive decision. The comparison exposed the weak point: a gate could read the specification carefully and still miss a defect in the code.

## The failure that made the method better

I seeded a change with defects and ran the standard specification validation. It reported **“1 passed, 0 failed”** while four substantive defects were still live. That result was a valid statement about the schema it checked. It was not evidence that the implementation worked. The distinction matters when a green check is easy to misread as permission to ship.

The blind reviews were harsher. Reviewers found weaknesses in both implementations and did not recommend building either version as submitted. The kit's output was weaker in the recorded score comparisons. I treated the negative result as an input to engineering: compare the review findings to the actual diff, update the checks, and run the same class of failure through the gates again.

The documented iteration produced roughly **30 improvements** across the experiment and follow-up work, including changes to the kit and its archive hook. These are process improvements from a personal experiment, not a measured productivity gain in a client team. The independent review gave me a much better signal than a self-assessed demonstration would have.

## How the method evolved

The SDD Kit is the compact expression of a longer line of engineering work. In separate internal projects, I first used a canonical brief with numbered requirements and deterministic checks, then a modernization factory with release gates and a source-linked evidence registry, and then a governance cycle willing to block its own delivery when evidence was weak. Those were distinct systems, built in different contexts; they are not one integrated product or codebase. Their shared rule is simple: a generated result is not a completed change until a person can inspect the specification, the work and the decision record.

The factory case records **23,811 evidence entries**, of which **22,995** link a file, line and hash together. That distinction matters more than quoting the larger number alone. The governance prototype even rated a trial run **7/100 and blocked delivery**. These records document the checks and the willingness to stop; they do not establish client business impact or independent adoption of the later SDD Kit. The [anonymized modernization case](/work/banking-modernization) explains the factory's scope and limitations.

## Three human decisions, one enforceable boundary

The kit follows a change from **Ready** through implementation to **Done** and **Archive**. Ready asks whether the change has enough context to start. Done asks a person to review implementation against the intended behavior and evidence. Archive records the final verdict. Agents can prepare material and point out problems; they do not sign the human decision.

I hardened the archive hook through a sequence of shell test suites: **38 → 109 → 128 → 225 cases**, with the last set passing in both `bash` and `dash`. Four changes then traversed the workflow through Archive with their reported test suites green. This proves the behavior exercised by those tests and workflows. It does not prove that every possible client, command path or human signature is covered. The hook can be bypassed by a direct terminal action or an unrecognized entry point, and it does not cryptographically verify who made the human decision. I keep those boundaries in the design notes because the system is only as trustworthy as its weakest path.

## How I actually work with agents

My private session log for a **14-day active window between 29 September and 21 October 2026** records **129 delegated agent tasks**, **36 pull requests across five repositories**, and **16 evidence-backed closures** in a focused delivery day. The log also records follow-ups and stopped tasks. Those counts describe directed work across personal and professional contexts; they are not equivalent to 129 autonomous employees or 36 accepted production changes.

I use parallelism to explore and verify: define a narrow task, assign a source of truth, ask for an artifact, review the result, and stop or redirect when the evidence does not hold. The report's task coding puts about **60%** of those assignments into rehearsal, audit or independent judging rather than initial production. The point of directing many agents is to create more opportunities to find faults before anyone relies on the output.

One delivery rehearsal before an event with more than 300 attendees used **30 agent assignments across six waves** to inspect links, content and blocking issues. The log records **2,333 links inspected** and **12 blocking issues** over two days. These are counts of the audit workflow, not proof of attendee outcomes. I also turned a repeatable, GPU-free video production workflow into a kit and guide, yielding four training videos over two days. That is the same habit at a smaller scale: turn an improvised workflow into an artifact another person can run.

## Evidence is something I build, not a slide at the end

For a separate internal center-of-excellence effort, I made a dated evidence ledger with **20 records across 11 evidence folders**. Each record identifies the asset and its hash, the independent reviewer and the decision conditions; a past entry is corrected with a new record rather than silently rewritten. A professional audit I commissioned returned **138 findings, including 12 blocking findings**, and forced corrections to earlier claims. That was uncomfortable and useful. It made the boundary between what we built, what someone else checked and what a buyer could rely on much sharper.

The same standard applies to credit. I designed the SDD Kit, development and documentation knowledge bases, the ledger and a distributable video workflow. I audited and documented a colleague's asset vault; I do not present that vault as code I authored. A method gains value when another engineer can see the artifact, its owner, the review decision and the remaining gap.

## What carries over to a client engagement

The kit is a personal engineering asset and testbed. Client delivery is a separate evidence boundary. In a cybersecurity engagement, a two-person technical nucleus helped a team introduce project-aware assistants, agent-proposed PRs and review in less than a month. In a banking modernization PoC, I architected a deterministic, source-traceable factory; its repeatability and evidence counts are documented in the [anonymized case](/work/banking-modernization). In a public-sector engagement, we delivered role-specific copilots after repeated audits and corrections, described in the [sector-only account](/work/public-sector-copilots).

I do not publish client repositories, private logs or the identities behind these cases. The figures above come from my documented experiment and session records; the source records are retained privately. A reader can inspect the method and the limits here, while access to the underlying records is a separate conversation. My strongest claim is an engineering habit: when my own gate loses a blind review, I change the gate and test it again.
