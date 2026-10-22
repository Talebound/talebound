import React, { useState } from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import { TitleH4 } from '../../../components/Typography/Title';
import { VscLocation } from 'react-icons/vsc';
import { useGetMapPins } from '../../../api/maps/useGetMapPins';
import Loading from '../../../components/Loading/Loading';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/Button/Button';
import { MapSidebarSection } from '../MapLayout/MapLayoutComponents';
import { DisplayedLayers } from '../mapUtils';
import MapPinAdministrationModal from '../MapAdministrationModals/MapPinAdministrationModal/MapPinAdministrationModal';

interface MapSidebarPinsProps {
  mapId: number;
  canEdit: boolean;
  displayedLayers: DisplayedLayers;
}

const MapSidebarPins: React.FC<MapSidebarPinsProps> = ({ mapId, displayedLayers, canEdit }) => {
  const { data: mapPins, isFetching: isPendingMapPins } = useGetMapPins({ variables: mapId });
  const [modalOpenPins, setModalOpenPins] = useState(false);

  const hasPins = (mapPins ?? []).length > 0;

  if (isPendingMapPins) return <Loading />;
  if (!hasPins && !canEdit) return null;

  return (
    <>
      <Row gap="sm" justifyContent="between">
        <Row gap="sm">
          <VscLocation />
          <TitleH4> Points</TitleH4>
        </Row>
        {canEdit && (
          <Button size="sm" color="primaryOutline" onClick={() => setModalOpenPins(true)}>
            Change points
          </Button>
        )}
      </Row>
      <MapSidebarSection gap="sm">
        {!hasPins && (
          <Col fullWidth alignItems="center" gap="sm">
            <Text>No points yet</Text>
            <Button size="sm" onClick={() => setModalOpenPins(true)}>
              Create
            </Button>
          </Col>
        )}
      </MapSidebarSection>
      {canEdit && (
        <MapPinAdministrationModal open={modalOpenPins} setOpen={setModalOpenPins} mapId={mapId} />
      )}
    </>
  );
};

export default MapSidebarPins;
