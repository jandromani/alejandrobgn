import { ImageResponse } from "next/og"
import { getArticleBySlug, pillarLabels } from "@/data/writing"
import { getEvidenceLabel, getSystemBySlug } from "@/lib/systems-data"
import { siteConfig, type OgImageKind } from "@/lib/seo"

export const runtime = "nodejs"

const sectionContent: Record<
  Exclude<OgImageKind, "article" | "system">,
  { eyebrow: string; title: string; subtitle: string; signal: string; stats: string[] }
> = {
  profile: {
    eyebrow: "ALEJANDRO BARATAS · AI TECH LEAD",
    title: "I put AI-assisted engineering into use with enterprise teams.",
    subtitle: "knowmad mood · Madrid / remote · Human quality gates",
    signal: "#b8ff5a",
    stats: ["Enterprise delivery", "Reviewable changes", "11+ years engineering"],
  },
  systems: {
    eyebrow: "AI SYSTEMS STUDIO",
    title: "Systems, not demos.",
    subtitle: "Runtimes, governance layers, observability tooling and vertical AI products.",
    signal: "#22d3ee",
    stats: ["Public surfaces", "Evidence-labelled previews", "Honest limits"],
  },
  writing: {
    eyebrow: "TECHNICAL FIELD NOTES",
    title: "What production AI teaches when the demo ends.",
    subtitle: "Long-form engineering on governance, orchestration, safety, economics and reliability.",
    signal: "#a78bfa",
    stats: ["8 deep technical articles", "Architectures and diagrams", "Sources and evidence"],
  },
  evolution: {
    eyebrow: "AI CO-EVOLUTION · JAN 2023 — JUL 2026",
    title: "From CONTINUA to control planes.",
    subtitle: "A public-safe technical record of increasingly capable human–AI collaboration.",
    signal: "#fbbf24",
    stats: ["184 artefacts", "133 confirmed", "43 months"],
  },
  experience: {
    eyebrow: "PROFESSIONAL EXPERIENCE",
    title: "From GIS and enterprise backends to governed AI systems.",
    subtitle: "Technical leadership across software engineering, platforms and applied AI.",
    signal: "#b8ff5a",
    stats: ["Tech Lead AI", "11+ years engineering", "Madrid · Remote"],
  },
  about: {
    eyebrow: "ABOUT ALEJANDRO",
    title: "Geographer’s systems thinking. Engineer’s execution.",
    subtitle: "AI Tech Lead, systems architect and platform builder.",
    signal: "#22d3ee",
    stats: ["Agentic systems", "AI governance", "Platform engineering"],
  },
  contact: {
    eyebrow: "START A TECHNICAL CONVERSATION",
    title: "Bring me the system that is difficult to explain.",
    subtitle: "Architecture reviews · Agent governance · AI platform strategy",
    signal: "#b8ff5a",
    stats: ["Madrid / Remote", "Advisory", "Technical leadership"],
  },
}

function safeKind(value: string | null): OgImageKind {
  const allowed: OgImageKind[] = ["profile", "article", "system", "systems", "writing", "evolution", "experience", "about", "contact"]
  return allowed.includes(value as OgImageKind) ? (value as OgImageKind) : "profile"
}

function clampText(value: string, limit: number) {
  if (value.length <= limit) return value
  const shortened = value.slice(0, limit + 1).replace(/\s+\S*$/, "").trim()
  return `${shortened}…`
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const kind = safeKind(url.searchParams.get("type"))
  const slug = url.searchParams.get("slug") ?? ""

  let eyebrow: string
  let title: string
  let subtitle: string
  let signal: string
  let stats: string[]
  let visualLabels = ["INTENT", "CONTROL", "RUNTIME", "EVIDENCE"]

  if (kind === "article") {
    const article = getArticleBySlug(slug)
    if (!article) return new Response("Unknown article", { status: 404 })
    eyebrow = `${pillarLabels[article.pillar].toUpperCase()} · TECHNICAL FIELD NOTE`
    title = article.title
    subtitle = article.summary
    signal = "#a78bfa"
    stats = [
      `${article.wordCount.toLocaleString("en-US")} words`,
      `${Math.max(1, Math.ceil(article.wordCount / 210))} min read`,
      article.updated ? `Updated ${article.updated}` : `Published ${article.published}`,
    ]
    const articleStages: Record<string, string[]> = {
      "governing-agentic-systems": ["POLICY", "CONTROL", "RUNTIME", "EVIDENCE"],
      "entropy-problem-llms": ["STATE", "DRIFT", "ENVELOPE", "INTERVENE"],
      "avoiding-vendor-lock-in": ["DISCOVER", "NORMALISE", "VERIFY", "PUBLISH"],
      "ai-platform-economics": ["PRICE", "TRACE", "OUTCOME", "MARGIN"],
      "observability-agentic-systems": ["IDENTITY", "ACTION", "SIDE EFFECT", "TRACE"],
      "building-in-public": ["CLAIM", "BOUNDARY", "EVIDENCE", "UPDATE"],
      "orchestration-patterns": ["CONTRACT", "ROUTE", "EXECUTE", "TERMINATE"],
      "safety-alignment-systems": ["CAPABILITY", "AUTHORITY", "MONITOR", "RECOVER"],
    }
    visualLabels = articleStages[slug] ?? visualLabels
  } else if (kind === "system") {
    const system = getSystemBySlug(slug)
    if (!system) return new Response("Unknown system", { status: 404 })
    eyebrow = `${system.category.toUpperCase()} · ${system.role.toUpperCase()}`
    title = system.name
    subtitle = `${system.tagline}. ${system.shortDescription}`
    signal = system.status === "Live System" || system.status === "Public Demo" ? "#b8ff5a" : system.status === "Open Source" ? "#22d3ee" : "#fbbf24"
    stats = [
      system.status,
      system.evidence ? getEvidenceLabel(system.evidence) : "Technical case study",
      system.technologies.slice(0, 3).join(" · "),
    ]
  } else {
    const content = sectionContent[kind]
    eyebrow = content.eyebrow
    title = content.title
    subtitle = content.subtitle
    signal = content.signal
    stats = content.stats
    if (kind === "profile" || kind === "about") visualLabels = ["GEOGRAPHY", "SOFTWARE", "PLATFORMS", "PRODUCTION AI"]
    if (kind === "writing") visualLabels = ["GOVERNANCE", "OBSERVABILITY", "ECONOMICS", "SAFETY"]
    if (kind === "evolution") visualLabels = ["CONTEXT", "TOOLS", "AGENTS", "CONTROL PLANES"]
    if (kind === "experience") visualLabels = ["GIS", "BACKENDS", "PLATFORMS", "PRODUCTION AI"]
  }

  const titleSize = title.length > 72 ? 54 : title.length > 52 ? 62 : title.length > 34 ? 70 : 80

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#090b0f",
          color: "#f5f7fa",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: `radial-gradient(circle at 78% 18%, ${signal}22 0%, transparent 34%), radial-gradient(circle at 22% 92%, ${signal}12 0%, transparent 34%)`,
          }}
        />
        {[80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120].map((x) => (
          <div key={`x-${x}`} style={{ position: "absolute", left: x, top: 0, width: 1, height: "100%", background: "#ffffff0a" }} />
        ))}
        {[70, 140, 210, 280, 350, 420, 490, 560].map((y) => (
          <div key={`y-${y}`} style={{ position: "absolute", left: 0, top: y, width: "100%", height: 1, background: "#ffffff0a" }} />
        ))}

        <div style={{ position: "absolute", right: 12, top: 118, width: 355, height: 375, display: "flex" }}>
          <div style={{ position: "absolute", left: 70, top: 32, bottom: 26, width: 1, borderLeft: `1px dashed ${signal}55`, display: "flex" }} />
          {visualLabels.map((label, i) => {
            const layerColor = i === 0 ? "#b8ff5a" : i === 1 ? "#22d3ee" : i === 2 ? "#a78bfa" : signal
            return (
              <div key={label} style={{ position: "absolute", left: 8 + i * 8, top: i * 84, width: 330 - i * 8, height: 68, display: "flex" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 330 - i * 8, height: 68, display: "flex", border: `1px solid ${layerColor}88`, background: `${layerColor}0d`, clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)" }}><div style={{ display: "flex", width: 1, height: 1, background: "transparent" }} /></div>
                <div style={{ position: "absolute", left: 32, top: 28, display: "flex", width: 245, fontFamily: "monospace", fontSize: 10, color: layerColor }}>{String(i + 1).padStart(2, "0")} / {label}</div>
                <div style={{ position: "absolute", right: 42 + i * 18, top: 27, width: 9, height: 9, borderRadius: 99, background: layerColor, boxShadow: `0 0 18px ${layerColor}`, display: "flex" }} />
              </div>
            )
          })}
          {[0, 1, 2, 3, 4].map((i) => <div key={`particle-${i}`} style={{ position: "absolute", right: 12 + i * 41, bottom: 9 + (i % 2) * 18, width: i === 2 ? 5 : 3, height: i === 2 ? 5 : 3, borderRadius: 99, background: i % 2 ? "#22d3ee" : signal, display: "flex" }} />)}
          <div style={{ position: "absolute", left: 18, right: 5, bottom: 0, height: 1, background: `linear-gradient(90deg, ${signal}, #22d3ee88, transparent)`, display: "flex" }} />
        </div>

        <div style={{ position: "absolute", left: 58, top: 48, right: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center", background: signal, color: "#090b0f", fontSize: 16, fontWeight: 900 }}>
              AB
            </div>
            <div style={{ display: "flex", marginLeft: 14, fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>ALEJANDRO BARATAS</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 14, color: "#9ea7b3" }}>
            <div style={{ width: 7, height: 7, borderRadius: 99, marginRight: 8, background: signal, boxShadow: `0 0 18px ${signal}` }} />
            AI TECH LEAD
          </div>
        </div>

        <div style={{ position: "absolute", left: 72, right: 72, top: 142, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", color: signal, fontFamily: "monospace", fontSize: 15, fontWeight: 800, letterSpacing: "0.16em" }}>
            <div style={{ width: 34, height: 2, marginRight: 13, background: signal }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", marginTop: 26, maxWidth: 700, fontSize: titleSize, lineHeight: 0.98, letterSpacing: "-0.055em", fontWeight: 900 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 25, maxWidth: 640, fontSize: 22, lineHeight: 1.35, color: "#aeb8c5" }}>
            {clampText(subtitle, 150)}
          </div>
        </div>

        <div style={{ position: "absolute", left: 58, right: 58, bottom: 48, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #ffffff1f", paddingTop: 23 }}>
          <div style={{ display: "flex" }}>
            {stats.map((stat, index) => (
              <div key={stat} style={{ display: "flex", alignItems: "center", marginRight: 28, fontFamily: "monospace", fontSize: 14, color: index === 0 ? signal : "#9ea7b3" }}>
                {index > 0 && <div style={{ width: 3, height: 3, borderRadius: 99, marginRight: 28, background: "#ffffff42" }} />}
                {stat}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontFamily: "monospace", fontSize: 14, color: "#d7dde5" }}>alejandrobgn.vercel.app</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  )
}
