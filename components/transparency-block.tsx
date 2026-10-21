import { getEvidenceLabel, type ProductEvidence } from "@/lib/systems-data"

const interfaceLabels: Record<ProductEvidence["interfaceType"], { label: string; color: string }> = {
  real:           { label: "Real interface",           color: "text-green-800 dark:text-green-300"  },
  representative: { label: "Representative interface", color: "text-amber-800 dark:text-amber-300"  },
  conceptual:     { label: "Conceptual diagram",       color: "text-muted-foreground" },
}

const dataLabels: Record<ProductEvidence["dataType"], { label: string; color: string }> = {
  live:       { label: "Live data",        color: "text-green-800 dark:text-green-300"  },
  demo:       { label: "Demo data",        color: "text-amber-800 dark:text-amber-300"  },
  synthetic:  { label: "Synthetic data",   color: "text-amber-800 dark:text-amber-300"  },
  anonymised: { label: "Anonymised data",  color: "text-signal-cyan"   },
  snapshot:   { label: "Snapshot data",    color: "text-amber-800 dark:text-amber-300"  },
}

const executionLabels: Record<ProductEvidence["executionType"], { label: string; color: string }> = {
  live:      { label: "Live execution",     color: "text-green-800 dark:text-green-300" },
  recorded:  { label: "Recorded session",   color: "text-amber-800 dark:text-amber-300" },
  simulated: { label: "Simulated flow",     color: "text-amber-800 dark:text-amber-300" },
}

const codeLabels: Record<ProductEvidence["codeVisibility"], { label: string }> = {
  public:   { label: "Public — open source" },
  private:  { label: "Private"              },
  selected: { label: "Selected disclosure"  },
}

interface TransparencyBlockProps {
  evidence: ProductEvidence
  systemStatus: string
}

export function TransparencyBlock({ evidence, systemStatus }: TransparencyBlockProps) {
  const iface     = interfaceLabels[evidence.interfaceType]
  const data      = dataLabels[evidence.dataType]
  const execution = executionLabels[evidence.executionType]
  const code      = codeLabels[evidence.codeVisibility]

  const verifiedDate = new Date(evidence.lastVerified).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <aside
      aria-label="What you are seeing"
      className="border border-border rounded-xl overflow-hidden"
    >
      <div className="px-5 py-3 bg-secondary border-b border-border">
        <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
          What you are seeing
        </p>
      </div>
      <div className="divide-y divide-border">
        <Row label="Preview label">
          <span className="text-sm font-medium text-foreground">{getEvidenceLabel(evidence)}</span>
        </Row>
        <Row label="Interface">
          <span className={`text-sm font-medium ${iface.color}`}>{iface.label}</span>
        </Row>
        <Row label="Data">
          <span className={`text-sm font-medium ${data.color}`}>{data.label}</span>
        </Row>
        <Row label="Execution">
          <span className={`text-sm font-medium ${execution.color}`}>{execution.label}</span>
        </Row>
        <Row label="Code">
          <span className="text-sm font-medium text-foreground">{code.label}</span>
        </Row>
        <Row label="Current status">
          <span className="text-sm font-medium text-foreground">{systemStatus}</span>
        </Row>
        <Row label="Last verified">
          <span className="text-sm text-muted-foreground font-mono">{verifiedDate}</span>
        </Row>
      </div>
    </aside>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3 bg-card">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex-shrink-0">{label}</p>
      <div className="text-right">{children}</div>
    </div>
  )
}
