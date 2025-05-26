import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts', ); // ✅ relative to root

export default withNextIntl({
  // Any other Next.js config here
});
