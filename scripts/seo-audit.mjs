const base = (process.argv[2] || "http://localhost:3002").replace(/\/$/, "")
const canonicalBase = "https://alejandrobgn.vercel.app"

const pages = [
  { path: "/", types: ["WebSite", "Person", "WebPage"] },
  { path: "/systems", types: ["CollectionPage", "ItemList"] },
  { path: "/systems/aiactmiddleware", types: ["SoftwareApplication", "BreadcrumbList", "WebPage"] },
  { path: "/writing", types: ["Blog", "ItemList"] },
  { path: "/writing/governing-agentic-systems", types: ["BlogPosting", "BreadcrumbList", "WebPage"] },
  { path: "/evolution", types: ["CollectionPage"] },
  { path: "/experience", types: ["ProfilePage", "BreadcrumbList"] },
  { path: "/about", types: ["Person", "ProfilePage", "BreadcrumbList"] },
  { path: "/contact", types: ["ContactPage", "BreadcrumbList"] },
]

const noIndexPages = ["/meet", "/lab", "/thesis", "/venture-lab"]

function getTags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? []
}

function getAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`${attribute}=(?:"([^"]*)"|'([^']*)')`, "i"))
  const value = match?.[1] ?? match?.[2] ?? null
  return value?.replaceAll("&amp;", "&").replaceAll("&quot;", '"') ?? null
}

function getMeta(html, attribute, value) {
  const tag = getTags(html, "meta").find((candidate) => getAttribute(candidate, attribute) === value)
  return tag ? getAttribute(tag, "content") : null
}

function getCanonical(html) {
  const tag = getTags(html, "link").find((candidate) => getAttribute(candidate, "rel") === "canonical")
  return tag ? getAttribute(tag, "href") : null
}

function getJsonLd(html) {
  return [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => JSON.parse(match[1]))
}

function collectTypes(value, result = new Set()) {
  if (!value || typeof value !== "object") return result
  if (Array.isArray(value)) {
    value.forEach((item) => collectTypes(item, result))
    return result
  }
  const type = value["@type"]
  if (Array.isArray(type)) type.forEach((item) => result.add(item))
  else if (typeof type === "string") result.add(type)
  Object.values(value).forEach((item) => collectTypes(item, result))
  return result
}

const results = []
let failed = false

for (const page of pages) {
  const response = await fetch(`${base}${page.path}`)
  const html = await response.text()
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? null
  const description = getMeta(html, "name", "description")
  const canonical = getCanonical(html)
  const ogImage = getMeta(html, "property", "og:image")
  const twitterImage = getMeta(html, "name", "twitter:image")
  const jsonLd = getJsonLd(html)
  const types = [...collectTypes(jsonLd)]
  const expectedCanonical = new URL(page.path, `${canonicalBase}/`).toString()
  const imageTestUrl = ogImage
    ? base.startsWith("http://localhost")
      ? `${base}${new URL(ogImage).pathname}${new URL(ogImage).search}`
      : ogImage
    : null
  const imageResponse = imageTestUrl ? await fetch(imageTestUrl) : null
  const missingTypes = page.types.filter((type) => !types.includes(type))
  const checks = {
    status: response.status === 200,
    title: Boolean(title),
    description: Boolean(description),
    canonical: canonical?.replace(/\/$/, "") === expectedCanonical.replace(/\/$/, ""),
    ogImage: imageResponse?.status === 200 && imageResponse.headers.get("content-type")?.startsWith("image/png"),
    twitterImage: twitterImage === ogImage,
    jsonLd: missingTypes.length === 0,
    noPlaceholderVerification: !html.includes("google-site-verification-code"),
    noLegacyOg: !html.includes("/og-image.jpg"),
  }
  if (Object.values(checks).some((check) => !check)) failed = true
  results.push({
    path: page.path,
    checks,
    canonical,
    ogImage,
    jsonLdTypes: types,
    missingTypes,
  })
}

for (const path of noIndexPages) {
  const response = await fetch(`${base}${path}`)
  const html = await response.text()
  const robots = getMeta(html, "name", "robots")
  const pass = response.status === 200 && Boolean(robots?.includes("noindex"))
  if (!pass) failed = true
  results.push({ path, checks: { status: response.status === 200, noindex: pass }, robots })
}

const robotsResponse = await fetch(`${base}/robots.txt`)
const robotsText = await robotsResponse.text()
const sitemapResponse = await fetch(`${base}/sitemap.xml`)
const sitemapText = await sitemapResponse.text()
const sitemapUrls = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const sitemapCoverage = await Promise.all(
  sitemapUrls.map(async (canonicalUrl) => {
    const parsed = new URL(canonicalUrl)
    const response = await fetch(`${base}${parsed.pathname}`)
    const html = await response.text()
    const canonical = getCanonical(html)
    const ogImage = getMeta(html, "property", "og:image")
    const imageTestUrl = ogImage
      ? base.startsWith("http://localhost")
        ? `${base}${new URL(ogImage).pathname}${new URL(ogImage).search}`
        : ogImage
      : null
    const imageResponse = imageTestUrl ? await fetch(imageTestUrl) : null
    return {
      path: parsed.pathname,
      status: response.status,
      canonical: canonical?.replace(/\/$/, "") === canonicalUrl.replace(/\/$/, ""),
      description: Boolean(getMeta(html, "name", "description")),
      ogImage: imageResponse?.status === 200 && imageResponse.headers.get("content-type")?.startsWith("image/png"),
      jsonLd: getJsonLd(html).length > 0,
    }
  }),
)
const coverageFailures = sitemapCoverage.filter(
  (page) => page.status !== 200 || !page.canonical || !page.description || !page.ogImage || !page.jsonLd,
)
const infrastructure = {
  robots: {
    status: robotsResponse.status,
    hasSitemap: robotsText.includes(`${base}/sitemap.xml`) || robotsText.includes("https://alejandrobgn.vercel.app/sitemap.xml"),
    allowsRoot: /Allow:\s*\//i.test(robotsText),
  },
  sitemap: {
    status: sitemapResponse.status,
    urlCount: sitemapUrls.length,
    uniqueUrls: new Set(sitemapUrls).size === sitemapUrls.length,
    excludesNoIndex: noIndexPages.every((path) => !sitemapUrls.some((url) => url.endsWith(path))),
    includesArticles: sitemapUrls.some((url) => url.includes("/writing/")),
    includesSystems: sitemapUrls.some((url) => url.includes("/systems/")),
    completePageCoverage: coverageFailures.length === 0,
    coverageFailures,
  },
}

if (
  infrastructure.robots.status !== 200 ||
  !infrastructure.robots.hasSitemap ||
  !infrastructure.robots.allowsRoot ||
  infrastructure.sitemap.status !== 200 ||
  infrastructure.sitemap.urlCount < 20 ||
  !infrastructure.sitemap.uniqueUrls ||
  !infrastructure.sitemap.excludesNoIndex ||
  !infrastructure.sitemap.completePageCoverage
) {
  failed = true
}

console.log(JSON.stringify({ base, infrastructure, pages: results }, null, 2))
if (failed) process.exitCode = 1
