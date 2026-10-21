#!/usr/bin/env python3
"""F4 public route and claim inventory against locally served Next.js production build."""
import concurrent.futures
import json
import os
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlsplit, unquote
from xml.etree import ElementTree

BASE=os.environ.get("PORTFOLIO_BASE_URL","http://127.0.0.1:3000").rstrip("/")
CANONICAL="https://alejandrobgn.vercel.app"
TARGET=Path("artifacts/portfolio-integrity");TARGET.mkdir(parents=True,exist_ok=True)
EXCLUDED={"/meet","/venture-lab","/thesis"}
issues=[]
class Index(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=set();self.links=[];self.canonical=[];self.robots=[];self.schema=[];self.in_schema=False
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if "id" in d:self.ids.add(d["id"])
        if tag=="a" and d.get("href"):self.links.append(d["href"])
        if tag=="link" and d.get("rel")=="canonical":self.canonical.append(d.get("href"))
        if tag=="meta" and d.get("name")=="robots":self.robots.append(d.get("content",""))
        if tag=="script" and d.get("type")=="application/ld+json":self.in_schema=True
    def handle_data(self,data):
        if self.in_schema:
            try:self.schema.append(json.loads(data))
            except ValueError:fail("invalid-jsonld",data[:120])
    def handle_endtag(self,tag):
        if tag=="script":self.in_schema=False
def get(path):
    try:
        with urlopen(BASE+path,timeout=25) as r:
            data=r.read();return (path,r.status,data.decode("utf8","replace"),dict(r.headers))
    except Exception as e:return (path,0,str(e),{})
def fail(name,info):issues.append({"gate":name,"detail":str(info)[:500]})
graph=get("/atlas/graph.json");claims=get("/evidence/claims.json");sitemap=get("/sitemap.xml")
assert graph[1]==200 and claims[1]==200 and sitemap[1]==200,"Critical machine-readable route inaccessible"
g=json.loads(graph[2]);c=json.loads(claims[2]);nodes=g["nodes"];edges=g["edges"];metrics=c["claims"]
nodeids={n["id"] for n in nodes};paths={urlsplit(n["url"]).path or "/" for n in nodes}
if len(nodeids)!=len(nodes):fail("graph-unique","Duplicate IDs")
for n in nodes:
    if not n["url"].startswith(CANONICAL+"/") and n["url"]!=CANONICAL:fail("graph-origin",n)
for e in edges:
    if e["from"] not in nodeids or e["to"] not in nodeids:fail("graph-edge",e)
if c.get("auditStatus")!="NOT independently customer-audited":fail("claim-disclosure",c.get("auditStatus"))
if len(metrics)!=6 or len({m["id"] for m in metrics})!=len(metrics):fail("claim-inventory","Expected six unique reported process measures")
for m in metrics:
    if not m.get("scope") or not m.get("caveat") or not m.get("provenance") or m.get("url")!=CANONICAL+m["route"]:fail("claim-provenance",m)
if set(m["route"] for m in metrics)!={"/work/cybersecurity-ai-engineering","/work/banking-modernization"}:fail("claim-route","Unexpected public claim targets")
xml=ElementTree.fromstring(sitemap[2]);listed={urlsplit(n.text).path or "/" for n in xml.findall(".//{*}loc")}
if len(listed)!=len(xml.findall(".//{*}loc")):fail("sitemap-duplicates","Repeated sitemap URLs")
if EXCLUDED & listed:fail("noindex-in-sitemap",list(EXCLUDED&listed))
targets=sorted(paths|listed|EXCLUDED|{"/"})
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    retrieved=dict((path,(status,html,headers)) for path,status,html,headers in ex.map(get,targets))
parsed={}
for path,(status,html,headers) in retrieved.items():
    if status!=200:fail("route-http",{"path":path,"status":status});continue
    page=Index();page.feed(html);parsed[path]=page
    expected=CANONICAL+(path if path!="/" else "/")
    if page.canonical and page.canonical[0].rstrip("/")!=expected.rstrip("/"):fail("canonical",{"path":path,"value":page.canonical})
    if path in listed and expected.rstrip("/") not in [s.rstrip("/") for s in page.canonical]:fail("sitemap-canonical",path)
    if path in EXCLUDED and not any("noindex" in v for v in page.robots):fail("noindex",path)
    if path in paths and path not in listed and path not in EXCLUDED and not any("noindex" in v for v in page.robots):
        fail("graph-orphan",{"path":path,"error":"Listed in public graph but missing from sitemap or noindex"})
# Semantic consistency: structured case metrics must match the source registry.
for path,required in [
    ("/",{"Person","WebSite"}),
    ("/work",{"CollectionPage","ItemList"}),
    ("/atlas",{"CollectionPage","ItemList","BreadcrumbList"}),
    ("/work/cybersecurity-ai-engineering",{"Article","BreadcrumbList"}),
    ("/work/banking-modernization",{"Article","BreadcrumbList"}),
]:
    if path not in parsed:continue
    scripts=parsed[path].schema
    def walk(value, types, properties):
        if isinstance(value,list):
            for item in value:walk(item,types,properties)
        elif isinstance(value,dict):
            kind=value.get("@type")
            if isinstance(kind,str):types.add(kind)
            elif isinstance(kind,list):types.update(kind)
            if isinstance(value.get("additionalProperty"),list):
                properties.extend(value["additionalProperty"])
            for child in value.values():walk(child,types,properties)
    kinds=set();props=[]
    walk(scripts,kinds,props)
    missing=required-kinds
    if missing:fail("semantic-types",{"path":path,"missing":sorted(missing)})
    if path.startswith("/work/"):
        case_claims=[m for m in metrics if m["route"]==path]
        shown={(p.get("name"),str(p.get("value"))) for p in props if isinstance(p,dict)}
        for m in case_claims:
            if (m["name"],m["value"]) not in shown:fail("semantic-metric",{"route":path,"metric":m["id"]})

# Critical in-document jump links should target real elements.
for path in ["/","/work","/atlas","/work/cybersecurity-ai-engineering","/work/banking-modernization"]:
    page=parsed.get(path)
    if not page:continue
    for link in page.links:
        if link.startswith("#") and len(link)>1 and unquote(link[1:]) not in page.ids:
            fail("missing-anchor",{"page":path,"target":link})
# Every local HTML link in the executive journey must route to a real page or asset.
links=set()
for path in ["/","/work","/atlas","/work/cybersecurity-ai-engineering","/work/banking-modernization"]:
    p=parsed.get(path)
    if not p:continue
    for h in p.links:
        if h.startswith(("mailto:","tel:","#","javascript:")):continue
        u=urlsplit(h)
        if u.scheme and u.netloc!="alejandrobgn.vercel.app":continue
        dest=u.path or "/"
        if dest.startswith("/"):links.add(dest)
missing=links-set(retrieved)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    for path,status,html,headers in ex.map(get,sorted(missing)):
        if status!=200:fail("internal-link",{"path":path,"status":status})
result={"result":"PASS" if not issues else "FAIL","graphNodes":len(nodes),"graphEdges":len(edges),
  "sitemapRoutes":len(listed),"knownRouteChecks":len(retrieved),"checkedInternalLinks":len(links),
  "publicClaims":len(metrics),"noindexPaths":sorted(EXCLUDED),"issues":issues,
  "limits":"Public URL is not checked; inspected local production build. Google indexing not guaranteed."}
(TARGET/"route-inventory.json").write_text(json.dumps(result,indent=2))
print(json.dumps(result,indent=2))
sys.exit(1 if issues else 0)
