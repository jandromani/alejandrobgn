import asyncio,json
from playwright.async_api import async_playwright
BASE="http://127.0.0.1:3000"
PATHS=["/work/banking-modernization","/work/cybersecurity-ai-engineering","/writing/governing-agentic-systems","/work","/"]
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(headless=True)
    result=[]
    for route in PATHS:
      page=await b.new_page(viewport={"width":1440,"height":900})
      logs=[]
      page.on("pageerror",lambda err:logs.append({"type":"pageerror","message":str(err),"stack":getattr(err,"stack","")}))
      page.on("console",lambda msg:logs.append({"type":"console","message":msg.text}) if msg.type=="error" else None)
      try:
        await page.goto(BASE+route,wait_until="domcontentloaded",timeout=120000)
        await page.wait_for_timeout(2400)
        print(json.dumps({"route":route,"errors":logs[:20]},ensure_ascii=False)[:14000],flush=True)
        result.append({"route":route,"errors":logs})
      except Exception as e:print(route,str(e),flush=True)
      await page.close()
    await b.close()
    with open("hydration-diagnostics.json","w") as f:json.dump(result,f,indent=2)
asyncio.run(main())
