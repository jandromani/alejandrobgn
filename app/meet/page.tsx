import Link from "next/link"

export default function MeetPage() {
  return <div className="container mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 py-16">
    <p className="font-mono text-xs uppercase tracking-widest text-[#587f00] dark:text-signal-green">Contact / Meeting</p>
    <h1 className="mt-5 text-4xl font-bold text-foreground">Book a 30-minute conversation</h1>
    <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Tell me about the engineering challenge, the team and what you need to verify. The booking page opens directly.</p>
    <div className="mt-8 flex flex-wrap gap-3">
      <a href="https://calendly.com/alejandrobgn/30min" className="rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background">Open available times ↗</a>
      <a href="mailto:alejandrobgn@gmail.com?subject=Engineering%20conversation" className="rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground">Send an email instead</a>
    </div>
    <Link href="/contact" className="mt-10 text-sm text-muted-foreground underline underline-offset-4">Other contact options</Link>
  </div>
}
