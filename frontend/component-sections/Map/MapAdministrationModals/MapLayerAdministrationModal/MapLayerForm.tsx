import React, { useCallback, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useCreateMapLayer } from '../../../../api/maps/useCreateMapLayer';
import { PbImage } from '../../../../generated/api-types/data-contracts';
import { useMap } from '../../../../hooks/useMap';
import { useInput } from '../../../../hooks/useInput';
import ImageModal from '../../../../components/ImageModal/ImageModal';
import { Col, Row } from '../../../../components/Flex/Flex';
import Input from '../../../../components/Input/Input';
import MapLayerPlaceholder from '../../MapLayer/MapLayerPlaceholder';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import { Button } from '../../../../components/Button/Button';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import { Text } from '../../../../components/Typography/Text';

interface MapLayerFormProps {
  mapId?: number;
  onFinishCallback?: () => void;
}

const MapLayerForm: React.FC<MapLayerFormProps> = ({ mapId, onFinishCallback }) => {
  const {
    mutate: createMapLayer,
    isPending: isPendingCreate,
    error: errorCreate,
  } = useCreateMapLayer();
  const [showImageModal, setShowImageModal] = useState(false);
  const [layerImage, setLayerImage] = useState<PbImage>();
  const { map: mapData, isFetching: isPendingMap } = useMap(mapId);

  const [isEnabled, setIsEnabled] = useState<CheckedState | undefined>(true);

  const { value: name, onChange: onChangeName, setValue: setName } = useInput<string>('');

  const toggleImageModal = useCallback(() => {
    setShowImageModal((p) => !p);
  }, []);

  const onSuccess = useCallback(() => {
    setLayerImage(undefined);
    setIsEnabled(true);
    setName('');

    if (onFinishCallback) {
      onFinishCallback();
    }
  }, [onFinishCallback, setName]);

  const submitMapHandler = useCallback(() => {
    if (!mapId || !layerImage) return;
    createMapLayer(
      {
        mapId,
        body: {
          name,
          imageId: layerImage.id,
          enabled: isEnabled === 'indeterminate' ? false : isEnabled,
        },
      },
      { onSuccess },
    );
  }, [mapId, layerImage, createMapLayer, name, isEnabled, onSuccess]);

  const loading = isPendingMap || isPendingCreate;
  const correctDimensions =
    !layerImage || (layerImage?.width === mapData?.width && layerImage?.height === mapData?.height);
  const dimensionText = `must be ${mapData?.width} x ${mapData?.height}`;

  return (
    <>
      <Row fullWidth gap="md" alignItems="start">
        <Col fullWidth gap="md">
          <Input
            id="title"
            label="Layer name"
            onChange={onChangeName}
            value={name}
            required
            fullWidth
          />
          <MapLayerPlaceholder
            image={layerImage}
            onClick={toggleImageModal}
            titleSelected="change"
            titleNotSelected="+ map layer image"
            moreInfo={dimensionText}
            error={!correctDimensions}
          />
          {!correctDimensions && (
            <>
              <ErrorText error={`Dimensions ${dimensionText}`} />
              <Text>
                Current dimensions: {layerImage?.width} x {layerImage?.height}
              </Text>
            </>
          )}
          {!isPendingMap && (
            <Checkbox id="is-enabled" checked={isEnabled} onCheckedChange={setIsEnabled}>
              Is enabled{' '}
              <Text size="sm" i>
                (will be visible to basic users)
              </Text>
            </Checkbox>
          )}
          <Text>
            Layer will be automatically created on the top of the map. You can change order of
            layers on the right.
          </Text>
          <Button
            disabled={!correctDimensions || loading}
            onClick={submitMapHandler}
            loading={loading}
          >
            Create
          </Button>
          <ErrorText error={errorCreate} />
        </Col>
      </Row>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={setLayerImage}
        uploadedFilename={`map-${mapId}-layer`}
        uploadedImageTypeId={100}
        isNullable={true}
      />
    </>
  );
};

export default MapLayerForm;
