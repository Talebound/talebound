import { createMutation, inferData } from 'react-query-kit';
import { SystemsCollection } from '../collections';
import { useGetSystemById } from './useGetSystemById';
import { queryClient } from '../../pages/_app';
import { store } from '../../store';
import { systemAdapterSlice } from '../../adapters/SystemAdapter';

type UpdateSystemParams = {
  systemId: number;
  body: Parameters<typeof SystemsCollection.systemsUpdateSystem>[1];
};

export const useUpdateSystem = createMutation({
  mutationFn: async (variables: UpdateSystemParams) =>
    SystemsCollection.systemsUpdateSystem(variables.systemId, variables.body),
  onSuccess: (data) => {
    const systemId = data.data.id;
    if (systemId) {
      const systemQueryKey = useGetSystemById.getKey(systemId);
      queryClient.setQueryData<inferData<typeof useGetSystemById>>(systemQueryKey, () => {
        return data.data;
      });
      store.dispatch(systemAdapterSlice.actions.upsertSystem(data.data));
    }
  },
});
