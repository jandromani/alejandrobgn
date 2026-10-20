"use client"

import { useState } from "react"

export function LabCover({ slug, title, family }: { slug: string; title: string; family: string }) {
  const [missing, setMissing] = useState(false)
  const cover = `/labs/covers/${slug}.webp`
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#071320]">
      {!missing && (
        <img
          src={cover}
          alt={`Original Chromium screenshot of ${title}`}
          loading="lazy"
          decoding="async"
          onError={() => setMissing(true)}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
        />
      )}
      {missing && (
        <div className="absolute inset-0 flex flex-col justify-between bg-[radial-gradient(circle_at_75%_25%,#18475b,transparent_45%),linear-gradient(145deg,#12212c,#060b11)] p-6 text-white">
          <p className="font-mono text-xs uppercase tracking-wider text-[#9fe8d5]">{family} / original source</p>
          <strong className="text-2xl font-semibold tracking-tight">{title}</strong>
          <p className="font-mono text-xs text-white/70">Preview pending verified browser capture</p>
        </div>
      )}
    </div>
  )
}
