import { Meta, StoryObj } from '@storybook/react';
import ModalDemo from './ModalDemo';

const meta: Meta<typeof ModalDemo> = {
  title: 'Radix UI demos/Modal',
  component: ModalDemo,
  render: () => <ModalDemo />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {},
};
