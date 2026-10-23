import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { HomeEvidenceFigures } from "@/components/home-evidence-figures"
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
    role: "Engineering contributor establishing the delivery workflow with the team",
    result: "Project-aware assistants, agent-proposed PRs and an adapted specification-and-review process were put into use by the participating team.",
    href: "/work/cybersecurity-ai-engineering",
  },
  {
    sector: "Banking · Legacy modernization",
    title: "A source-traceable modernization PoC",
    role: "Architect of a corpus-first approach on a bounded reference module",
    result: "22,995 evidence records linked to file, line and hash; 4,338 files compared across two runs of the bounded factory.",
    href: "/work/banking-modernization",
  },
  {
    sector: "Public sector · Developer copilots",
    title: "An audited agent package prepared for handover",
    role: "Technical lead for the engineering agent packages",
    result: "Ten specialist skills and three agents; twelve reported audit rounds with 36 detailed corrections in the July preparation records.",
    href: "/work/public-sector-copilots",
  },
] as const

const services = [
  { title: "AI-assisted engineering", detail: "Project context, specialist agents, reviewable PRs and human quality gates.", href: "/work/cybersecurity-ai-engineering" },
  { title: "Traceable modernization", detail: "Source relationships, canonical models and repeatable generation in a bounded scope.", href: "/work/banking-modernization" },
  { title: "Agent platform architecture", detail: "Orchestration, tool permissions, approvals and observability with stated maturity.", href: "https://github.com/jandromani/A2A" },
] as const

const writing = [
  { title: "My Method Lost Two Scored Comparisons. Here Is What I Changed.", date: "Oct 2026 · SDD Kit field note", href: "/writing/when-my-quality-gates-lost" },
  { title: "Governing Agentic Systems at Enterprise Scale", date: "Drafted Jul 2026", href: "/writing/governing-agentic-systems" },
  { title: "Observability for Agentic Systems", date: "Drafted Jul 2026", href: "/writing/observability-agentic-systems" },
  { title: "Building AI Systems in Public Without Lying to Yourself", date: "Drafted Jul 2026", href: "/writing/building-in-public" },
] as const

export default function Page() {
  return <div className="min-h-screen bg-background">
    <JsonLd data={[websiteJsonLd(), personJsonLd(), {
      "@type": "WebPage", "@id": `${absoluteUrl("/")}#webpage`, url: absoluteUrl("/"),
      name: siteConfig.title, description: siteConfig.description,
      isPartOf: { "@id": websiteId }, about: { "@id": personId },
      inLanguage: "en", dateModified: "2026-10-23",
    }]} />
    <header className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" aria-hidden="true" />
      <div className="relative container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[.18em] text-[#476700] dark:text-signal-green">Alejandro Baratas · AI Tech Lead at knowmad mood · Madrid / remote</p>
        <h1 className="mt-7 max-w-4xl text-[clamp(2.7rem,6vw,5.4rem)] font-bold leading-[1.04] tracking-[-.055em] text-foreground">I put AI-assisted engineering into use with enterprise teams.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">I help engineering teams introduce project-aware agents, reviewable changes and human quality gates. At knowmad mood’s AI CoE I helped build and test an OpenSpec-based SDD Kit and evidence-led agent workflows. My background spans HPE, NTT DATA, Ayesa and knowmad mood.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/work/cybersecurity-ai-engineering" className="inline-flex items-center gap-2 rounded-md bg-[#90d900] px-6 py-3 text-sm font-semibold text-[#090b0f] hover:bg-[#9cec00] focus-visible:ring-2 focus-visible:ring-ring">Read the cybersecurity case <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring">Start a conversation <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <a href="/Alejandro-Baratas-CV.pdf" download className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring">Download CV · PDF <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <p className="mt-10 border-t border-border pt-5 text-sm text-muted-foreground">11+ years in software engineering <span className="mx-3 text-border">/</span> GIS → enterprise platforms → AI engineering <span className="mx-3 text-border">/</span> HPE · NTT DATA · Ayesa · knowmad mood</p>
      </div>
    </header>

    <section aria-labelledby="cases-title" className="border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">01 / Selected engagements</p>
        <h2 id="cases-title" className="mt-3 text-3xl font-bold text-foreground md:text-4xl">What changed in real teams</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
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

    <HomeEvidenceFigures />

    <section aria-labelledby="engineering-title" className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-14 md:py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">03 / Engineering method</p>
        <div className="mt-3 grid gap-8 md:grid-cols-[1.3fr_.7fr] md:items-center">
          <div><h2 id="engineering-title" className="max-w-2xl text-3xl font-bold md:text-4xl">From a specification to a delivery someone can challenge.</h2><p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">I helped develop Alejandría for traceable requirements and a bounded Factoría for source-linked modernization. Later experiments added context retrieval, approval controls and the SDD Kit’s review gates. Each addresses a different handoff in agent-assisted delivery.</p><Link href="/engineering" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4">Explore the method and evidence register <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="rounded-xl border border-border bg-background p-6"><p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">An inspectable chain</p><p className="mt-4 font-mono text-3xl font-bold">50 → 22</p><p className="mt-1 text-sm leading-6 text-muted-foreground">requirements in the Alejandría reference pack → verifier checks on its local pipeline</p><p className="mt-5 border-t border-border pt-4 font-mono text-3xl font-bold">Source → candidate → review</p><p className="mt-1 text-sm leading-6 text-muted-foreground">The same engineering question, explored across separate assets and engagements.</p><p className="mt-4 text-xs leading-6 text-muted-foreground">Read the scope of each result in the <Link href="/engineering#evidence" className="font-semibold underline underline-offset-4">evidence register</Link>.</p></div>
        </div>
      </div>
    </section>

    <section aria-labelledby="method-title" className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">04 / Engineering practice</p>
        <h2 id="method-title" className="text-3xl font-bold text-foreground">I publish the tests that changed my method.</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">The SDD Kit’s blind plan comparisons exposed a weakness in our review gates. I publish the negative result, the subsequent corrections and the separate source-hook audit so others can inspect the decisions.</p>
        <Link href="/writing/when-my-quality-gates-lost" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4">Read the experiment <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>

    <section aria-labelledby="services-title" className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">05 / What I do</p>
        <h2 id="services-title" className="mt-3 text-3xl font-bold text-foreground">From a team’s problem to a reviewable result</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{services.map(item => <Link key={item.title} href={item.href} className="rounded-xl border border-border bg-background p-6 hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring"><h3 className="text-lg font-semibold text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p><span className="mt-5 inline-flex items-center gap-2 text-sm text-foreground">Inspect the work <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}</div>
      </div>
    </section>

    <section aria-labelledby="writing-title" className="border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">06 / Selected writing</p>
        <h2 id="writing-title" className="mt-3 text-3xl font-bold text-foreground">Field notes on control and evidence</h2>
        <div className="mt-7 divide-y divide-border border-y border-border">{writing.map(item => <Link href={item.href} key={item.href} className="flex flex-wrap items-center justify-between gap-3 py-5 focus-visible:ring-2 focus-visible:ring-ring"><span className="font-semibold text-foreground">{item.title}</span><span className="flex items-center gap-3 font-mono text-xs text-muted-foreground">{item.date}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}</div>
      </div>
    </section>

    <section aria-labelledby="source-title" className="border-b border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">07 / Inspectable source</p>
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
      <p className="font-mono text-xs uppercase tracking-widest text-[#476700] dark:text-signal-green">08 / Contact</p>
      <h2 id="contact-title" className="mt-3 text-3xl font-bold text-foreground md:text-4xl">Connect around engineering and research.</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">This is a personal record of my work and experiments. I welcome professional conversations about technical leadership, research and the ideas documented here.</p>
      <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90">Contact me <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      <p className="mt-9 text-sm text-muted-foreground">More detail: <Link href="/engineering" className="underline underline-offset-4">method</Link> · <Link href="/experience" className="underline underline-offset-4">experience</Link> · <Link href="/systems" className="underline underline-offset-4">systems</Link> · <Link href="/labs" className="underline underline-offset-4">labs</Link> · <Link href="/atlas" className="underline underline-offset-4">evidence atlas</Link> · <Link href="/evolution" className="underline underline-offset-4">evolution</Link> · <Link href="/publications" className="underline underline-offset-4">publications</Link></p>
    </section>
  </div>
}
