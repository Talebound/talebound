import React from 'react';
import { Col, Row } from '../../../../components/Flex/Flex';
import { Label } from '../../../../components/Typography/Label';
import { RxShadowNone, RxShadowOuter } from 'react-icons/rx';
import { BoxButton } from '../../../../components/BoxButton/BoxButton';
import { PbEntityGroupStyle } from '../../../../generated/api-types/data-contracts';

interface GroupStyleSelectorProps {
  value: PbEntityGroupStyle;
  onValueChange: React.Dispatch<React.SetStateAction<PbEntityGroupStyle>>;
}

const GroupStyleSelector: React.FC<GroupStyleSelectorProps> = ({ value, onValueChange }) => {
  return (
    <Col gap="xs">
      <Label fullWidth>Display shadow</Label>
      <Row gap="xs">
        <BoxButton
          active={value === PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED}
          onClick={() => onValueChange(PbEntityGroupStyle.ENTITY_GROUP_STYLE_FRAMED)}
        >
          <RxShadowOuter size={36} />
        </BoxButton>
        <BoxButton
          active={value === PbEntityGroupStyle.ENTITY_GROUP_STYLE_NOT_FRAMED}
          onClick={() => onValueChange(PbEntityGroupStyle.ENTITY_GROUP_STYLE_NOT_FRAMED)}
        >
          <RxShadowNone size={36} />
        </BoxButton>
      </Row>
    </Col>
  );
};

export default GroupStyleSelector;
