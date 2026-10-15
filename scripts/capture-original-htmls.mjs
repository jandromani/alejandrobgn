// Exact original-HTML screenshot capture via an existing Chromium CDP instance.
// Start the Next.js site first: pnpm dev, or pass a public preview URL as argv[3].
// Start Chrome with: chromium --headless --no-sandbox --remote-debugging-port=9333 --user-data-dir=/tmp/abgn-qa
// Then: node scripts/capture-original-htmls.mjs http://localhost:9333 http://localhost:3000
import {mkdir,writeFile} from "node:fs/promises"
const cdp=(process.argv[2]||"http://localhost:9333").replace(/\/$/,"")
const site=(process.argv[3]||"http://localhost:3000").replace(/\/$/,"")
const targets=[["pumpum","/labs/original/pumpum.html"],["assetgraph","/labs/original/assetgraph.html"],["montageos","/labs/original/montageos.html"],["roomforge","/labs/original/roomforge.html"]]
await mkdir("public/labs/covers",{recursive:true})
async function capture(name,path){
 const open=await fetch(cdp+"/json/new?"+encodeURIComponent(site+path),{method:"PUT"})
 if(!open.ok)throw Error("Cannot create Chromium tab "+open.status)
 const page=await open.json(),sock=new WebSocket(page.webSocketDebuggerUrl),waiting=new Map()
 sock.onmessage=e=>{const x=JSON.parse(e.data);if(x.id&&waiting.has(x.id)){waiting.get(x.id)(x);waiting.delete(x.id)}}
 await new Promise((resolve,reject)=>{sock.onopen=resolve;sock.onerror=reject})
 let seq=0
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;waiting.set(id,x=>x.error?reject(Error(x.error.message)):resolve(x.result));sock.send(JSON.stringify({id,method,params}))})
 await send("Emulation.setDeviceMetricsOverride",{width:1440,height:900,deviceScaleFactor:1,mobile:false})
 await send("Page.enable")
 await send("Page.navigate",{url:site+path})
 await new Promise(resolve=>setTimeout(resolve,name==="pumpum"?6000:3500))
 const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false})
 const out="public/labs/covers/"+name+".png"
 const bytes=Buffer.from(shot.data,"base64")
 if(bytes.length<18000)throw Error("Screenshot suspiciously small for "+name)
 await writeFile(out,bytes)
 sock.close()
 await fetch(cdp+"/json/close/"+page.id)
 console.log(name,out,bytes.length+" bytes")
}
for(const [name,path] of targets)await capture(name,path)
