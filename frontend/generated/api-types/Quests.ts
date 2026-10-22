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
  PbCreateQuestRequest,
  PbCreateQuestResponse,
  PbGetQuestsResponse,
  PbImage,
  PbQuest,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Quests<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets list of quests
   *
   * @tags Quests
   * @name QuestsGetQuests
   * @summary Get quests
   * @request GET:/quests
   * @response `200` `PbGetQuestsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  questsGetQuests = (
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
    this.http.request<PbGetQuestsResponse, RpcStatus>({
      path: `/quests`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description creates completely new quest
   *
   * @tags Quests
   * @name QuestsCreateQuest
   * @summary Create quest
   * @request POST:/quests
   * @response `200` `PbCreateQuestResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  questsCreateQuest = (body: PbCreateQuestRequest, params: RequestParams = {}) =>
    this.http.request<PbCreateQuestResponse, RpcStatus>({
      path: `/quests`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description gets quest by ID
   *
   * @tags Quests
   * @name QuestsGetQuestById
   * @summary Get quest by ID
   * @request GET:/quests/{questId}
   * @response `200` `PbQuest` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  questsGetQuestById = (questId: number, params: RequestParams = {}) =>
    this.http.request<PbQuest, RpcStatus>({
      path: `/quests/${questId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description updates quest properties (NO images or stats!)
   *
   * @tags Quests
   * @name QuestsUpdateQuest
   * @summary Update quest
   * @request PATCH:/quests/{questId}
   * @response `200` `PbQuest` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  questsUpdateQuest = (
    questId: number,
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
    this.http.request<PbQuest, RpcStatus>({
      path: `/quests/${questId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description uploads and sets new image for given quest
   *
   * @tags Quests
   * @name QuestsUploadQuestImage
   * @summary Upload image for quest
   * @request POST:/quests/{questId}/images
   * @response `200` `PbImage` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  questsUploadQuestImage = (
    questId: number,
    body: {
      /** @format byte */
      data?: string;
      /** @format int32 */
      imageTypeId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbImage, RpcStatus>({
      path: `/quests/${questId}/images`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
}
