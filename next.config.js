/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-AU'],
    defaultLocale: 'en-AU',
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
}
