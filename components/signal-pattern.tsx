import type { WritingPillar } from "@/data/writing"

type PatternKind = WritingPillar | "profile" | "systems"

const palettes: Record<PatternKind, { signal: string; secondary: string }> = {
  "agentic-enterprise": { signal: "#b8ff5a", secondary: "#22d3ee" },
  "ai-governance": { signal: "#fbbf24", secondary: "#b8ff5a" },
  "ai-engineering": { signal: "#22d3ee", secondary: "#b8ff5a" },
  "building-public": { signal: "#f3f0e8", secondary: "#b8ff5a" },
  "ai-economics": { signal: "#fbbf24", secondary: "#22d3ee" },
  "future-work": { signal: "#a78bfa", secondary: "#22d3ee" },
  architecture: { signal: "#22d3ee", secondary: "#a78bfa" },
  "product-experiments": { signal: "#b8ff5a", secondary: "#fbbf24" },
  profile: { signal: "#b8ff5a", secondary: "#22d3ee" },
  systems: { signal: "#22d3ee", secondary: "#b8ff5a" },
}

export function SignalPattern({ kind, label, className = "" }: { kind: PatternKind; label?: string; className?: string }) {
  const { signal, secondary } = palettes[kind]
  const isGovernance = kind === "ai-governance"
  const isEconomics = kind === "ai-economics"
  const isPublic = kind === "building-public"

  return (
    <svg viewBox="0 0 640 260" role="img" aria-label={label ?? `${kind} system signal diagram`} className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`grid-${kind}`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="currentColor" strokeOpacity=".08" /></pattern>
        <filter id={`glow-${kind}`} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <linearGradient id={`flow-${kind}`} x1="0" x2="1"><stop stopColor={secondary} stopOpacity=".15" /><stop offset=".55" stopColor={signal} /><stop offset="1" stopColor={secondary} stopOpacity=".2" /></linearGradient>
      </defs>
      <rect width="640" height="260" fill="transparent" />
      <rect width="640" height="260" fill={`url(#grid-${kind})`} />

      {isEconomics ? (
        <>
          {[0, 1, 2].map((i) => <path key={i} d={`M50 ${190 - i * 38} C150 ${220 - i * 24}, 205 ${85 + i * 25}, 315 ${150 - i * 35} S500 ${35 + i * 60}, 595 ${65 + i * 35}`} fill="none" stroke={i === 0 ? signal : secondary} strokeOpacity={0.72 - i * .16} strokeWidth={i === 0 ? 2 : 1} />)}
          <path d="M50 213H595M50 213V38" stroke="currentColor" strokeOpacity=".18" />
          {[110, 235, 365, 495].map((x, i) => <circle key={x} cx={x} cy={[172, 108, 133, 72][i]} r="4" fill={i % 2 ? secondary : signal} filter={`url(#glow-${kind})`} />)}
        </>
      ) : isGovernance ? (
        <>
          {[72, 145, 218].map((y, i) => <path key={y} d={`M45 ${y}H170L205 ${y - 18}H315L348 ${y + 12}H470L505 ${y - 20}H595`} fill="none" stroke={i === 1 ? signal : secondary} strokeOpacity={i === 1 ? .9 : .42} />)}
          {[170, 315, 470].map((x) => <rect key={x} x={x - 16} y="34" width="32" height="192" rx="5" fill="none" stroke="currentColor" strokeOpacity=".14" />)}
          <circle cx="348" cy="157" r="7" fill={signal} filter={`url(#glow-${kind})`} />
        </>
      ) : isPublic ? (
        <>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={55 + i * 138} y={55 + (i % 2) * 38} width="94" height="62" rx="5" fill="none" stroke={i === 3 ? signal : secondary} strokeOpacity={.3 + i * .14} />)}
          <path d="M149 86C175 86 170 124 193 124M287 124C315 124 303 86 331 86M425 86C455 86 445 124 469 124" fill="none" stroke={`url(#flow-${kind})`} strokeWidth="2" />
          <path d="M55 205H580" stroke="currentColor" strokeOpacity=".14" /><path d="M90 205V187M228 205V166M366 205V144M504 205V112" stroke={signal} strokeOpacity=".75" />
        </>
      ) : (
        <>
          {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M38 ${56 + i * 36} C145 ${20 + i * 38}, 202 ${228 - i * 31}, 315 ${130 + (i % 2) * 24} S505 ${35 + i * 41}, 602 ${65 + i * 29}`} fill="none" stroke={i === 2 ? signal : secondary} strokeOpacity={i === 2 ? .95 : .25 + i * .07} strokeWidth={i === 2 ? 2 : 1} />)}
          {[110, 215, 315, 425, 535].map((x, i) => <g key={x}><circle cx={x} cy={[79, 164, 130, 105, 177][i]} r={i === 2 ? 8 : 4} fill={i === 2 ? signal : secondary} filter={i === 2 ? `url(#glow-${kind})` : undefined} /><circle cx={x} cy={[79, 164, 130, 105, 177][i]} r={16 + i * 2} fill="none" stroke="currentColor" strokeOpacity=".09" /></g>)}
        </>
      )}
      <g fill="currentColor" fillOpacity=".38" fontSize="8" fontFamily="monospace" letterSpacing="1.2">
        <text x="22" y="23">INPUT / FIELD</text><text x="515" y="242">EVIDENCE / OUT</text>
      </g>
    </svg>
  )
}
