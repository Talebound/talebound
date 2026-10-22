import React from 'react';
import { Text } from '../Typography/Text';

const QuestCanJoinButton = ({ canJoin }: { canJoin: boolean }) => (
  <Text size="sm">{canJoin ? 'Accepting applications' : 'Recruitment closed'}</Text>
);
export default QuestCanJoinButton;
