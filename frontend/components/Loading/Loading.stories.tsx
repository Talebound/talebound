import { Meta, StoryObj } from '@storybook/react';
import Loading from './Loading';

const meta: Meta<typeof Loading> = {
  title: '4. Components/Loading',
  component: Loading,
  render: (args) => <Loading {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {},
};
