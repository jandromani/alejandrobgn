import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this portfolio handles privacy-focused, aggregate website measurement.",
  alternates: { canonical: absoluteUrl("/privacy") },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <header className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Privacy</p>
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">Website measurement</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          This page explains the limited, aggregate measurement used to improve this professional portfolio.
        </p>
      </header>

      <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
        <section aria-labelledby="analytics-heading">
          <h2 id="analytics-heading" className="text-lg font-semibold text-foreground">Vercel Web Analytics</h2>
          <p className="mt-3">
            When Web Analytics is enabled for this site, it measures page views and a small set of link actions:
            CV downloads, contact links, case-study opens, project opens and GitHub clicks. The events contain
            fixed names only. This site does not send form contents, email addresses, prompts, API keys or URL
            query parameters as analytics event data.
          </p>
          <p className="mt-3">
            Vercel states that Web Analytics does not use cookies or associate recorded data with an IP address
            or individual, and that its temporary visitor hash is discarded after 24 hours. Read
            {" "}<a className="underline underline-offset-4" href="https://vercel.com/docs/analytics/privacy-policy">
              Vercel’s Web Analytics privacy and compliance details
            </a>{" "}for its current data handling information.
          </p>
        </section>

        <section aria-labelledby="other-heading">
          <h2 id="other-heading" className="text-lg font-semibold text-foreground">Other tracking</h2>
          <p className="mt-3">
            This site does not use Google Analytics 4, advertising pixels or cross-site advertising profiles.
            Ordinary hosting and security logs may be processed by the hosting provider to operate the site.
          </p>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-lg font-semibold text-foreground">Privacy requests</h2>
          <p className="mt-3">
            For questions about this site’s measurement or a privacy request, contact{" "}
            <a className="underline underline-offset-4" href="mailto:alejandrobgn@gmail.com">
              Alejandro Baratas
            </a>.
          </p>
        </section>
      </div>
    </article>
  )
}
