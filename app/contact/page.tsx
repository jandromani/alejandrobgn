import { Mail, Linkedin, Github, Building2, Users, Lightbulb, CalendarDays, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const contactDescription = "Discuss technical leadership, enterprise AI transformation and research collaboration with Alejandro Baratas."

export const metadata: Metadata = createPageMetadata({
  title: "Contact Alejandro Baratas",
  description: contactDescription,
  path: "/contact",
  ogKind: "contact",
  keywords: ["AI architecture consultant", "AI governance advisor", "AI Tech Lead Madrid", "agentic systems consulting"],
})

const conversationTypes = [
  {
    title: "Technical leadership",
    description: "CTO and VP Engineering conversations about architecture ownership, team enablement and difficult delivery decisions.",
    Icon: Users,
  },
  {
    title: "Enterprise AI transformation",
    description: "Introducing agent-assisted engineering, modernization and governance into real delivery organisations.",
    Icon: Building2,
  },
  {
    title: "Research and collaboration",
    description: "Deep technical exchange, applied research, open-source work, publications and selected speaking engagements.",
    Icon: Lightbulb,
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={[
          {
            "@type": "ContactPage",
            "@id": `${absoluteUrl("/contact")}#contact`,
            url: absoluteUrl("/contact"),
            name: "Contact Alejandro Baratas",
            description: contactDescription,
            about: { "@id": personId },
            isPartOf: { "@id": websiteId },
            inLanguage: "en",
          },
          {
            ...breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
            "@id": `${absoluteUrl("/contact")}#breadcrumb`,
          },
        ]}
      />
      <div className="container max-w-3xl mx-auto px-4 py-16 md:py-24 space-y-16">

        {/* Header */}
        <header className="space-y-5">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance leading-tight">
            Let’s discuss engineering responsibility.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            I am currently leading AI engineering work. I welcome selective conversations about ambitious technical responsibility, complex enterprise systems and research with a clear purpose.
          </p>
        </header>

        {/* Conversation Types */}
        <section aria-labelledby="conversations-heading" className="space-y-6">
          <h2 id="conversations-heading" className="text-xl font-bold text-foreground">
            Three reasons to start a conversation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conversationTypes.map((type) => (
              <div
                key={type.title}
                className="p-5 border border-border rounded-lg bg-card space-y-3"
              >
                <type.Icon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-foreground">{type.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Executive conversion: clear email first, direct booking second, optional embed. */}
        <section aria-labelledby="contact-heading" className="space-y-6 border-t border-border pt-12">
          <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">Make the first exchange useful</p>
          <h2 id="contact-heading" className="text-2xl font-bold text-foreground">Start with the problem, not a pitch.</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            A short note with the context, the engineering challenge and the type of responsibility you have in mind
            is enough. If a conversation is more useful, you can choose a 30-minute slot directly.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <a href="mailto:alejandrobgn@gmail.com?subject=Engineering%20leadership%20conversation"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/40">
              <span className="flex items-center gap-3 text-base font-semibold text-foreground"><Mail className="h-5 w-5 text-[#587f00] dark:text-signal-green" aria-hidden="true" /> Write directly</span>
              <span className="mt-3 text-sm leading-6 text-muted-foreground">Best for describing a role, system challenge or collaboration in advance.</span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground">alejandrobgn@gmail.com <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </a>
            <a href="https://calendly.com/alejandrobgn/30min" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/40">
              <span className="flex items-center gap-3 text-base font-semibold text-foreground"><CalendarDays className="h-5 w-5 text-[#587f00] dark:text-signal-green" aria-hidden="true" /> Book a conversation</span>
              <span className="mt-3 text-sm leading-6 text-muted-foreground">Thirty minutes to understand the context and decide whether there is a useful next step.</span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground">Open booking page <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </a>
          </div>
          <details className="group rounded-xl border border-border bg-card/30">
            <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-foreground hover:text-[#587f00] dark:hover:text-signal-green">
              Prefer to use the calendar here? Expand the embedded scheduler.
            </summary>
            <div className="h-[620px] border-t border-border">
              <iframe
                src="https://calendly.com/alejandrobgn/30min?embed_domain=alejandrobgn.vercel.app&embed_type=Inline"
                width="100%"
                height="100%"
                loading="lazy"
                title="Optional embedded booking calendar for a 30-minute conversation"
                className="bg-background"
              />
            </div>
          </details>
        </section>

        {/* Secondary channels */}
        <section aria-labelledby="channels-heading" className="space-y-4 border-t border-border pt-10">
          <h2 id="channels-heading" className="text-base font-semibold text-foreground">Other ways to reach me</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="gap-2">
              <a href="mailto:alejandrobgn@gmail.com">
                <Mail className="w-4 h-4" aria-hidden="true" />
                Email
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a
                href="https://www.linkedin.com/in/alejandro-bgn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                LinkedIn
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a
                href="https://github.com/jandromani"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                GitHub
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </Button>
          </div>
        </section>

        {/* Serious work note */}
        <div className="p-6 border border-border rounded-lg bg-card space-y-2">
          <p className="text-sm font-semibold text-foreground">A note on what I take on</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I focus on conversations involving real engineering ownership, explicit technical constraints and outcomes worth verifying. I am not advertising indiscriminate availability.
          </p>
        </div>

      </div>
    </div>
  )
}
