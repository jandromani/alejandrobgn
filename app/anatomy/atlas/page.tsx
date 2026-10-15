import type {Metadata} from "next"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"
import {AnatomyAtlas} from "@/components/anatomy-atlas"
export const metadata:Metadata={title:"Architectural Principles Atlas | Alejandro BGN",description:"Separate original conceptual atlas: knowledge, representation, execution, verification and evidence."}
export default function AnatomyAtlasPage(){return <main className="min-h-screen bg-background"><section className="v2-wrap pb-9 pt-14"><Link href="/anatomy" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={15}/> Original Anatomy studio</Link><h1 className="v2-title mt-7">Conceptual engineering atlas.</h1><p className="v2-lead mt-5">A separate editorial diagram, not an official Anatomy output.</p></section><section className="mx-auto max-w-[1500px] px-4 pb-20 md:px-6"><AnatomyAtlas/></section></main>}