"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

const researchAreas = [
  {
    title: "AI Governance & Compliance",
    description:
      "Implementing EU AI Act requirements and designing governance layers that don't impede velocity. How do you make compliance systematic rather than bureaucratic?",
    status: "active",
  },
  {
    title: "Agentic Systems Design",
    description:
      "Building autonomous agents that operate safely within bounded domains. Orchestration patterns, resource management, and decision-making frameworks.",
    status: "active",
  },
  {
    title: "LLM Observability at Scale",
    description:
      "Token-level tracing, cost optimization, and quality metrics for LLM-powered systems. Making invisible compute visible.",
    status: "active",
  },
  {
    title: "Multi-Model Routing & Optimization",
    description:
      "Intelligent routing across different LLM providers based on cost, latency, capability, and availability. The economics of LLM consumption.",
    status: "active",
  },
  {
    title: "Stability & Entropy Detection",
    description:
      "Detecting system degradation before it impacts users. Measuring and predicting model decay, data drift, and inference variance.",
    status: "exploration",
  },
  {
    title: "Safety & Alignment Frameworks",
    description:
      "Building guardrails for agents without handcuffing their capabilities. How do you make safety orthogonal to functionality?",
    status: "exploration",
  },
]

const questions = [
  "How do we build AI systems that are profitable, compliant, and trustworthy at scale?",
  "What does observability look like for systems that are inherently stochastic?",
  "How do we architect agentic systems that balance autonomy with safety?",
  "Can we make AI governance a competitive advantage instead of a compliance checkbox?",
  "What's the right mental model for thinking about LLM costs and performance tradeoffs?",
]

const resources = [
  {
    title: "Papers & Research",
    items: [
      { name: "LLMTRACE: Open Observability for LLM Systems", url: "#" },
      { name: "Governance as Architecture", url: "#" },
      { name: "Agentic Systems: Design Patterns for Safe Autonomy", url: "#" },
    ],
  },
  {
    title: "Tools & Frameworks",
    items: [
      { name: "LLMTRACE on PyPI", url: "https://pypi.org/project/llmtrace/" },
      { name: "Agnostic Engine", url: "https://agnosticengine.vercel.app/" },
      { name: "AI Act Middleware", url: "https://aiactmiddleware.vercel.app/chat" },
    ],
  },
  {
    title: "Open Questions",
    items: [
      { name: "How should we measure system intelligence in production?", url: "#" },
      { name: "What's the optimal granularity for observability?", url: "#" },
      { name: "Can compliance be automated without sacrificing safety?", url: "#" },
    ],
  },
]

export default function LabPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-light">Laboratory</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Active research and experimentation in AI systems. Building in public, learning from constraints, and
            documenting what works.
          </p>
        </motion.div>

        {/* Research Areas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-neon-light">Research Areas</h2>
          <div className="space-y-4">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <Card className="border-neon/20 bg-card/50 backdrop-blur-sm hover:border-neon/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold text-neon-light">{area.title}</h3>
                      <Badge variant={area.status === "active" ? "default" : "secondary"} className="h-fit">
                        {area.status === "active" ? "Active" : "Exploring"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Open Questions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 py-12 border-t border-b border-neon/20"
        >
          <h2 className="text-3xl font-bold text-neon-light">Open Questions</h2>
          <div className="space-y-3">
            {questions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                className="p-4 bg-neon/5 border border-neon/20 rounded-lg"
              >
                <p className="text-foreground italic">{question}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-neon-light">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + sectionIndex * 0.1 }}
              >
                <Card className="h-full border-neon/20 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-neon-light mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.url && item.url !== "#" ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${item.name} (opens in new tab)`}
                              className="text-sm text-neon hover:text-neon-light transition-colors flex items-center gap-2"
                            >
                              {item.name}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">{item.name}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Collaboration */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center py-12 border-t border-neon/20"
        >
          <h2 className="text-2xl font-bold mb-4">Have insights on these topics?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Always open to collaborating, debating ideas, or exploring new directions in AI systems research.
          </p>
          <a
            href="mailto:abaratas@ucm.es"
            className="inline-block px-6 py-2 bg-neon hover:bg-neon-light text-background font-semibold rounded-lg transition-colors"
          >
            Get in touch
          </a>
        </motion.section>
      </div>
    </div>
  )
}
