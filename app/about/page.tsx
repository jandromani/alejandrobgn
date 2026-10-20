import { Github, Linkedin, Mail, ArrowUpRight, Crosshair, Braces, Waypoints } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { AboutLineageMap } from "@/components/about-lineage-map"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, personJsonLd, websiteId } from "@/lib/seo"

const aboutDescription = "AI Tech Lead and systems architect in Madrid. A professional path from geography and enterprise backends to agentic systems, AI governance, observability, and platform engineering."

export const metadata: Metadata = createPageMetadata({
  title: "About Alejandro Baratas", description: aboutDescription, path: "/about", ogKind: "about",
  keywords: ["Alejandro Baratas", "Alejandro BGN", "AI Tech Lead Madrid", "Agentic Systems Architect Spain"],
})

const capabilities = [
  { index: "01", label: "Intent & models", color: "green", icon: Crosshair, description: "Clarify problems, model reality and define unambiguous intent.", items: ["Domain modelling", "Decision logic", "Scenario design", "Requirements that endure"] },
  { index: "02", label: "Architecture & platforms", color: "cyan", icon: Braces, description: "Build modular systems that scale with change and context.", items: ["APIs & contracts", "Data & runtime platforms", "Distributed systems", "Security by design"] },
  { index: "03", label: "Production AI", color: "violet", icon: Waypoints, description: "Ship agentic capabilities with control, observability and proof.", items: ["Agents & workflows", "Evaluation & monitoring", "Governance & policy", "Control planes"] },
]

const constraints = [
  ["Evidence over opinion", "Measure, don’t assume"], ["Intent before implementation", "Clarity precedes code"],
  ["Control before scale", "Governance first"], ["Observability by default", "You can’t manage what you can’t see"],
  ["Composability over complexity", "Small pieces, clear contracts"], ["Safety as a feature", "Design for graceful failure"],
  ["Continuous verification", "Ship with proof, not promises"], ["Human in the loop", "Augment, don’t replace"],
]


function CapabilityGraphic({ color }: { color: string }) {
  const stroke = color === "green" ? "#b8ff5a" : color === "cyan" ? "#22d3ee" : "#a78bfa"
  return <svg viewBox="0 0 240 74" aria-hidden="true" className="w-full border-y border-white/10">
    {color === "green" && <>{[0,1,2,3,4].map(i=><path key={i} d={`M-10 ${18+i*10}C45 ${-8+i*16} 91 ${44+i*3} 139 ${19+i*8}S207 ${5+i*12} 252 ${17+i*10}`} fill="none" stroke={stroke} strokeOpacity={.22+i*.12}/>)}</>}
    {color === "cyan" && <><path d="M8 38H40V20H75V50H112V15H148V42H184V25H232" fill="none" stroke={stroke} strokeOpacity=".8" />{[40,75,112,148,184].map((x,i)=><rect key={x} x={x-5} y={[15,45,10,37,20][i]} width="10" height="10" fill="#080b0f" stroke={stroke}/>)}</>}
    {color === "violet" && <>{[[15,44],[50,18],[76,52],[108,29],[140,55],[171,20],[220,42]].map(([x,y],i)=><g key={x}><circle cx={x} cy={y} r="3" fill={stroke}/>{i<6&&<path d={`M${x} ${y}L${[[50,18],[76,52],[108,29],[140,55],[171,20],[220,42]][i][0]} ${[[50,18],[76,52],[108,29],[140,55],[171,20],[220,42]][i][1]}`} stroke={stroke} strokeOpacity=".55"/>}</g>)}</>}
  </svg>
}

export default function AboutPage() {
  return <main className="min-h-screen bg-background">
    <JsonLd data={[personJsonLd(), { "@type": "ProfilePage", "@id": `${absoluteUrl("/about")}#profile`, url: absoluteUrl("/about"), name: "About Alejandro Baratas", description: aboutDescription, mainEntity: { "@id": personId }, isPartOf: { "@id": websiteId }, dateModified: "2026-08-03", inLanguage: "en" }, { ...breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), "@id": `${absoluteUrl("/about")}#breadcrumb` }]} />

    <section className="about-poster relative overflow-hidden border-b border-border">
      <div className="about-registration" aria-hidden="true" />
      <div className="container relative mx-auto grid min-h-[640px] max-w-[1500px] px-4 lg:grid-cols-[.7fr_1.3fr] lg:px-10">
        <div className="relative z-10 flex flex-col justify-center border-border py-16 lg:border-r lg:pr-12">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[.24em] text-signal-green">About / systems thinking</p>
          <h1 className="mt-7 max-w-[620px] text-[clamp(3.2rem,5.1vw,6rem)] font-bold leading-[.93] tracking-[-.06em] text-foreground">I started by reading territories. <span className="text-muted-foreground">I now design systems.</span></h1>
          <p className="mt-7 max-w-[540px] text-base leading-8 text-muted-foreground">I connect geography and spatial thinking to software architecture, then extend it into production AI—where intent becomes action under uncertainty. My work lives at the intersection of design, control and evidence.</p>
          <div className="mt-9 flex items-center gap-3 font-mono text-xs text-muted-foreground"><span className="relative flex h-6 w-6 items-center justify-center"><span className="absolute h-6 w-px bg-signal-green"/><span className="absolute h-px w-6 bg-signal-green"/><span className="h-2 w-2 rounded-full border border-signal-green"/></span>40.4168° N · 3.7038° W <span className="text-border">/</span> Madrid · Remote</div>
          <p className="mt-12 font-mono text-[10px] uppercase tracking-[.18em] text-foreground/45">Alejandro Baratas · AI Systems Architect · Tech Lead</p>
        </div>
        <div className="relative flex min-h-[500px] items-center py-8 lg:-ml-6 lg:py-10">
          <div className="absolute left-8 top-10 font-mono text-[9px] uppercase tracking-[.22em] text-signal-green lg:left-16">Lineage map / spatial to agentic</div>
          <div className="absolute left-8 top-16 font-mono text-[9px] leading-5 text-muted-foreground/55 lg:left-16">40.4168° N<br/>3.7038° W</div>
          <AboutLineageMap />
        </div>
      </div>
    </section>

    <section className="border-b border-border">
      <div className="container mx-auto grid max-w-[1500px] lg:grid-cols-2">
        <div className="border-border px-4 py-12 lg:border-r lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-signal-cyan">Operating scope / 01</p>
          <div className="mt-3 flex items-end justify-between gap-4"><div><h2 className="text-3xl font-bold text-foreground">What I do</h2><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">I design the architecture that reliably turns intent into governed execution.</p></div><Link href="/systems" className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[.15em] text-signal-green md:flex">Inspect evidence <ArrowUpRight className="h-3 w-3"/></Link></div>
          <div className="mt-7 grid gap-3 md:grid-cols-3">{capabilities.map(item => { const Icon=item.icon; return <article key={item.index} className={`capability-card capability-card--${item.color}`}><Icon className="h-5 w-5"/><p className="mt-4 font-mono text-[9px] font-semibold uppercase tracking-[.14em]">{item.index}. {item.label}</p><p className="mt-3 min-h-[62px] text-xs leading-5 text-muted-foreground">{item.description}</p><CapabilityGraphic color={item.color}/><ul className="mt-3 space-y-1.5 font-mono text-[9px] text-muted-foreground">{item.items.map(x=><li key={x}>{x}</li>)}</ul></article>})}</div>
        </div>
        <div className="px-4 py-12 lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-signal-green">System contract / read-only</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">Working principles</h2><p className="mt-2 text-sm text-muted-foreground">Non-negotiable constraints that shape every system I design.</p>
          <div className="mt-7 overflow-hidden rounded-lg border border-border bg-[#07090d] text-white"><div className="flex h-10 items-center justify-between border-b border-white/15 px-4"><div className="flex gap-2"><span className="h-2 w-2 rounded-full border border-white/30"/><span className="h-2 w-2 rounded-full border border-white/30"/><span className="h-2 w-2 rounded-full border border-white/30"/></div><span className="font-mono text-[9px] tracking-[.15em] text-white/60">system.constraints</span><span className="font-mono text-[8px] text-signal-green">read-only</span></div><ol>{constraints.map(([rule,note],i)=><li key={rule} className="grid grid-cols-[28px_minmax(0,1fr)] border-b border-white/[.07] px-3 py-2.5 last:border-0 md:grid-cols-[28px_1fr_1fr]"><span className="font-mono text-[9px] text-white/60">{String(i+1).padStart(2,"0")}</span><strong className="font-mono text-[10px] font-medium text-signal-green">{rule}</strong><span className="mt-1 font-mono text-[9px] text-white/60 md:mt-0">// {note}</span></li>)}</ol><p className="border-t border-white/15 px-4 py-3 font-mono text-[9px] text-white/60">These aren’t aspirations. They’re system constraints.</p></div>
        </div>
      </div>
    </section>

    <section className="container mx-auto max-w-6xl space-y-16 px-4 py-20">
      <section id="compounding-advantage" aria-labelledby="compounding-advantage-heading" className="space-y-8">
        <div className="grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">The compounding advantage</p>
            <h2 id="compounding-advantage-heading" className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Not a pivot. A stack of capabilities.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            My work in AI builds on geographic systems, enterprise backends and technical leadership.
            Each chapter introduced a way of reasoning that now helps me design and deliver agent-assisted engineering.
            The value comes from combining them, not from collecting technologies.
          </p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li className="relative rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">01 / GIS and geography</p>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Spatial thinking</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Reading relationships, constraints and dependencies in complex environments.</p>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-foreground">Understand the shape of the problem before proposing a solution.</p>
            </li>

            <li className="relative rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">02 / Java, services and distributed systems</p>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Enterprise engineering</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Working with legacy software, reliability constraints and long-lived integration points.</p>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-foreground">Build systems that must work beyond a demo.</p>
            </li>

            <li className="relative rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">03 / Delivery and engineering teams</p>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Technical leadership</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Owning technical decisions, shared standards, collaboration and the consequences of implementation.</p>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-foreground">Make an approach usable by people beyond the original builder.</p>
            </li>

            <li className="relative rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">04 / AI workflows and platforms</p>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Agentic architecture</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Bringing models, tools, context, permissions, reviews and evidence into one controlled engineering process.</p>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-foreground">Move from experiments to bounded, reviewable execution.</p>
            </li>
        </ol>
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-secondary/40 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">What that combination enables</p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground">
              I can reason from domain context and source dependencies to architecture, working software,
              team adoption and explicit evidence — with responsibility for the handoffs between each.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/experience" className="rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">Professional record ↗</Link>
            <Link href="/work/cybersecurity-ai-engineering" className="rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">Enterprise example ↗</Link>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden border-y border-border py-12"><div className="absolute inset-0 bg-grid opacity-15"/><div className="relative grid gap-8 md:grid-cols-[180px_1fr]"><div><p className="font-mono text-6xl font-bold text-foreground">201</p><p className="mt-2 font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">documented records<br/>184 historical + 17 later</p></div><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-signal-green">AI co-evolution / Jan 2023—Oct 2026</p><h2 className="mt-3 text-3xl font-bold text-foreground">The research outlasted each technology cycle.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The first 184 reconstructed records document early context engineering, GIS, systems, products and governance through July 2026. Seventeen later documented milestones add engineering adoption, modernization, robotics, interactive laboratories and agent platforms. An entry represents work to inspect, not necessarily a shipped product.</p><Link href="/evolution" className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-signal-green">Inspect the complete evolution <ArrowUpRight className="h-3.5 w-3.5"/></Link></div></div></div>

      <section aria-labelledby="connect-heading" className="grid gap-8 border-t border-border pt-12 md:grid-cols-[1fr_auto] md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-signal-cyan">Open channel</p><h2 id="connect-heading" className="mt-3 text-4xl font-bold text-foreground">Bring me the system that is difficult to explain.</h2><p className="mt-4 max-w-2xl text-muted-foreground">Currently Tech Lead AI at knowmad mood in Madrid. My focus is agentic engineering, governed AI platforms and complex software modernization.</p></div><div className="flex gap-2"><a href="mailto:alejandrobgn@gmail.com" aria-label="Email" className="contact-icon"><Mail/></a><a href="https://linkedin.com/in/alejandro-bgn/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="contact-icon"><Linkedin/></a><a href="https://github.com/jandromani" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="contact-icon"><Github/></a></div></section>
    </section>
  </main>
}
