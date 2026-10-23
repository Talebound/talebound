import React from 'react';
import { ButtonVariants } from '../Button/Button';
import { PbQuestStatus } from '../../generated/api-types/data-contracts';
import { Text } from '../Typography/Text';

const questStatusMap: Record<
  PbQuestStatus,
  {
    title: string;
    buttonColor?: ButtonVariants['color'];
  }
> = {
  [PbQuestStatus.UNKNOWN]: {
    title: 'Unknown',
    buttonColor: 'dangerOutline',
  },
  [PbQuestStatus.NOT_STARTED]: {
    title: 'Not started',
    buttonColor: 'primaryOutline',
  },
  [PbQuestStatus.IN_PROGRESS]: {
    title: 'In progress',
    buttonColor: 'primaryOutline',
  },
  [PbQuestStatus.FINISHED_COMPLETED]: {
    title: 'Finished',
    buttonColor: 'primaryFill',
  },
  [PbQuestStatus.FINISHED_NOT_COMPLETED]: {
    title: 'Abandoned',
    buttonColor: 'semiGhost',
  },
};

type QuestStatusButtonProps = {
  questStatus: PbQuestStatus;
};

const QuestStatusButton = ({ questStatus }: QuestStatusButtonProps) => {
  const { title } = questStatusMap[questStatus] ?? questStatusMap[PbQuestStatus.UNKNOWN];

  return <Text size="sm">Status: {title}</Text>;
};

export default QuestStatusButton;
