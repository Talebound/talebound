import React, { useCallback, useEffect, useState } from 'react';
import { useGetMapLayers } from '../../../../api/maps/useGetMapLayers';
import { styled } from '../../../../styles/stitches.config';
import { Reorder } from 'framer-motion';
import { PbViewMapLayer } from '../../../../generated/api-types/data-contracts';
import MapLayerSectionDraggable from './MapLayerSectionDraggable';
import MapLayerSectionContent from './MapLayerSectionContent';
import ErrorText from '../../../../components/ErrorText/ErrorText';
import { sortByPositionDesc } from '../../../../utils/functions/sortByPosition';

const ReorderGroupWrapper = styled('div', {
  transition: 'opacity 0.2s ease-in-out',

  variants: {
    loading: {
      true: {
        opacity: 0.5,
      },
    },
  },
});

interface MapLayerReorderProps {
  mapId?: number;
}

const MapLayerReorder: React.FC<MapLayerReorderProps> = ({ mapId }) => {
  const { data: mapLayers, isFetching: isPendingMapLayers } = useGetMapLayers({ variables: mapId });
  const baseLayer = mapLayers?.find((layer) => layer.position === 1);

  const [items, setItems] = useState<PbViewMapLayer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setItems(
      (mapLayers ?? []).filter((layer) => (layer.position ?? 0) > 1).sort(sortByPositionDesc),
    );
  }, [mapLayers, error]);

  const onReorder = useCallback((x: PbViewMapLayer[]) => {
    setItems(x);
  }, []);

  const busy = isPendingMapLayers || loading;

  return (
    <>
      {items.length > 0 && (
        <ReorderGroupWrapper loading={busy}>
          <Reorder.Group as="div" axis="y" values={items} onReorder={onReorder}>
            {(items ?? []).map((ml, i) => {
              return (
                <MapLayerSectionDraggable
                  key={ml.id}
                  newPosition={items.length + 1 - i}
                  mapLayer={ml}
                  disabled={busy}
                  setLoading={setLoading}
                  setError={setError}
                />
              );
            })}
          </Reorder.Group>
        </ReorderGroupWrapper>
      )}
      {baseLayer && <MapLayerSectionContent mapLayer={baseLayer} />}
      <ErrorText error={error} />
    </>
  );
};

export default MapLayerReorder;
