import React, { useCallback, useMemo, useState } from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import { BiLayer } from 'react-icons/bi';
import { TitleH4 } from '../../../components/Typography/Title';
import Checkbox from '../../../components/Checkbox/Checkbox';
import { useGetMapLayers } from '../../../api/maps/useGetMapLayers';
import { CheckedState } from '@radix-ui/react-checkbox';
import Loading from '../../../components/Loading/Loading';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/Button/Button';
import { MapSidebarSection } from '../MapLayout/MapLayoutComponents';
import { DisplayedLayers } from '../mapUtils';
import MapLayerAdministrationModal from '../MapAdministrationModals/MapLayerAdministrationModal/MapLayerAdministrationModal';
import { sortByPositionDesc } from '../../../utils/functions/sortByPosition';

interface MapSidebarLayersProps {
  mapId: number;
  canEdit: boolean;
  displayedLayers: DisplayedLayers;
  setDisplayedLayers: React.Dispatch<React.SetStateAction<DisplayedLayers>>;
}

const MapSidebarLayers: React.FC<MapSidebarLayersProps> = ({
  mapId,
  canEdit,
  displayedLayers,
  setDisplayedLayers,
}) => {
  const { data: mapLayers, isFetching: isPendingMapLayers } = useGetMapLayers({ variables: mapId });
  const hasLayers = (mapLayers ?? []).length > 1; //main layer doesn't count
  const [modalOpenLayers, setModalOpenLayers] = useState(false);

  const handleChecked = useCallback(
    (checkState: CheckedState) => (id: number) => {
      setDisplayedLayers((p) => ({
        ...p,
        [id]: !!checkState,
      }));
    },
    [setDisplayedLayers],
  );

  const deSortedLayers = useMemo(() => (mapLayers ?? []).sort(sortByPositionDesc), [mapLayers]);

  if (isPendingMapLayers) return <Loading />;
  if (!hasLayers && !canEdit) return null;

  return (
    <>
      <Row gap="sm" justifyContent="between">
        <Row gap="sm">
          <BiLayer />
          <TitleH4> Layers</TitleH4>
        </Row>
        {canEdit && (
          <Button size="sm" color="primaryOutline" onClick={() => setModalOpenLayers(true)}>
            Change layers
          </Button>
        )}
      </Row>
      <MapSidebarSection gap="sm">
        {!hasLayers && (
          <Col fullWidth alignItems="center" gap="sm">
            <Text>No layers yet</Text>
            <Button size="sm" onClick={() => setModalOpenLayers(true)}>
              Create
            </Button>
          </Col>
        )}
        {hasLayers &&
          deSortedLayers.map((ml) => {
            const layerId = ml.id!;
            if (ml.position === 1) return null;

            return (
              <Row gap="sm" key={ml.id}>
                <Checkbox
                  disabled={ml.position === 1}
                  checked={displayedLayers[layerId]}
                  onCheckedChange={(ch) => handleChecked(ch)(layerId)}
                >
                  {ml.name}
                </Checkbox>
              </Row>
            );
          })}
      </MapSidebarSection>
      {canEdit && (
        <MapLayerAdministrationModal
          open={modalOpenLayers}
          setOpen={setModalOpenLayers}
          mapId={mapId}
        />
      )}
    </>
  );
};

export default MapSidebarLayers;
