const withExportImages = require('next-export-optimize-images');
const { i18n } = require('./next-i18next.config');

const nextConfig = withExportImages({
  reactStrictMode: true,
  swcMinify: true,
  i18n,
});

module.exports = nextConfig;
