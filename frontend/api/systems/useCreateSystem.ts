import { createMutation } from 'react-query-kit';
import { PbCreateSystemRequest } from '../../generated/api-types/data-contracts';
import { SystemsCollection } from '../collections';
import router from 'next/router';
import { store } from '../../store';
import { systemAdapterSlice } from '../../adapters/SystemAdapter';
import { moduleAdapterSlice } from '../../adapters/ModuleAdapter';
import { mappingSlice } from '../../adapters/mappingSlice';

export const useCreateSystem = createMutation({
  mutationFn: async (variables: PbCreateSystemRequest) =>
    SystemsCollection.systemsCreateSystem(variables),
  onSuccess: (data) => {
    if (data.data?.system) {
      store.dispatch(systemAdapterSlice.actions.upsertSystem(data.data?.system));
    }
    if (data.data?.module) {
      store.dispatch(moduleAdapterSlice.actions.upsertModule(data.data?.module));
      store.dispatch(mappingSlice.actions.mapModules([data.data?.module]));
    }
    const systemId = data.data.system?.id;
    if (systemId) {
      router.push(`/systems/${systemId}/edit`).catch((error) => console.error(error));
    }
  },
});
