import { Meta, StoryObj } from '@storybook/react';
import SelectDemo from './SelectDemo';

const meta: Meta<typeof SelectDemo> = {
  title: 'Radix UI demos/Select',
  component: SelectDemo,
  render: () => <SelectDemo />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {},
};
