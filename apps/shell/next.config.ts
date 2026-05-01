import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: `${process.env.MFE_BLOG_URL ?? 'http://localhost:3002'}/blog/`,
      },
      {
        source: '/blog/:path*',
        destination: `${process.env.MFE_BLOG_URL ?? 'http://localhost:3002'}/blog/:path*`,
      },
      {
        source: '/_nuxt/:path*',
        destination: `${process.env.MFE_BLOG_URL ?? 'http://localhost:3002'}/_nuxt/:path*`,
      },
      {
        source: '/lab',
        destination: `${process.env.MFE_LAB_URL ?? 'http://localhost:3003'}/lab/`,
      },
      {
        source: '/lab/:path*',
        destination: `${process.env.MFE_LAB_URL ?? 'http://localhost:3003'}/lab/:path*`,
      },
      {
        source: '/infra',
        destination: `${process.env.MFE_INFRA_URL ?? 'http://localhost:3004'}/infra/`,
      },
      {
        source: '/infra/:path*',
        destination: `${process.env.MFE_INFRA_URL ?? 'http://localhost:3004'}/infra/:path*`,
      },
    ]
  },
}

export default nextConfig