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
  PbEntityTypeList,
  PbGetModuleAdminsResponse,
  PbGetModuleIdResponse,
  PbModuleAdmin,
  PbViewModule,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Modules<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets id of the module (based on world id, quest id,...)
   *
   * @tags Modules
   * @name ModulesGetModuleId
   * @summary Get id of the module
   * @request GET:/modules/get/id
   * @response `200` `PbGetModuleIdResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  modulesGetModuleId = (
    query?: {
      /** @format int32 */
      worldId?: number;
      /** @format int32 */
      questId?: number;
      /** @format int32 */
      characterId?: number;
      /** @format int32 */
      systemId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetModuleIdResponse, RpcStatus>({
      path: `/modules/get/id`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description gets module by id
   *
   * @tags Modules
   * @name ModulesGetModuleById
   * @summary Get module by id
   * @request GET:/modules/{moduleId}
   * @response `200` `PbViewModule` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  modulesGetModuleById = (moduleId: number, params: RequestParams = {}) =>
    this.http.request<PbViewModule, RpcStatus>({
      path: `/modules/${moduleId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description updates module (images and description post id)
   *
   * @tags Modules
   * @name ModulesUpdateModule
   * @summary Update module
   * @request PATCH:/modules/{moduleId}
   * @response `200` `PbViewModule` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  modulesUpdateModule = (
    moduleId: number,
    body: {
      /** @format int32 */
      headerImgId?: number;
      /** @format int32 */
      thumbnailImgId?: number;
      /** @format int32 */
      avatarImgId?: number;
      /** @format int32 */
      descriptionPostId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewModule, RpcStatus>({
      path: `/modules/${moduleId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description returns admins and admin requests for module
   *
   * @tags Modules
   * @name ModulesGetModuleAdmins
   * @summary Get module admins
   * @request GET:/modules/{moduleId}/admin
   * @response `200` `PbGetModuleAdminsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  modulesGetModuleAdmins = (moduleId: number, params: RequestParams = {}) =>
    this.http.request<PbGetModuleAdminsResponse, RpcStatus>({
      path: `/modules/${moduleId}/admin`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description deletes module admin
   *
   * @tags Modules
   * @name ModulesDeleteModuleAdmin
   * @summary Delete module admin
   * @request DELETE:/modules/{moduleId}/admin
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  modulesDeleteModuleAdmin = (
    moduleId: number,
    query?: {
      /** @format int32 */
      userId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/modules/${moduleId}/admin`,
      method: 'DELETE',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description adds request to become admin of the module
   *
   * @tags Modules
   * @name ModulesCreateModuleAdmin
   * @summary Create module admin
   * @request POST:/modules/{moduleId}/admin
   * @response `200` `PbModuleAdmin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  modulesCreateModuleAdmin = (
    moduleId: number,
    body: {
      motivationalLetter?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbModuleAdmin, RpcStatus>({
      path: `/modules/${moduleId}/admin`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description updates module admin request (approve / decline)
   *
   * @tags Modules
   * @name ModulesUpdateModuleAdmin
   * @summary Update module admin
   * @request PATCH:/modules/{moduleId}/admin
   * @response `200` `PbModuleAdmin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  modulesUpdateModuleAdmin = (
    moduleId: number,
    body: {
      /** @format int32 */
      userId?: number;
      superAdmin?: boolean;
      /** @format int32 */
      approved?: number;
      motivationalLetter?: string;
      allowedEntityTypes?: PbEntityTypeList;
      allowedMenu?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbModuleAdmin, RpcStatus>({
      path: `/modules/${moduleId}/admin`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
