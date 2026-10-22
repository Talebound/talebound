import React from 'react';
import MapSidebarLayers from './MapSidebarLayers';
import MapSidebarPins from './MapSidebarPins';
import { DisplayedLayers } from '../mapUtils';

export interface MapSidebarProps {
  mapId: number;
  canEdit: boolean;
  displayedLayers: DisplayedLayers;
  setDisplayedLayers: React.Dispatch<React.SetStateAction<DisplayedLayers>>;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  mapId,
  canEdit,
  displayedLayers,
  setDisplayedLayers,
}) => {
  return (
    <>
      <MapSidebarLayers
        mapId={mapId}
        canEdit={canEdit}
        displayedLayers={displayedLayers}
        setDisplayedLayers={setDisplayedLayers}
      />
      <MapSidebarPins mapId={mapId} displayedLayers={displayedLayers} canEdit={canEdit} />
    </>
  );
};

export default MapSidebar;
