require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    DIRECTUS_URL:process.env.DIRECTUS_URL,
  },
    images: {
        domains: ['localhost','128.140.67.194'],
      },
}

module.exports = nextConfig
