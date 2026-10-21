import type { MetadataRoute } from "next"
import { articles } from "@/data/writing"
import { systems } from "@/lib/systems-data"
import { originalLabs } from "@/data/frontier-labs"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-10-20",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/atlas"),
      lastModified: "2026-10-21",
      changeFrequency: "weekly",
      priority: 0.87,
    },
    { url: absoluteUrl("/work"), lastModified: "2026-10-21", changeFrequency: "monthly", priority: 0.93 },
    { url: absoluteUrl("/engineering/a2a"), lastModified: "2026-10-21", changeFrequency: "monthly", priority: 0.84 },
    { url: absoluteUrl("/engineering/delivery-systems"), lastModified: "2026-10-21", changeFrequency: "monthly", priority: 0.75 },
    {
      url: absoluteUrl("/systems"),
      lastModified: "2026-07-24",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/evolution"),
      lastModified: "2026-10-20",
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
      lastModified: "2026-10-19",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/work/cybersecurity-ai-engineering"),
      lastModified: "2026-10-20",
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: absoluteUrl("/work/banking-modernization"),
      lastModified: "2026-10-20",
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: absoluteUrl("/labs"),
      lastModified: "2026-10-20",
      changeFrequency: "monthly",
      priority: 0.83,
    },
    {
      url: absoluteUrl("/publications"),
      lastModified: "2026-10-20",
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: "2026-10-20",
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

  const labPages: MetadataRoute.Sitemap = originalLabs.map((lab) => ({
    url: absoluteUrl(`/labs/${lab.slug}`),
    lastModified: "2026-10-20",
    changeFrequency: "monthly",
    priority: 0.72,
  }))

  return [...staticPages, ...labPages, ...systemPages, ...articlePages]
}
