export function SddPressFigure() {
  return (
    <figure className="my-9 overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4 sm:px-7">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#476700] dark:text-signal-green">Interactive Anatomy · SDD Kit</p>
        <figcaption className="mt-2 text-lg font-semibold text-foreground">The three-gate press</figcaption>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Move the change through Ready, Done and adversarial review. Activate the four seeded defects to see where the illustrated process holds the change.</p>
      </div>
      <iframe
        src="/anatomy/figures/three-gates-press.html"
        title="Interactive three-gate press: a visual simulation of the SDD Kit"
        loading="lazy"
        sandbox="allow-scripts"
        className="h-[1320px] w-full border-0 sm:h-[1250px]"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4 text-xs leading-5 text-muted-foreground sm:px-7">
        <span>This is an animated explanation. It does not run validators or authorize a real change.</span>
        <a href="/anatomy/figures/three-gates-press.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline underline-offset-4">Open full-size figure ↗</a>
      </div>
    </figure>
  )
}
