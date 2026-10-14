import type { Metadata } from "next"
import { WritingIndex } from "@/components/writing-index"
import { JsonLd } from "@/components/json-ld"
import { articles, pillarLabels } from "@/data/writing"
import { absoluteUrl, createPageMetadata, personId, websiteId } from "@/lib/seo"

const description = "Deep technical writing on agentic systems, AI governance, observability, orchestration, safety, platform economics, and building production AI in public."

export const metadata: Metadata = createPageMetadata({
  title: "AI Systems Writing",
  description,
  path: "/writing",
  ogKind: "writing",
  keywords: ["AI engineering articles", "agentic systems articles", "AI governance writing", "LLM observability"],
})

export default function WritingPage() {
  const sortedArticles = [...articles].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "Blog",
            "@id": `${absoluteUrl("/writing")}#blog`,
            url: absoluteUrl("/writing"),
            name: "AI Systems Writing by Alejandro BGN",
            description,
            inLanguage: "en",
            isPartOf: { "@id": websiteId },
            author: { "@id": personId },
          },
          {
            "@type": "ItemList",
            itemListElement: sortedArticles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/writing/${article.slug}`),
              name: article.title,
              description: article.summary,
              item: {
                "@type": "BlogPosting",
                headline: article.title,
                datePublished: article.published,
                dateModified: article.updated ?? article.published,
                articleSection: pillarLabels[article.pillar],
                author: { "@id": personId },
              },
            })),
          },
        ]}
      />
      <WritingIndex />
    </>
  )
}

