import { Meta, StoryObj } from '@storybook/react';
import DropdownMenuDemo from './DropdownMenuDemo';

const meta: Meta<typeof DropdownMenuDemo> = {
  title: 'Radix UI demos/DropdownMenu',
  component: DropdownMenuDemo,
  render: () => <DropdownMenuDemo />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {},
};
