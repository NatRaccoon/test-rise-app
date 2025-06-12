import createI18nMiddleware  from 'next-intl/middleware';

export default createI18nMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'never' // ✅ So there's no `/en` in URL
});
