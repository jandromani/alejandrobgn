import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, createPageMetadata, personId, personJsonLd, siteConfig, websiteId, websiteJsonLd } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.title, description: siteConfig.description, path: "/",
  ogKind: "profile", absoluteTitle: true,
  keywords: ["Alejandro Baratas", "AI Tech Lead Madrid", "enterprise AI engineering"],
})

const cases = [
  {
    sector: "Cybersecurity · AI-assisted delivery",
    title: "A team using AI workflows within a month",
    role: "One of two engineers establishing the delivery nucleus with the client team",
    result: "Project-aware assistants, agent-proposed PRs and an adapted specification-and-review process were put into use by the participating team.",
    href: "/work/cybersecurity-ai-engineering",
  },
  {
    sector: "Banking · Legacy modernization",
    title: "A source-traceable modernization PoC",
    role: "Architect of a corpus-first approach on a bounded reference module",
    result: "A reproducible path from legacy source to structured knowledge and candidate target artifacts, with explicit quality gates.",
    href: "/work/banking-modernization",
  },
] as const

const services = [
  { title: "AI-assisted engineering", detail: "Project context, specialist agents, reviewable PRs and human quality gates.", href: "/work/cybersecurity-ai-engineering" },
  { title: "Traceable modernization", detail: "Source relationships, canonical models and repeatable generation in a bounded scope.", href: "/work/banking-modernization" },
  { title: "Agent platform architecture", detail: "Orchestration, tool permissions, approvals and observability with stated maturity.", href: "https://github.com/jandromani/A2A" },
] as const

const writing = [
  { title: "Governing Agentic Systems at Enterprise Scale", date: "Jan 2026 · updated Jul 2026", href: "/writing/governing-agentic-systems" },
  { title: "Observability for Agentic Systems", date: "Dec 2025 · updated Jul 2026", href: "/writing/observability-agentic-systems" },
  { title: "Building AI Systems in Public Without Lying to Yourself", date: "Dec 2025 · updated Jul 2026", href: "/writing/building-in-public" },
] as const

export default function Page() {
  return <div className="min-h-screen bg-background">
    <JsonLd data={[websiteJsonLd(), personJsonLd(), {
      "@type": "WebPage", "@id": `${absoluteUrl("/")}#webpage`, url: absoluteUrl("/"),
      name: siteConfig.title, description: siteConfig.description,
      isPartOf: { "@id": websiteId }, about: { "@id": personId },
      inLanguage: "en", dateModified: "2026-10-21",
    }]} />
    <header className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" aria-hidden="true" />
      <div className="relative container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[.18em] text-[#476700] dark:text-signal-green">Alejandro Baratas · AI Tech Lead at knowmad mood · Madrid / remote</p>
        <h1 className="mt-7 max-w-4xl text-[clamp(2.7rem,6vw,5.4rem)] font-bold leading-[1.04] tracking-[-.055em] text-foreground">I put AI-assisted engineering into use with enterprise teams.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">I help engineering teams introduce project-aware agents, reviewable changes and human quality gates. My background spans enterprise software and technical leadership at HPE, NTT DATA, Ayesa and knowmad mood.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/work/cybersecurity-ai-engineering" className="inline-flex items-center gap-2 rounded-md bg-[#90d900] px-6 py-3 text-sm font-semibold text-[#090b0f] hover:bg-[#9cec00] focus-visible:ring-2 focus-visible:ring-ring">Read the cybersecurity case <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring">Start a conversation <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <p className="mt-10 border-t border-border pt-5 text-sm text-muted-foreground">11+ years in software engineering <span className="mx-3 text-border">/</span> AI enablement spanning 250+ engineers at Ayesa <span className="mx-3 text-border">/</span> HPE · NTT DATA · Ayesa · knowmad mood</p>
      </div>
    </header>

    <section aria-labelledby="cases-title" className="border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">01 / Selected engagements</p>
        <h2 id="cases-title" className="mt-3 text-3xl font-bold text-foreground md:text-4xl">What changed in real teams</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {cases.map(item => <Link key={item.href} href={item.href} className="group flex flex-col rounded-xl border border-border bg-card/40 p-6 hover:border-signal-green/50 focus-visible:ring-2 focus-visible:ring-ring md:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-[#476700] dark:text-signal-green">{item.sector}</p>
            <h3 className="mt-4 text-2xl font-semibold text-foreground">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">My role:</strong> {item.role}.</p>
            <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Outcome:</strong> {item.result}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">Read the case <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>)}
        </div>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">Clients are described by sector. Delivery scope, measurements and verification limits are documented in each case.</p>
      </div>
    </section>

    <section aria-labelledby="services-title" className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">02 / What I do</p>
        <h2 id="services-title" className="mt-3 text-3xl font-bold text-foreground">From a team’s problem to a reviewable result</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{services.map(item => <Link key={item.title} href={item.href} className="rounded-xl border border-border bg-background p-6 hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring"><h3 className="text-lg font-semibold text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p><span className="mt-5 inline-flex items-center gap-2 text-sm text-foreground">Inspect the work <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}</div>
      </div>
    </section>

    <section aria-labelledby="writing-title" className="border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">03 / Selected writing</p>
        <h2 id="writing-title" className="mt-3 text-3xl font-bold text-foreground">Field notes on control and evidence</h2>
        <div className="mt-7 divide-y divide-border border-y border-border">{writing.map(item => <Link href={item.href} key={item.href} className="flex flex-wrap items-center justify-between gap-3 py-5 focus-visible:ring-2 focus-visible:ring-ring"><span className="font-semibold text-foreground">{item.title}</span><span className="flex items-center gap-3 font-mono text-xs text-muted-foreground">{item.date}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}</div>
      </div>
    </section>

    <section aria-labelledby="source-title" className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">04 / Inspectable source</p>
        <h2 id="source-title" className="mt-3 text-3xl font-bold text-foreground">Engineering you can inspect</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://github.com/jandromani/A2A" className="rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">A2A · developing platform ↗</a>
          <a href="https://github.com/jandromani/vendors" className="rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">Vendor comparison · prototype ↗</a>
          <a href="https://github.com/jandromani/alejandrobgn" className="rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">This portfolio · source ↗</a>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">Public code shows implementation and current maturity. Enterprise engagements have separate, sector-anonymized evidence boundaries.</p>
      </div>
    </section>

    <section aria-labelledby="contact-title" className="container mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">05 / Contact</p>
      <h2 id="contact-title" className="mt-3 text-3xl font-bold text-foreground md:text-4xl">Let’s talk about your engineering problem.</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">Tell me what your team is trying to change, where AI enters the workflow and what a responsible person must be able to verify.</p>
      <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90">Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      <p className="mt-9 text-sm text-muted-foreground">More detail: <Link href="/experience" className="underline underline-offset-4">experience</Link> · <Link href="/systems" className="underline underline-offset-4">systems</Link> · <Link href="/labs" className="underline underline-offset-4">labs</Link> · <Link href="/atlas" className="underline underline-offset-4">evidence atlas</Link> · <Link href="/evolution" className="underline underline-offset-4">evolution</Link> · <Link href="/publications" className="underline underline-offset-4">publications</Link></p>
    </section>
  </div>
}
