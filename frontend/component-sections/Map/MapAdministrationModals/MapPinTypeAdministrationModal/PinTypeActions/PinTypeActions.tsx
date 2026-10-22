import React from 'react';
import { Col, Row } from '../../../../../components/Flex/Flex';
import { TitleH2 } from '../../../../../components/Typography/Title';
import { Label } from '../../../../../components/Typography/Label';
import { Button } from '../../../../../components/Button/Button';
import { Text } from '../../../../../components/Typography/Text';

const layoutWidth = { width: 180, minWidth: 180 };

interface PinTypeActionsProps {
  pinTypeId: number;
}

const PinTypeActions: React.FC<PinTypeActionsProps> = () => {
  return (
    <Col gap="lg" fullWidth>
      <TitleH2>Actions</TitleH2>
      <Row gap="md" alignItems="start" fullWidth>
        <Row css={layoutWidth}>
          <Label>Change group</Label>
        </Row>
        <Row grow alignItems="center"></Row>
      </Row>

      <Row gap="md" alignItems="start" fullWidth>
        <Row css={layoutWidth}>
          <Label>Duplicate</Label>
        </Row>
        <Col gap="sm" fullWidth alignItems="start">
          <Text>Makes a copy of this Pin type to current group</Text>
          <Button color="primaryOutline">Duplicate</Button>
        </Col>
      </Row>

      <Row gap="md" alignItems="start" fullWidth>
        <Row css={layoutWidth}>
          <Label>Default</Label>
        </Row>
        <Col gap="sm" grow alignItems="start">
          <Text>
            After deletion of any pin type, its usages on a map are not deleted, but changed to
            default pin type.
          </Text>
          <Button color="primaryOutline">Set as default</Button>
        </Col>
      </Row>

      <Row gap="md" alignItems="start" fullWidth>
        <Row css={layoutWidth}>
          <Label>Delete</Label>
        </Row>
        <Col gap="sm" grow alignItems="start">
          <Text>All usages of this pin type on maps will be changed to default pin type.</Text>
          <Button color="dangerOutline">Delete</Button>
        </Col>
      </Row>
    </Col>
  );
};

export default PinTypeActions;
