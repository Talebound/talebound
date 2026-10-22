import { Meta, StoryObj } from '@storybook/react';
import CheckboxDemo from './CheckboxDemo';

const meta: Meta<typeof CheckboxDemo> = {
  title: 'Radix UI demos/Checkbox',
  component: CheckboxDemo,
  render: () => <CheckboxDemo />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {},
};
