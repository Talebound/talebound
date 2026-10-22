import React, { createContext, useContext } from 'react';

export interface MapPinTypeAdministrationState {
  selectedPinTypeId: number;
  selectedPinTypeGroupId: number;
}

export const mapPinTypeAdministrationInitialState: MapPinTypeAdministrationState = {
  selectedPinTypeId: 0,
  selectedPinTypeGroupId: 0,
};

export enum MapPinTypeAdministrationActionType {
  SET_SELECTED_PIN_TYPE_ID = 0,
  SET_SELECTED_PIN_TYPE_GROUP_ID = 1,
}

export type MapPinTypeAdministrationAction =
  | {
      type: MapPinTypeAdministrationActionType.SET_SELECTED_PIN_TYPE_ID;
      selectedPinTypeId: number;
    }
  | {
      type: MapPinTypeAdministrationActionType.SET_SELECTED_PIN_TYPE_GROUP_ID;
      selectedPinTypeGroupId: number;
    };

export interface MapPinTypeAdministrationContextType {
  state: MapPinTypeAdministrationState;
  dispatch: React.Dispatch<MapPinTypeAdministrationAction>;
}

export const MapPinTypeAdministrationContext = createContext<MapPinTypeAdministrationContextType>({
  state: mapPinTypeAdministrationInitialState,
  dispatch: () => undefined,
});

// Define the reducer
export function mapPinTypeAdministrationReducer(
  state: MapPinTypeAdministrationState,
  action: MapPinTypeAdministrationAction,
): MapPinTypeAdministrationState {
  switch (action.type) {
    case MapPinTypeAdministrationActionType.SET_SELECTED_PIN_TYPE_ID:
      return { ...state, selectedPinTypeId: action.selectedPinTypeId };
    case MapPinTypeAdministrationActionType.SET_SELECTED_PIN_TYPE_GROUP_ID:
      return { ...state, selectedPinTypeGroupId: action.selectedPinTypeGroupId };
    default:
      throw new Error('Unhandled action');
  }
}

// Create a custom hook for easy access to the context
export const useMapPinTypeAdministrationContext = () => useContext(MapPinTypeAdministrationContext);
