import { RelatedEvidence } from "@/components/related-evidence"
import Link from "next/link"
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react"
import { systems } from "@/lib/systems-data"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const experienceDescription = "Eleven years of software engineering and technical leadership—from GIS and enterprise backends to AI governance, agentic systems, and platform architecture."

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
      "Leading the definition, architecture and activation of AI solutions across business and technology units, from adoption strategy and pre-sales to scalable delivery and executive enablement.",
    highlights: [
      "AI adoption strategy",
      "Multi-agent · RAG · copilots",
      "AI offerings and pre-sales",
      "Executive enablement",
      "Business impact",
    ],
  },
  {
    company: "Ayesa",
    role: "AI Technical Leader · AI Champion",
    period: "Nov 2024 – Feb 2026",
    location: "Madrid, Spain",
    current: false,
    description:
      "Drove Generative AI adoption across a large engineering organisation of more than 250 engineers, combining transversal R&D, technical leadership and hands-on delivery of pilots and production-ready solutions.",
    highlights: [
      "LLM integration architecture",
      "Agent orchestration design",
      "Governance layer implementation",
      "Cost optimisation strategies",
      "AI enablement across 250+ engineers",
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
  { area: "AI Governance",      items: ["EU AI Act compliance", "Risk assessment", "Audit trails", "Permission models"] },
  { area: "LLM Operations",     items: ["Trace design and observability concepts", "Cost modelling", "Vendor comparison", "Model evaluation"] },
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
            dateModified: "2026-07-24",
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
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em] mb-4">Experience</p>
          <h1 className="text-5xl font-bold text-foreground mb-3">Eleven years building systems</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From GIS and enterprise backends to AI governance platforms. A narrative thread from geographic thinking to agentic systems.
          </p>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border rounded-xl overflow-hidden bg-border">
          {[
            { n: "11+",   label: "Years engineering" },
            { n: "7",     label: "Professional chapters" },
            { n: String(systems.length), label: "Catalogue entries" },
            { n: "4",     label: "AI system domains" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-5 space-y-1">
              <p className="text-3xl font-bold font-mono text-foreground">{stat.n}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Selected enterprise work: deliberately separate from professional role history. */}
        <section aria-labelledby="work-cyber-heading" className="space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal-green">Selected enterprise work</p>
            <h2 id="work-cyber-heading" className="mt-2 text-2xl font-bold text-foreground">
              What changed for the engineering team
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              Two sector-anonymized engagements, with a clear distinction between personal contribution,
              collaborative outcomes and the evidence actually demonstrated.
            </p>
          </div>
          <Link
            href="/work/cybersecurity-ai-engineering"
            className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-6 transition-colors hover:border-signal-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-wider text-signal-green">
                Cybersecurity sector · August 2026 · AI-assisted engineering
              </p>
              <h3 className="mt-3 text-xl font-semibold text-foreground md:text-2xl">
                From zero project context to team-level AI-assisted delivery.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A small joint engineering nucleus established project knowledge, specialist assistance,
                human-reviewed agent PRs and an adapted SDD workflow in under one month.
              </p>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Duration and adoption are reported by the delivery team; no audited productivity claim.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground group-hover:text-signal-green">
              Inspect case <ArrowRight size={17} aria-hidden="true" />
            </span>
          </Link>
          <Link
            href="/work/banking-modernization"
            className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-6 transition-colors hover:border-signal-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-wider text-signal-green">
                Banking sector · Four-week technical PoC · Legacy modernization
              </p>
              <h3 className="mt-3 text-xl font-semibold text-foreground md:text-2xl">
                A corpus-first approach to deterministic modernization.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A reference-module proof of concept explored source-linked system knowledge,
                canonical representation, bounded generation and reproducible evidence.
              </p>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                PoC outputs do not establish complete migration, functional parity or verified financial savings.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground group-hover:text-signal-green">
              Inspect case <ArrowRight size={17} aria-hidden="true" />
            </span>
          </Link>
        </section>

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
                            <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-signal-green/30 text-signal-green bg-signal-green/5">
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

        {/* How I work */}
        <section aria-labelledby="how-heading" className="border-t border-border pt-16 space-y-8">
          <h2 id="how-heading" className="text-xl font-bold text-foreground">How I work</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
            {howIWork.map((item) => (
              <li key={item.step} className="p-6 border border-border rounded-xl bg-card space-y-3">
                <p className="text-3xl font-bold font-mono text-muted-foreground/80">{item.step}</p>
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <div className="border-t border-border pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-muted-foreground">See the systems behind the experience.</p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explore systems
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-semibold rounded-md hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              About me
            </Link>
          </div>
        </div>

      </div>
      <RelatedEvidence id="index:experience" />
    </div>
  )
}
