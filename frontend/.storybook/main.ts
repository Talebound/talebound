import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../@(components|components-radix-ui)/**/*.mdx',
    '../@(components|components-radix-ui)/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs', '@storybook/addon-links'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};
export default config;
