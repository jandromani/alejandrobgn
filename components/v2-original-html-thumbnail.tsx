import Image from "next/image"
import type {Lab} from "@/data/portfolio-v2"
/** Captured from the corresponding original HTML in Chromium; no artificial replacement render. */
export function OriginalHtmlThumbnail({lab}:{lab:Lab}){
 return <div className="relative h-[235px] overflow-hidden bg-[#101824]">
   <Image src={"/labs/covers/"+lab.slug+".webp"} alt={"Actual Chromium screenshot of the original "+lab.title+" HTML interface"} fill sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]" />
   <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1019]/95 via-[#0b1019]/5 to-transparent"/>
   <span className="absolute bottom-3 left-4 rounded-md border border-white/25 bg-[#090e17]/90 px-3 py-1.5 font-mono text-[10px] tracking-widest text-[#b8ff5a]">REAL CAPTURE / ORIGINAL HTML</span>
   <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-[#090e17]/90 px-2 py-1 font-mono text-[9px] text-white">EXPLORE INTERACTIVE →</span>
 </div>
}
