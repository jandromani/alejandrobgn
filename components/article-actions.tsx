"use client"

import { useEffect, useState } from "react"
import { Check, Copy, Share2 } from "lucide-react"

export function ArticleActions() {
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const update = () => {
      const article = document.querySelector("[data-article-body]")
      if (!article) return
      const rect = article.getBoundingClientRect()
      const start = window.scrollY + rect.top - window.innerHeight * 0.22
      const length = Math.max(1, rect.height - window.innerHeight * 0.68)
      setProgress(Math.max(0, Math.min(100, ((window.scrollY - start) / length) * 100)))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: document.title, url: window.location.href })
      return
    }
    await copyLink()
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-border/40" aria-hidden="true">
        <div className="h-full bg-signal-green transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex flex-wrap items-center gap-2" aria-label="Article actions">
        <button onClick={copyLink} className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-xs text-muted-foreground transition-colors hover:border-signal-green/50 hover:text-foreground">
          {copied ? <Check className="h-3.5 w-3.5 text-signal-green" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Link copied" : "Copy link"}
        </button>
        <button onClick={share} className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-xs text-muted-foreground transition-colors hover:border-signal-cyan/50 hover:text-foreground">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
        <span className="ml-1 text-[10px] font-mono tabular-nums text-muted-foreground">{Math.round(progress)}% read</span>
      </div>
    </>
  )
}
