import { Meta, StoryObj } from '@storybook/react';
import Rating from './Rating';

const meta: Meta<typeof Rating> = {
  title: '4. Components/Rating',
  component: Rating,
  render: (args) => <Rating {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {
    defaultValue: 3,
    disabled: false,
  },
};

export const StoryDisabled: Story = {
  name: 'Disabled',
  args: {
    defaultValue: 3,
    disabled: true,
  },
};
