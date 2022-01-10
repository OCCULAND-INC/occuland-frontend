/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  env: {
    RPC_URL_1: process.env.RPC_URL_1,
    RPC_URL_3: process.env.RPC_URL_3,
    RPC_URL_4: process.env.RPC_URL_4,
  },
};
