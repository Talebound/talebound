import { createMutation } from 'react-query-kit';
import { PbCreateWorldRequest } from '../../generated/api-types/data-contracts';
import { WorldsCollection } from '../collections';
import router from 'next/router';
import { store } from '../../store';
import { worldAdapterSlice } from '../../adapters/WorldAdapter';
import { moduleAdapterSlice } from '../../adapters/ModuleAdapter';
import { mappingSlice } from '../../adapters/mappingSlice';

export const useCreateWorld = createMutation({
  mutationFn: async (variables: PbCreateWorldRequest) =>
    WorldsCollection.worldsCreateWorld(variables),
  onSuccess: (data) => {
    if (data.data?.world) {
      store.dispatch(worldAdapterSlice.actions.upsertWorld(data.data?.world));
    }
    if (data.data?.module) {
      store.dispatch(moduleAdapterSlice.actions.upsertModule(data.data?.module));
      store.dispatch(mappingSlice.actions.mapModules([data.data?.module]));
    }
    const worldId = data.data.world?.id;
    if (worldId) {
      router.push(`/worlds/${worldId}/edit`).catch((error) => console.error(error));
    }
  },
});
