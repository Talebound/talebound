import { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: '2. Typography/Text',
  component: Text,
  render: (args) => <Text {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {
    children:
      '\n' +
      '    Donec euismod, nisl eget ultricies aliquam, nunc, nec\n' +
      '    aliquet nunc nisl eget ultricies aliquam, nunc, nec aliquet nunc, nec aliquet nunc nisl eget ultricies aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};
