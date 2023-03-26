/** @type {import('next').NextConfig} */

const repo = 'worksheet_creator'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: assetPrefix,
  basePath: basePath
}

module.exports = nextConfig
