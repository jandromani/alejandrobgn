"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { MenuIcon, Moon, Sun, CalendarDays } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { name: "Systems",    href: "/systems"    },
  { name: "Evolution",  href: "/evolution"  },
  { name: "Writing",    href: "/writing"    },
  { name: "Experience", href: "/experience" },
  { name: "About",      href: "/about"      },
  { name: "Contact",    href: "/contact"    },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch: only render theme-dependent icon after mount
  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm"
      >
        <div className="container relative w-full max-w-full min-w-0 flex h-14 items-center justify-between px-4 md:px-6">

          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-bold font-mono text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          aria-label="ABGN — home"
          >
            ABGN
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle — only render after mount to avoid SSR/client mismatch */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden md:flex"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark"
                  ? <Sun className="h-4 w-4" aria-hidden="true" />
                  : <Moon className="h-4 w-4" aria-hidden="true" />
                }
              </Button>
            )}

          </div>

          {/* Mobile menu */}
          <div className="mobile-menu-toggle absolute right-3 top-2 z-[60] text-foreground">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="border-border bg-card text-foreground shadow-sm"
                >
                  <MenuIcon className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" aria-label="Navigation menu">
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <SheetDescription className="sr-only">Navigate to systems, evolution, writing, experience, about or contact.</SheetDescription>
                <nav aria-label="Mobile navigation">
                  <div className="flex flex-col gap-1 pt-6">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`px-3 py-2.5 text-sm rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            isActive
                              ? "text-foreground font-medium bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )
                    })}

                    <Link
                      href="/meet"
                      className="mt-2 flex items-center gap-2 px-3 py-2.5 text-sm font-semibold bg-foreground text-background rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <CalendarDays className="w-4 h-4" aria-hidden="true" />
                      Book a session
                    </Link>

                    {mounted && (
                      <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="mt-2 px-3 py-2.5 text-sm text-left text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                      >
                        {theme === "dark" ? "Light mode" : "Dark mode"}
                      </button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}
