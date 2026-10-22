const withSvgr = require('next-svgr');

// The worktree launcher serves the API and frontend on the same isolated host.
const apiHost = process.env.NEXT_PUBLIC_API_URL
  ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname
  : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  reactStrictMode: true,
  allowedDevOrigins: apiHost?.startsWith('127.') ? [apiHost] : [],
});

module.exports = nextConfig;
