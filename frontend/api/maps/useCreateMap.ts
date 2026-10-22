import { createMutation, inferData } from 'react-query-kit';
import { MapsCollection } from '../collections';
import { PbCreateMapRequest } from '../../generated/api-types/data-contracts';
import { useGetMapById } from './useGetMapById';
import { queryClient } from '../../pages/_app';
import { store } from '../../store';
import { mapAdapterSlice } from '../../adapters/MapAdapter';
import { useGetMapLayers } from './useGetMapLayers';

export const useCreateMap = createMutation({
  mutationFn: async (variables: PbCreateMapRequest) => MapsCollection.mapsCreateMap(variables),
  onSuccess: (data, variables) => {
    const { map, layer } = data.data;
    if (map && layer && variables.moduleId) {
      if (map.id) {
        const mapQueryKey = useGetMapById.getKey(map?.id);
        queryClient.setQueryData<inferData<typeof useGetMapById>>(mapQueryKey, () => map);
        store.dispatch(mapAdapterSlice.actions.upsertMap(map));

        //TODO - invalidate useGetMaps queries
        //void queryClient.invalidateQueries({ type: 'all' }); // ???

        const mapLayersQueryKey = useGetMapLayers.getKey(map.id);
        queryClient.setQueryData<inferData<typeof useGetMapLayers>>(mapLayersQueryKey, () => [
          layer,
        ]);
      }
    }
  },
});
