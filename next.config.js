/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-AU'],
    defaultLocale: 'en-AU',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }
    return config;
  },
}
