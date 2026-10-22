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
  PbCharacter,
  PbCreateCharacterRequest,
  PbCreateCharacterResponse,
  PbGetCharactersResponse,
  PbImage,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Characters<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets list of characters
   *
   * @tags Characters
   * @name CharactersGetCharacters
   * @summary Get characters
   * @request GET:/characters
   * @response `200` `PbGetCharactersResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  charactersGetCharacters = (
    query?: {
      public?: boolean;
      tags?: number[];
      /** @format int32 */
      worldId?: number;
      /** @format int32 */
      systemId?: number;
      orderBy?: string;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetCharactersResponse, RpcStatus>({
      path: `/characters`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates completely new character
   *
   * @tags Characters
   * @name CharactersCreateCharacter
   * @summary Create character
   * @request POST:/characters
   * @response `200` `PbCreateCharacterResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  charactersCreateCharacter = (body: PbCreateCharacterRequest, params: RequestParams = {}) =>
    this.http.request<PbCreateCharacterResponse, RpcStatus>({
      path: `/characters`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description gets character by ID
   *
   * @tags Characters
   * @name CharactersGetCharacterById
   * @summary Get character by ID
   * @request GET:/characters/{characterId}
   * @response `200` `PbCharacter` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  charactersGetCharacterById = (characterId: number, params: RequestParams = {}) =>
    this.http.request<PbCharacter, RpcStatus>({
      path: `/characters/${characterId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description updates character properties (NO images or stats!)
   *
   * @tags Characters
   * @name CharactersUpdateCharacter
   * @summary Update character
   * @request PATCH:/characters/{characterId}
   * @response `200` `PbCharacter` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  charactersUpdateCharacter = (
    characterId: number,
    body: {
      name?: string;
      shortDescription?: string;
      public?: boolean;
      /** @format int32 */
      worldId?: number;
      /** @format int32 */
      systemId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbCharacter, RpcStatus>({
      path: `/characters/${characterId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description uploads and sets new image for given character
   *
   * @tags Characters
   * @name CharactersUploadCharacterImage
   * @summary Upload image for character
   * @request POST:/characters/{characterId}/images
   * @response `200` `PbImage` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  charactersUploadCharacterImage = (
    characterId: number,
    body: {
      /** @format byte */
      data?: string;
      /** @format int32 */
      imageTypeId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbImage, RpcStatus>({
      path: `/characters/${characterId}/images`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
}
