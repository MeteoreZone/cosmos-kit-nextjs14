/** @type {import('next').NextConfig} */
const nextConfig = {
    // Temp fix for https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
    webpack: (config) => {
      config.externals.push("pino-pretty", "lokijs", "encoding");
      return config;
    },
  };
  
  module.exports = nextConfig;
  