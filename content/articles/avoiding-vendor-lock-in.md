# Building Vendor-Agnostic AI Platforms

**How claim intelligence, source provenance, capability contracts and daily change detection turn vendor optionality from an adapter diagram into an operating discipline.**

*Published December 20, 2025 · Updated July 22, 2026*

---

## Summary

Vendor lock-in in AI does not begin when an application imports a provider SDK.

It begins when the organisation stops knowing which assumptions belong to the product and which belong to the provider.

A model name enters a database. A pricing page becomes a spreadsheet. A prompt depends on one model’s instruction hierarchy. A tool schema silently relies on one API’s coercion behaviour. A finance forecast assumes that cached input is billed the same way everywhere. A fallback exists in code, but nobody has run it against representative traffic for six months.

The application may expose a provider dropdown and still be deeply locked in.

Real portability requires two connected systems:

* a **runtime contract** that expresses task intent, capabilities, policy and budgets without pretending every provider behaves identically;
* a **vendor intelligence control plane** that knows which models, prices, limits, deprecations and commercial terms are currently supported by evidence.

AI Vendor Compare is the public experiment behind the second system. Its current interface exposes a time-stamped snapshot, 33 verified claims, 42 surface checks, runtime assumptions, formulas and explicit freshness warnings. It is not yet a continuously live pricing oracle. That boundary is essential.

This article explains what exists, what the snapshot proves, where it has drifted and how to evolve it into a daily, agent-assisted catalogue without allowing an LLM to rewrite commercial facts by itself.

> The objective is not to hide providers behind one universal API. It is to make every dependency explicit, every comparison reproducible and every substitution decision evidence-backed.

# The public product is a perishable evidence snapshot

The current AI Vendor Compare surface describes itself as a frozen photograph rather than live market truth.

That is the correct disclosure.

At the time of this review, the public interface reports:

* a snapshot published on 29 May 2026;
* a latest recorded verification cycle on 30 June 2026;
* 33 of 33 claims verified in the published Truth Graph;
* 41 of 42 Surface Graph checks passing;
* ten monitored vendor ecosystems;
* four runtime signals and one active assumption override;
* a watchdog flow described as local watchdog → OpenRouter → direct Vercel deployment.

Those numbers belong to that release. They are not timeless product metrics.

The delivered JavaScript bundle also contains versioned artefacts named `pricing-formulas-v1`, `pricing-assumptions-v1` and `pricing-assumption-overrides-v1`. Assumptions are classified as verified, measured, derived, estimated or editorial. This is more valuable than a polished comparison table because it exposes the epistemic status of the data used by the calculator.

The same surface reveals why freshness cannot be cosmetic. It still presents GPT-5.4 mini as the ChatGPT fast tier and Gemini 2.5 Flash-Lite as the Gemini fast tier. Current official model documentation lists newer OpenAI and Gemini families. GitHub’s billing documentation has also moved from a legacy premium-request model toward AI-credit accounting for current plans.

The product is therefore simultaneously useful and stale.

That is not an embarrassment to remove from the article. It is the strongest possible case study for the architecture the article proposes.

# A price is not a number; it is a claim

Suppose a provider page says that model X costs $1 per million input tokens.

That statement is incomplete until we know:

* the exact model identifier;
* the effective date;
* whether the price is global or regional;
* the context-window band;
* standard, batch or priority processing;
* cache-read and cache-write treatment;
* whether reasoning, images, audio, search or tools create additional units;
* the currency and tax basis;
* whether the source describes list price, marketplace price or negotiated price;
* whether the model is direct, hosted by a cloud platform or routed through an aggregator.

The atomic record in a vendor catalogue should therefore be a claim, not a cell.

```json
{
  "claim_id": "openai:model:gpt-fast:input-standard:global",
  "subject": "openai/model/gpt-fast",
  "predicate": "input_price_per_million_tokens",
  "value": "0.75",
  "currency": "USD",
  "scope": {
    "processing": "standard",
    "region": "global",
    "context_band": "default"
  },
  "source_url": "https://developers.openai.com/api/docs/models/compare",
  "source_type": "first_party_model_page",
  "observed_at": "2026-07-22T05:00:00Z",
  "effective_from": "2026-07-21",
  "content_hash": "sha256:…",
  "status": "candidate",
  "confidence": 0.98
}
```

The UI can still show a friendly `$0.75 / MTok` badge. The database must retain the conditions that make the badge true.

# Build a source registry before building agents

An autonomous crawler without a source registry is a search engine with write access.

The registry defines where the system is allowed to look, what each source can prove and how quickly it is expected to change.

Each entry should contain:

* canonical URL and provider ownership;
* source class: API, pricing page, model page, changelog, deprecation notice, billing document, status page or announcement;
* claims the source is authoritative for;
* expected format and extraction strategy;
* polling frequency;
* cache and conditional-request behaviour;
* locale and region;
* terms-of-use or robots constraints;
* fallback source;
* owner and escalation path;
* last successful fetch, last meaningful change and current health.

For example, the OpenRouter Models API is excellent for discovering model slugs, pricing dimensions, context length and supported parameters across hundreds of routed models. It is not automatically the primary authority for the direct enterprise contract a customer has negotiated with OpenAI, Anthropic or Google.

Google News results can reveal that a pricing change may have happened. They should never be the evidence that publishes a new price.

Discovery and verification are separate jobs.

# Use an explicit hierarchy of evidence

Not all public pages have the same authority.

I would use the following hierarchy:

1. Versioned machine-readable first-party endpoint.
2. First-party pricing, model or billing documentation.
3. First-party changelog, release note or deprecation notice.
4. First-party announcement or product blog.
5. Authorised marketplace documentation such as AWS, Azure or Google Cloud.
6. Aggregator API such as OpenRouter for discovery and cross-checking.
7. Reputable secondary reporting for discovery only.

Conflicts should not be silently resolved by choosing the newest page.

A model page may update before the pricing page. A regional marketplace may legitimately differ from the direct API. A blog may announce a future effective date. A provider may retain an old model page after deprecation.

The system should create a conflict object:

```text
claim: model_x.output_price
candidate_a: $4.50 · direct pricing page · observed 05:02
candidate_b: $5.00 · model page · observed 05:04
candidate_c: $5.50 · US regional endpoint · observed 05:05
resolution: scope split required
publication: blocked until normalised
```

The purpose of the agent is to expose the conflict with evidence, not to make ambiguity disappear.

# The triggers that keep the catalogue alive

A daily cron is necessary, but it is not sufficient.

Different changes have different clocks. Pricing pages may change without notice. Model launches appear in release feeds. Deprecations have future deadlines. Status incidents are transient. Enterprise billing transitions may be announced months before they become effective.

The control plane needs several trigger classes.

## Scheduled trigger

Run a bounded daily cycle over the source registry.

On Vercel Hobby, a cron can run once per day and may execute at any point within the configured hour. Vercel also warns that cron invocations are not retried automatically and may occasionally be delivered more than once. The worker therefore needs authentication, a distributed lock, an idempotency key and durable run state.

## Release trigger

RSS, Atom, official changelogs, repository releases and provider webhooks should enqueue focused checks when available.

A new-model announcement should not force a complete scrape of every provider. It should create a candidate change for the affected ecosystem and schedule its authoritative source set.

## Freshness trigger

Every claim class receives a maximum age.

Core token prices might require confirmation every 24 hours. Model context windows may tolerate seven days. Enterprise support terms may require a monthly review. A deprecation date should trigger increasingly urgent checks as the deadline approaches.

## Anomaly trigger

Runtime telemetry can reveal that the catalogue is wrong before the page changes.

If observed cost per token diverges materially from the expected price, the system should open an anomaly. It should not automatically overwrite list price because the difference may come from caching, regional processing, marketplace markup, tool charges, credits or negotiated discounts.

## Human trigger

An operator needs a manual recheck path for customer reports, sales information, suspected parser failures and urgent provider announcements.

Every trigger should produce the same run envelope: trigger type, affected sources, idempotency key, budget, deadline and requested evidence level.

# The daily vendor-intelligence graph

The target architecture is not one agent browsing the internet.

It is a graph of narrow roles with deterministic gates.

## Source Watcher

The watcher performs conditional requests using `ETag`, `Last-Modified`, content length and canonical hashes. It records HTTP status, redirect chain, content type and fetch timing.

Its first question is cheap:

> Did the source change at all?

No LLM is required to answer that.

## Discovery Agent

The discovery agent reads release feeds, announcements and aggregator catalogues to identify possible new models, renamed plans, pricing dimensions or deprecations.

It may propose new source candidates. It cannot add them to the authoritative allowlist without policy approval.

## Extraction Agent

The extractor converts changed pages into candidate claims.

Use deterministic selectors, JSON parsing and table extraction first. Use a model only when the page is genuinely unstructured. Preserve the source fragment, surrounding heading, unit and raw text for every extracted value.

## Normalisation Agent

Providers describe similar concepts differently.

The normaliser maps them into a shared ontology while preserving provider-native fields. It converts per-token values to a display unit, but never discards the original unit. It distinguishes input, cached input, cache write, output, reasoning, image, audio, request, search and tool charges.

## Verification Agent

Verification compares the candidate against:

* the previous accepted claim;
* other first-party sources for the same subject;
* arithmetic and unit invariants;
* known model and plan relationships;
* effective dates and deprecation windows;
* the aggregator feed as a cross-check;
* observed runtime cost when available.

The output is not a paragraph. It is a decision proposal with evidence and reason codes.

## Surface Agent

Correct numbers can coexist with stale copy.

The Surface Graph checks names, tier labels, “latest” language, replacement recommendations, plan descriptions and navigation. This is how AI Vendor Compare can detect that a pricing row is numerically valid while the product still promotes an outdated lineup.

## Publisher

The publisher is deterministic.

It accepts only approved claim transitions, writes a versioned snapshot, runs schema and rendering tests, creates a diff report and deploys the release. The model does not receive a Vercel token and improvise a production update.

# The claim lifecycle

Every claim moves through a state machine.

```text
DISCOVERED
    ↓
CANDIDATE
    ↓
NORMALISED
    ↓
VERIFIED ─────────→ DISPUTED
    ↓                   ↓
APPROVED            HUMAN REVIEW
    ↓                   ↓
PUBLISHED ←──────── RESOLVED
    ↓
STALE → RECHECK → CONFIRMED or SUPERSEDED
```

The transition policy should consider impact.

A spelling correction can publish automatically after tests. A new model can appear as “discovered” before pricing is complete. A 50% price change should require corroboration or review. A provider deletion should not erase historical data. A pricing conflict should freeze the affected claim while the rest of the snapshot continues.

Useful states include:

* `verified`: supported by an authoritative source under a defined scope;
* `measured`: observed in runtime telemetry for a defined population;
* `derived`: calculated from versioned inputs and formula;
* `estimated`: an explicit planning assumption;
* `editorial`: a product rule or recommendation;
* `disputed`: authoritative evidence conflicts;
* `stale`: freshness SLO exceeded;
* `unknown`: no defensible value exists.

Unknown is a valid answer.

# Verification must be claim-specific

“33/33 verified” is meaningful only if the visitor can understand what the denominator contains.

The system should expose coverage by claim class:

```text
Core model prices       12 / 12 verified
Context windows          6 / 6 verified
Cache pricing            5 / 6 verified · 1 disputed
Seat plans               7 / 8 verified · 1 stale
Deprecation dates         4 / 4 verified
Enterprise discounts     0 / 3 public · contract-specific
```

A green aggregate must never hide a missing consequential field.

Verification rules should include:

* source belongs to the authorised domain;
* page was fetched successfully and not replaced by an error shell;
* extracted value is attached to a stable source fragment;
* units and currencies are explicit;
* output price is not accidentally parsed as input price;
* effective date is not in the future unless marked announced;
* historical record remains immutable;
* large deltas trigger a second source or human review;
* zero does not mean missing;
* regional or marketplace variants do not overwrite global direct pricing.

# Normalisation is where false comparability begins

Normalising providers is useful and dangerous.

Two models with a `$1 / MTok` input price may have different tokenisers, output lengths, caching rules, reasoning-token treatment and quality. Two enterprise seats may bundle different products, support, security controls and usage allowances.

The canonical schema should therefore separate facts from comparison semantics.

Facts describe what the source says.

Derived metrics describe how the product compares it.

Editorial rules describe what the product recommends.

```text
FACT
  provider price: $1 / MTok input

MEASURED
  median input tokens on support workload: 2,180

DERIVED
  expected input cost / 1K accepted cases: $2.31

EDITORIAL
  recommended for high-volume triage under quality floor Q
```

This is why the provenance vocabulary already present in AI Vendor Compare should become a first-class UI primitive rather than metadata hidden in the bundle.

# Publishing should produce a release, not mutate truth

A safe daily run creates immutable artefacts:

* raw fetch manifest;
* changed-source list;
* extracted candidate claims;
* verification decisions;
* approved claim set;
* previous-to-next diff;
* generated snapshot;
* test report;
* deployment identifier;
* rollback pointer.

The release should be content-addressed. If the accepted claim set has not changed, the run records “no change” and avoids a meaningless deploy.

If a release fails rendering tests, the previous snapshot remains active. If the scheduler stops publishing, the UI freshness clock continues aging and eventually changes the product’s own status to stale.

That last behaviour matters.

The absence of new data must become visible data.

# Freshness needs an SLO

“Updated regularly” is not an operating commitment.

Define a freshness service-level objective per claim class.

For example:

| Claim class | Check cadence | Stale after | Publish policy |
| --- | --- | --- | --- |
| Core API prices | Daily | 48 hours | Auto if unchanged; review large deltas |
| Model lineup | Daily + release trigger | 48 hours | Auto-add as discovered; review tier mapping |
| Deprecations | Daily | 24 hours | Immediate warning |
| Seat plans | Weekly | 14 days | Review commercial scope |
| Marketplace prices | Weekly | 14 days | Keep region and platform separate |
| Negotiated discounts | Contract event | Contract expiry | Never infer from public web |

The dashboard should show both `last checked` and `last changed`.

A source checked today may still contain a price effective three months ago. A claim changed today may have been announced for next quarter. These timestamps answer different questions.

# From vendor intelligence to runtime portability

Fresh prices do not make an application portable.

The runtime needs a provider-neutral intent contract.

```json
{
  "task_class": "contract_extraction",
  "required_capabilities": ["json_schema", "document_input"],
  "quality_floor": "eval.contracts.v7 >= 0.91",
  "data_policy": { "region": "eu", "retention": "zero" },
  "budget": { "max_usd": 0.18, "deadline_ms": 12000 },
  "fallback": { "max_attempts": 2, "degrade": "human_review" }
}
```

An eligibility engine intersects this contract with current evidence:

```text
eligible providers =
    required capabilities
  ∩ policy eligibility
  ∩ current availability
  ∩ quality floor
  ∩ economic envelope
```

Only then should the router rank candidates.

The application owns intent. Adapters own protocol translation. The intelligence catalogue owns current external facts. Evaluations own task-specific quality evidence. Telemetry owns observed cost and reliability.

No single layer can make the routing decision honestly by itself.

# The adapter contract should expose differences

An adapter that converts every API into `generate(text)` has not eliminated lock-in. It has hidden it.

A useful provider adapter declares:

* supported request and response protocol;
* streaming semantics;
* structured-output guarantees;
* tool-call format and parallelism;
* image, audio, file and embedding support;
* reasoning controls;
* token and usage fields;
* retryable and terminal errors;
* idempotency behaviour;
* data region and retention controls;
* model version and deprecation state;
* approximations made by the adapter.

Provider-native extensions are allowed, but they must be typed, observable and owned.

The rule is not “never use a unique provider capability”.

The rule is:

> Know when you are using it, why its value exceeds its exit cost and which product behaviour depends on it.

# Daily update run: a concrete sequence

At 05:00 UTC, the scheduler creates `run_2026_07_22_0500`.

The orchestrator acquires a lock and loads only sources due under their cadence or flagged by release events.

Conditional fetches show that 42 pages are unchanged, three changed and one failed.

The extraction stage identifies:

* one new model identifier;
* two price-table changes;
* one renamed enterprise plan;
* one deprecation date;
* one layout change that broke a deterministic selector.

The verifier confirms the model and deprecation against first-party documentation. One price delta is a regional variant and becomes a new scoped claim. The other conflicts with the provider’s model page and is marked disputed. The renamed plan passes copy and URL checks. The broken selector creates an extraction incident instead of publishing zeroes.

The Surface Graph scans the current product copy and detects that “latest fast model” still points to a superseded family.

The policy engine auto-approves the new discovered model and copy correction, requires human review for tier placement, blocks the disputed price, and leaves unaffected claims publishable.

The publisher generates snapshot `2026-07-22.1`, runs schema, formula, link and visual tests, deploys it and records the deployment ID.

The complete run can answer:

* what triggered it;
* which sources changed;
* which claims were proposed;
* which rules accepted or blocked them;
* what the new UI shows;
* how to restore the previous snapshot.

That is an update system.

An agent that says “I checked the websites” is not.

# Failure modes the design must expect

Provider websites will change layout.

Pages will return bot challenges, locale variants and partial content. RSS feeds will lag the pricing page. A model will be renamed without a stable redirect. A price will be represented as a promotional discount. A marketplace will add a regional multiplier. An extractor will confuse monthly and annual billing. A provider will publish an announcement before updating the API catalogue.

The controller must also fail safely:

* a failed source does not erase accepted claims;
* a parser returning no rows is an incident, not proof that all models disappeared;
* large deltas are quarantined;
* stale claims remain visible with warnings;
* discovery sources cannot directly publish;
* an LLM explanation never replaces the source fragment;
* secrets and deployment credentials are unavailable to extraction agents;
* the previous release remains recoverable.

# Metrics that prove the control plane works

Do not optimise for pages crawled.

Measure:

* **authoritative coverage**: required claims backed by allowed primary sources;
* **freshness compliance**: claims inside their class-specific SLO;
* **time to detect**: source change to candidate claim;
* **time to verify**: candidate to decision;
* **false publication rate**: accepted changes later reversed as incorrect;
* **blocked ambiguity**: consequential conflicts prevented from publishing;
* **surface drift**: stale names or promises despite correct data;
* **parser health**: expected structures successfully extracted;
* **source availability**: successful fetches and degradation by provider;
* **rollback time**: release restored after a bad publication;
* **portable traffic share**: workload that can use more than one eligible provider;
* **migration lead time**: time required to move a bounded production task.

A catalogue is trustworthy when it can show its uncertainty and recover from its own mistakes.

# What AI Vendor Compare can claim today

It can claim that a real public interface exists.

It can claim that the published snapshot exposes verification counts, freshness, formula versions, source classes and assumption provenance.

It can claim that the current product models ten vendor ecosystems and separates core comparison vendors from wider monitored surfaces.

It can claim a representative pipeline for truth verification, surface drift and runtime assumption calibration.

It should not claim that every displayed price is live today.

It should not claim that an LLM autonomously publishes authoritative commercial truth.

It should not claim that synthetic or editorial workload assumptions predict a customer’s realised cost.

It should not claim vendor agnosticism merely because several providers appear in one UI.

The next product milestone is clear:

> Move the source registry, claim ledger and verification runs from bundled snapshot artefacts into a durable, scheduled evidence pipeline whose output the public interface can independently disclose.

# A practical delivery sequence

The transformation does not require launching every agent at once.

## Phase 1 — Make the snapshot reproducible

Move accepted claims, formulas and assumptions into versioned schemas outside the UI bundle.

Add a build command that regenerates the exact public snapshot from those artefacts.

Fail the build when a displayed number has no claim identifier or provenance.

## Phase 2 — Register primary sources

Create the allowlist with owners, claim scopes, cadences and extraction strategies.

Capture hashes and fragments for the 33 claims already shown as verified.

Replace generic source names with canonical URLs and last-check timestamps in the public evidence panel.

## Phase 3 — Run monitoring in shadow mode

Schedule conditional fetches and candidate extraction without changing production data.

Measure parser failures, false changes, conflicts and review burden for several weeks.

Compare proposed changes with the decisions an operator would make.

## Phase 4 — Automate low-risk transitions

Allow no-change confirmations, freshness updates and non-semantic copy repairs to publish after tests.

Keep prices, billing scopes, deprecations and tier mappings behind stronger corroboration or review rules.

Publish the decision report beside every release.

## Phase 5 — Connect runtime evidence

Join pricing snapshots to LLMTRACE usage and invoice reconciliation.

Open anomalies when realised cost diverges from catalogue expectations.

Feed verified capability and cost evidence into bounded routing decisions—not directly into application code.

## Phase 6 — Exercise substitution

Choose one representative task and run an alternative provider in replay, shadow and canary modes.

Measure compatibility gaps, quality, total cost, migration work and rollback time.

Publish an exit-cost report so vendor optionality becomes a tested property.

# Conclusion

Vendor optionality is not achieved by drawing three provider logos behind a router.

It is achieved when the organisation can answer:

* what it believes about each provider;
* where each belief came from;
* when it was last checked;
* which facts are measured rather than advertised;
* which assumptions drive the comparison;
* which workloads can actually move;
* what would break if they did;
* how long a substitution would take;
* what evidence would justify the route.

AI Vendor Compare already contains the beginnings of that operating model: a Truth Graph, a Surface Graph, versioned formulas, provenance categories and a freshness clock.

Its current drift shows the remaining engineering work more clearly than another polished mock-up could.

The future version should wake every day, detect only what changed, gather first-party evidence, normalise without erasing scope, block ambiguous updates, publish a versioned snapshot and tell the visitor exactly how fresh each claim is.

That system does more than compare vendors.

It gives the enterprise a maintained map of its external dependencies.

And a dependency you can see, test, price and replace is no longer invisible lock-in.
