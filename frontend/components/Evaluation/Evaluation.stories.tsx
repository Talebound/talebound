import { Meta, StoryObj } from '@storybook/react';
import Evaluation from './Evaluation';
import { PbAverageEvaluationVote } from '../../generated/api-types/data-contracts';

const meta: Meta<typeof Evaluation> = {
  title: '4. Components/Evaluation',
  component: Evaluation,
  render: (args) => <Evaluation {...args} />,
};

const mockData: PbAverageEvaluationVote = {
  evaluationId: 1,
  userId: 1,
  name: 'Role playing experience',
  description:
    "ability to stay in character, make decisions based on your character's personality and backstory, and contribute to the immersive experience of the game",
  type: 'self',
  average: 3.5,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryDefault: Story = {
  name: 'Default',
  args: {
    data: mockData,
    compact: false,
    disabled: false,
  },
};

export const StoryCompact: Story = {
  name: 'Compact',
  args: {
    data: mockData,
    compact: true,
    disabled: false,
  },
};
