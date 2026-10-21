import type { WritingArticle } from "@/data/writing"

const models: Record<string, { stages:string[]; input:string; output:string }> = {
  "governing-agentic-systems": { stages:["POLICY","RUNTIME","EVIDENCE","CONTROL"], input:"INTENT", output:"OUTCOMES" },
  "entropy-problem-llms": { stages:["ENVELOPE","TRAJECTORY","CHECKPOINT","INTERVENE"], input:"STATE", output:"STABILITY" },
  "avoiding-vendor-lock-in": { stages:["DISCOVER","NORMALISE","VERIFY","PUBLISH"], input:"SOURCES", output:"CLAIMS" },
  "ai-platform-economics": { stages:["PRICE","TRACE","OUTCOME","BUDGET"], input:"DEMAND", output:"MARGIN" },
  "observability-agentic-systems": { stages:["IDENTITY","ACTION","SIDE EFFECT","TRACE"], input:"INTENT", output:"EVIDENCE" },
  "building-in-public": { stages:["CLAIM","BOUNDARY","EVIDENCE","UPDATE"], input:"WORK", output:"TRUST" },
  "orchestration-patterns": { stages:["CONTRACT","ROUTE","EXECUTE","TERMINATE"], input:"GOAL", output:"RESULT" },
  "safety-alignment-systems": { stages:["CAPABILITY","AUTHORITY","MONITOR","RECOVER"], input:"CONTEXT", output:"CONTROL" },
}

const dust=Array.from({length:56},(_,i)=>({x:22+(i*47)%150,y:90+(i*31)%205,r:i%9===0?2:1,o:.12+(i%5)*.12}))

export function ArticleFieldVisual({ article }: { article: WritingArticle }) {
  const model=models[article.slug]??{stages:["POLICY","RUNTIME","EVIDENCE","CONTROL"],input:"INPUT",output:"OUTPUT"}
  const [top,right,bottom,left]=model.stages
  return <svg viewBox="0 0 720 390" role="img" aria-label={`${article.title}: four-stage operating loop`} aria-describedby={`map-${article.slug}-desc`} className="h-full w-full overflow-visible">
    <desc id={`map-${article.slug}-desc`}>A closed-loop architecture linking {model.stages.join(", ")}.</desc>
    <defs><radialGradient id={`map-pulse-${article.slug}`}><stop stopColor="#b8ff5a"/><stop offset="1" stopColor="#b8ff5a" stopOpacity="0"/></radialGradient><filter id={`map-glow-${article.slug}`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><pattern id={`map-grid-${article.slug}`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#fff" strokeOpacity=".045"/></pattern></defs>
    <rect width="720" height="390" fill={`url(#map-grid-${article.slug})`}/>
    <g>{dust.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={p.r} fill={i%3?"#b8ff5a":"#22d3ee"} opacity={p.o}/>)}</g>
    <g transform="translate(62 196)"><text x="0" y="-22" fill="#b8ff5a" fontFamily="monospace" fontSize="9" letterSpacing="1.5">{model.input}</text><path d="M0 0H132" stroke="#b8ff5a" strokeWidth="1.2"/><path d="m132 0-8-4v8Z" fill="#b8ff5a"/></g>
    <g transform="translate(270 37)"><rect width="168" height="58" rx="7" fill="#080b0f" stroke="#b8ff5a"/><text x="84" y="25" textAnchor="middle" fill="#b8ff5a" fontFamily="monospace" fontSize="10" fontWeight="700" letterSpacing="1.2">{top}</text><text x="84" y="42" textAnchor="middle" fill="#9ea7b3" fontFamily="monospace" fontSize="8">define · constrain</text></g>
    <g transform="translate(475 160)"><rect width="168" height="64" rx="7" fill="#080b0f" stroke="#22d3ee"/><text x="84" y="27" textAnchor="middle" fill="#22d3ee" fontFamily="monospace" fontSize="10" fontWeight="700" letterSpacing="1.2">{right}</text><text x="84" y="45" textAnchor="middle" fill="#9ea7b3" fontFamily="monospace" fontSize="8">execute · observe</text></g>
    <g transform="translate(270 286)"><rect width="168" height="61" rx="7" fill="#080b0f" stroke="#a78bfa"/><text x="84" y="26" textAnchor="middle" fill="#a78bfa" fontFamily="monospace" fontSize="10" fontWeight="700" letterSpacing="1.2">{bottom}</text><text x="84" y="44" textAnchor="middle" fill="#9ea7b3" fontFamily="monospace" fontSize="8">collect · verify</text></g>
    <g transform="translate(164 160)"><rect width="142" height="64" rx="7" fill="#080b0f" stroke="#60a5fa"/><text x="71" y="27" textAnchor="middle" fill="#60a5fa" fontFamily="monospace" fontSize="10" fontWeight="700" letterSpacing="1.2">{left}</text><text x="71" y="45" textAnchor="middle" fill="#9ea7b3" fontFamily="monospace" fontSize="8">route · intervene</text></g>
    <g fill="none" stroke="#dce3e9" strokeOpacity=".7"><path d="M354 95v31c0 17 12 26 31 26h90"/><path d="M559 224v23c0 24-15 39-40 39h-81"/><path d="M270 316h-38c-23 0-34-13-34-35v-57"/><path d="M235 160v-28c0-24 15-37 39-37h80"/></g>
    <g fill="#dce3e9"><path d="m471 152-8-4v8Z"/><path d="m442 286 8-4v8Z"/><path d="m198 228-4 8h8Z"/><path d="m350 95-8-4v8Z"/></g>
    <circle cx="354" cy="192" r="18" fill={`url(#map-pulse-${article.slug})`} opacity=".5"/><circle cx="354" cy="192" r="5" fill="#b8ff5a" filter={`url(#map-glow-${article.slug})`}/>
    <g transform="translate(643 192)"><path d="M0 0H56" stroke="#22d3ee"/><circle cx="56" r="3" fill="#22d3ee"/><text x="4" y="-17" fill="#22d3ee" fontFamily="monospace" fontSize="9" letterSpacing="1.5">{model.output}</text></g>
    <path d="M138 362v12h525v-12" fill="none" stroke="#fff" strokeOpacity=".3" strokeDasharray="4 5"/><text x="400" y="386" textAnchor="middle" fill="#fff" fillOpacity=".45" fontFamily="monospace" fontSize="8" letterSpacing="1.5">EVIDENCE BOUNDARY / WHAT CAN BE OBSERVED, VERIFIED AND DEFENDED</text>
  </svg>
}
