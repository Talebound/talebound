import React from 'react';
import ActionBox from '../../../components/ActionBox/ActionBox';
import Link from 'next/link';
import { Button } from '../../../components/Button/Button';
import { Row } from '../../../components/Flex/Flex';
import { BsPlus } from 'react-icons/bs';

const ActionBoxWorldEdit: React.FC = () => {
  return (
    <ActionBox identifier="action-box-world-edit">
      <Row gap="md">
        <Link href={'/worlds/create'}>
          <Button size="xl" color="semiGhost">
            <BsPlus />
            Create world
          </Button>
        </Link>
      </Row>
    </ActionBox>
  );
};

export default ActionBoxWorldEdit;
