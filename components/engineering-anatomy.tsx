"use client"

import { useState } from "react"
import { ArrowRight, Check, RotateCcw } from "lucide-react"

type Variant = "delivery" | "modernization"
type Step = { name: string; key: string; headline: string; body: string; anchor: string }
type Stage = { x: number; y: number }
const stages: Record<Variant, Step[]> = {
  delivery: [
    { name:"Project context", key:"01", headline:"Shared project knowledge", body:"Capture real conventions and domain language before asking specialists to act. Changes without shared context remain candidates, not deliverables.", anchor:"#challenge-title" },
    { name:"Scoped specification", key:"02", headline:"Intent → reviewable contract", body:"Bound agent responsibilities with a specification, acceptance criteria and escalation path. Generated output cannot redefine the scope on its own.", anchor:"#results-title" },
    { name:"Agent-proposed PR", key:"03", headline:"Reviewable change, not autonomy", body:"Specialist frontend, backend, QA and Gherkin assistance feed candidate changes into normal pull-request review. Each proposed change requires accountability.", anchor:"#results-title" },
    { name:"Human review", key:"04", headline:"Engineering owns acceptance", body:"Human approval and quality practices decide whether a change is accepted. The diagram does not represent customer production events.", anchor:"#evidence-title" },
  ],
  modernization: [
    { name:"Source corpus", key:"01", headline:"Read the original", body:"Repositories, configuration, views and service contracts are the evidence base. This stage never assumes that the legacy behavior has been recovered completely.", anchor:"#challenge" },
    { name:"Knowledge graph", key:"02", headline:"Recover relationships", body:"Source locations and dependencies form a traceable graph. Missing facts are kept distinct from inferred technical meaning.", anchor:"#results-title" },
    { name:"Canonical contract", key:"03", headline:"Model before translation", body:"A stable intermediate representation separates source evidence from target generation. Contracts require a deliberate acceptance boundary.", anchor:"#results-title" },
    { name:"Candidate artifacts", key:"04", headline:"Generate a candidate", body:"Versionable target outputs are generated from the modeled corpus; a candidate is not automatically production-compatible code.", anchor:"#results-title" },
    { name:"Proof and gates", key:"05", headline:"Inspect reproducibility", body:"Lineage, contract and repeatability checks establish a bounded engineering result. Functional equivalence remains an independent test.", anchor:"#scope" },
  ],
}
const gates: Record<Variant, { name: string; subtitle: string }[]> = {
  delivery: [
    {name:"Context ready",subtitle:"Project-aware"},
    {name:"Spec accepted",subtitle:"Scoped intent"},
    {name:"Human approval",subtitle:"Review required"},
  ],
  modernization: [
    {name:"Source lineage",subtitle:"Traceable facts"},
    {name:"Contract accepted",subtitle:"Bounded target"},
    {name:"Repeatable result",subtitle:"Technical check"},
  ],
}
const heights = [245,202,247,204,247]
function PointMachine({ variant, index, active, checked }: {variant:Variant;index:number;active:boolean;checked:boolean}) {
  const light = active ? "#c9f28a" : checked ? "#71c5b7" : "#7e98a5"
  if (variant === "delivery") {
    return <g>
      <polygon points="-50,-20 0,-48 50,-20 0,8" fill={active?"#568872":"#344d5b"} stroke={light} strokeWidth="1.8"/>
      <polygon points="-50,-20 0,8 0,56 -50,26" fill="#203747" stroke="#678295" strokeWidth="1"/>
      <polygon points="0,8 50,-20 50,26 0,56" fill="#142734" stroke="#678295" strokeWidth="1"/>
      <rect x="-18" y="-19" width="36" height="9" rx="3" fill={light} opacity=".5"/>
      <path d="M-28 4 L-5 18 M-28 17 L-5 31 M13 24 L37 10 M13 36 L37 22" fill="none" stroke="#91afb8" opacity=".8"/>
      {index === 2 ? <><path d="M-18 -46v-21h36v21" stroke="#e7c992" strokeWidth="2" fill="none"/><circle cx="0" cy="-66" r="8" fill="#edbb68"/></>
       : index === 3 ? <><path d="M-17 -52 l17 -18 17 18 0 12 -34 0Z" fill={checked?"#b9e462":"#7798ae"} stroke="#d8ecdd"/><path d="m-9 -49 7 7 12-15" fill="none" stroke="#102c35" strokeWidth="3"/></>
       : <><circle r="14" cy="-27" fill="#162f3d" stroke="#cde6db"/><circle r="4" cy="-27" fill={light}/></>}
      <circle cx="-40" cy="26" r="3" fill={light}/><circle cx="39" cy="26" r="3" fill={light}/>
    </g>
  }
  if (index === 0) return <g>
    <ellipse cx="0" cy="-27" rx="37" ry="17" fill="#4c7385" stroke={light} strokeWidth="2"/>
    <path d="M-37 -27 V34 Q0 59 37 34 V-27" fill="#1d384b" stroke="#8fb5c2"/>
    <ellipse cx="0" cy="34" rx="37" ry="17" fill="#274e5e" stroke="#8fb5c2"/>
    <path d="M-27 -7h54 M-27 5h54 M-27 17h54" stroke="#a8ccdc" strokeDasharray="4 5"/>
    <ellipse cx="0" cy="-27" rx="13" ry="6" fill={light}/>
  </g>
  if (index === 1) return <g>
    {[[0,-48],[-34,-6],[32,0],[-14,35],[35,34]].map(([x,y],i)=><g key={i}>
      {i>0&&<path d={`M0 -48 L${x} ${y}`} stroke={light} strokeWidth="2" opacity=".75"/>}
      <circle cx={x} cy={y} r={i===0?13:9} fill="#1b4957" stroke={light} strokeWidth="2"/>
      <circle cx={x} cy={y} r="3" fill={light}/>
    </g>)}
    <path d="M-34 -6 L-14 35 L32 0 L35 34" fill="none" stroke="#7fb5c4" strokeDasharray="3 4"/>
  </g>
  if (index === 2) return <g>
    <polygon points="-45,-32 0,-57 45,-32 0,-7" fill="#4e6c78" stroke={light} strokeWidth="2"/>
    <polygon points="-45,-32 0,-7 0,49 -45,23" fill="#233848" stroke="#9cbbc4"/>
    <polygon points="0,-7 45,-32 45,23 0,49" fill="#172c3b" stroke="#9cbbc4"/>
    <path d="M-31 -21 L0 -4 L31 -21 M-30 -3 L-9 10 M-30 11 L-9 24 M9 12L32 -1" stroke={light} fill="none"/>
    <circle cx="0" cy="-36" r="9" fill="#233a46" stroke="#a9cfca"/><path d="m-4 -36 3 4 7-9" fill="none" stroke={light} strokeWidth="2"/>
  </g>
  if (index === 3) return <g>
    <path d="M-44 -24 L0 -51 44 -24 0 3Z" fill="#547b87" stroke={light} strokeWidth="2"/>
    <path d="M-44 -24 L0 3 V38 L-44 13Z" fill="#2f4352" stroke="#83a8b7"/>
    <path d="M0 3L44 -24 V13L0 38Z" fill="#1b3345" stroke="#83a8b7"/>
    {[-18,0,18].map((x,i)=><rect key={i} x={x-5} y="-51" width="10" height="29" rx="2" fill={i===1?light:"#b6d2cb"} stroke="#52788b"/>)}
    <path d="M-32 15L-10 28 M9 28L32 15" stroke="#94bdb4"/>
  </g>
  return <g>
    <rect x="-48" y="-26" width="96" height="64" rx="9" fill="#233c4a" stroke={light} strokeWidth="2"/>
    <rect x="-38" y="-16" width="76" height="42" rx="5" fill="#102732" stroke="#789fac"/>
    {[-22,0,22].map((x,i)=><g key={i}><circle cx={x} cy="5" r="10" fill="#304d5c" stroke="#8baeb8"/><path d="m-5 0 4 5 7-10" transform={`translate(${x} 5)`} fill="none" stroke={light} strokeWidth="2.4"/></g>)}
    <rect x="-30" y="-42" width="60" height="11" rx="3" fill={light}/>
  </g>
}
export function EngineeringAnatomy({ variant }: { variant: Variant }) {
  const steps = stages[variant]
  const [selected,setSelected] = useState(0)
  const [open,setOpen] = useState([false,false,false])
  const [tested,setTested] = useState(false)
  const ready = open.every(Boolean)
  const positions:Stage[] = steps.map((_,i)=>({x:110 + i * (800/(steps.length-1)), y:heights[i]}))
  const current = steps[selected]
  const status = !tested ? "Model idle · inspect states, then test" : ready
    ? variant==="delivery" ? "Candidate change passed the illustrated handoff — human accountability retained" : "Technical gates illustrated as passing — functional parity unverified"
    : "Blocked by one or more open quality gates"
  const swap = (i:number) => {setOpen(old=>old.map((value,n)=>n===i?!value:value));setTested(false)}
  const restart=()=>{setSelected(0);setOpen([false,false,false]);setTested(false)}
  return <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(290px,.7fr)]">
    <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-[#0b1620]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3 text-xs text-white/75">
        <span className="font-mono">FIG {variant==="delivery"?"01 / AI SDLC":"02 / LEGACY FACTORY"} · SVG INTERACTIVE MECHANISM</span>
        <span className="font-mono">{open.filter(Boolean).length}/3 GATES ENABLED</span>
      </div>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Interactive engineering anatomy diagram">
        <svg viewBox="0 0 1000 490" className="block min-w-[650px] w-full" role="img"
          aria-label={variant==="delivery"?"Isometric modules representing the development handoff, with clickable stages":"Five different isometric machines for source graph contract generation and evidence"}>
          <defs>
            <pattern id={`anatomy-grid-${variant}`} width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#294151" strokeWidth=".5"/></pattern>
            <linearGradient id={`track-${variant}`} x1="0" x2="1"><stop offset="0" stopColor="#4c8090"/><stop offset="1" stopColor="#b9e462"/></linearGradient>
          </defs>
          <rect width="1000" height="490" fill={`url(#anatomy-grid-${variant})`}/>
          <path d="M36 340 L490 110 L963 340 L509 466Z" fill="#152a39" stroke="#4e6d7b" strokeWidth="2"/>
          <path d="M36 340 V366 L509 486 V466Z" fill="#0b1b26" stroke="#4e6d7b"/>
          <path d="M509 466 L963 340 V366 L509 486Z" fill="#102430" stroke="#4e6d7b"/>
          <path d="M72 344L492 145L918 344L510 440Z" fill="none" stroke="#547786" strokeDasharray="4 6"/>
          {positions.slice(0,-1).map((p,i)=>{
            const q=positions[i+1]
            return <g key={i}><path d={`M${p.x+35} ${p.y+42} C${p.x+115} ${p.y+118} ${q.x-105} ${q.y+125} ${q.x-35} ${q.y+44}`}
              fill="none" stroke={i<selected?"#b9e462":"#688b98"} strokeWidth={i<selected?6:4} strokeLinecap="round" strokeDasharray={i<selected?"9 5":undefined}/>
              <circle cx={(p.x+q.x)/2} cy={(p.y+q.y)/2+77} r="5" fill={i<selected?"#b9e462":"#6c99aa"} className={i<selected?"motion-safe:animate-pulse":""}/>
            </g>
          })}
          {positions.map((p,i)=>{
            const active=i===selected
            const gateIndex=Math.min(i,2)
            return <g key={i} transform={`translate(${p.x} ${p.y})`} role="button" tabIndex={0}
              aria-label={`Inspect step ${i+1}: ${steps[i].name}`} aria-pressed={active}
              className="cursor-pointer outline-none focus-visible:opacity-70"
              onClick={()=>setSelected(i)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelected(i)}}}>
              {active&&<ellipse cy="36" rx="73" ry="32" stroke="#c3eb79" strokeWidth="2" strokeDasharray="6 4" fill="none"/>}
              <PointMachine variant={variant} index={i} active={active} checked={open[gateIndex]}/>
              <text x="0" y="86" fontSize="13" textAnchor="middle" fill={active?"#e6f9b0":"#c8d7df"} fontWeight="700">{steps[i].name}</text>
              <text x="0" y="-90" fontSize="11" textAnchor="middle" fill="#b5c6d0" fontFamily="monospace">{steps[i].key}</text>
            </g>
          })}
          <text x="35" y="43" fill="#bfd0d7" fontFamily="monospace" fontSize="13">CLICK ANY MODULE TO INSPECT THE WORKFLOW</text>
          <text x="35" y="468" fill="#8fb2c0" fontFamily="monospace" fontSize="10">SCHEMATIC MODEL · ALL STATES ARE SIMULATED · NO CLIENT DATA</text>
        </svg>
      </div>
      <div className="border-t border-white/15 p-4">
        <p className="font-mono text-xs text-[#c9f28a]" aria-live="polite">{status}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {gates[variant].map((g,i)=><button type="button" key={g.name} onClick={()=>swap(i)} aria-pressed={open[i]}
            className={`min-h-11 rounded-md border px-3 py-2 text-left text-xs focus-visible:ring-2 focus-visible:ring-white ${open[i]?"border-[#b9e462] bg-[#344b35] text-[#e4ffc7]":"border-white/25 bg-white/5 text-white/80 hover:border-white/50"}`}>
            <span className="inline-flex items-center gap-2">{open[i]&&<Check className="h-3.5 w-3.5"/>}{g.name}</span><span className="block text-[10px] opacity-70">{g.subtitle}</span>
          </button>)}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={()=>setTested(true)} className="rounded-md bg-[#b9e462] px-4 py-2.5 text-sm font-semibold text-[#0b1b21]">Test interlock <ArrowRight className="ml-1 inline h-4 w-4"/></button>
          <button type="button" onClick={restart} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm text-white"><RotateCcw className="h-4 w-4"/> Reset</button>
        </div>
      </div>
    </div>
    <aside className="rounded-xl border border-border bg-card p-5 md:p-7">
      <p className="font-mono text-xs uppercase tracking-widest text-[#587f00] dark:text-signal-green">Stage {current.key} / {steps.length}</p>
      <h3 className="mt-3 text-2xl font-semibold">{current.headline}</h3>
      <p className="mt-4 min-h-[112px] text-sm leading-7 text-muted-foreground">{current.body}</p>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <button type="button" onClick={()=>setSelected(v=>Math.max(0,v-1))} disabled={selected===0} className="rounded-md border border-border px-3 py-2 text-sm font-medium disabled:opacity-30">Previous</button>
        <button type="button" onClick={()=>setSelected(v=>Math.min(steps.length-1,v+1))} disabled={selected===steps.length-1} className="rounded-md border border-border px-3 py-2 text-sm font-medium disabled:opacity-30">Next</button>
      </div>
      <a href={current.anchor} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">
        Inspect this case's evidence <ArrowRight className="h-4 w-4"/>
      </a>
      <p className="mt-7 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
        Built as a bespoke, accessible SVG interaction inspired by the preserved Anatomy isometric kit. No controls call external APIs, create PRs, certify acceptance or expose client materials.
      </p>
    </aside>
  </div>
}
