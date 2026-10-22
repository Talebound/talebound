import { Meta, StoryObj } from '@storybook/react';
import AlertDialogDemo from './AlertDialogDemo';

const meta: Meta<typeof AlertDialogDemo> = {
  title: 'Radix UI demos/AlertDialog',
  component: AlertDialogDemo,
  render: () => <AlertDialogDemo />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {},
};
