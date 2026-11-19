import React, { useCallback, useEffect, useState } from 'react';
import { PbViewMapLayer } from '../../../../generated/api-types/data-contracts';
import { Row } from '../../../../components/Flex/Flex';
import { Reorder, useDragControls } from 'framer-motion';
import { useUpdateMapLayer } from '../../../../api/maps/useUpdateMapLayer';
import { DragHandle } from '../../../../screens/menus/MenuAdministration/menuAdministrationComponents';
import { MdDragIndicator } from 'react-icons/md';
import MapLayerSectionContent from './MapLayerSectionContent';

interface MapLayerSectionDraggableProps {
  mapLayer: PbViewMapLayer;
  newPosition: number;
  disabled?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<unknown>;
}

const MapLayerSectionDraggable: React.FC<MapLayerSectionDraggableProps> = ({
  mapLayer,
  newPosition,
  disabled,
  setLoading,
  setError,
}) => {
  const controls = useDragControls();
  const [dragging, setDragging] = useState(false);

  const onSettled = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  const {
    mutate: updateMapLayer,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateMapLayer({
    onSettled,
  });

  useEffect(() => {
    if (errorUpdate) {
      setError(errorUpdate);
    }
  }, [errorUpdate, setError]);

  useEffect(() => {
    if (isPendingUpdate) {
      setLoading(true);
    }
  }, [setLoading, isPendingUpdate]);

  const onDragStart = useCallback(() => {
    setError(undefined);
    setDragging(true);
  }, [setError]);

  const onDragEnd = useCallback(() => {
    setDragging(false);
    if (mapLayer.mapId && mapLayer.id && newPosition !== mapLayer.position) {
      updateMapLayer({
        mapId: mapLayer.mapId,
        mapLayerId: mapLayer.id,
        body: {
          position: newPosition,
        },
      });
    }
  }, [mapLayer.mapId, mapLayer.id, mapLayer.position, updateMapLayer, newPosition]);

  return (
    <Reorder.Item
      as="div"
      value={mapLayer}
      dragListener={false}
      dragControls={controls}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Row gap="sm" fullWidth>
        <DragHandle
          dragging={dragging}
          onPointerDown={!disabled ? (e) => controls.start(e) : undefined}
        >
          <MdDragIndicator size={20} />
        </DragHandle>
        <MapLayerSectionContent mapLayer={mapLayer} />
      </Row>
    </Reorder.Item>
  );
};

export default MapLayerSectionDraggable;
