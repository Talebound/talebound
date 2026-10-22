import { Meta, StoryObj } from '@storybook/react';
import ColorHelper from './ColorHelper';
import {
  baseColors,
  primaryColors,
  secondaryColors,
  statusColors,
  tertiaryColors,
  transparentColors,
  whiteColors,
} from './colorHelperLib';

const meta: Meta<typeof ColorHelper> = {
  title: '1. Colors/Colors',
  component: ColorHelper,
  render: (args) => <ColorHelper {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryBaseColors: Story = {
  name: 'Color - Base',
  args: {
    colors: baseColors,
  },
};

export const StoryPrimaryColors: Story = {
  name: 'Color - Primary',
  args: {
    colors: primaryColors,
  },
};

export const StorySecondaryColors: Story = {
  name: 'Color - Secondary',
  args: {
    colors: secondaryColors,
  },
};

export const StoryTertiaryColors: Story = {
  name: 'Color - Tertiary',
  args: {
    colors: tertiaryColors,
  },
};

export const StoryWhiteColors: Story = {
  name: 'Shades of white',
  args: {
    bg: 'dark',
    colors: whiteColors,
  },
};

export const StoryTransparentColors: Story = {
  name: 'Shades of transparent',
  args: {
    bg: 'image',
    colors: transparentColors,
  },
};

export const StoryStatusColors: Story = {
  name: 'Status colors',
  args: {
    colors: statusColors,
  },
};
