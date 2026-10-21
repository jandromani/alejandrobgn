/**
 * Public-safe reported engineering process measures. These are NOT independently
 * audited client KPIs, monetary savings, or functionality-parity certifications.
 * Avoid naming customers or revealing confidential source data.
 */
export type PublicEngineeringMetric = {
  id: string
  value: string
  short: string
  name: string
  provenance: string
  scope: string
  caveat: string
  route: string
}
export const enterpriseEvidence = {
  deliveryTime: {
    id:"delivery-time",
    value:"<1 month",short:"<1mo",
    name:"Time to AI workflow use",
    provenance:"Delivery-team account",
    scope:"Participating engineering workflows; August 2026 engagement",
    caveat:"Not independently audited company-wide adoption or measured ROI",
    route:"/work/cybersecurity-ai-engineering",
  },
  deliveryPeers: {
    id:"delivery-peers",value:"2 peers",short:"2",
    name:"Initial technical delivery nucleus",provenance:"Delivery-team account",
    scope:"Two collaborating engineering practitioners, not the full client team",
    caveat:"Not a headcount for all participating engineers",route:"/work/cybersecurity-ai-engineering",
  },
  deliveryRoles: {
    id:"delivery-roles",value:"4 roles",short:"4",
    name:"Assistance roles introduced",provenance:"Delivery-team account",
    scope:"Backend, frontend, QA and Gherkin assistance workflows",
    caveat:"Not four independent production agents",route:"/work/cybersecurity-ai-engineering",
  },
  modernizationDuration: {
    id:"modernization-duration",value:"4 weeks",short:"4w",
    name:"PoC duration",provenance:"Engineering-team account",
    scope:"Time spent in the bounded reference-module engagement",
    caveat:"Not a full system migration or a production release",route:"/work/banking-modernization",
  },
  contextReduction: {
    id:"context-reduction",value:"89.9%",short:"89.9%",
    name:"Reduction in working context",provenance:"Engineering-team process measurement",
    scope:"Working context used in the evaluated method within a reference scope",
    caveat:"Not 89.9% less engineering time, cost or token spend; baseline source is not public",
    route:"/work/banking-modernization",
  },
  modernizationGates: {
    id:"modernization-gates",value:"13 gates",short:"13",
    name:"Technical gates reported green",provenance:"Engineering-team internal test account",
    scope:"Quality checks inside the bounded modernization proof of concept",
    caveat:"Not client certification, full-estate coverage or functional parity",
    route:"/work/banking-modernization",
  },
} as const satisfies Record<string,PublicEngineeringMetric>

export const deliveryMetrics = [enterpriseEvidence.deliveryTime,enterpriseEvidence.deliveryPeers,enterpriseEvidence.deliveryRoles]
export const modernizationMetrics = [enterpriseEvidence.modernizationDuration,enterpriseEvidence.modernizationGates]
export const publicMetrics = [...deliveryMetrics,...modernizationMetrics]
export function metricProperties(metrics: readonly PublicEngineeringMetric[]) {
  return metrics.map((metric)=>({
    "@type":"PropertyValue",
    name:metric.name,
    value:metric.value,
    description:`${metric.provenance}. Scope: ${metric.scope}. Boundary: ${metric.caveat}.`,
  }))
}
