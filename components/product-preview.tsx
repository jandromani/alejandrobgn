"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn } from "lucide-react"
import { EvidenceLightbox } from "@/components/evidence-lightbox"
import type { EvidenceAsset } from "@/lib/systems-data"

type ArtifactKind = "interface" | "workflow" | "architecture"

const kindMeta: Record<ArtifactKind, { badge: string; tone: string }> = {
  interface:    { badge: "Interface preview",         tone: "text-amber-800 dark:text-amber-200 border-signal-amber/40 bg-signal-amber/10" },
  workflow:     { badge: "Representative workflow",  tone: "text-amber-800 dark:text-amber-200 border-signal-amber/40 bg-signal-amber/10" },
  architecture: { badge: "Architecture diagram",     tone: "text-signal-cyan border-signal-cyan/40 bg-signal-cyan/10" },
}

interface ProductPreviewProps {
  asset: EvidenceAsset
  kind: ArtifactKind
  previewLabel?: string
  aspectClass?: string
  priority?: boolean
}

export function ProductPreview({ asset, kind, previewLabel, aspectClass = "aspect-video", priority = false }: ProductPreviewProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const meta = kind === "interface" && previewLabel
    ? { badge: previewLabel, tone: previewLabel.startsWith("Real") ? "text-green-800 dark:text-green-200 border-signal-green/40 bg-signal-green/10" : "text-amber-800 dark:text-amber-200 border-signal-amber/40 bg-signal-amber/10" }
    : kindMeta[kind]

  return (
    <>
      <div className="group relative rounded-lg overflow-hidden border border-border bg-secondary">
        {/* Image */}
        <button
          onClick={() => setLightboxOpen(true)}
          className={`relative block w-full ${aspectClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset`}
          aria-label={`Enlarge: ${asset.title}`}
        >
          <Image
            src={asset.src}
            alt=""
            fill
            aria-hidden="true"
            className="object-cover object-top scale-110 blur-md opacity-25"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
          />
          <span className="absolute inset-1.5 overflow-hidden rounded-md border border-white/5 bg-background/30 shadow-xl">
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              className="object-contain object-top transition-transform duration-300 group-hover:scale-[1.01]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
              priority={priority}
            />
          </span>

          {/* Persistent honesty badge — always visible, not just on hover */}
          <span
            className={`absolute top-2 left-2 z-10 inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border backdrop-blur-sm ${meta.tone}`}
          >
            {meta.badge}
          </span>

          {/* Hover overlay */}
          <span
            className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background/80 border border-border text-xs font-mono text-foreground backdrop-blur-sm">
              <ZoomIn className="w-3 h-3" aria-hidden="true" />
              Enlarge
            </span>
          </span>
        </button>

        {/* Caption */}
        <div className="px-4 py-3 border-t border-border bg-card">
          <p className="text-xs font-semibold text-foreground mb-0.5">{asset.title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{asset.caption}</p>
        </div>
      </div>

      {lightboxOpen && <EvidenceLightbox asset={asset} onClose={() => setLightboxOpen(false)} />}
    </>
  )
}
