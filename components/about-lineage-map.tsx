const networkNodes = [
  [210, 340], [265, 315], [318, 352], [375, 322], [430, 347], [488, 310], [546, 342], [605, 318], [666, 350], [723, 313],
  [250, 375], [344, 388], [455, 375], [570, 386], [690, 378],
]

const softwareBlocks = [
  [205, 224, 74, 31], [300, 209, 92, 35], [414, 232, 68, 31], [505, 211, 105, 37], [632, 229, 82, 30], [348, 257, 98, 30], [542, 258, 75, 27],
]

const contours = Array.from({ length: 13 }, (_, i) => {
  const y = 75 + i * 7
  return `M170 ${y} C235 ${39 + i * 9}, 298 ${116 + i * 3}, 368 ${78 + i * 5} S505 ${43 + i * 10}, 575 ${77 + i * 5} S710 ${111 + i * 3}, 786 ${70 + i * 7}`
})

export function AboutLineageMap({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`about-lineage relative ${compact ? "about-lineage--compact" : ""}`}>
      <svg viewBox="0 0 920 520" role="img" aria-labelledby="lineage-title lineage-desc" className="h-full w-full overflow-visible" preserveAspectRatio="xMidYMid meet">
        <title id="lineage-title">Lineage map from spatial thinking to production AI</title>
        <desc id="lineage-desc">Four perspective layers connect geography, software, platforms and production artificial intelligence.</desc>
        <defs>
          <linearGradient id="lineage-energy" x1="0" x2="1"><stop stopColor="#b8ff5a" /><stop offset=".52" stopColor="#22d3ee" /><stop offset="1" stopColor="#a78bfa" /></linearGradient>
          <radialGradient id="lineage-pulse"><stop stopColor="#eaffc9" /><stop offset=".2" stopColor="#b8ff5a" /><stop offset="1" stopColor="#b8ff5a" stopOpacity="0" /></radialGradient>
          <filter id="lineage-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <clipPath id="geo-plane"><path d="M192 47H760L813 145H140Z" /></clipPath>
          <clipPath id="software-plane"><path d="M190 188H760L811 283H141Z" /></clipPath>
          <clipPath id="platform-plane"><path d="M190 305H760L811 407H141Z" /></clipPath>
          <clipPath id="ai-plane"><path d="M190 414H760L811 505H141Z" /></clipPath>
          <pattern id="perspective-grid" width="38" height="23" patternUnits="userSpaceOnUse"><path d="M38 0H0V23" fill="none" stroke="#fff" strokeOpacity=".09" /></pattern>
        </defs>

        <g className="lineage-layer lineage-layer--geo">
          <path d="M192 47H760L813 145H140Z" fill="#b8ff5a" fillOpacity=".025" stroke="#b8ff5a" strokeOpacity=".45" />
          <g clipPath="url(#geo-plane)" fill="none" stroke="#b8ff5a" strokeOpacity=".45">{contours.map((d, i) => <path key={i} d={d} strokeWidth={i === 7 ? 1.8 : .8} />)}</g>
          <circle cx="565" cy="99" r="44" fill="none" stroke="#b8ff5a" strokeOpacity=".22" /><circle cx="565" cy="99" r="7" fill="#b8ff5a" filter="url(#lineage-glow)" />
          <path d="M565 99V432" stroke="#b8ff5a" strokeDasharray="4 7" strokeOpacity=".5" />
        </g>

        <g className="lineage-layer lineage-layer--software">
          <path d="M190 188H760L811 283H141Z" fill="#22d3ee" fillOpacity=".025" stroke="#22d3ee" strokeOpacity=".42" />
          <g clipPath="url(#software-plane)"><path d="M120 190H830V295H120Z" fill="url(#perspective-grid)" />{softwareBlocks.map(([x,y,w,h], i) => <rect key={i} x={x} y={y} width={w} height={h} fill="#071118" stroke="#22d3ee" strokeOpacity=".8" />)}<path d="M205 242H176M279 239H300M392 227H414M482 247H505M610 229H632M446 270H542" stroke="#22d3ee" strokeOpacity=".55" /></g>
        </g>

        <g className="lineage-layer lineage-layer--platform">
          <path d="M190 305H760L811 407H141Z" fill="#a78bfa" fillOpacity=".025" stroke="#a78bfa" strokeOpacity=".42" />
          <g clipPath="url(#platform-plane)" stroke="#a78bfa" strokeOpacity=".45">{networkNodes.slice(0, 10).map(([x,y], i) => <path key={i} d={`M${x} ${y} L${networkNodes[(i + 2) % networkNodes.length][0]} ${networkNodes[(i + 2) % networkNodes.length][1]}`} />)}{networkNodes.map(([x,y], i) => <g key={i}><circle cx={x} cy={y} r={i % 4 === 0 ? 5 : 3} fill="#a78bfa" stroke="none" filter={i % 4 === 0 ? "url(#lineage-glow)" : undefined} /><circle cx={x} cy={y} r="11" fill="none" strokeOpacity=".12" /></g>)}</g>
        </g>

        <g className="lineage-layer lineage-layer--ai">
          <path d="M190 414H760L811 505H141Z" fill="#b8ff5a" fillOpacity=".02" stroke="url(#lineage-energy)" strokeOpacity=".55" />
          <g clipPath="url(#ai-plane)" fill="none">{[0,1,2,3].map(i => <path key={i} className="lineage-flow" style={{animationDelay:`${i * -.7}s`}} d={`M145 ${455 + i * 11} C260 ${400 + i * 26}, 345 ${510 - i * 12}, 458 ${452 + i * 7} S650 ${414 + i * 25}, 815 ${466 + i * 5}`} stroke={i % 2 ? "#22d3ee" : "#b8ff5a"} strokeOpacity={.85 - i * .15} strokeWidth={i === 1 ? 2.2 : 1.2} />)}{Array.from({length:34},(_,i)=><circle key={i} cx={175 + (i*67)%600} cy={430 + (i*29)%67} r={i%5===0?2.2:1} fill={i%3?"#22d3ee":"#b8ff5a"} opacity={.25+(i%4)*.15}/>)}</g>
          <circle cx="260" cy="460" r="27" fill="url(#lineage-pulse)" opacity=".6" /><circle cx="260" cy="460" r="8" fill="#b8ff5a" /><circle cx="565" cy="463" r="5" fill="#22d3ee" filter="url(#lineage-glow)" />
        </g>

        {[{n:"01",name:"Geography",y:93,c:"#b8ff5a"},{n:"02",name:"Software",y:233,c:"#22d3ee"},{n:"03",name:"Platforms",y:350,c:"#a78bfa"},{n:"04",name:"Production AI",y:458,c:"#b8ff5a"}].map(item => <g key={item.n} transform={`translate(18 ${item.y})`}><text fill={item.c} fontFamily="monospace" fontSize="11" fontWeight="700">{item.n}</text><text x="30" fill="#f5f7fa" fontFamily="sans-serif" fontSize="18" fontWeight="700">{item.name}</text></g>)}
        <g fontFamily="monospace" fontSize="9" fill="#9ea7b3"><text x="820" y="86">TERRITORIES</text><text x="820" y="101">SPATIAL REASONING</text><text x="820" y="226">ABSTRACTIONS</text><text x="820" y="241">CONTRACTS</text><text x="820" y="344">RUNTIME</text><text x="820" y="359">FOUNDATIONS</text><text x="820" y="451">CONTROL</text><text x="820" y="466">EVIDENCE</text></g>
        {[99,239,354,462].map((y,i)=><path key={y} d={`M${i===0?565:760} ${y}H900`} stroke={["#b8ff5a","#22d3ee","#a78bfa","#b8ff5a"][i]} strokeOpacity=".6" />)}
        <g fill="none" stroke="#9ea7b3" strokeOpacity=".45"><path d="M8 18h12M14 12v12M900 18h12M906 12v12M8 504h12M14 498v12M900 504h12M906 498v12" /></g>
      </svg>
      {!compact && <figcaption className="lineage-legend"><span>≋ Context flows</span><span>□ Interfaces</span><span>○ Control points</span><span>╌ Evidence trails</span></figcaption>}
    </figure>
  )
}
