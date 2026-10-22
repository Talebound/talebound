import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbCharacter } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { createSelector } from 'reselect';

export const CharacterAdapter = createEntityAdapter<PbCharacter>({
  selectId: (character) => character.id!,
  sortComparer: (a, b) => a.id! - b.id!,
});

export const characterAdapterSlice = createSlice({
  name: 'characters',
  initialState: CharacterAdapter.getInitialState(),
  reducers: {
    addCharacters: CharacterAdapter.addMany,
    addCharacter: CharacterAdapter.addOne,
    removeCharacter: CharacterAdapter.removeOne,
    updateCharacter: CharacterAdapter.updateOne,
    upsertCharacter: CharacterAdapter.upsertOne,
    upsertCharacters: CharacterAdapter.upsertMany,
    removeCharacters: CharacterAdapter.removeMany,
    removeAllCharacters: CharacterAdapter.removeAll,
  },
});

export const characterSelectors = CharacterAdapter.getSelectors<ReduxState>(
  (state) => state[characterAdapterSlice.name],
);

export const selectCharactersByIds = createSelector(
  [characterSelectors.selectEntities, (_, ids: number[]) => ids],
  (entities, ids) => ids.map((id) => entities[id]).filter(Boolean),
);

// And then use the selectors to retrieve values
// const _allCharacters = characterSelectors.selectAll(store.getState());

// const characters = useSelector((state) => selectCharactersByIds(state, characterIds));
