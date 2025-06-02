import type { NextConfig } from 'next'

const EXPRESS_URL = process.env.EXPRESS_URL

if (!EXPRESS_URL) {
  throw new Error('EXPRESS_URL environment variable is not set.')
}

const nextConfig: NextConfig = {
  // reactStrictMode: false, // ⚠️ Only uncomment this for testing during development.
  // https://nextjs.org/docs/app/api-reference/next-config-js/logging
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    domains: [
      // 'upload.wikimedia.org',
      // 'images.pexels.com',
      // 'images.unsplash.com'
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${EXPRESS_URL}/api/:path*`
      }
    ]
  }
}

export default nextConfig
