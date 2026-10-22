import { RelatedEvidence } from "@/components/related-evidence"
import { Mail, Linkedin, Github, Building2, Users, Lightbulb, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const contactDescription = "Professional contact for technical leadership, engineering research and publications by Alejandro Baratas."

export const metadata: Metadata = createPageMetadata({
  title: "Contact Alejandro Baratas",
  description: contactDescription,
  path: "/contact",
  ogKind: "contact",
  keywords: ["AI Tech Lead Madrid", "engineering research", "agentic systems", "technical leadership"],
})

const conversationTypes = [
  {
    title: "Technical leadership",
    description: "Professional exchange about architecture ownership, team enablement and difficult delivery decisions.",
    Icon: Users,
  },
  {
    title: "Enterprise AI transformation",
    description: "Sharing lessons from agent-assisted engineering, modernization and governance in delivery organisations.",
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
            I currently work as an AI Tech Lead at knowmad mood. This is my personal portfolio: a place to share engineering work and research, and to connect with peers about technical leadership, publications and open-source projects.
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

        {/* Personal professional contact. */}
        <section aria-labelledby="contact-heading" className="space-y-6 border-t border-border pt-12">
          <p className="font-mono text-xs uppercase tracking-wider text-[#587f00] dark:text-signal-green">Professional contact</p>
          <h2 id="contact-heading" className="text-2xl font-bold text-foreground">Share an idea or a question.</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            A short note about the article, project or engineering topic is enough to start a conversation.
          </p>
          <div className="max-w-xl">
            <a href="mailto:alejandrobgn@gmail.com?subject=Engineering%20leadership%20conversation"
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/40">
              <span className="flex items-center gap-3 text-base font-semibold text-foreground"><Mail className="h-5 w-5 text-[#587f00] dark:text-signal-green" aria-hidden="true" /> Write directly</span>
              <span className="mt-3 text-sm leading-6 text-muted-foreground">For professional exchange, research and publications.</span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground">alejandrobgn@gmail.com <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </a>
          </div>
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

        {/* Scope note */}
        <div className="p-6 border border-border rounded-lg bg-card space-y-2">
          <p className="text-sm font-semibold text-foreground">About this site</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This site documents my professional experience and independent experiments. It is not an offer of consulting services or a channel for engagements on behalf of my employer.
          </p>
        </div>

      </div>
      <RelatedEvidence id="index:contact" />
    </div>
  )
}
