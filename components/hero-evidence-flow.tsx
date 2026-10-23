import { enterpriseEvidence } from "@/lib/enterprise-evidence"
import Link from "next/link"
import { ArrowRight, CheckCheck, FileCode2, GitPullRequest, Network, ShieldCheck } from "lucide-react"

const stages = [
  { number:"01", name:"Project context", detail:"Make source and decisions inspectable", icon:FileCode2 },
  { number:"02", name:"Agent workflows", detail:"Bound responsibilities and specifications", icon:Network },
  { number:"03", name:"Human review", detail:"Approve changes through quality gates", icon:GitPullRequest },
  { number:"04", name:"Evidence", detail:"Link decisions to reproducible checks", icon:CheckCheck },
]

/** A route-grounded explanatory flow; this is not a client execution trace. */
export function HeroEvidenceFlow() {
  return <aside aria-label="How the engineering approach works" className="relative flex min-w-0 flex-col justify-center border-t border-border bg-card/20 px-5 py-10 md:px-10 xl:border-l xl:border-t-0 xl:py-14">
    <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true"
      style={{background:"radial-gradient(circle at 50% 28%, hsl(var(--signal-cyan)/.13),transparent 52%)"}}/>
    <div className="relative w-full max-w-[570px]">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#476700] dark:text-signal-green">Engineering operating model / Illustrated</p>
      <h2 className="mt-4 max-w-md text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">From project knowledge to a change a team can trust.</h2>
      <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">A simplified, human-governed engineering method. The two enterprise case studies contain the actual reported outcomes and limits.</p>
      <ol className="relative mt-8 space-y-2" aria-label="Four-stage reviewable delivery process">
        {stages.map((stage,i)=>{
          const Icon=stage.icon
          return <li key={stage.number} className="relative flex min-h-[90px] items-start gap-4 rounded-xl border border-border bg-background/80 p-4">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-border bg-secondary text-[#476700] dark:text-signal-green">
              <Icon className="h-5 w-5" aria-hidden="true"/>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-muted-foreground">STAGE {stage.number}</p>
              <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">{stage.name}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{stage.detail}</p>
            </div>
            {i<stages.length-1&&<span aria-hidden="true" className="absolute -bottom-3 left-9 z-10 h-4 w-px bg-[#78a33f]"/>}
          </li>
        })}
      </ol>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link href="/work/cybersecurity-ai-engineering" className="group rounded-xl border border-border bg-background p-4 transition-colors hover:border-[#587f00] focus-visible:ring-2 focus-visible:ring-ring">
          <ShieldCheck className="h-5 w-5 text-[#476700] dark:text-signal-green" aria-hidden="true"/>
          <strong className="mt-3 block text-xl leading-tight text-foreground">{enterpriseEvidence.deliveryTime.value}</strong>
          <span className="mt-1 block text-sm leading-6 text-muted-foreground">Team-reported AI workflow activation</span>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-foreground">Inspect case <ArrowRight className="h-3.5 w-3.5"/></span>
        </Link>
        <Link href="/work/banking-modernization" className="group rounded-xl border border-border bg-background p-4 transition-colors hover:border-[#587f00] focus-visible:ring-2 focus-visible:ring-ring">
          <FileCode2 className="h-5 w-5 text-cyan-700 dark:text-signal-cyan" aria-hidden="true"/>
          <strong className="mt-3 block text-xl leading-tight text-foreground">{enterpriseEvidence.modernizationRepeatability.value}</strong>
          <span className="mt-1 block text-sm leading-6 text-muted-foreground">Files compared in two bounded factory runs; no reproducibility defects recorded</span>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-foreground">Inspect case <ArrowRight className="h-3.5 w-3.5"/></span>
        </Link>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">Illustrative workflow; measurements are delivery-team reports rather than audited client KPIs.</p>
    </div>
  </aside>
}
