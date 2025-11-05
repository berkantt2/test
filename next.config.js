/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    // Next.js Image component için remotePatterns kullan
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/api/files/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/api/files/**',
      },
    ],
    // Unoptimized: false - Next.js resim optimizasyonu aktif
    // Eğer sorun çıkarsa true yapabilirsiniz
    unoptimized: false,
  },
}

module.exports = nextConfig

