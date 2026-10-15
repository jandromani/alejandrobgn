import {readFileSync,existsSync} from "node:fs"
const required=["components/anatomy-v4.tsx","components/anatomy-machine-v3.tsx","components/anatomy-atlas.tsx","app/anatomy/page.tsx","docs/ANATOMY_V4_GATES.md"]
for(const file of required)if(!existsSync(file))throw Error("Anatomy missing: "+file)
const src=readFileSync("components/anatomy-v4.tsx","utf8")
for(const marker of ["context","spec","human","lineage","contract","repeatability","RUN FIXTURE","Guided tour","synthetic","setStatus(\"blocked\")","setStatus(\"complete\")","engineering","architecture","executive"])if(!src.includes(marker))throw Error("Anatomy marker missing: "+marker)
for(const file of ["app/experience/page.tsx","app/enterprise/[slug]/page.tsx"])if(!readFileSync(file,"utf8").includes("AnatomyV4"))throw Error("Missing case integration: "+file)
if(!readFileSync("app/sitemap.ts","utf8").includes("/anatomy"))throw Error("Anatomy atlas sitemap missing")
console.log("Anatomy V4 source and integration gates PASS; behavioral validation requires browser checks.")
