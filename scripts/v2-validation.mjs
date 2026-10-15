import {readFileSync,existsSync} from "node:fs"
import {createHash} from "node:crypto"
const originals={
  "public/labs/original/pumpum.html":"a21afc8a467c94623c4a8e4872965bfff40f3a04",
  "public/labs/original/assetgraph.html":"5f0b558006bd4946f2f6448db29892d47fc453af",
  "public/labs/original/montageos.html":"fd517558698d55f4cb32659f0cafe93e1740886d",
  "public/labs/original/roomforge.html":"09c70ede7ee8cb49e8300a30623b4acaaea88dd3"
}
for(const [path,sha] of Object.entries(originals)){
 if(!existsSync(path))throw Error("Missing original HTML "+path)
 const b=readFileSync(path)
 const h=createHash("sha1").update("blob "+b.length+"\0").update(b).digest("hex")
 if(h!==sha)throw Error("Source original changed: "+path+" "+h+" != "+sha)
 console.log("Original intact",path,Math.round(b.length/1024)+" KiB")
}
for(const n of ["pumpum","assetgraph","montageos","roomforge"]){const p="public/labs/covers/"+n+".webp";if(!existsSync(p))throw Error("Missing real original screenshot "+p)}
const required=["app/enterprise/page.tsx","app/enterprise/[slug]/page.tsx","app/labs/page.tsx","app/labs/[slug]/page.tsx","components/v2-engineering-hero.tsx","components/v2-original-html-thumbnail.tsx","components/v2-sections.tsx","data/portfolio-v2.ts"]
for(const p of required)if(!existsSync(p))throw Error("Missing V2 source "+p)
const data=readFileSync("data/portfolio-v2.ts","utf8")
for(const term of ["Cybersecurity company","Banking company","August 2026 · under four weeks","Four-week technical proof of concept","Pum Pum Café 3D","/labs/original/assetgraph.html","metrics:"])
 if(!data.includes(term))throw Error("Expected source data absent: "+term)
for(const term of ["Bankinter","DARS","Knowmadmood","sk-or-v1-"])
 if(data.toLowerCase().includes(term.toLowerCase()))throw Error("Confidential client name or credential in public data")
console.log("Original HTML integrity + sector-level anonymization + case/metric checks PASS")
