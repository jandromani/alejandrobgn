# V3 · Evidence request kit (no client information belongs in this repository)

This is a template, **not evidence that any source has been collected or authorized**. Record client data offline in employer-approved storage.

## For the cybersecurity delivery account
| Requested field | Definition to collect | Validation gate |
| --- | --- | --- |
| Participating engineers | Unique active contributors, date window and team denominator | Customer or manager approves anonymized aggregate |
| Time to first useful workflow | Start event, completion event, roles and evidence | Consistent first-use timestamp definition |
| PR lead time | Median days from proposed change to reviewed PR before/after rollout | Comparable task mix and review team |
| Human approval rate | Approved vs revised vs rejected agent PRs | Audit log with clear numerator/denominator |
| Quality and incident rate | Escaped defects per comparable delivery window | CI coverage, baselines and confidence caveats |
| Onboarding | Time to first accepted task/PR, by cohort | Approved aggregate; no individual staff data |
| Business decision | What an accountable owner could do that was previously impractical | Manager endorsement or approved summary |
| Personal contribution | Scoped decisions and hands-on code/configuration vs collaborator work | Written colleague or engineering-manager confirmation |

## For modernization
| Requested field | Definition to collect | Validation gate |
| --- | --- | --- |
| Scope and corpus | Source types, representative file counts, scope exclusions | No private repository/file identifiers |
| Graph size | Definition of a node and edge, extraction date | Re-run trace with consistent schema |
| Context reduction | **Unit, numerator, denominator, population, treatment/control and formula** | Reproducible example; otherwise do not publish percentage |
| Quality gates | Test names, pass/fail per commit SHA, what they do *not* cover | Approved anonymized run manifest |
| Backend and UI tests | Counts collected at one specific run and their outcome | Same scope and build reference |
| Effort | Team-hours vs agent-hours with measurement definition | No false equivalence or automatic cost/ROI |
| Business decision | Which modernization alternative became evaluable? | Owner quote + cost/time of decision where authorized |
| Functional parity | Representative E2E and acceptance coverage | Do not claim full parity without client signoff |

## Reusable delivery architecture/AI CoE
For every independent capability (context assets, technical KB, product KB, SDD gates): code ownership, where deployed, number of authorized teams/projects, documentation or accepted changes, policy author/approver, time to install, and support cost. Do not equate optional tooling with mandatory governance.

## Technical reference request
Ask an engineering leader or peer to validate only accurate information they are authorized to disclose:

> I'm refreshing my portfolio to distinguish my individual architecture contributions from joint delivery. Could you confirm the scope of the decisions we worked on, the rollout window, and any technical outcome you'd be comfortable allowing in an anonymized public case study? I don't need customer identifiers, source code or sensitive metrics. A short approved factual statement and your preferred attribution would be sufficient.

## 5/30-second reader test
Use `docs/f5-human-validation.md`. Collect five independent responses and preserve their raw answers before marking a comprehension gate complete. No invented participants.

## Administrative follow-up
- GitHub repository naming: GearWatch code lives at `jandromani/HolaInframundo`, WORLD//STATE at `jandromani/InframundoShow`. Before an owner-admin rename, map workflow links, GitHub Pages, API refs, README and Vercel Git integration; then redirect/verify. Current repository metadata remains historical.
- Alejandría is not securely identified in current public account evidence; recover from known authorized source before any URL or maturity claim.
- Vercel domain administrative migration must be coordinated with an existing READY deployment and rollback, without creating unnecessary previews.
