/**
 * Public release identification. No credentials or private environment values.
 * Vercel injects these safe commit identifiers in production deployments.
 */
export function GET() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? null
  return Response.json({
    canonical:"https://alejandrobgn.vercel.app",
    commit:sha,
    deployedOnVercel:process.env.VERCEL === "1",
    evidenceScope:"Deployment provenance only; not customer verification",
  }, {headers:{"Cache-Control":"no-store, max-age=0","X-Robots-Tag":"noindex"}})
}
