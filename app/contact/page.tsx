import { Mail, Linkedin, Github, Building2, Shield, BarChart3, Users, Lightbulb, Mic, CalendarDays, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

const contactDescription = "Contact Alejandro Baratas for AI architecture reviews, agent governance, technical leadership, AI platform strategy, and serious product collaborations."

export const metadata: Metadata = createPageMetadata({
  title: "Contact Alejandro Baratas",
  description: contactDescription,
  path: "/contact",
  ogKind: "contact",
  keywords: ["AI architecture consultant", "AI governance advisor", "AI Tech Lead Madrid", "agentic systems consulting"],
})

const conversationTypes = [
  {
    title: "Architecture review",
    description:
      "Technical review of AI system design, governance frameworks, or platform architecture.",
    Icon: Building2,
  },
  {
    title: "Agent governance",
    description:
      "Implementing safety, compliance, and observability for agentic systems in production.",
    Icon: Shield,
  },
  {
    title: "AI platform strategy",
    description:
      "Building sustainable, economically viable AI platforms for enterprise or startup.",
    Icon: BarChart3,
  },
  {
    title: "Technical leadership",
    description:
      "CTO conversations, technical strategy, and scaling AI engineering teams.",
    Icon: Users,
  },
  {
    title: "Product & prototype review",
    description:
      "Evaluating AI product concepts or reviewing technical implementations.",
    Icon: Lightbulb,
  },
  {
    title: "Workshop or keynote",
    description:
      "Speaking engagement about AI systems, governance, or architecture for your team or event.",
    Icon: Mic,
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
            Bring me the system that is difficult to explain.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            If you have a system that is broken, an AI deployment that does not make sense, or an architecture challenge that keeps you up at night — let&apos;s talk.
          </p>
        </header>

        {/* Conversation Types */}
        <section aria-labelledby="conversations-heading" className="space-y-6">
          <h2 id="conversations-heading" className="text-xl font-bold text-foreground">
            What we can talk about
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

        {/* Primary CTA — calendar */}
        <section aria-labelledby="contact-heading" className="space-y-6 border-t border-border pt-12">
          <h2 id="contact-heading" className="text-xl font-bold text-foreground">Book a session</h2>
          <p className="text-muted-foreground max-w-xl">
            Pick a slot and we talk. 30 minutes. No email back-and-forth.
          </p>

          {/* Calendly embed */}
          <div className="rounded-lg overflow-hidden border border-border">
            <div className="aspect-video md:aspect-auto md:h-[600px]">
              <iframe
                src="https://calendly.com/alejandrobgn/30min?embed_domain=alejandrobgn.vercel.app&embed_type=Inline"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book a 30-minute session with Alejandro"
                className="bg-background"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Calendar not loading?{" "}
            <a
              href="https://calendly.com/alejandrobgn/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Open Calendly directly
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </p>
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
            Whether you need architecture review, technical leadership, or someone to help you think through an AI system — I am interested in conversations where the work is technically challenging and the outcomes matter.
          </p>
        </div>

      </div>
    </div>
  )
}
