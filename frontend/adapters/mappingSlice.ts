import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PbViewEntity, PbViewModule } from '../generated/api-types/data-contracts';

export interface MappingState {
  worldsModule: Record<number, number | undefined>;
  questsModule: Record<number, number | undefined>;
  systemsModule: Record<number, number | undefined>;
  charactersModule: Record<number, number | undefined>;

  postEntity: Record<number, number | undefined>;
  imageEntity: Record<number, number | undefined>;
  mapEntity: Record<number, number | undefined>;
  locationEntity: Record<number, number | undefined>;
}

const initialState: MappingState = {
  worldsModule: {},
  questsModule: {},
  systemsModule: {},
  charactersModule: {},

  postEntity: {},
  imageEntity: {},
  mapEntity: {},
  locationEntity: {},
};

export const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    mapModules: (state, action: PayloadAction<PbViewModule[]>) => {
      action.payload.forEach((module) => {
        const { worldId, systemId, characterId, questId } = module;
        if (worldId && module.id) {
          state.worldsModule[worldId] = module.id;
        } else if (systemId && module.id) {
          state.systemsModule[systemId] = module.id;
        } else if (characterId && module.id) {
          state.charactersModule[characterId] = module.id;
        } else if (questId && module.id) {
          state.questsModule[questId] = module.id;
        }
      });
    },
    mapEntities: (state, action: PayloadAction<PbViewEntity[]>) => {
      action.payload.forEach((entity) => {
        const { postId, imageId, mapId, locationId } = entity;
        if (entity.id) {
          if (postId) {
            state.postEntity[postId] = entity.id;
          } else if (imageId) {
            state.imageEntity[imageId] = entity.id;
          } else if (mapId) {
            state.mapEntity[mapId] = entity.id;
          } else if (locationId) {
            state.locationEntity[locationId] = entity.id;
          }
        }
      });
    },
  },
});

export const { mapModules, mapEntities } = mappingSlice.actions;

export const mappingReducer = mappingSlice.reducer;
