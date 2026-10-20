"use client"

import { useState } from "react"
import { ArrowUpRight, Play } from "lucide-react"

export function LabEmbed({ src, title, note }: { src: string; title: string; note: string }) {
  const [active, setActive] = useState(false)
  const [documentLoaded, setDocumentLoaded] = useState(false)
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#080d14]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-5 py-4 font-mono text-xs text-white/80">
        <span>ORIGINAL HTML / ISOLATED PREVIEW / NOT A PRODUCTION CLAIM</span>
        <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#b8ff5a]">
          Open original full screen <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      {active ? (
        <>
          <iframe title={`Original interactive ${title} HTML laboratory`} src={src} sandbox="allow-scripts"
            loading="lazy" referrerPolicy="no-referrer" onLoad={() => setDocumentLoaded(true)}
            className="block h-[630px] w-full border-0 md:h-[780px]" />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 px-5 py-3 text-xs text-white/70">
            <span>{documentLoaded ? "HTML document loaded; runtime features unverified" : "Loading sandboxed HTML…"}</span>
            <button onClick={() => { setActive(false); setDocumentLoaded(false) }} className="underline underline-offset-4 hover:text-white">Unload preview</button>
          </div>
        </>
      ) : (
        <div className="flex min-h-[275px] flex-col items-center justify-center gap-5 px-7 py-10 text-center">
          <Play className="h-10 w-10 text-[#b8ff5a]" aria-hidden="true" />
          <h2 className="max-w-lg text-xl font-semibold text-white">Launch this original browser experiment</h2>
          <p className="max-w-xl text-sm leading-7 text-white/65">{note}</p>
          <button onClick={() => setActive(true)} className="rounded-md bg-[#b8ff5a] px-5 py-3 text-sm font-semibold text-[#080d14] hover:bg-[#cdff86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Load isolated preview
          </button>
          <p className="text-xs leading-6 text-white/50">No iframe or third-party runtime is loaded before you opt in.</p>
        </div>
      )}
    </div>
  )
}
