import Link from "next/link"
import { ArrowRight, ArrowUpRight, CheckCircle2, MapPin, ShieldCheck, Network, FileCheck, Globe2 } from "lucide-react"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { AnatomyOriginalCase } from "@/components/anatomy-original-studio"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const experienceDescription = "Eleven years of software and technical leadership, spanning enterprise Java, GIS, distributed platforms and evidence-first agentic engineering. Two four-week enterprise cases and independent AI research, updated October 14, 2026."

export const metadata: Metadata = createPageMetadata({
  title: "AI Technical Leadership Experience",
  description: experienceDescription,
  path: "/experience",
  ogKind: "experience",
  keywords: ["AI Tech Lead experience", "AI technical leadership", "software architect Madrid", "enterprise AI leadership"],
})

const experience = [
  {
    company: "knowmad mood",
    role: "Tech Lead AI",
    period: "Mar 2026 – Present",
    location: "Madrid · Remote",
    current: true,
    description:
      "AI Tech Lead since March 2026. I co-created a two-engineer delivery nucleus that helped an unfamiliar team activate practical agents, copilots, APM, PR workflows and adapted SDD within four weeks; in another engagement I drove the corpus-first architecture of a deterministic legacy modernization factory. Both outcomes were collaborative and scoped.",
    highlights: [
      "Agentic rollout adopted within four weeks",
      "Corpus-first deterministic modernization PoC",
      "Technical proposals and pre-sales",
      "Skills, context and QA enablement",
      "Evidence-first engineering",
    ],
  },
  {
    company: "Ayesa",
    role: "AI Technical Leader · AI Champion",
    period: "Nov 2024 – Feb 2026",
    location: "Madrid, Spain",
    current: false,
    description:
      "Contributed to Generative AI adoption across an engineering organisation of more than 250 engineers, combining transversal R&D, technical leadership and hands-on delivery of pilots and production-ready solutions.",
    highlights: [
      "LLM integration architecture",
      "Agent orchestration design",
      "Governance layer implementation",
      "Cost optimisation strategies",
      "Cross-team enablement within a 250+ engineer organisation",
    ],
  },
  {
    company: "NTT DATA",
    role: "Technical Leader · Platform & AI Initiatives",
    period: "Mar 2022 – Oct 2024",
    location: "Remote",
    current: false,
    description:
      "Architected large-scale cloud migrations and AI system deployments. Designed microservices architectures. Led technical decisions for complex enterprise transformations. Mentored junior architects.",
    highlights: [
      "Cloud migration architecture",
      "Microservices design",
      "Enterprise system integration",
      "AI pilot programmes",
      "Technical mentorship",
    ],
  },
  {
    company: "Hewlett Packard Enterprise",
    role: "Java Software Engineer · Enterprise Systems",
    period: "Feb 2019 – Feb 2022",
    location: "Madrid · Remote",
    current: false,
    description:
      "Built backend systems for enterprise and telecom environments with strong stability and performance requirements, including network-management solutions, legacy modernisation and production operations.",
    highlights: [
      "Backend platform development",
      "Network management · HPESA · SNMP",
      "Database optimisation",
      "Performance engineering",
      "Linux production environments",
    ],
  },
  {
    company: "Grupo AVALON",
    role: "Java Software Engineer",
    period: "Apr 2017 – Jan 2019",
    location: "Madrid · Remote",
    current: false,
    description:
      "Modernised and evolved public-sector applications, migrating legacy Struts systems while delivering full-stack features and data-intensive SQL work.",
    highlights: ["Java", "Struts 1 → Struts 2", "JSP · jQuery", "SQL optimisation"],
  },
  {
    company: "Repsol / Accenture",
    role: "GIS Software Engineer",
    period: "Aug 2015 – Feb 2017",
    location: "Madrid",
    current: false,
    description:
      "Developed geospatial solutions for enterprise and industrial use cases, building custom GIS tools and automating spatial workflows across integrated systems.",
    highlights: ["ArcGIS JavaScript API", "FME automation", "REST · SOAP", "40%+ workflow reduction"],
  },
  {
    company: "Esri España",
    role: "GIS Systems Administrator",
    period: "Apr 2015 – Jul 2015",
    location: "Madrid",
    current: false,
    description:
      "Administered GIS platforms and services supporting enterprise and public-sector solutions—the first professional layer in a career built around systems, territory and data.",
    highlights: ["ArcGIS Server", "Portal for ArcGIS", "ArcGIS Dashboards", "HTML5 · CSS · JavaScript · SQL"],
  },
]

const howIWork = [
  { step: "01", title: "Understand the system", body: "Start with the problem, not the technology. Map the constraints, the existing architecture, and what failure looks like." },
  { step: "02", title: "Design for observability", body: "If you can't measure it from day one, you're building blind. Logging, tracing, and metrics are first-class concerns." },
  { step: "03", title: "Build the governance layer", body: "Compliance and safety are architectural decisions. They become expensive when added after the fact." },
  { step: "04", title: "Ship and iterate", body: "Production is the source of truth. Designs that don't meet reality get refined until they do." },
]

const skills = [
  { area: "Agentic Systems",    items: ["Agent orchestration", "Multi-agent architectures", "Durable runtimes", "State management"] },
  { area: "AI Governance",      items: ["EU AI Act engineering controls", "Risk assessment", "Audit trails", "Permission models"] },
  { area: "LLM Operations",     items: ["Observability (LLMTRACE)", "Cost optimisation", "Vendor routing", "Model evaluation"] },
  { area: "Platform Engineering",items: ["Python · FastAPI", "Next.js", "Cloud platforms", "PostgreSQL · Redis"] },
]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          {
            "@type": "ProfilePage",
            "@id": `${absoluteUrl("/experience")}#profile`,
            url: absoluteUrl("/experience"),
            name: "Professional Experience — Alejandro Baratas",
            description: experienceDescription,
            mainEntity: {
              "@id": personId,
              "@type": "Person",
              hasOccupation: experience.map((item) => ({
                "@type": "Occupation",
                name: item.role,
                description: item.description,
                occupationLocation: {
                  "@type": "City",
                  name: item.location.split("·")[0].trim(),
                },
                hiringOrganization: {
                  "@type": "Organization",
                  name: item.company,
                },
              })),
            },
            isPartOf: { "@id": websiteId },
            dateModified: "2026-10-14",
            inLanguage: "en",
          },
          {
            ...breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Experience", path: "/experience" },
            ]),
            "@id": `${absoluteUrl("/experience")}#breadcrumb`,
          },
        ]}
      />

      {/* Header */}
      <header className="border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="relative container max-w-6xl mx-auto px-4 py-16">
          <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-4">Experience</p>
          <h1 className="text-5xl font-bold text-foreground mb-3">I turn engineering teams into AI-powered delivery teams.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            In August, a colleague and I helped activate AI-assisted development for a new engineering team in less than a month. In a separate four-week engagement, I architected a deterministic factory for understanding and modernizing a legacy corpus. This is the architecture, execution and team enablement behind the portfolio.
          </p>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden bg-border">
          {[
            { n: "11+",   label: "Years engineering" },
            { n: "7",     label: "Professional chapters" },
            { n: "2",     label: "Recent enterprise engagements" },
            { n: "< 1 mo",label: "To team-level AI adoption" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-5 space-y-1">
              <p className="text-3xl font-bold font-mono text-foreground">{stat.n}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>


        {/* Executable professional evidence (Oct 2026) */}
        <section aria-labelledby="proof-heading" className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="v2-kicker">ENTERPRISE WORK · VERIFIED SCOPE</p><h2 id="proof-heading" className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">What I helped put into operation</h2></div>
            <a className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:border-[#b8ff5a]" href="https://www.linkedin.com/in/alejandro-bgn/" target="_blank" rel="noopener noreferrer"><Globe2 size={16}/> LinkedIn profile <ArrowUpRight size={15}/></a>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Link href="/enterprise/cybersecurity-agentic-engineering" className="group rounded-2xl border border-border bg-card p-7 transition hover:border-[#b8ff5a]/50">
              <Network size={27} className="text-[#b8ff5a]"/>
              <p className="v2-kicker mt-7">CYBERSECURITY COMPANY · 4 WEEKS</p>
              <h3 className="mt-3 text-xl font-semibold">An operating agentic team in four weeks</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Two technical peers started with zero client context. We established joint collaboration, built the knowledge corpus and put APM, Backend, Frontend, QA and Gherkin copilots, PR-producing agents and adapted SDD gates into day-to-day team use.</p>
              <p className="mt-5 font-mono text-sm text-[#b8ff5a]">Operational copilots · PR agents · SDD gates <ArrowUpRight className="inline-block" size={13}/></p>
            </Link>
            <Link href="/enterprise/banking-modernization-factory" className="group rounded-2xl border border-border bg-card p-7 transition hover:border-[#b8ff5a]/50">
              <FileCheck size={27} className="text-[#b8ff5a]"/>
              <p className="v2-kicker mt-7">BANKING COMPANY · 4 WEEKS</p>
              <h3 className="mt-3 text-xl font-semibold">Corpus-first reverse engineering, made deterministic</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">I conceived a corpus-first method to understand whole legacy systems, using a bounded module to prove the architecture. Canonical IR, controlled generation, traceability, deterministic file comparisons and 173 derived UI components formed the PoC outputs.</p>
              <p className="mt-5 font-mono text-sm text-[#b8ff5a]">173 components · 4,338 file comparisons <ArrowUpRight className="inline-block" size={13}/></p>
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-secondary/30 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={16} className="text-[#b8ff5a]"/> Scope of responsibility vs. business outcomes</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">My contribution is to make difficult engineering problems tractable: frame the system, establish collaboration, design the architecture, build the technical path and help colleagues use it. The agentic adoption timeline is reported by our delivery team; factory numbers describe bounded artifacts, not full-system migration or client-certified ROI.</p>
          </div>
        </section>
        <section aria-label="Interactive anatomy of the agentic team rollout" className="space-y-5"><div><p className="v2-kicker">HOW I WORK / INTERACTIVE ENGINEERING MODEL</p><h2 className="mt-3 text-2xl font-semibold md:text-3xl">Inside the four-week transformation</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Select each mechanism to inspect the actual engineering sequence. This is a conceptual reconstruction, not a screenshot from the private environment.</p></div><AnatomyOriginalCase mode="agentic"/></section>

        {/* Career Narrative */}
        <section aria-labelledby="narrative-heading" className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-16">
          <div>
            <h2 id="narrative-heading" className="text-lg font-bold text-foreground mb-2">Career narrative</h2>
            <div className="w-8 h-0.5 rounded-full" style={{ background: "hsl(var(--signal-green))" }} />
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>I started as a geographer, thinking about systems: how layers connect, how relationships work, how territories are structured. That way of thinking led me to backend engineering and platform development.</p>
            <p>For more than eleven years I have built increasingly complex systems — from geospatial platforms and monolithic applications to distributed microservices, cloud platforms and agentic AI. The pattern repeats: understand the problem, design the system, measure what works, iterate.</p>
            <p>When generative AI arrived, I saw it not as a magic box but as another layer in the system. The same questions applied: how do models connect? How do data flows work? Who has permission to do what? What happens when it fails?</p>
            <p>That perspective shaped my work on agentic systems, governance, and observability. Not as separate concerns, but as core architectural choices from day one.</p>
          </div>
        </section>

        {/* Timeline */}
        <section aria-labelledby="roles-heading" className="space-y-3">
          <h2 id="roles-heading" className="text-xl font-bold text-foreground mb-6">Professional roles</h2>
          <ol className="relative space-y-0" role="list">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border" aria-hidden="true" />

            {experience.map((role, i) => (
              <li key={role.company} className="relative flex gap-6 pb-8 last:pb-0">
                {/* Dot */}
                <div className="relative flex-shrink-0 flex items-start pt-1" aria-hidden="true">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition-colors ${
                    role.current
                      ? "border-signal-green bg-signal-green/10"
                      : "border-border bg-card"
                  }`}>
                    {role.current ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-signal-green animate-status-pulse" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="p-6 border border-border rounded-xl bg-card space-y-4 hover:border-foreground/20 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-foreground">{role.company}</h3>
                          {role.current && (
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-signal-green/30 text-signal-green bg-signal-green/5">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mt-0.5">{role.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-muted-foreground">{role.period}</p>
                        <p className="text-xs font-mono text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" aria-hidden="true" />{role.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{role.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.highlights.map((h) => (
                        <span key={h} className="px-2 py-0.5 text-xs font-mono rounded bg-secondary border border-border text-muted-foreground">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Skills matrix */}
        <section aria-labelledby="skills-heading" className="border-t border-border pt-16 space-y-8">
          <h2 id="skills-heading" className="text-xl font-bold text-foreground">Technical skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((area) => (
              <div key={area.area} className="p-6 border border-border rounded-xl bg-card space-y-3">
                <h3 className="text-sm font-bold text-foreground">{area.area}</h3>
                <div className="space-y-2">
                  {area.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(var(--signal-green))" }} aria-hidden="true" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Public engineering discourse and cross-domain credibility */}
        <section aria-labelledby="public-thinking" className="border-t border-border pt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="v2-kicker">WRITING / COMMUNITY / CONTINUITY</p><h2 id="public-thinking" className="mt-3 text-2xl font-semibold md:text-3xl">Engineering thinking in public</h2></div>
            <a href="https://www.linkedin.com/in/alejandro-bgn/" target="_blank" rel="noopener noreferrer" className="v2-section-link">View public LinkedIn profile <ArrowUpRight size={16}/></a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {year:"2026",title:"Governed agents, not automation theatre",body:"Public technical argument: the competitive advantage of agents is coherence, control, observability and intervention—not sheer agent count."},
              {year:"2025",title:"From specialist engineer to AI solution leadership",body:"Writing about turning architecture into proposals, customer conversations, product thinking and outcomes, not merely choosing LLMs."},
              {year:"2025",title:"API testing, platforms and AI-assisted delivery",body:"Public articles and prototypes on API testing, product discovery and repeatable engineering; longitudinal evidence for both technical execution and communication."}
            ].map(p=><div key={p.title} className="rounded-xl border border-border bg-card p-6"><p className="v2-kicker">{p.year} · PUBLIC WRITING</p><h3 className="mt-4 text-lg font-semibold">{p.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{p.body}</p></div>)}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border p-5"><p className="font-semibold">Formal learning and credentials</p><p className="mt-2 text-sm leading-7 text-muted-foreground">Google Project Management Professional Certificate (2023) and Google IT Support Professional Certificate (2020), as listed on the public LinkedIn profile. Continuous applied learning across GIS, enterprise systems and AI.</p></div>
            <div className="rounded-xl border border-border p-5"><p className="font-semibold">Public evidence, independent of clients</p><p className="mt-2 text-sm leading-7 text-muted-foreground">Open-source observability, satellite/overhead research, 3D interactive experiences and original full-stack applications. Each demonstration includes implementation boundaries and links to the original artifact.</p><div className="mt-3 flex flex-wrap gap-4 text-sm"><Link href="/systems" className="text-[#b8ff5a]">Systems ↗</Link><Link href="/labs" className="text-[#b8ff5a]">Original HTML labs ↗</Link><Link href="/evolution" className="text-[#b8ff5a]">AI Co-Evolution ↗</Link></div></div>
          </div>
        </section>
        {/* How I work */}
        <section aria-labelledby="how-heading" className="border-t border-border pt-16 space-y-8">
          <h2 id="how-heading" className="text-xl font-bold text-foreground">How I work</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
            {howIWork.map((item) => (
              <li key={item.step} className="p-6 border border-border rounded-xl bg-card space-y-3">
                <p className="text-3xl font-bold font-mono text-muted-foreground/20">{item.step}</p>
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <div className="border-t border-border pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-muted-foreground">Inspect the systems, or review the verified engineering cases.</p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explore systems
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/enterprise"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-semibold rounded-md hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Enterprise cases
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
