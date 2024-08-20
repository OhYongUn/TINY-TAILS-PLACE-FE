import dotenv from 'dotenv';

const environment = process.env.NODE_ENV;

if (environment === 'development') {
  dotenv.config({ path: '.env.dev' });
} else if (environment === 'production') {
  dotenv.config({ path: '.env.prod' });
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
