"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

const principles = [
  {
    number: "01",
    title: "Model-agnostic by design",
    description:
      "Your application logic shouldn't depend on any single model vendor. Build in abstractions from day one, not when you're forced to migrate.",
    expanded:
      "Lock-in is expensive. When your system depends on OpenAI's specific API, switching costs money and effort. Agnostic design means you keep leverage: you can switch providers, use multiple models for different tasks, or deploy local alternatives when regulations require it. This isn't theoretical—it's practical economics.",
    systems: ["agnosticengine", "aivendorcompare"],
  },
  {
    number: "02",
    title: "Governance is runtime",
    description:
      "Compliance, safety, and control can't be added later. They need to be architectural concerns, embedded in how your system actually operates.",
    expanded:
      "Governance bolted onto the side is either ineffective or suffocating. When compliance is architectural, it becomes a feature, not a burden. The AI Act requirement to explain decisions? That's built into observability. Permission checks? That's part of the agent's execution. This approach makes systems safer and faster, not slower.",
    systems: ["aiactmiddleware", "psycheos"],
  },
  {
    number: "03",
    title: "Observable or imaginary",
    description:
      "If you can't measure it, you can't trust it. Add observability first, then scale. Invisible systems fail in ways you'll only discover in production.",
    expanded:
      "Observability isn't monitoring. It's the fundamental ability to understand your system's behavior from its outputs. Cost per request. Latency distributions. Model routing decisions. Agent action sequences. Token counts. Cache hits. Which models succeeded and which failed. Without this visibility, you're flying blind. Performance optimization becomes guess work. Cost management becomes luck.",
    systems: ["llmtrace", "entropiccore"],
  },
  {
    number: "04",
    title: "Safety needs mechanisms",
    description:
      "Safety isn't a promise; it's a measurable property enforced by the system. Without mechanisms—rate limits, timeouts, circuit breakers—safety is just hope.",
    expanded:
      "An AI system that might behave unsafely 0.1% of the time looks safe in testing. But in production with millions of requests, that 0.1% happens constantly. Safety needs mechanisms: circuit breakers that cut off failing systems, timeouts that prevent infinite loops, rate limits that prevent runaway cost, assertion checks that verify outputs make sense. These aren't restrictions—they're guardrails that let systems operate faster.",
    systems: ["psycheos", "entropiccore"],
  },
  {
    number: "05",
    title: "Cost is architecture",
    description:
      "Every architectural decision has cost implications. Model routing, inference batching, caching, and quantization aren't optimizations—they're foundational.",
    expanded:
      "An unoptimized LLM system might cost 10x more than an equivalent optimized one. That's not a tuning problem—it's an architecture problem. Which models do you route to for which tasks? How do you batch requests? What data do you cache? How do you quantize for efficiency? These decisions get baked into the system design. Changing them later is expensive. Design for cost from the start.",
    systems: ["agnosticengine", "aivendorcompare"],
  },
]

export default function ThesisPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <p className="text-sm text-foreground/80 uppercase tracking-wider">Working Thesis</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
            AI doesn't fail only in the model.
          </h1>
          <p className="text-xl text-muted-foreground">
            It fails in the system surrounding it.
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
                The AI field spends enormous energy optimizing models. Bigger, faster, more capable models get most of the attention and investment.
                But production AI systems fail primarily for systemic reasons, not model reasons.
              </p>
              <p>
                A 99% accurate model integrated into a cost-unaware system burns money. A powerful model routed to expensive vendors for trivial tasks is wasteful. A model
                without observability is invisible. A system without governance is uncontrollable. A system without safety mechanisms is dangerous.
              </p>
              <p>
                These are architectural problems, not model problems. They're solved through design choices made early, not through better prompting or fine-tuning later.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Five Principles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-12"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-foreground">Five Principles</h2>
            <p className="text-muted-foreground">The foundation of reliable AI systems</p>
          </div>

          <div className="space-y-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
              >
                <Card className="border-neon/20 hover:border-neon/50 transition-colors bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl font-bold text-foreground/85 flex-shrink-0">{principle.number}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-1">{principle.title}</h3>
                          <p className="text-muted-foreground">{principle.description}</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground leading-relaxed">{principle.expanded}</p>
                      </div>

                      {principle.systems.length > 0 && (
                        <div className="pt-3 border-t border-neon/20 space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">See this principle in practice:</p>
                          <div className="flex flex-wrap gap-2">
                            {principle.systems.map((slug) => {
                              const systemNames: Record<string, string> = {
                                agnosticengine: "Agnostic Engine",
                                aivendorcompare: "AI Vendor Compare",
                                aiactmiddleware: "AI Act Middleware",
                                psycheos: "PsycheOS",
                                llmtrace: "LLMTRACE",
                                entropiccore: "Entropic Core",
                              }
                              return (
                                <Link
                                  key={slug}
                                  href={`/systems/${slug}`}
                                  className="text-xs bg-neon/10 border border-neon/30 text-foreground hover:bg-neon/20 rounded px-2 py-1 transition-colors flex items-center gap-1"
                                >
                                  {systemNames[slug]}
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Implications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6 border-t border-b border-neon/20 py-12"
        >
          <h2 className="text-3xl font-bold text-foreground">Implications for Builders</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-neon/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">For Teams</h3>
                <p className="text-sm text-muted-foreground">
                  Architectural thinking matters more than raw engineering output. A small team with good architecture beats a large team with poor architecture.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neon/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">For Hiring</h3>
                <p className="text-sm text-muted-foreground">
                  Look for people who think systematically. AI expertise without systems thinking produces brittle systems that fail in production.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neon/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">For Investment</h3>
                <p className="text-sm text-muted-foreground">
                  Value teams that ship working systems, not teams that optimize metrics. Production viability is rarer than benchmark scores.
                </p>
              </CardContent>
            </Card>

            <Card className="border-neon/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">For Governance</h3>
                <p className="text-sm text-muted-foreground">
                  Regulatory compliance should be treated as architecture, not bureaucracy. Good governance makes systems better, not slower.
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
          className="text-center py-12"
        >
          <p className="text-muted-foreground mb-4">Want to explore how these principles work in practice?</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/systems"
              className="px-6 py-2 bg-neon hover:bg-neon-light text-background font-semibold rounded-lg transition-colors"
            >
              See the Systems
            </Link>
            <Link
              href="/experience"
              className="px-6 py-2 border border-neon text-foreground hover:bg-neon/20 font-semibold rounded-lg transition-colors"
            >
              Learn How I Build
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
