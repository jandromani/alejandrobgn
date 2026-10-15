import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import * as k from "../.agents/skills/anatomy/kit/iso-kit.mjs";
import { kitScript } from "../.agents/skills/anatomy/scripts/inline-kit.mjs";
const HERE = dirname(fileURLToPath(import.meta.url));
const TARGET = join(HERE, "..", "public", "anatomy", "figures");
mkdirSync(TARGET, { recursive: true });
const scenes = {
 agentic: { title: "SDD quality interlock", hint: "Press 1 / 2 / 3 to lift a pin · Space to test", desc: "Three real controls model business context, specification and human review. All three must lift before the proof carriage travels. A generated PR alone is not a reviewed delivery.", names: ["Context", "Spec", "Review"], fig: "Fig A", gateLegend:"Context · Specification · Human review" },
 factory: { title: "Legacy evidence lock", hint: "Press 1 / 2 / 3 to lift a pin · Space to test", desc: "A lineage, contract and reproducibility lock. Only when all three interlocks are engaged can the proof carriage travel. Deterministic generation is not functional parity.", names: ["Lineage", "Contract", "Repeatability"], fig:"Fig B", gateLegend:"Source lineage · Accepted contract · Repeatability"}
};
const W=680,H=420;
const PLATE={x:-162,y:-71,w:326,d:150,r:10};
const P=k.fitProjection([...k.boxCorners(PLATE,-17,0),[-140,-45,106],[154,44,100]],W,H,{pad:42,azimuth:43});
const S=(p,t)=>k.solidSvg(p,t), L=(p,t)=>k.lineSvg(p,t),D=(p,t)=>k.dotsSvg(p,t);
const dot=(x,y,z)=>k.iso([x,y,z],P);
const foot=(x,y)=> S(k.cylinder(x,y,6.5,-16,6,P,26),{tone:"mid"})+S(k.cylinder(x,y,4.8,-10,2,P,26),{tone:"lo"});
function base(){
 const art=['<path class="iso-halo" d="'+k.haloOf(PLATE,-17,13,P)+'"/>'];
 for(const [x,y] of k.corners(PLATE,24))art.push(foot(x,y));
 art.push(S(k.slabOf(PLATE,-10,10,P,8,1.4),{tone:"mid"}));
 art.push(L(k.planOutline(k.insetPlan(PLATE,5),0,P),{tone:"lo"}));
 art.push(L(k.corners(PLATE,13).map(([x,y])=>k.ring(x,y,2.1,0,P,18)).join(""),{tone:"lo"}));
 art.push(D(k.corners(PLATE,13).map(([x,y])=>dot(x,y,0)),{size:.48}));
 const strip={x:-148,y:56,w:286,d:7,r:1};
 art.push(S(k.slabOf(strip,0,.8,P,3),{tone:"lo",crease:"none"}));
 const ticks=k.topTicks(-141,128,5,5,58,.9,[2,3],P);
 art.push(L(ticks.minor,{tone:"lo"}),L(ticks.major,{tone:"mid"}));
 return art.join("");
}
function rails(){
 const art=[];
 for (const y of [-38,-5]) {
 art.push(S(k.slabOf({x:-128,y,w:270,d:5,r:1},1,4,P,3,.6),{tone:"mid"}));
 art.push(D([-119,-80,-40,0,40,80,123].map(x=>dot(x,y+2.5,5)),{size:.3,tone:"lo"}));
 }
 for(const x of [-134,141]){
 art.push(S(k.slabOf({x,y:-40,w:6,d:42,r:1.1},1,10,P,3,.5),{tone:"mid"}));
 art.push(D([-33,-1].map(y=>dot(x+3,y,11)),{size:.45,tone:"lo"}));
 }
 return art.join("");
}
const POS=[-79,4,87];
function tower(x,i) {
 const art=[];
 art.push(S(k.slabOf({x:x-21,y:13,w:42,d:41,r:4},0,6,P,5,1),{tone:"mid"}));
 art.push(S(k.cylinder(x,34,16,6,13,P,44),{tone:"mid"}));
 art.push(L(k.sideArc(x,34,16,12,P,18),{tone:"lo"}));
 art.push(S(k.cylinder(x,34,5,19,25,P,34),{tone:"hi"}));
 art.push(S(k.cylinder(x,34,10,44,7,P,32),{tone:"mid"}));
 art.push(L(k.knurl(x,34,10,46,51,40,P,.4),{tone:"lo"}));
 art.push(S(k.slabOf({x:x-18,y:18,w:36,d:32,r:2.6},51,5,P,5,.8),{tone:"mid"}));
 art.push(L(k.planOutline({x:x-16,y:20,w:32,d:28,r:2.4},56,P),{tone:"lo"}));
 art.push(D([dot(x-11,25,56),dot(x+11,25,56),dot(x-11,43,56),dot(x+11,43,56)],{size:.4}));
 art.push(S(k.cylinder(x,34,6.6,56,7,P,32),{tone:"hi"}));
 art.push(S(k.cylinder(x,34,2.4,63,7,P,20),{tone:"hi",lit:i===1}));
 art.push(L(k.ring(x,34,5.7,70,P,32),{tone:"mid"}));
 return art.join("");
}
function pin(x,i){
 const art=[];
 art.push(S(k.cylinder(x,34,4.4,72,28,P,28),{tone:"hi",lit:true}));
 art.push(S(k.cylinder(x,34,8.8,98,5,P,40),{tone:"mid"}));
 art.push(L(k.knurl(x,34,8.8,98,103,40,P,.3),{tone:"lo"}));
 art.push(S(k.cylinder(x,34,3.5,103,3,P,24),{tone:"hi",lit:true}));
 return '<g data-moving-pin="'+i+'">'+art.join("")+'</g>';
}
function bridge(){
 const art=[];
 for(const x of [-106,-23,60]){
 art.push(S(k.slabOf({x,y:0,w:14,d:13,r:2},8,15,P,3,.7),{tone:"mid"}));
 art.push(D([dot(x+4,5,23),dot(x+10,5,23)],{size:.4}));
 }
 art.push(S(k.slabOf({x:-111,y:-4,w:209,d:9,r:1.2},23,8,P,5,.7),{tone:"mid"}));
 art.push(L(k.lineOnTop([-106,0],[88,0],31,P),{tone:"lo"}));
 art.push(S(k.cylinder(117,-3,12,4,22,P,34),{tone:"mid"}));
 art.push(L(k.ring(117,-3,8.7,26,P,32),{tone:"lo"}));
 for(let t=0;t<18;t++){const a=t*Math.PI*2/18;art.push(D([dot(117+8*Math.cos(a),-3+8*Math.sin(a),27)],{size:.22,tone:t%3?"lo":"hi"}));}
 return art.join("");
}
function carriage(){
 const art=[];
 art.push(S(k.slabOf({x:-132,y:-30,w:55,d:22,r:3},6,9,P,5,.7),{tone:"mid"}));
 art.push(S(k.slabOf({x:-125,y:-25,w:40,d:12,r:2},15,3,P,4,.4),{tone:"hi",lit:true}));
 art.push(D([-119,-107,-95].map(x=>dot(x,-19,18)),{size:.38,tone:"hi"}));
 for(const [x,y] of [[-123,-31],[-89,-31],[-123,-4],[-89,-4]]){
 art.push(S(k.cylinder(x,y,3.8,6,6,P,20),{tone:"mid"}));
 art.push(L(k.ring(x,y,2,12,P,14),{tone:"lo"}));
 }
 const arm={x:-82,y:-26,w:25,d:14,r:2};
 art.push(S(k.slabOf(arm,10,9,P,3,.5),{tone:"mid"}));
 art.push(L(k.planOutline(k.insetPlan(arm,2),19,P),{tone:"lo"}));
 return art.join("");
}
function artScene(){
 const arr=[base(),rails(),bridge()];
 for(let i=0;i<3;i++)arr.push('<g data-control="'+i+'">'+tower(POS[i],i)+'</g>');
 arr.push('<g data-part="proof-carriage">'+carriage()+'</g>');
 for(let i=0;i<3;i++)arr.push(pin(POS[i],i));
 return k.figureSvg({width:W,height:H,label:"A detailed isometric mechanical three-pin interlock made with the original Anatomy geometry engine. Toggle each moving pin; all three must be raised to release the proof carriage. The readout is derived from the exact same three-state gate model.",body:arr});
}
const drawing=artScene();
for (const [id,model] of Object.entries(scenes)){
 const buttons=model.names.map((name,i)=>'<button type="button" class="anatomy-btn" data-toggle="'+i+'" aria-pressed="false">'+(i+1)+' · '+name+'</button>').join("");
 const htmlControls='<div class="anatomy-controls"><div class="anatomy-control-label">PIN TUMBLERS / CLICK OR PRESS 1, 2, 3</div><div class="anatomy-actions">'+buttons+'<button type="button" class="anatomy-btn anatomy-run" data-run>TEST INTERLOCK (SPACE)</button><button type="button" class="anatomy-btn" data-reset>RESET (ESC)</button></div></div>';
 const body=k.plateHtml({fig:model.fig,title:model.title,hint:model.hint,readout:"0 / 3 pins lifted · LOCKED",keys:[{mark:"lit",label:"Raised pin clears the proof carriage"},{mark:"raised",label:"The carriage can travel only when all pins lift"}],caption:model.desc+" This figure and its moving geometry were built using the original open-source Anatomy skill kit; the gate inputs are fictional.",body:'<div class="iso-stage" tabindex="0" role="group" aria-label="Anatomy three-pin interlock, use buttons or 1, 2, 3 and Space">'+drawing+'</div>'+htmlControls});
 const live=
 'const P='+JSON.stringify(P)+';'+
 'const gates=[false,false,false];let carriagePos=0,target=0,last=0,raf=0;'+
 'const stage=document.querySelector(".iso-stage"), readout=document.querySelector("[data-readout]"), carriage=document.querySelector("[data-part=proof-carriage]"),pins=[...document.querySelectorAll("[data-moving-pin]")];'+
 'const still=matchMedia("(prefers-reduced-motion: reduce)");'+
 'function update(){let n=gates.filter(Boolean).length;for(let i=0;i<3;i++){pins[i].setAttribute("transform",translateAlong(P,[0,0,gates[i]?19:0]));const b=document.querySelector("[data-toggle=\\""+i+"\\"]");b.setAttribute("aria-pressed",String(gates[i]));b.classList.toggle("is-on",gates[i]);}readout.textContent=n+" / 3 pins lifted · "+(n===3?"UNLOCKED":"LOCKED");}'+
 'function animate(t){let dt=last?Math.min((t-last)/1000,.07):.016;last=t;carriagePos=still.matches?target:carriagePos+(target-carriagePos)*Math.min(1,dt*6);carriage.setAttribute("transform",translateAlong(P,[carriagePos,0,0]));if(Math.abs(target-carriagePos)>.08){raf=requestAnimationFrame(animate)}else{carriagePos=target;raf=0}}'+
 'function run(){target=gates.every(Boolean)?142:0;if(!raf){last=0;raf=requestAnimationFrame(animate)}}'+
 'function toggle(i){gates[i]=!gates[i];target=0;update();run()}'+
 'function reset(){for(let i=0;i<3;i++)gates[i]=false;target=0;update();run()}'+
 'document.querySelectorAll("[data-toggle]").forEach(b=>b.addEventListener("click",()=>toggle(Number(b.dataset.toggle))));'+
 'document.querySelector("[data-run]").addEventListener("click",run);document.querySelector("[data-reset]").addEventListener("click",reset);'+
 'document.querySelectorAll("[data-control]").forEach(node=>node.addEventListener("click",()=>toggle(Number(node.dataset.control))));pins.forEach((pin,i)=>{pin.style.cursor="pointer";pin.addEventListener("click",()=>toggle(i));});stage.addEventListener("keydown",e=>{let i=["1","2","3"].indexOf(e.key);if(i!==-1){e.preventDefault();toggle(i)}else if(e.code==="Space"){e.preventDefault();run()}else if(e.key==="Escape"){reset()}});'+
 'still.addEventListener("change",()=>{if(still.matches){carriagePos=target;carriage.setAttribute("transform",translateAlong(P,[target,0,0]))}});update();';
 const customCss='.anatomy-controls{max-width:770px;margin:0 auto 25px;padding:10px 0 8px}.anatomy-control-label{font:10px ui-monospace,monospace;letter-spacing:.1em;margin:0 0 10px;color:var(--anatomy-mid)}.anatomy-actions{display:flex;flex-wrap:wrap;gap:8px}.anatomy-btn{background:var(--anatomy-paper);color:var(--anatomy-strong);border:1px solid var(--anatomy-lo);border-radius:7px;padding:10px 13px;cursor:pointer;font:12px ui-monospace,monospace}.anatomy-btn:hover,.anatomy-btn:focus-visible{outline:1px solid var(--anatomy-mid)}.anatomy-btn.is-on,.anatomy-run{border-color:var(--anatomy-lit);background:var(--anatomy-face)}[data-moving-pin]{transition:filter .15s}.iso-stage{cursor:crosshair}.anatomy-btn[aria-pressed=true]::before{content:"✓ ";}';
 const page=k.pageHtml({title:model.title,theme:"light",body,script:kitScript()+live});
 const html=page.replace("</style>","\n"+customCss+"</style>");
 writeFileSync(join(TARGET,id+".html"),html);
 console.log("Anatomy native generated:",id+".html",html.length,"bytes");
}
