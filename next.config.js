/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  modularizeImports: {
    'heroicons/react/24/solid': {
      transform: 'heroicons/react/24/solid/{{member}}'
    }
  }
}

module.exports = nextConfig
