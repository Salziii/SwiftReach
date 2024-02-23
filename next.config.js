/** @type {import('next').NextConfig} */
const nextConfig = {
 experimental: {
  serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
 },
 images: {
  remotePatterns: [{
   protocol: 'https',
   hostname: '**.pravatar.cc',
   port: '',
 },]
 }
}

module.exports = nextConfig
