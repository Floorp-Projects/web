
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'blog.ablaze.one'
      }
    ]
  },
  env: {
    REVIEWED_TRANSLATIONS: process.env.REVIEWED_TRANSLATIONS,
    IN_REVIEW_TRANSLATIONS: process.env.IN_REVIEW_TRANSLATIONS,
    NOT_STARTED_TRANSLATIONS: process.env.NOT_STARTED_TRANSLATIONS,
    ENV: process.env.ENV,
  }
};

module.exports = nextConfig;
