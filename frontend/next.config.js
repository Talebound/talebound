const configureSvg = require('./scripts/configure-svg.cjs');

// The worktree launcher serves the API and frontend on the same isolated host.
const apiHost = process.env.NEXT_PUBLIC_API_URL
  ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname
  : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: apiHost?.startsWith('127.') ? [apiHost] : [],
  webpack: configureSvg,
};

module.exports = nextConfig;
