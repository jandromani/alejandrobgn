import { RelatedEvidence } from "@/components/related-evidence"
import { JsonLd } from "@/components/json-ld"
import { LabEmbed } from "@/components/lab-embed"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, FileCode2, ShieldCheck } from "lucide-react"
import { findOriginalLab, originalLabs } from "@/data/frontier-labs"
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, personId, websiteId } from "@/lib/seo"

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() {
  return originalLabs.map(lab => ({ slug: lab.slug }))
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lab = findOriginalLab(slug)
  return lab
    ? createPageMetadata({ title: lab.title, description: lab.summary, path: `/labs/${slug}`, ogKind: "systems" })
    : { title: "Lab not found" }
}

export default async function OriginalLabPage({ params }: Props) {
  const { slug } = await params
  const lab = findOriginalLab(slug)
  if (!lab) notFound()
  const originalSource = lab.archive ?? lab.demo
  const hasRuntimePatch = Boolean(lab.archive)
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={[
        {
          "@type":"CreativeWork",
          "@id":`${absoluteUrl(`/labs/${lab.slug}`)}#artifact`,
          url:absoluteUrl(`/labs/${lab.slug}`),
          name:lab.title,
          description:lab.summary,
          creator:{"@id":personId},
          isPartOf:{"@id":websiteId},
          isBasedOn:absoluteUrl(lab.archive ?? lab.demo),
          keywords: [lab.family, "Standalone HTML experiment", "Engineering laboratory"].join(", "),
          additionalProperty:[
            {"@type":"PropertyValue",name:"Evidence boundary",value:lab.evidence},
            {"@type":"PropertyValue",name:"QA scope",value:lab.qaNote},
          ],
        },
        {
          "@type":"WebPage",
          "@id":`${absoluteUrl(`/labs/${lab.slug}`)}#webpage`,
          url:absoluteUrl(`/labs/${lab.slug}`),
          name:lab.title,
          isPartOf:{"@id":websiteId},
          mainEntity:{"@id":`${absoluteUrl(`/labs/${lab.slug}`)}#artifact`},
        },
        breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Labs",path:"/labs"},{name:lab.title,path:`/labs/${lab.slug}`}]),
      ]}/>
      <section className="border-b border-border bg-card/20">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <Link href="/labs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4"/> All interactive labs</Link>
          <p className="mt-10 font-mono text-xs uppercase tracking-[.18em] text-[#587f00] dark:text-signal-green">{lab.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">{lab.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">{lab.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={lab.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#90d900] px-5 py-3 text-sm font-semibold text-[#090b0f] hover:bg-[#9cec00]">
              {hasRuntimePatch ? "Launch corrected runtime" : "Launch original full screen"} <ExternalLink className="h-4 w-4" aria-hidden="true"/>
            </a>
            <a href={originalSource} download className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">
              Download preserved original HTML <FileCode2 className="h-4 w-4" aria-hidden="true"/>
            </a>
            {hasRuntimePatch && (
              <a href={originalSource} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/40">
                Inspect original with known JavaScript error <ExternalLink className="h-4 w-4" aria-hidden="true"/>
              </a>
            )}
          </div>
          {hasRuntimePatch && (
            <p className="mt-4 max-w-3xl text-xs leading-6 text-muted-foreground">
              The archived HTML is unchanged. The interactive viewer opens a separate minimally patched copy; downloading or inspecting the original preserves the observed error for reproducibility. This is not an end-to-end Pyodide validation.
            </p>
          )}
        </div>
      </section>

      <section id="interactive" aria-label="Interactive original browser experiment" className="mx-auto max-w-[1520px] px-3 py-8 md:px-5 md:py-12">
        <LabEmbed src={lab.demo} title={lab.title} note={lab.qaNote} patched={hasRuntimePatch} />
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          An embedded frame intentionally restricts storage, origin permissions and navigation.
          If a project uses WebGL, Pyodide, external files, authentication or model providers, launch
          the original full-screen document. Do not enter private API keys in a shared demo.
        </p>
      </section>

      <section className="container mx-auto grid max-w-6xl gap-8 px-4 pb-20 md:grid-cols-[1.1fr_.9fr] md:pb-24">
        <div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-[#587f00] dark:text-signal-green" aria-hidden="true"/>
            <h2 className="text-2xl font-semibold text-foreground">What you can inspect</h2>
          </div>
          <ul className="mt-6 space-y-3">
            {lab.inspect.map(detail => <li key={detail} className="rounded-lg border border-border bg-card p-4 text-sm leading-7 text-foreground">{detail}</li>)}
          </ul>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">{lab.evidence}</p>
        </div>
        <aside className="rounded-xl border border-border bg-card p-6 md:p-8">
          <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground"><ShieldCheck className="h-5 w-5" aria-hidden="true" /> Evidence boundaries</h2>
          <p className="mt-5 text-sm leading-8 text-muted-foreground">{lab.dependencies}</p>
          <p className="mt-5 text-sm leading-7 text-foreground">
            <span className="font-semibold">Current verification:</span> {lab.qaNote}
          </p>
          <p className="mt-5 text-sm leading-8 text-muted-foreground">
            A working interactive UI is evidence of a browser artifact, not proof that third-party
            APIs, commercial datasets, external generation or production infrastructure are available.
            Synthetic scenarios remain synthetic.
          </p>
          <Link href="/labs" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[#587f00] dark:hover:text-signal-green">
            Back to all labs <ArrowUpRight className="h-4 w-4" />
          </Link>
        </aside>
      </section>
      <RelatedEvidence id={`lab:${lab.slug}`} />
    </div>
  )
}
