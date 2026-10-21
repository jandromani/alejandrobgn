import Link from "next/link"
import { GithubIcon, LinkedinIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container max-w-5xl mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        <p className="text-xs text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} Alejandro BGN
        </p>

        <nav aria-label="Social links" className="flex items-center gap-4">
          <a
            href="https://github.com/jandromani"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            aria-label="GitHub profile (opens in new tab)"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/alejandro-bgn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </nav>

        <nav aria-label="Footer navigation" className="flex items-center gap-4">
          <Link href="/work" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Work</Link>
          <Link
            href="/systems"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Systems
          </Link>
          <Link href="/atlas" className="text-xs text-muted-foreground hover:text-foreground transition-colors rounded">Atlas</Link>
          <Link
            href="/writing"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Writing
          </Link>
          <Link
            href="/contact"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Contact
          </Link>
        </nav>

      </div>
    </footer>
  )
}
