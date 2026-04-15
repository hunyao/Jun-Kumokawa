import { lingui } from '@lingui/vite-plugin';
import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    // Remove Storybook's default react plugin and replace with one that includes
    // @lingui/babel-plugin-lingui-macro. Without this, @lingui/react/macro falls
    // back to babel-plugin-macros which uses `process` (Node.js only) and crashes
    // in the Playwright browser test environment.
    const REACT_PLUGIN_NAMES = [
      'vite:react-babel',
      'vite:react-refresh',
      'vite:react-jsx-runtime',
    ];
    // biome-ignore lint/suspicious/noExplicitAny: reason
    const nonReactPlugins = ((config.plugins ?? []) as any[]).filter(
      (p) => !REACT_PLUGIN_NAMES.includes(p?.name),
    );

    return mergeConfig(
      { ...config, plugins: nonReactPlugins },
      {
        plugins: [
          react({
            babel: {
              plugins: ['@lingui/babel-plugin-lingui-macro'],
            },
          }),
          tailwindcss(),
          lingui(),
        ],
        define: {
          'import.meta.vitest': 'undefined',
        },
      },
    );
  },
};
export default config;
