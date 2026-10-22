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

import { PbGetImagesResponse, PbImage, PbUploadImageRequest, RpcStatus } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Images<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description get images - paginated, filterable by user and image type
   *
   * @tags Images
   * @name ImagesGetImages
   * @summary Get images
   * @request GET:/images
   * @response `200` `PbGetImagesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  imagesGetImages = (
    query?: {
      /** @format int32 */
      moduleId?: number;
      /** @format int32 */
      userId?: number;
      tags?: number[];
      orderBy?: string;
      /** @format int32 */
      width?: number;
      /** @format int32 */
      height?: number;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetImagesResponse, RpcStatus>({
      path: `/images`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description uploads an image file
   *
   * @tags Images
   * @name ImagesUploadDefaultImage
   * @summary Upload image
   * @request POST:/images
   * @response `200` `PbImage` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  imagesUploadDefaultImage = (body: PbUploadImageRequest, params: RequestParams = {}) =>
    this.http.request<PbImage, RpcStatus>({
      path: `/images`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description get image by id
   *
   * @tags Images
   * @name ImagesGetImageById
   * @summary Get image by id
   * @request GET:/images/{imageId}
   * @response `200` `PbImage` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  imagesGetImageById = (imageId: number, params: RequestParams = {}) =>
    this.http.request<PbImage, RpcStatus>({
      path: `/images/${imageId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
