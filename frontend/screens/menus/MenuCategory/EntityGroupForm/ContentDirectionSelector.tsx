import React from 'react';
import { Flex, Row } from '../../../../components/Flex/Flex';
import { Label } from '../../../../components/Typography/Label';
import { BoxButton } from '../../../../components/BoxButton/BoxButton';
import { PbEntityGroupDirection } from '../../../../generated/api-types/data-contracts';
import { TfiLayoutColumn3, TfiViewList } from 'react-icons/tfi';

interface ContentDirectionSelectorProps {
  value: PbEntityGroupDirection;
  onValueChange: React.Dispatch<React.SetStateAction<PbEntityGroupDirection>>;
}

const ContentDirectionSelector: React.FC<ContentDirectionSelectorProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <Flex gap="xs" fullWidth direction="column">
      <Label fullWidth>Content direction</Label>
      <Row gap="xs">
        <BoxButton
          active={value === PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL}
          onClick={() => onValueChange(PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_VERTICAL)}
        >
          <TfiViewList size={36} />
        </BoxButton>
        <BoxButton
          active={value === PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_HORIZONTAL}
          onClick={() => onValueChange(PbEntityGroupDirection.ENTITY_GROUP_DIRECTION_HORIZONTAL)}
        >
          <TfiLayoutColumn3 size={36} />
        </BoxButton>
      </Row>
    </Flex>
  );
};

export default ContentDirectionSelector;
