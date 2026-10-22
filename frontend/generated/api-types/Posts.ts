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
  PbCreatePostRequest,
  PbDeletePostResponse,
  PbGetPostHistoryResponse,
  PbGetPostsResponse,
  PbPost,
  PbPostHistory,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Posts<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description returns posts based on module
   *
   * @tags Posts
   * @name PostsGetPosts
   * @summary Get posts
   * @request GET:/posts
   * @response `200` `PbGetPostsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  postsGetPosts = (
    query?: {
      /** @format int32 */
      moduleId?: number;
      /** @format int32 */
      userId?: number;
      tags?: number[];
      orderBy?: string;
      orderDirection?: string;
      isDraft?: boolean;
      isPrivate?: boolean;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetPostsResponse, RpcStatus>({
      path: `/posts`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description create completely new post
   *
   * @tags Posts
   * @name PostsCreatePost
   * @summary Create post
   * @request POST:/posts
   * @response `200` `PbPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  postsCreatePost = (body: PbCreatePostRequest, params: RequestParams = {}) =>
    this.http.request<PbPost, RpcStatus>({
      path: `/posts`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description get content of post by its ID
   *
   * @tags Posts
   * @name PostsGetPostById
   * @summary Get post by id
   * @request GET:/posts/{postId}
   * @response `200` `PbPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  postsGetPostById = (postId: number, params: RequestParams = {}) =>
    this.http.request<PbPost, RpcStatus>({
      path: `/posts/${postId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description deletes post
   *
   * @tags Posts
   * @name PostsDeletePost
   * @summary Delete post
   * @request DELETE:/posts/{postId}
   * @response `200` `PbDeletePostResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  postsDeletePost = (postId: number, params: RequestParams = {}) =>
    this.http.request<PbDeletePostResponse, RpcStatus>({
      path: `/posts/${postId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description update title or content of the post
   *
   * @tags Posts
   * @name PostsUpdatePost
   * @summary Update post
   * @request PATCH:/posts/{postId}
   * @response `200` `PbPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  postsUpdatePost = (
    postId: number,
    body: {
      title?: string;
      content?: string;
      description?: string;
      isDraft?: boolean;
      isPrivate?: boolean;
      /** @format int32 */
      imageThumbnailId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbPost, RpcStatus>({
      path: `/posts/${postId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description get list of history changes of post by its ID - without content
   *
   * @tags Posts
   * @name PostsGetPostHistory
   * @summary Get post history
   * @request GET:/posts/{postId}/history
   * @response `200` `PbGetPostHistoryResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  postsGetPostHistory = (postId: number, params: RequestParams = {}) =>
    this.http.request<PbGetPostHistoryResponse, RpcStatus>({
      path: `/posts/${postId}/history`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description get content of single update iteration of post
   *
   * @tags Posts
   * @name PostsGetPostHistoryById
   * @summary Get post history content
   * @request GET:/posts/{postId}/history/{postHistoryId}/content
   * @response `200` `PbPostHistory` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  postsGetPostHistoryById = (postId: number, postHistoryId: number, params: RequestParams = {}) =>
    this.http.request<PbPostHistory, RpcStatus>({
      path: `/posts/${postId}/history/${postHistoryId}/content`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
