import { portfolioEdges, portfolioNodes } from "@/lib/portfolio-graph"
import { absoluteUrl } from "@/lib/seo"

/**
 * Public, anonymized editorial graph. Stable IDs and canonical URLs allow
 * semantic discovery and tooling without turning thematic links into claims
 * of production dependencies.
 */
export function GET() {
  return Response.json(
    {
      schema: "https://alejandrobgn.vercel.app/atlas/graph.json",
      version: 2,
      relatedClaims: absoluteUrl("/evidence/claims.json"),
      updated: "2026-10-21",
      semantics: "Curated editorial relationships; not runtime dependencies or independent verification.",
      nodes: portfolioNodes.map((node) => ({ ...node, url: absoluteUrl(node.href) })),
      edges: portfolioEdges,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600",
        "X-Robots-Tag": "noindex",
        "Access-Control-Allow-Origin": "*",
      },
    },
  )
}
