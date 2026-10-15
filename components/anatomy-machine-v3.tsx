"use client"

import {useState} from "react"
import {ArrowLeft,ArrowRight,Layers3,Activity,Pause,Play,RotateCcw,Info} from "lucide-react"

type Kind="agentic"|"factory"
type View="assembled"|"exploded"|"signals"
type Cell={name:string;label:string;device:string;explanation:string;input:string;output:string;measure:string;boundary:string;category:string}
const blue="#3b8797",green="#50965a"
const machines:Record<Kind,{name:string;subtitle:string;color:string;cap:string;cells:Cell[]}> = {
 agentic:{
 name:"THE AGENTIC DELIVERY ENGINE",
 subtitle:"A real team-enablement journey, illustrated as a functioning technical machine.",
 color:green,cap:"AUGUST 2026 / UNDER ONE MONTH",
 cells:[
 {name:"Business intake",label:"01 DISCOVERY",device:"Context hopper",explanation:"Two engineers began without previous client knowledge. We formed a joint team, learned how the business worked and established rapid feedback and shared ownership.",input:"Unfamiliar business + repositories",output:"Joint delivery framework",measure:"2 initial engineers",boundary:"Team collaboration, not individual-only delivery",category:"Delivered"},
 {name:"Knowledge drum",label:"02 CONTEXT",device:"Corpus and memory vessel",explanation:"Business rules, architecture, repository conventions and working context were captured, structured and made available to the specialist tools and people.",input:"Business + technical material",output:"Reusable engineering context",measure:"Knowledge corpus",boundary:"No proprietary corpus contents published",category:"Delivered"},
 {name:"Copilot array",label:"03 SPECIALISTS",device:"Four service cartridges",explanation:"Working Backend, Frontend, QA and Gherkin/Cucumber copilots were adapted to day-to-day development, alongside the APM and supporting agent workflows.",input:"Context + task specification",output:"Role-specific copilot assistance",measure:"4 disciplines",boundary:"Roles, not an externally audited agent count",category:"Operational"},
 {name:"PR forge",label:"04 IMPLEMENTATION",device:"Agent-assisted code press",explanation:"Agents produced code changes and pull requests within a collaborative delivery workflow. Human engineers remained responsible for review, integration and quality.",input:"Bounded implementation task",output:"Reviewable pull request",measure:"PRs generated",boundary:"No unsupported PR count or autonomous-merge claim",category:"Operational"},
 {name:"SDD interlock",label:"05 VERIFICATION",device:"Dual logical quality gate",explanation:"The SDD kit was adapted and improved with explicit logical gates, acceptance checks, Gherkin and a Definition of Done, connecting specifications to implementation evidence.",input:"PR + acceptance criteria",output:"Reviewed delivery",measure:"SDD + DoD",boundary:"Approval is a team decision, not automatic parity",category:"Operational"},
 {name:"Team console",label:"06 ADOPTION",device:"Output and enablement station",explanation:"Participating engineers started using the agentic workflow within the month. The value was getting a team moving, not producing a slideshow about possible AI adoption.",input:"Working tools + knowledge transfer",output:"Team-level active use",measure:"< 1 month",boundary:"Time-to-use reported by the delivery team; no audit of full-company adoption",category:"Reported outcome"}
 ]},
 factory:{
 name:"THE DETERMINISTIC MODERNIZATION FACTORY",
 subtitle:"A corpus-first architecture; one reference module used to prove a repeatable path.",
 color:blue,cap:"FOUR-WEEK POC / FUNCTIONAL PARITY UNPROVEN",
 cells:[
 {name:"Corpus intake",label:"01 WHOLE CORPUS",device:"Legacy source magazine",explanation:"The fundamental design decision was to reason over a whole legacy corpus and its dependencies—not manually translate isolated files and hope they compose into a system.",input:"Java / JSF / config / dependencies",output:"Mapped system knowledge",measure:"Corpus-first thesis",boundary:"Full-estate migration not claimed",category:"Architected"},
 {name:"Reference press",label:"02 REFERENCE SLICE",device:"Module clamping press",explanation:"One bounded legacy module provided a controlled proving ground to test extraction, generation and checking without claiming every possible legacy system was covered.",input:"One representative module",output:"Reproducible PoC slice",measure:"1 reference module",boundary:"Extrapolation to other modules not verified",category:"Delivered"},
 {name:"IR chamber",label:"03 KNOWLEDGE GRAPH",device:"Transparent canonicalizer",explanation:"The canonical intermediate representation and code graph linked reconstructed functions, source locations and evidence hashes to consistent downstream artifacts.",input:"Parsed source and relationships",output:"Canonical traceable knowledge",measure:"91 represented functions",boundary:"Represented does not mean functionally migrated",category:"Measured"},
 {name:"Generator heads",label:"04 TARGET OUTPUTS",device:"Three-head deterministic mill",explanation:"Controlled generators derived target UI components, API contracts and validation assets. Repeatable rules reduced reliance on prompt-by-prompt ad hoc translation.",input:"Canonical IR + contracts",output:"UI / APIs / tests",measure:"173 UI · 66 API",boundary:"Generated UI is not 173 deployed microfrontends",category:"Measured"},
 {name:"Parity rollers",label:"05 REPEATABILITY",device:"Twin-drum comparator",explanation:"The same generation profile was checked through file comparisons and structural tests. Output determinism is necessary, but distinct from user-level functional parity.",input:"Two bounded generation runs",output:"Diff and test evidence",measure:"4,338 files compared",boundary:"Structural repeatability ≠ functional equivalence",category:"Measured"},
 {name:"Evidence register",label:"06 TRACEABILITY",device:"Provenance index printer",explanation:"Every claim should be traceable back to source positions and hashes; the approach also records incomplete deliveries and runtime validation gaps explicitly.",input:"Sources + test artifacts",output:"Auditable evidence ledger",measure:"22,995 references",boundary:"Production runtime parity remains unproven",category:"Measured"}
 ]}
}

function Plate({x=-66,y=182,w=132,h=92,d=16,accent,lit}:{x?:number;y?:number;w?:number;h?:number;d?:number;accent:string;lit:boolean}){
 return <g>
  <path d={"M"+x+" "+y+" l"+d+" -"+d+" h"+w+" l-"+d+" "+d+" z"} fill="#dce7e6" stroke="#64858f" strokeWidth="1.4"/>
  <path d={"M"+(x+w)+" "+y+" l"+d+" -"+d+" v"+h+" l-"+d+" "+d+" z"} fill="#68848e" stroke="#395566" strokeWidth="1.4"/>
  <rect x={x} y={y} width={w} height={h} rx="3" fill="#b4c9cb" stroke="#4a707c" strokeWidth="1.8"/>
  <rect x={x+9} y={y+12} width={w-18} height={h-27} rx="3" fill="#d9e2de" stroke="#91aab2"/>
  <rect x={x+10} y={y+12} width="5" height={h-27} fill="#9fb6bb"/>
  {[[x+7,y+7],[x+w-7,y+7],[x+7,y+h-7],[x+w-7,y+h-7]].map(([cx,cy],i)=><g key={i}><circle cx={cx} cy={cy} r="3.5" fill="#506a77" stroke="#e2ebea" strokeWidth=".6"/><path d={"M"+(cx-1.5)+" "+cy+" h3"} stroke="#e2ebea" strokeWidth=".65"/></g>)}
  <rect x={x+24} y={y+h-20} width={w-43} height="6" rx="3" fill="#718f96"/>
  <circle cx={x+w-14} cy={y+h-17} r="4" fill={lit?accent:"#667d86"} stroke="#f6fff6" strokeWidth=".7"/>
 </g>
}
function Token({x,y,tone="#5cae78",text}:{x:number;y:number;tone?:string;text:string}){return <g><rect x={x} y={y} width="39" height="22" rx="3" fill="#1d353e" stroke={tone} strokeWidth="1.2"/><text x={x+19.5} y={y+15} textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="bold" fill={tone}>{text}</text></g>}
function Intake({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-31px)":undefined}}>
 <path d="M-59 87 H55 L30 152 H-30 Z" fill="#b0c7c7" stroke="#4b727c" strokeWidth="2"/>
 <path d="M-51 95 H47 L23 144 H-23 Z" fill="#344c5c" stroke="#7faba9" strokeWidth="1.3"/>
 <path d="M-54 87 l15 -17 h91 l3 17" fill="#eef0db" stroke="#829ea0" strokeWidth="2"/>
 {[-30,-8,14].map((x,i)=><g key={i} className="v3-feed" style={{animationDelay:i*.35+"s"}}><rect x={x} y={91+i*6} width="25" height="19" rx="2" fill={i===0?"#dbe9e1":"#b4c5c2"} stroke="#547785"/><path d={"M"+(x+4)+" "+(97+i*6)+" h17 m-17 5 h11"} stroke="#668c8b" strokeWidth="2"/></g>)}
 <path d="M-9 144 v28 h18 v-28" fill="#9db7b8" stroke="#3d6874" strokeWidth="2"/>
 </g><Token x={-21} y={217} text="IN"/>
 </g>}
function Knowledge({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-40px)":undefined}}>
 <rect x="-39" y="98" width="81" height="68" fill="#8daeb2" stroke="#456a75" strokeWidth="1.6"/>
 <ellipse cx="1" cy="98" rx="41" ry="15" fill="#deebe5" stroke="#5c818c" strokeWidth="2"/>
 <ellipse cx="1" cy="166" rx="41" ry="15" fill="#698e97" stroke="#456c78" strokeWidth="2"/>
 <path d="M-37 105 v57 M-21 106v59 M22 106v59 M39 105v58" stroke="#c2d3cf" strokeWidth="4" opacity=".7"/>
 <ellipse cx="1" cy="106" rx="35" ry="9" fill="#a8c4c0" opacity=".3"/>
 {[-16,-3,10].map((x,i)=><rect key={i} className="v3-record" x={x} y={125+i*3} width="12" height="25" rx="2" fill={accent} opacity={.62+i*.12}/>)}
 <path d="M42 125 h20 v-20 h-15" stroke="#c6a76f" strokeWidth="8" fill="none"/><circle cx="51" cy="105" r="7" fill="#ddc892" stroke="#677e80" strokeWidth="2"/>
 </g><Token x={-19} y={217} text="IR" tone={accent}/>
 </g>}
function Copilots({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-38px)":undefined}}>
 <rect x="-55" y="98" width="110" height="78" rx="3" fill="#667f88" stroke="#355566" strokeWidth="2"/>
 <rect x="-52" y="91" width="104" height="9" rx="2" fill="#dbe6df" stroke="#6f9098"/>
 {["BE","FE","QA","GH"].map((t,i)=>{const x=-47+i*25;return <g key={t}>
   <rect x={x} y={106} width="22" height="57" rx="2" fill="#c6d6d4" stroke="#506e7b"/>
   <path d={"M"+(x+4)+" 116 h14 M"+(x+4)+" 120 h14"} stroke="#7694a0" strokeWidth="1.3"/>
   <rect x={x+5} y={130} width="12" height="5" rx="1" fill={accent}/>
   <rect x={x+3} y={143} width="16" height="12" rx="1.5" fill="#2c4554"/>
   <text x={x+11} y={152} textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#d8f6e5">{t}</text>
   <circle cx={x+11} cy={111} r="2" fill={accent} className="v3-led"/>
 </g>})}
 <path d="M-46 87 V81 H46 V87" fill="none" stroke="#d7e7e1" strokeWidth="5"/>
 </g><Token x={-19} y={217} text="4×" tone={accent}/>
 </g>}
function Forge({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-34px)":undefined}}>
 <rect x="-54" y="99" width="108" height="62" rx="4" fill="#4d7380" stroke="#2b5260" strokeWidth="3"/>
 <path d="M-50 104 H50 L34 126 H-34 Z" fill="#c2d0c7" stroke="#74939d"/>
 <rect x="-36" y="124" width="72" height="31" rx="2" fill="#233f51" stroke="#9ab3b8"/>
 <g className="v3-piston"><rect x="-25" y="91" width="50" height="25" rx="2" fill="#b6c6c3" stroke="#4d7884"/><rect x="-18" y="115" width="36" height="14" fill="#99b5ad"/></g>
 <rect x="-9" y="70" width="18" height="23" fill="#657e84"/><rect x="-20" y="66" width="40" height="7" fill="#dbe4da"/>
 <path d="M-26 149 h52" stroke={accent} strokeWidth="4" strokeDasharray="6 4" className="v3-signal"/>
 </g><Token x={-19} y={217} text="PR" tone={accent}/>
 </g>}
function Gate({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-37px)":undefined}}>
 <rect x="-50" y="91" width="100" height="80" fill="#d8dfd8" stroke="#5a7a85" strokeWidth="3"/>
 <rect x="-41" y="104" width="82" height="53" fill="#3c5e6c" stroke="#a9c1b9"/>
 <rect x="-39" y="108" width="37" height="44" fill="#92aeb0" stroke="#d9e5df"/>
 <rect x="2" y="108" width="37" height="44" fill="#92aeb0" stroke="#d9e5df"/>
 <g className="v3-gate-leaf"><rect x="-34" y="113" width="28" height="33" fill="#e0e7df"/><path d="M-26 130 l6 6 10-13" fill="none" stroke={accent} strokeWidth="3"/></g>
 <g className="v3-gate-leaf-alt"><rect x="6" y="113" width="28" height="33" fill="#e0e7df"/><path d="M12 130 l6 6 10-13" fill="none" stroke={accent} strokeWidth="3"/></g>
 <rect x="-29" y="83" width="58" height="11" rx="2" fill="#526f7a"/>
 <circle cx="0" cy="88" r="4" fill={accent}/>
 </g><Token x={-19} y={217} text="QA" tone={accent}/>
 </g>}
function Console({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-34px)":undefined}}>
 <path d="M-51 106 L-43 83 H48 L55 106 V168 H-51Z" fill="#7e9ca4" stroke="#426a76" strokeWidth="3"/>
 <rect x="-38" y="95" width="79" height="48" rx="3" fill="#1e394a" stroke="#b9cec9" strokeWidth="2"/>
 <path d="M-29 119 h14 l10 -14 14 23 11 -17 h12" fill="none" stroke={accent} strokeWidth="3"/>
 {[-24,-3,18].map((x,i)=><g key={i}><rect x={x} y="151" width="13" height="8" rx="2" fill="#213f4d"/><circle cx={x+6.5} cy="155" r="2.4" fill={accent} className="v3-led"/></g>)}
 <path d="M-36 87 H41" stroke="#dde8e1" strokeWidth="2"/>
 </g><Token x={-19} y={217} text="GO" tone={accent}/>
 </g>}

function SourceRack({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-38px)":undefined}}>
 <path d="M-52 98V171H53V98" fill="#5d7a89" stroke="#3a6170" strokeWidth="3"/>
 {["JAVA","JSF","CFG","API"].map((t,i)=>{const x=-44+i*24;return <g key={t}><rect x={x} y={88-i%2*11} width="20" height="71+i%2*11" rx="2" fill={["#c4dbd4","#c8d0df","#d1d8bc","#c8c9d8"][i]} stroke="#617c86"/><rect x={x+3} y={105-i%2*11} width="14" height="5" fill={accent}/><text x={x+10} y={130-i%2*11} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#244151" transform={"rotate(-90 "+(x+10)+" "+(130-i%2*11)+")"}>{t}</text></g>})}
 <path d="M-55 171h111" stroke="#d1dfd9" strokeWidth="5"/>
 </g><Token x={-19} y={217} text="SRC" tone={accent}/>
 </g>}
function Clamp({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-43px)":undefined}}>
 <path d="M-53 102 V170 H53 V102" fill="#688895" stroke="#345e6d" strokeWidth="3"/>
 <rect x="-38" y="121" width="77" height="33" fill="#d5e0dd" stroke="#527783" strokeWidth="2"/>
 <path d="M-41 116 H41" stroke="#354d59" strokeWidth="5"/>
 <rect x="-8" y="78" width="16" height="42" fill="#87a2a8" stroke="#496a74" strokeWidth="2"/>
 <rect className="v3-piston" x="-28" y="102" width="56" height="11" rx="3" fill={accent}/>
 <path d="M-44 103V88h88v15" stroke="#bdccc5" strokeWidth="7" fill="none"/>
 <path d="M-25 138h50 M-25 143h36" stroke="#6a94a2" strokeWidth="3"/>
 </g><Token x={-19} y={217} text="1×" tone={accent}/>
 </g>}
function GraphChamber({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-41px)":undefined}}>
 <path d="M-47 99 L-27 80 H50 L48 167 H-47 Z" fill="#a2c4ca" fillOpacity=".42" stroke="#4f8999" strokeWidth="3"/>
 <path d="M-47 99 H29 L50 80 M29 99V165" stroke="#93b7be" strokeWidth="2" fill="none"/>
 {[[[-32,142],[-11,113]],[[-11,113],[13,134]],[[13,134],[32,108]],[[-11,113],[28,108]],[[-32,142],[13,134]]].map((pair,i)=><path key={i} d={"M"+pair[0][0]+" "+pair[0][1]+" L"+pair[1][0]+" "+pair[1][1]} stroke={accent} strokeWidth="2.5" strokeDasharray={i===4?"3 3":undefined}/>)}
 {[[-32,142],[-11,113],[13,134],[32,108],[28,108]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="7" fill="#e8f8ef" stroke={accent} strokeWidth="2.2"/><circle cx={x} cy={y} r="2.2" fill={accent}/></g>)}
 <path d="M-55 172 H56" stroke="#516f7c" strokeWidth="7"/>
 </g><Token x={-19} y={217} text="IR" tone={accent}/>
 </g>}
function Mill({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-41px)":undefined}}>
 <rect x="-52" y="99" width="104" height="74" fill="#7896a1" stroke="#426677" strokeWidth="2"/>
 {["UI","API","QA"].map((t,i)=>{const x=-43+i*32;return <g key={t}><rect x={x} y="92" width="26" height="49" fill="#e0e5d7" stroke="#5d818e" strokeWidth="2"/><rect className="v3-piston" x={x+8} y="74" width="10" height="32" fill="#9eabb4" stroke="#577586"/><path d={"M"+(x+4)+" 110 h18 m-18 6 h18 m-18 6 h12"} stroke="#6e9ba8" strokeWidth="2"/><rect x={x+3} y="146" width="20" height="13" rx="2" fill={accent}/><text x={x+13} y="156" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#e5f4ed">{t}</text></g>})}
 <path d="M-57 170 H57" stroke="#e0e9e4" strokeWidth="5"/>
 </g><Token x={-19} y={217} text="GEN" tone={accent}/>
 </g>}
function Comparator({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-43px)":undefined}}>
 <rect x="-53" y="91" width="106" height="79" rx="5" fill="#839ba5" stroke="#426a79" strokeWidth="3"/>
 {[-24,24].map((x,i)=><g key={i}>
  <g className="v3-roller" style={{transformOrigin:x+"px 130px",animationDirection:i?"reverse":"normal"}}>
   <circle cx={x} cy="130" r="24" fill="#d9e5de" stroke="#466b7c" strokeWidth="2.4"/>
   {Array.from({length:8},(_,j)=>{const a=j*Math.PI/4;return <path key={j} d={"M"+(x+6*Math.cos(a))+" "+(130+6*Math.sin(a))+"L"+(x+21*Math.cos(a))+" "+(130+21*Math.sin(a))} stroke="#91b1b8" strokeWidth="5"/>})}
  </g><circle cx={x} cy="130" r="5" fill="#406373" stroke="#e4f1e7" strokeWidth="1.5"/></g>)}
 <path d="M-24 83h48 M-24 178h48" stroke={accent} strokeWidth="4" strokeDasharray="6 5"/>
 <rect x="-13" y="146" width="26" height="10" rx="2" fill="#254253"/><text x="0" y="154" textAnchor="middle" fontSize="8" fill={accent} fontWeight="bold">=</text>
 </g><Token x={-19} y={217} text="CMP" tone={accent}/>
 </g>}
function Ledger({accent,exploded}:{accent:string;exploded:boolean}){return <g>
 <g className="v3-assembly" style={{transform:exploded?"translateY(-45px)":undefined}}>
 <rect x="-48" y="101" width="96" height="70" rx="4" fill="#64818c" stroke="#3e6675" strokeWidth="3"/>
 <rect x="-33" y="111" width="66" height="32" rx="2" fill="#213b4a" stroke="#c4d9d8"/>
 <path d="M-27 121 h52 M-27 129 h36" stroke={accent} strokeWidth="2"/>
 <g className="v3-receipt"><path d="M-26 136 h52 v41 l-5 -4 -6 4 -6 -4 -6 4 -6 -4 -6 4 -7 -4z" fill="#f1ead9" stroke="#8f9ba4"/><path d="M-19 149 h36 M-19 155 h28 M-19 161 h33" stroke="#668e95" strokeWidth="2"/></g>
 <rect x="-38" y="93" width="76" height="7" rx="3" fill="#cedbd6"/>
 </g><Token x={-19} y={217} text="EV" tone={accent}/>
 </g>}
const agentParts=[Intake,Knowledge,Copilots,Forge,Gate,Console]
const factoryParts=[SourceRack,Clamp,GraphChamber,Mill,Comparator,Ledger]

function Diagram({mode,selected,view,playing,onSelect}:{mode:Kind;selected:number;view:View;playing:boolean;onSelect:(n:number)=>void}){
 const accent=machines[mode].color,Parts=mode==="agentic"?agentParts:factoryParts
 return <div className={"v3-diagram-canvas "+(!playing?"v3-motion-off":"")} tabIndex={0} aria-label="Scrollable isometric mechanism with six selectable stages">
 <svg role="img" aria-label={mode==="agentic"?"Isometric six-stage machine showing discovery, context, copilots, code PR, quality gates and team adoption":"Isometric six-stage machine showing legacy corpus, module sample, knowledge graph, code generation, file comparison and evidence register"} viewBox="0 0 1170 365" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <pattern id={"v3-grid-"+mode} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="#7396a0" strokeOpacity=".15" fill="none"/></pattern>
 <linearGradient id={"v3-floor-"+mode} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f4f2e9"/><stop offset="1" stopColor="#d0d7d0"/></linearGradient>
 </defs>
 <rect width="1170" height="365" fill="#e5e9df"/>
 <rect width="1170" height="365" fill={"url(#v3-grid-"+mode+")"}/>
 <path d="M36 288 L1134 288 L1161 318 L65 318 Z" fill={"url(#v3-floor-"+mode+")"} stroke="#75939b" strokeWidth="2"/>
 <rect x="65" y="318" width="1096" height="21" rx="2" fill="#7b9196" stroke="#426371"/>
 <path d="M66 321 H1158" stroke="#e9ece1" strokeWidth="3" opacity=".8"/>
 {[...Array(30)].map((_,i)=><g key={i}><rect x={80+i*35} y="328" width="13" height="6" fill="#344f5d" opacity=".7"/><circle cx={85+i*35} cy="314" r="1.8" fill="#607780"/></g>)}
 <rect x="51" y="273" width="1060" height="17" rx="7" fill="#476775" stroke="#b3cac6" strokeWidth="3"/>
 <path d="M64 282 H1103" stroke="#aec3bd" strokeWidth="5" strokeDasharray="17 10"/>
 <path className={view==="signals"?"v3-signal-flow":"v3-signal-flow v3-signal-muted"} d="M63 282H1103" fill="none" stroke={accent} strokeWidth="6" strokeDasharray="12 24" strokeLinecap="round"/>
 {[...Array(6)].map((_,i)=>{const x=123+i*185,Part=Parts[i],active=selected===i,ex=view==="exploded";return <g key={i} className={"v3-module "+(view==="signals"&&!active?"v3-module-muted":"")} transform={"translate("+x+" 0)"}>
   <g className={"v3-module-figure "+(active?"v3-module-active":"")} role="button" tabIndex={0} aria-label={"Inspect "+machines[mode].cells[i].name} onClick={()=>onSelect(i)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelect(i)}}} style={{cursor:"pointer"}}>
    {active&&<rect x="-74" y="48" width="155" height="241" rx="14" fill={accent} opacity=".08" stroke={accent} strokeOpacity=".45" strokeDasharray="7 5"/>}
    <path d="M-67 279v18l12 9h119l13-9v-18" fill="#90a6a8" stroke="#547582" strokeWidth="1.6"/>
    <Plate accent={accent} lit={active}/>
    <Part accent={accent} exploded={ex}/>
    <rect x="-59" y="277" width="117" height="9" rx="2" fill={active?accent:"#9eb3b4"} stroke="#637e85"/>
    <text x="0" y="302" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace" fill="#284555">{String(i+1).padStart(2,"0")} / {machines[mode].cells[i].name.toUpperCase().slice(0,15)}</text>
    <circle cx="-57" cy="276" r="3" fill={accent} opacity={active?1:.35}/>
    <circle cx="57" cy="276" r="3" fill={accent} opacity={active?1:.35}/>
   </g>
   <line x1="0" y1="315" x2="0" y2="333" stroke="#6a8790" strokeWidth="1"/>
  </g>})}
 <rect x="52" y="343" width="138" height="13" rx="3" fill="#304b59"/><text x="121" y="353" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#e8f4ed">ENGINEERING / 2026</text>
 <text x="1121" y="352" textAnchor="end" fontFamily="monospace" fontSize="9" fill="#607e86">SCHEMATIC · NOT CLIENT HARDWARE</text>
 </svg></div>
}
export function EngineeringAnatomy({mode,activeStep,onStageChange}:{mode:Kind;activeStep?:number;onStageChange?:(index:number)=>void}){
 const spec=machines[mode]
 const[localStep,setLocalStep]=useState(2)
 const selected=activeStep??localStep
 const setSelected=(n:number)=>{setLocalStep(n);onStageChange?.(n)}
 const[view,setView]=useState<View>("assembled")
 const[playing,setPlaying]=useState(true)
 const current=spec.cells[selected]
 return <section className="v3-anatomy rounded-2xl border border-border bg-[#e6e9e1] text-[#1a3440]" aria-label={spec.name+" interactive engineering anatomy"}>
  <div className="v3-anatomy-header flex flex-col gap-4 border-b border-[#a6b8b7]/60 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
   <div><p className="font-mono text-[10px] tracking-[.18em] text-[#477b64]">ANATOMY / ENGINEERING EXPLAINER · {spec.cap}</p><h2 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{spec.name}</h2><p className="mt-2 max-w-xl text-xs leading-6 text-[#536e77]">{spec.subtitle}</p></div>
   <div className="flex flex-wrap gap-2" role="group" aria-label="Diagram visualization controls">
    {([["assembled","Assembly"],["exploded","Explode"],["signals","Signal path"]] as const).map(([v,label])=><button type="button" key={v} aria-pressed={view===v} onClick={()=>setView(v)} className={"v3-anatomy-tab "+(view===v?"v3-anatomy-tab-active":"")}>{v==="exploded"&&<Layers3 size={14}/>} {v==="signals"&&<Activity size={14}/>} {label}</button>)}
    <button type="button" className="v3-anatomy-icon" aria-label={playing?"Pause motion":"Play motion"} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause size={15}/>:<Play size={15}/>}</button>
   </div>
  </div>
  <Diagram mode={mode} selected={selected} view={view} playing={playing} onSelect={setSelected}/>
  <div className="grid grid-cols-2 gap-1 border-t border-[#9aafb2]/50 bg-[#d8e1dd] p-3 sm:grid-cols-3 xl:grid-cols-6" role="group" aria-label="Select an engineering station">{spec.cells.map((c,i)=><button type="button" key={c.label} onClick={()=>setSelected(i)} aria-pressed={i===selected} className={"v3-anatomy-step "+(i===selected?"v3-anatomy-step-active":"")}><span className="font-mono text-[10px] text-[#618089]">{String(i+1).padStart(2,"0")}</span><span className="block text-left text-xs font-semibold">{c.name}</span><span className="mt-1 block text-left text-[10px] text-[#617984]">{c.device}</span></button>)}</div>
  <div className="grid gap-6 border-t border-[#a6b8b7]/70 bg-[#f1f1e8] p-5 lg:grid-cols-[minmax(0,1fr)_290px] lg:p-7">
   <div aria-live="polite"><p className="font-mono text-[10px] tracking-[.15em] text-[#44766e]">{current.label} / {current.category.toUpperCase()}</p><h3 className="mt-2 text-2xl font-bold tracking-tight">{current.device}</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-[#435d68]">{current.explanation}</p><p className="mt-4 inline-flex items-start gap-2 rounded-md border border-[#c3cdca] bg-white/60 px-3 py-2 text-xs leading-5 text-[#47616a]"><Info size={15} className="mt-[2px] shrink-0"/>{current.boundary}</p></div>
   <div className="rounded-xl border border-[#b4c6c0] bg-white/75 p-4"><p className="font-mono text-[10px] tracking-widest text-[#63848a]">LIVE STAGE READOUT</p><p className="mt-3 text-2xl font-bold" style={{color:spec.color}}>{current.measure}</p><div className="mt-4 space-y-2 border-t border-[#d4ded7] pt-3 text-xs leading-5"><p><span className="font-semibold text-[#42606c]">IN </span> {current.input}</p><p><span className="font-semibold text-[#42606c]">OUT </span> {current.output}</p></div><div className="mt-4 flex items-center justify-between"><button type="button" aria-label="Previous mechanism" className="v3-anatomy-icon" onClick={()=>setSelected((selected+5)%6)}><ArrowLeft size={16}/></button><span className="font-mono text-xs text-[#6b8287]">{selected+1} / 6</span><button type="button" aria-label="Next mechanism" className="v3-anatomy-icon" onClick={()=>setSelected((selected+1)%6)}><ArrowRight size={16}/></button></div></div>
  </div>
 </section>
}
