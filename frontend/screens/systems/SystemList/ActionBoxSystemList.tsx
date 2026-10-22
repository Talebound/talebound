import React from 'react';
import ActionBox from '../../../components/ActionBox/ActionBox';
import Link from 'next/link';
import { Button } from '../../../components/Button/Button';
import { Row } from '../../../components/Flex/Flex';
import { BsPlus } from 'react-icons/bs';

const ActionBoxSystemEdit: React.FC = () => {
  return (
    <ActionBox identifier="action-box-system-edit">
      <Row gap="md">
        <Link href={'/systems/create'}>
          <Button size="xl" color="semiGhost">
            <BsPlus />
            Create system
          </Button>
        </Link>
      </Row>
    </ActionBox>
  );
};

export default ActionBoxSystemEdit;
