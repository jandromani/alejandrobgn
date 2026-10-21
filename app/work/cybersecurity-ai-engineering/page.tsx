import { enterpriseEvidence, deliveryMetrics, metricProperties } from "@/lib/enterprise-evidence"
import { relatedPortfolioNodes } from "@/lib/portfolio-graph"
import { EngineeringAnatomy } from "@/components/engineering-anatomy"
import { RelatedEvidence } from "@/components/related-evidence"
import { EnterpriseSyntheticEvidence } from "@/components/enterprise-synthetic-evidence"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck2, GitPullRequest, Layers3, Users } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const urlPath = "/work/cybersecurity-ai-engineering"
const description =
  "An anonymized account of a cybersecurity engineering engagement: two technical peers helped a new team adopt agent-assisted development, shared project context and human-reviewed delivery practices in under one month."

export const metadata: Metadata = createPageMetadata({
  title: "AI-enabled engineering in under one month · Enterprise case",
  description,
  path: urlPath,
  ogKind: "experience",
  keywords: ["enterprise AI adoption", "agentic engineering", "technical leadership", "SDD", "engineering enablement"],
})

const deliverySteps = [
  {
    number: "01",
    label: "Align",
    title: "Establish the joint working model",
    body: "Begin with no prior business or repository context. Agree on responsibilities, communication, fast feedback and the interface between the small technical nucleus and the engineering team.",
    output: "A usable collaboration model",
  },
  {
    number: "02",
    label: "Understand",
    title: "Build project-specific knowledge",
    body: "Learn the domain, map codebases and conventions, and capture the context needed to make agent outputs relevant to the team's real work.",
    output: "Shared project context and conventions",
  },
  {
    number: "03",
    label: "Enable",
    title: "Activate role-specific assistance",
    body: "Adapt practical backend, frontend, QA and Gherkin/Cucumber assistance to existing development workflows rather than treating every problem as a generic chat prompt.",
    output: "Working specialist assistance",
  },
  {
    number: "04",
    label: "Execute",
    title: "Connect agents to reviewable changes",
    body: "Bring agent-proposed code changes into pull-request workflows where engineers can inspect decisions, make corrections and retain responsibility.",
    output: "Candidate changes subject to human review",
  },
  {
    number: "05",
    label: "Control",
    title: "Adapt specification-driven delivery",
    body: "Tie intent, specifications, implementation and acceptance to a tailored SDD approach, quality checks and a Definition of Done.",
    output: "A repeatable delivery and review discipline",
  },
  {
    number: "06",
    label: "Transfer",
    title: "Make the workflow usable by the team",
    body: "Support engineers directly, capture feedback and transfer knowledge. The goal is an operating team workflow, not a consultant-owned demonstration.",
    output: "Team-level use during the engagement",
  },
] as const

const personalContributions = [
  "Co-established the focused technical delivery nucleus with a colleague.",
  "Helped define the working agreements and collaboration rhythm with the client engineering team.",
  "Contributed directly to project knowledge capture, role-specific assistance, agent PR workflows and adapting SDD to delivery.",
  "Supported hands-on enablement so the participating engineers could work with the resulting system.",
] as const

const teamOutcomes = [
  "AI-assisted engineering workflows were in use by the participating team within the engagement, according to the delivery team's account.",
  "Role-specific copilots, PR-producing agents and practical review practices were activated rather than left as a slide-deck proposal.",
  "Knowledge and quality practices remained part of the working approach rather than an isolated experiment.",
] as const

export default function CybersecurityEngineeringCasePage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          {
            "@type": "Article",
            "@id": `${absoluteUrl(urlPath)}#case`,
            headline: "From an unfamiliar codebase to AI-assisted engineering in under a month",
            description,
            author: { "@id": personId },
            additionalProperty: metricProperties(deliveryMetrics),
            mentions: relatedPortfolioNodes("case:cybersecurity-ai-engineering").map(({node}) => ({
              "@type":"CreativeWork",
              name:node.title,
              url:absoluteUrl(node.href),
            })),
            isPartOf: { "@id": websiteId },
            inLanguage: "en",
            mainEntityOfPage: absoluteUrl(urlPath),
            about: ["AI engineering", "Agentic SDLC", "Engineering enablement"],
          },
          {
            ...breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Experience", path: "/experience" },
              { name: "AI engineering adoption", path: urlPath },
            ]),
            "@id": `${absoluteUrl(urlPath)}#breadcrumb`,
          },
        ]}
      />

      <header className="relative overflow-hidden border-b border-border">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="relative container mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-16 md:pt-16">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft size={16} aria-hidden="true" /> All enterprise work
          </Link>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.19em] text-[#476700] dark:text-signal-green">
            Selected work / Cybersecurity sector / Anonymized
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            From zero project context to an operating AI-assisted engineering workflow.
          </h1>
          <div className="mt-7 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            <div className="bg-card p-5">
              <p className="font-mono text-3xl font-bold text-foreground">{enterpriseEvidence.deliveryTime.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Reported time to use in participating workflows</p>
            </div>
            <div className="bg-card p-5">
              <p className="font-mono text-3xl font-bold text-foreground">{enterpriseEvidence.deliveryPeers.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Initial technical delivery nucleus, not the whole team</p>
            </div>
            <div className="col-span-2 bg-card p-5 sm:col-span-1">
              <p className="font-mono text-3xl font-bold text-foreground">{enterpriseEvidence.deliveryRoles.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Backend, frontend, QA and Gherkin assistance introduced in team workflows</p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            In August 2026, two technical peers formed a delivery nucleus with an unfamiliar engineering team.
            We established shared project knowledge, role-specific assistance, agent-driven pull requests
            and an adapted specification-and-review workflow — with team-level use in under one month.
          </p>
          <div className="mt-9 flex flex-wrap gap-2">
            {["Hands-on engineering", "Technical leadership", "Agent-assisted delivery", "Human review"].map((label) => (
              <span key={label} className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground">
                {label}
              </span>
            ))}
          </div>
          <a href="#anatomy" className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-foreground/40">
            Explore the interactive engineering Anatomy <ArrowRight className="h-4 w-4" aria-hidden="true"/>
          </a>
          <p className="mt-4 max-w-4xl text-xs leading-6 text-muted-foreground">
            All three figures describe the delivery team's own activity, not customer financial results or independently measured adoption. Specialist roles refer to distinct assistance workflows, not four autonomous production agents. Human review and acceptance remained mandatory.
          </p>
        </div>
      </header>

      <section id="anatomy" aria-labelledby="anatomy-heading" className="scroll-mt-20 border-b border-border bg-card/15">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Interactive engineering Anatomy / Original explanatory model</p>
          <h2 id="anatomy-heading" className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Interactive Anatomy · SDD quality interlock</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Click the three pins to explore the minimum conditions for reviewable AI-assisted change. This is an interactive explanatory model, not a recording of client infrastructure.</p>
          <div className="mt-7">
            <EngineeringAnatomy variant="delivery" />
          </div>
          <details className="mt-6 rounded-xl border border-border bg-card/40">
            <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-foreground">
              Inspect preserved mechanical Anatomy experiment (original kit SVG)
            </summary>
            <div className="border-t border-border">
              <iframe src="/anatomy/figures/agentic.html" title="Interactive Anatomy · SDD quality interlock — preserved original kit mechanism" loading="lazy" sandbox="allow-scripts"
                className="block h-[740px] w-full border-0 md:h-[700px]" />
            </div>
            <p className="px-5 py-4 text-xs leading-6 text-muted-foreground">
              Historical three-pin mechanism, generated from the upstream MIT-licensed Anatomy kit. All controls are fictional.
              <a href="/anatomy/figures/agentic.html" target="_blank" rel="noopener noreferrer" className="ml-2 underline underline-offset-4">Open the standalone archive ↗</a>
            </p>
          </details>
        </div>
      </section>

      <article className="container mx-auto max-w-6xl space-y-20 px-4 py-16 md:py-24">
        <section className="grid gap-8 border-b border-border pb-16 md:grid-cols-[220px_1fr] md:gap-16" aria-labelledby="challenge-title">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">01 / Starting point</p>
            <h2 id="challenge-title" className="mt-3 text-xl font-semibold">The engineering challenge</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              The problem was not to demonstrate a language model. It was to introduce useful AI-assisted work
              into a real team while learning an unfamiliar product domain, repositories and delivery practices.
            </p>
            <p>
              We needed an operating collaboration model, trustworthy project context and a path from proposed
              code changes to engineering review and acceptance. Speed only mattered if the participating team
              could continue using the approach.
            </p>
          </div>
        </section>

        <section aria-labelledby="results-title" className="space-y-7">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">02 / Delivery outcomes</p>
            <h2 id="results-title" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">What was different after the engagement</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The result was not a set of prompts waiting to be adopted. The participating team was
              using AI-assisted engineering workflows, with project-specific context and reviewable changes.
              These are delivery-team-reported outcomes, not independently audited adoption figures.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
            {[
              { label: "Working assistance", result: "Backend, frontend and testing-focused workflows", evidence: "Delivered configuration and team use; no customer source published." },
              { label: "Integrated execution", result: "Agents contributing candidate pull requests", evidence: "Human review was part of the working model; private PRs are not disclosed." },
              { label: "Adoption mechanism", result: "Shared context, collaboration rhythm and adapted SDD", evidence: "Described by the delivery team; no organisation-wide usage percentage claimed." },
            ].map((item) => (
              <article key={item.label} className="bg-card p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">{item.label}</p>
                <h3 className="mt-3 text-lg font-semibold leading-7 text-foreground">{item.result}</h3>
                <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">{item.evidence}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="decisions-title" className="rounded-xl border border-border bg-card/40 p-7 md:p-9">
          <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">03 / Technical judgement</p>
          <h2 id="decisions-title" className="mt-3 text-2xl font-semibold">Decisions behind the speed</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              ["Team workflow before tools", "Align ownership and review responsibilities first; a tool rollout without collaboration is not adoption."],
              ["Project context before output", "Capture repository conventions and business vocabulary so assistance fits real engineering tasks."],
              ["PRs before unsupervised changes", "Connect agents to inspectable pull requests and adapt SDD review criteria to the existing delivery process."],
            ].map(([title, reason]) => (
              <div key={title}>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        <EnterpriseSyntheticEvidence variant="cybersecurity" />

        <section aria-labelledby="mechanism-title">
          <div className="flex items-start gap-3">
            <Layers3 size={23} className="mt-1 shrink-0 text-[#476700] dark:text-signal-green" aria-hidden="true" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">04 / Delivery sequence</p>
              <h2 id="mechanism-title" className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">How we moved from context to delivery</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                A readable reconstruction of the engineering sequence. This is not customer telemetry or a screenshot of a private system.
              </p>
            </div>
          </div>
          <ol className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {deliverySteps.map((step) => (
              <li key={step.number} className="flex flex-col rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-bold text-[#476700] dark:text-signal-green">{step.number}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{step.label}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{step.body}</p>
                <p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-foreground">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">Output / </span>
                  {step.output}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-4 lg:grid-cols-2" aria-labelledby="contribution-title">
          <div className="rounded-xl border border-border bg-card p-7 md:p-8">
            <div className="flex items-center gap-3">
              <Users className="text-[#476700] dark:text-signal-green" size={22} aria-hidden="true" />
              <h2 id="contribution-title" className="text-xl font-semibold">My contribution</h2>
            </div>
            <ul className="mt-6 space-y-4">
              {personalContributions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                  <CheckCircle2 size={16} className="mt-1.5 shrink-0 text-[#476700] dark:text-signal-green" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-7 md:p-8">
            <div className="flex items-center gap-3">
              <GitPullRequest className="text-signal-cyan" size={22} aria-hidden="true" />
              <h2 className="text-xl font-semibold">What the joint team delivered</h2>
            </div>
            <ul className="mt-6 space-y-4">
              {teamOutcomes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                  <CheckCircle2 size={16} className="mt-1.5 shrink-0 text-signal-cyan" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="decisions-title" className="rounded-xl border border-border bg-card p-7 md:p-9">
          <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">05 / Decision record · public reconstruction</p>
          <h2 id="decisions-title" className="mt-3 text-2xl font-semibold">Why a team operating model, not an isolated assistant</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">These architectural rationales are a retrospective explanation by a participant; they are not signed customer ADRs or verbatim contemporaneous approvals.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              {question:"Shared context",decision:"Put project-specific information and conventions before individual assistant behaviors.",alternative:"Independent prompt files per engineer without shared project grounding.",risk:"Needs controlled ownership, updates and access to project material."},
              {question:"Reviewable agent changes",decision:"Route proposed changes through ordinary PR review rather than granting agents unattended deployment rights.",alternative:"Treat generated commits as implicitly accepted work.",risk:"Requires reviewers, branch policy and a visible exception path."},
              {question:"Adoption through workflows",decision:"Introduce backend, frontend, QA and Gherkin-oriented assistance as task roles with a repeatable delivery process.",alternative:"Report adoption from tool installation counts alone.",risk:"Time-to-use is not proof of enduring usage, higher throughput or lower defects."},
            ].map(d=><article key={d.question} className="rounded-lg border border-border bg-background p-5">
              <h3 className="text-lg font-semibold">{d.question}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Design rationale: </strong>{d.decision}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Alternative: </strong>{d.alternative}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Risk: </strong>{d.risk}</p>
            </article>)}
          </div>
          <h3 className="mt-9 text-xl font-semibold">What would establish an independently stronger outcome?</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">An approved count of participating engineers, baseline-to-follow-up PR lead times, reviewer acceptance and rework, and evidence of sustained usage. None is presented here without client authorization and a defined denominator.</p>
        </section>

        <section aria-labelledby="evidence-title" className="rounded-xl border border-border bg-secondary/30 p-7 md:p-9">
          <div className="flex items-start gap-3">
            <FileCheck2 className="mt-1 shrink-0 text-[#476700] dark:text-signal-green" size={23} aria-hidden="true" />
            <div className="max-w-4xl">
              <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">05 / Evidence boundary</p>
              <h2 id="evidence-title" className="mt-3 text-2xl font-semibold">What this case supports — and what it does not</h2>
              <p className="mt-5 text-sm leading-8 text-muted-foreground">
                This account describes the delivery team's reported time-to-use and participating workflows.
                It is not an independently audited adoption percentage, company-wide rollout, unattended
                production autonomy, or measured productivity return. The customer is identified only by
                sector; source code, business-specific context, private PRs and internal screenshots are not published.
              </p>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-5 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-7 text-muted-foreground">
            The technical method and enablement work were collaborative. The distinction between personal
            contribution and team result is intentional.
          </p>
          <Link href="/experience" className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/35">
            Back to experience <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </footer>
      </article>
      <RelatedEvidence id={`case:cybersecurity-ai-engineering`} />
    </div>
  )
}
