"use client"

import { FormEvent, KeyboardEvent, useState } from "react"
import Link from "next/link"
import { ArrowRight, RotateCcw, Send, Sparkles } from "lucide-react"

type Source = { title: string; url: string }
type Message = { role: "user" | "assistant"; content: string; sources?: Source[]; mode?: "live" | "guided" }
const prompts = [
  "What did you do in the cybersecurity engagement?",
  "What does the banking PoC actually prove?",
  "What changed after the SDD evaluation lost?",
]

export function PortfolioChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function ask(input: string) {
    const question = input.trim()
    if (!question || pending) return
    const next: Message[] = [...messages, { role: "user", content: question }]
    setMessages(next)
    setDraft("")
    setError("")
    setPending(true)
    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-6).map(({ role, content }) => ({ role, content })) }),
      })
      const result = await response.json() as { answer?: string; sources?: Source[]; mode?: "live" | "guided"; error?: string }
      if (!response.ok || !result.answer) throw new Error(result.error || "The guide is temporarily unavailable.")
      setMessages([...next, { role: "assistant", content: result.answer, sources: result.sources, mode: result.mode }])
    } catch (cause) {
      setMessages(messages)
      setDraft(question)
      setError(cause instanceof Error ? cause.message : "The guide is temporarily unavailable.")
    } finally {
      setPending(false)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void ask(draft)
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      void ask(draft)
    }
  }

  return (
    <section aria-label="Portfolio guide" className="overflow-hidden rounded-2xl border border-border bg-card/40 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/60 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#90d900] text-[#090b0f]"><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
          <div><h2 className="font-semibold">Portfolio guide</h2><p className="text-xs text-muted-foreground">Public facts · linked sources · AI when available</p></div>
        </div>
        {messages.length > 0 && <button type="button" disabled={pending} onClick={() => { setMessages([]); setDraft(""); setError("") }} className="inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"><RotateCcw className="h-4 w-4" aria-hidden="true" /> New conversation</button>}
      </div>

      <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" className="flex min-h-[290px] max-h-[55vh] flex-col gap-4 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length === 0 && <div className="max-w-xl space-y-4">
          <p className="text-lg font-semibold">What would you like to investigate?</p>
          <p className="text-sm leading-7 text-muted-foreground">Ask about the enterprise cases, the engineering method or public systems. This guide uses published material and links back to the evidence.</p>
          <div className="flex flex-wrap gap-2">{prompts.map((prompt) => <button key={prompt} type="button" disabled={pending} onClick={() => void ask(prompt)} className="rounded-lg border border-border bg-background px-3 py-2 text-left text-sm leading-6 hover:border-[#90d900] focus-visible:ring-2 focus-visible:ring-ring">{prompt}</button>)}</div>
        </div>}
        {messages.map((message, index) => <div key={index} className={message.role === "user" ? "ml-auto max-w-[90%] rounded-xl bg-foreground px-4 py-3 text-sm leading-7 text-background sm:max-w-[80%]" : "max-w-[95%] rounded-xl border border-border bg-background px-4 py-4 text-sm leading-7 sm:max-w-[88%]"}>
          {message.role === "assistant" && <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-[#587f00] dark:text-signal-green">{message.mode === "live" ? "AI answer · verify sources" : "Guided answer · public sources"}</p>}
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.sources && message.sources.length > 0 && <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">{message.sources.map((source) => <Link key={source.url} href={source.url} className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-foreground hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring">{source.title} <ArrowRight className="h-3 w-3" aria-hidden="true" /></Link>)}</div>}
        </div>)}
        {pending && <p className="text-sm text-muted-foreground" role="status">Checking the public record…</p>}
      </div>

      <form onSubmit={submit} className="border-t border-border bg-background/60 p-4 sm:p-5">
        <label htmlFor="portfolio-question" className="mb-2 block text-sm font-semibold">Your question</label>
        <div className="flex items-end gap-2">
          <textarea id="portfolio-question" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={onKeyDown} maxLength={900} rows={2} placeholder="Ask about a case, a technical decision or the evidence…" className="min-h-14 w-full resize-y rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <button type="submit" disabled={!draft.trim() || pending} className="inline-flex min-h-14 items-center gap-2 rounded-lg bg-[#90d900] px-4 font-semibold text-[#090b0f] disabled:cursor-not-allowed disabled:opacity-50"><Send className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">Ask</span></button>
        </div>
        {error && <p role="alert" className="mt-2 text-sm text-red-500">{error}</p>}
        <p className="mt-3 text-xs leading-5 text-muted-foreground">This is an automated guide, not a conversation with Alejandro. Avoid personal, confidential or client information. When AI is available, your question is sent to OpenRouter and a model provider. Messages are not saved by this page.</p>
      </form>
    </section>
  )
}
