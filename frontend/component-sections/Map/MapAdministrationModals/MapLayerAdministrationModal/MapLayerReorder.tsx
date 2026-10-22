import React, { useCallback, useEffect, useState } from 'react';
import { useGetMapLayers } from '../../../../api/maps/useGetMapLayers';
import { styled } from '../../../../styles/stitches.config';
import { Reorder } from 'framer-motion';
import { PbViewMapLayer } from '../../../../generated/api-types/data-contracts';
import MapLayerSectionDraggable from './MapLayerSectionDraggable';
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
  const layerCount = (mapLayers ?? []).length; //main layer doesn't count

  const [items, setItems] = useState<PbViewMapLayer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setItems((mapLayers ?? []).sort(sortByPositionDesc));
  }, [mapLayers]);

  const onReorder = useCallback((x: PbViewMapLayer[]) => {
    setItems(x);
    console.log('ON REORDER: ', x);
  }, []);

  const busy = isPendingMapLayers || loading;

  return (
    <>
      {layerCount > 1 && (
        <ReorderGroupWrapper loading={busy}>
          <Reorder.Group as="div" axis="y" values={items} onReorder={onReorder}>
            {(items ?? []).map((ml, i) => {
              return (
                <MapLayerSectionDraggable
                  key={ml.id}
                  newPosition={layerCount - i}
                  mapLayer={ml}
                  setLoading={setLoading}
                  setError={setError}
                />
              );
            })}
          </Reorder.Group>
        </ReorderGroupWrapper>
      )}
      <ErrorText error={error} />
    </>
  );
};

export default MapLayerReorder;
