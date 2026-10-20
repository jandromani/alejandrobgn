/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // Archive and standalone executable copies are intentionally reachable but
    // not competing search landing pages. Canonical indexable pages are /labs
    // and the case studies that explain these figures.
    return [
      { source: "/labs/original/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/labs/runtime/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/anatomy/figures/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
    ]
  },
}

export default nextConfig
