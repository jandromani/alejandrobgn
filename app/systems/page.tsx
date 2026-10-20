import { RelatedEvidence } from "@/components/related-evidence"
import type { Metadata } from "next"
import { SystemsIndex } from "@/components/systems-index"
import { JsonLd } from "@/components/json-ld"
import { systems } from "@/lib/systems-data"
import { absoluteUrl, createPageMetadata, personId, websiteId } from "@/lib/seo"

const description = "A catalogue of AI governance, agent orchestration, observability, reliability, safety, intelligence, and vertical product systems—with evidence labels and honest limits."

export const metadata: Metadata = createPageMetadata({
  title: "AI Systems Catalogue",
  description,
  path: "/systems",
  ogKind: "systems",
  keywords: ["AI systems portfolio", "agentic systems projects", "AI governance projects", "AI observability tools"],
})

export default function SystemsPage() {
  const orderedSystems = [...systems].sort((a, b) => a.order - b.order)

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/systems")}#collection`,
            url: absoluteUrl("/systems"),
            name: "AI Systems Catalogue",
            description,
            isPartOf: { "@id": websiteId },
            about: { "@id": personId },
            inLanguage: "en",
          },
          {
            "@type": "ItemList",
            numberOfItems: orderedSystems.length,
            itemListElement: orderedSystems.map((system, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/systems/${system.slug}`),
              name: system.name,
              description: system.shortDescription,
            })),
          },
        ]}
      />
      <SystemsIndex />
      <RelatedEvidence id="index:systems" />
    </>
  )
}
