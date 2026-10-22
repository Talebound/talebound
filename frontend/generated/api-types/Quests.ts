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
  PbCreateQuestRequest,
  PbCreateQuestResponse,
  PbGetQuestCharactersResponse,
  PbGetQuestsResponse,
  PbImage,
  PbQuest,
  PbQuestCharacter,
  QuestsCreateQuestCharacterBody,
  QuestsUpdateQuestBody,
  QuestsUpdateQuestCharacterBody,
  QuestsUploadQuestImageBody,
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
      canJoin?: boolean;
      /** @default "UNKNOWN" */
      status?:
        | 'UNKNOWN'
        | 'NOT_STARTED'
        | 'IN_PROGRESS'
        | 'FINISHED_COMPLETED'
        | 'FINISHED_NOT_COMPLETED';
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
  questsUpdateQuest = (questId: number, body: QuestsUpdateQuestBody, params: RequestParams = {}) =>
    this.http.request<PbQuest, RpcStatus>({
      path: `/quests/${questId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description gets list of quest characters
   *
   * @tags Quests
   * @name QuestsGetQuestCharacters
   * @summary Get quest characters
   * @request GET:/quests/{questId}/characters
   * @response `200` `PbGetQuestCharactersResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  questsGetQuestCharacters = (questId: number, params: RequestParams = {}) =>
    this.http.request<PbGetQuestCharactersResponse, RpcStatus>({
      path: `/quests/${questId}/characters`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description deletes quest character
   *
   * @tags Quests
   * @name QuestsDeleteQuestCharacter
   * @summary Delete quest character
   * @request DELETE:/quests/{questId}/characters/{characterId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  questsDeleteQuestCharacter = (questId: number, characterId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/quests/${questId}/characters/${characterId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description creates quest character
   *
   * @tags Quests
   * @name QuestsCreateQuestCharacter
   * @summary Create quest character
   * @request POST:/quests/{questId}/characters/{characterId}
   * @response `200` `PbQuestCharacter` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  questsCreateQuestCharacter = (
    questId: number,
    characterId: number,
    body: QuestsCreateQuestCharacterBody,
    params: RequestParams = {},
  ) =>
    this.http.request<PbQuestCharacter, RpcStatus>({
      path: `/quests/${questId}/characters/${characterId}`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description updates quest character properties
   *
   * @tags Quests
   * @name QuestsUpdateQuestCharacter
   * @summary Update quest character
   * @request PATCH:/quests/{questId}/characters/{characterId}
   * @response `200` `PbQuestCharacter` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  questsUpdateQuestCharacter = (
    questId: number,
    characterId: number,
    body: QuestsUpdateQuestCharacterBody,
    params: RequestParams = {},
  ) =>
    this.http.request<PbQuestCharacter, RpcStatus>({
      path: `/quests/${questId}/characters/${characterId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
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
    body: QuestsUploadQuestImageBody,
    params: RequestParams = {},
  ) =>
    this.http.request<PbImage, RpcStatus>({
      path: `/quests/${questId}/images`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
