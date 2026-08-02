import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kagedani.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: {
      // English lives at the root (/), Italian at /it/.
      // The default language is a positioning statement — see docs/redesign-plan.md.
      prefixDefaultLocale: false,
    },
  },
  build: {
    // Clean URLs: /work/ instead of /work.html
    format: 'directory',
  },
});
