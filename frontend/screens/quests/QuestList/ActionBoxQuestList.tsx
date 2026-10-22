import React from 'react';
import ActionBox from '../../../components/ActionBox/ActionBox';
import Link from 'next/link';
import { Button } from '../../../components/Button/Button';
import { Row } from '../../../components/Flex/Flex';
import { BsPlus } from 'react-icons/bs';

const ActionBoxQuestEdit: React.FC = () => {
  return (
    <ActionBox identifier="action-box-quest-edit">
      <Row gap="md">
        <Link href={'/quests/create'}>
          <Button size="xl" color="semiGhost">
            <BsPlus />
            Create quest
          </Button>
        </Link>
      </Row>
    </ActionBox>
  );
};

export default ActionBoxQuestEdit;
