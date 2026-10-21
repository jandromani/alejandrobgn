#!/usr/bin/env node
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { join } from "node:path"
const root=process.cwd()
const source=p=>readFileSync(join(root,p),"utf8")
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255)
const lum=hex=>rgb(hex).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4)
  .reduce((sum,v,i)=>sum+v*[0.2126,0.7152,0.0722][i],0)
const contrast=(a,b)=>(Math.max(lum(a),lum(b))+0.05)/(Math.min(lum(a),lum(b))+0.05)
const foreground="#476700",paper="#F3F0E8",dark="#090B0F",bright="#b8ff5a"
assert.ok(contrast(foreground,paper)>=4.5,"Light-mode metadata accent violates WCAG AA contrast")
assert.ok(contrast(bright,dark)>=4.5,"Dark-mode signal green violates WCAG AA contrast")
for(const path of [
  "components/hero-evidence-flow.tsx","components/home-operating-dossier.tsx",
  "app/work/page.tsx","app/work/cybersecurity-ai-engineering/page.tsx",
  "app/work/banking-modernization/page.tsx",
]) {
  const file=source(path)
  assert.ok(!file.includes("text-[#587f00]")&&!file.includes("text-[#5b8f00]"),"Old low-contrast green in "+path)
}
for(const path of ["app/work/cybersecurity-ai-engineering/page.tsx","app/work/banking-modernization/page.tsx"]){
  const file=source(path)
  const h=file.indexOf("<h1"),metric=file.indexOf("mt-7 grid max-w-4xl",h),intro=file.indexOf("mt-6 max-w-3xl",h)
  assert.ok(h>=0 && metric>h && metric<intro,"Case metrics must precede explanatory prose: "+path)
}
const hero=source("components/home-operating-dossier.tsx")
assert.ok(hero.includes("mode === \"hero\" && <HeroEvidenceFlow />"),"Hero proof visual missing")
assert.ok(hero.includes("href=\"/work\""),"Executive journey to Work missing")
console.log(JSON.stringify({result:"PASS",gate:"F1 editorial sequence + F2 representative contrast ratios",lightRatio:contrast(foreground,paper).toFixed(2),darkRatio:contrast(bright,dark).toFixed(2),note:"Representative design tokens only; automated axe/WCAG and human 5/30-second tests remain separate"}))
