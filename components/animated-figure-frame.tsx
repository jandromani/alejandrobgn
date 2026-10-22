"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedFigureFrame({ src, title, className = "" }: { src: string; title: string; className?: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(1220)

  useEffect(() => {
    setHeight(1220)
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.data?.kind !== "portfolio-anatomy-height") return
      const next = Number(event.data.height)
      if (Number.isFinite(next) && next >= 300 && next <= 4000) setHeight(next + 2)
    }
    window.addEventListener("message", receive)
    return () => window.removeEventListener("message", receive)
  }, [src])

  return <iframe ref={frame} src={src} title={title} loading="lazy" sandbox="allow-scripts" style={{ height }} className={`block w-full border-0 ${className}`} />
}
