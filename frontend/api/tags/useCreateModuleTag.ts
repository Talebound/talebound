import { createMutation } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { moduleAdapterSlice, moduleSelectors } from '../../adapters/ModuleAdapter';
import { store } from '../../store';

interface CreateModuleTagParams {
  moduleId: number;
  tagId: number;
}

export const useCreateModuleTag = createMutation({
  mutationFn: async (variables: CreateModuleTagParams) =>
    TagsCollection.tagsCreateModuleTag(variables.moduleId, { tagId: variables.tagId }),
  onSuccess: (data, variables) => {
    const newTagId = data.data.tagId;

    const module = moduleSelectors.selectById(store.getState(), variables.moduleId);
    if (module && newTagId) {
      store.dispatch(
        moduleAdapterSlice.actions.upsertModule({
          ...module,
          tags: [...(module.tags ?? []), newTagId],
        }),
      );
    }
  },
});
