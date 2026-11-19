"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"

type PortfolioEvent =
  | "cv_download"
  | "contact_click"
  | "case_study_open"
  | "project_open"
  | "github_click"

const projectHosts = new Set([
  "evalyourai.vercel.app",
  "agnosticengine.vercel.app",
  "debate-monitor-live.vercel.app",
])

function send(eventName: PortfolioEvent) {
  try {
    track(eventName)
  } catch {
    // Analytics must never interrupt normal navigation.
  }
}

export function AnalyticsEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return
      if (!(event.target instanceof Element)) return

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]")
      if (!anchor) return

      let destination: URL
      try {
        destination = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if (
        anchor.hasAttribute("download") &&
        destination.pathname.toLowerCase().endsWith("/alejandro-baratas-cv.pdf")
      ) {
        send("cv_download")
        return
      }

      if (destination.protocol === "mailto:") {
        send("contact_click")
        return
      }

      if (destination.hostname === "linkedin.com" || destination.hostname === "www.linkedin.com") {
        send("contact_click")
        return
      }

      if (destination.hostname === "github.com" || destination.hostname === "www.github.com") {
        send("github_click")
        return
      }

      if (projectHosts.has(destination.hostname)) {
        send("project_open")
        return
      }

      if (destination.origin !== window.location.origin) return

      if (destination.pathname === "/contact" || destination.pathname.startsWith("/contact/")) {
        send("contact_click")
        return
      }

      if (/^\/work\/[^/]+\/?$/.test(destination.pathname)) {
        send("case_study_open")
        return
      }

      if (destination.pathname === "/systems" || destination.pathname.startsWith("/systems/")) {
        send("project_open")
      }
    }

    window.addEventListener("click", onClick, true)
    return () => window.removeEventListener("click", onClick, true)
  }, [])

  return null
}
