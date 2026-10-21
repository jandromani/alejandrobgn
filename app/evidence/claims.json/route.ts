import { publicMetrics } from "@/lib/enterprise-evidence"
import { absoluteUrl } from "@/lib/seo"

/** Machine-readable *disclosure* ledger: do not treat as audited customer KPIs. */
export function GET() {
  return Response.json({
    schema:"https://alejandrobgn.vercel.app/evidence/claims.json",
    version:1,
    evidenceType:"self-reported engineering process measures",
    auditStatus:"NOT independently customer-audited",
    measurementLimits:"Confidential baselines, project source and customer business figures are not public",
    canonical:"https://alejandrobgn.vercel.app",
    claims:publicMetrics.map(m=>({...m,url:absoluteUrl(m.route)})),
  },{headers:{"Cache-Control":"public,max-age=300,s-maxage=3600","X-Robots-Tag":"noindex"}})
}
