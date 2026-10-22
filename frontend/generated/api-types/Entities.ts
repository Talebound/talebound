/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  PbCreateEntityGroupRequest,
  PbCreateEntityGroupResponse,
  PbEntityGroup,
  PbEntityGroupContent,
  PbEntityGroupDirection,
  PbEntityGroupStyle,
  PbEntityType,
  PbViewEntity,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Entities<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description creates entity group
   *
   * @tags Entities
   * @name EntitiesCreateEntityGroup
   * @summary Create entity group
   * @request POST:/entities/groups/create
   * @response `200` `PbCreateEntityGroupResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  entitiesCreateEntityGroup = (body: PbCreateEntityGroupRequest, params: RequestParams = {}) =>
    this.http.request<PbCreateEntityGroupResponse, RpcStatus>({
      path: `/entities/groups/create`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description updates entity group properties
   *
   * @tags Entities
   * @name EntitiesUpdateEntityGroup
   * @summary Update entity group
   * @request PATCH:/entities/groups/{entityGroupId}
   * @response `200` `PbEntityGroup` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  entitiesUpdateEntityGroup = (
    entityGroupId: number,
    body: {
      name?: string;
      description?: string;
      style?: PbEntityGroupStyle;
      direction?: PbEntityGroupDirection;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbEntityGroup, RpcStatus>({
      path: `/entities/groups/${entityGroupId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description creates content for an entity group
   *
   * @tags Entities
   * @name EntitiesCreateEntityGroupContent
   * @summary Create entity group content
   * @request POST:/entities/groups/{entityGroupId}/content
   * @response `200` `PbEntityGroupContent` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  entitiesCreateEntityGroupContent = (
    entityGroupId: number,
    body: {
      /** @format int32 */
      contentEntityId?: number;
      /** @format int32 */
      contentEntityGroupId?: number;
      /** @format int32 */
      position?: number;
      entityType?: PbEntityType;
      /** @format int32 */
      entityIdOfType?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbEntityGroupContent, RpcStatus>({
      path: `/entities/groups/${entityGroupId}/content`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes content from an entity group
   *
   * @tags Entities
   * @name EntitiesDeleteEntityGroupContent
   * @summary Delete entity group content
   * @request DELETE:/entities/groups/{entityGroupId}/content/{contentId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  entitiesDeleteEntityGroupContent = (
    entityGroupId: number,
    contentId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/entities/groups/${entityGroupId}/content/${contentId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates content of an entity group
   *
   * @tags Entities
   * @name EntitiesUpdateEntityGroupContent
   * @summary Update entity group content
   * @request PATCH:/entities/groups/{entityGroupId}/content/{contentId}
   * @response `200` `PbEntityGroupContent` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  entitiesUpdateEntityGroupContent = (
    entityGroupId: number,
    contentId: number,
    body: {
      /** @format int32 */
      newEntityGroupId?: number;
      /** @format int32 */
      position?: number;
      /** @format int32 */
      contentEntityId?: number;
      /** @format int32 */
      contentEntityGroupId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbEntityGroupContent, RpcStatus>({
      path: `/entities/groups/${entityGroupId}/content/${contentId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes an entity group
   *
   * @tags Entities
   * @name EntitiesDeleteEntityGroup
   * @summary Delete entity group
   * @request DELETE:/entities/groups/{entityGroupId}/delete_type/{deleteType}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  entitiesDeleteEntityGroup = (
    entityGroupId: number,
    deleteType:
      | 'DELETE_EGC_ACTION_UNKNOWN'
      | 'DELETE_EGC_ACTION_DELETE_CHILDREN'
      | 'DELETE_EGC_ACTION_MOVE_CHILDREN',
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/entities/groups/${entityGroupId}/delete_type/${deleteType}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description gets entity by id
   *
   * @tags Entities
   * @name EntitiesGetEntityById
   * @summary Get entity by id
   * @request GET:/entities/{entityId}
   * @response `200` `PbViewEntity` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  entitiesGetEntityById = (entityId: number, params: RequestParams = {}) =>
    this.http.request<PbViewEntity, RpcStatus>({
      path: `/entities/${entityId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
