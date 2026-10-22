import React from 'react';
import { Flex } from '../../components/Flex/Flex';
import { CheckboxRoot } from './CheckboxRoot';
import { CheckboxIndicator } from './CheckboxIndicator';
import { MdCheck } from 'react-icons/md';

const CheckboxDemo: React.FC = () => {
  return (
    <Flex gap="lg">
      <CheckboxRoot defaultChecked id="c1">
        <CheckboxIndicator>
          <MdCheck />
        </CheckboxIndicator>
      </CheckboxRoot>
    </Flex>
  );
};

export default CheckboxDemo;
