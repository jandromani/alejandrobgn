/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers(){
    return [
      {source:"/labs/original/:path*",headers:[
        {key:"X-Robots-Tag",value:"noindex, nofollow"},
        {key:"Referrer-Policy",value:"no-referrer"},
        {key:"X-Content-Type-Options",value:"nosniff"}
      ]}
    ]
  }
}
export default nextConfig
