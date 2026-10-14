"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ExternalLink } from "lucide-react"
import type { EvidenceAsset } from "@/lib/systems-data"

interface EvidenceLightboxProps {
  asset: EvidenceAsset
  onClose: () => void
}

export function EvidenceLightbox({ asset, onClose }: EvidenceLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={asset.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-card border border-border rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{asset.title}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close lightbox"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-video bg-secondary">
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>

        {/* Caption */}
        <div className="px-5 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">{asset.caption}</p>
        </div>
      </div>
    </div>
  )
}
