import {createHash} from "node:crypto"
import {writeFileSync,mkdirSync} from "node:fs"
import {dirname} from "node:path"
const revision="e6600ffc4e8e6620eeb45bf49bcdbd5e4b84163f"
const expected="444b5fb09e182a8052c07f9fcc3445fa01e647e7"
const url="https://raw.githubusercontent.com/wheresryan22/anatomy/"+revision+"/examples/raptor-engine/raptor-engine-light.html"
const out="public/anatomy/original/raptor-engine.html"
const res=await fetch(url,{signal:AbortSignal.timeout(60000),headers:{"User-Agent":"alejandrobgn-anatomy-source-integrity/1.0"}})
if(!res.ok)throw Error("Pinned upstream Anatomy Raptor download failed: "+res.status)
const bytes=Buffer.from(await res.arrayBuffer())
const actual=createHash("sha1").update("blob "+bytes.length+"\0").update(bytes).digest("hex")
if(actual!==expected)throw Error("Original Raptor file integrity mismatch: "+actual)
mkdirSync(dirname(out),{recursive:true})
writeFileSync(out,bytes)
console.log("Exact upstream Anatomy Raptor original verified:",bytes.length,"bytes; git blob",actual)
