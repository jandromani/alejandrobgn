"use client"
import {useState,useEffect} from "react"
import Link from "next/link"
import {ArrowRight,FileCode2,GitPullRequest,Braces,ShieldCheck,Users,BookOpenText,Play,Pause,RotateCcw,Route,ShieldAlert,Check,CircleOff} from "lucide-react"
import {EngineeringAnatomy} from "@/components/anatomy-machine-v3"

export type Domain="agentic"|"factory"
type Layer="executive"|"architecture"|"engineering"
type Stage={title:string;role:string;executive:string;architecture:string;engineering:string;output:string}
type Gate={id:string;label:string;at:number;reason:string;guard:string}
type Fixture={id:string;label:string;brief:string;artifacts:string[]}
const blueprint:Record<Domain,{title:string;subtitle:string;limit:string;stages:Stage[];gates:Gate[];fixtures:Fixture[]}>={
agentic:{title:"A TEAM BECOMES AI-ENABLED",subtitle:"From zero business context to team-level agentic engineering adoption in under four weeks.",limit:"The real adoption timeline comes from the delivery-team account. This browser exercise is synthetic and never contacts the client.",stages:[
{title:"Discover",role:"INTAKE",executive:"Two engineers created a joint delivery team and learned a new business quickly.",architecture:"Agree ownership, scope and fast collaboration channels before deploying agents.",engineering:"Fictional sample: an order-status feature, not a customer issue.",output:"Working agreement"},
{title:"Knowledge",role:"CONTEXT",executive:"The team captured business and engineering context to enable the tools.",architecture:"Ground all specialist roles in a shared versioned knowledge base.",engineering:"Synthetic docs/order-domain.md converted to context/order-module.json.",output:"Reusable corpus"},
{title:"Copilots",role:"SPECIALISTS",executive:"Backend, Frontend, QA and Gherkin/Cucumber copilots operated in the team's workflow.",architecture:"Separate specialized responsibilities and explicit permissions.",engineering:"Example contracts: API, UI component, Gherkin feature and QA plan.",output:"Scoped agent tasks"},
{title:"PR forge",role:"EXECUTION",executive:"Agents produced code changes and pull requests, reviewed by people.",architecture:"Translate a specification into bounded code and reviewable PRs.",engineering:"Illustrative PR #DEMO-42, order-status.ts and status.feature.",output:"Reviewable PR"},
{title:"SDD / DoD",role:"QUALITY",executive:"Logical gates and Definition of Done improved the SDD kit.",architecture:"Reject incomplete specifications or changes without review approval.",engineering:"Given an order / When status changes / Then its history is shown.",output:"Approved handoff"},
{title:"Team adoption",role:"ENABLEMENT",executive:"The participating engineers used the new workflow within one month.",architecture:"Transfer knowledge, tool ownership and review responsibilities to the team.",engineering:"No invented number of PRs, engineers or hours saved.",output:"Active team use"}],
gates:[{id:"context",label:"Business context",at:1,reason:"No grounding: the team cannot interpret the domain reliably.",guard:"Copilot context must be versioned and grounded."},{id:"spec",label:"Reviewed specification",at:3,reason:"No reviewed specification: PR execution is stopped.",guard:"Generated changes must be tied to the agreed SDD scope."},{id:"human",label:"Human approval + DoD",at:4,reason:"Review missing: a generated PR cannot pass to adoption.",guard:"Humans review the change and acceptance evidence."}],
fixtures:[
{id:"order",label:"Order status",brief:"Show the status history of a fictional order.",artifacts:["docs/order-domain.md","context/order-module.json","GET /orders/{id}/history","OrderStatusPanel.tsx","status-history.feature","PR #DEMO-42 / reviewed"]},
{id:"return",label:"Return eligibility",brief:"Explain whether a fictional order can be returned.",artifacts:["docs/return-policy.md","context/return-rules.json","GET /returns/{id}/eligibility","ReturnEligibility.tsx","return-eligibility.feature","PR #DEMO-73 / reviewed"]}
]},
factory:{title:"A CORPUS BECOMES TRACEABLE ENGINEERING",subtitle:"Legacy systems → canonical knowledge → deterministic outputs → evidence.",limit:"The production numbers elsewhere describe a bounded four-week PoC with one reference module. Nothing here demonstrates full functional parity.",stages:[
{title:"Whole corpus",role:"INGEST",executive:"The crucial design was to approach an entire legacy corpus, not isolated files.",architecture:"Map Java, JSF, configuration and relationships before conversion.",engineering:"Fictional src/OrderModule.java and its dependency graph.",output:"System inventory"},
{title:"Reference slice",role:"BOUNDARY",executive:"One module gave the factory a focused proving ground.",architecture:"Separate a verifiable test slice from an estate-wide ambition.",engineering:"A synthetic OrderModule is the only active demonstration input.",output:"Bounded PoC"},
{title:"Canonical IR",role:"KNOWLEDGE",executive:"Legacy knowledge is organized into traceable intermediate objects.",architecture:"Source positions and hashes ground the canonical code graph.",engineering:"OrderModule.java:42 → function OrderTotal.calculate → ORD-042.",output:"Traceable IR"},
{title:"Generators",role:"TRANSFORM",executive:"Controlled generators derive APIs, UI and tests from the same knowledge.",architecture:"Contracts and generated components share one canonical model.",engineering:"ORD-042 → GET /orders/{id} → OrderSummaryComponent.",output:"Target assets"},
{title:"Comparator",role:"VERIFY",executive:"Bounded repeatability checks make generation inspectable.",architecture:"Reproducible output is necessary but not proof of behavioral equivalence.",engineering:"Synthetic comparison only; no actual hashes, code or tests executed.",output:"Repeatability evidence"},
{title:"Evidence ledger",role:"PROVENANCE",executive:"Trace every proposed output back to source and quality evidence.",architecture:"Record provenance, tests, gaps and unsupported parity claims.",engineering:"ORD-042 → API → component → illustrative contract test.",output:"Evidence chain"}],
gates:[{id:"lineage",label:"Source lineage",at:2,reason:"Missing source lineage: the IR cannot be trusted.",guard:"IR objects must refer back to source locations and hashes."},{id:"contract",label:"Accepted contract",at:3,reason:"Contract missing: generators must not produce an approved target.",guard:"Contracts gate dependent APIs, UI assets and tests."},{id:"repeatability",label:"Deterministic comparison",at:4,reason:"Comparison failed: output repeatability is unproven.",guard:"Stable outputs do not establish functional equivalence."}],
fixtures:[
{id:"order",label:"Order module",brief:"Modernize a fictional legacy order lookup.",artifacts:["src/OrderModule.java:42","module:Order","IR:ORD-042","GET /orders/{id} / OrderSummaryComponent","order-contract.spec.ts","EV-ORD-042 → source-linked"]},
{id:"invoice",label:"Invoice module",brief:"Modernize a fictional legacy invoice calculator.",artifacts:["src/InvoiceModule.java:88","module:Invoice","IR:INV-088","GET /invoices/{id} / InvoiceTotalComponent","invoice-total.spec.ts","EV-INV-088 → source-linked"]}
]}}
const icons=[FileCode2,BookOpenText,Braces,GitPullRequest,ShieldCheck,Users]
type RunStatus="idle"|"running"|"blocked"|"complete"
export function AnatomyV4({mode}:{mode:Domain}){
 const spec=blueprint[mode],accent=mode==="agentic"?"#a8ee83":"#88e3e5"
 const [depth,setDepth]=useState<Layer>("architecture")
 const [fixtureId,setFixtureId]=useState(spec.fixtures[0].id)
 const [off,setOff]=useState<string[]>([])
 const [status,setStatus]=useState<RunStatus>("idle")
 const [cursor,setCursor]=useState(-1)
 const [step,setStep]=useState(0)
 const [focus,setFocus]=useState(0)
 const [tour,setTour]=useState(false)
 const fixture=spec.fixtures.find(f=>f.id===fixtureId)||spec.fixtures[0]
 const active=spec.stages[step],gate=spec.gates.find(g=>g.at===step)
 const blocker=spec.gates.find(g=>g.at===cursor&&off.includes(g.id))
 const passed=cursor<0?0:status==="blocked"?cursor:cursor+1
 function clear(){setStatus("idle");setCursor(-1);setStep(0);setFocus(0);setTour(false)}
 function disconnect(id:string){setOff(o=>o.includes(id)?o.filter(x=>x!==id):o.concat(id));clear()}
 function run(){setStep(0);setCursor(-1);setStatus("running");setTour(false)}
 function playTour(){clear();setTour(true)}
 useEffect(()=>{
  if(status!=="running")return
  const timer=window.setTimeout(()=>{
   const next=cursor+1
   if(next>=6){setStatus("complete");return}
   setCursor(next);setStep(next);setFocus(next)
   if(spec.gates.some(g=>g.at===next&&off.includes(g.id)))setStatus("blocked")
   else if(next===5)setStatus("complete")
  },720)
  return ()=>window.clearTimeout(timer)
 },[status,cursor,off,spec])
 useEffect(()=>{
  if(!tour)return
  const timer=window.setInterval(()=>setStep(i=>{if(i>=5){setTour(false);return 5}return i+1}),2100)
  return ()=>window.clearInterval(timer)
 },[tour])
 const message=status==="blocked"?(blocker?.reason||"Quality gate blocked execution"):status==="complete"?"Fictional chain completed · parity is not implied":status==="running"?"Processing sample through the guarded stages":"Ready for a fictional test run"
 const modes:Layer[]=["executive","architecture","engineering"]
 return <div className="a4-root space-y-5" data-kind={mode}>
 <div className="a4-title-panel"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="a4-kicker">ANATOMY V4 / CAUSAL ENGINEERING</p><h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">{spec.title}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{spec.subtitle}</p></div><span className="a4-reconstruction">ILLUSTRATIVE MODEL · NO CLIENT DATA</span></div><div className="mt-5 flex flex-wrap gap-2" aria-label="Explanatory depth" role="group">{modes.map(m=><button type="button" key={m} aria-pressed={depth===m} onClick={()=>setDepth(m)} className={"a4-depth "+(depth===m?"a4-depth-current":"")}>{m.charAt(0).toUpperCase()+m.slice(1)}</button>)}<Link href="/anatomy" className="ml-auto inline-flex items-center gap-2 text-xs text-[#a8ee83] hover:underline">Master principles <ArrowRight size={14}/></Link></div></div>
 <div className="a4-apparatus"><EngineeringAnatomy mode={mode} activeStep={step} onStageChange={i=>{setStep(i);setFocus(i);setTour(false)}}/></div>
 <section className="a4-sim p-5 md:p-7" aria-label="Causal laboratory"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="a4-kicker">01 / INTERVENTION LABORATORY</p><h3 className="mt-1 text-xl font-semibold">Remove a safeguard. Observe the consequence.</h3></div><span className="font-mono text-[10px] text-slate-400">LOCAL STATE · NO REMOTE INFERENCE</span></div>
 <div className="mt-6 grid gap-5 lg:grid-cols-2"><div className="min-w-0"><p className="a4-label">CHOOSE FICTIONAL INPUT</p><div className="mt-2 flex flex-wrap gap-2">{spec.fixtures.map(f=><button type="button" key={f.id} onClick={()=>{setFixtureId(f.id);clear()}} aria-pressed={fixtureId===f.id} className={"a4-sample "+(fixtureId===f.id?"a4-sample-active":"")}><FileCode2 size={14}/>{f.label}</button>)}</div><p className="mt-3 text-sm text-slate-300">{fixture.brief}</p><p className="a4-label mt-6">DISCONNECT QUALITY CONTROLS</p><div className="mt-3 space-y-2">{spec.gates.map(g=><button type="button" key={g.id} aria-pressed={off.includes(g.id)} className={"a4-gate "+(off.includes(g.id)?"a4-gate-off":"")} onClick={()=>disconnect(g.id)}><span className={"a4-gate-led "+(off.includes(g.id)?"a4-gate-led-off":"")}/><span className="flex-1 text-left"><strong className="block text-xs">{g.label}</strong><small className="text-[10px] text-slate-400">Station {String(g.at+1).padStart(2,"0")} · {off.includes(g.id)?"DISCONNECTED":"CONNECTED"}</small></span>{off.includes(g.id)?<CircleOff size={17} className="text-orange-300"/>:<Check size={17} className="text-[#a8ee83]"/>}</button>)}</div><div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={run} className="a4-run"><Play size={16}/> RUN FIXTURE</button><button type="button" onClick={clear} className="a4-tool"><RotateCcw size={15}/> Reset</button><button type="button" onClick={()=>tour?setTour(false):playTour()} className="a4-tool">{tour?<Pause size={15}/>:<Route size={15}/>} {tour?"Stop tour":"Guided tour"}</button></div></div>
 <div className="a4-console min-w-0"><div className="flex items-center justify-between gap-2"><p className="a4-label">EXECUTION CONSOLE</p><span className={"a4-status a4-status-"+status}>{status.toUpperCase()}</span></div><p className="mt-5 text-sm font-semibold" aria-live="polite">{message}</p><div className="mt-4 grid grid-cols-6 gap-1" aria-label="Execution progress">{spec.stages.map((s,i)=><button key={s.role} type="button" onClick={()=>{setStep(i);setFocus(i)}} aria-label={"Inspect "+s.title} className={"a4-tick "+(i===step?"a4-tick-current":"")} style={{background:i<=cursor?(status==="blocked"&&i===cursor?"#e48b69":accent):undefined}}/>)}</div><p className="mt-2 font-mono text-[10px] text-slate-400">{passed} / 6 stages passed</p><div className="mt-4 space-y-1">{spec.stages.map((s,i)=>{const v=i>cursor?"WAITING":status==="blocked"&&i===cursor?"BLOCKED":"PASSED";return <div className={"a4-log "+(i===step?"a4-log-current":"")} key={s.title}><span className="font-mono text-slate-500">{String(i+1).padStart(2,"0")}</span><span>{s.title}</span><span className={"ml-auto font-mono "+(v==="BLOCKED"?"text-orange-300":v==="PASSED"?"text-[#a8ee83]":"text-slate-500")}>{v}</span></div>})}</div></div></div></section>
 <section className="a4-lineage p-5 md:p-7"><p className="a4-kicker">02 / SOURCE TO EVIDENCE</p><h3 className="mt-2 text-xl font-semibold">Follow an artifact through the machine.</h3><div className="a4-chain mt-5" role="group" aria-label="Inspectable artifact dependency chain">{fixture.artifacts.map((item,i)=>{const Icon=icons[i];return <div key={i} className="a4-chain-item"><button type="button" onClick={()=>{setFocus(i);setStep(i);setTour(false)}} aria-pressed={focus===i} className={"a4-artifact "+(focus===i?"a4-artifact-active":"")}><div className="flex items-center justify-between"><Icon size={18} style={{color:i<=cursor?accent:"#809ba9"}}/><span className="font-mono text-[10px] text-slate-500">0{i+1}</span></div><span className="mt-3 block text-[10px] uppercase tracking-widest text-slate-400">{spec.stages[i].role}</span><span className="mt-2 block break-words text-xs font-semibold leading-5">{item}</span><span className={"mt-3 block text-[10px] "+(i<=cursor?"text-[#a8ee83]":"text-slate-500")}>{i<=cursor?"REACHED":"AWAITING"}</span></button>{i<5&&<ArrowRight size={16} className="a4-chain-arrow"/>}</div>})}</div><div className="mt-4 grid gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4 md:grid-cols-[1.2fr_1fr]"><div><p className="a4-label">SELECTED ARTIFACT</p><p className="mt-2 break-words font-mono text-sm text-white">{fixture.artifacts[focus]}</p><p className="mt-2 text-xs leading-6 text-slate-400">{spec.stages[focus].engineering}</p></div><div><p className="a4-label">UPSTREAM DEPENDENCY</p><p className="mt-2 break-words text-xs leading-6 text-slate-300">{focus===0?"Original fictional source; every other sample artifact follows from here.":("Depends on station "+focus+" and its quality gates. Selecting it does not bypass the simulated execution.")}</p></div></div></section>
 <section className="a4-insight p-5 md:p-7"><div className="min-w-0"><p className="a4-kicker">03 / {depth.toUpperCase()} VIEW</p><h3 className="mt-2 text-xl font-semibold">{active.title}: what matters</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{active[depth]}</p></div><div className="rounded-lg border border-white/10 bg-[#111f2c] p-4"><p className="a4-label">GOVERNANCE BOUNDARY</p><p className="mt-3 text-xs leading-6 text-slate-300">{gate?gate.guard:"Explanatory local state only; no actual source analysis, model execution or production validation."}</p></div></section>
 <p className="flex items-start gap-2 text-xs leading-6 text-muted-foreground"><ShieldAlert size={17} className="mt-1 shrink-0"/>{spec.limit} This page does not operate customer systems or use real customer artifacts.</p>
 </div>
}
