import { defineConfig } from '@lingui/cli';

export default defineConfig({
  sourceLocale: 'en',
  locales: ['ja', 'en'],
  catalogs: [
    {
      path: 'src/components/common/{name}/locales/{locale}',
      include: ['src/components/common/{name}'],
      exclude: ['src/components/common/index.ts'],
    },
    {
      path: 'src/components/features/{name}/locales/{locale}',
      include: ['src/components/features/{name}'],
      exclude: ['src/components/features/index.ts'],
    },
  ],
  catalogsMergePath: 'src/locales/{locale}',
});
