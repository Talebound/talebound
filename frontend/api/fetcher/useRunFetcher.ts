import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { FetcherCollection } from '../collections';
import { PbRunFetcherRequest } from '../../generated/api-types/data-contracts';
import { store } from '../../store';

export type RunFetcherRequestKey = keyof PbRunFetcherRequest;

// object for filtering out keys that are not valid at runtime
const fetcherKeys: Record<RunFetcherRequestKey, null> = {
  moduleIds: null,
  worldIds: null,
  systemIds: null,
  questIds: null,
  characterIds: null,
  entityIds: null,
  postIds: null,
  imageIds: null,
  locationIds: null,
  mapIds: null,
  userIds: null,
};

export function excludeExistingIds(key: RunFetcherRequestKey, ids: number[]): number[] {
  switch (key) {
    case 'moduleIds':
      return ids.filter((id) => !store.getState().modules.entities[id]);
    case 'worldIds':
      return ids.filter((id) => !store.getState().worlds.entities[id]);
    case 'systemIds':
      return ids.filter((id) => !store.getState().systems.entities[id]);
    case 'characterIds':
      return ids.filter((id) => !store.getState().characters.entities[id]);
    case 'questIds':
      return ids.filter((id) => !store.getState().quests.entities[id]);
    case 'entityIds':
      return ids.filter((id) => !store.getState().entities.entities[id]);
    case 'postIds':
      return ids.filter((id) => !store.getState().posts.entities[id]);
    case 'imageIds':
      return ids.filter((id) => !store.getState().images.entities[id]);
    case 'locationIds':
      return ids.filter((id) => !store.getState().locations.entities[id]);
    case 'mapIds':
      return ids.filter((id) => !store.getState().maps.entities[id]);
    case 'userIds':
      return ids.filter((id) => !store.getState().users.entities[id]);
    default:
      throw new Error(`Invalid key: ${key}`);
  }
}

export function isFetcherKey(key: string | number | symbol): key is RunFetcherRequestKey {
  return key in fetcherKeys;
}

export const useRunFetcher = createQuery<number, PbRunFetcherRequest, TaleboundError>({
  primaryKey: 'useRunFetcher',
  queryFn: async ({ queryKey: [, variables] }) => {
    console.log('Inside of useRunFetcher');
    // const { data } = await FetcherCollection.fetcherRunFetcher({ ...variables });
    await FetcherCollection.fetcherRunFetcher({ ...variables });
    return 1;
  },
});
