import React, { useCallback, useState } from 'react';
import { PbImage, PbViewMapLayer } from '../../../../generated/api-types/data-contracts';
import { useImage } from '../../../../hooks/useImage';
import MapLayerPlaceholder from '../../MapLayer/MapLayerPlaceholder';
import ImageModal from '../../../../components/ImageModal/ImageModal';
import { useMap } from '../../../../hooks/useMap';
import { useUpdateMapLayer } from '../../../../api/maps/useUpdateMapLayer';
import { Col } from '../../../../components/Flex/Flex';
import ErrorText from '../../../../components/ErrorText/ErrorText';

interface MapLayerImageProps {
  mapLayer: PbViewMapLayer;
  showDimensionText?: boolean;
}

const MapLayerImage: React.FC<MapLayerImageProps> = ({ mapLayer, showDimensionText = false }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const mapLayerImage = useImage(mapLayer.imageId);
  const { map: mapData, isFetching: isPendingMap } = useMap(mapLayer.mapId);

  const {
    mutate: updateMapLayer,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateMapLayer();

  const updateMapLayerImage = useCallback(
    (image: PbImage | undefined) => {
      if (image && mapLayer.mapId && mapLayer.id) {
        updateMapLayer({
          mapId: mapLayer.mapId,
          mapLayerId: mapLayer.id,
          body: {
            imageId: image.id,
          },
        });
      }
    },
    [mapLayer.id, mapLayer.mapId, updateMapLayer],
  );

  const toggleImageModal = useCallback(() => setShowImageModal((p) => !p), []);

  const correctDimensions =
    !mapLayerImage.image ||
    (mapLayerImage.image?.width === mapData?.width &&
      mapLayerImage.image?.height === mapData?.height);
  const dimensionText = `must be ${mapData?.width} x ${mapData?.height}`;

  return (
    <>
      <Col loading={isPendingMap ?? isPendingUpdate}>
        <MapLayerPlaceholder
          image={mapLayerImage.image}
          onClick={toggleImageModal}
          titleSelected="change"
          titleNotSelected="+ map layer image"
          moreInfo={showDimensionText ? dimensionText : undefined}
          error={!correctDimensions}
          size="xs"
        />
        <ErrorText error={errorUpdate} />
      </Col>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={updateMapLayerImage}
        uploadedFilename={`map-${mapLayer.mapId}-layer-${mapLayer.id}`}
        uploadedImageTypeId={100}
        isNullable={false}
      />
    </>
  );
};

export default MapLayerImage;
