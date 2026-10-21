#!/usr/bin/env python3
"""External URL probe. 403/429/timeouts are INDETERMINATE, not broken links."""
import concurrent.futures,json,ssl,urllib.request,urllib.error
from pathlib import Path
P=Path("artifacts/full-site-audit");data=json.loads((P/"report.json").read_text())
urls=data.get("externalLinks",[])
def probe(item):
 u=item["url"];headers={"User-Agent":"Mozilla/5.0 (compatible; PortfolioExternalLinkAudit/1.0; audit contact page)"}
 result={"url":u,"referrers":item["referrers"],"status":None,"classification":"indeterminate","finalUrl":None,"note":None}
 for method in ("HEAD","GET"):
  try:
   req=urllib.request.Request(u,headers=headers,method=method)
   with urllib.request.urlopen(req,timeout=9,context=ssl.create_default_context()) as r:
    status=r.status
    result.update(status=status,finalUrl=r.geturl(),classification="reachable" if status<400 else "indeterminate")
    return result
  except urllib.error.HTTPError as e:
   result["status"]=e.code
   if e.code in (404,410):
    result["classification"]="not-found";return result
   if method=="HEAD" and e.code in (400,403,405,429,501):continue
   result["classification"]="access-restricted" if e.code in (401,403,429) else "server-error" if e.code>=500 else "indeterminate"
   result["note"]=str(e)[:180];return result
  except Exception as e:
   result["note"]=str(e)[:180]
   if method=="HEAD":continue
 return result
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as ex:results=list(ex.map(probe,urls))
summary={label:sum(r["classification"]==label for r in results) for label in ["reachable","not-found","access-restricted","server-error","indeterminate"]}
(P/"external-links.json").write_text(json.dumps({"summary":summary,"links":results,"limits":"External status can change, bot protection and private repositories can return 403/404. Do not automatically delete links."},indent=2))
print(json.dumps({"summary":summary,"notFound":[r for r in results if r["classification"]=="not-found"],"indeterminate":[r["url"] for r in results if r["classification"]=="indeterminate"][:15]},indent=2))
