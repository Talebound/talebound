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
  PbCreateEntityTagResponse,
  PbCreateModuleEntityAvailableTagRequest,
  PbCreateModuleTagResponse,
  PbCreateModuleTypeAvailableTagRequest,
  PbEntityTagAvailable,
  PbGetModuleEntityAvailableTagsResponse,
  PbGetModuleTypeAvailableTagsResponse,
  PbViewTag,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Tags<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets list of tags, that are usable for entities inside of module
   *
   * @tags Tags
   * @name TagsGetModuleEntityAvailableTags
   * @summary Get available tags for entities
   * @request GET:/tags/available/entity
   * @response `200` `PbGetModuleEntityAvailableTagsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsGetModuleEntityAvailableTags = (
    query?: {
      /** @format int32 */
      moduleId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetModuleEntityAvailableTagsResponse, RpcStatus>({
      path: `/tags/available/entity`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates new tag, that can be assigned to entities inside of given module
   *
   * @tags Tags
   * @name TagsCreateModuleEntityAvailableTag
   * @summary Create entity-available tag
   * @request POST:/tags/available/entity
   * @response `200` `PbEntityTagAvailable` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsCreateModuleEntityAvailableTag = (
    body: PbCreateModuleEntityAvailableTagRequest,
    params: RequestParams = {},
  ) =>
    this.http.request<PbEntityTagAvailable, RpcStatus>({
      path: `/tags/available/entity`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes available tag and removes all its assignments
   *
   * @tags Tags
   * @name TagsDeleteModuleEntityAvailableTag
   * @summary Delete entity-available tag
   * @request DELETE:/tags/available/entity/{tagId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsDeleteModuleEntityAvailableTag = (tagId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/tags/available/entity/${tagId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates entity-assignable tag
   *
   * @tags Tags
   * @name TagsUpdateModuleEntityAvailableTag
   * @summary Update entity-available tag
   * @request PATCH:/tags/available/entity/{tagId}
   * @response `200` `PbEntityTagAvailable` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsUpdateModuleEntityAvailableTag = (
    tagId: number,
    body: {
      newTag?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbEntityTagAvailable, RpcStatus>({
      path: `/tags/available/entity/${tagId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description gets list of tags, that are usable for module type
   *
   * @tags Tags
   * @name TagsGetModuleTypeAvailableTags
   * @summary Get available tags for module type
   * @request GET:/tags/available/module_type
   * @response `200` `PbGetModuleTypeAvailableTagsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsGetModuleTypeAvailableTags = (
    query?: {
      /** @default "MODULE_TYPE_UNKNOWN" */
      moduleType?:
        | 'MODULE_TYPE_UNKNOWN'
        | 'MODULE_TYPE_WORLD'
        | 'MODULE_TYPE_QUEST'
        | 'MODULE_TYPE_SYSTEM'
        | 'MODULE_TYPE_CHARACTER';
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetModuleTypeAvailableTagsResponse, RpcStatus>({
      path: `/tags/available/module_type`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates new tag, that can be assigned to modules of given type
   *
   * @tags Tags
   * @name TagsCreateModuleTypeAvailableTag
   * @summary Create module-available tag
   * @request POST:/tags/available/module_type
   * @response `200` `PbViewTag` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsCreateModuleTypeAvailableTag = (
    body: PbCreateModuleTypeAvailableTagRequest,
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewTag, RpcStatus>({
      path: `/tags/available/module_type`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes available world tag and removes all its assignments
   *
   * @tags Tags
   * @name TagsDeleteModuleTypeAvailableTag
   * @summary Delete available world tag
   * @request DELETE:/tags/available/module_type/{tagId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsDeleteModuleTypeAvailableTag = (tagId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/tags/available/module_type/${tagId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates module-assignable tag
   *
   * @tags Tags
   * @name TagsUpdateModuleTypeAvailableTag
   * @summary Update module-available tag
   * @request PATCH:/tags/available/module_type/{tagId}
   * @response `200` `PbViewTag` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsUpdateModuleTypeAvailableTag = (
    tagId: number,
    body: {
      newTag?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewTag, RpcStatus>({
      path: `/tags/available/module_type/${tagId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description assigns one tag to the entity
   *
   * @tags Tags
   * @name TagsCreateEntityTag
   * @summary Create entity tag
   * @request POST:/tags/entity/{entityId}
   * @response `200` `PbCreateEntityTagResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsCreateEntityTag = (
    entityId: number,
    body: {
      /** @format int32 */
      tagId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbCreateEntityTagResponse, RpcStatus>({
      path: `/tags/entity/${entityId}`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description removes tag from the entity
   *
   * @tags Tags
   * @name TagsDeleteEntityTag
   * @summary Delete entity tag
   * @request DELETE:/tags/entity/{entityId}/tag/{tagId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsDeleteEntityTag = (entityId: number, tagId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/tags/entity/${entityId}/tag/${tagId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description assigns one tag to the module
   *
   * @tags Tags
   * @name TagsCreateModuleTag
   * @summary Create module tag
   * @request POST:/tags/module/{moduleId}
   * @response `200` `PbCreateModuleTagResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsCreateModuleTag = (
    moduleId: number,
    body: {
      /** @format int32 */
      tagId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbCreateModuleTagResponse, RpcStatus>({
      path: `/tags/module/${moduleId}`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description removes tag from the module
   *
   * @tags Tags
   * @name TagsDeleteModuleTag
   * @summary Delete module tag
   * @request DELETE:/tags/module/{moduleId}/tag/{tagId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  tagsDeleteModuleTag = (moduleId: number, tagId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/tags/module/${moduleId}/tag/${tagId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
}
