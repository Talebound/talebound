import React, { useCallback } from 'react';
import { PbMapPinType } from '../../../../../generated/api-types/data-contracts';
import {
  MapPinTypeAdministrationActionType,
  useMapPinTypeAdministrationContext,
} from '../mapPinTypeAdministrationReducer';
import MapPin from '../../../MapPin/MapPin';

interface MapPinTypeProps {
  data: PbMapPinType;
}

const MapPinType: React.FC<MapPinTypeProps> = ({ data }) => {
  const { state, dispatch } = useMapPinTypeAdministrationContext();

  const handleSelect = useCallback(
    () =>
      dispatch({
        type: MapPinTypeAdministrationActionType.SET_SELECTED_PIN_TYPE_ID,
        selectedPinTypeId: data.id ?? 0,
      }),
    [data.id, dispatch],
  );

  return (
    <span
      onClick={handleSelect}
      style={{
        border: `2px solid ${state.selectedPinTypeId === data.id ? 'green' : 'transparent'}`,
        padding: '4px',
      }}
    >
      <MapPin data={data} />
    </span>
  );
};

export default MapPinType;
