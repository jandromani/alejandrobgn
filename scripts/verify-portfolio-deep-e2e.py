#!/usr/bin/env python3
"""F3/F5: local-browser interaction and accessibility audit, never customer validation."""
import asyncio, json, os, re, sys
from pathlib import Path
from playwright.async_api import async_playwright

BASE=os.getenv("PORTFOLIO_BASE_URL","http://127.0.0.1:3000")
AXE=os.getenv("AXE_CORE_PATH")
OUT=Path("artifacts/portfolio-final-qa");OUT.mkdir(parents=True,exist_ok=True)
report={"checks":[],"failures":[],"accessibility":[],"performance":[],"screenshots":[],"limits":[
"Run against locally built Next.js, not public Vercel production",
"Chromium timings are synthetic; not real-user LCP, CLS or INP",
"No human participants were tested for 5s/30s comprehension",
"axe is automated coverage, not a certification of WCAG conformance"]}
def check(name,ok,detail=""):
    row={"name":name,"pass":bool(ok),"detail":str(detail)[:500]}
    report["checks"].append(row)
    if not ok:report["failures"].append(row)
async def screenshot(p,name):
    await p.screenshot(path=str(OUT/(name+".png")),animations="disabled",full_page=True)
    report["screenshots"].append(name+".png")
async def atlas(browser,width):
    p=await browser.new_page(viewport={"width":width,"height":844 if width<600 else 1000})
    try:
        await p.goto(BASE+"/atlas?node=case%3Abanking-modernization#map",wait_until="domcontentloaded")
        await p.locator("aside h2").get_by_text("Source-to-evidence modernization").wait_for(timeout=15000)
        check(f"atlas {width} deep link",True)
        check(f"atlas {width} canonical without query",await p.locator('link[rel="canonical"]').get_attribute("href")=="https://alejandrobgn.vercel.app/atlas")
        await p.locator("#atlas-search").fill("robotics")
        results=p.locator('[aria-label="Atlas search results"] button')
        await results.first.wait_for(timeout=5000)
        check(f"atlas {width} search results",await results.count()>0)
        await results.first.click()
        check(f"atlas {width} selected URL", "node=" in p.url and "robotics" in p.url.lower())
        check(f"atlas {width} permalink",await p.get_by_role("link",name="Permalink to this entry").count()==1)
        await p.get_by_role("button",name="Reset").click()
        check(f"atlas {width} reset",await p.locator("#atlas-search").input_value()=="" and "node=" not in p.url)
        if width<600:
            await p.locator("#atlas-mobile-node").select_option("case:banking-modernization")
            check("atlas mobile native select", "node=case" in p.url)
        await screenshot(p,f"atlas-{width}-linked")
    except Exception as ex:check(f"atlas {width} E2E",False,ex)
    finally:await p.close()
async def anatomy(browser,width,route,expected):
    p=await browser.new_page(viewport={"width":width,"height":844 if width<600 else 900})
    try:
        await p.goto(BASE+route+"?stage=2#anatomy",wait_until="domcontentloaded")
        await p.get_by_role("heading",name=expected).wait_for(timeout=10000)
        check(f"{route} {width} stage deep link",True)
        status=p.locator('[id^="anatomy-status-"]')
        await p.get_by_role("button",name="Test interlock").click()
        check(f"{route} {width} blocked", "Blocked by one or more" in await status.inner_text())
        gates=p.locator('button[aria-controls^="anatomy-status-"]')
        check(f"{route} {width} gate count",await gates.count()==3)
        for i in range(3):await gates.nth(i).click()
        check(f"{route} {width} enabled",all([(await gates.nth(i).get_attribute("aria-pressed"))=="true" for i in range(3)]))
        await p.get_by_role("button",name="Test interlock").click()
        check(f"{route} {width} pass simulation", "gates illustrated as passing" in (await status.inner_text()).lower() or "passed the illustrated handoff" in (await status.inner_text()).lower())
        check(f"{route} {width} inspect evidence anchor",await p.locator('a[href^="#results"],a[href="#scope"],a[href="#evidence-title"]').count()>0)
        await p.get_by_role("button",name="Reset").click()
        check(f"{route} {width} reset", "Model idle" in await status.inner_text() and all([(await gates.nth(i).get_attribute("aria-pressed"))=="false" for i in range(3)]))
        check(f"{route} {width} stage share URL",await p.get_by_role("link",name=re.compile("Link directly to stage")).count()==1)
        await screenshot(p,route.split("/")[-1]+"-"+str(width)+"-interlock")
    except Exception as ex:check(f"{route} {width} anatomy E2E",False,ex)
    finally:await p.close()
async def journey(browser):
    p=await browser.new_page(viewport={"width":390,"height":844})
    try:
        await p.goto(BASE+"/",wait_until="domcontentloaded")
        await p.get_by_role("link",name="See enterprise results").click()
        await p.wait_for_url("**/work",timeout=15000)
        check("journey home-to-work",True)
        await p.locator('a[href="/work/cybersecurity-ai-engineering"]').first.click()
        await p.wait_for_url("**/work/cybersecurity-ai-engineering",timeout=15000)
        check("journey work-to-case",True)
        await p.get_by_role("link",name=re.compile("Explore the interactive engineering Anatomy")).click()
        check("journey case-to-anatomy","anatomy" in p.url)
        await p.goto(BASE+"/atlas?node=case%3Abanking-modernization")
        await p.locator('aside a[href="/work/banking-modernization"]').first.click()
        await p.wait_for_url("**/work/banking-modernization",timeout=15000)
        check("journey atlas-to-case",True)
    except Exception as ex:check("executive journey",False,ex)
    finally:await p.close()
async def accessibility(browser):
    if not AXE or not Path(AXE).exists():
        check("axe-core installed",False,"AXE_CORE_PATH missing; cannot claim automated WCAG audit")
        return
    for route in ["/","/work","/atlas","/work/banking-modernization","/work/cybersecurity-ai-engineering"]:
        p=await browser.new_page(viewport={"width":390,"height":844})
        try:
            await p.goto(BASE+route,wait_until="domcontentloaded")
            await p.add_script_tag(path=AXE)
            findings=await p.evaluate("""async () => {
              const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
              return r.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.length,targets:v.nodes.slice(0,4).map(n=>n.target)}))
            }""")
            major=[v for v in findings if v["impact"] in ("critical","serious")]
            report["accessibility"].append({"route":route,"violations":findings,"major":len(major)})
            check("axe critical "+route,not any(v["impact"]=="critical" for v in findings),str(major[:2]))
            # Serious findings remain reportable open audit work until corrected.
            check("axe serious "+route,not major,str(major[:3]))
            nav=await p.evaluate("""() => {const n=performance.getEntriesByType('navigation')[0];const f=performance.getEntriesByType('paint').find(x=>x.name==='first-contentful-paint');return {domContentLoadedMs:Math.round(n.domContentLoadedEventEnd),fcpMs:f?Math.round(f.startTime):null,resources:performance.getEntriesByType('resource').length}}""")
            report["performance"].append({"route":route,**nav,"context":"Local headless Chromium, NOT Core Web Vitals"})
            check("navigation < 10s "+route,nav["domContentLoadedMs"]<10000,nav)
        except Exception as ex:check("axe and synthetic performance "+route,False,ex)
        finally:await p.close()
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(headless=True)
        await journey(b)
        for w in (390,1440):await atlas(b,w)
        for route,name in [("/work/cybersecurity-ai-engineering","Intent → reviewable contract"),("/work/banking-modernization","Recover relationships")]:
            for w in (390,1440):await anatomy(b,w,route,name)
        await accessibility(b)
        await b.close()
    (OUT/"scorecard.json").write_text(json.dumps(report,indent=2))
    print(json.dumps({"passed":len(report["checks"])-len(report["failures"]),"failed":len(report["failures"]),
      "accessibility":report["accessibility"],"performance":report["performance"],"errors":report["failures"]},indent=2))
    return 1 if report["failures"] else 0
if __name__=="__main__":raise SystemExit(asyncio.run(main()))
