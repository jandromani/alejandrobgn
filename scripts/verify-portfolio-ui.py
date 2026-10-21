#!/usr/bin/env python3
"""Local Chromium gate: real HTML interactions, responsive captures, and route health.
No customer accounts, providers, external Vercel hosts, or private data are tested.
"""
import asyncio
import json
import re
import sys
from pathlib import Path
from playwright.async_api import async_playwright

ORIGIN = "http://127.0.0.1:3000"
TARGET = Path("artifacts/portfolio-ui-qa")
TARGET.mkdir(parents=True, exist_ok=True)
ROUTES = [
    ("/", "home"),
    ("/work", "work"),
    ("/work/cybersecurity-ai-engineering", "cybersecurity"),
    ("/work/banking-modernization", "modernization"),
    ("/atlas", "atlas"),
    ("/systems", "systems"),
    ("/labs", "labs"),
    ("/writing", "writing"),
    ("/publications", "publications"),
    ("/experience", "experience"),
    ("/about", "about"),
    ("/contact", "contact"),
]
DEVICES = [
    ("wide", 1920, 1080),
    ("desktop", 1440, 900),
    ("tablet", 1024, 768),
    ("mobile", 390, 844),
    ("small-mobile", 320, 740),
]
REPORT = {"checks": [], "errors": [], "screenshots": [], "source": "local Next.js build / headless Chromium"}
def record(label, ok, info=""):
    REPORT["checks"].append({"name": label, "pass": bool(ok), "info": info})
    if not ok:
        REPORT["errors"].append({"name": label, "info": info})
def record_error(label, exc):
    record(label, False, str(exc)[:500])

async def route_gate(browser, size, name, path, alias):
    page = await browser.new_page(viewport={"width": size[0], "height": size[1]}, device_scale_factor=1)
    try:
        response = await page.goto(ORIGIN+path, wait_until="domcontentloaded", timeout=30000)
        code = response.status if response else 0
        record(name+" "+path+" HTTP", 200 <= code < 400, str(code))
        if not (200 <= code < 400):
            return
        await page.locator("h1").first.wait_for(timeout=15000)
        title = await page.title()
        record(name+" "+path+" page title", bool(title and "Alejandro" in title), title[:160])
        record(name+" "+path+" unique main", await page.locator("main").count() == 1)
        if path in ("/work/cybersecurity-ai-engineering", "/work/banking-modernization"):
            metric = page.locator("header .font-mono").filter(has_text=re.compile(r"(?:89\\.9%|13 gates|1 month)")).first
            if await metric.count() == 0:
                metric = page.locator("header .font-mono.text-3xl,header .font-mono.text-2xl").first
            record(name+" "+path+" first-screen evidence near heading",
                   await metric.count() > 0 and (await metric.bounding_box()) is not None
                   and (await metric.bounding_box())["y"] < (size[1]+220))
        if path == "/":
            record(name+" home clear enterprise CTA", await page.locator('a[href="/work"]').count() > 0)

        dimensions = await page.evaluate("""() => ({
          viewport: window.innerWidth,
          content: document.documentElement.scrollWidth,
          htmlOffenders: [...document.querySelectorAll('body *')]
            .filter(e => !(e instanceof SVGElement))
            .map(e => ({e,r:e.getBoundingClientRect()}))
            .filter(x => x.r.width > 0 && (x.r.right > window.innerWidth + 2 || x.r.left < -2))
            .sort((a,b)=>b.r.right-a.r.right)
            .slice(0,12)
            .map(x=>({tag:x.e.tagName.toLowerCase(),className:typeof x.e.className === 'string'?x.e.className.slice(0,130):'',left:Math.round(x.r.left),right:Math.round(x.r.right),w:Math.round(x.r.width)})),
          offenders: [...document.querySelectorAll('body *')]
            .map(e => ({e, r:e.getBoundingClientRect()}))
            .filter(x => x.r.width > 0 && (x.r.right > window.innerWidth + 2 || x.r.left < -2))
            .sort((a,b) => (b.r.right-window.innerWidth)-(a.r.right-window.innerWidth))
            .slice(0,7)
            .map(x => ({tag:x.e.tagName.toLowerCase(), className:typeof x.e.className === 'string'?x.e.className.slice(0,130):'svg', left:Math.round(x.r.left), right:Math.round(x.r.right)}))
        })""")
        record(name+" "+path+" no page overflow", dimensions["content"] <= dimensions["viewport"]+2, str(dimensions))
        pathname = ("root" if not path.strip("/") else alias)
        filename = name+"-"+pathname+".png"
        await page.screenshot(path=str(TARGET / filename), full_page=False, animations="disabled")
        if name in ("desktop", "mobile") and path in ("/", "/work", "/work/cybersecurity-ai-engineering", "/work/banking-modernization", "/atlas"):
            full_name=name+"-"+pathname+"-full.png"
            await page.screenshot(path=str(TARGET / full_name), full_page=True, animations="disabled")
            REPORT["screenshots"].append(full_name)
        REPORT["screenshots"].append(filename)
    except Exception as exc:
        record_error(name+" "+path+" browser flow", exc)
    finally:
        await page.close()

async def interaction_gates(browser):
    mobile = await browser.new_page(viewport={"width":390, "height":844},device_scale_factor=1)
    try:
        await mobile.goto(ORIGIN+"/", wait_until="domcontentloaded")
        await mobile.get_by_role("button", name="Open navigation menu").click()
        visible = await mobile.locator('nav[aria-label="Mobile navigation"]').is_visible()
        record("mobile menu opens", visible)
        await mobile.locator('nav[aria-label="Mobile navigation"] a[href="/work"]').click()
        await mobile.wait_for_url("**/work",timeout=15000)
        record("mobile menu Work navigation", mobile.url.endswith("/work"))
        await mobile.locator('nav[aria-label="Mobile navigation"]').wait_for(state="hidden", timeout=6000)
        record("mobile menu closes after route", True)
    except Exception as exc:
        record_error("mobile navigation",exc)
    finally:
        await mobile.close()

    atlas = await browser.new_page(viewport={"width":390,"height":844},device_scale_factor=1)
    try:
        await atlas.goto(ORIGIN+"/atlas",wait_until="domcontentloaded")
        select=atlas.locator("#atlas-mobile-node")
        record("atlas native picker visible",await select.is_visible())
        await select.select_option("case:banking-modernization")
        await atlas.get_by_role("heading", name="Source-to-evidence modernization").first.wait_for(timeout=7000)
        record("atlas updates selected evidence", True)
        record("atlas offers real source link", await atlas.locator('a[href="/work/banking-modernization"]').count()>0)
        await atlas.screenshot(path=str(TARGET/"mobile-atlas-selected.png"),full_page=False,animations="disabled")
        REPORT["screenshots"].append("mobile-atlas-selected.png")
    except Exception as exc:
        record_error("atlas touch navigation",exc)
    finally:
        await atlas.close()

    for route,stage in [("/work/cybersecurity-ai-engineering","Scoped specification"),("/work/banking-modernization","Knowledge graph")]:
        page=await browser.new_page(viewport={"width":390,"height":844},device_scale_factor=1)
        try:
            await page.goto(ORIGIN+route,wait_until="domcontentloaded")
            buttons=page.locator('[aria-label="Anatomy process steps"] button')
            record(route+" anatomy mobile steps",await buttons.count()>=4)
            await buttons.nth(1).click()
            record(route+" anatomy stage selected", await buttons.nth(1).get_attribute("aria-pressed")=="true")
            await page.get_by_role("button",name=re.compile("Test interlock")).click()
            record(route+" gate block status",await page.get_by_text(re.compile("Blocked by one or more open quality gates")).count()>0)
            await page.screenshot(path=str(TARGET/(route.split("/")[-1]+"-anatomy-mobile.png")),full_page=False,animations="disabled")
            REPORT["screenshots"].append(route.split("/")[-1]+"-anatomy-mobile.png")
        except Exception as exc:
            record_error(route+" anatomy interaction",exc)
        finally:
            await page.close()

async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True)
        for label,w,h in DEVICES:
            for path,alias in ROUTES:
                await route_gate(browser,(w,h),label,path,alias)
        for path,alias in ROUTES[:5]:
            await route_gate(browser,(768,1024),"portrait-tablet",path,alias)
        await interaction_gates(browser)
        await browser.close()
    (TARGET/"report.json").write_text(json.dumps(REPORT,indent=2),encoding="utf-8")
    print(json.dumps({"passed":sum(c["pass"] for c in REPORT["checks"]), "failed":len(REPORT["errors"]),
      "captures":len(REPORT["screenshots"]), "errors":REPORT["errors"]},indent=2))
    return 1 if REPORT["errors"] else 0

if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
