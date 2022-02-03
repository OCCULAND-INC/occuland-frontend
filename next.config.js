/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'api.decentraland.org'],
  },
  env: {
    MORALIS_API: process.env.MORALIS_API,
    MORALIS_BASE_URL: process.env.MORALIS_BASE_URL,
    MORALIS_LOCAL_APP_ID: process.env.MORALIS_LOCAL_APP_ID,
    MORALIS_LOCAL_SERVER_URL: process.env.MORALIS_LOCAL_SERVER_URL,
    MORALIS_TESTNET_APP_ID: process.env.MORALIS_TESTNET_APP_ID,
    MORALIS_TESTNET_SERVER_URL: process.env.MORALIS_TESTNET_SERVER_URL,
    RPC_URL_1: process.env.RPC_URL_1,
    RPC_URL_3: process.env.RPC_URL_3,
    RPC_URL_4: process.env.RPC_URL_4,
  },
};
