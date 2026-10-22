import type { StorybookConfig } from '@storybook/nextjs';
import configureSvg from '../scripts/configure-svg.cjs';

const config: StorybookConfig = {
  stories: [
    '../@(components|components-radix-ui)/**/*.mdx',
    '../@(components|components-radix-ui)/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs', '@storybook/addon-links'],
  webpackFinal: configureSvg,
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};
export default config;
