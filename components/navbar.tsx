"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowUpRight, ChevronDown, MenuIcon, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const core = [{name:"Work",href:"/work"},{name:"Experience",href:"/experience"},{name:"Writing",href:"/writing"},{name:"About",href:"/about"}]
const explore = [{name:"Systems",href:"/systems",hint:"Prototypes, tools and their maturity"},{name:"Labs",href:"/labs",hint:"Inspect original research artifacts"},{name:"Atlas",href:"/atlas",hint:"Navigate the evidence graph"},{name:"Evolution",href:"/evolution",hint:"Timeline, confidence and provenance"},{name:"Publications",href:"/publications",hint:"Editorial work and books"}]
const active = (path: string, href: string) => path === href || path.startsWith(href + "/")
const itemClass = "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted,setMounted]=useState(false)
  const [open,setOpen]=useState(false)
  useEffect(()=>setMounted(true),[])
  useEffect(()=>setOpen(false),[pathname])
  return <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-semibold">Skip to main content</a>
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" aria-label="Alejandro Baratas home" className="rounded text-base font-bold tracking-tight text-foreground focus-visible:ring-2 focus-visible:ring-ring">Alejandro Baratas<span className="ml-2 hidden font-mono text-xs font-medium text-muted-foreground xl:inline">/ AI engineering</span></Link>
        <div className="hidden items-center gap-1 lg:flex">
          {core.map(item=><Link key={item.href} href={item.href} aria-current={active(pathname,item.href)?"page":undefined} className={itemClass+(active(pathname,item.href)?" bg-muted text-foreground":"")}>{item.name}</Link>)}
          <details key={pathname} className="group relative">
            <summary className={itemClass+" flex min-h-10 cursor-pointer list-none items-center gap-1 [&::-webkit-details-marker]:hidden"}>Explore <ChevronDown aria-hidden="true" className="h-4 w-4 transition-transform group-open:rotate-180"/></summary>
            <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-border bg-background p-2 shadow-xl">
              {explore.map(item=><Link key={item.href} href={item.href} aria-current={active(pathname,item.href)?"page":undefined} className="block rounded-lg p-3 hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="block text-sm font-semibold text-foreground">{item.name}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.hint}</span>
              </Link>)}
            </div>
          </details>
          <Link href="/contact" className="ml-2 inline-flex min-h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-semibold text-background hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring">Contact <ArrowUpRight aria-hidden="true" className="h-4 w-4"/></Link>
          {mounted&&<Button variant="ghost" size="icon" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label={theme==="dark"?"Switch to light mode":"Switch to dark mode"} className="ml-1">{theme==="dark"?<Sun aria-hidden="true" className="h-4 w-4"/>:<Moon aria-hidden="true" className="h-4 w-4"/>}</Button>}
        </div>
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant="outline" size="icon" aria-label="Open navigation menu" aria-expanded={open} className="h-11 w-11 border-border bg-card text-foreground"><MenuIcon aria-hidden="true" className="h-5 w-5"/></Button></SheetTrigger>
            <SheetContent side="right" aria-label="Navigation menu" className="overflow-y-auto">
              <SheetTitle className="text-left text-lg">Explore Alejandro Baratas</SheetTitle>
              <SheetDescription className="text-left">Enterprise work first. Then inspect the supporting engineering.</SheetDescription>
              <nav aria-label="Mobile navigation" className="mt-6 flex flex-col gap-1">
                {core.map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)} aria-current={active(pathname,item.href)?"page":undefined} className={itemClass+" flex min-h-11 items-center"+(active(pathname,item.href)?" bg-muted text-foreground":"")}>{item.name}</Link>)}
                <p className="mt-4 border-t border-border pt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Explore evidence</p>
                {explore.map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)} aria-current={active(pathname,item.href)?"page":undefined} className={itemClass+" flex min-h-11 items-center"+(active(pathname,item.href)?" bg-muted text-foreground":"")}>{item.name}</Link>)}
                <Link href="/contact" onClick={()=>setOpen(false)} className="mt-4 flex min-h-12 items-center justify-center rounded-md bg-foreground px-4 text-sm font-semibold text-background">Contact / Let's talk <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4"/></Link>
                {mounted&&<button type="button" onClick={()=>setTheme(theme==="dark"?"light":"dark")} className="mt-3 min-h-11 rounded-md px-3 text-left text-sm text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring">{theme==="dark"?"Switch to light mode":"Switch to dark mode"}</button>}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  </>
}
