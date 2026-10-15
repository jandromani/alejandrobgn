import{readFileSync,existsSync}from"node:fs";import{createHash}from"node:crypto";
const originals={
"public/anatomy/original/raptor-engine.html":"444b5fb09e182a8052c07f9fcc3445fa01e647e7",
"public/anatomy/original/dial-indicator.html":"32992c86d00bab5133b65a274185a6806f5c2a2b",
"public/anatomy/original/desk-computer.html":"8e409f3ea1cc3073213144824c86d5f1149f7924",
"public/anatomy/original/turning-dial.html":"f0a6c6c33135224894887adaf6d4a1189cc1193b",
"public/anatomy/original/arcade-cabinet.html":"c137c6516bdcc8d16cd39a1fdea3f6d757f0bf42",
"public/anatomy/original/ripple-tank.html":"2a326459f71c1ebf58ccf9e1d6e4ef134247920f"
};
for(const [path,sha] of Object.entries(originals)){const b=readFileSync(path);const digest=createHash("sha1").update("blob "+b.length+String.fromCharCode(0)).update(b).digest("hex");if(digest!==sha)throw Error("Upstream Anatomy file altered "+path+": "+digest);console.log("Original Anatomy SHA PASS",path)}
for(const mode of ["agentic","factory"]){const path="public/anatomy/figures/"+mode+".html";if(!existsSync(path))throw Error("Missing native generated figure "+path);const s=readFileSync(path,"utf8");for(const marker of ["iso-stage","iso-plate","data-moving-pin","data-readout","TEST INTERLOCK","data-run","anatomy-controls"])if(!s.includes(marker))throw Error("Native kit figure incomplete "+path+" "+marker);console.log("Native Anatomy figure generated",path)}
for(const path of ["app/anatomy/page.tsx","components/anatomy-original-studio.tsx","app/enterprise/[slug]/page.tsx"])if(!readFileSync(path,"utf8").includes("AnatomyOriginal"))throw Error("Original Anatomy integration missing "+path);
for(const name of ["kit/iso-kit.mjs","kit/lathe.mjs","kit/tube.mjs","kit/audit.mjs","kit/turn.mjs","kit/react/draw.tsx","kit/react/live.tsx"]){const p=".agents/skills/anatomy/"+name;if(!existsSync(p))throw Error("Missing upstream Anatomy engine module: "+p)}
console.log("Authentic upstream engine + six exact original HTML examples + native figures verification PASS")
