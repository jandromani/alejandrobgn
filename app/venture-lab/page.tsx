"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink, Github, ArrowRight } from "lucide-react"

const ventures = [
  {
    id: "agnosticengine",
    title: "Agnostic Engine",
    tagline: "Intent-to-product discovery runtime",
    description:
      "A public Shopify and WooCommerce surface that turns shopper intent into catalog actions, product clicks, and assisted conversion.",
    status: "active",
    focus: ["Catalog Intelligence", "Shopify + WooCommerce", "Assisted Conversion"],
    tech: ["Next.js", "Shopify", "WooCommerce"],
    github: null,
    live: "https://agnosticengine.vercel.app/",
    blog: null,
    principle: "Intent should end in action",
  },
  {
    id: "psycheos",
    title: "PsycheOS",
    tagline: "AI safety operating surface",
    description:
      "An open-source public surface for adversarial protocols, personas, environments, and guardrails around LLM behaviour.",
    status: "active",
    focus: ["Adversarial Protocols", "Personas & Environments", "Browser-local Guardrails"],
    tech: ["TypeScript", "browser runtime", "AI safety"],
    github: null,
    live: "https://psycheos-psi.vercel.app/",
    blog: null,
    principle: "Governance is runtime",
  },
  {
    id: "llmtrace",
    title: "LLMTRACE",
    tagline: "Open-source LLM observability toolkit",
    description:
      "A Python toolkit for tracing prompts, responses, tokens, costs, metrics, feedback, and errors across local LLM applications.",
    status: "alpha",
    focus: ["Token Accounting", "Latency Analysis", "Cost Tracking", "Session Tracing"],
    tech: ["Python", "Flask", "SQLite"],
    github: "https://github.com/jandromani/llmtrace",
    live: null,
    blog: null,
    principle: "Observable or imaginary",
  },
  {
    id: "entropiccore",
    title: "Entropic Core",
    tagline: "Entropy regulation for AI agents",
    description:
      "A public package surface for monitoring agent entropy, detecting anomalies, and intervening before hallucinations, cost explosions, or context drift cascade.",
    status: "early",
    focus: ["Entropy Monitoring", "Anomaly Detection", "Package Proof", "Bounded Controls"],
    tech: ["Python", "asyncio", "runtime controls"],
    github: null,
    live: "https://v0-entropic-core-final.vercel.app/",
    blog: null,
    principle: "Safety needs mechanisms",
  },
  {
    id: "aivendorcompare",
    title: "AI Vendor Compare",
    tagline: "Model pricing, claims & drift snapshot",
    description:
      "A public comparison surface for provider pricing, claim verification, lineup drift, and runtime freshness. The current page explicitly discloses when its snapshot is stale.",
    status: "public",
    focus: ["Claim Verification", "Cost Analysis", "Lineup Drift", "Snapshot Freshness"],
    tech: ["TypeScript", "React", "Next.js"],
    github: null,
    live: "https://ai-vendor-compare.vercel.app/",
    blog: null,
    principle: "Cost is architecture",
  },
  {
    id: "aiactmiddleware",
    title: "AI Act Middleware",
    tagline: "EU AI Act compliance layer",
    description:
      "A public prototype for evaluating prompts against EU AI Act-inspired controls, with demo scenarios, audit logging, and human-review surfaces.",
    status: "research",
    focus: ["Impact Assessment", "Explainability Layer", "High-Risk Controls", "Compliance Logging"],
    tech: ["Python", "FastAPI", "SQLAlchemy"],
    github: null,
    live: "https://aiactmiddleware.vercel.app/chat",
    blog: null,
    principle: "Governance is runtime",
  },
]

const statuses = {
  active: { label: "Active", color: "bg-green-950/50 border-green-500/30 text-green-600" },
  alpha: { label: "Alpha", color: "bg-blue-950/50 border-blue-500/30 text-blue-600" },
  early: { label: "Early", color: "bg-purple-950/50 border-purple-500/30 text-purple-600" },
  public: { label: "Public", color: "bg-cyan-950/50 border-cyan-500/30 text-cyan-600" },
  research: { label: "Research", color: "bg-amber-950/50 border-amber-500/30 text-amber-600" },
}

export default function VentureLabPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-12 md:py-20 space-y-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider">The Lab</p>
          <h1 className="text-4xl md:text-5xl font-bold text-neon-light">Venture Lab</h1>
          <p className="text-lg text-muted-foreground">
            Systems and frameworks for building reliable AI in production. Open-source projects grounded in real architectural principles.
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6 border-b border-neon/20 pb-12"
        >
          <Card className="border-neon/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                These are not polished products. They're working systems built to solve real problems we encountered building AI infrastructure. Each one is grounded in
                one of the five architectural principles—they exist to prove those principles work in practice.
              </p>
              <p>
                Some are open-source and production-ready. Some are alpha. Some are research prototypes. All are built with the same philosophy: measurable, governable,
                cost-aware, safe, and vendor-independent.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Ventures */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-neon-light">Systems in Development</h2>
            <p className="text-muted-foreground">Click any system to see the details</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {ventures.map((venture, index) => {
              const statusConfig = statuses[venture.status as keyof typeof statuses] || statuses.research
              return (
                <motion.div
                  key={venture.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                >
                  <Link href={`/systems/${venture.id}`} className="group">
                    <Card className="h-full border-neon/20 hover:border-neon/50 transition-all duration-300 bg-card/50 backdrop-blur-sm group-hover:bg-card/80">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-xl font-semibold text-neon-light group-hover:text-neon transition-colors">
                                {venture.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className={`text-xs border ${statusConfig.color}`}
                              >
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-neon-light/70 font-medium">{venture.tagline}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-neon-light/50 group-hover:text-neon group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                        </div>

                        <p className="text-muted-foreground">{venture.description}</p>

                        <div className="space-y-3 pt-2 border-t border-neon/20">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Focus Areas</p>
                            <div className="flex flex-wrap gap-2">
                              {venture.focus.map((area) => (
                                <Badge key={area} variant="outline" className="text-xs border-neon/30 bg-neon/5">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Tech Stack</p>
                            <div className="flex flex-wrap gap-1">
                              {venture.tech.map((tech) => (
                                <span key={tech} className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-neon/20">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Based on Principle</p>
                            <p className="text-sm text-neon">{venture.principle}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          {(venture.github || venture.live) && (
                            <a
                              href={venture.github || venture.live || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-neon-light transition-colors"
                            >
                              {venture.github ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                              {venture.github ? "Repository" : "Public surface"}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Philosophy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6 border-t border-neon/20 pt-12"
        >
          <h2 className="text-3xl font-bold text-neon-light">Why These Projects?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-neon/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-neon-light mb-2">Grounded in Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Every system is built because we encountered the problem in production. No theoretical exercises.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neon/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-neon-light mb-2">Open by Default</h3>
                <p className="text-sm text-muted-foreground">
                  Code is published. Ideas are shared. Problems are solved collaboratively with the community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neon/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-neon-light mb-2">Principles First</h3>
                <p className="text-sm text-muted-foreground">
                  Each project demonstrates one or more architectural principles. Architecture drives code, not the reverse.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neon/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-neon-light mb-2">Collaboratively Developed</h3>
                <p className="text-sm text-muted-foreground">
                  These systems are built with partners, customers, and the community. Open to collaboration and feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center py-12 border-t border-neon/20"
        >
          <p className="text-muted-foreground mb-4">Want to work on these problems together?</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/thesis"
              className="px-6 py-2 bg-neon hover:bg-neon-light text-background font-semibold rounded-lg transition-colors"
            >
              Read the Thesis
            </Link>
            <a
              href="mailto:abaratas@ucm.es"
              className="px-6 py-2 border border-neon text-neon hover:bg-neon/20 font-semibold rounded-lg transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
