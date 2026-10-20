import { evolutionYearCounts, evolutionRecords } from "@/lib/evolution"

type EvolutionGrowthCurveProps = {
  compact?: boolean
}

export function EvolutionGrowthCurve({ compact = false }: EvolutionGrowthCurveProps) {
  const max = Math.max(...evolutionYearCounts.map((item) => item.count))
  const points = evolutionYearCounts.map((item, index) => ({
    ...item,
    x: 72 + index * 170,
    y: 222 - (item.count / max) * 172,
  }))
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ")

  return (
    <div className={`relative overflow-hidden border border-border bg-card/70 ${compact ? "rounded-xl p-4" : "rounded-2xl p-5 md:p-8"}`}>
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="relative mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-signal-cyan">Recovered output density</p>
          <p className="mt-1 text-sm text-muted-foreground">Distinct artefacts by year · linear scale</p>
        </div>
        <p className="font-mono text-2xl font-bold text-foreground" >{evolutionRecords.length}</p>
      </div>
      <svg
        viewBox="0 0 620 270"
        className="relative w-full"
        role="img"
        aria-label={`Artefacts by year: ${evolutionYearCounts.map(point => `${point.count} in ${point.year}`).join(", ")}`}
      >
        {[50, 93, 136, 179, 222].map((y) => (
          <line key={y} x1="50" x2="590" y1={y} y2={y} stroke="currentColor" className="text-border" strokeWidth="1" />
        ))}
        <path d={`${path} L 582 222 L 72 222 Z`} fill="url(#evolutionArea)" opacity=".13" />
        <path d={path} fill="none" stroke="url(#evolutionLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.year}>
            <line x1={point.x} x2={point.x} y1={point.y} y2="222" stroke={point.color} strokeOpacity=".22" strokeDasharray="3 5" />
            <circle cx={point.x} cy={point.y} r="6" fill="hsl(var(--background))" stroke={point.color} strokeWidth="3" />
            <text x={point.x} y={point.y - 16} fill="currentColor" textAnchor="middle" className="fill-foreground font-mono text-[16px] font-bold">
              {point.count}
            </text>
            <text x={point.x} y="249" fill="currentColor" textAnchor="middle" className="fill-muted-foreground font-mono text-[12px]">
              {point.year}
            </text>
          </g>
        ))}
        <defs>
          <linearGradient id="evolutionLine" x1="0" x2="1">
            <stop stopColor="#22d3ee" />
            <stop offset=".38" stopColor="#b8ff5a" />
            <stop offset=".68" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="evolutionArea" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#b8ff5a" />
            <stop offset="1" stopColor="#b8ff5a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {!compact && (
        <p className="relative mt-2 text-xs leading-relaxed text-muted-foreground">
          Density reflects the reconstructed archive, not a claim that every artefact had the same scope, maturity or production status.
        </p>
      )}
    </div>
  )
}
