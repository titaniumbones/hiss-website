const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    outputFileTracingRoot: path.join(__dirname),
  },
};

module.exports = nextConfig;
