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
  PbCreateLocationRequest,
  PbGetLocationsResponse,
  PbLocation,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Locations<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description returns locations based on modules (world or quest)
   *
   * @tags Locations
   * @name LocationsGetLocations
   * @summary Get locations
   * @request GET:/locations
   * @response `200` `PbGetLocationsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsGetLocations = (
    query?: {
      /** @format int32 */
      moduleId?: number;
      tags?: number[];
      orderBy?: string;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetLocationsResponse, RpcStatus>({
      path: `/locations`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes multiple locations from the world or quest
   *
   * @tags Locations
   * @name LocationsDeleteBulkLocation
   * @summary Delete multiple locations
   * @request DELETE:/locations
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsDeleteBulkLocation = (
    query?: {
      locationIds?: number[];
    },
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/locations`,
      method: 'DELETE',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new location in the world or a quest
   *
   * @tags Locations
   * @name LocationsCreateLocation
   * @summary Create location
   * @request POST:/locations
   * @response `200` `PbLocation` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsCreateLocation = (body: PbCreateLocationRequest, params: RequestParams = {}) =>
    this.http.request<PbLocation, RpcStatus>({
      path: `/locations`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description get location by id
   *
   * @tags Locations
   * @name LocationsGetLocationById
   * @summary Get location by id
   * @request GET:/locations/{locationId}
   * @response `200` `PbLocation` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsGetLocationById = (locationId: number, params: RequestParams = {}) =>
    this.http.request<PbLocation, RpcStatus>({
      path: `/locations/${locationId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description deletes location from the world or quest
   *
   * @tags Locations
   * @name LocationsDeleteLocation
   * @summary Delete location
   * @request DELETE:/locations/{locationId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsDeleteLocation = (locationId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/locations/${locationId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates location properties
   *
   * @tags Locations
   * @name LocationsUpdateLocation
   * @summary Update location
   * @request PATCH:/locations/{locationId}
   * @response `200` `PbLocation` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsUpdateLocation = (
    locationId: number,
    body: {
      name?: string;
      description?: string;
      /** @format int32 */
      postId?: number;
      /** @format int32 */
      thumbnailImageId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbLocation, RpcStatus>({
      path: `/locations/${locationId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new post and assigns it to location in the world or a quest
   *
   * @tags Locations
   * @name LocationsCreateLocationPost
   * @summary Create post for location
   * @request POST:/locations/{locationId}/posts
   * @response `200` `PbLocation` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  locationsCreateLocationPost = (locationId: number, params: RequestParams = {}) =>
    this.http.request<PbLocation, RpcStatus>({
      path: `/locations/${locationId}/posts`,
      method: 'POST',
      format: 'json',
      ...params,
    });
}
