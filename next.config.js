// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({

  dest: 'public'

})



module.exports = withPWA({

  // next.js config

  register: true,

  skipWaiting: true,

  disable: process.env.NODE_ENV === "production",

})