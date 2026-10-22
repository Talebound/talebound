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
  PbCreateSystemRequest,
  PbCreateSystemResponse,
  PbGetSystemsResponse,
  PbImage,
  PbSystem,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Systems<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets list of systems
   *
   * @tags Systems
   * @name SystemsGetSystems
   * @summary Get systems
   * @request GET:/systems
   * @response `200` `PbGetSystemsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  systemsGetSystems = (
    query?: {
      public?: boolean;
      tags?: number[];
      orderBy?: string;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetSystemsResponse, RpcStatus>({
      path: `/systems`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates completely new system
   *
   * @tags Systems
   * @name SystemsCreateSystem
   * @summary Create system
   * @request POST:/systems
   * @response `200` `PbCreateSystemResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  systemsCreateSystem = (body: PbCreateSystemRequest, params: RequestParams = {}) =>
    this.http.request<PbCreateSystemResponse, RpcStatus>({
      path: `/systems`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description gets system by ID
   *
   * @tags Systems
   * @name SystemsGetSystemById
   * @summary Get system by ID
   * @request GET:/systems/{systemId}
   * @response `200` `PbSystem` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  systemsGetSystemById = (systemId: number, params: RequestParams = {}) =>
    this.http.request<PbSystem, RpcStatus>({
      path: `/systems/${systemId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description updates system properties (NO images or stats!)
   *
   * @tags Systems
   * @name SystemsUpdateSystem
   * @summary Update system
   * @request PATCH:/systems/{systemId}
   * @response `200` `PbSystem` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  systemsUpdateSystem = (
    systemId: number,
    body: {
      name?: string;
      shortDescription?: string;
      public?: boolean;
      basedOn?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbSystem, RpcStatus>({
      path: `/systems/${systemId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description uploads and sets new image for given system
   *
   * @tags Systems
   * @name SystemsUploadSystemImage
   * @summary Upload image for system
   * @request POST:/systems/{systemId}/images
   * @response `200` `PbImage` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  systemsUploadSystemImage = (
    systemId: number,
    body: {
      /** @format byte */
      data?: string;
      /** @format int32 */
      imageTypeId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbImage, RpcStatus>({
      path: `/systems/${systemId}/images`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
}
