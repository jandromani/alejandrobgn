#!/usr/bin/env python3
"""Exhaustive local-production sitemap audit. No claim of public-browser, Google or human validation."""
import asyncio,json,os,sys
from pathlib import Path
from urllib.parse import urljoin,urlparse
from xml.etree import ElementTree
from urllib.request import urlopen
from playwright.async_api import async_playwright

BASE="http://127.0.0.1:3000"
AXE="/tmp/portfolio-axe/node_modules/axe-core/axe.min.js"
OUT=Path("artifacts/full-site-audit");OUT.mkdir(parents=True,exist_ok=True)
report={"method":"local Next.js production server; axe-core + Chromium","pages":[],"internalLinks":[],"externalLinks":[],"issues":[]}
with urlopen(BASE+"/sitemap.xml") as res:
    xml=ElementTree.fromstring(res.read())
paths=sorted({urlparse(x.text).path or "/" for x in xml.findall(".//{*}loc")})
paths+=["/meet","/thesis","/venture-lab"]
internal={}
external={}
def fail(path,gate,detail):
    report["issues"].append({"path":path,"gate":gate,"detail":str(detail)[:400]})
async def main():
  async with async_playwright() as playwright:
    browser=await playwright.chromium.launch(headless=True)
    for device,width,height in [("mobile",390,844),("desktop",1440,900)]:
      for path in paths:
        page=await browser.new_page(viewport={"width":width,"height":height},device_scale_factor=1)
        data={"path":path,"device":device,"status":None,"title":"","h1":0,"landmarks":0,"horizontalOverflow":0,"axeSerious":[],"axeModerate":[],"brokenImages":[]}
        try:
          r=await page.goto(BASE+path,wait_until="domcontentloaded",timeout=35000)
          data["status"]=r.status if r else 0
          if data["status"]!=200:fail(path,"status",data["status"])
          data["title"]=await page.title()
          data["h1"]=await page.locator("h1").count()
          data["landmarks"]=await page.locator("main").count()
          if data["h1"]!=1:fail(path,"h1",data["h1"])
          if data["landmarks"]!=1:fail(path,"main",data["landmarks"])
          js=await page.evaluate("""() => {
            const ids=new Set([...document.querySelectorAll('[id]')].map(e=>e.id));
            const urls=[...document.querySelectorAll('a[href]')].map(e=>e.getAttribute('href'));
            const badAnchors=urls.filter(x=>x.startsWith('#')&&x.length>1&&!ids.has(decodeURIComponent(x.slice(1))));
            const badImages=[...document.querySelectorAll('img')].filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.src);
            return {overflow:document.documentElement.scrollWidth-innerWidth,urls,badAnchors,badImages};
          }""")
          data["horizontalOverflow"]=js["overflow"];data["brokenImages"]=js["badImages"]
          if js["overflow"]>2:fail(path,"overflow",str(js["overflow"])+"px")
          for x in js["badAnchors"]:fail(path,"missing-anchor",x)
          for x in js["badImages"]:fail(path,"broken-image",x)
          if device=="desktop":
            for h in js["urls"]:
              if h.startswith(("mailto:","tel:","javascript:","data:","blob:","#")):continue
              u=urlparse(urljoin("https://alejandrobgn.vercel.app"+path,h))
              if u.netloc=="alejandrobgn.vercel.app":
                internal.setdefault(u.path or "/",set()).add(path)
              elif u.scheme in ("https","http"): external.setdefault(u.geturl(),set()).add(path)
          await page.add_script_tag(path=AXE)
          violations=await page.evaluate("""async () => {
            const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
            return r.violations.map(v=>({id:v.id,impact:v.impact,instances:v.nodes.length,targets:v.nodes.slice(0,3).map(n=>n.target)}));
          }""")
          data["axeSerious"]=[v for v in violations if v["impact"] in ("critical","serious")]
          data["axeModerate"]=[v for v in violations if v["impact"] not in ("critical","serious")]
          for v in data["axeSerious"]:fail(path,"axe-"+device,v)
          if path in ("/","/work","/atlas","/labs","/systems","/writing","/experience","/about","/contact","/publications","/work/cybersecurity-ai-engineering","/work/banking-modernization"):
            await page.screenshot(path=str(OUT/(device+"-"+(path.strip("/").replace("/","-") or "home")+".png")),animations="disabled",full_page=False)
        except Exception as e:fail(path,"browser-"+device,e)
        report["pages"].append(data)
        await page.close()
    context=await browser.new_context()
    for path,referrers in sorted(internal.items()):
      try:
        res=await context.request.get(BASE+path,timeout=18000)
        row={"path":path,"status":res.status,"referrers":sorted(referrers)}
        report["internalLinks"].append(row)
        if res.status>=400:fail(path,"internal-url",res.status)
      except Exception as e:fail(path,"internal-url-request",e)
    await context.close()
    await browser.close()
  report["externalLinks"]=[{"url":k,"referrers":sorted(v)} for k,v in sorted(external.items())]
  report["summary"]={"sitemapRoutes":len(paths)-3,"auditedScreens":len(report["pages"]),"internalLinkDestinations":len(internal),"externalDestinations":len(external),"majorAccessibility":sum(len(x["axeSerious"]) for x in report["pages"]),"moderateAccessibility":sum(len(x["axeModerate"]) for x in report["pages"]),"issues":len(report["issues"])}
  (OUT/"report.json").write_text(json.dumps(report,indent=2,ensure_ascii=False),encoding="utf8")
  print(json.dumps({"summary":report["summary"],"issues":report["issues"][:50],"externalHosts":sorted({urlparse(x["url"]).netloc for x in report["externalLinks"]})},indent=2))
  return 1 if any(x["gate"].startswith("axe-") or x["gate"] in ("internal-url","internal-url-request","status","h1","main","broken-image","overflow") for x in report["issues"]) else 0
if __name__=="__main__":sys.exit(asyncio.run(main()))
