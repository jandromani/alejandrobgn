import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getEvidenceLabel, systems } from "@/lib/systems-data"

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function RelatedSystems({ names }: { names: string[] }) {
  const matches = names
    .map(name => systems.find(system => [system.id, system.slug, system.name].some(value => normalize(value) === normalize(name))))
    .filter((system): system is (typeof systems)[number] => Boolean(system))

  if (!matches.length) return null

  return (
    <section aria-labelledby="linked-systems-heading" className="ml-auto max-w-[760px] space-y-4">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal-green">Continue through the work</p>
        <h2 id="linked-systems-heading" className="mt-1 text-xl font-semibold text-foreground">Related systems</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {matches.map(system => (
          <Link key={system.id} href={`/systems/${system.slug}`} className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-signal-green/45 hover:shadow-[0_18px_45px_rgba(0,0,0,.12)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{system.role} · {system.status}</p>
                <h3 className="mt-1 font-semibold text-foreground group-hover:text-signal-green">{system.name}</h3>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-green" />
            </div>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">{system.shortDescription}</p>
            {system.evidence && <span className="mt-4 inline-flex rounded-full border border-signal-green/25 bg-signal-green/[0.06] px-2.5 py-1 text-[9px] font-mono text-signal-green">{getEvidenceLabel(system.evidence)}</span>}
          </Link>
        ))}
      </div>
    </section>
  )
}

