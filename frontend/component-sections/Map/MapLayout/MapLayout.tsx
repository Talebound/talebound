import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMap } from '../../../hooks/useMap';
import {
  MapLayerContainer,
  MapLayerImage,
  MapLayerOverlay,
  MapLayerOverlayButtons,
  MapLayers,
  MapSidebarSolid,
  MapWrapper,
} from './MapLayoutComponents';
import { useAspectRatioResizer } from '../../../hooks/useAspectRatioResizer';
import { useGetMapLayers } from '../../../api/maps/useGetMapLayers';
import MapSidebar from '../MapSidebar/MapSidebar';
import { DisplayedLayers, MapLayoutType } from '../mapUtils';
import { Button } from '../../../components/Button/Button';
import { BiLayer } from 'react-icons/bi';
import { TbArrowBarToLeft, TbArrowBarToRight } from 'react-icons/tb';
import { MdClose } from 'react-icons/md';
import { sortByPosition } from '../../../utils/functions/sortByPosition';
import { imageModifyVariant, ImageVariant } from '../../../utils/images/imageUtils';

interface MapLayoutProps {
  mapId: number;
  canEdit: boolean;
  allLayersByDefault?: boolean;
}

const MapLayout: React.FC<MapLayoutProps> = ({ mapId, canEdit, allLayersByDefault = false }) => {
  const { map: mapData, isFetching: isPendingMap } = useMap(mapId);
  const { data: mapLayers, isFetching: isPendingMapLayers } = useGetMapLayers({ variables: mapId });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [displayedLayers, setDisplayedLayers] = useState<DisplayedLayers>({});
  const [mapLayoutType, setMapLayoutType] = useState<MapLayoutType>(MapLayoutType.HIDDEN);

  const offset = useMemo(() => {
    if (mapLayoutType === MapLayoutType.SIDEBAR) {
      return {
        fragment: 3,
        min: 100,
        max: 250,
      };
    }
    return 0;
  }, [mapLayoutType]);

  const resizer = useAspectRatioResizer({
    ref: wrapperRef,
    baseWidth: mapData?.width ?? 0,
    offset,
    baseHeight: mapData?.height ?? 0,
    zoomable: true,
  });

  const handleOverlay = useCallback(
    () =>
      setMapLayoutType((p) => {
        if (p === MapLayoutType.HIDDEN) return MapLayoutType.OVERLAY;
        return MapLayoutType.HIDDEN;
      }),
    [],
  );

  const handleSidebar = useCallback(
    () =>
      setMapLayoutType((p) =>
        p === MapLayoutType.SIDEBAR ? MapLayoutType.OVERLAY : MapLayoutType.SIDEBAR,
      ),
    [],
  );

  const handleClose = useCallback(() => setMapLayoutType(MapLayoutType.HIDDEN), []);
  const sortedLayers = useMemo(() => (mapLayers ?? []).toSorted(sortByPosition), [mapLayers]);
  let dlCount = 0;

  useEffect(() => {
    if (allLayersByDefault) {
      setDisplayedLayers((dl) => ({
        ...(mapLayers ?? []).reduce<DisplayedLayers>(
          (p, c) => ({
            ...p,
            [c.id ?? 0]: true,
          }),
          {},
        ),
        ...dl,
      }));
    }
  }, [allLayersByDefault, mapLayers]);

  return (
    <MapWrapper
      ref={wrapperRef}
      css={{
        height: resizer.height + 'px',
      }}
    >
      <MapLayerContainer>
        <MapLayers
          className="pannable"
          css={{
            scale: resizer.zoomRatio,
            transformOrigin: 'left top',
          }}
        >
          {sortedLayers.map((ml) => {
            const layerId = ml.id;
            if (!ml.enabled || !layerId || !ml.imageUrl) return null;
            if (!displayedLayers[layerId] && (ml.position ?? 0) > 1) return null;
            dlCount++;
            return (
              <MapLayerImage
                css={{
                  zIndex: ml.position ?? 0,
                  width: mapData?.width,
                  height: mapData?.height,
                }}
                key={layerId}
                src={imageModifyVariant(ml.imageUrl, ImageVariant.original)}
                alt={`Map layer - ${ml.position}`}
              />
            );
          })}
        </MapLayers>
        {mapLayoutType === MapLayoutType.OVERLAY && (
          <MapLayerOverlay>
            <MapSidebar
              mapId={mapId}
              canEdit={canEdit}
              displayedLayers={displayedLayers}
              setDisplayedLayers={setDisplayedLayers}
            />
          </MapLayerOverlay>
        )}

        <MapLayerOverlayButtons gap="sm">
          {mapLayoutType === MapLayoutType.HIDDEN && (
            <Button color="primaryOutline" onClick={handleOverlay} size="sm">
              <BiLayer /> {dlCount - 1}/{(mapLayers ?? []).length - 1}
            </Button>
          )}
          {mapLayoutType !== MapLayoutType.HIDDEN && (
            <Button icon color="primaryOutline" onClick={handleClose} size="sm">
              <MdClose />
            </Button>
          )}
          <Button icon color="primaryOutline" onClick={handleSidebar} size="sm">
            {mapLayoutType === MapLayoutType.SIDEBAR ? <TbArrowBarToLeft /> : <TbArrowBarToRight />}
          </Button>
        </MapLayerOverlayButtons>
      </MapLayerContainer>
      {mapLayoutType === MapLayoutType.SIDEBAR && (
        <MapSidebarSolid
          padding="sm"
          gap="xs"
          css={{
            width: resizer.finalOffset + 'px',
          }}
        >
          <MapSidebar
            mapId={mapId}
            canEdit={canEdit}
            displayedLayers={displayedLayers}
            setDisplayedLayers={setDisplayedLayers}
          />
        </MapSidebarSolid>
      )}
    </MapWrapper>
  );
};

export default MapLayout;
