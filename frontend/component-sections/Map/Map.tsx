import React, { useCallback, useState } from 'react';
import ContentSection from '../../components/ContentSection/ContentSection';
import { useImage } from '../../hooks/useImage';
import { useMap } from '../../hooks/useMap';
import { Col, Row } from '../../components/Flex/Flex';
import { TitleH2 } from '../../components/Typography/Title';
import { Button } from '../../components/Button/Button';
import { TbPencil } from 'react-icons/tb';
import MapForm from './MapForm';
import LoadingText from '../../components/Loading/LoadingText';
import MapLayout from './MapLayout/MapLayout';
import MapPinTypeAdministrationModal from './MapAdministrationModals/MapPinTypeAdministrationModal/MapPinTypeAdministrationModal';

interface MapProps {
  mapId: number;
  canEdit: boolean;
  showTitle?: boolean;
  isModal?: boolean;
}

const Map: React.FC<MapProps> = ({ mapId, canEdit, showTitle = true, isModal = false }) => {
  const { map: mapData, isFetching: isPendingMap } = useMap(mapId);
  const [editModeDetails, setEditModeDetails] = useState(false);
  const { image: imageThumbnail } = useImage(mapData?.thumbnailImageId ?? 0);
  const [modalOpenPinTypes, setModalOpenPinTypes] = useState(true);

  const toggleEditModeDetails = useCallback(() => {
    setEditModeDetails((p) => !p);
  }, []);

  if (isPendingMap) return <LoadingText />;

  return (
    <ContentSection
      flexWrap="wrap"
      direction="column"
      cornerImage={imageThumbnail?.url}
      noMargin={isModal}
    >
      <Col fullWidth gap="md">
        {(showTitle || canEdit) && (
          <>
            <Row gap="md" fullWidth justifyContent="between" wrap>
              {showTitle && <TitleH2>{mapData?.title}</TitleH2>}
              {!showTitle && canEdit && <span />}
              {canEdit && (
                <Row gap="md" paddingRight={isModal ? '2xl' : undefined}>
                  <Button
                    color={editModeDetails ? 'primaryFill' : 'semiGhost'}
                    onClick={toggleEditModeDetails}
                  >
                    <TbPencil />
                    Edit details
                  </Button>
                </Row>
              )}
            </Row>
            {editModeDetails && (
              <ContentSection flexWrap="wrap" direction="column">
                <MapForm key={`map-edit-mode-${mapId}`} mapId={mapId} />
              </ContentSection>
            )}
          </>
        )}
      </Col>
      <MapLayout mapId={mapId} canEdit={canEdit} />
      <MapPinTypeAdministrationModal
        mapId={mapId}
        open={modalOpenPinTypes}
        setOpen={setModalOpenPinTypes}
      />
    </ContentSection>
  );
};

export default Map;
