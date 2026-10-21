import type { Metadata } from "next"

export const siteConfig = {
  name: "Alejandro Baratas",
  legalName: "Alejandro Baratas García-Nieto",
  title: "Alejandro Baratas — AI Tech Lead | Enterprise AI Engineering",
  description:
    "Alejandro Baratas is an AI Tech Lead in Madrid helping enterprise engineering teams put project-aware agents, reviewable changes and human quality gates into use.",
  url: "https://alejandrobgn.vercel.app",
  locale: "en_US",
  language: "en",
  twitter: "@jandromani",
  linkedin: "https://www.linkedin.com/in/alejandro-bgn/",
  github: "https://github.com/jandromani",
  x: "https://x.com/jandromani",
} as const

export const personId = `${siteConfig.url}/#person`
export const websiteId = `${siteConfig.url}/#website`

export const defaultKeywords = [
  "AI Tech Lead",
  "Agentic Systems Architect",
  "AI Systems Architecture",
  "AI Governance",
  "LLM Observability",
  "Enterprise AI",
  "AI Reliability",
  "Agent Orchestration",
  "Platform Engineering",
  "EU AI Act",
]

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}

export type OgImageKind = "profile" | "article" | "system" | "systems" | "writing" | "evolution" | "experience" | "about" | "contact"

export function ogImageUrl(kind: OgImageKind, slug?: string) {
  const params = new URLSearchParams({ type: kind, v: "5" })
  if (slug) params.set("slug", slug)
  return absoluteUrl(`/api/og?${params.toString()}`)
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  ogKind: OgImageKind
  ogSlug?: string
  keywords?: string[]
  absoluteTitle?: boolean
  article?: {
    publishedTime: string
    modifiedTime?: string
    section?: string
    tags?: string[]
  }
}

export function createPageMetadata({
  title,
  description,
  path,
  ogKind,
  ogSlug,
  keywords = [],
  absoluteTitle = false,
  article,
}: PageMetadataInput): Metadata {
  const image = ogImageUrl(ogKind, ogSlug)
  const canonical = absoluteUrl(path)
  const resolvedTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`

  const openGraph: Metadata["openGraph"] = article
    ? {
        type: "article",
        locale: siteConfig.locale,
        url: canonical,
        siteName: siteConfig.name,
        title: resolvedTitle,
        description,
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        section: article.section,
        tags: article.tags,
        authors: [absoluteUrl("/about")],
        images: [{ url: image, width: 1200, height: 630, alt: `${title} — ${siteConfig.name}` }],
      }
    : {
        type: "website",
        locale: siteConfig.locale,
        url: canonical,
        siteName: siteConfig.name,
        title: resolvedTitle,
        description,
        images: [{ url: image, width: 1200, height: 630, alt: `${title} — ${siteConfig.name}` }],
      }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: { canonical },
    authors: [{ name: siteConfig.legalName, url: absoluteUrl("/about") }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      creator: siteConfig.twitter,
      site: siteConfig.twitter,
      images: [{ url: image, alt: `${title} — ${siteConfig.name}` }],
    },
  }
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    mainEntityOfPage: absoluteUrl("/about"),
    jobTitle: ["AI Tech Lead", "Agentic Systems Architect", "Platform Engineer"],
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressCountry: "ES",
    },
    worksFor: {
      "@type": "Organization",
      name: "knowmad mood",
    },
    alumniOf: [
      { "@type": "EducationalOrganization", name: "UCAM Universidad Católica San Antonio" },
      { "@type": "EducationalOrganization", name: "Universidad Complutense de Madrid" },
    ],
    sameAs: [siteConfig.linkedin, siteConfig.github, siteConfig.x],
    knowsAbout: [
      "Agentic systems",
      "AI governance",
      "LLM observability",
      "AI reliability",
      "EU AI Act",
      "Multi-agent orchestration",
      "Model routing",
      "AI platform economics",
      "Platform engineering",
    ],
  }
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${siteConfig.url}/`,
    name: siteConfig.name,
    alternateName: [siteConfig.legalName, "ABGN", "alejandrobgn.vercel.app"],
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": personId },
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
