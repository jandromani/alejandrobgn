#!/usr/bin/env python3
"""Browser rendering QA for original lab artifacts; no provider/financial/production claims."""
from pathlib import Path
import json
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
ORIGINALS = ROOT / "public/labs/original"
COVERS = ROOT / "public/labs/covers"
REPORT = ROOT / "public/labs/qa-report.json"
LABS = {
    "assetgraph": "assetgraph.html",
    "montageos": "montageos.html",
    "roomforge": "roomforge.html",
    "pumpum": "pumpum.html",
    "robotics-radar": "robotics-radar.html",
    "robotics-terminal": "robotics-investment-terminal.html",
    "openspec": "openspec-sdd-lab.html",
    "entropic-agent-lab": "entropic-agent-lab.html",
}
COVERS.mkdir(parents=True, exist_ok=True)
results = []
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
    for slug, filename in LABS.items():
        path = ORIGINALS / filename
        item = {"slug": slug, "source_exists": path.is_file(), "rendered": False,
                "interactive_elements": 0, "runtime_errors": [], "cover_generated": False,
                "limitations": "DOM/render smoke test only; external providers and complete interaction paths not tested"}
        if not path.is_file():
            results.append(item)
            continue
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        errors = []
        page.on("pageerror", lambda exc: errors.append(str(exc)[:220]))
        try:
            # set_content is safe for offline examination; source files remain untouched.
            page.set_content(path.read_text(encoding="utf-8", errors="replace"),
                             wait_until="domcontentloaded", timeout=20000)
            page.wait_for_timeout(1900)
            body = page.locator("body").inner_text(timeout=6000).strip()
            item["title"] = page.title()[:130]
            item["body_characters"] = len(body)
            item["interactive_elements"] = page.locator("button, input, select, [role='button']").count()
            item["runtime_errors"] = errors[:5]
            item["rendered"] = len(body) > 100 and len(item["title"]) > 2
            if item["rendered"]:
                png = page.screenshot(type="png", animations="disabled", timeout=15000)
                import io
                im = Image.open(io.BytesIO(png)).convert("RGB")
                im.save(COVERS / (slug + ".webp"), format="WEBP", quality=82, method=5)
                item["cover_generated"] = True
        except Exception as exc:
            item["runtime_errors"] = (errors + [str(exc)[:220]])[:5]
        finally:
            page.close()
        results.append(item)
    browser.close()

REPORT.write_text(json.dumps({"test": "offline Chromium DOM/render smoke; no end-to-end claims",
                              "viewport": "1440x900", "labs": results},
                             ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps([{"slug": x["slug"],"rendered":x["rendered"],"errors":len(x["runtime_errors"]),
                   "cover":x["cover_generated"]} for x in results]))
if not all(x["source_exists"] for x in results):
    raise SystemExit("Original source files missing")
