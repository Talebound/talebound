/* oxlint-disable */
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
  PbCreateWorldRequest,
  PbCreateWorldResponse,
  PbGetWorldsResponse,
  PbImage,
  PbWorld,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Worlds<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets list of worlds
   *
   * @tags Worlds
   * @name WorldsGetWorlds
   * @summary Get worlds
   * @request GET:/worlds
   * @response `200` `PbGetWorldsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsGetWorlds = (
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
    this.http.request<PbGetWorldsResponse, RpcStatus>({
      path: `/worlds`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates completely new world
   *
   * @tags Worlds
   * @name WorldsCreateWorld
   * @summary Create world
   * @request POST:/worlds
   * @response `200` `PbCreateWorldResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsCreateWorld = (body: PbCreateWorldRequest, params: RequestParams = {}) =>
    this.http.request<PbCreateWorldResponse, RpcStatus>({
      path: `/worlds`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description gets world by ID
   *
   * @tags Worlds
   * @name WorldsGetWorldById
   * @summary Get world by ID
   * @request GET:/worlds/{worldId}
   * @response `200` `PbWorld` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsGetWorldById = (worldId: number, params: RequestParams = {}) =>
    this.http.request<PbWorld, RpcStatus>({
      path: `/worlds/${worldId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description updates world properties (NO images or stats!)
   *
   * @tags Worlds
   * @name WorldsUpdateWorld
   * @summary Update world
   * @request PATCH:/worlds/{worldId}
   * @response `200` `PbWorld` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsUpdateWorld = (
    worldId: number,
    body: {
      name?: string;
      shortDescription?: string;
      public?: boolean;
      basedOn?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbWorld, RpcStatus>({
      path: `/worlds/${worldId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description uploads and sets new image for given world
   *
   * @tags Worlds
   * @name WorldsUploadWorldImage
   * @summary Upload image for world
   * @request POST:/worlds/{worldId}/images
   * @response `200` `PbImage` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  worldsUploadWorldImage = (
    worldId: number,
    body: {
      /** @format byte */
      data?: string;
      /** @format int32 */
      imageTypeId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbImage, RpcStatus>({
      path: `/worlds/${worldId}/images`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
