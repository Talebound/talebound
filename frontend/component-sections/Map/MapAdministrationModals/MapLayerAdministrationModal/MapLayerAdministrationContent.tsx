import React from 'react';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import MapLayerForm from './MapLayerForm';
import { Row } from '../../../../components/Flex/Flex';
import MapLayerReorder from './MapLayerReorder';
import MapLayout from '../../MapLayout/MapLayout';
import { styled } from '../../../../styles/stitches.config';

const ContentWrapper = styled('div', {
  width: 'calc(33% - $md/2)', //amazing computation, just saying
  minWidth: '400px',
});

interface MapLayerAdministrationContentProps {
  mapId: number;
}

const MapLayerAdministrationContent: React.FC<MapLayerAdministrationContentProps> = ({ mapId }) => {
  return (
    <Row alignItems="start" gap="md" wrap>
      <ContentWrapper>
        <ContentSection header="New layer" fullWidth>
          <MapLayerForm mapId={mapId} />
        </ContentSection>
      </ContentWrapper>
      <ContentWrapper>
        <ContentSection header="Layers" fullWidth>
          <MapLayerReorder mapId={mapId} />
        </ContentSection>
      </ContentWrapper>
      <ContentWrapper>
        <ContentSection header="Preview" fullWidth>
          <MapLayout mapId={mapId} canEdit={false} allLayersByDefault={true} />
        </ContentSection>
      </ContentWrapper>
    </Row>
  );
};

export default MapLayerAdministrationContent;
