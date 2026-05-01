import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  transpilePackages: ['@repo/ui'],
  async rewrites() {
    const BLOG  = process.env.MFE_BLOG_URL  ?? 'http://localhost:3002'
    const LAB   = process.env.MFE_LAB_URL   ?? 'http://localhost:3003'
    const INFRA = process.env.MFE_INFRA_URL ?? 'http://localhost:3004'

    return {
      // beforeFiles: runs before Next.js checks its own pages/files,
      // so /_nuxt/ and /api/_content/ are always proxied to the right MFE.
      beforeFiles: [
        { source: '/_nuxt/:path*',         destination: `${BLOG}/_nuxt/:path*`         },
        { source: '/api/_content/:path*',  destination: `${BLOG}/api/_content/:path*`  },
      ],
      afterFiles: [
        { source: '/blog',         destination: `${BLOG}/blog/`         },
        { source: '/blog/:path*',  destination: `${BLOG}/blog/:path*`   },
        { source: '/lab',          destination: `${LAB}/lab/`           },
        { source: '/lab/:path*',   destination: `${LAB}/lab/:path*`     },
        { source: '/infra',        destination: `${INFRA}/infra/`       },
        { source: '/infra/:path*', destination: `${INFRA}/infra/:path*` },
      ],
      fallback: [],
    }
  },
}

export default nextConfig