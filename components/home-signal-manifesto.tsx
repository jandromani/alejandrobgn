import { OperatingFieldSvg } from "@/components/operating-field-svg"

const stages = [
  { index: "01", name: "Intent", detail: "Raw input · ambiguity" },
  { index: "02", name: "Control", detail: "Policy · routing" },
  { index: "03", name: "Runtime", detail: "Execution · state" },
  { index: "04", name: "Evidence", detail: "Traces · economics" },
]

export function HomeSignalManifesto() {
  return (
    <section aria-labelledby="operating-thesis-heading" className="border-y border-border bg-card/20">
      <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="mb-10 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal-green">
              Operating thesis · 01
            </p>
            <h2 id="operating-thesis-heading" className="mt-3 max-w-xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
              Raw intent is easy. Controlled evidence is the product.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:justify-self-end md:text-base">
            Production AI is not a model call. It is the control loop that turns uncertain intent into governed execution,
            observable state, and evidence a team can defend.
          </p>
        </div>

        <figure className="overflow-hidden rounded-2xl border border-white/15 bg-[#050708] shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[2.18/1]">
            <OperatingFieldSvg />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/80" aria-hidden="true" />
            <div className="signal-field-scan absolute inset-0" aria-hidden="true" />

            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 sm:left-6 sm:top-6">
              <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                Production AI · Operating field
              </span>
              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/60 backdrop-blur-md">
                Code-native · Inspectable system model
              </span>
            </div>

            <div className="absolute bottom-6 left-6 hidden max-w-sm lg:block">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">The control loop</p>
              <p className="mt-2 text-xl font-semibold leading-snug text-white">
                Uncertainty enters. Governed, observable execution leaves.
              </p>
            </div>

            <div className="absolute bottom-6 right-6 hidden w-[54%] grid-cols-4 overflow-hidden rounded-xl border border-white/15 bg-black/65 backdrop-blur-md lg:grid">
              {stages.map((stage) => (
                <div key={stage.index} className="border-r border-white/10 px-4 py-4 last:border-r-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-signal-green">{stage.index}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white">{stage.name}</span>
                  </div>
                  <p className="mt-2 font-mono text-[9px] text-white/50">{stage.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <figcaption className="grid grid-cols-2 border-t border-white/10 bg-black lg:hidden">
            {stages.map((stage) => (
              <div key={stage.index} className="border-b border-r border-white/10 p-4 even:border-r-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-signal-green">{stage.index}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white">{stage.name}</span>
                </div>
                <p className="mt-1.5 font-mono text-[9px] text-white/50">{stage.detail}</p>
              </div>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
