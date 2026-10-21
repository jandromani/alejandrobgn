import { RelatedEvidence } from "@/components/related-evidence"
import { notFound } from "next/navigation"
import { getArticleBySlug, pillarLabels, articles } from "@/data/writing"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import { getArticleWordCount, getDeepArticle } from "@/data/article-content"
import { LongformArticle } from "@/components/longform-article"
import { TechnicalArticle } from "@/components/technical-article"
import { RelatedSystems } from "@/components/related-systems"
import { ArticleSources } from "@/components/article-sources"
import { ArticleHeroSystem } from "@/components/article-hero-system"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, ogImageUrl, personId, websiteId } from "@/lib/seo"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return createPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/writing/${article.slug}`,
    ogKind: "article",
    ogSlug: article.slug,
    keywords: [pillarLabels[article.pillar], ...(article.linkedSystems ?? [])],
    article: {
      publishedTime: article.published,
      modifiedTime: article.updated ?? article.published,
      section: pillarLabels[article.pillar],
      tags: [pillarLabels[article.pillar], ...(article.linkedSystems ?? [])],
    },
  })
}

export default async function WritingArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  const content = getDeepArticle(slug)
  const isTechnicalEdition = ["governing-agentic-systems", "entropy-problem-llms", "avoiding-vendor-lock-in", "ai-platform-economics", "observability-agentic-systems", "building-in-public", "orchestration-patterns", "safety-alignment-systems"].includes(slug)
  const markdown = isTechnicalEdition
    ? readFileSync(join(process.cwd(), "content", "articles", `${slug}.md`), "utf8")
    : null

  if (!article || (!content && !markdown)) notFound()

  const publishedDate = new Date(article.published).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const wordCount = markdown
    ? markdown.split(/\s+/).filter(token => /[A-Za-z0-9]/.test(token)).length
    : getArticleWordCount(content!)
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 210))
  const updatedDate = article.updated && new Date(article.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const toc = markdown
    ? [...markdown.matchAll(/^#{1,3}\s+(.+)$/gm)].map(match => match[1].replace(/\*\*/g, "")).filter(title => title !== article.title)
    : content!.sections.map(section => section.title)
  const evidenceBoundaries: Record<string, string> = {
    "entropy-problem-llms": "The OMEGA generator and degradation dynamics in the supplied laboratory are synthetic. The notebook demonstrates control-loop integration, not a universal entropy metric or production efficacy.",
    "governing-agentic-systems": "This is an engineering operating model, not legal advice or a claim of automatic EU AI Act compliance. Classification and controls depend on the concrete system and use context.",
    "avoiding-vendor-lock-in": "AI Vendor Compare is a real public interface backed by a time-stamped snapshot. The daily agent graph is the target operating architecture, with current evidence and future controls separated.",
    "ai-platform-economics": "AI Vendor Compare is a public snapshot; LLMTRACE is a mock-adapter alpha; Entropic Core is a concept preview. Their combination is a proposed architecture, not an integrated production FinOps platform.",
    "observability-agentic-systems": "The named systems are real but separate artefacts at different maturity levels. This maps them to a target control plane without claiming one integrated production platform.",
    "building-in-public": "Project examples retain individual evidence labels: interface, snapshot, prototype, package output, anonymised trace or conceptual architecture.",
    "orchestration-patterns": "Portfolio systems identify concrete evidence at different maturity levels; they are not all deployed together as one production multi-agent platform.",
    "safety-alignment-systems": "This article does not claim clinical diagnosis, universal alignment measurement, automatic legal compliance or one integrated production safety platform.",
  }

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "BlogPosting",
            "@id": `${absoluteUrl(`/writing/${article.slug}`)}#article`,
            headline: article.title,
            description: article.summary,
            url: absoluteUrl(`/writing/${article.slug}`),
            mainEntityOfPage: absoluteUrl(`/writing/${article.slug}`),
            image: [ogImageUrl("article", article.slug)],
            datePublished: article.published,
            dateModified: article.updated ?? article.published,
            author: { "@id": personId },
            publisher: { "@id": personId },
            isPartOf: { "@id": `${absoluteUrl("/writing")}#blog` },
            inLanguage: "en",
            articleSection: pillarLabels[article.pillar],
            keywords: [pillarLabels[article.pillar], ...(article.linkedSystems ?? [])].join(", "),
            wordCount,
            timeRequired: `PT${readingMinutes}M`,
            about: (article.linkedSystems ?? []).map((name) => ({ "@type": "SoftwareApplication", name })),
          },
          {
            ...breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Writing", path: "/writing" },
              { name: article.title, path: `/writing/${article.slug}` },
            ]),
            "@id": `${absoluteUrl(`/writing/${article.slug}`)}#breadcrumb`,
          },
          {
            "@type": "WebPage",
            "@id": `${absoluteUrl(`/writing/${article.slug}`)}#webpage`,
            url: absoluteUrl(`/writing/${article.slug}`),
            name: article.title,
            description: article.summary,
            isPartOf: { "@id": websiteId },
            primaryImageOfPage: ogImageUrl("article", article.slug),
            breadcrumb: { "@id": `${absoluteUrl(`/writing/${article.slug}`)}#breadcrumb` },
          },
        ]}
      />
      <div className="min-h-screen bg-background">
        <ArticleHeroSystem article={article} publishedDate={publishedDate} updatedDate={updatedDate} wordCount={wordCount} readingMinutes={readingMinutes} toc={toc} evidenceBoundary={isTechnicalEdition ? evidenceBoundaries[slug] : undefined} />
      <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24 space-y-14">

        {markdown ? <TechnicalArticle markdown={markdown} articleSlug={slug} /> : <LongformArticle content={content!} />}

        {markdown && content && <ArticleSources sources={content.sources} />}

        {/* Linked Systems */}
        {article.linkedSystems && article.linkedSystems.length > 0 && <RelatedSystems names={article.linkedSystems} />}

        {/* Navigation */}
        <div className="border-t border-border pt-8 flex items-center justify-between gap-4">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/writing">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              All articles
            </Link>
          </Button>
          <Button asChild>
            <Link href="/contact">
              Start a conversation
              <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </div>

      </div>
      </div>
      <RelatedEvidence id={`writing:${article.slug}`} />
    </>
  )
}
