import { PbRunFetcherRequest, PbRunFetcherResponse } from '../generated/api-types/data-contracts';
import { store } from '../store';
import { userAdapterSlice } from '../adapters/UserAdapter';
import { moduleAdapterSlice } from '../adapters/ModuleAdapter';
import { worldAdapterSlice } from '../adapters/WorldAdapter';
import { entityAdapterSlice } from '../adapters/EntityAdapter';
import { postAdapterSlice } from '../adapters/PostAdapter';
import { imageAdapterSlice } from '../adapters/ImageAdapter';
import { mapAdapterSlice } from '../adapters/MapAdapter';
import { locationAdapterSlice } from '../adapters/LocationAdapter';
import { excludeExistingIds, isFetcherKey, useRunFetcher } from './fetcher/useRunFetcher';
import { queryClient } from '../pages/_app';
import { AxiosResponse } from 'axios';
import { mappingSlice } from '../adapters/mappingSlice';
import { systemAdapterSlice } from '../adapters/SystemAdapter';
import { characterAdapterSlice } from '../adapters/CharacterAdapter';
import { questAdapterSlice } from '../adapters/QuestAdapter';

export const fetcherInterceptor = async (response: AxiosResponse) => {
  console.log('INTERCEPTED');
  const fetchHeader = response.headers['fetch-ids'];
  console.log('response', response);
  console.log('response.headers', response.headers);
  console.log('fetchHeader', fetchHeader);
  if (response.request.responseURL.includes('/fetcher')) {
    console.log('============== FETCH RESPONSE DATA RECEIVED =============================');
    console.log('DATA: [ ', response.request.responseURL, ' ] ', response.data);
    const fetcherData = response.data as PbRunFetcherResponse;

    if (fetcherData.users) {
      console.log('Saving users to store ', fetcherData.users);
      // UserAdapter.upsertMany(store.getState().users, fetcherData.users);
      store.dispatch(userAdapterSlice.actions.upsertUsers(fetcherData.users));
    }
    if (fetcherData.modules) {
      console.log('Saving modules to store ', fetcherData.modules);
      store.dispatch(moduleAdapterSlice.actions.upsertModules(fetcherData.modules));
      store.dispatch(mappingSlice.actions.mapModules(fetcherData.modules));
    }
    if (fetcherData.worlds) {
      console.log('Saving worlds to store ', fetcherData.worlds);
      store.dispatch(worldAdapterSlice.actions.upsertWorlds(fetcherData.worlds));
    }
    if (fetcherData.systems) {
      console.log('Saving systems to store ', fetcherData.systems);
      store.dispatch(systemAdapterSlice.actions.upsertSystems(fetcherData.systems));
    }
    if (fetcherData.characters) {
      console.log('Saving characters to store ', fetcherData.characters);
      store.dispatch(characterAdapterSlice.actions.upsertCharacters(fetcherData.characters));
    }
    if (fetcherData.quests) {
      console.log('Saving quests to store ', fetcherData.quests);
      store.dispatch(questAdapterSlice.actions.upsertQuests(fetcherData.quests));
    }
    if (fetcherData.entities) {
      console.log('Saving entities to store ', fetcherData.entities);
      store.dispatch(entityAdapterSlice.actions.upsertEntities(fetcherData.entities));
      store.dispatch(mappingSlice.actions.mapEntities(fetcherData.entities));
    }
    if (fetcherData.posts) {
      console.log('Saving posts to store ', fetcherData.posts);
      store.dispatch(postAdapterSlice.actions.upsertPosts(fetcherData.posts));
    }
    if (fetcherData.images) {
      console.log('Saving images to store ', fetcherData.images);
      // ImageAdapter.upsertMany(store.getState().images, fetcherData.images);
      store.dispatch(imageAdapterSlice.actions.upsertImages(fetcherData.images));
    }
    if (fetcherData.maps) {
      console.log('Saving maps to store ', fetcherData.maps);
      store.dispatch(mapAdapterSlice.actions.upsertMaps(fetcherData.maps));
    }
    if (fetcherData.locations) {
      console.log('Saving locations to store ', fetcherData.locations);
      store.dispatch(locationAdapterSlice.actions.upsertLocations(fetcherData.locations));
    }
  }

  if (fetchHeader) {
    console.log('================== FETCH HEADER RECEIVED ==================================');
    const headers = JSON.parse(fetchHeader);
    console.log('headers', headers);
    const result: PbRunFetcherRequest = {};
    let numberOfIds = 0;

    Object.keys(headers).forEach((key) => {
      // Convert snake_case to camelCase and append 'Ids'
      const newKey = key.replace(/_\w/g, (m) => m[1].toUpperCase());
      if (isFetcherKey(newKey)) {
        // Validate each ID in the array
        const ids = headers[key];
        if (Array.isArray(ids)) {
          result[newKey] = excludeExistingIds(
            newKey,
            ids.filter((id) => Number.isInteger(id)),
          );
          console.log(
            'Cleaning up ids for ',
            newKey,
            ' -- before: ',
            ids,
            ' -- after: ',
            result[newKey],
          );
          numberOfIds += result[newKey]?.length ?? 0;
        }
      }
    });

    if (numberOfIds > 0) {
      console.log('Sending request...');
      await queryClient.fetchQuery(useRunFetcher.getFetchOptions(result));
    }
    console.log('==========================================================');
  }
  return response;
};
