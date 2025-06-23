/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Optimize for performance benchmarking
  experimental: {
    // Enable faster builds and runtime optimizations
  },
  // Custom server configuration for benchmarking
  serverRuntimeConfig: {
    // Runtime variables accessible only on the server side
  },
  publicRuntimeConfig: {
    // Runtime variables accessible on both server and client side
  }
}

module.exports = nextConfig