import { createMutation } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { moduleAdapterSlice, moduleSelectors } from '../../adapters/ModuleAdapter';
import { store } from '../../store';

interface DeleteModuleTagParams {
  moduleId: number;
  tagId: number;
}

export const useDeleteModuleTag = createMutation({
  mutationFn: async (variables: DeleteModuleTagParams) =>
    TagsCollection.tagsDeleteModuleTag(variables.moduleId, variables.tagId),
  onSuccess: (_, variables) => {
    const module = moduleSelectors.selectById(store.getState(), variables.moduleId);
    if (module) {
      store.dispatch(
        moduleAdapterSlice.actions.upsertModule({
          ...module,
          tags: [...(module.tags?.filter((tag) => tag !== variables.tagId) ?? [])],
        }),
      );
    }
  },
});
