import { Meta, StoryObj } from '@storybook/nextjs';
import AvatarDemo from './AvatarDemo';

const meta: Meta<typeof AvatarDemo> = {
  title: 'Radix UI demos/Avatar',
  component: AvatarDemo,
  render: () => <AvatarDemo />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {},
};
