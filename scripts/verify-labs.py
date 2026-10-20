#!/usr/bin/env python3
"""Browser rendering QA for original lab artifacts; no provider/financial/production claims."""
from pathlib import Path
import json
from PIL import Image
from playwright.sync_api import sync_playwright, TimeoutError as BrowserTimeout

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
        # A timed-out DOMContentLoaded can still leave a useful partial interface.
        # Keep that separate from uncaught JS errors and from verified end-to-end behavior.
        item["dom_load_timed_out"] = False
        try:
            page.set_content(path.read_text(encoding="utf-8", errors="replace"),
                             wait_until="domcontentloaded", timeout=5500)
        except BrowserTimeout:
            item["dom_load_timed_out"] = True
            item["limitations"] += "; DOMContentLoaded timed out, likely due to external scripts"
        except Exception as exc:
            item["runtime_errors"].append(str(exc)[:220])
        try:
            page.wait_for_timeout(850)
            body = page.locator("body").inner_text(timeout=4000).strip()
            item["title"] = page.title()[:130]
            item["body_characters"] = len(body)
            item["interactive_elements"] = page.locator("button, input, select, [role='button']").count()
            item["runtime_errors"] = (item["runtime_errors"] + errors)[:5]
            item["rendered"] = len(body) > 100 and len(item["title"]) > 2
            if item["rendered"]:
                png = page.screenshot(type="png", animations="disabled", timeout=12000)
                import io
                im = Image.open(io.BytesIO(png)).convert("RGB")
                im.save(COVERS / (slug + ".webp"), format="WEBP", quality=82, method=5)
                item["cover_generated"] = True
        except Exception as exc:
            item["runtime_errors"] = (item["runtime_errors"] + errors + [str(exc)[:220]])[:5]
        if slug == "openspec":
            item["original_source_error"] = item["runtime_errors"][:]
            item["variant_path"] = "public/labs/runtime/openspec-sdd-lab-fixed.html"
            fixed = ROOT / item["variant_path"]
            if fixed.exists():
                check = browser.new_page(viewport={"width": 1440, "height": 900})
                variant_errors = []
                check.on("pageerror", lambda exc: variant_errors.append(str(exc)[:220]))
                try:
                    check.set_content(fixed.read_text(encoding="utf-8", errors="replace"), wait_until="domcontentloaded", timeout=5500)
                    check.wait_for_timeout(400)
                    item["patched_runtime_rendered"] = len(check.locator("body").inner_text(timeout=3000)) > 100
                    item["patched_runtime_errors"] = variant_errors[:5]
                except Exception as exc:
                    item["patched_runtime_rendered"] = False
                    item["patched_runtime_errors"] = (variant_errors + [str(exc)[:220]])[:5]
                check.close()
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
