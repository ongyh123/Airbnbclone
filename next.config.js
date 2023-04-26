/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  image:{
    domains:[
      "avatars.githubusercontent.com",
    ]
  }

}

module.exports = nextConfig
