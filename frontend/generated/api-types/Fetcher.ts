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

import { PbRunFetcherRequest, PbRunFetcherResponse, RpcStatus } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Fetcher<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Run fetcher - get modules and entities by their ID
   *
   * @tags Fetcher
   * @name FetcherRunFetcher
   * @summary Run fetcher - get modules and entities by ID
   * @request POST:/fetcher
   * @response `200` `PbRunFetcherResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  fetcherRunFetcher = (body: PbRunFetcherRequest, params: RequestParams = {}) =>
    this.http.request<PbRunFetcherResponse, RpcStatus>({
      path: `/fetcher`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
