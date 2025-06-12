import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  reactStrictMode: true,
};

export default createNextIntlPlugin('./src/i18n/config.ts')(nextConfig);
