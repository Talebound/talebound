import React from 'react';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import { Row } from '../../../../components/Flex/Flex';
import { styled } from '../../../../styles/stitches.config';

const ContentWrapper = styled('div', {
  width: 'calc(33% - $md/2)', //amazing computation, just saying
  minWidth: '400px',
});

interface MapPinAdministrationContentProps {
  mapId: number;
}

const MapPinAdministrationContent: React.FC<MapPinAdministrationContentProps> = ({ mapId }) => {
  return (
    <Row alignItems="start" gap="md" wrap>
      <ContentWrapper>
        <ContentSection header="Pin groups" fullWidth></ContentSection>
      </ContentWrapper>
    </Row>
  );
};

export default MapPinAdministrationContent;
