import { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: '4. Components/Avatar',
  component: Avatar,
  render: (args) => <Avatar {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {
    url: 'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/c5fba38d-0447-4e06-b04e-96f59e4e2d00/100x100',
    fallbackText: 'test',
  },
};

export const StoryNoUrl: Story = {
  name: 'No url',
  args: {
    type: 'user',
    fallbackText: 'test',
  },
};
