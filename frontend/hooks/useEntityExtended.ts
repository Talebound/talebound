import {
  PbEntityType,
  PbImage,
  PbLocation,
  PbMap,
  PbPost,
  PbViewEntity,
} from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetEntityById } from '../api/entities/useGetEntityById';
import { TaleboundError } from '../utils/types/error';
import { store } from '../store';
import { postSelectors } from '../adapters/PostAdapter';
import { imageSelectors } from '../adapters/ImageAdapter';
import { mapSelectors } from '../adapters/MapAdapter';
import { locationSelectors } from '../adapters/LocationAdapter';
import { useSelector } from 'react-redux';
import { entitySelectors } from '../adapters/EntityAdapter';

interface UseEntityResponse {
  entity: PbViewEntity | undefined;
  isFetching: boolean;
  error: TaleboundError | null;
}

interface UseEntityPostResponse extends UseEntityResponse {
  type: PbEntityType.ENTITY_TYPE_POST;
  data: PbPost | undefined;
}

interface UseEntityImageResponse extends UseEntityResponse {
  type: PbEntityType.ENTITY_TYPE_IMAGE;
  data: PbImage | undefined;
}

interface UseEntityMapResponse extends UseEntityResponse {
  type: PbEntityType.ENTITY_TYPE_MAP;
  data: PbMap | undefined;
}

interface UseEntityLocationResponse extends UseEntityResponse {
  type: PbEntityType.ENTITY_TYPE_LOCATION;
  data: PbLocation | undefined;
}

interface UseEntityCharacterResponse extends UseEntityResponse {
  type: PbEntityType.ENTITY_TYPE_CHARACTER;
  data: undefined;
}

type U =
  | UseEntityPostResponse
  | UseEntityImageResponse
  | UseEntityMapResponse
  | UseEntityLocationResponse
  | UseEntityCharacterResponse;

export const useEntityExtended = (entityId: number): U => {
  const { isFetching, error } = useGetEntityById({ variables: entityId });
  const entity = useSelector((state) => entitySelectors.selectById(state, entityId));

  const post = postSelectors.selectById(store.getState(), entity?.postId ?? 0);
  const image = imageSelectors.selectById(store.getState(), entity?.imageId ?? 0);
  const map = mapSelectors.selectById(store.getState(), entity?.mapId ?? 0);
  const location = locationSelectors.selectById(store.getState(), entity?.locationId ?? 0);

  return useMemo(() => {
    const base = {
      entity,
      isFetching: isFetching ?? false,
      error: error ?? null,
    };

    switch (entity?.type) {
      case PbEntityType.ENTITY_TYPE_POST:
        return {
          ...base,
          type: PbEntityType.ENTITY_TYPE_POST,
          data: post,
        };
      case PbEntityType.ENTITY_TYPE_IMAGE:
        return {
          ...base,
          type: PbEntityType.ENTITY_TYPE_IMAGE,
          data: image,
        };
      case PbEntityType.ENTITY_TYPE_MAP:
        return {
          ...base,
          type: PbEntityType.ENTITY_TYPE_MAP,
          data: map,
        };
      case PbEntityType.ENTITY_TYPE_LOCATION:
        return {
          ...base,
          type: PbEntityType.ENTITY_TYPE_LOCATION,
          data: location,
        };
      default:
        return {
          ...base,
          type: PbEntityType.ENTITY_TYPE_CHARACTER,
          data: undefined,
        };
    }
  }, [error, isFetching, entity, post, image, location, map]);
};
