import React, { useCallback, useEffect } from 'react';
import { PbViewMapLayer } from '../../../../generated/api-types/data-contracts';
import { Row } from '../../../../components/Flex/Flex';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import Input from '../../../../components/Input/Input';
import { useInput } from '../../../../hooks/useInput';
import { UpdateMenuItemParams } from '../../../../api/menus/useUpdateMenuItem';
import debounce from 'lodash.debounce';
import { UpdateMapRequest, useUpdateMapLayer } from '../../../../api/maps/useUpdateMapLayer';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import MapLayerImage from './MapLayerImage';

interface MapLayerSectionContentProps {
  mapLayer: PbViewMapLayer;
}

const MapLayerSectionContent: React.FC<MapLayerSectionContentProps> = ({ mapLayer }) => {
  const {
    value: titleValue,
    onChange: onChangeTitle,
    setValue: setTitleValue,
  } = useInput(mapLayer.name ?? '');

  const {
    mutate: updateMapLayer,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useUpdateMapLayer();

  const sendPayload = useCallback(
    (payload: UpdateMapRequest['body']) => {
      if (mapLayer.mapId && mapLayer.id) {
        updateMapLayer({
          mapId: mapLayer.mapId,
          mapLayerId: mapLayer.id,
          body: payload,
        });
      }
    },
    [mapLayer.mapId, mapLayer.id, updateMapLayer],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeHandlerDebounced = useCallback(
    debounce((payload: UpdateMenuItemParams['body']) => {
      sendPayload(payload);
    }, 1000),
    [mapLayer.mapId, mapLayer.id],
  );

  useEffect(() => {
    if (titleValue !== mapLayer.name) {
      onChangeHandlerDebounced({ name: titleValue });
    }
  }, [mapLayer.name, titleValue, onChangeHandlerDebounced]);

  useEffect(() => {
    setTitleValue(mapLayer.name ?? '');
  }, [isErrorUpdate, mapLayer.name, setTitleValue]);

  return (
    <ContentSection key={mapLayer.id} fullWidth loading={isPendingUpdate}>
      <Row gap="sm">
        <MapLayerImage mapLayer={mapLayer} />
        <Input
          id={`map-layer-title-${mapLayer.id}`}
          value={titleValue}
          onChange={onChangeTitle}
          aria-labelledby="Map layer name"
          placeholder="Layer title"
          required
          displayHelpers={false}
        />
        <Checkbox
          id={`map-layer-enabled-${mapLayer.id}`}
          checked={mapLayer.enabled}
          childrenRender="after"
          onCheckedChange={(x) => sendPayload({ enabled: !!x })}
          disabled={mapLayer.position === 1}
        >
          Enabled
        </Checkbox>
        <ErrorText error={errorUpdate} />
      </Row>
    </ContentSection>
  );
};

export default MapLayerSectionContent;
