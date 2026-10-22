import React from 'react';
import ActionBox from '../../../components/ActionBox/ActionBox';
import Link from 'next/link';
import { Button } from '../../../components/Button/Button';
import { Row } from '../../../components/Flex/Flex';
import { BsPlus } from 'react-icons/bs';

const ActionBoxCharacterEdit: React.FC = () => {
  return (
    <ActionBox identifier="action-box-character-edit">
      <Row gap="md">
        <Link href={'/characters/create'}>
          <Button size="xl" color="semiGhost">
            <BsPlus />
            Create character
          </Button>
        </Link>
      </Row>
    </ActionBox>
  );
};

export default ActionBoxCharacterEdit;
