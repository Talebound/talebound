import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: '4. Components/Button',
  component: Button,
  render: (args) => <Button {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Button component',
  args: {
    children: 'Button default setting',
  },
};
