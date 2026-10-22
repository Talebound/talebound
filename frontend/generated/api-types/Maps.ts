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
  PbCreateMapRequest,
  PbCreateMapResponse,
  PbGetMapLayersResponse,
  PbGetMapPinsResponse,
  PbGetMapsResponse,
  PbGetModuleMapPinTypesResponse,
  PbMap,
  PbMapPinType,
  PbMapPinTypeGroup,
  PbPinShape,
  PbUpdateMapPinTypeResponse,
  PbViewMapLayer,
  PbViewMapPin,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Maps<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description returns maps based on modules (world or quest)
   *
   * @tags Maps
   * @name MapsGetMaps
   * @summary Get maps
   * @request GET:/maps
   * @response `200` `PbGetMapsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsGetMaps = (
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
    this.http.request<PbGetMapsResponse, RpcStatus>({
      path: `/maps`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new map for world or quest
   *
   * @tags Maps
   * @name MapsCreateMap
   * @summary Create map
   * @request POST:/maps
   * @response `200` `PbCreateMapResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsCreateMap = (body: PbCreateMapRequest, params: RequestParams = {}) =>
    this.http.request<PbCreateMapResponse, RpcStatus>({
      path: `/maps`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new map pin type group for the module
   *
   * @tags Maps
   * @name MapsCreateMapPinTypeGroup
   * @summary Create map pin type group
   * @request POST:/maps/modules/{moduleId}/pin_type_groups
   * @response `200` `PbMapPinTypeGroup` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsCreateMapPinTypeGroup = (
    moduleId: number,
    body: {
      name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMapPinTypeGroup, RpcStatus>({
      path: `/maps/modules/${moduleId}/pin_type_groups`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes a map pin type group from the module
   *
   * @tags Maps
   * @name MapsDeleteMapPinTypeGroup
   * @summary Delete map pin type group
   * @request DELETE:/maps/modules/{moduleId}/pin_type_groups/{mapPinTypeGroupId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsDeleteMapPinTypeGroup = (
    moduleId: number,
    mapPinTypeGroupId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/maps/modules/${moduleId}/pin_type_groups/${mapPinTypeGroupId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates map pin type group properties
   *
   * @tags Maps
   * @name MapsUpdateMapPinTypeGroup
   * @summary Update map pin type group
   * @request PATCH:/maps/modules/{moduleId}/pin_type_groups/{mapPinTypeGroupId}
   * @response `200` `PbMapPinTypeGroup` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsUpdateMapPinTypeGroup = (
    moduleId: number,
    mapPinTypeGroupId: number,
    body: {
      name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMapPinTypeGroup, RpcStatus>({
      path: `/maps/modules/${moduleId}/pin_type_groups/${mapPinTypeGroupId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description returns pin types of the module
   *
   * @tags Maps
   * @name MapsGetModuleMapPinTypes
   * @summary Get module map pin types
   * @request GET:/maps/modules/{moduleId}/pin_types
   * @response `200` `PbGetModuleMapPinTypesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsGetModuleMapPinTypes = (moduleId: number, params: RequestParams = {}) =>
    this.http.request<PbGetModuleMapPinTypesResponse, RpcStatus>({
      path: `/maps/modules/${moduleId}/pin_types`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new pin type for the map
   *
   * @tags Maps
   * @name MapsCreateMapPinType
   * @summary Create map pin type
   * @request POST:/maps/modules/{moduleId}/pin_types
   * @response `200` `PbMapPinType` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsCreateMapPinType = (
    moduleId: number,
    body: {
      /** @format int32 */
      mapPinTypeGroupId?: number;
      shape?: PbPinShape;
      backgroundColor?: string;
      borderColor?: string;
      iconColor?: string;
      icon?: string;
      /** @format int32 */
      iconSize?: number;
      /** @format int32 */
      width?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMapPinType, RpcStatus>({
      path: `/maps/modules/${moduleId}/pin_types`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description updates pin type properties
   *
   * @tags Maps
   * @name MapsUpdateMapPinType
   * @summary Update map pin type
   * @request PATCH:/maps/modules/{moduleId}/pin_types/{pinTypeId}
   * @response `200` `PbUpdateMapPinTypeResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsUpdateMapPinType = (
    moduleId: number,
    pinTypeId: number,
    body: {
      shape?: PbPinShape;
      backgroundColor?: string;
      borderColor?: string;
      iconColor?: string;
      icon?: string;
      /** @format int32 */
      iconSize?: number;
      /** @format int32 */
      width?: number;
      isDefault?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbUpdateMapPinTypeResponse, RpcStatus>({
      path: `/maps/modules/${moduleId}/pin_types/${pinTypeId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description get map by id
   *
   * @tags Maps
   * @name MapsGetMapById
   * @summary Get map by id
   * @request GET:/maps/{mapId}
   * @response `200` `PbMap` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsGetMapById = (mapId: number, params: RequestParams = {}) =>
    this.http.request<PbMap, RpcStatus>({
      path: `/maps/${mapId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description deletes a map from the world or quest
   *
   * @tags Maps
   * @name MapsDeleteMap
   * @summary Delete map
   * @request DELETE:/maps/{mapId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsDeleteMap = (mapId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/maps/${mapId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates map properties
   *
   * @tags Maps
   * @name MapsUpdateMap
   * @summary Update map
   * @request PATCH:/maps/{mapId}
   * @response `200` `PbMap` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsUpdateMap = (
    mapId: number,
    body: {
      title?: string;
      type?: string;
      description?: string;
      /** @format int32 */
      thumbnailImageId?: number;
      isPrivate?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMap, RpcStatus>({
      path: `/maps/${mapId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description returns layers of the map
   *
   * @tags Maps
   * @name MapsGetMapLayers
   * @summary Get map layers
   * @request GET:/maps/{mapId}/layers
   * @response `200` `PbGetMapLayersResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsGetMapLayers = (mapId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMapLayersResponse, RpcStatus>({
      path: `/maps/${mapId}/layers`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new layer for the map
   *
   * @tags Maps
   * @name MapsCreateMapLayer
   * @summary Create map layer
   * @request POST:/maps/{mapId}/layers
   * @response `200` `PbViewMapLayer` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsCreateMapLayer = (
    mapId: number,
    body: {
      name?: string;
      /** @format int32 */
      imageId?: number;
      enabled?: boolean;
      /** @format int32 */
      position?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMapLayer, RpcStatus>({
      path: `/maps/${mapId}/layers`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes a layer from the map
   *
   * @tags Maps
   * @name MapsDeleteMapLayer
   * @summary Delete map layer
   * @request DELETE:/maps/{mapId}/layers/{layerId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsDeleteMapLayer = (mapId: number, layerId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/maps/${mapId}/layers/${layerId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates layer properties
   *
   * @tags Maps
   * @name MapsUpdateMapLayer
   * @summary Update map layer
   * @request PATCH:/maps/{mapId}/layers/{layerId}
   * @response `200` `PbViewMapLayer` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsUpdateMapLayer = (
    mapId: number,
    layerId: number,
    body: {
      name?: string;
      /** @format int32 */
      imageId?: number;
      enabled?: boolean;
      /** @format int32 */
      position?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMapLayer, RpcStatus>({
      path: `/maps/${mapId}/layers/${layerId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes a pin type from the map
   *
   * @tags Maps
   * @name MapsDeleteMapPinType
   * @summary Delete map pin type
   * @request DELETE:/maps/{mapId}/pin_types/{pinTypeId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsDeleteMapPinType = (mapId: number, pinTypeId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/maps/${mapId}/pin_types/${pinTypeId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description returns pins of the map
   *
   * @tags Maps
   * @name MapsGetMapPins
   * @summary Get map pins
   * @request GET:/maps/{mapId}/pins
   * @response `200` `PbGetMapPinsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsGetMapPins = (mapId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMapPinsResponse, RpcStatus>({
      path: `/maps/${mapId}/pins`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new pin for the map
   *
   * @tags Maps
   * @name MapsCreateMapPin
   * @summary Create map pin
   * @request POST:/maps/{mapId}/pins
   * @response `200` `PbViewMapPin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsCreateMapPin = (
    mapId: number,
    body: {
      /** @format int32 */
      mapPinTypeId?: number;
      name?: string;
      /** @format int32 */
      locationId?: number;
      /** @format int32 */
      mapLayerId?: number;
      /** @format int32 */
      x?: number;
      /** @format int32 */
      y?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMapPin, RpcStatus>({
      path: `/maps/${mapId}/pins`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes a pin from the map
   *
   * @tags Maps
   * @name MapsDeleteMapPin
   * @summary Delete map pin
   * @request DELETE:/maps/{mapId}/pins/{pinId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsDeleteMapPin = (mapId: number, pinId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/maps/${mapId}/pins/${pinId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates pin properties
   *
   * @tags Maps
   * @name MapsUpdateMapPin
   * @summary Update map pin
   * @request PATCH:/maps/{mapId}/pins/{pinId}
   * @response `200` `PbViewMapPin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsUpdateMapPin = (
    mapId: number,
    pinId: number,
    body: {
      /** @format int32 */
      mapPinTypeId?: number;
      name?: string;
      /** @format int32 */
      locationId?: number;
      /** @format int32 */
      mapLayerId?: number;
      /** @format int32 */
      x?: number;
      /** @format int32 */
      y?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMapPin, RpcStatus>({
      path: `/maps/${mapId}/pins/${pinId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
}
