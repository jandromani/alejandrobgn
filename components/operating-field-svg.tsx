const particles = Array.from({ length: 54 }, (_, i) => ({
  x: 34 + ((i * 73) % 245),
  y: 28 + ((i * 47) % 258),
  r: i % 7 === 0 ? 2.4 : i % 3 === 0 ? 1.5 : 1,
  opacity: .16 + (i % 5) * .1,
}))

export function OperatingFieldSvg() {
  return (
    <svg viewBox="0 0 1200 550" role="img" aria-labelledby="field-title field-desc" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <title id="field-title">Production AI operating field</title>
      <desc id="field-desc">Diffuse input converges through policy and runtime controls, then leaves as structured evidence traces.</desc>
      <defs>
        <radialGradient id="core"><stop stopColor="#e9ffc8" /><stop offset=".22" stopColor="#b8ff5a" /><stop offset=".58" stopColor="#55ca8c" stopOpacity=".55" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></radialGradient>
        <linearGradient id="wire" x1="0" x2="1"><stop stopColor="#22d3ee" stopOpacity="0" /><stop offset=".52" stopColor="#b8ff5a" /><stop offset="1" stopColor="#22d3ee" stopOpacity=".68" /></linearGradient>
        <filter id="field-glow" x="-120%" y="-120%" width="340%" height="340%"><feGaussianBlur stdDeviation="13" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <pattern id="field-grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#fff" strokeOpacity=".035" /></pattern>
      </defs>
      <rect width="1200" height="550" fill="#050708" /><rect width="1200" height="550" fill="url(#field-grid)" />
      <g className="operating-particles">
        {particles.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={i % 4 ? "#22d3ee" : "#b8ff5a"} opacity={p.opacity} style={{ animationDelay: `${(i % 9) * -.7}s` }} />)}
      </g>
      <g fill="none" stroke="url(#wire)" strokeLinecap="round">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <path key={i} className="operating-flow" style={{ animationDelay: `${i * -.42}s` }} d={`M${85 + i * 12} ${85 + i * 61} C280 ${34 + i * 70}, 390 ${300 - i * 20}, 574 275 S820 ${73 + i * 67}, 1125 ${76 + i * 62}`} strokeWidth={i === 3 ? 2.6 : 1.1} strokeOpacity={i === 3 ? .95 : .38 + i * .035} strokeDasharray={i === 3 ? "7 10" : undefined} />)}
      </g>
      <g opacity=".46" fill="none" stroke="#22d3ee">
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M660 ${190 + i * 54}H760L800 ${165 + i * 60}H920L960 ${180 + i * 51}H1140`} strokeWidth="1" />)}
      </g>
      <circle cx="600" cy="275" r="104" fill="url(#core)" opacity=".19" /><circle cx="600" cy="275" r="23" fill="#b8ff5a" opacity=".94" filter="url(#field-glow)" /><circle cx="600" cy="275" r="62" fill="none" stroke="#b8ff5a" strokeOpacity=".25" strokeDasharray="3 8" className="operating-orbit" /><circle cx="600" cy="275" r="94" fill="none" stroke="#22d3ee" strokeOpacity=".12" />
      {[764, 836, 918, 1000, 1082].map((x, i) => <g key={x}><circle cx={x} cy={[190, 323, 225, 370, 272][i]} r="3.5" fill={i % 2 ? "#b8ff5a" : "#22d3ee"} /><path d={`M${x} ${[190, 323, 225, 370, 272][i]}h${i % 2 ? 28 : -28}`} stroke="#fff" strokeOpacity=".2" /></g>)}
      <g fill="#fff" fillOpacity=".42" fontFamily="monospace" fontSize="10" letterSpacing="1.8"><text x="46" y="35">UNCERTAIN INPUT</text><text x="540" y="164">CONTROL CORE</text><text x="1000" y="35">VERIFIABLE OUTPUT</text></g>
    </svg>
  )
}
