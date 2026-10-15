import type { MetadataRoute } from "next"
import { articles } from "@/data/writing"
import { systems } from "@/lib/systems-data"
import { caseStudies, interactiveLabs } from "@/data/portfolio-v2"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-10-14",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/systems"),
      lastModified: "2026-07-24",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/evolution"),
      lastModified: "2026-07-24",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/writing"),
      lastModified: articles.reduce((latest, article) => {
        const date = article.updated ?? article.published
        return date > latest ? date : latest
      }, "2023-01-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/experience"),
      lastModified: "2026-07-24",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: "2026-07-24",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: "2026-07-24",
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ]

  const v2Pages: MetadataRoute.Sitemap = ["/enterprise", "/labs", "/anatomy", "/anatomy/atlas", ...caseStudies.map(c => "/enterprise/" + c.slug), ...interactiveLabs.map(l => "/labs/" + l.slug)].map(path => ({ url: absoluteUrl(path), lastModified: "2026-10-14", changeFrequency: "monthly", priority: path === "/enterprise" ? 0.95 : 0.75 }))

  const systemPages: MetadataRoute.Sitemap = systems.map((system) => ({
    url: absoluteUrl(`/systems/${system.slug}`),
    lastModified: system.evidence?.lastVerified ?? `${system.year}-01-01`,
    changeFrequency: "monthly",
    priority: system.featured ? 0.8 : 0.7,
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/writing/${article.slug}`),
    lastModified: article.updated ?? article.published,
    changeFrequency: "monthly",
    priority: article.featured ? 0.85 : 0.75,
  }))

  return [...staticPages, ...v2Pages, ...systemPages, ...articlePages]
}
